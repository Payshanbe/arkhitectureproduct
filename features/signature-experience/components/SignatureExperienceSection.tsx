"use client";

import { useRef, useState } from "react";

import { gsap, initGSAP, ScrollTrigger, useGSAP } from "@/animations/gsap";
import { Container } from "@/components/layout/Container";
import { SignatureDrawing } from "@/features/signature-experience/components/SignatureDrawing";
import { signatureAnimationConfig } from "@/features/signature-experience/signature-animation-config";
import {
  getSignatureScenes,
  signatureConfig,
} from "@/features/signature-experience/signature-config";
import type { LayerId, Scene } from "@/features/signature-experience/types";
import { getLayerStatesForScene } from "@/features/signature-experience/utils/layers";
import { createSceneEngineState } from "@/features/signature-experience/utils/scene-engine";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { SiteLocale } from "@/lib/i18n/config";
import { defaultLocale } from "@/lib/i18n/config";
import { cn } from "@/utils/cn";

const { layers, timing } = signatureConfig;

function getTimelinePosition(sceneIndex: number, scenes: Scene[]) {
  const previousDuration = scenes
    .slice(0, sceneIndex)
    .reduce((total, scene) => total + scene.durationVh, 0);

  return previousDuration / 100;
}

function getLayerElement(root: HTMLElement, layerId: LayerId) {
  return root.querySelector<SVGGElement>(`[data-signature-layer-id="${layerId}"]`);
}

function prepareDrawPaths(root: HTMLElement) {
  root.querySelectorAll<SVGPathElement>("[data-signature-draw]").forEach((path) => {
    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });
  });
}

function revealLayer(
  root: HTMLElement,
  layerId: LayerId,
  position: number,
  timeline: gsap.core.Timeline,
) {
  const animation = signatureAnimationConfig.find((item) =>
    item.enter.targetLayers.includes(layerId),
  );
  const layer = getLayerElement(root, layerId);

  if (!layer || !animation) {
    return;
  }

  const drawPaths = gsap.utils.toArray<SVGPathElement>("[data-signature-draw]", layer);
  const start = position + animation.enter.delay;

  timeline.to(
    layer,
    {
      autoAlpha: 1,
      duration: animation.enter.duration,
      ease: animation.enter.easing,
      y: 0,
    },
    start,
  );

  if (drawPaths.length > 0) {
    timeline.to(
      drawPaths,
      {
        duration: animation.enter.duration,
        ease: animation.enter.easing,
        stagger: 0.035,
        strokeDashoffset: 0,
      },
      start + 0.08,
    );
  }
}

interface SignatureExperienceSectionProps {
  locale?: SiteLocale;
}

