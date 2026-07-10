import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export function initGSAP() {
  if (typeof window === "undefined") {
    return;
  }

  // GSAP registration is idempotent. Re-registering on the client keeps
  // ScrollTrigger available after Next.js Fast Refresh or route remounts.
  gsap.registerPlugin(ScrollTrigger, useGSAP);

  const core = gsap.core as unknown as {
    globals?: (name: string, plugin: unknown) => void;
  };

  core.globals?.("ScrollTrigger", ScrollTrigger);

  ScrollTrigger.config({
    ignoreMobileResize: true,
  });
}

export { gsap, ScrollTrigger, useGSAP };
