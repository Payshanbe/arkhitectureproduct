# Phase 04B - Motion Utilities

## Added

- Reusable GSAP utility functions for fade, section reveal, image reveal, text reveal, stagger, parallax, hover image scale, and menu reveal.
- Shared motion types and helper functions for reduced-motion checks, element conversion, and default ScrollTrigger settings.
- Public animation barrel export from `animations/index.ts`.

## Changed

- No page, Payload, CMS, or UI component behavior was changed.

## Decisions

- Utilities accept a `reducedMotion` option so future client components can pass the value from `useReducedMotion`.
- Reduced-motion paths skip scroll-driven, text-splitting, parallax, and hover-scale motion while setting elements to their final visible state.
- Animation utilities use GSAP from the centralized `animations/gsap.ts` module and do not register plugins themselves.
- Motion defaults favor opacity, transform, and clip-path over layout properties.

## Verification Commands

```bash
npm run lint
npm run build
npm run dev
```
