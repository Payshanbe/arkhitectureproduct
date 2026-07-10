# Phase 12 - SEO & Metadata

Date: 2026-07-09

## Scope

Made the public site SEO-ready for Version 1.0.

No visual design changes, layout changes, CMS schema changes, analytics, new pages, or performance-phase work were included.

## Global Metadata

- Added centralized SEO helpers in `lib/seo/metadata.ts`.
- Configured:
  - site title
  - title template
  - site description
  - safe `metadataBase` from `NEXT_PUBLIC_SITE_URL`
  - Open Graph defaults
  - Twitter card defaults

## Page Metadata

- Added page-level metadata for:
  - Home
  - Work
  - Studio
  - Contact
- Project Detail metadata remains CMS-driven and now aligns with the global metadata strategy.

## Project Detail Metadata

Project pages use published Payload project content for:

- title
- SEO description or excerpt fallback
- project cover/SEO image for Open Graph and Twitter
- canonical URL
- project facts such as location, year, category, services, area, architect, and status where available

Missing or unpublished projects return noindex metadata.

## Sitemap And Robots

- Added `app/sitemap.ts`.
- Added `app/robots.ts`.
- Sitemap includes static public routes and published project detail routes.
- Robots allows the public site and disallows `/admin` and `/api`.

## Structured Data

- Added JSON-LD support through `components/seo/StructuredData.tsx`.
- Added global Organization schema.
- Added global WebSite schema.
- Added CreativeWork schema for project detail pages.

## Verification

Recommended commands:

```bash
npm run lint
npm run build
npm run dev
```

