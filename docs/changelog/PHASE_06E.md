# Phase 06E - Contact Experience and Minimal Footer

## Scope

Completed the homepage closing experience with a calm contact section and added the minimal global footer for the public site.

## Added

- `HomeContactExperience` in `features/home/`.
- `HomeContactExperienceMotion` for subtle reveal animation using the existing motion utilities.
- `Footer` in `components/layout/`.

## Updated

- Added the contact section after the homepage Featured Project section.
- Mounted the footer in the public `(site)` layout only.

## Contact Experience

- Uses a small editorial label, large statement, supporting sentence, email link, and quiet project-start link.
- Avoids cards, heavy buttons, forms, maps, decorative graphics, and new CMS functionality.
- Keeps the main section as a Server Component and isolates animation in a small Client Component.

## Footer

- Includes studio name, copyright, primary navigation, and placeholder social links.
- Uses restrained typography, generous spacing, and no decorative treatment.
- Remains server-rendered.

## Accessibility

- Uses semantic `section`, `footer`, and `nav` landmarks.
- Footer navigation and social navigation include accessible labels.
- Links retain the project-wide `focus-visible` treatment.
- Motion respects the existing reduced-motion hook and animation utilities.

## Payload Isolation

- The footer is mounted only in `app/(site)/layout.tsx`.
- Payload admin and API route groups remain untouched.

## Verification

Run:

```bash
npm run lint
npm run build
npm run dev
```
