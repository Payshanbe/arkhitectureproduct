import { gsap } from "@/animations/gsap";

export function prefersReducedMotion(reducedMotion?: boolean) {
  if (typeof reducedMotion === "boolean") {
    return reducedMotion;
  }

  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function toElementArray(target: gsap.DOMTarget) {
  return gsap.utils.toArray<Element>(target);
}

export function defaultScrollTrigger(
  target: gsap.DOMTarget,
  scrollTrigger?: ScrollTrigger.Vars | false,
): ScrollTrigger.Vars | undefined {
  if (scrollTrigger === false) {
    return undefined;
  }

  return {
    once: true,
    start: "top 85%",
    trigger: target,
    ...scrollTrigger,
  };
}
