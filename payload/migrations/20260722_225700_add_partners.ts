import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE "partners" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "logo_id" integer,
      "website" varchar,
      "order" numeric DEFAULT 0,
      "published" boolean DEFAULT true,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "partners_id" integer;
    ALTER TABLE "partners" ADD CONSTRAINT "partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
    CREATE INDEX "partners_logo_idx" ON "partners" USING btree ("logo_id");
    CREATE INDEX "partners_order_idx" ON "partners" USING btree ("order");
    CREATE INDEX "partners_published_idx" ON "partners" USING btree ("published");
    CREATE INDEX "partners_updated_at_idx" ON "partners" USING btree ("updated_at");
    CREATE INDEX "partners_created_at_idx" ON "partners" USING btree ("created_at");
    CREATE INDEX "payload_locked_documents_rels_partners_id_idx" ON "payload_locked_documents_rels" USING btree ("partners_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_partners_fk";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "partners_id";
    DROP TABLE "partners" CASCADE;
  `);
}
