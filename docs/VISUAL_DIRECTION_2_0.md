# Visual Direction 2.0 — Award-Level Art Direction

Status: Approved direction for implementation
Scope: Visual interface only. No feature changes, no CMS changes, no new pages.
Stack: Next.js App Router + Tailwind v4 + GSAP/ScrollTrigger + Lenis (existing).

This document supersedes nothing — it refines `04_VISUAL_DIRECTION.md` and is the
single execution reference for the interface polish pass. Every spec below maps to
existing files and tokens.

---

## 0. The Big Idea — "The Monograph and the Drawing Set"

The site already has its signature: the **Signature Experience** process drawing.
Direction 2.0 extends that drawing language into the interface itself:

- Pages read like **plates in an architecture monograph** — one dominant image or
  statement per viewport, generous paper margins, quiet captions.
- Metadata is set like the **title block of an architectural sheet** — a recurring
  hairline strip carrying project no. / category / location / year. This "title
  block" becomes the site's structural signature, replacing scattered metadata.
- The only dark moments are **cinematic bookends**: photography heroes with warm
  charcoal scrims and warm-white type. Everything between them is paper.

One aesthetic risk, spent deliberately: heroes switch to **light type on dark-scrimmed
photography** (currently dark type over a white gradient wash). This is the single
biggest lever for a cinematic first impression, and it makes the floating navigation
legible over images for free.

Everything else gets quieter, not louder.

---

## 1. Global Navigation

Keep the floating blur bar — refine it until it reads as architecture, not SaaS.

### Problems today
- `border-radius: 18px` is off-token (max token is `--radius-md: 8px`) and is the
  strongest "template" signal on the site.
- Two stacked drop shadows + `saturate(112%)` push it toward glassmorphism.
- One light-glass style is used over both paper and photography, so contrast over
  images relies on text-shadow hacks (`.header-contrast-text`).

### Spec
- **Shape**: radius `4px` (`--radius-sm`). One hairline border, zero drop shadow.
- **Glass, restrained**: `backdrop-filter: blur(12px)` only — remove `saturate()`.
  Background `rgb(244 241 235 / 0.55)` at top, `0.85` after scroll. The scrolled
  state adds border opacity, not shadow.
- **Two context themes**, switched by a `data-nav-theme="dark|light"` attribute:
  - `light` (paper pages): as above, text `rgb(31 29 26 / 0.82)`.
  - `dark` (over photography heroes): background `rgb(31 29 26 / 0.32)`,
    border `rgb(244 241 235 / 0.18)`, text `#f4f1eb` at 88% opacity. No text-shadow.
- **Spacing**: inner padding `px-7 py-3.5` (desktop), nav item gap `gap-12`,
  wordmark tracking `0.32em` (match the footer wordmark).
- **Hover**: underline grows left→right, `360ms var(--ease-out)`, color to full
  opacity. Remove the simultaneous opacity-dim — one change per hover.
- **Active**: static 1px underline at 45% opacity, `text-underline-offset: 6px`
  equivalent (keep the background-size technique for consistency). No accent color.

### Implementation notes
- `styles/utilities.css`: rework `.premium-header-shell`, `.premium-menu-*` — rename
  the family to `.nav-shell`, `.nav-panel`, `.nav-link` (the `premium-` prefix is
  self-defeating). Add `.nav-shell[data-nav-theme="dark"]` variants.
- `components/layout/Header.tsx`: read hero context from a `data-nav-theme`
  attribute set on `<main>` by pages with image heroes (Home, Project Detail).
  Switch to `light` once `scrollY` passes the hero (one `IntersectionObserver`
  on a sentinel div at hero end — cheaper than scroll math).
- Delete `.header-gradient-scrim` and `.header-contrast-text` once the dark theme
  variant lands.
