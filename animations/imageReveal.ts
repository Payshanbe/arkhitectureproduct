import { gsap, initGSAP } from "@/animations/gsap";
import type { MotionTarget, ScrollMotionOptions } from "@/animations/types";
import { defaultScrollTrigger, hasConnectedTarget, prefersReducedMotion } from "@/animations/utils";

interface ImageRevealOptions extends ScrollMotionOptions {
  image?: MotionTarget;
  scaleFrom?: number;
}

export function imageReveal(target: MotionTarget, options: ImageRevealOptions = {}) {
  const {
    delay = 0,
    duration = 1,
    ease = "power3.out",
    image,
    reducedMotion,
    scaleFrom = 1.04,
    scrollTrigger,
  } = options;

  initGSAP();

  if (!hasConnectedTarget(target)) {
    return gsap.timeline().set(target, { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)" });
  }

  const timeline = gsap.timeline({
    delay,
    scrollTrigger: prefersReducedMotion(reducedMotion)
      ? undefined
      : defaultScrollTrigger(target, scrollTrigger),
  });

  if (prefersReducedMotion(reducedMotion)) {
    timeline.set(target, { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)" });

    if (image) {
      timeline.set(image, { scale: 1 }, 0);
    }

    return timeline;
  }

  timeline.fromTo(
    target,
    { autoAlpha: 1, clipPath: "inset(0% 0% 100% 0%)" },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      duration,
      ease,
    },
  );

  if (image) {
    timeline.fromTo(
      image,
      { scale: scaleFrom },
      {
        duration,
        ease,
        scale: 1,
      },
      0,
    );
  }

  return timeline;
}
