import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_projects_editorial_status') THEN
        CREATE TYPE "public"."enum_projects_editorial_status" AS ENUM('built', 'concept', 'in-progress', 'completed');
      END IF;

      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__projects_v_version_editorial_status') THEN
        CREATE TYPE "public"."enum__projects_v_version_editorial_status" AS ENUM('built', 'concept', 'in-progress', 'completed');
      END IF;
    END
    $$;

    ALTER TABLE "projects"
      ALTER COLUMN "status" TYPE "public"."enum_projects_editorial_status"
      USING "status"::text::"public"."enum_projects_editorial_status";

    ALTER TABLE "_projects_v"
      ALTER COLUMN "version_status" TYPE "public"."enum__projects_v_version_editorial_status"
      USING "version_status"::text::"public"."enum__projects_v_version_editorial_status";
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "projects"
      ALTER COLUMN "status" TYPE varchar
      USING "status"::text;

    ALTER TABLE "_projects_v"
      ALTER COLUMN "version_status" TYPE varchar
      USING "version_status"::text;

    DROP TYPE IF EXISTS "public"."enum_projects_editorial_status";
    DROP TYPE IF EXISTS "public"."enum__projects_v_version_editorial_status";
  `);
}
