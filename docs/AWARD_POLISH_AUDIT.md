# Award Polish Audit

Date: 2026-07-10

Scope: visual design, interaction, motion, responsive behavior, content, CMS consistency, SEO, metadata, sitemap, robots, accessibility, and performance.

Audit method: static project review. No browser/device visual QA was performed in this pass. No code, layout, CMS data, or page structure was modified.

## Executive Summary

The site has a strong editorial foundation for an architecture studio: restrained typography, generous rhythm, image-led page structures, a refined navigation direction, and a distinctive Studio Signature Experience. The architecture is coherent and the project now has a clear content and asset pipeline.

For an Awwwards or CSS Design Awards submission, the biggest blockers are not the page architecture. They are the remaining placeholder imagery, partial CMS/content integration, lack of final visual QA across breakpoints, and a few interaction/production polish details that would be noticed by judges.

No Critical issues were found in the static audit. The site is directionally strong, but it should not be submitted for awards until the High issues are resolved.

## Critical Issues

No Critical issues found in this static audit.

## High Issues

### High - Placeholder Imagery Still Defines The Visual Impression

Page/section:

- Home hero
- Home selected projects
- Home featured project
- Work archive
- Project detail hero/gallery
- Open Graph previews

Problem:

The site still uses `public/images/home-hero-placeholder.png` and Payload placeholder media/fallbacks in key image positions.

Why it matters:

For an awards submission, photography is the primary emotional surface. Repeated placeholder imagery makes the site feel like a polished prototype rather than a finished architecture portfolio.

Recommended fix:

Replace all project cover, gallery, project OG, and global OG assets using the documented asset workflow in `docs/assets/IMAGE_REPLACEMENT_PLAN.md`. Each project should have unique cover, gallery, and OG Media records.

### High - Home Hero Image Is Still Hardcoded

Page/section:

- Home hero
- `features/home/HomeHero.tsx`

Problem:

The homepage hero uses a hardcoded static image instead of a CMS/global content source.

Why it matters:

The hero is the first award-facing impression. A hardcoded image makes final content management fragile and inconsistent with the CMS-driven project sections.

Recommended fix:

Move Home hero visual/content into a Payload global or homepage content model. Keep the existing visual layout, but source image, alt text, label, headline, and support copy from CMS.

### High - Final Visual QA Has Not Been Proven In Browser

Page/section:

- Entire public site
- Home, Work, Project Detail, Studio, Contact

Problem:

This audit is static. There is no recorded browser QA for desktop, tablet, and mobile after recent typography, navigation, Signature Experience, and CMS/content changes.

Why it matters:

Award-level polish depends on exact composition, cropping, rhythm, and motion timing. Static code review cannot confirm whether the site feels premium in motion or across real viewport widths.

Recommended fix:

Run browser QA at minimum widths: 390, 768, 1024, 1440, and 1728. Capture screenshots and inspect hero composition, navigation overlay, project image crops, gallery rhythm, Signature Experience, and footer spacing.

### High - Contact Form Looks Production-Ready But Is UI-Only

Page/section:

- Contact page form
- `features/contact/ContactPage.tsx`

Problem:

The form presents a full inquiry experience, but submission is not implemented. The copy states it is prepared for future submission, but the UI still looks actionable.

Why it matters:

For awards and production users, a dead form weakens trust. It can feel unfinished even if technically intentional for Version 1.0.

Recommended fix:

Either implement a real submission path or replace the submit-style action with a clear mailto/contact link for the award submission build.

### High - Signature Experience Still Reads Partly As Prototype

Page/section:

- Studio Process / Signature Experience
- `features/signature-experience/components/SignatureExperienceSection.tsx`
- `features/signature-experience/assets/`

Problem:

The section is architecturally strong but still uses prototype naming/classes and concept-level SVG assets.

Why it matters:

Signature sections are judged harshly. If it feels like a technical demo rather than a refined studio narrative, it can reduce the premium impression.

Recommended fix:

Finalize SVG art direction, remove prototype language/classes where visible or semantically misleading, and perform browser timing QA on desktop and mobile. Preserve reduced motion and non-pinned mobile behavior.

## Medium Issues

### Medium - Some Page Copy Remains Hardcoded Outside CMS

Page/section:

- Home Studio Intro
- Home Contact Experience
- Studio page
- Contact page
- Footer/navigation depending on current integration

Problem:

Projects are CMS-driven, but several editorial content areas are still hardcoded in React components.

Why it matters:

