# Phase 05A - Global Layout

## Added

- `Page` layout primitive for public site page structure.

## Changed

- Temporary root route now uses the shared `Page`, `Section`, `Container`, and `EditorialStatement` primitives.
- Public site layout continues to connect motion providers only inside the `(site)` route group.

## Decisions

- Header, fullscreen menu, footer, real homepage sections, and public content pages remain intentionally unbuilt.
- Payload admin remains isolated because it uses the separate `(payload)` route-group layout.
- `Page` stays server-compatible and presentation-only, with no data fetching or client-side behavior.

## Verification Commands

```bash
npm run lint
npm run build
npm run dev
```
