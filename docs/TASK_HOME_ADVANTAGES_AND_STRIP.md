# Task: Two New Home Page Blocks — "Why Arkhitecture" + Horizontal Image Strip

Status: Ready for implementation (Claude Code / Codex)
Reference analyzed: bloom3d.studio home page (`section_advantages` "Why work with us?" and the
masked services carousel). **Do not copy the reference.** Adapt the two underlying ideas to our
monograph design language (`docs/VISUAL_DIRECTION_2_0.md`). Everything must be built from the
existing token system — no new colors, no new radii, no shadows.

---

## Reference analysis (what makes the originals work)

### Bloom's "Why work with us?" (`section_advantages`)
- Two-column split: large section heading left, vertical list right.
- Four rows, each: oversized numeral (`01`) + short bold claim (h3) + one calm paragraph + hairline divider.
- Rows reveal on scroll one at a time; borders animate; the numeral has a hover fill (`advantage_num_bg`).
- Why it feels premium: one idea per row,大 numerals give rhythm, hairlines instead of cards,
  generous row padding, no icons, no buttons.

### Bloom's home carousel (`carousel_wrapper` → `carousel_mask` → `ul.carousel > li.carousel_card`)
- A masked horizontal strip of large image cards that overflows the viewport; GSAP-driven movement.
- Cards carry an image, a title, and an underline CTA that slides up on hover (`translate3d(0,100%,0) → 0`).
- Why it feels premium: the strip implies "there is more beyond the edge", images are large,
  chrome is minimal.

Both patterns are compatible with our language *if* we strip the marketing energy: no auto-play,
no overlay gradients on cards, no counters, calm copy.

---

## Block 1 — "Why Arkhitecture" (feature: `features/home/HomeApproach.tsx` + `HomeApproachMotion.tsx`)

**Placement:** home page, between `HomeFeaturedProject` and `HomeContactExperience`
(rhythm: work → studio voice → featured plate → why-us → contact). Register in
`app/(site)/page.tsx`.

**Composition (desktop, 12-col `Container` grid):**
- Left, `lg:col-span-4`, `lg:sticky lg:top-32 self-start`: label `Why Arkhitecture`
  (`type-label text-foreground-muted` + hairline flex pattern used by other home sections),
  below it one `type-statement` line: e.g. "A studio built for work that is meant to last."
- Right, `lg:col-span-7 lg:col-start-6`: four rows in a `<ul>`. Each `<li>`:
  - `border-t border-border pt-6 pb-10` (last row also gets `border-b`),
  - grid `grid-cols-[4ch_1fr] gap-6 lg:grid-cols-[6ch_1fr] lg:gap-10`,
  - numeral: `font-display text-[length:var(--font-size-statement)] leading-none text-foreground-muted`,
  - content: heading `type-project-title text-foreground` + paragraph
    `mt-4 max-w-[480px] text-pretty type-body text-foreground-secondary`.
- Mobile: single column, sticky off, numerals at `--font-size-project-title`.
- Section: `bg-background-secondary`, `py-[var(--section-spacing-large)]` — it sits between two
  `bg-background` sections and marks a chapter shift.

**Copy (studio voice — calm claims, no selling; final wording may be edited by the owner):**
1. **Architecture and interiors as one practice.** Building, interior, and furniture decisions are
   made by the same hands, so nothing is delegated into inconsistency.
2. **Restraint as method.** A reduced palette lets proportion, light, and material carry the
   atmosphere — the work stays quiet years after the trends move on.
3. **A close reading of place.** Climate, orientation, and daily ritual shape every plan before
   any form does.
4. **One team from first sketch to photography.** The people who draw the project follow it to the
   built, furnished, documented end.

