import type { SceneAnimationConfig } from "@/features/signature-experience/types";

export const signatureAnimationConfig: SceneAnimationConfig[] = [
  {
    enter: {
      delay: 0,
      duration: 1,
      easing: "power2.out",
      targetLayers: ["grid"],
    },
    exit: {
      delay: 0,
      duration: 0.45,
      easing: "power2.out",
      targetLayers: ["site"],
    },
    sceneId: "research",
  },
  {
    enter: {
      delay: 0.05,
      duration: 1.05,
      easing: "power2.out",
      targetLayers: ["site", "envelope"],
    },
    exit: {
      delay: 0,
      duration: 0.4,
      easing: "power2.out",
      targetLayers: ["site"],
    },
    sceneId: "context",
  },
  {
    enter: {
      delay: 0,
      duration: 1.1,
      easing: "power2.out",
      targetLayers: ["structure"],
    },
    exit: {
      delay: 0,
      duration: 0.45,
      easing: "power2.out",
      targetLayers: ["structure"],
    },
    sceneId: "structure",
  },
  {
    enter: {
      delay: 0.04,
      duration: 1.15,
      easing: "power2.out",
      targetLayers: ["materials"],
    },
    exit: {
      delay: 0,
      duration: 0.45,
      easing: "power2.out",
      targetLayers: ["materials"],
    },
    sceneId: "material",
  },
  {
    enter: {
      delay: 0.02,
      duration: 1.25,
      easing: "power2.out",
      targetLayers: ["light"],
    },
    exit: {
      delay: 0,
      duration: 0.6,
      easing: "power2.out",
      targetLayers: ["light"],
    },
    sceneId: "light",
  },
  {
    enter: {
      delay: 0,
      duration: 1.2,
      easing: "power2.out",
      targetLayers: ["atmosphere"],
    },
    exit: {
      delay: 0,
      duration: 0.45,
      easing: "power2.out",
      targetLayers: ["atmosphere"],
    },
    sceneId: "atmosphere",
  },
];
