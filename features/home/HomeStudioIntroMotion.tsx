"use client";

import { useRef, type ReactNode } from "react";

import { sectionReveal } from "@/animations";
import { useGSAP } from "@/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface HomeStudioIntroMotionProps {
  children: ReactNode;
}

export function HomeStudioIntroMotion({ children }: HomeStudioIntroMotionProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const root = rootRef.current;

      if (!root) {
        return;
      }

      const cleanups: Array<() => void> = [];

      root.querySelectorAll<HTMLElement>("[data-studio-intro-reveal]").forEach((element, index) => {
        const reveal = sectionReveal(element, {
          delay: index * 0.08,
          duration: 0.8,
          reducedMotion: prefersReducedMotion,
          scrollTrigger: {
            start: "top 82%",
          },
          y: 18,
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
