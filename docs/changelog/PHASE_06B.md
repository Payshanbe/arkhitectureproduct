# Phase 06B - Selected Projects

## Added

- `HomeSelectedProjects` server feature for the homepage selected projects section.
- `HomeSelectedProjectsMotion` client wrapper for reveal-only animation behavior.
- Payload-backed featured project query with graceful placeholder fallback.

## Changed

- Homepage now renders the selected projects section after the hero.

## Decisions

- The section queries only projects where `featured = true` and `published = true`.
- Projects are ordered by manual `order` and limited to six entries.
- If Payload is unavailable or there is no CMS content, the section renders quiet placeholder project content using the local architectural placeholder image.
- Layout uses large editorial image rows with generous whitespace, not cards, masonry, carousel, sliders, filters, pagination, or project-detail routing.
- Motion uses existing `sectionReveal` and `imageReveal` utilities and respects reduced motion.
- Hover treatment is limited to a subtle image scale and opacity shift.
- No Footer, Studio section, Project Detail page, Payload schema, or CMS configuration changes were added.

## Verification Commands

```bash
npm run lint
npm run build
npm run dev
```
