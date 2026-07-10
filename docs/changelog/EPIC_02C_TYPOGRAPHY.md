# EPIC 02C - Editorial Typography System

## Summary

Refined the website typography hierarchy into a calmer editorial scale without changing copy, layout, routing, CMS, imagery, or dependencies.

## Typography Scale

- Display: `clamp(3.25rem, 6.2vw, 7.5rem)` for page-level hero statements.
- Hero: `clamp(3.25rem, 5.2vw, 6.4rem)` for the homepage hero.
- Section Heading: `clamp(2rem, 2.7vw, 3rem)` with `1.08` line-height and `-0.03em` tracking.
- Project Title: `clamp(1.875rem, 2.2vw, 2.875rem)` with `1.04` line-height.
- Body: `clamp(0.9375rem, 0.9rem + 0.14vw, 1.0625rem)` with `1.65` line-height.
- Caption: `clamp(0.75rem, 0.72rem + 0.08vw, 0.8125rem)`.
- Label: `clamp(0.6875rem, 0.66rem + 0.08vw, 0.78125rem)` with `0.14em` letter spacing.

## Changes

- Added semantic typography utilities for display, hero, section heading, project title, body, caption, and label levels.
- Reduced large section statements by moving them to the shared Section Heading level.
- Reduced project title sizing across Home, Work, Project Detail, and Featured Project surfaces.
- Kept the homepage hero as the largest primary composition text.
- Increased label letter spacing for a more consistent editorial rhythm.
- Fixed the public site body font variable so the configured Inter font is applied consistently.
- Added a missing muted text opacity utility used by the hero label.

## Pages Reviewed

- Home
- Work
- Project Detail
- Studio
- Contact
- System pages
- Signature Experience prototype and integrated process section

## Verification

- `npm run lint`
- `npm run build`
