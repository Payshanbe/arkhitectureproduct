"use client";

import { useEffect, type ReactNode } from "react";

import { initGSAP, ScrollTrigger } from "@/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface GSAPProviderProps {
  children: ReactNode;
}

export function GSAPProvider({ children }: GSAPProviderProps) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    initGSAP();
  }, []);

  useEffect(() => {
    initGSAP();

    if (prefersReducedMotion) {
      ScrollTrigger.disable(true, false);
      return;
    }

    ScrollTrigger.enable();
    ScrollTrigger.refresh();
  }, [prefersReducedMotion]);

  useEffect(() => {
    initGSAP();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });
    };
  }, []);

  return children;
}
