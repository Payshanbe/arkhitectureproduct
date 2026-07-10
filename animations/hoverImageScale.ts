import { gsap } from "@/animations/gsap";
import type { MotionCleanup, MotionOptions } from "@/animations/types";
import { prefersReducedMotion } from "@/animations/utils";

interface HoverImageScaleOptions extends MotionOptions {
  scale?: number;
}

export function hoverImageScale(
  trigger: HTMLElement,
  image: HTMLElement,
  options: HoverImageScaleOptions = {},
): MotionCleanup {
  const { duration = 0.35, ease = "power2.out", reducedMotion, scale = 1.03 } = options;

  if (prefersReducedMotion(reducedMotion)) {
    gsap.set(image, { scale: 1 });

    return () => undefined;
  }

  const enter = () => {
    gsap.to(image, {
      duration,
      ease,
      overwrite: "auto",
      scale,
    });
  };

  const leave = () => {
    gsap.to(image, {
      duration,
      ease,
      overwrite: "auto",
      scale: 1,
    });
  };

  trigger.addEventListener("pointerenter", enter);
  trigger.addEventListener("pointerleave", leave);
  trigger.addEventListener("focus", enter);
  trigger.addEventListener("blur", leave);

  return () => {
    trigger.removeEventListener("pointerenter", enter);
    trigger.removeEventListener("pointerleave", leave);
    trigger.removeEventListener("focus", enter);
    trigger.removeEventListener("blur", leave);
    gsap.killTweensOf(image);
    gsap.set(image, { scale: 1 });
  };
}
