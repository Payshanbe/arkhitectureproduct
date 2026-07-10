import type {
  Layer,
  LayerId,
  LayerState,
  Scene,
} from "@/features/signature-experience/types";

const defaultTransform = {
  scale: 1,
  x: 0,
  y: 0,
};

export function createHiddenLayerState(id: LayerId, zIndex: number): LayerState {
  return {
    id,
    opacity: 0,
    transform: defaultTransform,
    visibility: "hidden",
    zIndex,
  };
}

export function createVisibleLayerState(id: LayerId, zIndex: number): LayerState {
  return {
    id,
    opacity: 1,
    transform: defaultTransform,
    visibility: "visible",
    zIndex,
  };
}

export function createPartialLayerState(id: LayerId, opacity: number, zIndex: number): LayerState {
  return {
    id,
    opacity,
    transform: defaultTransform,
    visibility: "partial",
    zIndex,
  };
}

export function getLayerStatesForScene(layers: Layer[], scene: Scene): LayerState[] {
  const visibleLayerIds = new Set<LayerId>(scene.layerIds);

  return layers.map((layer, index) => {
    if (visibleLayerIds.has(layer.id)) {
      return createVisibleLayerState(layer.id, index);
    }

    return createHiddenLayerState(layer.id, index);
  });
}

export function getReducedMotionLayerStates(layers: Layer[], finalScene: Scene): LayerState[] {
  const finalLayerIds = new Set<LayerId>(finalScene.layerIds);

  return layers.map((layer, index) => {
    if (finalLayerIds.has(layer.id)) {
      return createVisibleLayerState(layer.id, index);
    }

    return createHiddenLayerState(layer.id, index);
  });
}

