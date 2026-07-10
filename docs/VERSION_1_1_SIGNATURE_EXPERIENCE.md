# Version 1.1 - Signature Scroll Experience Specification

## Purpose

Version 1.1 introduces a signature scroll-based process experience on the Studio page.

This section must not behave like a decorative animation. It should explain how the studio thinks and works through a calm architectural visual story.

Location:

```txt
Studio page -> Process section
```

Process sequence:

```txt
Research
Context
Structure
Material
Light
Atmosphere
```

The experience should feel like moving through the design process of a space: from inquiry, to site logic, to form, to material, to light, to atmosphere.

---

## Experience Principles

- The section is content, not spectacle.
- Motion should support comprehension.
- Visual states should evolve slowly and deliberately.
- The interface should remain quiet.
- The sequence should feel architectural, not technological.
- Mobile should be intentionally simplified, not broken-down desktop.
- Reduced motion should preserve all information without scroll-driven animation.

---

## Technical Approaches

## Approach 01 - Image Sequence

### Description

A scroll-driven image sequence uses a series of rendered frames. As the visitor scrolls, the image changes frame by frame to show a spatial idea forming over time.

Possible visual:

```txt
blank atmospheric field
-> research notes / site trace
-> contextual grid
-> structural volume
-> material surface
-> light entering the space
-> final calm interior atmosphere
```

### Visual Quality

High if the frames are art-directed carefully.

This can feel cinematic and premium because every frame is authored. It is a strong fit for architecture if the visual language is restrained, photographic, or render-like.

### Performance Impact

Medium to high.

The browser must load many images. Even compressed frames can become expensive on mobile. Performance depends on:

- frame count;
- image dimensions;
- image format;
- preloading strategy;
- canvas implementation;
- whether frames are loaded progressively.

Recommended limits:

```txt
Desktop frames: 80-120
Tablet frames: 48-72
Mobile frames: avoid full sequence; use keyframes only
Desktop frame size: 1600px wide maximum
Mobile fallback image size: 900px wide maximum
Format: AVIF or WebP, PNG only if transparency is required
```

### Implementation Complexity

Medium.

The logic is straightforward compared to Three.js, but quality depends heavily on asset preparation and loading discipline.

Technical requirements:

- canvas renderer or optimized image swapper;
- GSAP ScrollTrigger timeline;
- frame preloader;
- current-frame state derived from scroll progress;
- reduced motion fallback;
- responsive asset selection.

### Mobile Behavior

Use a simplified non-pinned vertical story.

Recommended mobile fallback:

- show 3-6 key images instead of a full sequence;
- pair each image with one process step;
- use simple image reveal and text reveal;
- no pinned canvas;
- no scroll-scrubbed frame animation.

### CMS Impact

Low to medium.

Version 1.1 can ship with static curated assets because this is a studio signature section. CMS support can come later if the studio wants to change process content.

Future CMS fields could include:

- process step title;
- process step description;
- keyframe image;
- image alt text;
- sequence asset prefix;
- reduced-motion fallback image.

### Pros

- Strong cinematic quality.
- Predictable visual output.
- Easier to art direct than realtime 3D.
- No new rendering dependency required.
- Good fit for a signature studio narrative.

### Cons

- Asset-heavy.
- Requires careful preloading.
- Can feel flat if frames are not beautifully produced.
- Mobile full-sequence version is risky.
- Updating visuals requires regenerating frames.

---

## Approach 02 - SVG / Layered Illustration

### Description

A scroll-driven layered SVG or HTML/SVG composition reveals process elements over time. Layers can include site lines, grids, plan fragments, structural outlines, material textures, light washes, and atmospheric overlays.

Possible visual:

```txt
site trace lines
-> contextual boundary
-> plan grid
-> structural frame
-> material planes
-> light gradient
-> final atmospheric composition
```

### Visual Quality

Medium to high.

This can be elegant and highly editorial if treated like an architectural drawing. It will feel less cinematic than an image sequence, but more precise and conceptual.

The risk is that it can become too diagrammatic or software-like if overdrawn.

### Performance Impact

Low to medium.

SVG layers are lightweight when kept simple. Performance can degrade if the SVG includes:

- large filters;
- complex masks;
- many animated paths;
- blur-heavy effects;
- large embedded raster images.

Recommended limits:

```txt
SVG paths: simple and intentional
Animated layers: 8-16
Filters: avoid or keep minimal
Textures: external WebP/AVIF overlays, not embedded base64
Animation properties: opacity, transform, clip-path where safe
```

### Implementation Complexity

Medium.

