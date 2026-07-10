# Phase 11A - Production Audit

Date: 2026-07-09

Scope: architecture, folder structure, components, Payload integration, motion, accessibility, SEO, metadata, performance, responsive behavior, type safety, Server vs Client Components, duplication, dead code, and technical debt.

Audit method: static project review only. No production build, lint, typecheck, browser run, or code changes were performed because this phase is an audit and the only permitted write is this report.

## Executive Summary

The project is architecturally coherent and follows the phased direction well. The public site and Payload admin are isolated with App Router route groups, the CMS model is broadly appropriate for an architecture portfolio, and the frontend has a consistent editorial component language.

The main blockers before production are not visual quality issues. They are operational and metadata issues: the repository has no committed baseline, CMS schema/database migration readiness is not proven, project-detail metadata is not CMS-driven, and the current production gate lacks tests or CI evidence. There is also a maintainability tax from repeated Payload normalization helpers and repeated animation wrapper patterns.

No Critical issues were found in the current static review. Several High issues should be resolved before treating the site as production-ready.

## Findings

### High - Repository Has No Committed Baseline

Affected files:

- Entire repository
- `.gitignore`

Reason:

`git status --short --ignored` shows all source files as untracked. Generated folders and local files are ignored correctly (`node_modules/`, `.next/`, `.env.local`, `tsconfig.tsbuildinfo`), but the project itself has no visible committed baseline.

Impact:

Production review, rollback, release diffing, branch comparison, and deployment traceability are unreliable. A team cannot safely approve production release without knowing what exact source state is being shipped.

Recommended fix:

Create a clean initial commit after reviewing ignored files. Ensure `Desktop.ini` is either removed from the project root or added to `.gitignore`. Require all future phase work to be reviewed through commits or pull requests.

### High - Payload Schema And Database Migration Readiness Is Not Proven

Affected files:

- `payload/collections/Projects.ts`
- `scripts/seed.ts`
- `types/payload-types.ts`
- Database schema / local PostgreSQL state

Reason:

The Projects collection defines status values including `built`, `concept`, `in-progress`, and `completed`. Prior project history and seed behavior indicate status values were avoided in seed data because the local database enum did not accept all collection options. That is a migration/schema drift risk.

Impact:

Production content entry or seed runs can fail if the database enum differs from the Payload collection definition. This is especially risky for deployments where Payload schema changes are applied to an existing database.

Recommended fix:

Add an explicit Payload/Postgres migration workflow and verify it against a clean database and an upgraded existing database. Re-run `npm run seed` after migrations. Keep `types/payload-types.ts` regenerated after schema changes.

### High - Project Detail Metadata Is Not CMS-Driven

Affected files:

- `app/(site)/work/[slug]/page.tsx`
- `payload/fields/seoFields.ts`
- `payload/collections/Projects.ts`
- `docs/03_CMS_ARCHITECTURE.md`

Reason:

The dynamic project route generates metadata from the slug only. It does not load the project title, excerpt, SEO title, SEO description, canonical URL, or image from Payload, despite the CMS documentation stating that SEO metadata should be generated from CMS fields.

Impact:

Project pages will have weak search snippets, poor social previews, and inconsistent metadata. This directly affects production quality for the most important content type.

Recommended fix:

Generate project-detail metadata from the same published project query used by the page. Use `seo.title`, `seo.description`, project excerpt, title, cover image, and canonical URL. Return not-found metadata or noindex behavior when the project is unpublished or missing.

### High - No Automated Test Or CI Gate Is Defined

Affected files:

- `package.json`
- Repository workflow configuration

Reason:

The scripts include lint, typecheck, build, seed, and Payload generation commands, but there is no test script and no visible CI workflow. Production readiness currently depends on manual command execution.

Impact:

Regressions in routing, CMS queries, accessibility, and motion behavior can ship unnoticed. The risk increases as the site adds project detail pages and CMS-driven content.

Recommended fix:

Add a minimal production gate: `npm run lint`, `npm run typecheck`, `npm run build`, and at least smoke tests for public routes plus Payload route isolation. Add CI to run this gate on pull requests.

### Medium - SEO Coverage Is Too Shallow For Production

Affected files:

- `app/(site)/layout.tsx`
- `app/(site)/page.tsx`
- `app/(site)/work/page.tsx`
- `app/(site)/studio/page.tsx`
- `app/(site)/contact/page.tsx`
- `app/(site)/work/[slug]/page.tsx`
- `payload/globals/SeoDefaults.ts`