- `FullscreenMenu`: keep the type-display nav list (it's good). Simplify
  `.premium-menu-panel` to a flat `rgb(244 241 235 / 0.97)` + `blur(12px)` —
  remove the radial gradient. The menu topbar follows the same 4px/hairline spec.

---

## 2. Typography

### Roles and scale (replaces current values in `styles/typography.css`)

Calmer, tighter, more editorial. Display sizes come down; labels get smaller and
wider-tracked; hierarchy is carried by fewer, more distinct steps.

| Role            | Token                        | Size                                | LH   | Tracking | Face |
|-----------------|------------------------------|-------------------------------------|------|----------|------|
| Hero / Display  | `--font-size-display`        | `clamp(2.75rem, 4.8vw, 5.5rem)`     | 1.02 | -0.02em  | serif |
| Statement       | `--font-size-statement`      | `clamp(1.625rem, 2.4vw, 2.5rem)`    | 1.2  | -0.015em | serif |
| Section Heading | `--font-size-section-heading`| `clamp(1.375rem, 1.9vw, 2rem)`      | 1.15 | -0.01em  | serif |
| Project Title   | `--font-size-project-title`  | `clamp(1.25rem, 1.5vw, 1.75rem)`    | 1.1  | -0.01em  | serif |
| Body Large      | `--font-size-body-large`     | `clamp(1.0625rem, 1.15vw, 1.1875rem)`| 1.6 | 0        | sans |
| Body            | `--font-size-body`           | keep current                        | 1.65 | 0        | sans |
| Caption         | `--font-size-caption`        | keep current                        | 1.35 | 0.01em   | sans |
| Label           | `--font-size-label`          | `clamp(0.65rem, 0.62rem + 0.1vw, 0.71875rem)` | 1.2 | **0.16em**, uppercase | sans |

Key changes:
- **`--font-size-hero` is retired** — hero and display unify into one Display role
  (fewer roles, clearer system). Home hero uses Display.
- **Section headings drop from 3rem max to 2rem max.** Long headline-sentences in
  section headings ("A quiet sequence of spaces shaped by…") move to the Statement
  role or get shortened. Section headings become short noun phrases.
- **Statement becomes its own size** (currently aliased to section-heading, which
  flattened the hierarchy). `EditorialStatement` uses it.
- **Project Detail "Statement" paragraphs** stop being set at section-heading size:
  first paragraph = Statement role, following paragraphs = Body Large. Giant
  multi-paragraph 3rem text blocks are the main "oversized" offender.

### Display face
- **Immediate (no licensing)**: keep Cormorant Garamond but set all display roles at
  **weight 500** (400 goes spindly above ~3rem), tracking as per table. This is a
  one-line change in `app/(site)/layout.tsx` (`weight: ["500"]`) + utility classes.
- **Upgrade path (decision for the owner, not Codex)**: a serif with more shoulder
  weight — Canela, Tiempos Headline, GT Sectra Display (commercial), or
  Literata / Source Serif 4 (free, Cyrillic-complete) if staying on Google Fonts.
  The system must keep full Cyrillic support (`07_TYPOGRAPHY.md` requirement).
- Body/UI stays **Inter** — it's correctly invisible.

### Implementation notes
- All values live in `styles/typography.css` — update variables, then audit the few
  hard-coded `text-[length:clamp(...)]` arbitrary values in
  `HomeSelectedProjects.tsx` (index numerals, arrows) to derive from tokens.
- Add `.type-statement` utility in `utilities.css`; point `EditorialStatement.tsx`
  at it instead of `type-section-heading`.

---

## 3. Home Page

### 3.1 Hero (`features/home/HomeHero.tsx`)
Current: full-bleed image + 62%-wide white gradient wash + dark text, "↓ Scroll".

Spec — **cinematic plate**:
- Full-bleed image, no left wash. One scrim only:
  `linear-gradient(180deg, transparent 46%, rgb(26 24 21 / 0.44) 100%)`.
- Type in warm white `#f4f1eb`: label (Label role, 78% opacity) + headline
  (Display role, max-width ~640px) bottom-left. Supporting sentence: Body,
  `rgb(244 241 235 / 0.78)`, max-width 360px.
- **Title-block strip** at the very bottom: hairline top border
  `rgb(244 241 235 / 0.28)`, one row, Label size:
  `Arkhitecture — Architecture Studio` (left) · `Tashkent, UZ 41.3°N 69.2°E` (center,
  optional) · thin 24px vertical rule (right) as the only scroll cue.
  Delete the "↓ Scroll" arrow + word.
- Header runs `data-nav-theme="dark"` over this hero.

Motion: image clip-reveal 1.4s → label at 0.4s → headline lines stagger 0.08 →
title-block fades last. Existing `HomeHeroMotion` sequencing is right; only retune
delays to end ~0.2s sooner overall.

### 3.2 Selected Projects (`HomeSelectedProjects.tsx`)
Current: index rows with `aspect-[16/5]` letterbox strips — photography gets a sliver.

Spec — **alternating plates with title blocks**:
- 4 projects, each a large image + title-block strip:
  - 01: image `lg:col-span-8 lg:col-start-1`, `aspect-[3/2]`
  - 02: image `lg:col-span-6 lg:col-start-7`, `aspect-[4/5]`
  - 03: image `lg:col-span-7 lg:col-start-3`, `aspect-[16/10]`
  - 04: image `lg:col-span-6 lg:col-start-1`, `aspect-[3/2]`
- Under each image, a hairline title block: index + title (Project Title role) left;
  category · year (Label role, muted) right. Whole plate is one link.
- Vertical rhythm between plates: `clamp(var(--space-24), 12vw, var(--space-40))`.
- Section heading shortens to "Selected Work" (Label) + a short Statement — the
  current 3rem headline-sentence moves down to Statement size.
- Hover: image `scale(1.02)` over 1.2s + title underline grow. Nothing else.
- After 04: "View the archive →" underline link, right-aligned on a hairline.

### 3.3 Studio Intro (`HomeStudioIntro.tsx`)
Keep the layout (it's good). Statement drops to the new Statement size. Remove the
`lg:pt-20` on the Learn More column — align it to the statement baseline instead.

### 3.4 Featured Project (`HomeFeaturedProject.tsx`)
Current: letterboxed `aspect-[16/6]` image inside the grid.

Spec — **the cinematic band**:
- Image goes **full-bleed viewport-wide** (`Container width="bleed"`),
  `aspect-[21/9]`, `lg:min-h-[70svh]`, with subtle parallax (±6%, existing
  `parallax()` util).
- Caption grid below, inside the container: label col 1–3; title (Project Title) +
  excerpt (Body) col 4–8; title-block meta (category/location/year, Label) col 10–12.
- This is the only parallax moment on the home page.

### 3.5 Contact + Footer finish (`HomeContactExperience.tsx`, `Footer.tsx`)
Spec — **final chapter + colophon**:
- Contact section: Statement (existing copy is good) + the email address set large —
  `studio@arkhitecture.com` as a serif Project-Title-size mailto with underline-grow
  hover. Phone/location shrink to one Label-size line beneath. Drop the bordered
  right column.
- Footer collapses to a **one-row colophon** under a single hairline:
  wordmark (left) · page links inline (center) · Instagram/LinkedIn/Behance ·
  `© 2026` (right). All Label size, muted. On mobile it wraps to 2–3 rows.
- Result: the page ends with typography and silence, not a link warehouse.

---

## 4. Work Page (`features/work/WorkArchive.tsx`)

The rotating layout patterns are right — polish the rhythm and the metadata.

- **Page header**: Display drops to new scale; intro paragraph Body Large,
  col-start-5. Add total count as Label: "12 Projects — 2019–2026".
- **Entry sequence**: first entry always the widest pattern (`21/10`, col 2–12) to
  open the archive cinematically; then rotate the existing patterns. Add a fifth
  pattern — **two portraits side by side** (`aspect-[4/5]`, col 2–6 and col 8–12,
  two consecutive projects consumed) every ~5 entries.
- **Metadata**: keep the margin column on desktop but set it in Caption size (not
  Label) with an index numeral `01` in serif. Add the same title-block hairline
  under each image on mobile (already close to this).
- **Titles**: Project Title role (smaller than today), sitting on the title-block
  hairline with category/year right-aligned — one row, complete information.
- **Spacing**: between entries `clamp(var(--space-30), 14vw, 280px)` — slightly more
  air than today, and it should *vary*: after a two-portrait pair, use the smaller
  end. Constant spacing is what makes long archives feel mechanical.
- Hover: image scale 1.02/1.2s; title underline; drop the color-change-to-accent.

---

## 5. Project Detail Page (`features/work/ProjectDetail.tsx`)

Strongest page today. Direction: make it read as a **book chapter**.

### 5.1 Hero — "cover plate" (replaces scrimmed image hero)
- **Open on paper, not photo**: label (category) → Display title → title-block
  hairline row (`Location · Year · Status · Area`, Label size) — all on
  `bg-background`, col 2–11.
- Then the cover image **full-bleed below**, `min-h-[90svh]`, clip-reveal on load.
- This removes both gradient scrims, differentiates the detail hero from the home
  hero, and starts every case study like a chapter title page.
- Header uses `data-nav-theme="light"` here (paper first), flipping to dark only
  while over the image if desired — simplest is to keep light throughout.

### 5.2 Details band
- Merge the current 4-column `DetailItem` grid into the **statement section**: a
  sticky margin column (col 2–4, `lg:sticky lg:top-32`) with a hairline table —
  Services / Area / Architect / Status as label:value rows. Statement text sits
  col 5–11.

### 5.3 Statement
- First paragraph Statement role; remaining paragraphs Body Large. Keeps the
  editorial voice without paragraph-walls at 3rem.

### 5.4 Gallery
- Keep the 4-pattern rotation. Add the two-portrait pair as pattern 5.
- Captions: Caption size, muted, max-width 360px, aligned to the image's left edge
  (already done) — plus a quiet index `04` in serif before the caption text.
- Spacing between figures: `clamp(var(--space-24), 10vw, var(--space-40))` — a notch
  tighter than the archive so the gallery feels continuous.

### 5.5 Next Project
- Full-width closing band, `bg-background-secondary`, generous
  (`--section-spacing-large`): label "Next Project" → **Display-size serif title** →
  small preview image (`aspect-[3/2]`, col 9–12) that clip-reveals on hover
  (desktop) or sits static (touch). The entire band is one link with an arrow that
  translates 8px on hover. This is the page's handshake to the next chapter — it
  deserves display scale.

---

## 6. Studio Page (`features/studio/StudioPage.tsx`)

### 6.1 Philosophy
- First paragraph at Statement size, remaining at Body Large (same first-paragraph
  device as project statements — a consistent editorial voice sitewide).
- Add **one photograph** (atelier / model / material still) col 7–12, `aspect-[4/5]`,
  offset below the text — the page currently has zero imagery before the drawing.

### 6.2 Signature Experience — the brand moment
- Add a **chapter divider** before the pinned section: Label "The Process" +
  one Statement line ("Six layers, from first trace to atmosphere.") with
  `--section-spacing-large` around it. The experience deserves an announcement.
- The drawing canvas (`SignatureExperienceSection.tsx`): remove the `border` box —
  let the SVG **bleed to the right viewport edge** (negative right margin to escape
  the container). A framed box makes it an illustration; bleeding makes it a space.
- Scene copy column: scene index (`01`) set in serif Statement size rather than
  Label; progress indicators lengthen to `w-12` and gain a subtle draw transition.
- Keep engine, scenes, durations, fallbacks exactly as they are.

### 6.3 Principles + Information
- Principles: keep hairline list; numerals move to serif italic Caption. Since
  principles aren't a sequence, the numerals are monograph styling, not wayfinding —
  keep them quiet.
- Break the strict background zebra: Philosophy and Signature share
  `bg-background-secondary`; Principles + Information both on `bg-background`;
  closing Contact on `bg-background-secondary`. Backgrounds change at *chapter*
  boundaries, not every section.

---

## 7. Contact Page (`features/contact/ContactPage.tsx`)

Direction — **the final editorial chapter**, email-first.

- **01 Opening**: current Display statement stays (new scale).
- **02 Write to us**: the email address becomes the primary act —
  `studio@arkhitecture.com` set in serif at Statement size, underline-grow hover,
  col 4–11. Below it, one Body line: "We reply within a few working days."
- **03 The form, minimal**: Name / Email / Message only, single column,
  max-width `--text-width`, underlined fields (keep current field style — it's good).
  **Remove Project Type / Budget / Timeline selects** — they read lead-gen, not
  studio. (If the CMS later needs qualification data, ask in the reply email.)
  Submit: "Send inquiry →" underline style. Until submission is wired, the form
  should not render a dead button — hide the form behind the email, or wire a
  `mailto:` fallback on submit.
- **04 Studio information**: one title-block hairline row — Email · City · Country,
  Label size, three columns.
- **05 Closing**: keep the closing statement (Statement size) + colophon footer.
- Background: paper throughout except one `bg-background-secondary` band for the
  form chapter. No zebra.

---

## 8. Motion Direction

One system, enforced everywhere. The primitives in `animations/` are correct —
this is calibration, not rework.

### Rules
- **Eases**: `power2.out` default, `power3.out` for hero/display moments only.
  Banned: `back`, `elastic`, `bounce`, any overshoot.
- **Durations**: text 0.9–1.2s; images (clip reveals) 1.1–1.6s; micro-interactions
  (hover, underline) 0.28–0.4s.
- **Travel**: reveals `y: 16–24px` max. Text `yPercent` ≤ 56 (hero only).
- **Stagger**: 0.06–0.09 for lines; one orchestrated sequence per viewport — never
  two elements animating independently side by side.
- **Parallax**: ±6% max (`parallax({ fromYPercent: 6, toYPercent: -6 })`), in exactly
  two places sitewide: home featured band, project detail cover image.
- **Hover**: image `scale ≤ 1.02` at 1.2s; underline grow 360ms; arrow translate 8px.
  Nothing else moves on hover.
- **ScrollTrigger reveals**: `start: "top 78%"`, `once: true` for content reveals.
  Scrub only in the Signature Experience (`0.95` stays).
- **Reduced motion**: existing discipline stays mandatory — every new tween needs
  the `prefersReducedMotion` set-to-final-state path.

### Sequenced page-enter (per hero)
1. Image clip `inset(0 0 100% 0) → 0` 1.4s
2. Label +0.4s
3. Headline lines +0.5s, stagger 0.08
4. Supporting / title-block +0.85s

---

## 9. Component & Surface Polish (sitewide sweep)

- **Radius audit**: only `0` and `4px` may appear. Kill every `rounded-[18px]`.
- **Shadow audit**: zero drop shadows sitewide. Depth comes from hairlines and blur.
- **Hairlines**: unify on `--color-border-primary` at 45%/60% — audit arbitrary
  border opacities.
- **Accent usage**: hover states use underline + full-opacity text, not accent color
  swaps. Accent survives only in `::selection`, focus outlines, and active nav.
- **Image grade**: keep `.image-editorial` desaturation — it's part of the identity.
  Keep `.editorial-image-frame` multiply overlay.
- **Buttons/links**: one interactive grammar sitewide — uppercase Label +
  underline-grow (already ~80% consistent; sweep the stragglers in `SystemPage`,
  `error.tsx`, menus).
- **Naming**: `premium-*` classes → `nav-*` (see §1).
- **Focus**: keep the 1px outline + 4px offset; verify it survives on dark hero
  (`outline-color` needs the warm-white variant under `data-nav-theme="dark"`).

---

## 10. Rollout Order (for Codex)

Each step is independently shippable; verify in browser at 390 / 768 / 1024 / 1440 / 1728 before moving on.

1. **Typography tokens** (§2) — smallest diff, touches everything, do first.
2. **Navigation refinement** (§1) — shell restyle + dark theme variant.
3. **Home hero** (§3.1) — dark scrim + light type + title block.
4. **Selected Projects + Featured band** (§3.2, §3.4).
5. **Contact chapter + colophon footer** (§3.5, §7).
6. **Project detail cover plate + next-project band** (§5).
7. **Work archive rhythm** (§4).
8. **Studio chapter pass + Signature bleed** (§6).
9. **Motion calibration + polish sweep** (§8, §9).

Out of scope for this pass: real photography (tracked in
`docs/AWARD_POLISH_AUDIT.md` — remains the #1 blocker for awards submission),
form submission wiring, CMS-driven hero content, display-font licensing decision.
