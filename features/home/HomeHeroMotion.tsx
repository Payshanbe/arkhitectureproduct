"use client";

import { useRef, type ReactNode } from "react";

import { imageReveal, parallax, textReveal } from "@/animations";
import { gsap, useGSAP } from "@/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/utils/cn";

interface HomeHeroMotionProps {
  children: ReactNode;
  className?: string;
}

export function HomeHeroMotion({ children, className }: HomeHeroMotionProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const root = rootRef.current;

      if (!root) {
        return;
      }

      const cleanups: Array<() => void> = [];
      const imageFrame = root.querySelector<HTMLElement>("[data-home-hero-image-frame]");
      const image = root.querySelector<HTMLImageElement>("[data-home-hero-image]");
      const heading = root.querySelector<HTMLElement>("[data-home-hero-heading]");
      const label = root.querySelector<HTMLElement>("[data-home-hero-label]");
      const supporting = root.querySelector<HTMLElement>("[data-home-hero-supporting]");
      const indicator = root.querySelector<HTMLElement>("[data-home-hero-indicator]");
      const scrollCue = root.querySelector<HTMLElement>("[data-home-hero-scroll-cue]");

      if (imageFrame) {
        const timeline = imageReveal(imageFrame, {
          duration: 1.4,
          reducedMotion: prefersReducedMotion,
          scrollTrigger: false,
        });

        cleanups.push(() => {
          timeline.kill();
        });
      }

      if (image) {
        if (prefersReducedMotion) {
          gsap.set(image, { scale: 1 });
        } else {
          // Permanent overscan buffer: the image rests slightly larger than its
          // frame so scroll parallax and cursor drift have room to move without
          // ever exposing an edge (the Section wrapper clips overflow).
          gsap.set(image, { scale: 1.2, transformOrigin: "50% 50%" });

          const settle = gsap.to(image, {
            delay: 0.15,
            duration: 2.6,
            ease: "power2.out",
            scale: 1.12,
          });

          const drift = parallax(image, {
            fromYPercent: -3,
            reducedMotion: false,
            scrollTrigger: {
              end: "bottom top",
              scrub: 0.6,
              start: "top top",
              trigger: root,
            },
            toYPercent: 3,
          });

          cleanups.push(() => {
            settle.kill();
            drift.kill();
          });

          const finePointer =
            typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

          if (finePointer) {
            const handlePointerMove = (event: PointerEvent) => {
              const bounds = imageFrame?.getBoundingClientRect();

              if (!bounds) {
                return;
              }

              const relX = (event.clientX - bounds.left) / bounds.width - 0.5;
              const relY = (event.clientY - bounds.top) / bounds.height - 0.5;

              gsap.to(image, {
                duration: 1.1,
                ease: "power3.out",
                overwrite: "auto",
                x: relX * -10,
                y: relY * -8,
              });
            };

            const handlePointerLeave = () => {
              gsap.to(image, {
                duration: 0.9,
                ease: "power3.out",
                overwrite: "auto",
                x: 0,
                y: 0,
              });
            };

            imageFrame?.addEventListener("pointermove", handlePointerMove);
            imageFrame?.addEventListener("pointerleave", handlePointerLeave);

            cleanups.push(() => {
              imageFrame?.removeEventListener("pointermove", handlePointerMove);
              imageFrame?.removeEventListener("pointerleave", handlePointerLeave);
              gsap.killTweensOf(image);
            });
          }
        }
      }

      if (scrollCue && !prefersReducedMotion) {
        gsap.set(scrollCue, { transformOrigin: "50% 0%" });

        const breathe = gsap.to(scrollCue, {
          delay: 1.7,
          duration: 1.6,
          ease: "sine.inOut",
          repeat: -1,
          scaleY: 0.4,
          yoyo: true,
        });

        cleanups.push(() => {
          breathe.kill();
        });
      }

      if (heading) {
        const reveal = textReveal(heading, {
          delay: 0.5,
          duration: 1,
          reducedMotion: prefersReducedMotion,
          splitBy: "lines",
          stagger: 0.08,
          yPercent: 56,
        });

        cleanups.push(() => {
          reveal.revert();
          reveal.timeline.kill();
        });
      }

      if (label) {
        const reveal = textReveal(label, {
          delay: 0.42,
          duration: 0.72,
          reducedMotion: prefersReducedMotion,
          splitBy: "words",
          stagger: 0.04,
          yPercent: 40,
        });

        cleanups.push(() => {
          reveal.revert();
          reveal.timeline.kill();
        });
      }

      if (supporting) {
        const reveal = textReveal(supporting, {
          delay: 0.8,
          duration: 0.8,
          reducedMotion: prefersReducedMotion,
          splitBy: "lines",
          stagger: 0.05,
          yPercent: 40,
        });

        cleanups.push(() => {
          reveal.revert();
          reveal.timeline.kill();
        });
      }

      if (indicator) {
        const reveal = textReveal(indicator, {
          delay: 0.94,
          duration: 0.72,
          reducedMotion: prefersReducedMotion,
          splitBy: "words",
          stagger: 0.04,
          yPercent: 24,
        });

        cleanups.push(() => {
          reveal.revert();
          reveal.timeline.kill();
        });
      }

      return () => {
        cleanups.forEach((cleanup) => cleanup());
      };
    },
    {
      dependencies: [prefersReducedMotion],
      scope: rootRef,
    },
  );

  return (
    <div className={cn(className)} ref={rootRef}>
      {children}
    </div>
  );
}
