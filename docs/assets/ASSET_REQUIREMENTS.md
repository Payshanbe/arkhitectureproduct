# Asset Requirements

This document defines file naming, format, dimensions, metadata, and quality requirements for final production assets.

## Naming Conventions

### Project Images

Use lowercase kebab-case. Start with the project slug.

```text
project-slug-cover.webp
project-slug-gallery-01.webp
project-slug-gallery-02.webp
project-slug-gallery-03.webp
project-slug-og.webp
```

Examples:

```text
courtyard-residence-cover.webp
courtyard-residence-gallery-01.webp
courtyard-residence-gallery-02.webp
courtyard-residence-og.webp
```

### Homepage

```text
home-hero-courtyard-interior.webp
home-og.webp
```

### Studio Signature Experience

```text
studio-process-layer-grid.svg
studio-process-layer-site.svg
studio-process-layer-structure.svg
studio-process-layer-envelope.svg
studio-process-layer-materials.svg
studio-process-layer-light.svg
studio-process-layer-atmosphere.svg
```

### Brand Icons

```text
favicon.svg
apple-touch-icon.png
icon-192.png
icon-512.png
```

## Format Requirements

| Asset type | Preferred format | Notes |
| --- | --- | --- |
| Hero images | WebP | Use high quality, low visible compression |
| Project covers | WebP | Must crop well across several layouts |
| Project gallery | WebP | Landscape and portrait allowed |
| OG images | WebP or JPG | 1200x630, avoid text-heavy compositions |
| Favicon | SVG | Simple monochrome mark |
| Apple icon | PNG | 180x180 |
| Manifest icons | PNG | 192x192 and 512x512 recommended |
| Signature layers | SVG | Lightweight, same viewBox, semantic layer IDs |

## Dimension Requirements

| Asset type | Minimum | Recommended |
| --- | --- | --- |
| Home hero | 2400x1500 | 3200x2000 |
| Project cover | 2000x1333 | 2400x1600 |
| Project detail hero | 2400x1500 | 2880x1800 |
| Gallery landscape | 1800x1200 | 2400x1600 |
| Gallery portrait | 1440x1800 | 1800x2250 |
| OG image | 1200x630 | 1200x630 |
| Apple touch icon | 180x180 | 180x180 |
| Manifest icon | 192x192 | 512x512 also |
| Signature SVG layer | Vector | Shared `viewBox="0 0 1200 900"` or current drawing viewBox |

## Image Quality Direction

Final photography should feel:

- calm;
- architectural;
- material-led;
- naturally lit;
- editorial;
- quiet luxury;
- precise;
- spacious.

Avoid:

- HDR processing;
- saturated colors;
- real estate photography style;
- decorative closeups as primary covers;
- dramatic neon/glow;
- heavy vignette;
- people competing with architecture;
- over-furnished styling.

## Cover Image Requirements

Each project cover must:

- show clear spatial depth;
- work in wide, medium, and portrait crops;
- avoid busy texture where text may appear;
- be bright enough for editorial image treatment;
- include a complete Media `alt` field;
- include photographer credit when known.

Recommended crop safety:

- Keep the architectural subject centered or slightly right of center.
- Avoid placing essential details at extreme edges.
- Assume the image may be cropped to 16:5, 21:10, 16:9, 3:2, and 4:5.

## Hero Image Requirements

Hero images must:

- remain readable behind typography and overlays;
- support full viewport desktop display;
- crop cleanly on mobile;
- use `priority` only when above the fold;
- include descriptive alt text.

## Gallery Image Requirements

Each project should include at least three gallery items:

1. Wide spatial establishing image.
2. Threshold or room-sequence image.
3. Material/light/detail image.

Recommended stronger set:

- 5 to 8 images per project;
- mix landscape and portrait;
- captions only where they add architectural meaning;
- orientation field filled correctly.

## Open Graph Requirements

OG images should:

- be exactly 1200x630;
- show the project clearly;
- avoid embedded text unless brand-approved;
- use the project cover crop only when it works at 1.91:1;
- be assigned to `projects.seo.image` for project pages;
- use `seo-defaults.defaultImage` for global fallback.

## Signature Experience SVG Requirements

SVG layers must:

- share the same viewBox;
- use semantic IDs;
- remain lightweight;
- avoid raster embeds;
- avoid heavy filters;
- use strokes/fills compatible with the warm neutral visual system;
- work when shown statically for reduced motion;
- preserve layer order: grid, site, structure, envelope, materials, light, atmosphere.

## Metadata Checklist

Every final asset should have:

- alt text;
- caption when useful;
- photographer;
- license/source record;
- project slug;
- dimensions;
- format;
- compression quality;
- orientation;
- CMS field destination;
- replacement date.

## Missing CMS Fields To Consider

Payload Media currently supports:

- `alt`;
- `caption`;
- `orientation`;
- `photographer`.

For a full real-assets workflow, consider adding:

- `license`;
- `source`;
- `usageRights`;
- `originalFilename`;
- `assetRole` such as cover, gallery, og, hero, icon;
- `creditUrl`;
- `replacementStatus`.

These are not required for Version 1.0, but they would make the production asset library safer and easier to maintain.
