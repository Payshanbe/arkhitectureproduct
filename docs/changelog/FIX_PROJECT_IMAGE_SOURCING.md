# Fix - Project Image Sourcing

## Summary

Fixed the root cause that allowed seeded project images to share Media references too broadly.

No frontend layout, typography, motion, or visual design was changed.

## Root Cause

Payload upload fields store relationships to Media documents, not independent image copies.

The previous seed/content population logic could assign the same Media document to multiple image fields:

- older seed data used one placeholder Media document across all projects;
- the current flagship seed had unique cover Media per project, but reused that same project cover Media for every gallery item in that project.

When a shared Media document is edited or its file is replaced in Payload Admin, every project field referencing that Media document updates visually.

## Changes

- Added admin guidance to `projects.coverImage`.
- Added admin guidance to `gallery[].image`.
- Updated `scripts/seed-flagship.ts` so each seeded project now gets:
  - one cover Media record;
  - three separate gallery Media records;
  - cover/SEO image references that do not depend on one global uploaded placeholder.
- Updated seed logic to preserve existing user-uploaded non-placeholder media instead of overwriting it.
- Expanded asset documentation with clearer Payload Admin behavior.

## Cover Image Usage

Frontend project cards and archives use each project's own `projects.coverImage`:

- Home Selected Projects
- Home Featured Project
- Work archive
- Project Detail hero

If a specific project has no valid image URL, the frontend falls back to the static placeholder path `/images/home-hero-placeholder.png`.

## Gallery Image Usage

Project Detail gallery uses `projects.gallery[].image`.

The Project Detail feature image uses the first gallery image when available. If a project has no gallery images, it falls back to that project's own cover image.

## Fallback Behavior

Fallback images are static filesystem placeholders, not shared Payload Media objects.

This means fallback display does not mutate CMS media records and does not cause one project's image selection to affect another project.

## Existing Data

Existing projects may still need manual image reassignment if they already reference the same real user-uploaded Media document.

The seed repair intentionally does not replace or delete real user-uploaded media. If one uploaded Media item is currently shared by multiple projects, choose a different Media item in each affected `coverImage` or `gallery[].image` field.

## Verification

- Run `npm run seed` to create project-specific placeholder Media records for seeded projects.
- Run `npm run lint`.
- Run `npm run build`.
