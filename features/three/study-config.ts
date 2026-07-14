/**
 * Architectural study — editable configuration.
 *
 * Every visual decision for the Three.js study model lives here so the
 * scene can be re-tuned without touching the rendering logic. Colors
 * mirror the token palette in `styles/tokens.css`.
 */

export const studyConfig = {
  colors: {
    /** Matches --color-text-primary. */
    line: 0x1f1d1a,
    /** Primary line opacity for the built volumes. */
    lineOpacity: 0.82,
    /** Faint opacity for the ground grid (drawing-sheet guides). */
    gridOpacity: 0.14,
  },

  camera: {
    fov: 30,
    position: [4.6, 2.8, 6.8] as const,
    lookAt: [0, 0.5, 0] as const,
  },

  motion: {
    /** Radians per second of idle rotation. Keep slow and deliberate. */
    idleRotationSpeed: 0.06,
    /** Additional rotation applied across the section scroll (radians). */
    scrollRotation: 0.9,
    /** Pointer drift strength; 0 disables. */
    pointerDrift: 0.16,
    /** Lerp factor for pointer smoothing (lower = calmer). */
    pointerEase: 0.035,
    /** Resting angle used for the reduced-motion static frame. */
    restingAngle: 0.55,
  },

  /**
   * The maquette: staggered volumes on slender columns over a plinth.
   * Volumes are [width, height, depth, x, y, z] in scene units.
   */
  structure: {
    volumes: [
      [2.6, 0.72, 1.6, -0.5, 0.36, 0.3],
      [2.2, 0.72, 1.5, 0.35, 1.16, -0.25],
      [1.7, 0.72, 1.3, 1.1, 1.96, 0.15],
    ] as const,
    columns: {
      size: [0.045, 0.9, 0.045] as const,
      positions: [
        [-1.6, -0.45, 0.9],
        [0.6, -0.45, 0.9],
        [-1.6, -0.45, -0.4],
        [0.6, -0.45, -0.4],
      ] as const,
    },
    plinth: {
      size: [3.4, 0.12, 2.3] as const,
      position: [-0.4, -0.96, 0.25] as const,
    },
    grid: {
      halfExtent: 6,
      step: 0.75,
      y: -1.02,
    },
  },

  renderer: {
    maxPixelRatio: 2,
  },
} as const;

export type StudyVariant = "plate" | "hero";

/**
 * Hero framing: the maquette sits right of center so the headline block
 * on the left keeps clear air. The camera pulls back slightly and the
 * scroll rotation is calmer — the hero scrolls past only once.
 */
export const heroStudyConfig = {
  ...studyConfig,
  camera: {
    fov: 30,
    position: [5.2, 3.1, 7.8] as const,
    lookAt: [-1.5, 0.7, 0] as const,
  },
  motion: {
    ...studyConfig.motion,
    idleRotationSpeed: 0.045,
    scrollRotation: 0.55,
    pointerDrift: 0.12,
  },
} as const;

export function resolveStudyConfig(variant: StudyVariant) {
  return variant === "hero" ? heroStudyConfig : studyConfig;
}
