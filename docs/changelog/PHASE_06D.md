# Phase 06D - Featured Project

## Added

- `HomeFeaturedProject` server feature for the homepage Featured Project section.
- `HomeFeaturedProjectMotion` client wrapper for subtle reveal animation.
- Payload-backed one-project query with graceful placeholder fallback.

## Changed

- Homepage now renders the Featured Project section after Studio Intro.

## Decisions

- The section queries exactly one project where `featured = true` and `published = true`.
- The query uses manual `order`, `limit: 1`, and `depth: 2` for cover image and category relationships.
- If Payload is unavailable or no featured project exists, the section renders an editorial placeholder using the local architectural image.
- Layout is image-first, typography-driven, and spacious with no cards, carousel, slider, filtering, Footer, Contact CTA, Project Detail implementation, or CMS/schema changes.
- Motion uses existing `imageReveal` and `sectionReveal` utilities and respects reduced motion.

## Verification Commands

```bash
npm run lint
npm run build
npm run dev
```
