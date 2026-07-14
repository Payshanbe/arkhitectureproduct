# Vercel + Neon Deployment

This project can be deployed on Vercel with Neon as the production PostgreSQL database.

## Recommended Stack

- Vercel: Next.js hosting and serverless runtime.
- Neon: PostgreSQL database for Payload CMS.
- Current media mode: committed files in `public/media`.

## Current Media Limitation

Payload media currently uses local uploads:

```ts
staticDir: "public/media"
```

This is acceptable for committed placeholder/demo media, but it is not a durable production upload strategy on Vercel. New files uploaded through Payload admin may not persist reliably across deployments/serverless instances.

Before real client content, move media uploads to durable object storage such as Vercel Blob, S3, Cloudinary, or Supabase Storage.

## Required Vercel Environment Variables

Add these in Vercel Project Settings -> Environment Variables:

```bash
DATABASE_URI=postgresql://user:password@host.neon.tech/dbname?sslmode=require
PAYLOAD_SECRET=your-secure-random-string-at-least-32-characters
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
```

Do not expose `DATABASE_URI` or `PAYLOAD_SECRET` to the browser. Only `NEXT_PUBLIC_SITE_URL` is public.

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
3. Add the required environment variables in Vercel.
4. Deploy once.
5. Run migrations against Neon.
6. Seed demo content if needed.
7. Redeploy if the first static build used fallback content before database content existed.

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
- Media upload storage is upgraded before relying on admin uploads for real production assets.
