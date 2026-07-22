import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('ru', 'tj');
  CREATE TYPE "public"."enum__projects_v_published_locale" AS ENUM('ru', 'tj');
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"photographer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "project_categories_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "projects_gallery_locales" (
  	"caption" varchar,
  	"alt_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_locales" (
  	"title" varchar,
  	"tagline" varchar,
  	"location" varchar,
  	"city" varchar,
  	"country" varchar,
  	"area" varchar,
  	"architect" varchar,
  	"client" varchar,
  	"photographer" varchar,
  	"excerpt" varchar,
  	"summary" varchar,
  	"description" varchar,
  	"short_description" varchar,
  	"concept" varchar,
  	"lighting_concept" varchar,
  	"spatial_qualities" varchar,
  	"photography_direction" varchar,
  	"materials" varchar,
  	"credits" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_version_gallery_locales" (
  	"caption" varchar,
  	"alt_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_locales" (
  	"version_title" varchar,
  	"version_tagline" varchar,
  	"version_location" varchar,
  	"version_city" varchar,
  	"version_country" varchar,
  	"version_area" varchar,
  	"version_architect" varchar,
  	"version_client" varchar,
  	"version_photographer" varchar,
  	"version_excerpt" varchar,
  	"version_summary" varchar,
  	"version_description" varchar,
  	"version_short_description" varchar,
  	"version_concept" varchar,
  	"version_lighting_concept" varchar,
  	"version_spatial_qualities" varchar,
  	"version_photography_direction" varchar,
  	"version_materials" varchar,
  	"version_credits" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_settings_social_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_locales" (
  	"tagline" varchar,
  	"site_description" varchar,
  	"studio_description" varchar,
  	"footer_description" varchar,
  	"copyright" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contact_info_locales" (
  	"address" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "navigation_items_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "seo_defaults_locales" (
  	"default_title" varchar DEFAULT 'Arkhitecture' NOT NULL,
  	"title_template" varchar DEFAULT '%s | Arkhitecture',
  	"default_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "home_page_locales" (
  	"hero_label" varchar DEFAULT 'Architecture Studio',
  	"hero_heading" varchar DEFAULT 'Architecture shaped by light, material, and restraint.' NOT NULL,
  	"hero_supporting_text" varchar DEFAULT 'A cinematic portfolio for spaces that feel calm, precise, and quietly enduring.',
  	"hero_location_line" varchar DEFAULT 'Tashkent, UZ 41.3°N 69.2°E',
  	"selected_projects_label" varchar DEFAULT 'Selected Work',
  	"selected_projects_heading" varchar DEFAULT 'A quiet sequence of spaces shaped by proportion, material, and light.',
  	"selected_projects_archive_link_label" varchar DEFAULT 'View the archive →',
  	"studio_intro_label" varchar DEFAULT 'Our Approach',
  	"studio_intro_statement" varchar DEFAULT 'We design spaces through atmosphere, restraint, and a close reading of context.',
  	"studio_intro_body" varchar DEFAULT 'The studio approaches each project as a careful composition of light, material, proportion, and daily ritual. The result is architecture that feels calm, precise, and quietly enduring.',
  	"studio_intro_link_label" varchar DEFAULT 'Learn More',
  	"featured_project_label" varchar DEFAULT 'Featured Project',
  	"featured_project_heading" varchar DEFAULT 'A slower look at one selected work.',
  	"featured_project_link_label" varchar DEFAULT 'View Project →',
  	"contact_label" varchar DEFAULT 'Let''s Connect',
  	"contact_statement" varchar DEFAULT 'Begin with a conversation about place, atmosphere, and what should endure.',
  	"contact_body" varchar DEFAULT 'For residences, interiors, and architectural collaborations, send a brief note and we will reply with a considered next step.',
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "studio_page_philosophy_paragraphs_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "studio_page_principles_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "studio_page_information_locales" (
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "studio_page_locales" (
  	"hero_label" varchar DEFAULT 'Studio',
  	"hero_statement" varchar DEFAULT 'We design spaces through atmosphere, restraint, and a careful reading of context.',
  	"philosophy_label" varchar DEFAULT 'Philosophy',
  	"process_label" varchar DEFAULT 'The Process',
  	"process_statement" varchar DEFAULT 'Six layers, from first trace to atmosphere. How every project is drawn into being.',
  	"contact_cta_label" varchar DEFAULT 'Contact',
  	"contact_cta_statement" varchar DEFAULT 'Begin with a place, a question, or a quiet ambition for how a space should feel.',
  	"contact_cta_link_label" varchar DEFAULT 'Start a conversation',
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contact_page_locales" (
  	"hero_label" varchar DEFAULT 'Contact',
  	"hero_statement" varchar DEFAULT 'Begin with a conversation about place, atmosphere, and how a space should feel.',
  	"inquiry_label" varchar DEFAULT 'Inquiry',
  	"inquiry_body" varchar DEFAULT 'Write a short note about the place, the ambition, and the atmosphere you have in mind. We reply within a few working days.',
  	"collaboration_label" varchar DEFAULT 'Collaboration',
  	"collaboration_statement" varchar DEFAULT 'We work with private clients, developers, makers, and cultural collaborators who value restraint, clarity, and spaces that gather meaning slowly.',
  	"closing_label" varchar DEFAULT 'Closing',
  	"closing_statement" varchar DEFAULT 'The first conversation is simply a way to understand what should be protected, clarified, and made possible.',
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "work_page_locales" (
  	"hero_label" varchar DEFAULT 'Work',
  	"hero_title" varchar DEFAULT 'A considered archive of spaces, materials, and atmosphere.',
  	"hero_intro" varchar DEFAULT 'A selection of residential, hospitality, interior, and architectural work - shaped through renovation, restraint, and a close reading of place.',
  	"hero_singular_project_label" varchar DEFAULT 'project',
  	"hero_plural_project_label" varchar DEFAULT 'projects',
  	"archive_aria_label" varchar DEFAULT 'Project archive',
  	"archive_empty_number_label" varchar DEFAULT 'No. 00',
  	"archive_empty_location_label" varchar DEFAULT 'Archive',
  	"archive_empty_year_label" varchar DEFAULT 'Pending',
  	"archive_empty_title" varchar DEFAULT 'Projects will appear here once Payload contains published work.',
  	"archive_plate_label" varchar DEFAULT 'Plate',
  	"archive_plate_placeholder" varchar DEFAULT 'Photograph to come',
  	"fallbacks_location" varchar DEFAULT 'Location forthcoming',
  	"fallbacks_year" varchar DEFAULT 'Undated',
  	"fallbacks_year_range" varchar DEFAULT 'Archive',
  	"fallbacks_project_description" varchar DEFAULT 'A quiet architectural study shaped by material restraint, atmosphere, and a close reading of place.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "project_detail_settings_locales" (
  	"labels_statement" varchar DEFAULT 'Statement',
  	"labels_services" varchar DEFAULT 'Services',
  	"labels_area" varchar DEFAULT 'Area',
  	"labels_architect" varchar DEFAULT 'Architect',
  	"labels_status" varchar DEFAULT 'Status',
  	"labels_materials" varchar DEFAULT 'Materials',
  	"labels_next_project" varchar DEFAULT 'Next Project',
  	"fallbacks_category" varchar DEFAULT 'Project',
  	"fallbacks_location" varchar DEFAULT 'Location forthcoming',
  	"fallbacks_year" varchar DEFAULT 'Undated',
  	"fallbacks_description" varchar DEFAULT 'A quiet architectural study shaped through proportion, atmosphere, and material restraint.',
  	"service_labels_architecture" varchar DEFAULT 'Architecture',
  	"service_labels_interior_design" varchar DEFAULT 'Interior Design',
  	"service_labels_master_planning" varchar DEFAULT 'Master Planning',
  	"service_labels_furniture_design" varchar DEFAULT 'Furniture Design',
  	"service_labels_landscape" varchar DEFAULT 'Landscape',
  	"status_labels_built" varchar DEFAULT 'Built',
  	"status_labels_completed" varchar DEFAULT 'Completed',
  	"status_labels_concept" varchar DEFAULT 'Concept',
  	"status_labels_in_progress" varchar DEFAULT 'In Progress',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contact_form_settings_locales" (
  	"labels_city" varchar DEFAULT 'City',
  	"labels_country" varchar DEFAULT 'Country',
  	"labels_name" varchar DEFAULT 'Name',
  	"labels_project_type" varchar DEFAULT 'Project Type',
  	"labels_estimated_budget" varchar DEFAULT 'Estimated Budget',
  	"labels_timeline" varchar DEFAULT 'Timeline',
  	"labels_message" varchar DEFAULT 'Message',
  	"labels_company" varchar DEFAULT 'Company',
  	"labels_submit" varchar DEFAULT 'Send inquiry ->',
  	"labels_studio_information" varchar DEFAULT 'Studio Information',
  	"messages_default_note" varchar DEFAULT 'Your inquiry will be saved securely in the studio CMS for review.',
  	"messages_success" varchar DEFAULT 'Thank you. Your inquiry has been received.',
  	"messages_email_error" varchar DEFAULT 'Please enter a valid email address.',
  	"messages_required_error" varchar DEFAULT 'Please complete your name, email, and message.',
  	"placeholders_message" varchar DEFAULT 'The place, the ambition, the constraints.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "_projects_v" ADD COLUMN "snapshot" boolean;
  ALTER TABLE "_projects_v" ADD COLUMN "published_locale" "enum__projects_v_published_locale";
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "project_categories_locales" ADD CONSTRAINT "project_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."project_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_gallery_locales" ADD CONSTRAINT "projects_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_locales" ADD CONSTRAINT "projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_gallery_locales" ADD CONSTRAINT "_projects_v_version_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_version_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_locales" ADD CONSTRAINT "_projects_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_links_locales" ADD CONSTRAINT "site_settings_social_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_social_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_info_locales" ADD CONSTRAINT "contact_info_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_items_locales" ADD CONSTRAINT "navigation_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seo_defaults_locales" ADD CONSTRAINT "seo_defaults_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seo_defaults"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_locales" ADD CONSTRAINT "home_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "studio_page_philosophy_paragraphs_locales" ADD CONSTRAINT "studio_page_philosophy_paragraphs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."studio_page_philosophy_paragraphs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "studio_page_principles_locales" ADD CONSTRAINT "studio_page_principles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."studio_page_principles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "studio_page_information_locales" ADD CONSTRAINT "studio_page_information_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."studio_page_information"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "studio_page_locales" ADD CONSTRAINT "studio_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."studio_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_locales" ADD CONSTRAINT "contact_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "work_page_locales" ADD CONSTRAINT "work_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."work_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "project_detail_settings_locales" ADD CONSTRAINT "project_detail_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."project_detail_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_form_settings_locales" ADD CONSTRAINT "contact_form_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_form_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "project_categories_locales_locale_parent_id_unique" ON "project_categories_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "projects_gallery_locales_locale_parent_id_unique" ON "projects_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "projects_locales_locale_parent_id_unique" ON "projects_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_projects_v_version_gallery_locales_locale_parent_id_unique" ON "_projects_v_version_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_projects_v_locales_locale_parent_id_unique" ON "_projects_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "site_settings_social_links_locales_locale_parent_id_unique" ON "site_settings_social_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "contact_info_locales_locale_parent_id_unique" ON "contact_info_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "navigation_items_locales_locale_parent_id_unique" ON "navigation_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "seo_defaults_locales_locale_parent_id_unique" ON "seo_defaults_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "home_page_locales_locale_parent_id_unique" ON "home_page_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "studio_page_philosophy_paragraphs_locales_locale_parent_id_u" ON "studio_page_philosophy_paragraphs_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "studio_page_principles_locales_locale_parent_id_unique" ON "studio_page_principles_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "studio_page_information_locales_locale_parent_id_unique" ON "studio_page_information_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "studio_page_locales_locale_parent_id_unique" ON "studio_page_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "contact_page_locales_locale_parent_id_unique" ON "contact_page_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "work_page_locales_locale_parent_id_unique" ON "work_page_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "project_detail_settings_locales_locale_parent_id_unique" ON "project_detail_settings_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "contact_form_settings_locales_locale_parent_id_unique" ON "contact_form_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_snapshot_idx" ON "_projects_v" USING btree ("snapshot");
  CREATE INDEX "_projects_v_published_locale_idx" ON "_projects_v" USING btree ("published_locale");
  DO $$
  DECLARE
    mapping record;
    shared_columns text;
  BEGIN
    FOR mapping IN
      SELECT * FROM (VALUES
        ('media', 'media_locales'),
        ('project_categories', 'project_categories_locales'),
        ('projects_gallery', 'projects_gallery_locales'),
        ('projects', 'projects_locales'),
        ('_projects_v_version_gallery', '_projects_v_version_gallery_locales'),
        ('_projects_v', '_projects_v_locales'),
        ('site_settings_social_links', 'site_settings_social_links_locales'),
        ('site_settings', 'site_settings_locales'),
        ('contact_info', 'contact_info_locales'),
        ('navigation_items', 'navigation_items_locales'),
        ('seo_defaults', 'seo_defaults_locales'),
        ('home_page', 'home_page_locales'),
        ('studio_page_philosophy_paragraphs', 'studio_page_philosophy_paragraphs_locales'),
        ('studio_page_principles', 'studio_page_principles_locales'),
        ('studio_page_information', 'studio_page_information_locales'),
        ('studio_page', 'studio_page_locales'),
        ('contact_page', 'contact_page_locales'),
        ('work_page', 'work_page_locales'),
        ('project_detail_settings', 'project_detail_settings_locales'),
        ('contact_form_settings', 'contact_form_settings_locales')
      ) AS mappings(source_table, target_table)
    LOOP
      SELECT string_agg(format('%I', target.column_name), ', ' ORDER BY target.ordinal_position)
      INTO shared_columns
      FROM information_schema.columns AS target
      WHERE target.table_schema = 'public'
        AND target.table_name = mapping.target_table
        AND target.column_name NOT IN ('id', '_locale', '_parent_id')
        AND EXISTS (
          SELECT 1
          FROM information_schema.columns AS source
          WHERE source.table_schema = 'public'
            AND source.table_name = mapping.source_table
            AND source.column_name = target.column_name
        );

      IF shared_columns IS NOT NULL THEN
        EXECUTE format(
          'INSERT INTO %I (%s, _locale, _parent_id) SELECT %s, %L, id FROM %I',
          mapping.target_table,
          shared_columns,
          shared_columns,
          'ru',
          mapping.source_table
        );
      END IF;
    END LOOP;
  END $$;
  ALTER TABLE "media" DROP COLUMN "alt";
  ALTER TABLE "media" DROP COLUMN "caption";
  ALTER TABLE "media" DROP COLUMN "photographer";
  ALTER TABLE "project_categories" DROP COLUMN "title";
  ALTER TABLE "project_categories" DROP COLUMN "description";
  ALTER TABLE "projects_gallery" DROP COLUMN "caption";
  ALTER TABLE "projects_gallery" DROP COLUMN "alt_text";
  ALTER TABLE "projects" DROP COLUMN "title";
  ALTER TABLE "projects" DROP COLUMN "tagline";
  ALTER TABLE "projects" DROP COLUMN "location";
  ALTER TABLE "projects" DROP COLUMN "city";
  ALTER TABLE "projects" DROP COLUMN "country";
  ALTER TABLE "projects" DROP COLUMN "area";
  ALTER TABLE "projects" DROP COLUMN "architect";
  ALTER TABLE "projects" DROP COLUMN "client";
  ALTER TABLE "projects" DROP COLUMN "photographer";
  ALTER TABLE "projects" DROP COLUMN "excerpt";
  ALTER TABLE "projects" DROP COLUMN "summary";
  ALTER TABLE "projects" DROP COLUMN "description";
  ALTER TABLE "projects" DROP COLUMN "short_description";
  ALTER TABLE "projects" DROP COLUMN "concept";
  ALTER TABLE "projects" DROP COLUMN "lighting_concept";
  ALTER TABLE "projects" DROP COLUMN "spatial_qualities";
  ALTER TABLE "projects" DROP COLUMN "photography_direction";
  ALTER TABLE "projects" DROP COLUMN "materials";
  ALTER TABLE "projects" DROP COLUMN "credits";
  ALTER TABLE "projects" DROP COLUMN "seo_title";
  ALTER TABLE "projects" DROP COLUMN "seo_description";
  ALTER TABLE "_projects_v_version_gallery" DROP COLUMN "caption";
  ALTER TABLE "_projects_v_version_gallery" DROP COLUMN "alt_text";
  ALTER TABLE "_projects_v" DROP COLUMN "version_title";
  ALTER TABLE "_projects_v" DROP COLUMN "version_tagline";
  ALTER TABLE "_projects_v" DROP COLUMN "version_location";
  ALTER TABLE "_projects_v" DROP COLUMN "version_city";
  ALTER TABLE "_projects_v" DROP COLUMN "version_country";
  ALTER TABLE "_projects_v" DROP COLUMN "version_area";
  ALTER TABLE "_projects_v" DROP COLUMN "version_architect";
  ALTER TABLE "_projects_v" DROP COLUMN "version_client";
  ALTER TABLE "_projects_v" DROP COLUMN "version_photographer";
  ALTER TABLE "_projects_v" DROP COLUMN "version_excerpt";
  ALTER TABLE "_projects_v" DROP COLUMN "version_summary";
  ALTER TABLE "_projects_v" DROP COLUMN "version_description";
  ALTER TABLE "_projects_v" DROP COLUMN "version_short_description";
  ALTER TABLE "_projects_v" DROP COLUMN "version_concept";
  ALTER TABLE "_projects_v" DROP COLUMN "version_lighting_concept";
  ALTER TABLE "_projects_v" DROP COLUMN "version_spatial_qualities";
  ALTER TABLE "_projects_v" DROP COLUMN "version_photography_direction";
  ALTER TABLE "_projects_v" DROP COLUMN "version_materials";
  ALTER TABLE "_projects_v" DROP COLUMN "version_credits";
  ALTER TABLE "_projects_v" DROP COLUMN "version_seo_title";
  ALTER TABLE "_projects_v" DROP COLUMN "version_seo_description";
  ALTER TABLE "site_settings_social_links" DROP COLUMN "label";
  ALTER TABLE "site_settings" DROP COLUMN "tagline";
  ALTER TABLE "site_settings" DROP COLUMN "site_description";
  ALTER TABLE "site_settings" DROP COLUMN "studio_description";
  ALTER TABLE "site_settings" DROP COLUMN "footer_description";
  ALTER TABLE "site_settings" DROP COLUMN "copyright";
  ALTER TABLE "site_settings" DROP COLUMN "seo_title";
  ALTER TABLE "site_settings" DROP COLUMN "seo_description";
  ALTER TABLE "contact_info" DROP COLUMN "address";
  ALTER TABLE "navigation_items" DROP COLUMN "label";
  ALTER TABLE "seo_defaults" DROP COLUMN "default_title";
  ALTER TABLE "seo_defaults" DROP COLUMN "title_template";
  ALTER TABLE "seo_defaults" DROP COLUMN "default_description";
  ALTER TABLE "home_page" DROP COLUMN "hero_label";
  ALTER TABLE "home_page" DROP COLUMN "hero_heading";
  ALTER TABLE "home_page" DROP COLUMN "hero_supporting_text";
  ALTER TABLE "home_page" DROP COLUMN "hero_location_line";
  ALTER TABLE "home_page" DROP COLUMN "selected_projects_label";
  ALTER TABLE "home_page" DROP COLUMN "selected_projects_heading";
  ALTER TABLE "home_page" DROP COLUMN "selected_projects_archive_link_label";
  ALTER TABLE "home_page" DROP COLUMN "studio_intro_label";
  ALTER TABLE "home_page" DROP COLUMN "studio_intro_statement";
  ALTER TABLE "home_page" DROP COLUMN "studio_intro_body";
  ALTER TABLE "home_page" DROP COLUMN "studio_intro_link_label";
  ALTER TABLE "home_page" DROP COLUMN "featured_project_label";
  ALTER TABLE "home_page" DROP COLUMN "featured_project_heading";
  ALTER TABLE "home_page" DROP COLUMN "featured_project_link_label";
  ALTER TABLE "home_page" DROP COLUMN "contact_label";
  ALTER TABLE "home_page" DROP COLUMN "contact_statement";
  ALTER TABLE "home_page" DROP COLUMN "contact_body";
  ALTER TABLE "home_page" DROP COLUMN "seo_title";
  ALTER TABLE "home_page" DROP COLUMN "seo_description";
  ALTER TABLE "studio_page_philosophy_paragraphs" DROP COLUMN "text";
  ALTER TABLE "studio_page_principles" DROP COLUMN "text";
  ALTER TABLE "studio_page_information" DROP COLUMN "label";
  ALTER TABLE "studio_page_information" DROP COLUMN "value";
  ALTER TABLE "studio_page" DROP COLUMN "hero_label";
  ALTER TABLE "studio_page" DROP COLUMN "hero_statement";
  ALTER TABLE "studio_page" DROP COLUMN "philosophy_label";
  ALTER TABLE "studio_page" DROP COLUMN "process_label";
  ALTER TABLE "studio_page" DROP COLUMN "process_statement";
  ALTER TABLE "studio_page" DROP COLUMN "contact_cta_label";
  ALTER TABLE "studio_page" DROP COLUMN "contact_cta_statement";
  ALTER TABLE "studio_page" DROP COLUMN "contact_cta_link_label";
  ALTER TABLE "studio_page" DROP COLUMN "seo_title";
  ALTER TABLE "studio_page" DROP COLUMN "seo_description";
  ALTER TABLE "contact_page" DROP COLUMN "hero_label";
  ALTER TABLE "contact_page" DROP COLUMN "hero_statement";
  ALTER TABLE "contact_page" DROP COLUMN "inquiry_label";
  ALTER TABLE "contact_page" DROP COLUMN "inquiry_body";
  ALTER TABLE "contact_page" DROP COLUMN "collaboration_label";
  ALTER TABLE "contact_page" DROP COLUMN "collaboration_statement";
  ALTER TABLE "contact_page" DROP COLUMN "closing_label";
  ALTER TABLE "contact_page" DROP COLUMN "closing_statement";
  ALTER TABLE "contact_page" DROP COLUMN "seo_title";
  ALTER TABLE "contact_page" DROP COLUMN "seo_description";
  ALTER TABLE "work_page" DROP COLUMN "hero_label";
  ALTER TABLE "work_page" DROP COLUMN "hero_title";
  ALTER TABLE "work_page" DROP COLUMN "hero_intro";
  ALTER TABLE "work_page" DROP COLUMN "hero_singular_project_label";
  ALTER TABLE "work_page" DROP COLUMN "hero_plural_project_label";
  ALTER TABLE "work_page" DROP COLUMN "archive_aria_label";
  ALTER TABLE "work_page" DROP COLUMN "archive_empty_number_label";
  ALTER TABLE "work_page" DROP COLUMN "archive_empty_location_label";
  ALTER TABLE "work_page" DROP COLUMN "archive_empty_year_label";
  ALTER TABLE "work_page" DROP COLUMN "archive_empty_title";
  ALTER TABLE "work_page" DROP COLUMN "archive_plate_label";
  ALTER TABLE "work_page" DROP COLUMN "archive_plate_placeholder";
  ALTER TABLE "work_page" DROP COLUMN "fallbacks_location";
  ALTER TABLE "work_page" DROP COLUMN "fallbacks_year";
  ALTER TABLE "work_page" DROP COLUMN "fallbacks_year_range";
  ALTER TABLE "work_page" DROP COLUMN "fallbacks_project_description";
  ALTER TABLE "project_detail_settings" DROP COLUMN "labels_statement";
  ALTER TABLE "project_detail_settings" DROP COLUMN "labels_services";
  ALTER TABLE "project_detail_settings" DROP COLUMN "labels_area";
  ALTER TABLE "project_detail_settings" DROP COLUMN "labels_architect";
  ALTER TABLE "project_detail_settings" DROP COLUMN "labels_status";
  ALTER TABLE "project_detail_settings" DROP COLUMN "labels_materials";
  ALTER TABLE "project_detail_settings" DROP COLUMN "labels_next_project";
  ALTER TABLE "project_detail_settings" DROP COLUMN "fallbacks_category";
  ALTER TABLE "project_detail_settings" DROP COLUMN "fallbacks_location";
  ALTER TABLE "project_detail_settings" DROP COLUMN "fallbacks_year";
  ALTER TABLE "project_detail_settings" DROP COLUMN "fallbacks_description";
  ALTER TABLE "project_detail_settings" DROP COLUMN "service_labels_architecture";
  ALTER TABLE "project_detail_settings" DROP COLUMN "service_labels_interior_design";
  ALTER TABLE "project_detail_settings" DROP COLUMN "service_labels_master_planning";
  ALTER TABLE "project_detail_settings" DROP COLUMN "service_labels_furniture_design";
  ALTER TABLE "project_detail_settings" DROP COLUMN "service_labels_landscape";
  ALTER TABLE "project_detail_settings" DROP COLUMN "status_labels_built";
  ALTER TABLE "project_detail_settings" DROP COLUMN "status_labels_completed";
  ALTER TABLE "project_detail_settings" DROP COLUMN "status_labels_concept";
  ALTER TABLE "project_detail_settings" DROP COLUMN "status_labels_in_progress";
  ALTER TABLE "contact_form_settings" DROP COLUMN "labels_city";
  ALTER TABLE "contact_form_settings" DROP COLUMN "labels_country";
  ALTER TABLE "contact_form_settings" DROP COLUMN "labels_name";
  ALTER TABLE "contact_form_settings" DROP COLUMN "labels_project_type";
  ALTER TABLE "contact_form_settings" DROP COLUMN "labels_estimated_budget";
  ALTER TABLE "contact_form_settings" DROP COLUMN "labels_timeline";
  ALTER TABLE "contact_form_settings" DROP COLUMN "labels_message";
  ALTER TABLE "contact_form_settings" DROP COLUMN "labels_company";
  ALTER TABLE "contact_form_settings" DROP COLUMN "labels_submit";
  ALTER TABLE "contact_form_settings" DROP COLUMN "labels_studio_information";
  ALTER TABLE "contact_form_settings" DROP COLUMN "messages_default_note";
  ALTER TABLE "contact_form_settings" DROP COLUMN "messages_success";
  ALTER TABLE "contact_form_settings" DROP COLUMN "messages_email_error";
  ALTER TABLE "contact_form_settings" DROP COLUMN "messages_required_error";
  ALTER TABLE "contact_form_settings" DROP COLUMN "placeholders_message";`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DO $$
  DECLARE
    mapping record;
    shared_columns text;
    temp_table text;
  BEGIN
    FOR mapping IN
      SELECT * FROM (VALUES
        ('media', 'media_locales'),
        ('project_categories', 'project_categories_locales'),
        ('projects_gallery', 'projects_gallery_locales'),
        ('projects', 'projects_locales'),
        ('_projects_v_version_gallery', '_projects_v_version_gallery_locales'),
        ('_projects_v', '_projects_v_locales'),
        ('site_settings_social_links', 'site_settings_social_links_locales'),
        ('site_settings', 'site_settings_locales'),
        ('contact_info', 'contact_info_locales'),
        ('navigation_items', 'navigation_items_locales'),
        ('seo_defaults', 'seo_defaults_locales'),
        ('home_page', 'home_page_locales'),
        ('studio_page_philosophy_paragraphs', 'studio_page_philosophy_paragraphs_locales'),
        ('studio_page_principles', 'studio_page_principles_locales'),
        ('studio_page_information', 'studio_page_information_locales'),
        ('studio_page', 'studio_page_locales'),
        ('contact_page', 'contact_page_locales'),
        ('work_page', 'work_page_locales'),
        ('project_detail_settings', 'project_detail_settings_locales'),
        ('contact_form_settings', 'contact_form_settings_locales')
      ) AS mappings(source_table, localized_table)
    LOOP
      temp_table := 'migration_' || mapping.localized_table;

      SELECT string_agg(format('%I', localized.column_name), ', ' ORDER BY localized.ordinal_position)
      INTO shared_columns
      FROM information_schema.columns AS localized
      WHERE localized.table_schema = 'public'
        AND localized.table_name = mapping.localized_table
        AND localized.column_name NOT IN ('id', '_locale')
        AND (
          localized.column_name = '_parent_id'
          OR EXISTS (
            SELECT 1
            FROM information_schema.columns AS source
            WHERE source.table_schema = 'public'
              AND source.table_name = mapping.source_table
              AND source.column_name = localized.column_name
          )
        );

      EXECUTE format(
        'CREATE TEMP TABLE %I ON COMMIT DROP AS SELECT %s FROM %I WHERE _locale = %L',
        temp_table,
        shared_columns,
        mapping.localized_table,
        'ru'
      );
    END LOOP;
  END $$;
  ALTER TABLE "media_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "project_categories_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_version_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_social_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_info_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navigation_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "seo_defaults_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "studio_page_philosophy_paragraphs_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "studio_page_principles_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "studio_page_information_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "studio_page_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "work_page_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "project_detail_settings_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_form_settings_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "project_categories_locales" CASCADE;
  DROP TABLE "projects_gallery_locales" CASCADE;
  DROP TABLE "projects_locales" CASCADE;
  DROP TABLE "_projects_v_version_gallery_locales" CASCADE;
  DROP TABLE "_projects_v_locales" CASCADE;
  DROP TABLE "site_settings_social_links_locales" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "contact_info_locales" CASCADE;
  DROP TABLE "navigation_items_locales" CASCADE;
  DROP TABLE "seo_defaults_locales" CASCADE;
  DROP TABLE "home_page_locales" CASCADE;
  DROP TABLE "studio_page_philosophy_paragraphs_locales" CASCADE;
  DROP TABLE "studio_page_principles_locales" CASCADE;
  DROP TABLE "studio_page_information_locales" CASCADE;
  DROP TABLE "studio_page_locales" CASCADE;
  DROP TABLE "contact_page_locales" CASCADE;
  DROP TABLE "work_page_locales" CASCADE;
  DROP TABLE "project_detail_settings_locales" CASCADE;
  DROP TABLE "contact_form_settings_locales" CASCADE;
  DROP INDEX "_projects_v_snapshot_idx";
  DROP INDEX "_projects_v_published_locale_idx";
  ALTER TABLE "media" ADD COLUMN "alt" varchar;
  ALTER TABLE "media" ADD COLUMN "caption" varchar;
  ALTER TABLE "media" ADD COLUMN "photographer" varchar;
  ALTER TABLE "project_categories" ADD COLUMN "title" varchar;
  ALTER TABLE "project_categories" ADD COLUMN "description" varchar;
  ALTER TABLE "projects_gallery" ADD COLUMN "caption" varchar;
  ALTER TABLE "projects_gallery" ADD COLUMN "alt_text" varchar;
  ALTER TABLE "projects" ADD COLUMN "title" varchar;
  ALTER TABLE "projects" ADD COLUMN "tagline" varchar;
  ALTER TABLE "projects" ADD COLUMN "location" varchar;
  ALTER TABLE "projects" ADD COLUMN "city" varchar;
  ALTER TABLE "projects" ADD COLUMN "country" varchar;
  ALTER TABLE "projects" ADD COLUMN "area" varchar;
  ALTER TABLE "projects" ADD COLUMN "architect" varchar;
  ALTER TABLE "projects" ADD COLUMN "client" varchar;
  ALTER TABLE "projects" ADD COLUMN "photographer" varchar;
  ALTER TABLE "projects" ADD COLUMN "excerpt" varchar;
  ALTER TABLE "projects" ADD COLUMN "summary" varchar;
  ALTER TABLE "projects" ADD COLUMN "description" varchar;
  ALTER TABLE "projects" ADD COLUMN "short_description" varchar;
  ALTER TABLE "projects" ADD COLUMN "concept" varchar;
  ALTER TABLE "projects" ADD COLUMN "lighting_concept" varchar;
  ALTER TABLE "projects" ADD COLUMN "spatial_qualities" varchar;
  ALTER TABLE "projects" ADD COLUMN "photography_direction" varchar;
  ALTER TABLE "projects" ADD COLUMN "materials" varchar;
  ALTER TABLE "projects" ADD COLUMN "credits" varchar;
  ALTER TABLE "projects" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "projects" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "_projects_v_version_gallery" ADD COLUMN "caption" varchar;
  ALTER TABLE "_projects_v_version_gallery" ADD COLUMN "alt_text" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_tagline" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_location" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_city" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_country" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_area" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_architect" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_client" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_photographer" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_excerpt" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_summary" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_description" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_short_description" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_concept" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_lighting_concept" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_spatial_qualities" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_photography_direction" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_materials" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_credits" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_seo_title" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_seo_description" varchar;
  ALTER TABLE "site_settings_social_links" ADD COLUMN "label" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "tagline" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "site_description" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "studio_description" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "footer_description" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "copyright" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "contact_info" ADD COLUMN "address" varchar;
  ALTER TABLE "navigation_items" ADD COLUMN "label" varchar;
  ALTER TABLE "seo_defaults" ADD COLUMN "default_title" varchar DEFAULT 'Arkhitecture' NOT NULL;
  ALTER TABLE "seo_defaults" ADD COLUMN "title_template" varchar DEFAULT '%s | Arkhitecture';
  ALTER TABLE "seo_defaults" ADD COLUMN "default_description" varchar;
  ALTER TABLE "home_page" ADD COLUMN "hero_label" varchar DEFAULT 'Architecture Studio';
  ALTER TABLE "home_page" ADD COLUMN "hero_heading" varchar DEFAULT 'Architecture shaped by light, material, and restraint.' NOT NULL;
  ALTER TABLE "home_page" ADD COLUMN "hero_supporting_text" varchar DEFAULT 'A cinematic portfolio for spaces that feel calm, precise, and quietly enduring.';
  ALTER TABLE "home_page" ADD COLUMN "hero_location_line" varchar DEFAULT 'Tashkent, UZ 41.3°N 69.2°E';
  ALTER TABLE "home_page" ADD COLUMN "selected_projects_label" varchar DEFAULT 'Selected Work';
  ALTER TABLE "home_page" ADD COLUMN "selected_projects_heading" varchar DEFAULT 'A quiet sequence of spaces shaped by proportion, material, and light.';
  ALTER TABLE "home_page" ADD COLUMN "selected_projects_archive_link_label" varchar DEFAULT 'View the archive →';
  ALTER TABLE "home_page" ADD COLUMN "studio_intro_label" varchar DEFAULT 'Our Approach';
  ALTER TABLE "home_page" ADD COLUMN "studio_intro_statement" varchar DEFAULT 'We design spaces through atmosphere, restraint, and a close reading of context.';
  ALTER TABLE "home_page" ADD COLUMN "studio_intro_body" varchar DEFAULT 'The studio approaches each project as a careful composition of light, material, proportion, and daily ritual. The result is architecture that feels calm, precise, and quietly enduring.';
  ALTER TABLE "home_page" ADD COLUMN "studio_intro_link_label" varchar DEFAULT 'Learn More';
  ALTER TABLE "home_page" ADD COLUMN "featured_project_label" varchar DEFAULT 'Featured Project';
  ALTER TABLE "home_page" ADD COLUMN "featured_project_heading" varchar DEFAULT 'A slower look at one selected work.';
  ALTER TABLE "home_page" ADD COLUMN "featured_project_link_label" varchar DEFAULT 'View Project →';
  ALTER TABLE "home_page" ADD COLUMN "contact_label" varchar DEFAULT 'Let''s Connect';
  ALTER TABLE "home_page" ADD COLUMN "contact_statement" varchar DEFAULT 'Begin with a conversation about place, atmosphere, and what should endure.';
  ALTER TABLE "home_page" ADD COLUMN "contact_body" varchar DEFAULT 'For residences, interiors, and architectural collaborations, send a brief note and we will reply with a considered next step.';
  ALTER TABLE "home_page" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "home_page" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "studio_page_philosophy_paragraphs" ADD COLUMN "text" varchar;
  ALTER TABLE "studio_page_principles" ADD COLUMN "text" varchar;
  ALTER TABLE "studio_page_information" ADD COLUMN "label" varchar;
  ALTER TABLE "studio_page_information" ADD COLUMN "value" varchar;
  ALTER TABLE "studio_page" ADD COLUMN "hero_label" varchar DEFAULT 'Studio';
  ALTER TABLE "studio_page" ADD COLUMN "hero_statement" varchar DEFAULT 'We design spaces through atmosphere, restraint, and a careful reading of context.';
  ALTER TABLE "studio_page" ADD COLUMN "philosophy_label" varchar DEFAULT 'Philosophy';
  ALTER TABLE "studio_page" ADD COLUMN "process_label" varchar DEFAULT 'The Process';
  ALTER TABLE "studio_page" ADD COLUMN "process_statement" varchar DEFAULT 'Six layers, from first trace to atmosphere. How every project is drawn into being.';
  ALTER TABLE "studio_page" ADD COLUMN "contact_cta_label" varchar DEFAULT 'Contact';
  ALTER TABLE "studio_page" ADD COLUMN "contact_cta_statement" varchar DEFAULT 'Begin with a place, a question, or a quiet ambition for how a space should feel.';
  ALTER TABLE "studio_page" ADD COLUMN "contact_cta_link_label" varchar DEFAULT 'Start a conversation';
  ALTER TABLE "studio_page" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "studio_page" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "contact_page" ADD COLUMN "hero_label" varchar DEFAULT 'Contact';
  ALTER TABLE "contact_page" ADD COLUMN "hero_statement" varchar DEFAULT 'Begin with a conversation about place, atmosphere, and how a space should feel.';
  ALTER TABLE "contact_page" ADD COLUMN "inquiry_label" varchar DEFAULT 'Inquiry';
  ALTER TABLE "contact_page" ADD COLUMN "inquiry_body" varchar DEFAULT 'Write a short note about the place, the ambition, and the atmosphere you have in mind. We reply within a few working days.';
  ALTER TABLE "contact_page" ADD COLUMN "collaboration_label" varchar DEFAULT 'Collaboration';
  ALTER TABLE "contact_page" ADD COLUMN "collaboration_statement" varchar DEFAULT 'We work with private clients, developers, makers, and cultural collaborators who value restraint, clarity, and spaces that gather meaning slowly.';
  ALTER TABLE "contact_page" ADD COLUMN "closing_label" varchar DEFAULT 'Closing';
  ALTER TABLE "contact_page" ADD COLUMN "closing_statement" varchar DEFAULT 'The first conversation is simply a way to understand what should be protected, clarified, and made possible.';
  ALTER TABLE "contact_page" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "contact_page" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "work_page" ADD COLUMN "hero_label" varchar DEFAULT 'Work';
  ALTER TABLE "work_page" ADD COLUMN "hero_title" varchar DEFAULT 'A considered archive of spaces, materials, and atmosphere.';
  ALTER TABLE "work_page" ADD COLUMN "hero_intro" varchar DEFAULT 'A selection of residential, hospitality, interior, and architectural work - shaped through renovation, restraint, and a close reading of place.';
  ALTER TABLE "work_page" ADD COLUMN "hero_singular_project_label" varchar DEFAULT 'project';
  ALTER TABLE "work_page" ADD COLUMN "hero_plural_project_label" varchar DEFAULT 'projects';
  ALTER TABLE "work_page" ADD COLUMN "archive_aria_label" varchar DEFAULT 'Project archive';
  ALTER TABLE "work_page" ADD COLUMN "archive_empty_number_label" varchar DEFAULT 'No. 00';
  ALTER TABLE "work_page" ADD COLUMN "archive_empty_location_label" varchar DEFAULT 'Archive';
  ALTER TABLE "work_page" ADD COLUMN "archive_empty_year_label" varchar DEFAULT 'Pending';
  ALTER TABLE "work_page" ADD COLUMN "archive_empty_title" varchar DEFAULT 'Projects will appear here once Payload contains published work.';
  ALTER TABLE "work_page" ADD COLUMN "archive_plate_label" varchar DEFAULT 'Plate';
  ALTER TABLE "work_page" ADD COLUMN "archive_plate_placeholder" varchar DEFAULT 'Photograph to come';
  ALTER TABLE "work_page" ADD COLUMN "fallbacks_location" varchar DEFAULT 'Location forthcoming';
  ALTER TABLE "work_page" ADD COLUMN "fallbacks_year" varchar DEFAULT 'Undated';
  ALTER TABLE "work_page" ADD COLUMN "fallbacks_year_range" varchar DEFAULT 'Archive';
  ALTER TABLE "work_page" ADD COLUMN "fallbacks_project_description" varchar DEFAULT 'A quiet architectural study shaped by material restraint, atmosphere, and a close reading of place.';
  ALTER TABLE "project_detail_settings" ADD COLUMN "labels_statement" varchar DEFAULT 'Statement';
  ALTER TABLE "project_detail_settings" ADD COLUMN "labels_services" varchar DEFAULT 'Services';
  ALTER TABLE "project_detail_settings" ADD COLUMN "labels_area" varchar DEFAULT 'Area';
  ALTER TABLE "project_detail_settings" ADD COLUMN "labels_architect" varchar DEFAULT 'Architect';
  ALTER TABLE "project_detail_settings" ADD COLUMN "labels_status" varchar DEFAULT 'Status';
  ALTER TABLE "project_detail_settings" ADD COLUMN "labels_materials" varchar DEFAULT 'Materials';
  ALTER TABLE "project_detail_settings" ADD COLUMN "labels_next_project" varchar DEFAULT 'Next Project';
  ALTER TABLE "project_detail_settings" ADD COLUMN "fallbacks_category" varchar DEFAULT 'Project';
  ALTER TABLE "project_detail_settings" ADD COLUMN "fallbacks_location" varchar DEFAULT 'Location forthcoming';
  ALTER TABLE "project_detail_settings" ADD COLUMN "fallbacks_year" varchar DEFAULT 'Undated';
  ALTER TABLE "project_detail_settings" ADD COLUMN "fallbacks_description" varchar DEFAULT 'A quiet architectural study shaped through proportion, atmosphere, and material restraint.';
  ALTER TABLE "project_detail_settings" ADD COLUMN "service_labels_architecture" varchar DEFAULT 'Architecture';
  ALTER TABLE "project_detail_settings" ADD COLUMN "service_labels_interior_design" varchar DEFAULT 'Interior Design';
  ALTER TABLE "project_detail_settings" ADD COLUMN "service_labels_master_planning" varchar DEFAULT 'Master Planning';
  ALTER TABLE "project_detail_settings" ADD COLUMN "service_labels_furniture_design" varchar DEFAULT 'Furniture Design';
  ALTER TABLE "project_detail_settings" ADD COLUMN "service_labels_landscape" varchar DEFAULT 'Landscape';
  ALTER TABLE "project_detail_settings" ADD COLUMN "status_labels_built" varchar DEFAULT 'Built';
  ALTER TABLE "project_detail_settings" ADD COLUMN "status_labels_completed" varchar DEFAULT 'Completed';
  ALTER TABLE "project_detail_settings" ADD COLUMN "status_labels_concept" varchar DEFAULT 'Concept';
  ALTER TABLE "project_detail_settings" ADD COLUMN "status_labels_in_progress" varchar DEFAULT 'In Progress';
  ALTER TABLE "contact_form_settings" ADD COLUMN "labels_city" varchar DEFAULT 'City';
  ALTER TABLE "contact_form_settings" ADD COLUMN "labels_country" varchar DEFAULT 'Country';
  ALTER TABLE "contact_form_settings" ADD COLUMN "labels_name" varchar DEFAULT 'Name';
  ALTER TABLE "contact_form_settings" ADD COLUMN "labels_project_type" varchar DEFAULT 'Project Type';
  ALTER TABLE "contact_form_settings" ADD COLUMN "labels_estimated_budget" varchar DEFAULT 'Estimated Budget';
  ALTER TABLE "contact_form_settings" ADD COLUMN "labels_timeline" varchar DEFAULT 'Timeline';
  ALTER TABLE "contact_form_settings" ADD COLUMN "labels_message" varchar DEFAULT 'Message';
  ALTER TABLE "contact_form_settings" ADD COLUMN "labels_company" varchar DEFAULT 'Company';
  ALTER TABLE "contact_form_settings" ADD COLUMN "labels_submit" varchar DEFAULT 'Send inquiry ->';
  ALTER TABLE "contact_form_settings" ADD COLUMN "labels_studio_information" varchar DEFAULT 'Studio Information';
  ALTER TABLE "contact_form_settings" ADD COLUMN "messages_default_note" varchar DEFAULT 'Your inquiry will be saved securely in the studio CMS for review.';
  ALTER TABLE "contact_form_settings" ADD COLUMN "messages_success" varchar DEFAULT 'Thank you. Your inquiry has been received.';
  ALTER TABLE "contact_form_settings" ADD COLUMN "messages_email_error" varchar DEFAULT 'Please enter a valid email address.';
  ALTER TABLE "contact_form_settings" ADD COLUMN "messages_required_error" varchar DEFAULT 'Please complete your name, email, and message.';
  ALTER TABLE "contact_form_settings" ADD COLUMN "placeholders_message" varchar DEFAULT 'The place, the ambition, the constraints.';
  DO $$
  DECLARE
    mapping record;
    assignments text;
    temp_table text;
  BEGIN
    FOR mapping IN
      SELECT * FROM (VALUES
        ('media', 'media_locales'),
        ('project_categories', 'project_categories_locales'),
        ('projects_gallery', 'projects_gallery_locales'),
        ('projects', 'projects_locales'),
        ('_projects_v_version_gallery', '_projects_v_version_gallery_locales'),
        ('_projects_v', '_projects_v_locales'),
        ('site_settings_social_links', 'site_settings_social_links_locales'),
        ('site_settings', 'site_settings_locales'),
        ('contact_info', 'contact_info_locales'),
        ('navigation_items', 'navigation_items_locales'),
        ('seo_defaults', 'seo_defaults_locales'),
        ('home_page', 'home_page_locales'),
        ('studio_page_philosophy_paragraphs', 'studio_page_philosophy_paragraphs_locales'),
        ('studio_page_principles', 'studio_page_principles_locales'),
        ('studio_page_information', 'studio_page_information_locales'),
        ('studio_page', 'studio_page_locales'),
        ('contact_page', 'contact_page_locales'),
        ('work_page', 'work_page_locales'),
        ('project_detail_settings', 'project_detail_settings_locales'),
        ('contact_form_settings', 'contact_form_settings_locales')
      ) AS mappings(source_table, localized_table)
    LOOP
      temp_table := 'migration_' || mapping.localized_table;

      SELECT string_agg(
        format('%1$I = localized.%1$I', source.column_name),
        ', ' ORDER BY source.ordinal_position
      )
      INTO assignments
      FROM information_schema.columns AS source
      WHERE source.table_schema = 'public'
        AND source.table_name = mapping.source_table
        AND source.column_name <> 'id'
        AND EXISTS (
          SELECT 1
          FROM information_schema.columns AS localized
          WHERE localized.table_name = temp_table
            AND localized.column_name = source.column_name
        );

      IF assignments IS NOT NULL THEN
        EXECUTE format(
          'UPDATE %I AS source SET %s FROM %I AS localized WHERE source.id = localized._parent_id',
          mapping.source_table,
          assignments,
          temp_table
        );
      END IF;
    END LOOP;
  END $$;
  ALTER TABLE "media" ALTER COLUMN "alt" SET NOT NULL;
  ALTER TABLE "project_categories" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "site_settings_social_links" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "navigation_items" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "studio_page_philosophy_paragraphs" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "studio_page_principles" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "studio_page_information" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "studio_page_information" ALTER COLUMN "value" SET NOT NULL;
  ALTER TABLE "_projects_v" DROP COLUMN "snapshot";
  ALTER TABLE "_projects_v" DROP COLUMN "published_locale";
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum__projects_v_published_locale";`);
}
