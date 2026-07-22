# Vercel + Neon Deployment

This project can be deployed on Vercel with Neon as the production PostgreSQL database.

## Recommended Stack

- Vercel: Next.js hosting and serverless runtime.
- Neon: PostgreSQL database for Payload CMS.
- Local media mode: files in `public/media` when no Blob token is configured.
- Production media mode: Vercel Blob through Payload's official storage adapter.

## Media Storage

Payload keeps local uploads for development:

```ts
staticDir: "public/media"
```

When `BLOB_READ_WRITE_TOKEN` is present, the Vercel Blob adapter disables local writes and stores new Payload uploads in durable object storage. Client uploads are enabled to avoid Vercel's server upload size limit.

Before enabling Blob in production, copy the committed media files to the connected store so existing Payload records continue to resolve:

```bash
npm run media:migrate:vercel-blob -- dry-run
npm run media:migrate:vercel-blob
```

The migration keeps existing filenames and skips blobs that are already present, so it can be run again safely.

## Required Vercel Environment Variables

Add these in Vercel Project Settings -> Environment Variables:

```bash
DATABASE_URI=postgresql://user:password@host.neon.tech/dbname?sslmode=require
PAYLOAD_SECRET=your-secure-random-string-at-least-32-characters
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_store_random-secret
```

Do not expose `DATABASE_URI`, `PAYLOAD_SECRET`, or `BLOB_READ_WRITE_TOKEN` to the browser. Only `NEXT_PUBLIC_SITE_URL` is public.

## Neon Setup

1. Create a Neon project.
2. Copy the pooled or direct PostgreSQL connection string.
3. Ensure the connection string includes SSL, usually:

```bash
?sslmode=require
```

4. Use that value as `DATABASE_URI`.

## First Deployment Order

1. Push the repository to GitHub.
2. Import the GitHub repository in Vercel.
3. Connect a Vercel Blob store to the project.
4. Copy existing media to Blob with the migration command above.
5. Add the required environment variables in Vercel.
6. Run migrations against Neon.
7. Deploy once.
8. Seed demo content only if needed.

## Run Migrations Against Neon

Temporarily set local `.env.local` to the Neon `DATABASE_URI`, or run with production env loaded locally, then:

```bash
npm run migrate
```

The initial production migration is:

```text
payload/migrations/20260713_192303_init_vercel_neon.ts
```

## Seed Demo Content Against Neon

Run only when you want demo CMS content inserted/refreshed:

```bash
npm run seed
```

The seed script preserves non-placeholder project images where possible, but still review content before using it on a real production database.

## Vercel Build Settings

Use the defaults:

```bash
Install Command: npm ci
Build Command: npm run build
Output Directory: .next
```

No `vercel.json` is required for the current setup.

## Dependency Audit

The production dependency audit on 2026-07-23 reports no critical or high severity vulnerabilities. Five moderate findings remain in the `@payloadcms/db-postgres` -> `drizzle-kit` -> `@esbuild-kit` -> `esbuild` migration-tooling chain. npm does not currently provide a compatible fix. Do not expose local development servers publicly, and review this chain when upgrading Payload.

## Production Checklist

- `NEXT_PUBLIC_SITE_URL` is the final Vercel or custom domain.
- `DATABASE_URI` points to Neon with SSL enabled.
- `PAYLOAD_SECRET` is not the local placeholder and is at least 32 characters.
- `npm run migrate` has been run against Neon.
- `npm run seed` has been run if demo content is desired.
- `/admin` opens on Vercel.
- A first admin user is created through Payload.
- Contact submissions are saved in Payload.
- Project pages render CMS data.
- `BLOB_READ_WRITE_TOKEN` is configured only as a server-side environment variable.
- Existing `public/media` files have been copied to Vercel Blob.
- An image uploaded in `/admin` remains available after a redeploy.