Numerals are acceptable here (the site's committed hairline-numeral grammar), but they must match
the Studio principles list styling family.

**Motion (`HomeApproachMotion.tsx`, same pattern as other Home motion wrappers):**
- Heading column: `sectionReveal` (`y: 16`, start `top 82%`).
- Rows: one `sectionReveal` per `<li>` with `delay: index * 0.08`, `y: 20`, start `top 84%`,
  via `data-approach-reveal` attributes. No border animation, no numeral hover fill — quiet.
- Reduced motion: handled by the primitives (already built in).

**Do not:** add icons, counters ("0+ Projects"), accordions, hover fills, or CTA buttons in rows.

---

## Block 2 — Horizontal image strip ("Atmosphere") (feature: `features/home/HomeAtmosphereStrip.tsx` + `HomeAtmosphereStripMotion.tsx`)

An adaptation of Bloom's masked carousel into a **drag/scroll film strip of photography** — not a
services carousel, not auto-playing. It gives the home page one horizontal moment between vertical
chapters.

**Placement:** between `HomeSelectedProjects` and `HomeStudioIntro`.

**Data:** server component; query Payload `projects` (published, depth 2, limit 8, sort `order`)
and collect gallery/cover images (reuse the `isMedia`/`normalizeImageUrl` helpers pattern from
`HomeSelectedProjects.tsx`). Fall back to the existing placeholder list when CMS is empty. Each
item: `src`, `alt`, `caption` (project title · location), `href` (project page).

**Composition:**
- Section `bg-background`, `py-[clamp(var(--space-20),8vw,var(--space-30))]`.
- Header row inside `Container`: label `Atmosphere` + hairline (existing home pattern); right side
  optional `type-label` hint `Drag` (desktop only, `hidden lg:block`, muted 65%).
- The strip itself is **full-bleed** (outside `Container`): a horizontally scrollable row:
  - `display: flex; gap: var(--grid-gap); overflow-x: auto;` with
    `scroll-snap-type: x proximity;` and `padding-inline: var(--container-padding)`,
    `scrollbar-width: none` (+ `::-webkit-scrollbar { display: none }` utility).
  - Items: alternating heights for editorial rhythm — pattern of widths/aspects:
    `[3/2 @ 44vw]`, `[4/5 @ 26vw]`, `[3/2 @ 38vw]`, `[4/5 @ 30vw]` (desktop; on mobile all
    `78vw` at `4/5`/`3/2` alternating). Each item `scroll-snap-align: start`,
    `editorial-image-frame relative overflow-hidden bg-surface`, image `image-editorial
    object-cover`, proper `sizes`.
  - Caption under each image: `mt-3 type-caption text-foreground-muted` — `Title · Location`.
    Whole item is a `<Link>` to the project with the `plate-link` underline on the title portion.
- **Interaction:** native scroll + snap is the baseline (works with trackpads, touch, keyboard
  Tab + arrow keys when items are links). Desktop enhancement in the Motion wrapper: pointer drag
  to scroll (pointerdown → track `scrollLeft`, momentum optional) and a 1px progress hairline
  under the strip (`Container`, `bg-border` track + `bg-[var(--color-text-secondary)]` fill,
  width driven by scroll progress via rAF — no GSAP needed; keep it under ~40 lines).
- **Motion:** on first reveal, the strip's items get a single staggered `sectionReveal`
  (`delay: index * 0.06`, `y: 20`, once). No auto-scroll, no marquee, no parallax inside items.
- **Reduced motion:** skip drag inertia and reveal animation (primitives handle reveal; guard the
  drag enhancement with `useReducedMotion`).
- **A11y:** the scroller gets `role="region"` + `aria-label="Project atmosphere gallery"` and
  `tabIndex={0}` so keyboard users can scroll it; images keep meaningful alt text from CMS.

**Do not:** clone slides for an infinite loop, auto-play, add arrows/dots, overlay gradients on
images, or use `cursor: none` custom cursors.

---

## Shared requirements

- TypeScript strict; server components for data, `"use client"` only in `*Motion.tsx` and any
  drag logic (follow the existing feature file pattern).
- All spacing/type/colors from `styles/tokens.css` + `styles/typography.css` utilities — verify
  every `var(--space-*)` you use actually exists in the scale (4/8/12/16/24/32/48/64/80/96/120/160/200).
- Verify in browser at 390 / 768 / 1024 / 1440: no horizontal page overflow from the strip
  (`overflow-x` must be contained by the scroller, not the body); title-block hairlines align
  with the global grid; contrast of captions ≥ 4.5:1.
- `npx tsc --noEmit` clean; check the running dev server at http://localhost:3000 (do NOT restart
  or kill it — it hot-reloads).
- Update `docs/changelog/` with a short entry when done.

## Acceptance criteria

1. Home flow reads: hero → selected projects → atmosphere strip → studio intro → featured plate →
   why-Arkhitecture → contact → colophon.
2. Both blocks are indistinguishable in voice from the rest of the site (same labels, hairlines,
   type roles, hover grammar).
3. Strip scrolls natively on touch/trackpad, drags with the pointer on desktop, snaps gently, and
   never hijacks vertical page scroll.
4. Reduced-motion users get static, fully readable versions of both blocks.
5. No new dependencies.
