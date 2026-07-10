import { gsap } from "@/animations/gsap";
import type { MotionOptions, MotionTarget } from "@/animations/types";
import { prefersReducedMotion } from "@/animations/utils";

interface StaggerOptions extends MotionOptions {
  stagger?: number;
  y?: number;
}

export function stagger(targets: MotionTarget, options: StaggerOptions = {}) {
  const {
    delay = 0,
    duration = 0.7,
    ease = "power3.out",
    reducedMotion,
    stagger = 0.08,
    y = 16,
  } = options;

  if (prefersReducedMotion(reducedMotion)) {
    return gsap.set(targets, { autoAlpha: 1, y: 0 });
  }

  return gsap.fromTo(
    targets,
    { autoAlpha: 0, y },
    {
      autoAlpha: 1,
      delay,
      duration,
      ease,
      stagger,
      y: 0,
    },
  );
}
