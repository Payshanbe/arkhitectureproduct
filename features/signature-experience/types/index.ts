export type SceneId =
  | "research"
  | "context"
  | "structure"
  | "material"
  | "light"
  | "atmosphere";

export type LayerId =
  | "grid"
  | "site"
  | "structure"
  | "envelope"
  | "materials"
  | "light"
  | "atmosphere";

export interface Layer {
  alt: string;
  file: string;
  id: LayerId;
  label: string;
  sceneId: SceneId;
}

export type LayerVisibility = "hidden" | "partial" | "visible";

export interface LayerTransform {
  scale: number;
  x: number;
  y: number;
}

export interface LayerState {
  id: LayerId;
  opacity: number;
  transform: LayerTransform;
  visibility: LayerVisibility;
  zIndex: number;
}

export interface Scene {
  description: string;
  durationVh: number;
  id: SceneId;
  index: string;
  layerIds: LayerId[];
  pacing: "slow" | "measured" | "steady" | "sensory" | "climactic" | "resolved";
  title: string;
  transition: string;
}

export interface SceneEngineState {
  currentScene: Scene;
  currentSceneIndex: number;
  nextScene: Scene | null;
  normalizedProgress: number;
  previousScene: Scene | null;
  progress: ScrollProgress;
}

export interface AnimationState {
  activeLayerIds: LayerId[];
  activeSceneId: SceneId;
  layers: LayerState[];
  progress: ScrollProgress;
}

export interface ScrollProgress {
  clamped: number;
  raw: number;
  sceneIndex: number;
  sceneProgress: number;
}

export interface SceneAnimationPhase {
  delay: number;
  duration: number;
  easing: string;
  targetLayers: LayerId[];
}

export interface SceneAnimationConfig {
  enter: SceneAnimationPhase;
  exit: SceneAnimationPhase;
  sceneId: SceneId;
}

export interface SignatureTiming {
  anticipatePin: number;
  scrub: number;
  totalDurationVh: number;
}

export interface SignatureMobileBehavior {
  pin: false;
  renderMode: "static-sequence";
  showPerSceneVisual: boolean;
}

export interface SignatureReducedMotionBehavior {
  pin: false;
  renderMode: "static-readable-sequence";
  showAllText: true;
  showFinalVisual: boolean;
}
