# Phase 05B - Header, Navigation, and Fullscreen Menu

## Added

- Public `Header` component connected only to the `(site)` layout.
- Shared `Navigation` component using the four primary navigation items: Home, Work, Studio, Contact.
- Accessible `MenuButton` for mobile and tablet navigation.
- Accessible `FullscreenMenu` with keyboard support, Escape-to-close behavior, focus containment, and body scroll lock.
- Static navigation constants in `lib/constants/navigation.ts`.

## Changed

- Public site layout now renders `Header` inside existing motion providers.
- Payload admin layout and Payload API routes remain isolated in the `(payload)` route group.

## Decisions

- Desktop uses quiet inline navigation.
- Mobile and tablet use a fullscreen menu with no dropdowns, no mega menu, and no additional page routes.
- Menu animation uses the existing `menuReveal` GSAP utility and respects `prefers-reduced-motion`.
- No Footer, homepage sections, Work page, Studio page, Contact page, Payload schema, or CMS behavior was added.

## Verification Commands

```bash
npm run lint
npm run build
npm run dev
```
