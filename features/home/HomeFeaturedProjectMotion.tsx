"use client";

import { useRef, type ReactNode } from "react";

import { imageReveal, sectionReveal } from "@/animations";
import { useGSAP } from "@/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface HomeFeaturedProjectMotionProps {
  children: ReactNode;
}

export function HomeFeaturedProjectMotion({ children }: HomeFeaturedProjectMotionProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const root = rootRef.current;

      if (!root) {
        return;
      }

      const cleanups: Array<() => void> = [];
      const imageFrame = root.querySelector<HTMLElement>("[data-featured-project-image-frame]");
      const image = root.querySelector<HTMLElement>("[data-featured-project-image]");

      if (imageFrame) {
        const reveal = imageReveal(imageFrame, {
          duration: 1.25,
          image: image ?? undefined,
          reducedMotion: prefersReducedMotion,
          scaleFrom: 1.018,
          scrollTrigger: {
            start: "top 78%",
          },
        });

        cleanups.push(() => {
          reveal.kill();
        });
      }

      root.querySelectorAll<HTMLElement>("[data-featured-project-text]").forEach((element, index) => {
        const reveal = sectionReveal(element, {
          delay: index * 0.07,
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
