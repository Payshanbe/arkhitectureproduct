# Signature Experience Visual Language

## Purpose

This document defines the first visual language pass for the Version 1.1 Signature Experience.

Concept:

```txt
Courtyard House
```

The visual should feel like an architectural drawing slowly becoming spatial. It should remain minimal, precise, editorial, and calm.

This is not final animation direction. It defines the visual system that future motion will animate.

---

## Visual Principles

- The drawing should feel architectural, not illustrative.
- The composition should remain quiet and spacious.
- Each layer should add meaning, not decoration.
- The visual should read as a single Courtyard House study.
- Geometry should be precise but not overly technical.
- The palette should stay monochrome and warm neutral.
- Light is the emotional climax.
- Atmosphere is the resolution, not an extra effect.

Avoid:

- cartoon illustration;
- futuristic UI graphics;
- neon color;
- decorative particles;
- excessive detail;
- fake blueprint aesthetics;
- heavy shadows;
- dense hatching.

---

## Palette

Use warm architectural neutrals:

```txt
Background: warm white / stone
Primary line: soft black
Secondary line: muted stone grey
Accent: warm bronze / daylight ochre
Fill: low-opacity stone, plaster, timber tones
```

The SVG assets currently use fixed neutral values so they remain portable as standalone assets.

Future renderer work can map these values to CSS variables if the assets are inlined.

---

## Layer System

The visual is built from seven layer files:

```txt
grid.svg
site.svg
structure.svg
envelope.svg
materials.svg
light.svg
atmosphere.svg
```

Each SVG contains a semantic root group:

```txt
layer-grid
layer-site
layer-structure
layer-envelope
layer-materials
layer-light
layer-atmosphere
```

These IDs are intended for future animation targeting, inspection, and maintenance.

---

## Layer Descriptions

## Grid

Represents:

- silence;
- proportion;
- the first reference system;
- the invisible discipline behind the project.

Visual behavior:

- thin reference lines;
- sparse alignment points;
- very low visual weight.

Future animation:

- fade in slowly;
- avoid dramatic line drawing;
- keep this layer present throughout the sequence.

## Site

Represents:

- context;
- boundary;
- courtyard orientation;
- early site movement and landscape traces.

Visual behavior:

- restrained site perimeter;
- dashed inner boundary;
- north/reference mark;
- loose ground traces.

Future animation:

- site boundary should settle around the grid;
- loose traces can remain partially visible as memory.

## Structure

Represents:

- walls;
- columns;
- courtyard void;
- primary spatial order.

Visual behavior:

- clear perimeter and inner courtyard;
- simple wall logic;
- four structural points;
- no unnecessary construction detail.

Future animation:

- should feel like order emerging from context;
- use decisive but calm reveal timing.

## Envelope

Represents:

- the architectural body;
- interior and exterior thresholds;
- the courtyard frame.

Visual behavior:

- light fill around the courtyard;
- perimeter enclosure;
- quiet threshold lines.

Future animation:

- should bridge Context and Structure;
- can arrive before or alongside structural clarity.

## Materials

Represents:

- stone;
- plaster;
- timber or tactile surface fields;
- material weight.

Visual behavior:

- low-opacity fills;
- sparse hatching;
- warm accent threshold lines.

Future animation:

- material should deepen the drawing, not decorate it;
- hatching should remain minimal.

## Light

Represents:

- directional daylight;
- shadow;
- spatial depth;
- emotional climax.

Visual behavior:

- soft angular light field;
- restrained sunlight lines;
- subtle shadow shape.

Future animation:

- should be the most cinematic transition;
- no burst, flash, or theatrical effect;
- think of sunlight entering a quiet courtyard.

## Atmosphere

Represents:

- resolved composition;
- quiet final state;
- architecture becoming experience.

Visual behavior:

- softened final drawing;
- balanced geometry;
- light warmth in the courtyard;
- reduced contrast.

Future animation:

- should feel like settling, not completion;
- motion should nearly disappear.

---

## Responsive Considerations

The SVG viewBox is consistent:

```txt
960 x 720
```

This keeps the system stable across:

- desktop pinned composition;
- tablet scaled composition;
- mobile fallback visuals.

Rules:

- preserve the full drawing on mobile;
- do not crop the courtyard;
- avoid details that only work at desktop size;
- maintain line weights that remain legible when scaled down.

---

## Rules for Future SVG Assets

1. Keep each layer lightweight.
2. Use one semantic root group per file.
3. Use descriptive IDs.
4. Avoid embedded raster images unless explicitly required.
5. Avoid filters, blur stacks, and complex masks in Version 1.1.
6. Keep strokes and fills restrained.
7. Do not add decorative marks unless they explain the process.
8. Use the same `960 x 720` viewBox unless there is a strong reason to change it.
9. Ensure each layer can stand alone but works best when stacked.
10. Preserve accessibility metadata with `title` and `desc`.

---

## Current Status

This is the first visual language pass.

The assets are more intentional than placeholders, but they are still not final artwork. They establish:

- composition;
- layer hierarchy;
- semantic asset naming;
- Courtyard House concept;
- warm monochrome drawing language.

Remaining before final animation:

- test stacked rendering in a real component;
- tune layer opacity in motion context;
- validate on mobile dimensions;
- decide whether SVGs should remain external assets or become inline React SVG components;
- create final transition timings after visual QA.

