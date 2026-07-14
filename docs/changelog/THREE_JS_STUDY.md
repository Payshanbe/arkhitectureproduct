# Three.js Architectural Study — Home Hero

Date: 2026-07-12
Scope: new `features/three` feature; home hero visual replaced. No CMS, routing, or token changes.
Direction reference: `docs/04_VISUAL_DIRECTION.md`, `docs/12_MOTION_SYSTEM.md`, `docs/VISUAL_DIRECTION_2_0.md` (drawing-set vernacular).

## Summary

The home hero photograph is replaced by a live WebGL "study model" — a wireframe
maquette of staggered volumes on slender columns over a drawing-sheet grid, drawn in
the ink of the token palette on the warm background. The hero therefore flips from a
dark photographic chapter to a light drawing-set chapter.

The scene is intentionally not a shader spectacle: one ink color, transparent canvas,
motion that is slow, deliberate, and camera-like per the motion system — idle rotation,
additional rotation scrubbed by scroll, subtle pointer drift.

## New files

- `features/three/study-config.ts` — every visual decision (colors, camera framing,
  motion speeds, maquette geometry) in editable configs. `studyConfig` is the base
  ("plate") framing; `heroStudyConfig` frames the maquette right of center so the
  headline block keeps clear air, with calmer rotation.
- `features/three/ArchitecturalStudy.tsx` — the Three.js scene with a
  `variant: "plate" | "hero"` prop. Rendering pauses offscreen (IntersectionObserver),
  resizes via ResizeObserver, disposes geometry/materials/renderer on unmount.
- `features/three/ArchitecturalStudyLazy.tsx` — `next/dynamic` client loader with
  `ssr: false`; the WebGL bundle stays out of the initial payload.
- `features/three/index.ts` — public exports.

## Changed files

- `features/home/HomeHero.tsx`:
  - `next/image` hero photograph, gradient overlay, and hardcoded `#f4f1eb` text
    colors removed; text now uses `text-foreground` / `text-foreground-secondary` /
    `text-foreground-muted`, indicator border uses `border-border`.
  - `data-hero-theme="dark"` removed — the header's IntersectionObserver finds no dark
    sentinel and correctly renders the light nav theme over the warm background.
  - The canvas wrapper keeps `data-home-hero-image-frame`, so the existing clip-path
    entrance in `HomeHeroMotion` now reveals the canvas; the absent
    `data-home-hero-image` safely skips the photo-only parallax and cursor-drift
    branches (all guarded).
- `package.json` — added `three` and `@types/three`.

## Accessibility and motion

- `prefers-reduced-motion`: one static frame at the resting angle; no animation loop.
- Canvas container is `aria-hidden`; the heading carries the textual meaning.

## Reuse

`<ArchitecturalStudyLazy variant="plate" />` fills its parent — give the wrapper a
height to place it as a bordered figure elsewhere (Studio page, 404). One placement
per page is intentional — the study is a signature, not a texture.

## Verification

- `npm run typecheck` — clean.
- `npx eslint features/three features/home/HomeHero.tsx` — clean.
- Browser QA across breakpoints was not performed in this environment; verify the
  hero at mobile widths (maquette sits behind the headline there) per
  `docs/AWARD_POLISH_AUDIT.md` before release.

---

# Addendum — Selected Work Marginalia

Date: 2026-07-12
Scope: `features/home/HomeSelectedProjects.tsx`, `features/home/HomeSelectedProjectsMotion.tsx`.

The counter-column of each asymmetric plate previously stayed empty on every row,
reading as an unfinished grid rather than a monograph margin. Each plate pattern now
declares an `aside` placement, filled with quiet marginalia: a location line
(city/country with legacy-location fallback) and the project excerpt
(excerpt → tagline → shortDescription fallback), capped at 34ch, under the same
`border-border/60` hairline as the caption bar.

Marginalia are hidden below `lg` (no empty margin exists there) and sticky within the
plate row (offset below the fixed header), so the note travels alongside tall plates
instead of leaving the upper margin dead. The `sectionReveal` transform is applied to
the inner block only — a residual transform on the sticky wrapper would become its
containing block and break `position: sticky`. Placeholder projects
received editorial excerpt/location copy so the layout reads correctly before real CMS
content lands.
