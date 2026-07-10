"use client";

import { useRef, useState } from "react";

import { gsap, initGSAP, ScrollTrigger, useGSAP } from "@/animations/gsap";
import { Container } from "@/components/layout/Container";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/utils/cn";

import { processSteps } from "./processSteps";

const desktopScrollStates = processSteps.length - 1;

export function SignatureExperiencePrototype() {
  const rootRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

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
      const layers = gsap.utils.toArray<SVGGElement>("[data-signature-layer]", root);
      const copyPanels = gsap.utils.toArray<HTMLElement>("[data-signature-copy]", root);

      if (!pin || layers.length === 0 || copyPanels.length === 0) {
        return;
      }

      gsap.set(layers, { autoAlpha: 0, y: 18 });
      gsap.set(layers[0], { autoAlpha: 1, y: 0 });
      gsap.set(copyPanels, { autoAlpha: 0, y: 16 });
      gsap.set(copyPanels[0], { autoAlpha: 1, y: 0 });

      const timeline = gsap.timeline({
        defaults: {
          duration: 0.75,
          ease: "power3.out",
        },
        scrollTrigger: {
          anticipatePin: 1,
          end: () => `+=${window.innerHeight * desktopScrollStates}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const nextStep = Math.min(
              processSteps.length - 1,
              Math.round(self.progress * desktopScrollStates),
            );

            setActiveStep(nextStep);
          },
          pin: true,
          scrub: 0.8,
          start: "top top",
          trigger: pin,
        },
      });

      processSteps.forEach((_, index) => {
        if (index === 0) {
          return;
        }

        timeline
          .to(copyPanels[index - 1], { autoAlpha: 0, y: -14 }, index - 0.18)
          .to(copyPanels[index], { autoAlpha: 1, y: 0 }, index)
          .to(layers[index], { autoAlpha: 1, y: 0 }, index);
      });

      ScrollTrigger.refresh();

      return () => {
        timeline.kill();
      };
    },
    {
      dependencies: [prefersReducedMotion],
      scope: rootRef,
    },
  );

  return (
    <Page>
      <div
        className="signature-prototype bg-background text-foreground"
        data-reduced-motion={prefersReducedMotion ? "true" : "false"}
        ref={rootRef}
      >
        <Section
          className="bg-background pt-[calc(var(--section-spacing-large)+var(--space-20))]"
          spacing="large"
        >
          <Container>
            <div className="grid gap-8 border-t border-border pt-6 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
              <p className="type-label text-foreground-muted lg:col-span-3">
                Prototype
              </p>
              <div className="lg:col-span-7 lg:col-start-5">
                <h1 className="type-display text-foreground">
                  Signature process experience.
                </h1>
                <p className="mt-8 max-w-[680px] text-pretty text-[length:var(--font-size-body-large)] leading-[var(--line-height-body-large)] text-foreground-secondary">
                  A safe prototype for the Studio process story. The goal is to test scroll
                  pacing, accessible content, and layered architectural states before replacing
                  the public Studio section.
                </p>
              </div>
            </div>
          </Container>
        </Section>

        <section
          aria-labelledby="signature-process-title"
          className="signature-prototype-desktop min-h-svh bg-background-secondary"
          data-signature-pin
        >
          <Container className="flex min-h-svh items-center py-[var(--section-spacing-medium)]">
            <div className="grid w-full items-center gap-10 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
              <div className="lg:col-span-4">
                <p className="mb-6 type-label text-foreground-muted">
                  Process
                </p>
                <div className="relative min-h-[320px]">
                  {processSteps.map((step, index) => (
                    <article
                      className="absolute inset-0"
                      data-signature-copy
                      key={step.id}
                      style={{ opacity: index === 0 ? 1 : 0 }}
                    >
                      <p className="mb-5 type-label text-foreground-muted">
                        {step.index}
                      </p>
                      <h2
                        className="type-display text-foreground"
                        id={index === 0 ? "signature-process-title" : undefined}
                      >
                        {step.title}
                      </h2>
                      <p className="mt-8 max-w-[440px] text-pretty text-[length:var(--font-size-body-large)] leading-[var(--line-height-body-large)] text-foreground-secondary">
                        {step.description}
                      </p>
                    </article>
                  ))}
                </div>

                <ol
                  aria-label="Process progress"
                  className="mt-10 flex gap-3"
                >
                  {processSteps.map((step, index) => (
                    <li key={step.id}>
                      <span
                        className={cn(
                          "block h-px w-8 bg-border transition-[background-color,opacity] duration-base ease-architectural-out",
                          index <= activeStep ? "opacity-100" : "opacity-35",
                        )}
                      />
                      <span className="sr-only">
                        {step.index} {step.title}
                      </span>
                    </li>
                  ))}
                </ol>

                <ol className="sr-only">
                  {processSteps.map((step) => (
                    <li key={step.id}>
                      <strong>{step.title}</strong>: {step.description}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="lg:col-span-8">
                <div className="relative aspect-[4/3] overflow-hidden border border-border bg-background">
                  <ProcessDrawing />
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="signature-prototype-static bg-background-secondary py-[var(--section-spacing-large)]">
          <Container>
            <div className="grid gap-8 border-t border-border pt-6 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
              <p className="type-label text-foreground-muted lg:col-span-3">
                Process
              </p>
              <div className="space-y-16 lg:col-span-7 lg:col-start-5">
                {processSteps.map((step) => (
                  <article className="grid gap-6 border-t border-border pt-5" key={step.id}>
                    <p className="type-label text-foreground-muted">
                      {step.index}
                    </p>
                    <div>
                      <h2 className="type-section-heading text-foreground">
                        {step.title}
                      </h2>
                      <p className="mt-5 max-w-[620px] text-pretty text-[length:var(--font-size-body)] leading-[var(--line-height-body)] text-foreground-secondary">
                        {step.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </section>
      </div>
    </Page>
  );
}

function ProcessDrawing() {
  return (
    <svg
      aria-hidden="true"
      className="h-full w-full"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 960 720"
    >
      <rect fill="var(--color-background-primary)" height="720" width="960" />
      <g opacity="0.35">
        <path d="M120 600H840" stroke="var(--color-border-primary)" strokeWidth="1" />
        <path d="M120 120V600" stroke="var(--color-border-primary)" strokeWidth="1" />
        <path d="M840 120V600" stroke="var(--color-border-primary)" strokeWidth="1" />
      </g>

      <g data-signature-layer="research" opacity="1">
        <path
          d="M178 482C250 420 282 454 342 384C392 326 452 352 512 286C562 231 622 245 718 176"
          fill="none"
          stroke="var(--color-text-muted)"
          strokeDasharray="10 14"
          strokeWidth="2"
        />
        <circle cx="220" cy="446" fill="var(--color-accent-primary)" r="4" />
        <circle cx="512" cy="286" fill="var(--color-accent-primary)" r="4" />
        <circle cx="718" cy="176" fill="var(--color-accent-primary)" r="4" />
      </g>

      <g data-signature-layer="context" opacity="0">
        <path
          d="M206 164H756V548H206Z"
          fill="none"
          stroke="var(--color-text-secondary)"
          strokeWidth="2"
        />
        <path
          d="M276 164V548M386 164V548M496 164V548M606 164V548M206 260H756M206 356H756M206 452H756"
          stroke="var(--color-border-strong)"
          strokeWidth="1"
        />
      </g>

      <g data-signature-layer="structure" opacity="0">
        <path
          d="M300 230H670V494H300Z"
          fill="rgb(215 208 196 / 18%)"
          stroke="var(--color-text-primary)"
          strokeWidth="2"
        />
        <path
          d="M300 318H670M410 230V494M560 230V494"
          stroke="var(--color-text-primary)"
          strokeWidth="2"
        />
      </g>

      <g data-signature-layer="material" opacity="0">
        <rect fill="rgb(138 129 116 / 22%)" height="176" width="150" x="410" y="318" />
        <rect fill="rgb(31 29 26 / 8%)" height="88" width="260" x="410" y="230" />
        <path
          d="M430 346H538M430 376H538M430 406H538M430 436H538"
          stroke="var(--color-text-muted)"
          strokeWidth="1"
        />
      </g>

      <g data-signature-layer="light" opacity="0">
        <path d="M670 150L410 494H670Z" fill="rgb(186 156 102 / 22%)" />
        <path d="M670 150L560 318" stroke="var(--color-accent-primary)" strokeWidth="2" />
      </g>

      <g data-signature-layer="atmosphere" opacity="0">
        <rect fill="rgb(244 241 235 / 72%)" height="720" width="960" />
        <path
          d="M300 230H670V494H300Z"
          fill="rgb(138 129 116 / 10%)"
          stroke="var(--color-text-secondary)"
          strokeWidth="2"
        />
        <circle cx="640" cy="205" fill="rgb(186 156 102 / 30%)" r="86" />
        <path d="M410 494H670" stroke="var(--color-text-primary)" strokeWidth="2" />
      </g>
    </svg>
  );
}
