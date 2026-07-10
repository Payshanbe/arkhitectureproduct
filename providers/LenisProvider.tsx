"use client";

import Lenis from "lenis";
import { createContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { gsap, initGSAP, ScrollTrigger } from "@/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface LenisContextValue {
  isSmoothScrolling: boolean;
  lenis: Lenis | null;
}

interface LenisProviderProps {
  children: ReactNode;
}

export const LenisContext = createContext<LenisContextValue | null>(null);

export function LenisProvider({ children }: LenisProviderProps) {
  const prefersReducedMotion = useReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    initGSAP();

    if (prefersReducedMotion) {
      ScrollTrigger.update();
      return;
    }

    let isActive = true;
    const lenisInstance = new Lenis({
      anchors: true,
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: false,
    });

    const unsubscribeScroll = lenisInstance.on("scroll", ScrollTrigger.update);
    const updateLenis = (time: number) => {
      lenisInstance.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);
    queueMicrotask(() => {
      if (isActive) {
        setLenis(lenisInstance);
      }
    });
    ScrollTrigger.refresh();

    return () => {
      isActive = false;
      unsubscribeScroll();
      gsap.ticker.remove(updateLenis);
      lenisInstance.destroy();
      queueMicrotask(() => {
        setLenis(null);
      });
      ScrollTrigger.refresh();
    };
  }, [prefersReducedMotion]);

  const value = useMemo<LenisContextValue>(
    () => ({
      isSmoothScrolling: Boolean(lenis),
      lenis,
    }),
    [lenis],
  );

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
}
