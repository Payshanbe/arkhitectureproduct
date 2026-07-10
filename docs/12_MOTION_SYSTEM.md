# 12 — Motion System

## Purpose

Motion should make the website feel smooth, cinematic, and architectural.

Animation is not decoration.

Motion should guide attention, reveal content, and connect pages into one continuous experience.

---

# Motion Philosophy

The website should move like a camera through space.

Not like a UI full of effects.

Motion should feel:

* slow
* deliberate
* calm
* precise
* cinematic
* restrained

---

# Core Technologies

Use:

* Lenis for smooth scrolling
* GSAP for animation
* ScrollTrigger for scroll-based animation
* `@gsap/react` for React integration

Lenis controls scroll feeling.

GSAP controls animation logic.

---

# Motion Principles

Use motion to:

* reveal images;
* reveal important text;
* guide the eye;
* create rhythm between sections;
* make page transitions feel connected.

Never use motion only because it looks cool.

---

# Global Smooth Scroll

Lenis should be used globally for smooth scrolling.

Requirements:

* smooth desktop scrolling;
* reduced or disabled effects on mobile if performance suffers;
* respect `prefers-reduced-motion`;
* synchronize Lenis with GSAP ScrollTrigger.

---

# GSAP + Lenis Sync

Implementation should follow this pattern:

```ts id="0g4n6t"
lenis.on("scroll", ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)
```

This prevents scroll-triggered animations from desynchronizing.

---

# Easing

Motion should use calm custom easing.

Avoid:

* bounce
* elastic
* aggressive back easing
* fast overshoot

Recommended motion feeling:

```txt id="e0ioyr"
slow entrance
soft acceleration
smooth deceleration
no bounce
```

---

# Duration Guidelines

Recommended durations:

```txt id="10qkio"
Small hover: 0.2s – 0.35s
Menu reveal: 0.5s – 0.8s
Text reveal: 0.6s – 1.0s
Image reveal: 0.8s – 1.2s
Page transition: 0.4s – 0.7s
Pinned sequence: scroll-driven
```

Avoid animations longer than necessary.

---

# Image Reveal

Use image reveal as one of the signature effects.

Preferred methods:

* clip-path inset reveal
* mask reveal
* opacity + subtle scale

Use on:

* hero images
* project cards
* project galleries
* featured project sections

Do not reveal every small image with heavy animation.

---

# Text Reveal

Use text reveal sparingly.

Use on:

* hero headline
* major manifesto line
* project title
* important editorial statement

Avoid applying text reveal to every paragraph.

Text should remain readable.

---

# Scroll Reveal

Use scroll reveal for sections entering the viewport.

Recommended animation:

```txt id="cnfh41"
opacity 0 → 1
y 24px → 0
duration 0.8s
ease smooth
```

Keep reveal subtle.

---

# Parallax

Parallax can be used, but only carefully.

Allowed:

* very subtle image movement;
* hero background depth;
* selected project sections.

Avoid:

* strong parallax;
* multiple moving layers everywhere;
* parallax on mobile if performance is poor.

---

# Pinned Sections

Pinned sections are premium but risky.

Use only in 1–2 places.

Possible uses:

* homepage featured project;
* project detail gallery;
* transition from hero to studio statement.

Avoid pinning too many sections.

Pinned sections must not cause layout shift.

---

# Fullscreen Menu Animation

Menu opening should feel like a calm transition.

Recommended:

1. overlay fades in;
2. menu background slides or reveals;
3. menu items appear with stagger;
4. contact/social information appears last.

Avoid loud menu animations.

---

# Hover Interactions

Hover should be subtle.

Use:

* opacity shift;
* underline reveal;
* image scale 1.00 → 1.03;
* cursor label;
* soft magnetic movement for key elements.

Avoid:

* rotation;
* bounce;
* strong shadows;
* color explosions.

---

# Page Transitions

Page transitions should feel like moving between rooms.

Recommended:

* soft fade;
* mask wipe;
* image-based transition between project cards and project pages;
* short duration.

Avoid transitions that delay navigation too much.

---

# Custom Cursor

Custom cursor is optional.

Use only on desktop.

Possible labels:

```txt id="evfun0"
View
Open
Drag
Next
```

Rules:

* never rely on cursor for essential information;
* disable on touch devices;
* keep movement smooth;
* avoid oversized cursor effects.

---

# Loading Animation

Use preloader only if necessary.

If used:

* keep under 1.5 seconds;
* use minimal typography or line animation;
* never block content unnecessarily.

Avoid decorative loaders.

---

# Reduced Motion

If user prefers reduced motion:

Disable:

* parallax
* text splitting animation
* custom cursor
* pinned decorative motion
* heavy scroll animations

Keep:

* simple opacity transitions
* necessary menu open/close states

---

# Performance Rules

Motion must not reduce quality.

Rules:

* animate transform and opacity when possible;
* avoid animating layout properties;
* use `will-change` only where needed;
* clean up GSAP timelines;
* avoid running animations on unmounted components;
* test mobile performance.

---

# Animation Library

Create reusable animation utilities for:

```txt id="4lq1ol"
imageReveal
textReveal
sectionReveal
menuReveal
pageTransition
hoverImageScale
parallaxImage
```

Avoid writing random one-off animations inside every component.

---

# GSAP React Rules

Use `@gsap/react`.

Use `useGSAP()` inside client components.

Always scope animations to component refs.

Always clean up animations automatically.

Do not run GSAP in Server Components.

---

# Final Principle

Motion should be felt more than noticed.

If the visitor says “nice animation,” the motion may be too visible.

If the visitor simply feels the website is smooth, premium, and effortless, the motion system has succeeded.
