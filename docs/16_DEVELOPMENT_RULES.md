# 16 — Development Rules

## Purpose

This document defines the coding standards and development workflow for the project.

Every developer and every AI agent must follow these rules.

Consistency is more important than personal preference.

---

# General Principles

The project should prioritize:

* readability
* maintainability
* performance
* accessibility
* scalability

Never optimize for writing less code.

Optimize for writing better code.

---

# Before Writing Code

Always understand:

* the Design Brief
* the Visual Direction
* the Motion System
* the Component System

Never implement features without understanding the documentation.

---

# Component Rules

Every component should:

* have one responsibility;
* be reusable;
* be typed;
* support responsive layouts;
* remain easy to read.

Avoid components larger than necessary.

Split complex components into smaller ones.

---

# Props

Keep props minimal.

Pass only the data a component actually needs.

Avoid passing entire objects when only one property is required.

---

# TypeScript

TypeScript is mandatory.

Rules:

* no `any`;
* prefer explicit types;
* use interfaces for public APIs;
* keep types reusable.

Strict mode should remain enabled.

---

# React

Use:

* Functional Components
* React Hooks
* Composition

Avoid:

* class components;
* unnecessary state;
* duplicated logic.

---

# Server Components

Server Components are the default.

Use Client Components only for:

* GSAP
* Lenis
* forms
* filters
* interactive navigation

Do not use `"use client"` unless necessary.

---

# Styling

Use Tailwind CSS.

Rules:

* prefer utility classes;
* avoid inline styles;
* avoid duplicated utility combinations;
* extract reusable patterns into components.

Do not create large CSS files.

---

# Animation

All animations should use GSAP.

Do not mix multiple animation libraries.

Animation logic should live inside:

```text
animations/
```

Components should trigger animations.

Animation definitions belong to the Motion System.

---

# Scroll

Lenis owns scrolling.

GSAP owns animation.

Do not use CSS smooth scrolling.

Do not create multiple scroll managers.

---

# Data Fetching

Pages fetch data.

Components render data.

Avoid fetching inside presentational components.

---

# Payload

Payload manages:

* content
* media
* SEO
* navigation
* settings

Frontend manages:

* layout
* design
* animation
* responsiveness

Never place presentation logic inside Payload.

---

# Naming

Components

PascalCase

Example

```text
ProjectCard.tsx
```

Hooks

camelCase

Example

```text
useScrollDirection.ts
```

Utilities

camelCase

Example

```text
formatDate.ts
```

Route folders

kebab-case

Example

```text
project-gallery
```

---

# Imports

Prefer aliases:

```text
@/components
@/features
@/hooks
@/lib
@/payload
@/animations
```

Avoid deep relative imports.

---

# Accessibility

Every feature should support:

* keyboard navigation;
* screen readers;
* reduced motion;
* focus visibility;
* sufficient color contrast.

Accessibility is part of the definition of done.

---

# Performance

Every feature should consider:

* bundle size;
* image optimization;
* lazy loading;
* animation cost;
* hydration cost.

Avoid unnecessary client-side JavaScript.

---

# Code Quality

The project should pass:

* ESLint
* TypeScript
* Prettier

No warnings.

No unused imports.

No dead code.

---

# Git Workflow

Every task should be implemented in small, focused commits.

One logical change per commit.

Avoid mixing unrelated work.

---

# Documentation

If a significant architectural decision changes:

Update the documentation.

Documentation should always match the implementation.

---

# AI Workflow

Before implementing a task, the AI should:

1. Read the relevant documentation.
2. Understand the design intent.
3. Plan the implementation.
4. Build the solution.
5. Verify responsiveness.
6. Verify accessibility.
7. Verify performance.

Do not skip planning.

---

# Final Principle

Write code that another developer can understand six months later without additional explanation.

Readable code is a feature.
