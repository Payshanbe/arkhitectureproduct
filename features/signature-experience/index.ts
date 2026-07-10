export { signatureConfig } from "@/features/signature-experience/signature-config";
export { signatureAnimationConfig } from "@/features/signature-experience/signature-animation-config";
export type {
  AnimationState,
  Layer,
  LayerId,
  LayerState,
  LayerTransform,
  LayerVisibility,
  Scene,
  SceneAnimationConfig,
  SceneAnimationPhase,
  SceneEngineState,
  SceneId,
  ScrollProgress,
  SignatureMobileBehavior,
  SignatureReducedMotionBehavior,
  SignatureTiming,
} from "@/features/signature-experience/types";
export {
  createHiddenLayerState,
  createPartialLayerState,
  createVisibleLayerState,
  getLayerStatesForScene,
  getReducedMotionLayerStates,
} from "@/features/signature-experience/utils/layers";
export { clampProgress, getSceneProgress } from "@/features/signature-experience/utils/progress";
export { createSceneEngineState } from "@/features/signature-experience/utils/scene-engine";

