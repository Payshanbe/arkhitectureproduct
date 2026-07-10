"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function RouteScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    window.requestAnimationFrame(() => {
      window.scrollTo({
        behavior: "instant",
        left: 0,
        top: 0,
      });
    });
  }, [pathname]);

  return null;
}
