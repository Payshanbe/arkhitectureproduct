import type { gsap } from "@/animations/gsap";

export interface MotionOptions {
  delay?: number;
  duration?: number;
  ease?: string;
  reducedMotion?: boolean;
}

export interface ScrollMotionOptions extends MotionOptions {
  scrollTrigger?: ScrollTrigger.Vars | false;
}

export type MotionTarget = gsap.DOMTarget;

export type MotionCleanup = () => void;