Reason:

Static pages define basic title/description metadata, while the root layout defines a simple default. There is no visible Open Graph, Twitter, canonical, robots, metadata base, or shared metadata helper wired to the CMS SEO defaults.

Impact:

The site may render correctly but perform poorly in search, link previews, and production sharing contexts. Metadata behavior will also be inconsistent across pages.

Recommended fix:

Create a centralized metadata helper that reads site defaults and composes page-level metadata consistently. Include canonical URLs, Open Graph images, Twitter cards, and robots behavior.

### Medium - Contact Form Appears Actionable But Has No Submission Path

Affected files:

- `features/contact/ContactPage.tsx`
- `app/(site)/contact/page.tsx`

Reason:

The contact form includes production-looking fields and a "Send inquiry" control, but the button is `type="button"` and there is no backend submission, validation, success state, or error state. The page copy notes that the form is UI-only, but the interface still presents a submit-like action.

Impact:

Users can fill out a form and click what looks like a submit action with no result. This creates a production trust issue and an accessibility/usability problem.

Recommended fix:

Before production, either implement the submission path or make the form clearly non-submittable. If kept UI-only for a demo, remove the submit-style action or replace it with a direct email call to action.

### Medium - Payload Query And Normalization Logic Is Duplicated

Affected files:

- `features/home/HomeSelectedProjects.tsx`
- `features/home/HomeFeaturedProject.tsx`
- `features/work/WorkArchive.tsx`
- `features/work/ProjectDetail.tsx`

Reason:

Helpers such as `isMedia`, `isProjectCategory`, `normalizeImageUrl`, and `normalizeLocation` are repeated across feature modules.

Impact:

Bug fixes and schema changes must be applied in multiple places. As CMS fields evolve, the risk of inconsistent frontend behavior increases.

Recommended fix:

Move project normalization and image URL handling into a small server-only Payload data module, for example under `lib/payload/`. Keep page components focused on rendering.

### Medium - Motion Wrappers Repeat The Same Reveal Pattern

Affected files:

- `features/home/HomeSelectedProjectsMotion.tsx`
- `features/home/HomeFeaturedProjectMotion.tsx`
- `features/home/HomeStudioIntroMotion.tsx`
- `features/home/HomeContactExperienceMotion.tsx`
- `features/work/WorkArchiveMotion.tsx`
- `features/work/ProjectDetailMotion.tsx`
- `features/studio/StudioPageMotion.tsx`
- `features/contact/ContactPageMotion.tsx`

Reason:

Each wrapper repeats the same client-component pattern: root ref, reduced-motion check, query selector, `sectionReveal`, and cleanup.

Impact:

The current implementation is readable, but future pages will multiply boilerplate. Motion timing and cleanup changes will become harder to apply consistently.

Recommended fix:

Introduce one reusable reveal wrapper or hook that accepts a selector and stagger settings. Keep GSAP registration centralized in `animations/gsap.ts`.

### Medium - Global ScrollTrigger Disable Is Broad

Affected files:

- `providers/GSAPProvider.tsx`
- `providers/LenisProvider.tsx`
- `animations/gsap.ts`

Reason:

GSAP and ScrollTrigger registration is centralized and client-guarded, which is good. However, reduced-motion handling calls `ScrollTrigger.disable(true, false)` globally from a provider. That broad global toggle can affect any future ScrollTrigger instance and makes behavior harder to reason about as motion grows.

Impact:

Future animation additions may behave unexpectedly when reduced-motion preferences change at runtime. Debugging global trigger state can become difficult.

Recommended fix:

Prefer reduced-motion checks at the animation utility level, with provider-level behavior limited to initialization and refresh. Keep global disable only if a documented policy explicitly requires it.

### Medium - Server/Client Boundary Is Mostly Good But Hero Hydration Is Larger Than Necessary

Affected files:

- `features/home/HomeHero.tsx`
- `app/(site)/layout.tsx`
- `components/layout/Header.tsx`
- `components/navigation/Navigation.tsx`

Reason:

Most CMS-heavy content is server-rendered with small client wrappers for motion. The home hero is a full Client Component because its reveal animation is embedded directly in the component. Navigation is also client-rendered to detect active path and control the fullscreen menu.

