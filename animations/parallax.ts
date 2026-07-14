import { gsap, initGSAP } from "@/animations/gsap";
import type { MotionTarget, ScrollMotionOptions } from "@/animations/types";
import { defaultScrollTrigger, hasConnectedTarget, prefersReducedMotion } from "@/animations/utils";

interface ParallaxOptions extends ScrollMotionOptions {
  fromYPercent?: number;
  scrub?: boolean | number;
  toYPercent?: number;
}

export function parallax(target: MotionTarget, options: ParallaxOptions = {}) {
  const {
    duration = 1,
    ease = "none",
    fromYPercent = 8,
    reducedMotion,
    scrollTrigger,
    scrub = true,
    toYPercent = -8,
  } = options;

  initGSAP();

  if (!hasConnectedTarget(target)) {
    return gsap.set(target, { yPercent: 0 });
  }

  if (prefersReducedMotion(reducedMotion)) {
    return gsap.set(target, { yPercent: 0 });
  }

  return gsap.fromTo(
    target,
    { yPercent: fromYPercent },
    {
      duration,
      ease,
      scrollTrigger: defaultScrollTrigger(target, {
        end: "bottom top",
        scrub,
        start: "top bottom",
        ...scrollTrigger,
      }),
      yPercent: toYPercent,
    },
  );
}
