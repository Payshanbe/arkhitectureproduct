# 13 — Component System

## Purpose

This document defines every reusable component used throughout the website.

Components should be content-first.

They exist to present architecture, not to create interface complexity.

Every component must be reusable, modular, and visually consistent.

---

# Component Philosophy

The component library should remain intentionally small.

Instead of many generic UI components, the website should rely on a limited number of highly refined architectural components.

Less components.

Higher quality.

---

# Component Categories

The system is divided into:

Layout Components

↓

Navigation Components

↓

Content Components

↓

Project Components

↓

Media Components

↓

Interactive Components

↓

Footer Components

---

# Layout Components

## Page

Responsible for page spacing and structure.

Every page should inherit the same layout language.

---

## Section

Creates rhythm.

Defines vertical spacing.

Supports different section sizes:

* Small
* Medium
* Large
* Hero

---

## Container

Controls readable content width.

Never contains business logic.

---

# Navigation Components

## Header

Contains:

* Logo
* Navigation
* Menu Button

Should remain minimal.

Supports:

* transparent state
* solid state
* hidden on scroll
* visible on scroll up

---

## Fullscreen Menu

Contains:

Navigation

↓

Contact

↓

Social Links

↓

Background Image (optional)

Should animate as one timeline.

---

# Hero Components

## Hero

The most important component.

Contains:

* Background image or video
* Headline
* Optional subtitle
* Scroll indicator

Supports:

* image hero
* video hero

Only one Hero per page.

---

## Scroll Indicator

Minimal.

Animated subtly.

Never distracting.

---

# Editorial Components

## Section Heading

Large section title.

Optional supporting text.

Optional category label.

---

## Editorial Statement

Large typography block.

Used for:

* philosophy
* manifesto
* important quotes

Should create pauses within the experience.

---

## Quote Block

Optional.

Contains:

Quote

↓

Author

Should feel elegant.

---

# Project Components

## Project Card

Primary portfolio component.

Contains:

Cover Image

↓

Title

↓

Location

↓

Year

Supports:

* hover animation
* image reveal
* featured state

---

## Featured Project

Large immersive project presentation.

Can occupy an entire viewport.

Supports cinematic transitions.

---

## Project Metadata

Displays:

* Location
* Year
* Area
* Status
* Services

Always lightweight.

---

## Next Project

Appears at end of project pages.

Contains:

Image

↓

Title

↓

Arrow

Encourages exploration.

---

# Media Components

## Image Block

Displays one large image.

Supports:

* fullscreen
* full bleed
* contained

---

## Gallery

Displays multiple project images.

Supports:

* editorial layout
* vertical flow

Never use masonry.

Never use slider by default.

---

## Image Caption

Optional.

Contains:

* caption
* photographer
* material

Should remain visually quiet.

---

# Studio Components

## Studio Introduction

Contains:

Headline

↓

Editorial text

↓

CTA to Studio page

---

## Team Grid

Simple layout.

Contains:

Photo

↓

Name

↓

Role

No unnecessary details.

---

# Contact Components

## Contact Block

Contains:

Email

↓

Phone

↓

Address

↓

Social Links

Should conclude the page calmly.

---

## Contact Form

Minimal.

Fields:

* Name
* Email
* Message

Avoid unnecessary fields.

---

# Footer Components

## Footer

Contains:

Navigation

↓

Contact

↓

Social Links

↓

Copyright

Large spacing.

Minimal typography.

---

# Component Variants

Every component should support variants instead of duplication.

Example:

Hero

* Image
* Video

Section

* Small
* Medium
* Large

Project Card

* Default
* Featured

Image Block

* Fullscreen
* Full Bleed
* Contained

---

# Animation Responsibility

Components should not create random animations.

Every animation should come from the Motion System.

Components trigger motion.

The Motion System defines how it behaves.

---

# CMS Responsibility

Content comes from Payload.

Layout comes from the frontend.

CMS should never decide:

* spacing
* typography
* animation
* composition

---

# Reusability

Every component should be:

* modular
* reusable
* accessible
* responsive
* content-driven

Avoid page-specific components whenever possible.

---

# Naming Convention

Examples:

```text
Hero

Header

Section

ProjectCard

ProjectGallery

ProjectMetadata

FeaturedProject

EditorialStatement

ImageBlock

TeamGrid

ContactBlock

Footer
```

Names should describe purpose rather than appearance.

---

# Final Principle

Every component should feel like it belongs to the same architectural language.

The visitor should never feel they are moving between unrelated interface pieces.

The website should behave as one cohesive architectural system.
