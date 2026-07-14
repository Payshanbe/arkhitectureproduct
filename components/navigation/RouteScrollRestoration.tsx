"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { initGSAP, ScrollTrigger } from "@/animations/gsap";

export function RouteScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    initGSAP();

    window.requestAnimationFrame(() => {
      window.scrollTo({
        behavior: "instant",
        left: 0,
        top: 0,
      });

      window.requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });
  }, [pathname]);

  return null;
}
