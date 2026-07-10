"use client";

import { useRef, type ReactNode } from "react";

import { imageReveal, textReveal } from "@/animations";
import { useGSAP } from "@/animations/gsap";
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

      if (imageFrame) {
        const timeline = imageReveal(imageFrame, {
          duration: 1.4,
          image: image ?? undefined,
          reducedMotion: prefersReducedMotion,
          scaleFrom: 1.012,
          scrollTrigger: false,
        });

        cleanups.push(() => {
          timeline.kill();
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
