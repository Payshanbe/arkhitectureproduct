# Deployment Prep: Vercel + Neon

Prepared the project for a free Vercel + Neon deployment path.

## Changes

- Added production environment examples to `.env.example`.
- Created `docs/DEPLOYMENT_VERCEL_NEON.md`.
- Generated the initial Payload migration for Neon production databases.

## Migration

Created:

```text
payload/migrations/20260713_192303_init_vercel_neon.ts
payload/migrations/20260713_192303_init_vercel_neon.json
```

Updated:

```text
payload/migrations/index.ts
```

## Notes

- Production `push` remains disabled in Payload config.
- Migrations should be applied to Neon using `npm run migrate`.
- Demo CMS content can be inserted with `npm run seed`.
- Media uploads still need durable external storage before real production image management.
