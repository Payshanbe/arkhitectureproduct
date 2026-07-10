# Phase 07 - Content Foundation

## Scope

Prepared Payload CMS for realistic Version 1.0 demonstration content.

No pages, frontend layouts, or visual designs were added.

## CMS Changes

- Added `city` to Projects.
- Added `architect` to Projects.
- Added `excerpt` to Projects.
- Added `description` to Projects.
- Preserved existing fields used by the homepage:
  - `location`
  - `shortDescription`
  - `concept`
  - `coverImage`
  - `gallery`
  - `featured`
  - `published`

## Seed Content

Added an idempotent Payload seed script:

```bash
npm run seed
```

The seed creates:

- 4 project categories.
- 1 reusable placeholder media item.
- 8 published architecture projects.
- The seed intentionally leaves `status` unset to avoid forcing an enum migration on existing local databases.

Featured projects:

- Courtyard Residence
- Stone Apartment
- North Light Gallery
- Limestone Hotel

Additional projects:

- Oak House
- Ceramic Atelier
- Garden Research House
- Basalt Room

## Documentation

Added `docs/CONTENT_GUIDELINES.md` covering:

- naming rules
- writing tone
- category taxonomy
- services taxonomy
- location format
- image guidelines
- excerpt rules
- description rules
- publishing rules

## Verification

Run:

```bash
npm run generate:types
npm run lint
npm run build
```

To seed local CMS content, ensure Postgres is running and environment variables are valid, then run:

```bash
npm run seed
```
