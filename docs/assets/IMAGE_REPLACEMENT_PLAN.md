# Image Replacement Plan

This document defines the replacement workflow for moving from placeholder visuals to final architecture assets.

No frontend redesign is required for this workflow. Final assets should be uploaded into Payload Media and assigned to the existing CMS fields wherever possible.

## Current Placeholder Inventory

| Area | Current source | Used in | Status |
| --- | --- | --- | --- |
| Home hero | `public/images/home-hero-placeholder.png` | `features/home/HomeHero.tsx` | Hardcoded placeholder |
| Home selected projects | Payload `projects.coverImage`, fallback `/images/home-hero-placeholder.png` | `features/home/HomeSelectedProjects.tsx` | CMS-ready with fallback |
| Home featured project | Payload `projects.coverImage`, fallback `/images/home-hero-placeholder.png` | `features/home/HomeFeaturedProject.tsx` | CMS-ready with fallback |
| Work archive | Payload `projects.coverImage`, fallback `/images/home-hero-placeholder.png` | `features/work/WorkArchive.tsx` | CMS-ready with fallback |
| Project detail hero | Payload `projects.coverImage`, fallback `/images/home-hero-placeholder.png` | `features/work/ProjectDetail.tsx` | CMS-ready with fallback |
| Project detail feature image | First Payload `projects.gallery` image, fallback cover image | `features/work/ProjectDetail.tsx` | CMS-ready |
| Project detail gallery | Payload `projects.gallery` | `features/work/ProjectDetail.tsx` | CMS-ready |
| Studio page | Signature Experience SVG drawing | `features/signature-experience/` | SVG asset system exists |
| Contact page | No imagery | `features/contact/ContactPage.tsx` | No asset needed |
| Open Graph project images | Payload `projects.seo.image`, fallback `coverImage` | `app/(site)/work/[slug]/page.tsx` | CMS-ready |
| Global Open Graph image | Metadata defaults, `seo-defaults.defaultImage` prepared | `lib/seo/metadata.ts`, Payload globals | Needs final global image |
| Favicon | `public/favicons/favicon.svg` | `app/(site)/layout.tsx`, `app/manifest.ts` | Placeholder/brand asset |
| Apple touch icon | `public/icons/apple-touch-icon.png` | `app/manifest.ts`, metadata icons | Placeholder/brand asset |
| Payload uploaded placeholders | `public/media/home-hero-placeholder*`, `public/media/photo_*`, generated sizes | Payload Media | Temporary demo assets |

## Replacement Matrix

| Asset | Required aspect ratio | Recommended dimensions | CMS/source | Alt text | Loading |
| --- | --- | --- | --- | --- | --- |
| Home hero | 16:9 minimum, safe crop for full viewport | 2880x1800 or 3200x2000 WebP | Future Home global or current static file | Required, architectural scene description | `priority` |
| Project cover | Flexible; should work at 16:9, 21:10, 4:5 crops | 2400x1600 WebP | `projects.coverImage` | Required in Media `alt` | Lazy except project detail hero |
| Selected project thumbnail | Cropped from project cover | Source cover should support 16:5 crop | `projects.coverImage` | Inherited from Media `alt` | Lazy |
| Work archive image | Alternates 16:9, 21:10, 4:5, 3:2 | 2400x1600 WebP | `projects.coverImage` | Required in Media `alt` | Lazy |
| Project detail hero | Full viewport crop | 2880x1800 WebP | `projects.coverImage` | Required in Media `alt` | `priority` |
| Project feature image | 16:10 desktop, 4:5 mobile | 2400x1600 WebP | First item in `projects.gallery` | Gallery item `altText` or Media `alt` | Lazy |
| Project gallery landscape | 3:2 or 16:10 | 2400x1600 WebP | `projects.gallery[].image` | Gallery item `altText` preferred | Lazy |
| Project gallery portrait | 4:5 | 1800x2250 WebP | `projects.gallery[].image` | Gallery item `altText` preferred | Lazy |
| Project OG image | 1.91:1 | 1200x630 WebP/JPG | `projects.seo.image` | Media `alt` | Metadata only |
| Global OG image | 1.91:1 | 1200x630 WebP/JPG | `seo-defaults.defaultImage` | Media `alt` | Metadata only |
| Favicon SVG | Square vector | SVG | `public/favicons/favicon.svg` | N/A | Browser icon |
| Apple touch icon | 1:1 | 180x180 PNG | `public/icons/apple-touch-icon.png` | N/A | Manifest/icon |
| Signature SVG layers | ViewBox-compatible vector layers | SVG, same viewBox per layer | `features/signature-experience/assets/` | Decorative, aria-hidden in UI | Inline/vector |

## Page Notes

### Home

The homepage has one hardcoded hero image. Project sections already read from Payload when CMS content exists. The Home hero should eventually move to a Payload global or page content model so replacing it does not require a code change.

Recommended final asset:

- `home-hero-courtyard-interior.webp`
- 3200x2000
- Wide architectural interior/courtyard composition
- Safe crop on the left side for typography overlay

### Work

Work archive images are sourced from `projects.coverImage`. Each project must have a unique cover Media item. Do not reuse one placeholder Media item across multiple projects once final assets are available.

### Project Detail

Project detail uses:

- `coverImage` as the hero image.
- First `gallery` image as the feature image.
- Full `gallery` array for the editorial gallery.
- `seo.image` for Open Graph when available.

Each project should receive:

- one cover image;
- one OG image;
- at least three gallery images;
- individual alt text and captions.

### Studio

The Studio page currently uses the Signature Experience SVG system. Future real assets should remain SVG layers unless the visual language changes. All layers must share the same viewBox and should be lightweight.

### Contact

No visual asset is required for Version 1.0 contact. If imagery is added later, it should be managed through a Contact page global and not hardcoded.

## Replacement Workflow

1. Prepare final image files using the naming conventions in `ASSET_REQUIREMENTS.md`.
2. Compress source images to WebP for site display.
3. Create a unique Payload Media item for each cover, gallery, and OG image.
4. Fill Media fields: `alt`, `caption`, `orientation`, and `photographer`.
5. Assign project cover images to `projects.coverImage`.
6. Assign gallery images to `projects.gallery`.
7. Assign OG image to `projects.seo.image`.
8. Confirm Project Detail hero, feature image, and gallery render correctly.
9. Confirm Work archive and Home project sections no longer use placeholder fallback.
10. Keep source/licensing records outside Payload if the CMS does not yet expose those fields.

## Important CMS Rule

Do not replace the file inside a shared placeholder Media item if that item is used by multiple projects.

Instead, upload a new Media item and assign it to the specific project field. Payload relationships point to Media records, so replacing one shared Media asset will update every field that references it.

In Payload Admin:

- Editing/replacing the file inside a Media document changes every project field that references that Media document.
- Selecting a different Media document in `coverImage` changes only that project's cover field.
- Selecting a different Media document in `gallery[].image` changes only that gallery item.
- Final project content should not reuse one uploaded Media document for multiple project covers unless the same image is intentionally shared.
