import type { Scene, SceneEngineState } from "@/features/signature-experience/types";
import { getSceneProgress } from "@/features/signature-experience/utils/progress";

export function createSceneEngineState(scenes: Scene[], rawProgress: number): SceneEngineState {
  if (scenes.length === 0) {
    throw new Error("Signature Experience requires at least one scene.");
  }

  const progress = getSceneProgress(scenes, rawProgress);
  const currentSceneIndex = Math.min(progress.sceneIndex, scenes.length - 1);

  return {
    currentScene: scenes[currentSceneIndex],
    currentSceneIndex,
    nextScene: scenes[currentSceneIndex + 1] ?? null,
    normalizedProgress: progress.clamped,
    previousScene: scenes[currentSceneIndex - 1] ?? null,
    progress,
  };
}