Awards submission can tolerate this technically, but content maintenance becomes inconsistent. It also limits final editorial tuning without code changes.

Recommended fix:

Add CMS globals/page content for Home, Studio, Contact, footer/socials, and navigation copy. Keep existing layout and design.

### Medium - Project Content Model Is Richer Than Current Frontend Presentation

Page/section:

- Project detail
- Payload Projects collection

Problem:

Payload now supports richer fields like tagline, summary, building type, lighting concept, spatial qualities, photography direction, and related projects, but the frontend currently displays only part of that content.

Why it matters:

The editorial content has more narrative depth than the page currently exposes. The project detail page may feel less publication-like than the CMS content allows.

Recommended fix:

In a future editorial page pass, expose selected fields such as tagline, lighting concept, and spatial qualities without adding heavy new sections.

### Medium - Open Graph Defaults Need Final Imagery

Page/section:

- Global metadata
- Project metadata
- `lib/seo/metadata.ts`
- Payload `seo-defaults.defaultImage`

Problem:

Project pages can use CMS SEO images, but the global default OG image still needs a final branded visual asset.

Why it matters:

Award submissions and social sharing depend on a refined preview. Missing or generic OG imagery makes the site feel unfinished outside the page itself.

Recommended fix:

Create and assign `home-og.webp` or equivalent global 1200x630 image through SEO defaults and verify project-specific OG images.

### Medium - Mobile Menu Needs Real Device QA After Premium Navigation Changes

Page/section:

- Header
- Fullscreen menu
- `components/layout/Header.tsx`
- `components/navigation/FullscreenMenu.tsx`

Problem:

The menu has the right accessibility structure: Escape close, focus trap, body lock, route close, `aria-modal`, and `inert`. But recent design changes should be verified visually on small screens.

Why it matters:

Mobile navigation is a common awards judging touchpoint. Any overlap, transparent panel issue, double icon state, or scroll leak will feel unpolished immediately.

Recommended fix:

QA on actual mobile widths and verify open/close state, focus return, body scroll lock, link tap targets, and menu panel contrast.

### Medium - Motion System Is Solid But Broad Reduced-Motion Handling Needs Care

Page/section:

- Global motion providers
- `providers/GSAPProvider.tsx`
- `providers/LenisProvider.tsx`
- animation utilities

Problem:

Reduced motion is respected, and Lenis/ScrollTrigger cleanup exists. However, `ScrollTrigger.disable(true, false)` is broad and can affect all future scroll-driven interactions globally.

Why it matters:

As the Signature Experience grows, global trigger state can make debugging and QA harder.

Recommended fix:

Keep reduced-motion fallbacks at utility/component level where possible and document the provider-level policy.

### Medium - CMS Media Library Needs Stronger Asset Governance

Page/section:

- Payload Media
- `payload/collections/Media.ts`

Problem:

Media supports `alt`, `caption`, `orientation`, and `photographer`, but lacks asset governance fields such as license, source, usage rights, asset role, and replacement status.

Why it matters:

Architecture photography usually has licensing and credit constraints. Missing governance increases production and legal risk.

Recommended fix:

Add optional Media fields for `license`, `source`, `usageRights`, `assetRole`, `creditUrl`, and `replacementStatus` before final asset ingestion.

### Medium - Project Archive Rhythm Depends Heavily On Image Quality

Page/section:

- Work archive
- `features/work/WorkArchive.tsx`

Problem:

The archive has a good alternating layout pattern, but the effect depends on each project having strong, distinct cover images.

Why it matters:

With repeated or weak images, the page can still feel repetitive despite the layout rhythm.

Recommended fix:

Choose covers as a curated sequence, not individually. Confirm the archive reads like a magazine spread from top to bottom.

### Medium - Signature Experience Mobile Fallback Should Be Visually Reviewed

Page/section:

- Studio Process mobile fallback

Problem:

The fallback is present and readable, but static review cannot confirm if the repeated SVG panels feel elegant or too technical on mobile.

Why it matters:

Pinned desktop storytelling often fails on mobile if fallback pacing is not carefully edited.

Recommended fix:

QA mobile section length and visual density. If needed, reduce mobile SVG repetition or simplify scene panels while preserving accessible text.

## Low Issues

### Low - Prototype Route Remains Publicly Accessible

Page/section:

- `/prototype/signature-experience`

Problem:

The prototype route is still part of the public app.

Why it matters:

For production or awards submission, public prototype routes can feel unfinished if discovered.

Recommended fix:

Hide behind environment guard, noindex it, or remove from production deployment after the Studio integration is final.