The motion architecture is manageable with GSAP timelines. The hard part is visual design: the illustration must feel architectural and premium, not like an onboarding graphic.

Technical requirements:

- authored SVG or layered DOM composition;
- scoped client component for the process section;
- ScrollTrigger timeline;
- reduced motion state rendering;
- accessible text outside the visual layers.

### Mobile Behavior

Good.

SVG scales naturally, but the desktop composition should not simply shrink. Mobile should use:

- vertical step-by-step process;
- one simplified visual state per step;
- static or lightly revealed layers;
- no pinned section if scroll height feels cramped.

### CMS Impact

Low.

The visual system can remain code/assets-driven. CMS can manage the text steps later, but should not be required for Version 1.1.

Future CMS fields could include:

- step title;
- step description;
- optional caption;
- optional key visual alt text.

### Pros

- Strong conceptual fit for architecture.
- Good performance profile.
- Easier mobile fallback than image sequence or 3D.
- No heavy dependency required.
- Maintains editorial restraint.
- Easier to adjust timing and states.

### Cons

- Less cinematic than an authored render sequence.
- Requires excellent art direction to avoid generic diagram feeling.
- Advanced SVG masking can become brittle across browsers.
- May not feel like a true signature moment if too minimal.

---

## Approach 03 - Three.js / React Three Fiber Model

### Description

A realtime 3D scene evolves as the visitor scrolls. The process could be represented by a simple architectural massing model: site plane, contextual boundaries, structural frame, material planes, light direction, and final atmosphere.

Possible visual:

```txt
site plane
-> context edges rise
-> structure assembles
-> material planes settle
-> light direction shifts
-> atmospheric finish appears
```

### Visual Quality

Very high if executed carefully.

This can become the most distinctive option. It can feel spatial, immersive, and deeply architectural. It also carries the highest risk of feeling like a tech demo if the model, camera, lighting, and pacing are not restrained.

### Performance Impact

High.

Realtime 3D adds:

- WebGL renderer cost;
- model loading cost;
- material/shader cost;
- animation loop cost;
- mobile GPU risk;
- hydration and bundle weight.

Recommended constraints:

```txt
Geometry: simple low-poly architectural massing
Textures: minimal or none
Lighting: baked or simple
Postprocessing: avoid for Version 1.1
Frame loop: demand-based where possible
Mobile: static fallback preferred
```

### Implementation Complexity

High.

This requires additional architecture:

- Three.js or React Three Fiber setup;
- canvas lifecycle management;
- responsive scene sizing;
- scroll timeline integration;
- reduced motion fallback;
- asset pipeline for model files;
- WebGL support checks;
- performance profiling.

### Mobile Behavior

Risky.

Mobile should not receive the full 3D experience by default. Recommended mobile fallback:

- static rendered keyframes from the 3D model;
- simplified vertical process section;
- no realtime WebGL unless device capability is verified.

### CMS Impact

Low for Version 1.1, medium later.

The model should be treated as a signature brand asset, not CMS content. CMS can manage the process copy later, but not the realtime scene.

Future CMS fields could include:

- process step copy;
- fallback image;
- alt text;
- optional captions.

### Pros

- Most spatial and memorable.
- Strongest "signature" potential.
- Can uniquely express architectural thinking.
- Reusable foundation for future interactive storytelling.

### Cons

- Highest complexity.
- Highest performance risk.
- Requires new dependency and rendering architecture.
- More QA surface area.
- Easy to overbuild.
- Not ideal immediately after Version 1.0 freeze unless scoped tightly.

---

## Recommendation for Version 1.1

Recommended approach:

```txt
SVG / layered illustration as the primary implementation,
with an optional image-sequence prototype as an art-direction benchmark.
```

### Reason

The layered SVG approach best matches the current project maturity and design language.

It can be:

- architectural;
- editorial;
- lightweight;
- maintainable;
- responsive;
- accessible;
- implemented with the existing GSAP and ScrollTrigger system.

It also avoids adding Three.js or React Three Fiber before there is a proven need.

The visual should not look like a generic SVG illustration. It should be art-directed as an architectural drawing in motion:

```txt
site lines
survey marks
structural grid
quiet planes
material tone
light wash
final atmospheric stillness
```

### Why Not Image Sequence First

Image sequence is cinematic, but asset-heavy. It should be explored as a prototype if the studio wants a more filmic direction, but it is riskier for mobile and slower to revise.

### Why Not Three.js First

Three.js has the strongest signature potential, but it is too much technical surface area for the first post-1.0 interactive section. It should remain a possible Version 1.2 direction after the story, art direction, and performance budget are proven.

---

## User Experience Definition

## Section Layout

Desktop layout:

