# Phase 08A - Work Page

## Scope

Implemented the public Work page as an editorial project archive.

No project detail page, filters, search, pagination, category navigation, or footer redesign were added.

## Created

- `app/(site)/work/page.tsx`
- `features/work/WorkArchive.tsx`
- `features/work/WorkArchiveMotion.tsx`

## CMS Query

The Work page queries Payload on the server:

- collection: `projects`
- filter: `published = true`
- sort: newest first by `year`
- depth: `2`
- limit: `100`

No client fetching is used.

## Layout

- Simple editorial intro with label, title, and short introduction.
- Vertical cinematic archive rather than cards, masonry, filters, or pagination.
- Alternating desktop offsets create editorial rhythm.
- Image proportions vary across the list while preserving a clean single-column mobile flow.

## Motion

- Uses existing `sectionReveal` and `imageReveal` utilities.
- Motion is isolated in a small Client Component.
- Server Components remain the default for Payload querying and page rendering.
- Reduced motion is respected through the existing `useReducedMotion` hook.

## Verification

Run:

```bash
npm run lint
npm run build
npm run dev
```
