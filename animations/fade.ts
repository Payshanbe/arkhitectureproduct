import { gsap } from "@/animations/gsap";
import type { MotionOptions, MotionTarget } from "@/animations/types";
import { prefersReducedMotion } from "@/animations/utils";

interface FadeOptions extends MotionOptions {
  from?: number;
  to?: number;
}

export function fade(target: MotionTarget, options: FadeOptions = {}) {
  const {
    delay = 0,
    duration = 0.8,
    ease = "power2.out",
    from = 0,
    reducedMotion,
    to = 1,
  } = options;

  if (prefersReducedMotion(reducedMotion)) {
    return gsap.set(target, { autoAlpha: to });
  }

  return gsap.fromTo(
    target,
    { autoAlpha: from },
    {
      autoAlpha: to,
      delay,
      duration,
      ease,
    },
  );
}