### Low - Footer Social Links Are Placeholder-Oriented

Page/section:

- Footer
- Site globals / social links

Problem:

Social links currently appear to be placeholder-ready rather than final branded channels.

Why it matters:

Awards reviewers often check footer polish and external links. Placeholder links weaken credibility.

Recommended fix:

Replace with real channels or remove until available.

### Low - Brand Icon System Needs Final Identity Review

Page/section:

- Favicon
- Apple touch icon
- Manifest icons

Problem:

Favicon and app icons exist, but final brand identity readiness is not confirmed.

Why it matters:

Small browser details contribute to perceived completeness.

Recommended fix:

Confirm final favicon SVG, Apple touch icon, and manifest icons against the final studio identity.

### Low - Repeated Motion Wrapper Pattern Adds Maintenance Friction

Page/section:

- Home, Work, Studio, Contact motion wrappers

Problem:

Multiple motion wrappers repeat the same reveal pattern.

Why it matters:

Not an award blocker, but timing changes and cleanup updates are harder to apply consistently.

Recommended fix:

Create a shared reveal hook/wrapper after launch polish, without changing visual behavior.

### Low - Some CSS Class Names Still Reference Prototype Language

Page/section:

- Signature Experience

Problem:

Classes such as `signature-prototype-*` remain in integrated production code.

Why it matters:

This is mostly internal, but it signals unfinished naming.

Recommended fix:

Rename to production terms such as `signature-experience-*` during a cleanup pass.

## Area Review

## Visual Design

Strengths:

- Strong editorial direction.
- Refined restrained typography system.
- Good negative space and image-first layouts.
- Work archive has an alternating editorial rhythm.
- Project Detail has a publication-like sequence.

Risks:

- Placeholder imagery prevents award-level perception.
- Some pages depend on final image curation to fully work.
- Signature Experience needs final art polish and browser review.

## Interaction

Strengths:

- Navigation uses real links and active states.
- Mobile menu includes Escape close, focus handling, body scroll lock, route close, and modal semantics.
- Hover states are restrained.

Risks:

- Mobile menu needs device QA.
- Contact form action is not real.
- Prototype route remains accessible.

## Motion

Strengths:

- GSAP/ScrollTrigger registration is centralized.
- Lenis sync exists.
- Reduced motion handling exists.
- Motion language is subtle and appropriate.

Risks:

- Global ScrollTrigger disable may be broad.
- Signature Experience timing must be visually judged in browser.
- Repeated wrappers add future maintenance overhead.

## Responsive

Strengths:

- Components use responsive grids and `svh`.
- Mobile fallback exists for Signature Experience.
- Work and Project Detail image proportions are responsive.

Risks:

- No recorded post-polish screenshot QA.
- Image crop behavior depends on final assets.
- Navigation/menu must be confirmed on real mobile widths.

## Content

Strengths:

- Strong content strategy and project content pack exists.
- Project CMS model has become richer.
- Copy tone is aligned with quiet luxury/editorial architecture.

Risks:

- Some frontend copy remains hardcoded.
- Final project imagery is missing.
- Media governance fields are incomplete.

## Production

Strengths:

- Metadata helpers exist.
- Sitemap and robots exist.
- Payload admin is route-group isolated.
- Project detail metadata is CMS-aware.
- Accessibility foundations are mostly present.

Risks:

- OG image assets are not final.
- Contact form is UI-only.
- Browser performance and accessibility QA should be run before submission.

## Scores

Overall score: 7.4/10

Visual score: 7.2/10

Motion score: 7.8/10

Content score: 7.6/10

Production score: 7.1/10

## Top 10 Improvements Before Launch

1. Replace all placeholder project images with final architecture photography.
2. Move Home hero image/content into Payload or a CMS global.
3. Assign final project-specific OG images and a global OG fallback.
4. Perform desktop/tablet/mobile browser QA with screenshots.
5. Finalize Signature Experience SVG art and remove prototype naming.
6. Either implement the contact form backend or replace the submit action with a direct email CTA.
7. Add stronger Media governance fields for license, source, usage rights, and asset role.
8. Verify mobile menu visually on real viewport widths and touch interactions.
9. Curate Work archive image sequence as a full editorial spread.
10. Hide or noindex the prototype route before public award submission.

## Award Submission Decision

Do not submit yet.

The site has the right foundation and direction for awards consideration, but it still reads as a high-quality prototype until final photography, OG imagery, Signature Experience art polish, and browser QA are complete.
