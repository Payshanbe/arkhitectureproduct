# Payload Migration Workflow

Use this workflow for schema changes that affect Payload collections, globals, fields, or database structure.

## Current Setup

- Payload uses PostgreSQL through `@payloadcms/db-postgres`.
- Migrations are stored in `payload/migrations`.
- The adapter is configured with an explicit `migrationDir`.
- Schema push is disabled in production through `push: process.env.NODE_ENV !== "production"`.

## Safe Commands

Check migration status:

```bash
npm run migrate:status
```

Create a migration after changing Payload schema:

```bash
npm run migrate:create -- descriptive-migration-name
```

Review the generated migration before applying it.

Run pending migrations:

```bash
npm run migrate
```

Roll back the most recent migration only when the generated `down` migration has been reviewed:

```bash
npm run migrate:down
```

Regenerate Payload TypeScript types after schema changes:

```bash
npm run generate:types
```

Regenerate the Payload admin import map after admin-facing changes:

```bash
npm run generate:importmap
```

## Data Safety Rules

- Do not use destructive reset or fresh migration commands against shared or production data.
- Back up the database before applying migrations outside local development.
- Review generated migration files before running them.
- Run migrations against a staging database before production.
- Run `npm run seed` only when demo content should be inserted or refreshed.

