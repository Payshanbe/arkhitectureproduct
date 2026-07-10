import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

let registered = false;

export function initGSAP() {
  if (typeof window === "undefined") {
    return;
  }

  if (registered) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger, useGSAP);

  const core = gsap.core as unknown as {
    globals?: (name: string, plugin: unknown) => void;
  };

  core.globals?.("ScrollTrigger", ScrollTrigger);

  ScrollTrigger.config({
    ignoreMobileResize: true,
  });

  registered = true;
}

export { gsap, ScrollTrigger, useGSAP };
