# 21 — Responsive Strategy

## Purpose

This document defines how the website adapts across different screen sizes while preserving its premium architectural experience.

Responsive design is not about shrinking layouts.

It is about redesigning the experience for each device.

---

# Philosophy

Every screen size deserves a first-class experience.

Desktop, tablet, and mobile should all feel intentionally designed.

The mobile version should not feel like a reduced desktop version.

---

# Breakpoints

Recommended breakpoints:

```text
Mobile: 0–767px
Tablet: 768–1023px
Desktop: 1024px+
Large Desktop: 1440px+
```

Use fluid layouts whenever possible.

Avoid designing around fixed viewport widths.

---

# Layout Adaptation

## Desktop

* 12-column grid
* Asymmetrical layouts
* Full editorial compositions
* Large whitespace

## Tablet

* 8-column grid
* Reduced asymmetry
* Simplified compositions

## Mobile

* Single-column flow
* Large imagery
* Comfortable spacing
* Clear reading order

---

# Hero

## Desktop

* Full viewport height
* Large editorial headline
* Immersive photography or video

## Tablet

* Slightly reduced typography
* Simplified composition

## Mobile

* 80–90svh height
* Smaller typography
* Prioritize readability over visual complexity

---

# Navigation

## Desktop

Inline navigation in the header.

## Mobile

Fullscreen menu.

No dropdowns.

Large touch targets.

---

# Project Cards

## Desktop

Large editorial cards with hover interactions.

## Mobile

Single-column stack.

Hover interactions replaced with touch-friendly feedback.

---

# Project Gallery

## Desktop

Editorial layouts with varied image sizes.

## Tablet

Simplified editorial grid.

## Mobile

Vertical image sequence.

No complex grid compositions.

---

# Motion

## Desktop

Full motion system:

* Lenis
* GSAP
* ScrollTrigger
* Subtle parallax
* Pinned sections

## Tablet

Reduce animation complexity where appropriate.

## Mobile

Disable or simplify:

* heavy parallax
* pinned sections
* complex timelines

Maintain:

* fade-ins
* image reveals
* menu transitions

Respect `prefers-reduced-motion`.

---

# Typography

Use fluid typography with `clamp()`.

Never create separate font-size systems for every breakpoint.

Maintain comfortable line lengths on all devices.

---

# Images

Use responsive image sizes.

Prioritize performance.

Hero images should load quickly without sacrificing quality.

---

# Touch Experience

Minimum touch target:

```text
44 × 44 px
```

Ensure adequate spacing between interactive elements.

---

# Performance

Mobile performance is a priority.

Reduce unnecessary JavaScript.

Lazy-load non-critical images.

Avoid expensive animations during scroll.

---

# Testing

Test the website on:

* Small mobile phones
* Large mobile phones
* Tablets
* Standard laptops
* Large desktop monitors

Verify:

* layout
* typography
* animation
* accessibility
* performance

---

# Final Principle

Responsive design should preserve the feeling of the website, not just its layout.

Every visitor, regardless of device, should experience the same calm, premium, and architectural atmosphere.