```txt
Full viewport process section

Left / upper-left:
small label
current step title
short editorial description

Right / center:
large architectural visual composition

Lower edge:
minimal progress index
```

Recommended grid:

```txt
12-column desktop grid
Text: columns 1-4
Visual: columns 5-12
Progress/index: columns 1-12 or aligned with text
```

Tablet layout:

```txt
Text above or beside visual depending on available width
Visual remains large
Pinned behavior can remain if performance is stable
```

Mobile layout:

```txt
Non-pinned vertical sequence
Each step has title, short copy, and one simplified visual state
No scrubbed timeline
No complex layer animation
```

## Pinned Behavior

Desktop:

Use a pinned section.

Reason:

The process should feel like a focused chapter. Pinning allows the visual to evolve while the visitor reads through the six process states.

Recommended behavior:

```txt
pin: true
scrub: 0.6-1.0
anticipatePin: 1
```

Avoid hard snapping. The experience should feel continuous.

Tablet:

Pin only if performance and scroll feel remain stable.

Mobile:

Do not pin.

## Scroll Length

Recommended desktop scroll length:

```txt
6 process states
80-100vh per state
Total scroll distance: 480-600vh
```

This is long enough to feel deliberate but not so long that it traps the visitor.

If the final section feels too slow, reduce to:

```txt
65-75vh per state
Total scroll distance: 390-450vh
```

## Text Placement

Text should remain readable and stable.

Recommended:

- keep text in a consistent column;
- fade or crossfade step title and description;
- avoid moving text dramatically;
- keep descriptions short;
- use one sentence per step where possible.

Step text model:

```txt
Research
We begin by reading the practical, emotional, and spatial needs behind the brief.

Context
The site, light, climate, and existing conditions define the first constraints.

Structure
Proportion and circulation give the project its quiet order.

Material
Surfaces are selected for touch, ageing, and relationship to light.

Light
Natural and artificial light shape the rhythm of the interior.

Atmosphere
The final space is measured by how calmly it supports daily life.
```

## Visual State Changes

Each state should add or transform one meaningful layer.

Recommended layered visual sequence:

```txt
Research
Subtle notes, traces, measurement marks, and loose site observations appear.

Context
Boundary lines, solar orientation, and surrounding volumes establish place.

Structure
Grid, columns, walls, or massing lines settle into order.

Material
Planes gain tone, texture, and surface weight.

Light
A soft light wash crosses the composition and clarifies depth.

Atmosphere
The visual resolves into a calm spatial composition with minimal movement.
```

Animation rules:

- animate opacity and transform primarily;
- use path drawing sparingly;
- avoid constant movement;
- avoid spinning, bouncing, or decorative particle systems;
- keep state changes slow and readable.

## Reduced Motion Fallback

If `prefers-reduced-motion` is enabled:

- disable pinned scrub animation;
- render all process steps in normal document flow;
- show static final or per-step visuals;
- keep simple opacity transitions only if acceptable;
- preserve all text content.

Reduced motion must not remove the process explanation.

---

## Asset Requirements

## Primary Recommended Asset Set

For the SVG/layered approach:

```txt
public/media/process/process-base.svg
public/media/process/process-research.svg
public/media/process/process-context.svg
public/media/process/process-structure.svg
public/media/process/process-material.svg
public/media/process/process-light.svg
public/media/process/process-atmosphere.svg
```

Alternative single-file composition:

```txt
public/media/process/process-composition.svg
```

Use grouped layers with clear IDs:

```txt
layer-research
layer-context
layer-structure
layer-material
layer-light
layer-atmosphere
```

## Texture / Raster Overlays

If material atmosphere needs subtle texture:

```txt
public/media/process/process-material-stone.webp
public/media/process/process-material-timber.webp
public/media/process/process-light-wash.webp
```

Recommended sizes:

```txt
Desktop overlay: 1600px wide maximum
Mobile overlay: 900px wide maximum
Format: WebP or AVIF
```

## Fallback Images

Required:

```txt
public/media/process/process-fallback-desktop.webp
public/media/process/process-fallback-mobile.webp
```

Recommended sizes:

```txt
Desktop fallback: 1600x1000
Mobile fallback: 900x1200
```

## Naming Rules

Use calm, explicit names:

```txt
process-research.svg
process-context.svg
process-structure.svg
process-material.svg
process-light.svg
process-atmosphere.svg
process-fallback-desktop.webp
process-fallback-mobile.webp
```

Avoid:

```txt
animation-final-new.svg
process-v2-copy.png
hero-thing.webp
```

## Alt Text

The visual is supportive, not the only source of meaning.

