# 06 — Layout System

## Purpose

This document defines how pages should be structured visually.

The layout system should support a premium architecture and interior design website with strong photography, whitespace, asymmetry, and editorial rhythm.

---

# Layout Philosophy

The layout should feel architectural.

Every page should be built with:

* proportion
* rhythm
* scale
* balance
* negative space
* strong image placement

Avoid generic centered landing-page sections.

---

# Page Width

Use a full-width page canvas.

Content should not feel boxed.

Images can be full-bleed when needed.

Text content should usually stay inside a controlled reading width.

---

# Container

Use a global container for most content.

Recommended desktop container:

```css
width: 100%;
padding-left: clamp(24px, 4vw, 72px);
padding-right: clamp(24px, 4vw, 72px);
```

On mobile:

```css
padding-left: 20px;
padding-right: 20px;
```

---

# Grid

Use a 12-column grid on desktop.

Recommended:

```css
display: grid;
grid-template-columns: repeat(12, 1fr);
column-gap: clamp(16px, 2vw, 32px);
```

Use fewer columns on smaller screens:

```txt
Desktop: 12 columns
Tablet: 8 columns
Mobile: 4 columns
```

---

# Asymmetry

Asymmetry is preferred.

Avoid placing everything in the center.

Use offsets:

* text from column 2 to 7;
* images from column 5 to 13;
* captions in narrow columns;
* large empty areas intentionally.

---

# Section Spacing

Sections need strong vertical spacing.

Recommended:

```css
section {
  padding-top: clamp(96px, 14vw, 220px);
  padding-bottom: clamp(96px, 14vw, 220px);
}
```

Hero sections can use:

```css
min-height: 100svh;
```

---

# Image Layouts

Use these image layout types:

## Fullscreen Image

Used for:

* homepage hero
* project detail hero
* major project transitions

## Full-Bleed Image

Image touches viewport edges.

Used sparingly.

## Editorial Image Grid

Large image + smaller supporting image.

Used for selected projects.

## Vertical Gallery

Used on project detail pages.

## Offset Image

Image placed asymmetrically inside the grid.

Used for studio and philosophy sections.

---

# Text Layouts

Text should stay narrow and readable.

Recommended text width:

```css
max-width: 680px;
```

For large editorial statements:

```css
max-width: 1100px;
```

Avoid full-width paragraphs.

---

# Homepage Layout Pattern

Recommended flow:

```txt
Fullscreen Hero
↓
Large Editorial Statement
↓
Selected Works
↓
Studio Teaser
↓
Featured Project
↓
Contact Footer
```

---

# Work Page Layout Pattern

Recommended:

```txt
Page Title
↓
Project Filters
↓
Large Project List / Editorial Grid
↓
Contact Footer
```

Project cards should feel spacious.

Avoid small portfolio thumbnails.

---

# Project Detail Layout Pattern

Recommended:

```txt
Fullscreen Project Hero
↓
Project Metadata
↓
Concept Text
↓
Large Image Gallery
↓
Material / Detail Text
↓
Next Project
↓
Footer
```

---

# Studio Page Layout Pattern

Recommended:

```txt
Manifesto Hero
↓
Studio Story
↓
Approach
↓
Team / Founder
↓
Contact
```

---

# Contact Layout Pattern

Recommended:

```txt
Large Contact Statement
↓
Email
↓
Phone / Address
↓
Social Links
```

No complex sales form by default.

---

# Mobile Layout

Mobile should not be a compressed desktop.

Simplify layouts:

* remove complex offsets;
* reduce parallax;
* use single-column flow;
* keep images large;
* keep navigation simple;
* increase tap target size.

---

# Layout Rules

Do:

* use large images;
* create strong whitespace;
* use asymmetry;
* keep text narrow;
* use 12-column discipline;
* allow full-bleed moments.

Do not:

* use generic card grids everywhere;
* center every section;
* overuse equal-height blocks;
* add unnecessary boxes;
* place text over busy images without contrast;
* use dense landing-page patterns.

---

# Final Rule

Layout should feel like spatial composition.

Not like stacking website blocks.