export function SignatureExperienceSection({
  locale = defaultLocale,
}: SignatureExperienceSectionProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const scenes = getSignatureScenes(locale);
  const processLabel = locale === "tj" ? "Раванд" : "Процесс";

  useGSAP(
    () => {
      const root = rootRef.current;

      if (!root || prefersReducedMotion) {
        return;
      }

      const desktopQuery = window.matchMedia("(min-width: 1024px)");

      if (!desktopQuery.matches) {
        return;
      }

      initGSAP();

      const pin = root.querySelector<HTMLElement>("[data-signature-pin]");

      if (!pin) {
        return;
      }

      const layerElements = gsap.utils.toArray<SVGGElement>("[data-signature-layer-id]", pin);
      const copyPanels = gsap.utils.toArray<HTMLElement>("[data-signature-copy]", pin);

      if (layerElements.length === 0 || copyPanels.length === 0) {
        return;
      }

      prepareDrawPaths(pin);

      gsap.set(layerElements, {
        autoAlpha: 0,
        transformOrigin: "50% 50%",
        y: 8,
      });
      gsap.set(getLayerElement(pin, "grid"), {
        autoAlpha: 1,
        y: 0,
      });
      gsap.set(copyPanels, {
        autoAlpha: 0,
        y: 16,
      });
      gsap.set(copyPanels[0], {
        autoAlpha: 1,
        y: 0,
      });

      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
        scrollTrigger: {
          anticipatePin: timing.anticipatePin,
          end: () => `+=${window.innerHeight * (timing.totalDurationVh / 100)}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const state = createSceneEngineState(scenes, self.progress);

            setActiveSceneIndex(state.currentSceneIndex);
          },
          pin: true,
          scrub: timing.scrub,
          start: "top top",
          trigger: pin,
        },
      });

      signatureAnimationConfig.forEach((animation, sceneIndex) => {
        const position = getTimelinePosition(sceneIndex, scenes);

        if (sceneIndex > 0) {
          timeline
            .to(
              copyPanels[sceneIndex - 1],
              { autoAlpha: 0, duration: 0.46, y: -10 },
              position - 0.16,
            )
            .to(copyPanels[sceneIndex], { autoAlpha: 1, duration: 0.76, y: 0 }, position + 0.02);
        }

        animation.enter.targetLayers.forEach((layerId) => {
          revealLayer(pin, layerId, position, timeline);
        });
      });

      ScrollTrigger.refresh();

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    },
    {
      dependencies: [locale, prefersReducedMotion],
      scope: rootRef,
    },
  );

  return (
    <div
      className="signature-prototype bg-background-secondary text-foreground"
      data-reduced-motion={prefersReducedMotion ? "true" : "false"}
      ref={rootRef}
    >
      <section
        aria-labelledby="signature-process-title"
        className="signature-prototype-desktop min-h-svh bg-background-secondary"
        data-signature-pin
      >
        <Container className="flex min-h-svh items-center py-[var(--section-spacing-medium)]">
          <div className="grid w-full items-center gap-10 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <div className="lg:col-span-4">
              <p className="mb-6 type-label text-foreground-muted">{processLabel}</p>
              <div className="relative min-h-[320px]">
                {scenes.map((scene, index) => (
                  <article
                    className="absolute inset-0"
                    data-signature-copy
                    key={scene.id}
                    style={{ opacity: index === 0 ? 1 : 0 }}
                  >
                    <p className="mb-5 type-label text-foreground-muted">{scene.index}</p>
                    <h2
                      className="type-display text-foreground"
                      id={index === 0 ? "signature-process-title" : undefined}
                    >
                      {scene.title}
                    </h2>
                    <p className="mt-8 max-w-[440px] text-pretty text-[length:var(--font-size-body-large)] leading-[var(--line-height-body-large)] text-foreground-secondary">
                      {scene.description}
                    </p>
                  </article>
                ))}
              </div>

              <ol aria-label={processLabel} className="mt-10 flex gap-3">
                {scenes.map((scene, index) => (
                  <li key={scene.id}>
                    <span
                      className={cn(
                        "block h-px w-12 transition-[background-color,opacity] duration-slow ease-architectural-out",
                        index <= activeSceneIndex
                          ? "bg-[var(--color-text-secondary)] opacity-90"
                          : "bg-border opacity-45",
                      )}
                    />
                    <span className="sr-only">
                      {scene.index} {scene.title}
                    </span>
                  </li>
                ))}
              </ol>

              <ol className="sr-only">
                {scenes.map((scene) => (
                  <li key={scene.id}>
                    <strong>{scene.title}</strong>: {scene.description}
                  </li>
                ))}
              </ol>
            </div>

            <div className="lg:col-span-8">
              <div className="relative aspect-[4/3] overflow-hidden bg-background lg:mr-[calc(var(--container-padding)*-1)]">
                <SignatureDrawing animated />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="signature-prototype-static bg-background-secondary py-[var(--section-spacing-large)]">
        <Container>
          <div className="grid gap-8 border-t border-border pt-6 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <p className="type-label text-foreground-muted lg:col-span-3">{processLabel}</p>
            <div className="space-y-20 lg:col-span-7 lg:col-start-5">
              {scenes.map((scene) => {
                const layerStates = getLayerStatesForScene(layers, scene);
                const visibleLayerIds = layerStates
                  .filter((layer) => layer.visibility === "visible")
                  .map((layer) => layer.id);

                return (
                  <article className="grid gap-6 border-t border-border pt-5" key={scene.id}>
                    <p className="type-label text-foreground-muted">{scene.index}</p>
                    <div>
                      <h2 className="type-section-heading text-foreground">{scene.title}</h2>
                      <p className="mt-5 max-w-[620px] text-pretty text-[length:var(--font-size-body)] leading-[var(--line-height-body)] text-foreground-secondary">
                        {scene.description}
                      </p>
                      <div className="mt-8 aspect-[4/3] max-w-[680px] overflow-hidden bg-background">
                        <SignatureDrawing visibleLayerIds={visibleLayerIds} />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
