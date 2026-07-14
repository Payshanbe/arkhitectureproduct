import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_media_orientation" AS ENUM('landscape', 'portrait', 'square');
  CREATE TYPE "public"."enum_projects_services" AS ENUM('architecture', 'interior-design', 'master-planning', 'furniture-design', 'landscape');
  CREATE TYPE "public"."enum_projects_gallery_orientation" AS ENUM('landscape', 'portrait', 'square');
  CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_projects_building_type" AS ENUM('residential', 'interior', 'architecture', 'hospitality');
  CREATE TYPE "public"."enum__projects_v_version_services" AS ENUM('architecture', 'interior-design', 'master-planning', 'furniture-design', 'landscape');
  CREATE TYPE "public"."enum__projects_v_version_gallery_orientation" AS ENUM('landscape', 'portrait', 'square');
  CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_version_building_type" AS ENUM('residential', 'interior', 'architecture', 'hospitality');
  CREATE TYPE "public"."enum_contact_submissions_status" AS ENUM('new', 'reviewed', 'replied', 'archived');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"role" "enum_users_role" DEFAULT 'admin' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"orientation" "enum_media_orientation",
  	"photographer" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar
  );
  
  CREATE TABLE "project_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "projects_services" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_projects_services",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "projects_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"alt_text" varchar,
  	"orientation" "enum_projects_gallery_orientation",
  	"order" numeric DEFAULT 0
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"tagline" varchar,
  	"category_id" integer,
  	"location" varchar,
  	"city" varchar,
  	"country" varchar,
  	"year" numeric,
  	"status" "enum_projects_status",
  	"building_type" "enum_projects_building_type",
  	"area" varchar,
  	"architect" varchar,
  	"client" varchar,
  	"photographer" varchar,
  	"cover_image_id" integer,
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
  	"featured" boolean DEFAULT false,
  	"published" boolean DEFAULT false,
  	"order" numeric DEFAULT 0,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_canonical" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_projects_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "projects_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "projects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer
  );
  
  CREATE TABLE "_projects_v_version_services" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__projects_v_version_services",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_projects_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"alt_text" varchar,
  	"orientation" "enum__projects_v_version_gallery_orientation",
  	"order" numeric DEFAULT 0,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_tagline" varchar,
  	"version_category_id" integer,
  	"version_location" varchar,
  	"version_city" varchar,
  	"version_country" varchar,
  	"version_year" numeric,
  	"version_status" "enum__projects_v_version_status",
  	"version_building_type" "enum__projects_v_version_building_type",
  	"version_area" varchar,
  	"version_architect" varchar,
  	"version_client" varchar,
  	"version_photographer" varchar,
  	"version_cover_image_id" integer,
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
  	"version_featured" boolean DEFAULT false,
  	"version_published" boolean DEFAULT false,
  	"version_order" numeric DEFAULT 0,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_seo_canonical" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__projects_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_projects_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_projects_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer
  );
  
  CREATE TABLE "contact_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"project_type" varchar,
  	"estimated_budget" varchar,
  	"timeline" varchar,
  	"message" varchar NOT NULL,
  	"source" varchar DEFAULT 'Contact page',
  	"status" "enum_contact_submissions_status" DEFAULT 'new',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"project_categories_id" integer,
  	"projects_id" integer,
  	"contact_submissions_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'Arkhitecture' NOT NULL,
  	"tagline" varchar,
  	"site_description" varchar,
  	"studio_description" varchar,
  	"footer_description" varchar,
  	"copyright" varchar,
  	"logo_id" integer,
  	"favicon_id" integer,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_canonical" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "contact_info" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"address" varchar,
  	"google_maps" varchar,
  	"instagram" varchar,
  	"linkedin" varchar,
  	"behance" varchar,
  	"pinterest" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "navigation_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"order" numeric DEFAULT 0,
  	"visible" boolean DEFAULT true
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "seo_defaults" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"default_title" varchar DEFAULT 'Arkhitecture' NOT NULL,
  	"title_template" varchar DEFAULT '%s | Arkhitecture',
  	"default_description" varchar,
  	"default_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_label" varchar DEFAULT 'Architecture Studio',
  	"hero_heading" varchar DEFAULT 'Architecture shaped by light, material, and restraint.' NOT NULL,
  	"hero_supporting_text" varchar DEFAULT 'A cinematic portfolio for spaces that feel calm, precise, and quietly enduring.',
  	"hero_image_id" integer,
  	"hero_location_line" varchar DEFAULT 'Tashkent, UZ 41.3°N 69.2°E',
  	"selected_projects_label" varchar DEFAULT 'Selected Work',
  	"selected_projects_heading" varchar DEFAULT 'A quiet sequence of spaces shaped by proportion, material, and light.',
  	"selected_projects_archive_link_label" varchar DEFAULT 'View the archive →',
  	"studio_intro_label" varchar DEFAULT 'Our Approach',
  	"studio_intro_statement" varchar DEFAULT 'We design spaces through atmosphere, restraint, and a close reading of context.',
  	"studio_intro_body" varchar DEFAULT 'The studio approaches each project as a careful composition of light, material, proportion, and daily ritual. The result is architecture that feels calm, precise, and quietly enduring.',
  	"studio_intro_link_label" varchar DEFAULT 'Learn More',
  	"studio_intro_link_href" varchar DEFAULT '/studio',
  	"featured_project_label" varchar DEFAULT 'Featured Project',
  	"featured_project_heading" varchar DEFAULT 'A slower look at one selected work.',
  	"featured_project_link_label" varchar DEFAULT 'View Project →',
  	"contact_label" varchar DEFAULT 'Let''s Connect',
  	"contact_statement" varchar DEFAULT 'Begin with a conversation about place, atmosphere, and what should endure.',
  	"contact_body" varchar DEFAULT 'For residences, interiors, and architectural collaborations, send a brief note and we will reply with a considered next step.',
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_canonical" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "studio_page_philosophy_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "studio_page_principles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "studio_page_information" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "studio_page" (
  	"id" serial PRIMARY KEY NOT NULL,
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
  	"seo_image_id" integer,
  	"seo_canonical" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "studio_page_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
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
  	"seo_image_id" integer,
  	"seo_canonical" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_page_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "work_page" (
  	"id" serial PRIMARY KEY NOT NULL,
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
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "project_detail_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
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
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_form_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"labels_email" varchar DEFAULT 'Email',
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
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_services" ADD CONSTRAINT "projects_services_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_gallery" ADD CONSTRAINT "projects_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_gallery" ADD CONSTRAINT "projects_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_category_id_project_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."project_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_texts" ADD CONSTRAINT "projects_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_services" ADD CONSTRAINT "_projects_v_version_services_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_gallery" ADD CONSTRAINT "_projects_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_version_gallery" ADD CONSTRAINT "_projects_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_category_id_project_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."project_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_texts" ADD CONSTRAINT "_projects_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_project_categories_fk" FOREIGN KEY ("project_categories_id") REFERENCES "public"."project_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_submissions_fk" FOREIGN KEY ("contact_submissions_id") REFERENCES "public"."contact_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_links" ADD CONSTRAINT "site_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_texts" ADD CONSTRAINT "site_settings_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_items" ADD CONSTRAINT "navigation_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seo_defaults" ADD CONSTRAINT "seo_defaults_default_image_id_media_id_fk" FOREIGN KEY ("default_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_texts" ADD CONSTRAINT "home_page_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "studio_page_philosophy_paragraphs" ADD CONSTRAINT "studio_page_philosophy_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."studio_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "studio_page_principles" ADD CONSTRAINT "studio_page_principles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."studio_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "studio_page_information" ADD CONSTRAINT "studio_page_information_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."studio_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "studio_page" ADD CONSTRAINT "studio_page_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "studio_page_texts" ADD CONSTRAINT "studio_page_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."studio_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_texts" ADD CONSTRAINT "contact_page_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE UNIQUE INDEX "project_categories_slug_idx" ON "project_categories" USING btree ("slug");
  CREATE INDEX "project_categories_updated_at_idx" ON "project_categories" USING btree ("updated_at");
  CREATE INDEX "project_categories_created_at_idx" ON "project_categories" USING btree ("created_at");
  CREATE INDEX "projects_services_order_idx" ON "projects_services" USING btree ("order");
  CREATE INDEX "projects_services_parent_idx" ON "projects_services" USING btree ("parent_id");
  CREATE INDEX "projects_gallery_order_idx" ON "projects_gallery" USING btree ("_order");
  CREATE INDEX "projects_gallery_parent_id_idx" ON "projects_gallery" USING btree ("_parent_id");
  CREATE INDEX "projects_gallery_image_idx" ON "projects_gallery" USING btree ("image_id");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "projects_category_idx" ON "projects" USING btree ("category_id");
  CREATE INDEX "projects_cover_image_idx" ON "projects" USING btree ("cover_image_id");
  CREATE INDEX "projects_published_idx" ON "projects" USING btree ("published");
  CREATE INDEX "projects_order_idx" ON "projects" USING btree ("order");
  CREATE INDEX "projects_seo_seo_image_idx" ON "projects" USING btree ("seo_image_id");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects__status_idx" ON "projects" USING btree ("_status");
  CREATE INDEX "projects_texts_order_parent" ON "projects_texts" USING btree ("order","parent_id");
  CREATE INDEX "projects_rels_order_idx" ON "projects_rels" USING btree ("order");
  CREATE INDEX "projects_rels_parent_idx" ON "projects_rels" USING btree ("parent_id");
  CREATE INDEX "projects_rels_path_idx" ON "projects_rels" USING btree ("path");
  CREATE INDEX "projects_rels_projects_id_idx" ON "projects_rels" USING btree ("projects_id");
  CREATE INDEX "_projects_v_version_services_order_idx" ON "_projects_v_version_services" USING btree ("order");
  CREATE INDEX "_projects_v_version_services_parent_idx" ON "_projects_v_version_services" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_gallery_order_idx" ON "_projects_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_projects_v_version_gallery_parent_id_idx" ON "_projects_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_gallery_image_idx" ON "_projects_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");
  CREATE INDEX "_projects_v_version_version_category_idx" ON "_projects_v" USING btree ("version_category_id");
  CREATE INDEX "_projects_v_version_version_cover_image_idx" ON "_projects_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_projects_v_version_version_published_idx" ON "_projects_v" USING btree ("version_published");
  CREATE INDEX "_projects_v_version_version_order_idx" ON "_projects_v" USING btree ("version_order");
  CREATE INDEX "_projects_v_version_seo_version_seo_image_idx" ON "_projects_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
  CREATE INDEX "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
  CREATE INDEX "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");
  CREATE INDEX "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
  CREATE INDEX "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
  CREATE INDEX "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");
  CREATE INDEX "_projects_v_texts_order_parent" ON "_projects_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "_projects_v_rels_order_idx" ON "_projects_v_rels" USING btree ("order");
  CREATE INDEX "_projects_v_rels_parent_idx" ON "_projects_v_rels" USING btree ("parent_id");
  CREATE INDEX "_projects_v_rels_path_idx" ON "_projects_v_rels" USING btree ("path");
  CREATE INDEX "_projects_v_rels_projects_id_idx" ON "_projects_v_rels" USING btree ("projects_id");
  CREATE INDEX "contact_submissions_updated_at_idx" ON "contact_submissions" USING btree ("updated_at");
  CREATE INDEX "contact_submissions_created_at_idx" ON "contact_submissions" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_project_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("project_categories_id");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_contact_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_submissions_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_social_links_order_idx" ON "site_settings_social_links" USING btree ("_order");
  CREATE INDEX "site_settings_social_links_parent_id_idx" ON "site_settings_social_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_favicon_idx" ON "site_settings" USING btree ("favicon_id");
  CREATE INDEX "site_settings_seo_seo_image_idx" ON "site_settings" USING btree ("seo_image_id");
  CREATE INDEX "site_settings_texts_order_parent" ON "site_settings_texts" USING btree ("order","parent_id");
  CREATE INDEX "navigation_items_order_idx" ON "navigation_items" USING btree ("_order");
  CREATE INDEX "navigation_items_parent_id_idx" ON "navigation_items" USING btree ("_parent_id");
  CREATE INDEX "seo_defaults_default_image_idx" ON "seo_defaults" USING btree ("default_image_id");
  CREATE INDEX "home_page_hero_hero_image_idx" ON "home_page" USING btree ("hero_image_id");
  CREATE INDEX "home_page_seo_seo_image_idx" ON "home_page" USING btree ("seo_image_id");
  CREATE INDEX "home_page_texts_order_parent" ON "home_page_texts" USING btree ("order","parent_id");
  CREATE INDEX "studio_page_philosophy_paragraphs_order_idx" ON "studio_page_philosophy_paragraphs" USING btree ("_order");
  CREATE INDEX "studio_page_philosophy_paragraphs_parent_id_idx" ON "studio_page_philosophy_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "studio_page_principles_order_idx" ON "studio_page_principles" USING btree ("_order");
  CREATE INDEX "studio_page_principles_parent_id_idx" ON "studio_page_principles" USING btree ("_parent_id");
  CREATE INDEX "studio_page_information_order_idx" ON "studio_page_information" USING btree ("_order");
  CREATE INDEX "studio_page_information_parent_id_idx" ON "studio_page_information" USING btree ("_parent_id");
  CREATE INDEX "studio_page_seo_seo_image_idx" ON "studio_page" USING btree ("seo_image_id");
  CREATE INDEX "studio_page_texts_order_parent" ON "studio_page_texts" USING btree ("order","parent_id");
  CREATE INDEX "contact_page_seo_seo_image_idx" ON "contact_page" USING btree ("seo_image_id");
  CREATE INDEX "contact_page_texts_order_parent" ON "contact_page_texts" USING btree ("order","parent_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "project_categories" CASCADE;
  DROP TABLE "projects_services" CASCADE;
  DROP TABLE "projects_gallery" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_texts" CASCADE;
  DROP TABLE "projects_rels" CASCADE;
  DROP TABLE "_projects_v_version_services" CASCADE;
  DROP TABLE "_projects_v_version_gallery" CASCADE;
  DROP TABLE "_projects_v" CASCADE;
  DROP TABLE "_projects_v_texts" CASCADE;
  DROP TABLE "_projects_v_rels" CASCADE;
  DROP TABLE "contact_submissions" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_social_links" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_texts" CASCADE;
  DROP TABLE "contact_info" CASCADE;
  DROP TABLE "navigation_items" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "seo_defaults" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "home_page_texts" CASCADE;
  DROP TABLE "studio_page_philosophy_paragraphs" CASCADE;
  DROP TABLE "studio_page_principles" CASCADE;
  DROP TABLE "studio_page_information" CASCADE;
  DROP TABLE "studio_page" CASCADE;
  DROP TABLE "studio_page_texts" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "contact_page_texts" CASCADE;
  DROP TABLE "work_page" CASCADE;
  DROP TABLE "project_detail_settings" CASCADE;
  DROP TABLE "contact_form_settings" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_media_orientation";
  DROP TYPE "public"."enum_projects_services";
  DROP TYPE "public"."enum_projects_gallery_orientation";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum_projects_building_type";
  DROP TYPE "public"."enum__projects_v_version_services";
  DROP TYPE "public"."enum__projects_v_version_gallery_orientation";
  DROP TYPE "public"."enum__projects_v_version_status";
  DROP TYPE "public"."enum__projects_v_version_building_type";
  DROP TYPE "public"."enum_contact_submissions_status";`)
}
