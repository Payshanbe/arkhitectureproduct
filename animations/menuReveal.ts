import { gsap } from "@/animations/gsap";
import type { MotionOptions, MotionTarget } from "@/animations/types";
import { prefersReducedMotion } from "@/animations/utils";

interface MenuRevealOptions extends MotionOptions {
  background?: MotionTarget;
  items?: MotionTarget;
  panel?: MotionTarget;
  supporting?: MotionTarget;
}

export function menuReveal(options: MenuRevealOptions = {}) {
  const {
    background,
    delay = 0,
    duration = 0.65,
    ease = "power3.out",
    items,
    panel,
    reducedMotion,
    supporting,
  } = options;

  const timeline = gsap.timeline({ delay, paused: true });

  if (prefersReducedMotion(reducedMotion)) {
    timeline.set([background, panel, items, supporting].filter(Boolean), {
      autoAlpha: 1,
      clearProps: "transform",
    });

    return timeline;
  }

  if (background) {
    timeline.fromTo(
      background,
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: duration * 0.8,
        ease,
      },
      0,
    );
  }

  if (panel) {
    timeline.fromTo(
      panel,
      { autoAlpha: 0, yPercent: -4 },
      {
        autoAlpha: 1,
        duration,
        ease,
        yPercent: 0,
      },
      0,
    );
  }

  if (items) {
    timeline.fromTo(
      items,
      { autoAlpha: 0, y: 24 },
      {
        autoAlpha: 1,
        duration: duration * 0.75,
        ease,
        stagger: 0.06,
        y: 0,
      },
      duration * 0.25,
    );
  }

  if (supporting) {
    timeline.fromTo(
      supporting,
      { autoAlpha: 0, y: 12 },
      {
        autoAlpha: 1,
        duration: duration * 0.7,
        ease,
        y: 0,
      },
      duration * 0.45,
    );
  }

  return timeline;
}
