# EPIC 01D - Signature Experience Prototype Animation

## Summary

Animated the Signature Experience prototype route using the existing GSAP, ScrollTrigger, Lenis, engine, configuration, and visual language.

## Route

```txt
/prototype/signature-experience
```

## Completed

- Added a reusable Signature Drawing component for the Courtyard House layered SVG system.
- Switched the prototype route to the animated engine-driven component.
- Used `signatureConfig` for scenes, timing, and layer data.
- Used `signatureAnimationConfig` for layer enter timing, easing, duration, delay, and target layers.
- Used `createSceneEngineState` to derive active scene from ScrollTrigger progress.
- Added desktop pinned scroll animation.
- Added stroke-dash reveal for architectural linework.
- Preserved mobile and reduced-motion static sequence behavior.

## Animation Structure

- Grid is visible first.
- Site and envelope reveal next.
- Structure fades and draws into place.
- Material hatching appears subtly.
- Light enters slowly as the emotional peak.
- Atmosphere fades in as the final resolved composition.

## Notes

- The public Studio page was not modified.
- No Three.js dependency was added.
- No image sequence was added.
- Payload was not changed.

## Verification

- `npm run lint`
- `npm run build`
- `npm run dev`

