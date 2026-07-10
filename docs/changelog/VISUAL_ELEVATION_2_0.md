# Visual Elevation 2.0 — Award-Level Polish Pass

Date: 2026-07-10
Scope: visual interface only. No architecture, CMS, routing, or motion-engine changes.
Direction reference: `docs/VISUAL_DIRECTION_2_0.md`

## Summary

Full-site elevation pass implementing the "monograph and drawing set" direction.
Part of the work landed via a prior implementation pass (typography tokens, nav shell,
home hero); this pass verified it, fixed its defects, and completed the remaining pages.

## Fixed defects from the prior pass

- `var(--space-18)` / `var(--space-28)` did not exist in the token scale — the affected
  paddings/margins silently resolved to `0` (home hero bottom padding, selected-projects
  spacing). Replaced with valid tokens.
- Navigation dark theme flipped to light after 24px of scroll while still over the hero
  photograph. Replaced the pathname+scroll heuristic with an IntersectionObserver on a
  `[data-hero-theme="dark"]` sentinel — the bar stays dark for the full hero and flips
  exactly when the hero leaves the header band.
- `.type-statement` was declared after `.type-display`, so Studio/Contact page titles
  (`EditorialStatement` + `type-display` override) rendered at statement size. Reordered.

## Completed in this pass

- **Home featured project**: letterboxed in-grid image → full-bleed 21/9 band with a
  title-block caption grid below (category/location/year · title+excerpt · view link).
- **Home contact chapter**: email-first — serif mailto at statement scale replaces the
  bordered info column; phone/location collapse to one label line.
- **Footer**: four-column link block → one-row colophon under a single hairline
  (wordmark · pages · social · ©).
- **Contact page**: removed Project Type / Budget / Timeline selects; email address is
  the primary act; form reduced to Name/Email/Message at reading width; calmer
  background rhythm (no strict zebra).
- **Project detail**: scrimmed photo hero → "cover plate" (paper title page: category
  label, display title, hairline meta row) with the cover image full-bleed below, no
  gradient scrims anywhere; details table now sticky beside the statement; statement
  uses first-paragraph-at-statement-size device; gallery captions demoted to true
  captions; next-project block elevated to a display-scale full-band link.
- **Work archive**: opens with the widest (21/10) plate; serif index numerals in the
  metadata margin; title sits on a hairline row under each image with underline-grow
  hover (accent-color hover removed); wider, varied entry spacing; project count line.
- **Studio**: philosophy uses statement-first device; "The Process" chapter divider
  announces the Signature Experience; drawing canvas lost its border box and bleeds to
  the right viewport edge; progress lines lengthened; principles moved to paper
  background (chapter grouping instead of zebra).
- **Sitewide sweep**: unified interactive grammar (underline-grow / opacity hover,
  no accent-color hovers) across Studio, SystemPage, error page.

## Verification

- `tsc --noEmit` clean.
- All routes fetched on the live dev server (200): `/`, `/work`, `/studio`, `/contact`,
  `/work/courtyard-residence`. Markup spot-checked for every new element; no dev-server
  errors logged. Pixel QA in a real browser across breakpoints is still recommended
  (390 / 768 / 1024 / 1440 / 1728).

## Known content gaps (not code)

- Home Selected Projects still renders the old placeholder image: no CMS projects are
  flagged `featured: true` (the query falls back to hardcoded placeholders).
- Archive entries currently share one repeated photograph — unique covers per project
  are the single biggest remaining lever for award readiness.
