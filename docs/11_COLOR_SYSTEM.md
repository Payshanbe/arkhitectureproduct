# 11 — Color System

## Purpose

Color should support the architecture, not dominate it.

The website should communicate quality through restraint rather than decoration.

The palette must remain timeless, calm, and sophisticated.

---

# Philosophy

Architecture already contains color.

Stone.

Concrete.

Wood.

Glass.

Metal.

Light.

The interface should never compete with these materials.

Instead, it should create a neutral stage where the projects remain the focus.

---

# Design Principle

The color system should be almost invisible.

Visitors should remember the projects, not the interface colors.

---

# Visual Temperature

The website should feel warm rather than cold.

Avoid pure white backgrounds.

Avoid absolute black text.

Prefer natural tones inspired by architecture and printed editorial publications.

---

# Color Palette Structure

The palette consists of five groups:

* Background
* Surface
* Typography
* Accent
* Feedback

Each group has a specific purpose.

---

# Background Colors

Used for:

* page background
* large sections
* whitespace

Characteristics:

* warm
* soft
* neutral

The background should resemble high-quality paper rather than a digital canvas.

---

# Surface Colors

Used for:

* cards
* overlays
* menus
* dialogs

Surfaces should remain subtle.

Avoid strong contrast between background and surface.

---

# Typography Colors

Text should always remain highly readable.

Hierarchy should be created through weight and size before using multiple text colors.

Primary text should dominate.

Secondary text should remain subtle.

---

# Accent Color

Only one primary accent color should exist.

Purpose:

* links
* hover states
* active navigation
* subtle interaction feedback

The accent should feel elegant.

Never vibrant.

Never fluorescent.

---

# Feedback Colors

Reserved for:

* success
* warning
* error
* information

These colors belong only to the CMS and forms.

They should rarely appear in the public website.

---

# Contrast

Contrast should come from:

* scale
* whitespace
* photography
* typography

Not from excessive color variation.

---

# Dark Mode

The first version of the project focuses on one carefully crafted visual theme.

Dark mode can be explored later if it adds value, but it is not a priority.

---

# Interaction Colors

Hover effects should rely on:

* opacity
* subtle color shifts
* underline animations

Avoid dramatic color changes.

---

# Transparency

Use transparency carefully.

Transparency should enhance depth.

Never reduce readability.

---

# Color Consistency

All pages should share the same visual atmosphere.

Avoid introducing new colors for individual sections.

Consistency builds trust.

---

# Photography Integration

Photography defines most of the perceived color of the website.

The interface should adapt to the imagery rather than compete with it.

Neutral UI colors allow every project to retain its own visual identity.

---

# Accessibility

All color combinations must satisfy accessibility requirements.

Ensure sufficient contrast for:

* body text
* navigation
* buttons
* form elements

Never sacrifice readability for aesthetics.

---

# Future Tokenization

All colors should eventually become design tokens.

Example structure:

```text
background.primary
background.secondary

surface.primary
surface.secondary

text.primary
text.secondary
text.muted

accent.primary

border.primary

overlay.light
overlay.dark
```

The exact values will be defined during implementation.

---

# Final Principle

The best color system is the one users barely notice.

It quietly supports the architecture and allows the projects to remain the visual focus.