Impact:

The current bundle is acceptable for an MVP, but the hero ships more hydration than strictly necessary for static content. This matters because the hero is above the fold.

Recommended fix:

Consider splitting the hero into a server-rendered markup component plus a small client motion wrapper, matching the pattern used by later sections. Keep navigation client-side only where interactivity requires it.

### Medium - Image Strategy Is Demo-Ready, Not Production-Ready

Affected files:

- `public/images/home-hero-placeholder.png`
- `public/media/home-hero-placeholder.png`
- `public/media/home-hero-placeholder-480x320.png`
- `public/media/home-hero-placeholder-1536x1024.png`
- `features/home/*`
- `features/work/*`
- `next.config.ts`

Reason:

The site relies on placeholder imagery in several CMS fallback paths. `next.config.ts` does not define a production image policy beyond Payload integration. This is acceptable for a demo but incomplete for a real image-driven architecture site.

Impact:

Repeated placeholder imagery lowers perceived quality. If production media moves to remote storage later, image loading may fail without explicit `images.remotePatterns` configuration.

Recommended fix:

Replace placeholder media with final licensed architecture photography before launch. Define image source policy in `next.config.ts` once the storage target is known. Keep alt text and captions content-managed.

### Medium - Missing Skip Link

Affected files:

- `app/(site)/layout.tsx`
- `components/layout/Header.tsx`
- `components/layout/Page.tsx`
- `app/globals.css`

Reason:

The public site has a fixed global header and repeated navigation, but there is no visible skip-to-content link for keyboard users.

Impact:

Keyboard and assistive technology users must tab through the global navigation on every page before reaching page content.

Recommended fix:

Add a visually hidden skip link that becomes visible on focus and targets the main content element.

### Medium - No Custom Error, Loading, Or Not Found Strategy For Public Routes

Affected files:

- `app/(site)/`
- `app/(site)/work/[slug]/page.tsx`
- `app/not-found.tsx` if added later

Reason:

The project detail route correctly calls `notFound()` when a project is missing, but there is no visible custom public not-found experience, error boundary, or loading strategy for CMS-backed routes.

Impact:

Runtime CMS failures or missing content may fall back to generic framework behavior that does not match the site's editorial quality.

Recommended fix:

Add scoped `not-found.tsx` and `error.tsx` for the public site group. Consider route-level loading states only where streaming or slow CMS responses require them.

### Medium - Documentation And Implementation Are Not Fully Aligned

Affected files:

- `docs/03_CMS_ARCHITECTURE.md`
- `docs/15_PROJECT_STRUCTURE.md`
- `docs/19_DATA_MODEL.md`
- `payload/collections/Projects.ts`
- `features/contact/ContactPage.tsx`
- `features/work/ProjectDetail.tsx`

Reason:

The implementation mostly follows the documents, but several documented expectations are incomplete: CMS-generated SEO metadata, CMS-driven contact information, formal Pages/Team/Social Links expansion, and shared `lib/payload` query organization. Some docs also display mojibake characters, suggesting encoding damage.

Impact:

Future contributors may follow stale or partially implemented documentation. Encoding issues make docs harder to trust and read.

Recommended fix:

Update docs after production fixes land. Clarify which documented CMS items are Version 1.0 versus future scope. Normalize documentation encoding to UTF-8.

### Low - Root Structure Is Clear But `lib/` Is Underused

Affected files:

- `lib/`
- `features/home/*`
- `features/work/*`
- `docs/15_PROJECT_STRUCTURE.md`

Reason:

The root folder structure matches the documented responsibility split. However, shared business logic and CMS query helpers currently live inside feature components instead of `lib/payload`.

Impact:

This is not blocking, but it will make future UI work slower and more fragile.

Recommended fix:

Move only genuinely shared server data logic into `lib/payload` when the next CMS-driven page or refactor touches those files.

### Low - Potential Dead Or Underused Shared Component

Affected files:

- `components/typography/SectionHeading.tsx`

Reason:

`SectionHeading` exists as a shared typography primitive, but no current source usage was found in the static scan.

Impact:

Small dead-code risk. More importantly, it suggests page sections are composing typography ad hoc instead of using shared primitives consistently.

Recommended fix:

Either adopt the primitive where it improves consistency or remove it if the project has settled on direct typography composition.

### Low - Generated Artifacts Exist Locally

