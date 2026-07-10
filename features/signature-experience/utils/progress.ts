import type { Scene, ScrollProgress } from "@/features/signature-experience/types";

export function clampProgress(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function getSceneProgress(scenes: Scene[], rawProgress: number): ScrollProgress {
  const clamped = clampProgress(rawProgress);

  if (scenes.length === 0) {
    return {
      clamped,
      raw: rawProgress,
      sceneIndex: 0,
      sceneProgress: clamped,
    };
  }

  const totalDuration = scenes.reduce((total, scene) => total + scene.durationVh, 0);
  const currentDuration = clamped * totalDuration;
  let accumulatedDuration = 0;

  for (let index = 0; index < scenes.length; index += 1) {
    const scene = scenes[index];
    const nextDuration = accumulatedDuration + scene.durationVh;

    if (currentDuration <= nextDuration || index === scenes.length - 1) {
      const sceneDuration = scene.durationVh || 1;
      const sceneProgress = clampProgress((currentDuration - accumulatedDuration) / sceneDuration);

      return {
        clamped,
        raw: rawProgress,
        sceneIndex: index,
        sceneProgress,
      };
    }

    accumulatedDuration = nextDuration;
  }

  return {
    clamped,
    raw: rawProgress,
    sceneIndex: scenes.length - 1,
    sceneProgress: 1,
  };
}

