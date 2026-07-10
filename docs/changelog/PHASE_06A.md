# Phase 06A - Home Hero

## Added

- `HomeHero` feature component for the homepage hero section.
- Local generated placeholder hero image at `public/images/home-hero-placeholder.png`.

## Changed

- Homepage now renders the `HomeHero` feature instead of the temporary foundation statement.

## Decisions

- Hero uses fullscreen architectural photography with a minimal editorial label, headline, supporting line, and scroll indicator.
- Motion uses existing `imageReveal` and `textReveal` utilities with scoped `useGSAP`.
- Reduced-motion users receive final visible states without image reveal, text splitting animation, or heavy movement.
- Mobile uses an `88svh` hero height to stay within the documented 80-90svh range.
- No Selected Projects, Studio Intro, Footer, Payload changes, CMS changes, 3D, parallax, or Phase 06B work was added.

## Verification Commands

```bash
npm run lint
npm run build
npm run dev
```
