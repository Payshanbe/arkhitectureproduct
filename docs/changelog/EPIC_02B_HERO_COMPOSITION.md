# EPIC 02B — Hero Composition Polish

## Summary

Refined the homepage hero into a calmer premium editorial composition without changing content, routing, CMS, navigation, or page architecture.

## Composition

- Reduced the hero text footprint so the image carries more of the first impression.
- Increased bottom breathing room for a slower editorial landing.
- Refined the hero image crop on small screens while preserving the existing image source and `next/image` setup.
- Softened overlay opacity so the architecture photograph feels more present.

## Typography

- Reduced headline clamp from `clamp(2.65rem, 6.4vw, 7rem)` to `clamp(2.45rem, 5.6vw, 6.25rem)`.
- Increased headline line-height from `0.99` to `1.05`.
- Reduced supporting copy width from `520px` to `440px`.
- Made supporting copy slightly smaller and airier with `line-height: 1.72`.

## Motion

- Refined the reveal sequence:
  1. Image
  2. Editorial label / headline
  3. Supporting copy
  4. Scroll cue
- Reduced image scale intensity and made the timing slower.

## Verification

- `npm run lint`
- `npm run build`
