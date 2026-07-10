# Signature Experience Engine

## Purpose

The Signature Experience Engine defines the internal state model for the Version 1.1 Studio process experience.

It does not animate anything yet. It prepares the architecture for future GSAP and ScrollTrigger implementation by separating:

- scene state;
- scroll progress;
- layer state;
- animation configuration;
- desktop, mobile, and reduced-motion strategies.

The engine is intentionally framework-light. It is a TypeScript state and configuration layer that future React components and hooks can consume.

---

## Feature Location

```txt
features/signature-experience/
```

Internal structure:

```txt
components/
hooks/
types/
assets/
utils/
```

Current responsibility:

- `types/` defines the state contracts.
- `signature-config.ts` defines scenes, order, timing, mobile behavior, and reduced-motion behavior.
- `signature-animation-config.ts` defines animation intent only.
- `utils/` contains pure helpers for progress, scene state, and layer state.
- `assets/` contains placeholder SVG layer files.

---

## Scene Flow

The experience contains six scenes:

```txt
Research
Context
Structure
Material
Light
Atmosphere
```

The scene order is defined in `signatureSceneOrder`.

Each scene contains:

- `id`;
- `index`;
- `title`;
- `description`;
- `durationVh`;
- `layerIds`;
- `pacing`;
- `transition`.

The engine derives the active scene from normalized scroll progress.

Example:

```txt
raw scroll progress: 0.42
-> clamped progress: 0.42
-> scene index: 2
-> current scene: Structure
-> previous scene: Context
-> next scene: Material
-> scene progress: local 0-1 progress inside Structure
```

---

## State Machine

The engine state is represented by `SceneEngineState`.

```txt
SceneEngineState
currentScene
previousScene
nextScene
currentSceneIndex
progress
normalizedProgress
```

`progress` is represented by `ScrollProgress`.

```txt
ScrollProgress
raw
clamped
sceneIndex
sceneProgress
```

Rules:

- `raw` is the incoming scroll progress.
- `clamped` is always normalized between `0` and `1`.
- `sceneIndex` identifies the active scene.
- `sceneProgress` represents local progress inside the active scene.

The state machine does not know about GSAP, DOM nodes, refs, or ScrollTrigger. That separation keeps the engine testable and reusable.

---

## Layer Flow

The experience supports multiple SVG layers.

Current layer IDs:

```txt
grid
site
structure
envelope
materials
light
atmosphere
```

Each layer can be:

```txt
hidden
partial
visible
```

Each resolved layer state exposes:

```txt
id
opacity
transform
zIndex
visibility
```

The engine uses `LayerState` as the future bridge between scene logic and render logic.

Future renderers can use this state to decide:

- whether a layer should be mounted;
- whether it should be visually hidden;
- what opacity it should use;
- what transform should be applied;
- how layers should stack.

---

## Animation Configuration

`signature-animation-config.ts` defines animation intent for every scene.

Each scene animation config contains:

```txt
sceneId
enter
exit
```

Each `enter` and `exit` phase contains:

```txt
duration
delay
easing
targetLayers
```

This is configuration only. It does not run animation.

Future implementation should map these values into GSAP timelines inside scoped client components or hooks.

---

## Desktop Strategy

Desktop is designed for a pinned scroll experience.

Config intent:

```txt
pin: true in future implementation
scrub: 0.8
anticipatePin: 1
```

The scene durations are measured in viewport height units and currently total:

```txt
560vh
```

Desktop should use this engine to derive:

- active scene;
- previous scene;
- next scene;
- progress;
- active layer states.

---

## Mobile Strategy

Mobile should not use pinned scroll.

Configured behavior:

```txt
renderMode: static-sequence
pin: false
showPerSceneVisual: true
```

The mobile version should render scenes sequentially in document flow. The same scene data should be reused, but scroll-driven animation should be avoided.

---

## Reduced Motion Strategy

Reduced motion should immediately reveal final readable states.

Configured behavior:

```txt
renderMode: static-readable-sequence
pin: false
showAllText: true
showFinalVisual: true
```

Reduced-motion users should never lose content. The process explanation must remain fully available in semantic HTML.

---

## Performance Preparation

The engine is prepared for future performance work without implementing optimization prematurely.

Future capabilities:

- lazy SVG loading;
- memoized scene and layer state;
- requestAnimationFrame-friendly update loops;
- DOM writes limited to renderer layer;
- reduced-motion short circuit;
- mobile static rendering.

Current pure helpers are side-effect free, which makes them suitable for memoization.

---

## Future Extensibility

The engine can later support:

- per-layer transform presets;
- progressive layer opacity by scene progress;
- asset preloading states;
- scene snapping if desired;
- CMS-managed scene copy;
- alternate mobile scene order;
- A/B testing scroll length;
- non-SVG renderer adapters.

The important boundary:

```txt
Engine decides state.
Renderer applies visuals.
Motion layer animates transitions.
```

This keeps the future implementation from becoming one large bespoke component.
