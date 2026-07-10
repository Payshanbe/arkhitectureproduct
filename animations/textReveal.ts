import SplitType from "split-type";

import { gsap } from "@/animations/gsap";
import type { MotionOptions } from "@/animations/types";
import { prefersReducedMotion } from "@/animations/utils";

type SplitTarget =
  string | HTMLElement | ArrayLike<HTMLElement> | Array<HTMLElement | ArrayLike<HTMLElement>>;

type TextRevealSplitBy = "lines" | "words" | "chars";

interface TextRevealOptions extends MotionOptions {
  splitBy?: TextRevealSplitBy;
  stagger?: number;
  yPercent?: number;
}

interface TextRevealResult {
  revert: () => void;
  split: SplitType | null;
  timeline: gsap.core.Timeline;
}

export function textReveal(target: SplitTarget, options: TextRevealOptions = {}): TextRevealResult {
  const {
    delay = 0,
    duration = 0.8,
    ease = "power3.out",
    reducedMotion,
    splitBy = "lines",
    stagger = 0.08,
    yPercent = 100,
  } = options;

  const timeline = gsap.timeline({ delay });

  if (prefersReducedMotion(reducedMotion)) {
    timeline.set(target, { autoAlpha: 1 });

    return {
      revert: () => undefined,
      split: null,
      timeline,
    };
  }

  const split = new SplitType(target, {
    tagName: "span",
    types: splitBy,
  });
  const elements = split[splitBy] ?? [];

  timeline.set(target, { autoAlpha: 1 }).fromTo(
    elements,
    { autoAlpha: 0, yPercent },
    {
      autoAlpha: 1,
      duration,
      ease,
      stagger,
      yPercent: 0,
    },
    0,
  );

  return {
    revert: () => {
      split.revert();
    },
    split,
    timeline,
  };
}