Affected files:

- `.next/`
- `node_modules/`
- `tsconfig.tsbuildinfo`
- `.gitignore`

Reason:

Generated and dependency folders exist in the workspace. They are ignored correctly, but their local presence can create noise during manual audits.

Impact:

Low production impact if the ignore rules are honored. It can still confuse reviewers and tooling if artifacts leak into packaging or deployment contexts.

Recommended fix:

Keep them ignored. Do not commit generated artifacts. Consider cleaning local artifacts before final release review if a pristine tree is required.

### Low - Dependency Set Is Reasonable But Needs Ongoing Review

Affected files:

- `package.json`
- `package-lock.json`

Reason:

The dependency set is focused: Next, React, Payload, Postgres adapter, GSAP, Lenis, SplitType, Sharp, Tailwind, ESLint, Prettier, and TypeScript. No obvious overlapping UI framework or animation library was found. `split-type` is only justified if text splitting remains part of the motion system.

Impact:

Low current risk. Bundle size should be monitored as animation usage expands.

Recommended fix:

Run dependency audit and bundle analysis before launch. Remove `split-type` if text reveal utilities are removed or no longer used.

## Area Review

### Architecture And Folder Structure

The project structure is strong. `app`, `components`, `features`, `payload`, `providers`, `animations`, `hooks`, `styles`, `types`, and `utils` are clear and scalable. Route groups correctly separate public site and Payload. The main maintainability concern is that shared Payload normalization and query logic lives in feature files instead of `lib/payload`.

### App Router Architecture

The App Router layout model is sound. `app/(site)/layout.tsx` wraps only the public site with Header, Footer, and MotionProvider. `app/(payload)/layout.tsx` keeps Payload CSS, admin layout, and server functions separate. Static metadata exists for major public pages, but dynamic project metadata is too shallow. Public error/loading/not-found strategy is still incomplete.

### Payload Integration

Payload 3 integration is broadly correct: `withPayload`, route-grouped admin/API routes, Postgres adapter, generated import map, collections, globals, and access controls are present. The largest risk is operational schema drift between collection definitions and the database. SEO fields exist but are not fully consumed by frontend metadata.

### Motion

GSAP registration is centralized and client-guarded. Lenis and reduced-motion handling are present. The architecture is solid for the current site, but repeated motion wrappers and broad global ScrollTrigger disable behavior should be cleaned up before the animation system grows.

### Design System

Tokens, typography, layout primitives, and section rhythm are consistently used. The visual implementation aligns with the quiet editorial direction. Some docs mention primitives that are not consistently used, and the image system is still placeholder-heavy.

### TypeScript

Strict mode is enabled. Payload-generated types are used throughout CMS-driven components. The main type-safety concern is not `any` usage; it is duplicated normalization logic and schema/database drift risk. `skipLibCheck` is enabled, which is common for app builds but should not replace app-level type safety.

### Performance

Server Components are used for most CMS queries. Client Components are mostly limited to motion, header/menu, navigation, and the animated hero. The biggest performance opportunities are reducing above-the-fold hero hydration, adding image strategy decisions for production media, and running bundle analysis.

### Accessibility

The fullscreen menu is well-considered: dialog semantics, focus trap, ESC close, focus restore, and scroll lock are present. Reduced motion is supported. Missing skip link and the UI-only contact form are the notable accessibility/usability risks.

### SEO And Metadata

SEO is the weakest production area. Page-level metadata exists, but project pages do not use CMS SEO fields, and there is no complete Open Graph/Twitter/canonical strategy visible.

### Dependencies

Dependencies are appropriate and not obviously excessive. The project should add a production dependency audit and bundle analysis before launch.

### Documentation

Documentation is extensive and generally aligned with implementation direction. Some documents describe future CMS capabilities that are not fully implemented yet. Encoding artifacts in docs should be cleaned up.

## Scores

Overall Production Readiness Score: 7/10

Performance Score: 7/10

Architecture Score: 8/10

Accessibility Score: 7/10

Maintainability Score: 7/10

## Approval Decision

I would not approve this project for production release yet.

I would approve it to continue controlled UI implementation and editorial polish, provided the High issues are tracked and resolved before launch. The architecture is strong enough to build on, but production approval requires a committed repository baseline, verified Payload migrations, CMS-driven project metadata, and an automated release gate.

