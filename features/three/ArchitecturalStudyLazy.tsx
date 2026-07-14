"use client";

import dynamic from "next/dynamic";

/**
 * Client-side loader for the Three.js study. The WebGL bundle stays out
 * of the initial payload and never renders on the server.
 */
export const ArchitecturalStudyLazy = dynamic(
  () => import("@/features/three/ArchitecturalStudy").then((mod) => mod.ArchitecturalStudy),
  { ssr: false },
);
