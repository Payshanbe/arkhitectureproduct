"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface WorkArchiveMotionProps {
  children: ReactNode;
}

export function WorkArchiveMotion({ children }: WorkArchiveMotionProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const elements = Array.from(root.querySelectorAll<HTMLElement>("[data-work-reveal]"));
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      elements.forEach((element) => {
        element.dataset.workVisible = "true";
      });

      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const element = entry.target as HTMLElement;
          element.dataset.workVisible = "true";
          observer.unobserve(element);
        });
      },
      {
        rootMargin: "0px 0px -6% 0px",
        threshold: 0.12,
      },
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
