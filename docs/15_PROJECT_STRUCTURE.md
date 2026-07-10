# 15 — Project Structure

## Purpose

This document defines how the codebase should be organized.

The goal is to keep the project clean, scalable, predictable, and easy for Codex or any developer to understand.

---

# Core Principle

Structure by responsibility.

Not by randomness.

Every file should have a clear home.

If it is unclear where a file belongs, the structure needs improvement.

---

# Recommended Root Structure

```txt id="p1f8zi"
project-root/
│
├── app/
├── components/
├── features/
├── payload/
├── lib/
├── hooks/
├── providers/
├── animations/
├── styles/
├── types/
├── utils/
├── public/
├── docs/
├── payload.config.ts
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

# app/

Contains Next.js App Router routes.

Recommended:

```txt id="uqfjpp"
app/
│
├── (site)/
│   ├── page.tsx
│   ├── work/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── studio/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
│
├── (payload)/
│   └── admin/
│
├── api/
│
├── layout.tsx
├── globals.css
└── not-found.tsx
```

Use route groups to separate public website and Payload admin.

---

# components/

Contains reusable shared components.

Recommended:

```txt id="1f2f28"
components/
│
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Container.tsx
│   └── Section.tsx
│
├── navigation/
│   ├── FullscreenMenu.tsx
│   └── MenuButton.tsx
│
├── typography/
│   ├── SectionHeading.tsx
│   └── EditorialStatement.tsx
│
├── media/
│   ├── ImageBlock.tsx
│   ├── ProjectGallery.tsx
│   └── VideoBlock.tsx
│
├── project/
│   ├── ProjectCard.tsx
│   ├── ProjectMetadata.tsx
│   └── NextProject.tsx
│
└── contact/
    ├── ContactBlock.tsx
    └── ContactForm.tsx
```

Components should remain reusable and presentation-focused.

---

# features/

Contains page-level or domain-specific logic.

Recommended:

```txt id="u393cn"
features/
│
├── home/
│   ├── HomeHero.tsx
│   ├── SelectedProjects.tsx
│   └── FeaturedProject.tsx
│
├── work/
│   ├── WorkGrid.tsx
│   └── ProjectFilters.tsx
│
├── project/
│   ├── ProjectHero.tsx
│   ├── ProjectIntro.tsx
│   └── ProjectStory.tsx
│
├── studio/
│   ├── StudioHero.tsx
│   └── StudioManifesto.tsx
│
└── contact/
    └── ContactPageContent.tsx
```

Features can compose multiple shared components.

---

# payload/

Contains Payload CMS configuration.

Recommended:

```txt id="w9yy4p"
payload/
│
├── collections/
│   ├── Projects.ts
│   ├── ProjectCategories.ts
│   ├── Media.ts
│   ├── Users.ts
│   └── TeamMembers.ts
│
├── globals/
│   ├── SiteSettings.ts
│   ├── ContactInfo.ts
│   ├── Navigation.ts
│   └── SeoDefaults.ts
│
├── fields/
│   ├── slugField.ts
│   ├── seoFields.ts
│   └── imageFields.ts
│
├── access/
│   ├── admins.ts
│   └── publishedOnly.ts
│
└── hooks/
    └── generateSlug.ts
```

Payload should be isolated from frontend presentation logic.

---

# lib/

Contains shared business logic and integrations.

Recommended:

```txt id="x34i62"
lib/
│
├── payload/
│   ├── getPayloadClient.ts
│   ├── queries.ts
│   └── types.ts
│
├── seo/
│   └── metadata.ts
│
└── constants/
    └── site.ts
```

---

# hooks/

Contains reusable React hooks.

Examples:

```txt id="gzgblb"
useMediaQuery.ts
useReducedMotion.ts
useIsomorphicLayoutEffect.ts
useScrollDirection.ts
```

Hooks should be generic and reusable.

---

# providers/

Contains global client providers.

Recommended:

```txt id="i8xv7c"
providers/
│
├── LenisProvider.tsx
├── GSAPProvider.tsx
└── MenuProvider.tsx
```

Providers should be used carefully.

Do not create unnecessary global state.

---

# animations/

Contains reusable animation utilities.

Recommended:

```txt id="p64t9g"
animations/
│
├── reveal.ts
├── imageReveal.ts
├── textReveal.ts
├── menuAnimations.ts
├── pageTransitions.ts
└── parallax.ts
```

No random animation logic should be scattered across components.

---

# styles/

Contains global styling and design tokens.

Recommended:

```txt id="n2yk7u"
styles/
│
├── tokens.css
├── typography.css
├── utilities.css
└── globals.css
```

If Tailwind is used, tokens should still be documented and mapped clearly.

---

# types/

Contains shared TypeScript types.

Recommended:

```txt id="4i9azh"
types/
│
├── project.ts
├── media.ts
├── navigation.ts
└── seo.ts
```

Payload-generated types can also be placed here if configured.

---

# utils/

Contains small pure utility functions.

Examples:

```txt id="q5i1ly"
cn.ts
formatDate.ts
sortProjects.ts
getNextProject.ts
```

Utilities should not contain React components.

---

# public/

Contains static assets.

Recommended:

```txt id="tlmnwr"
public/
│
├── images/
├── videos/
├── icons/
└── favicons/
```

CMS-uploaded media should not be manually placed here unless used as fallback/demo content.

---

# docs/

Contains all project documentation.

Codex should read the docs before making changes.

---

# File Naming

Use PascalCase for React components:

```txt id="osfstq"
ProjectCard.tsx
EditorialStatement.tsx
```

Use camelCase for utilities:

```txt id="gs9uu2"
formatDate.ts
getNextProject.ts
```

Use kebab-case only for static assets and route segments.

---

# Component Rules

Components should be:

* small;
* reusable;
* typed;
* accessible;
* responsive;
* content-driven.

Avoid huge components.

Split complex sections into smaller pieces.

---

# Server vs Client Components

Default to Server Components.

Use Client Components only when needed for:

* GSAP animations;
* Lenis;
* interactive menus;
* filters;
* forms;
* custom cursor;
* hover state that requires JS.

Do not mark components as `"use client"` unnecessarily.

---

# Data Fetching

Fetch CMS data at the page or feature level.

Do not fetch data inside small presentational components.

Recommended:

```txt id="i4nms2"
Page fetches data

↓

Feature receives data

↓

Components render data
```

---

# Import Rules

Avoid deep random imports.

Prefer clear paths.

Recommended aliases:

```txt id="5hpltq"
@/components
@/features
@/lib
@/hooks
@/animations
@/types
@/utils
@/payload
```

---

# Separation of Concerns

Frontend owns:

* layout;
* typography;
* animation;
* component structure;
* responsive behavior.

Payload owns:

* content;
* images;
* metadata;
* publishing.

---

# Final Principle

A good project structure should make future work obvious.

When Codex creates a new file, it should already know where that file belongs.
