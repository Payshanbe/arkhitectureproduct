# EPIC 02A — Premium Navigation

## Summary

Refined the global navigation into a premium floating header while preserving existing routes, menu behavior, accessibility hooks, and public site architecture.

## Changes

- Added a centered floating header shell aligned to the site content width.
- Added warm translucent backgrounds, backdrop blur, subtle border treatment, and soft shadow.
- Added scroll-aware header styling with a calmer hero-top state and a stronger scrolled state.
- Refined navigation typography with uppercase 13–14px sizing and increased letter spacing.
- Preserved the existing underline active state and hover/focus behavior.
- Applied the same warm blurred visual language to the mobile fullscreen menu top control area.

## Accessibility

- Existing `aria-expanded`, `aria-controls`, route active state, Escape handling, focus trap, and body scroll lock behavior remain in place.
- Focus-visible styles remain available through the global focus system.
- Reduced motion users receive the existing global transition-duration reduction.

## Verification

- `npm run lint`
- `npm run build`
