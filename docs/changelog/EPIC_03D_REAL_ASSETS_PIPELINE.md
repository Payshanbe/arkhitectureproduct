# EPIC 03D - Real Assets Pipeline

## Summary

Prepared documentation for replacing placeholder visuals with final architecture assets later.

No images were generated. No page layout, typography, animation, navigation, or frontend design was changed.

## Documents Created

- `docs/assets/IMAGE_REPLACEMENT_PLAN.md`
- `docs/assets/ASSET_REQUIREMENTS.md`

## Placeholder Images Found

- `public/images/home-hero-placeholder.png`
- Payload uploaded placeholder copies in `public/media/home-hero-placeholder*`
- Additional temporary uploaded media in `public/media/photo_*`
- Project fallbacks in Home, Work, and Project Detail components still point to `/images/home-hero-placeholder.png`
- Open Graph defaults do not yet have a final global OG image assigned

## Asset Requirements Created

Defined requirements for:

- homepage hero images;
- project cover images;
- project gallery images;
- project detail hero and feature images;
- Open Graph images;
- favicon and app icons;
- Signature Experience SVG layers.

## Naming Conventions

Project assets:

```text
project-slug-cover.webp
project-slug-gallery-01.webp
project-slug-gallery-02.webp
project-slug-og.webp
```

Signature Experience assets:

```text
studio-process-layer-grid.svg
studio-process-layer-site.svg
studio-process-layer-structure.svg
studio-process-layer-envelope.svg
studio-process-layer-materials.svg
studio-process-layer-light.svg
studio-process-layer-atmosphere.svg
```

Brand assets:

```text
favicon.svg
apple-touch-icon.png
icon-192.png
icon-512.png
```

## Replacement Workflow

1. Prepare final files using the documented naming conventions.
2. Compress display images to WebP.
3. Upload each cover, gallery, and OG image as a unique Payload Media item.
4. Fill alt text, caption, orientation, and photographer fields.
5. Assign images to `projects.coverImage`, `projects.gallery`, and `projects.seo.image`.
6. Assign global fallback imagery through SEO defaults when final global assets exist.
7. Verify Home, Work, Project Detail, and metadata output.

## Remaining Placeholder Assets

- Home hero remains a hardcoded static placeholder.
- CMS project records may still use placeholder Media items until final photography is uploaded.
- Signature Experience SVG layers are concept/prototype-quality and should be replaced with final SVG drawing assets later.
- Brand icons exist but should be reviewed against final identity assets.

## CMS Fields Missing For Real Assets

Current Media fields cover basic usage:

- alt;
- caption;
- orientation;
- photographer.

Recommended future fields:

- license;
- source;
- usage rights;
- original filename;
- asset role;
- credit URL;
- replacement status.

## Notes

Payload Media items are shared records. Replacing the file inside one shared Media item changes every project and gallery field that references it. For final assets, each project cover, gallery image, and OG image should be uploaded as its own Media item.
