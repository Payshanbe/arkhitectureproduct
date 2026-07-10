import type {
  Layer,
  Scene,
  SignatureMobileBehavior,
  SignatureReducedMotionBehavior,
  SignatureTiming,
} from "@/features/signature-experience/types";

export const signatureSceneOrder = [
  "research",
  "context",
  "structure",
  "material",
  "light",
  "atmosphere",
] as const;

export const signatureLayers: Layer[] = [
  {
    alt: "Base architectural grid for the process drawing.",
    file: "grid.svg",
    id: "grid",
    label: "Grid",
    sceneId: "research",
  },
  {
    alt: "Loose site traces and survey marks.",
    file: "site.svg",
    id: "site",
    label: "Site",
    sceneId: "research",
  },
  {
    alt: "Primary structural order emerging from the site.",
    file: "structure.svg",
    id: "structure",
    label: "Structure",
    sceneId: "structure",
  },
  {
    alt: "Architectural envelope defining the spatial boundary.",
    file: "envelope.svg",
    id: "envelope",
    label: "Envelope",
    sceneId: "context",
  },
  {
    alt: "Muted material planes giving the space weight and tactility.",
    file: "materials.svg",
    id: "materials",
    label: "Materials",
    sceneId: "material",
  },
  {
    alt: "Soft light wash moving through the architectural composition.",
    file: "light.svg",
    id: "light",
    label: "Light",
    sceneId: "light",
  },
  {
    alt: "Resolved atmospheric state of the process composition.",
    file: "atmosphere.svg",
    id: "atmosphere",
    label: "Atmosphere",
    sceneId: "atmosphere",
  },
];

export const signatureScenes: Scene[] = [
  {
    description:
      "We begin by listening to the brief, the site, and the quiet rituals that will shape the work.",
    durationVh: 76,
    id: "research",
    index: "01",
    layerIds: ["grid", "site"],
    pacing: "slow",
    title: "Research",
    transition: "Loose traces appear from near-stillness.",
  },
  {
    description:
      "Existing conditions, orientation, climate, and daily movement define the first limits of the project.",
    durationVh: 78,
    id: "context",
    index: "02",
    layerIds: ["grid", "site", "envelope"],
    pacing: "measured",
    title: "Context",
    transition: "Loose traces become place.",
  },
  {
    description:
      "Proportion, circulation, and order turn early observations into a spatial framework.",
    durationVh: 84,
    id: "structure",
    index: "03",
    layerIds: ["grid", "site", "envelope", "structure"],
    pacing: "steady",
    title: "Structure",
    transition: "Place becomes order.",
  },
  {
    description:
      "Surfaces are chosen for touch, ageing, restraint, and their relationship to light.",
    durationVh: 88,
    id: "material",
    index: "04",
    layerIds: ["grid", "envelope", "structure", "materials"],
    pacing: "sensory",
    title: "Material",
    transition: "Order becomes touch.",
  },
  {
    description:
      "Light is composed as part of the architecture, shaping rhythm, depth, and stillness.",
    durationVh: 98,
    id: "light",
    index: "05",
    layerIds: ["grid", "envelope", "structure", "materials", "light"],
    pacing: "climactic",
    title: "Light",
    transition: "Touch becomes depth.",
  },
  {
    description:
      "The final space is measured by how calmly it supports life, movement, and memory.",
    durationVh: 88,
    id: "atmosphere",
    index: "06",
    layerIds: ["grid", "envelope", "structure", "materials", "light", "atmosphere"],
    pacing: "resolved",
    title: "Atmosphere",
    transition: "Depth becomes feeling.",
  },
];

export const signatureTiming: SignatureTiming = {
  anticipatePin: 1,
  scrub: 0.95,
  totalDurationVh: signatureScenes.reduce((total, scene) => total + scene.durationVh, 0),
};

export const signatureMobileBehavior: SignatureMobileBehavior = {
  pin: false,
  renderMode: "static-sequence",
  showPerSceneVisual: true,
};

export const signatureReducedMotionBehavior: SignatureReducedMotionBehavior = {
  pin: false,
  renderMode: "static-readable-sequence",
  showAllText: true,
  showFinalVisual: true,
};

export const signatureConfig = {
  layers: signatureLayers,
  mobileBehavior: signatureMobileBehavior,
  order: signatureSceneOrder,
  reducedMotionBehavior: signatureReducedMotionBehavior,
  scenes: signatureScenes,
  timing: signatureTiming,
} as const;
