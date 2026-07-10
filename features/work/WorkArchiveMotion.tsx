"use client";

import { useRef, type ReactNode } from "react";

import { imageReveal, sectionReveal } from "@/animations";
import { useGSAP } from "@/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface WorkArchiveMotionProps {
  children: ReactNode;
}

export function WorkArchiveMotion({ children }: WorkArchiveMotionProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const root = rootRef.current;

      if (!root) {
        return;
      }

      const cleanups: Array<() => void> = [];

      root.querySelectorAll<HTMLElement>("[data-work-reveal]").forEach((element, index) => {
        const reveal = sectionReveal(element, {
          delay: index * 0.06,
          duration: 0.85,
          reducedMotion: prefersReducedMotion,
          scrollTrigger: {
            start: "top 84%",
          },
          y: 18,
        });

        cleanups.push(() => {
          reveal.kill();
        });
      });

      root.querySelectorAll<HTMLElement>("[data-work-image-frame]").forEach((frame) => {
        const image = frame.querySelector<HTMLElement>("[data-work-image]");
        const reveal = imageReveal(frame, {
          duration: 1.05,
          image: image ?? undefined,
          reducedMotion: prefersReducedMotion,
          scaleFrom: 1.02,
          scrollTrigger: {
            start: "top 80%",
          },
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
