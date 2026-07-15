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

export function hasConnectedTarget(target: gsap.DOMTarget) {
  if (typeof window === "undefined") {
    return false;
  }

  return toElementArray(target).some((element) => element.isConnected);
}

export function defaultScrollTrigger(
  target: gsap.DOMTarget,
  scrollTrigger?: ScrollTrigger.Vars | false,
): ScrollTrigger.Vars | undefined {
  if (scrollTrigger === false) {
    return undefined;
  }

  if (!hasConnectedTarget(target)) {
    return undefined;
  }

  const trigger = scrollTrigger?.trigger ?? target;

  if (!hasConnectedTarget(trigger)) {
    return undefined;
  }

  return {
    invalidateOnRefresh: true,
    start: "top 85%",
    toggleActions: "play none none none",
    trigger,
    ...scrollTrigger,
  };
}
