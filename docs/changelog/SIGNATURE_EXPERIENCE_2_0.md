# Signature Experience 2.0 Polish

## Summary

Polished the integrated Studio Signature Experience from working prototype toward a calmer premium signature section.

## Visual Polish

- Refined the inline Courtyard House SVG drawing with thinner architectural linework.
- Added subtle SVG hatch patterns for material fields.
- Reduced visual weight across grid, site, envelope, structure, material, light, and atmosphere layers.
- Softened the Light scene so it reads as daylight and shadow rather than a dramatic glow.
- Refined the final Atmosphere layer into a quieter resolved composition.

## Timing Polish

- Shortened total scroll distance from `560vh` to `512vh`.
- Increased scrub from `0.8` to `0.95` for calmer scroll response.
- Slowed individual layer reveal durations while keeping the overall section from becoming too long.
- Softened text crossfades and reduced vertical text movement.

## Mobile + Reduced Motion

- Preserved the non-pinned mobile fallback.
- Each mobile scene continues to include text and a lightweight SVG visual.
- Reduced motion continues to use the static readable sequence without scroll-driven animation.

## Performance Notes

- No filters, blur stacks, image sequences, Three.js, or new dependencies were added.
- Animation remains limited to opacity, transforms, and SVG stroke dash reveal.
- ScrollTrigger cleanup remains scoped to the section timeline.

## Known Follow-Ups

- Browser-review the integrated Studio section for final pacing.
- Decide whether external SVG asset files should be regenerated from the polished inline drawing.
- Review the prototype route before production launch and decide whether to hide it.
