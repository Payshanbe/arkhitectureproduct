# 14 — Technology Stack

## Purpose

This document defines the technologies used to build the project.

Every technology has been selected to support a premium architecture and interior design website focused on performance, maintainability, and long-term scalability.

The stack should remain modern, stable, and production-ready.

---

# Core Stack

Frontend

* Next.js
* React
* TypeScript

CMS

* Payload CMS

Database

* PostgreSQL

Animation

* GSAP
* ScrollTrigger

Smooth Scroll

* Lenis

Styling

* Tailwind CSS

Deployment

* Vercel (Frontend)
* Payload-compatible hosting for CMS

---

# Next.js

## Why

Next.js provides:

* Server Components
* App Router
* Image Optimization
* SEO
* Performance
* Metadata API
* Static and Dynamic Rendering

The project should use the App Router.

Avoid the legacy Pages Router.

---

# React

React is responsible for the UI architecture.

Guidelines:

* Functional Components only
* Hooks
* Composition over inheritance
* Reusable UI

---

# TypeScript

TypeScript is mandatory.

Never use JavaScript inside the project.

Benefits:

* safer refactoring
* autocomplete
* type safety
* Payload integration
* reusable models

---

# Payload CMS

Payload manages all editable content.

Responsibilities:

* Projects
* Categories
* Media
* Contact information
* Navigation
* SEO
* Global settings

Payload does NOT control:

* layout
* animations
* spacing
* typography

---

# PostgreSQL

Primary database.

Reasons:

* reliability
* scalability
* relationships
* Payload support

---

# GSAP

Primary animation library.

Responsible for:

* reveals
* page transitions
* timelines
* hover interactions
* pinned sections
* image animations

All major motion should be implemented using GSAP.

---

# ScrollTrigger

Responsible for:

* scroll animations
* pinned sections
* timeline synchronization

Should always be synchronized with Lenis.

---

# Lenis

Responsible only for smooth scrolling.

Do not use Lenis for animations.

Lenis controls scroll physics.

GSAP controls motion.

---

# Tailwind CSS

Tailwind should be used for layout and styling.

Reasons:

* consistency
* rapid development
* maintainability
* design token integration

Avoid large global CSS files.

---

# Fonts

Use:

next/font

Avoid loading fonts manually.

Prefer variable fonts.

---

# Images

Use:

next/image

Requirements:

* responsive
* optimized
* lazy loading
* AVIF/WebP
* priority for hero images

---

# Icons

Use a minimal icon library.

Recommended:

Lucide React

Icons should remain secondary.

---

# Forms

Recommended:

React Hook Form

Validation:

Zod

---

# Data Validation

Use:

Zod

Shared validation between frontend and Payload where appropriate.

---

# Environment Variables

All secrets should remain inside environment variables.

Never hardcode:

* API keys
* Database URLs
* Secrets

---

# Folder Philosophy

Separate:

* UI
* Features
* CMS
* Utilities
* Animations

Avoid placing unrelated code together.

---

# Code Quality

Requirements:

* ESLint
* Prettier
* TypeScript strict mode

The project should compile without warnings.

---

# Accessibility

Use semantic HTML.

Prefer native elements.

Support:

* keyboard navigation
* screen readers
* reduced motion

---

# Performance Goals

Target:

Lighthouse

Performance ≥ 95

Accessibility ≥ 95

Best Practices ≥ 95

SEO ≥ 95

Motion should never compromise performance.

---

# Browser Support

Support:

* latest Chrome
* latest Edge
* latest Safari
* latest Firefox

Graceful degradation for unsupported features.

---

# Mobile Strategy

Mobile is a first-class experience.

Reduce:

* heavy motion
* parallax
* expensive effects

Maintain:

* layout quality
* typography
* imagery

---

# Technical Principles

Prefer:

* simplicity
* maintainability
* readability
* composition
* scalability

Avoid unnecessary dependencies.

Every package should solve a real problem.

---

# Future Integrations

The architecture should allow future integration with:

* Analytics
* Search Console
* Cloudinary (optional)
* Email services
* Multilingual support

without requiring major architectural changes.

---

# Final Principle

Technology exists to support architecture.

Visitors should notice the experience—not the framework behind it.
