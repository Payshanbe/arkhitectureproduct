import { gsap, initGSAP } from "@/animations/gsap";
import type { MotionTarget, ScrollMotionOptions } from "@/animations/types";
import { defaultScrollTrigger, prefersReducedMotion } from "@/animations/utils";

interface SectionRevealOptions extends ScrollMotionOptions {
  y?: number;
}

export function sectionReveal(target: MotionTarget, options: SectionRevealOptions = {}) {
  const {
    delay = 0,
    duration = 0.8,
    ease = "power3.out",
    reducedMotion,
    scrollTrigger,
    y = 24,
  } = options;

  if (prefersReducedMotion(reducedMotion)) {
    return gsap.set(target, { autoAlpha: 1, y: 0 });
  }

  initGSAP();

  return gsap.fromTo(
    target,
    { autoAlpha: 0, y },
    {
      autoAlpha: 1,
      delay,
      duration,
      ease,
      scrollTrigger: defaultScrollTrigger(target, scrollTrigger),
      y: 0,
    },
  );
}