Recommended alt for the full visual:

```txt
Abstract architectural process drawing evolving from research lines into a calm spatial atmosphere.
```

For reduced-motion per-step visuals, each image should have step-specific alt text.

---

## Implementation Phases

## Phase 1 - Prototype

Goal:

Validate the storytelling and scroll pacing before committing to production assets.

Tasks:

- create static process copy;
- create rough layered SVG or simple DOM layers;
- test pinned ScrollTrigger behavior on desktop;
- test non-pinned mobile flow;
- validate reduced motion behavior;
- confirm scroll length.

Success criteria:

- the section explains the process without extra instruction;
- scroll does not feel trapped;
- the visual changes are meaningful, not decorative.

## Phase 2 - Desktop Version

Goal:

Build the production desktop experience.

Tasks:

- implement final layered visual assets;
- create scoped client motion component;
- use existing GSAP/ScrollTrigger setup;
- pin only the process section;
- map scroll progress to six states;
- crossfade text states;
- avoid global side effects.

Success criteria:

- smooth desktop scroll;
- stable layout;
- no layout shift;
- no duplicate ScrollTrigger instances;
- cleanup on route changes.

## Phase 3 - Mobile Fallback

Goal:

Create a first-class mobile version rather than shrinking the desktop interaction.

Tasks:

- disable pinned behavior on mobile;
- render steps in vertical flow;
- use one static or lightly revealed visual state per step;
- keep touch scrolling native and predictable;
- preserve all process text.

Success criteria:

- no scroll jank;
- no content hidden behind pinned areas;
- readable text;
- clear process sequence.

## Phase 4 - Performance Optimization

Goal:

Make the section production-safe.

Tasks:

- lazy-load non-critical visual assets;
- avoid animating layout properties;
- limit `will-change`;
- test with CPU throttling;
- test mobile memory usage;
- verify reduced motion;
- verify ScrollTrigger cleanup;
- verify Lenis sync.

Success criteria:

- desktop remains smooth;
- mobile fallback is lightweight;
- no long main-thread blocking;
- no console warnings;
- no hydration errors.

## Phase 5 - Final Polish

Goal:

Tune the section until it feels calm, premium, and inevitable.

Tasks:

- refine text timing;
- refine visual state transitions;
- adjust whitespace and scale;
- test after real Studio page content;
- verify accessibility labels;
- review on real devices;
- add changelog entry.

Success criteria:

- the section feels like a signature studio moment;
- motion is felt more than noticed;
- the process is clearer after the interaction than before it.

---

## Risks

## Performance

Risk:

Pinned scroll and animated layers can create scroll jank, especially when combined with Lenis.

Mitigation:

- keep animated layer count low;
- animate opacity and transform;
- avoid heavy filters;
- scope ScrollTrigger instances;
- disable pinned behavior on mobile;
- profile before polish.

## Mobile

Risk:

Pinned sections often feel broken on small screens and can trap the user.

Mitigation:

- use non-pinned mobile flow;
- test small phones early;
- avoid scrubbed timelines on touch devices;
- keep visuals vertical and readable.

## Accessibility

Risk:

Scroll-driven visuals can hide information from keyboard, screen reader, or reduced-motion users.

Mitigation:

- keep all process text in semantic HTML;
- do not encode essential meaning only inside the visual;
- provide reduced-motion document flow;
- ensure keyboard users can pass through the section normally;
- avoid scroll hijacking.

## SEO

Risk:

If the process content is only rendered inside client animation state, search engines and no-JS users may miss it.

Mitigation:

- render process copy server-side;
- use progressive enhancement for animation;
- keep headings and step text in HTML.

## Maintenance

Risk:

A highly bespoke animation can become fragile and hard to change.

Mitigation:

- separate content, visual assets, and motion logic;
- keep the state model simple;
- use explicit step data;
- document asset names and layer IDs;
- avoid unnecessary dependencies.

## Art Direction

Risk:

The section could become too technical, too diagrammatic, or too flashy.

Mitigation:

- treat the visual as an architectural editorial composition;
- use restraint;
- remove any motion that does not clarify the process;
- review the section against the design language before implementation.

---

## Version 1.1 Decision

Proceed with:

```txt
Layered SVG / architectural drawing approach
Pinned desktop sequence
Non-pinned mobile fallback
Reduced-motion semantic flow
No new dependency unless the prototype proves it necessary
```

Do not proceed directly to Three.js for Version 1.1.

Do not implement a heavy image sequence unless the SVG prototype cannot achieve the desired visual quality.

The goal is not to impress through technology. The goal is to make the studio process feel spatial, thoughtful, and memorable.
