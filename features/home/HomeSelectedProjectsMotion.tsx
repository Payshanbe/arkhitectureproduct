"use client";

import { useRef, type ReactNode } from "react";

import { imageReveal, sectionReveal } from "@/animations";
import { useGSAP } from "@/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface HomeSelectedProjectsMotionProps {
  children: ReactNode;
}

export function HomeSelectedProjectsMotion({ children }: HomeSelectedProjectsMotionProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const root = rootRef.current;

      if (!root) {
        return;
      }

      const cleanups: Array<() => void> = [];
      const heading = root.querySelector<HTMLElement>("[data-selected-projects-heading]");

      if (heading) {
        const reveal = sectionReveal(heading, {
          reducedMotion: prefersReducedMotion,
          scrollTrigger: {
            start: "top 82%",
          },
          y: 16,
        });

        cleanups.push(() => {
          reveal.kill();
        });
      }

      root.querySelectorAll<HTMLElement>("[data-project-reveal]").forEach((frame) => {
        const image = frame.querySelector<HTMLElement>("[data-project-image]");
        const reveal = imageReveal(frame, {
          duration: 1,
          image: image ?? undefined,
          reducedMotion: prefersReducedMotion,
          scaleFrom: 1.025,
          scrollTrigger: {
            start: "top 80%",
          },
        });

        cleanups.push(() => {
          reveal.kill();
        });
      });

      root.querySelectorAll<HTMLElement>("[data-project-marginalia]").forEach((item) => {
        const reveal = sectionReveal(item, {
          reducedMotion: prefersReducedMotion,
          scrollTrigger: {
            start: "top 85%",
          },
          y: 14,
        });

        cleanups.push(() => {
          reveal.kill();
        });
      });

      return () => {
        cleanups.forEach((cleanup) => cleanup());
      };
    },
    {
      dependencies: [prefersReducedMotion],
      scope: rootRef,
    },
  );

  return <div ref={rootRef}>{children}</div>;
}
