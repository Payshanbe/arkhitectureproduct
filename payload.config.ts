import path from "node:path";
import { fileURLToPath } from "node:url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Media } from "./payload/collections/Media.ts";
import { ContactSubmissions } from "./payload/collections/ContactSubmissions.ts";
import { Partners } from "./payload/collections/Partners.ts";
import { ProjectCategories } from "./payload/collections/ProjectCategories.ts";
import { Projects } from "./payload/collections/Projects.ts";
import { Users } from "./payload/collections/Users.ts";
import { getPayloadEnv } from "./payload/env.ts";
import { ContactInfo } from "./payload/globals/ContactInfo.ts";
import { ContactFormSettings } from "./payload/globals/ContactFormSettings.ts";
import { ContactPage } from "./payload/globals/ContactPage.ts";
import { HomePage } from "./payload/globals/HomePage.ts";
import { Navigation } from "./payload/globals/Navigation.ts";
import { ProjectDetailSettings } from "./payload/globals/ProjectDetailSettings.ts";
import { SeoDefaults } from "./payload/globals/SeoDefaults.ts";
import { SiteSettings } from "./payload/globals/SiteSettings.ts";
import { StudioPage } from "./payload/globals/StudioPage.ts";
import { WorkPage } from "./payload/globals/WorkPage.ts";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const payloadEnv = getPayloadEnv();

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: dirname,
    },
  },
  collections: [Users, Media, ProjectCategories, Projects, Partners, ContactSubmissions],
  globals: [
    SiteSettings,
    ContactInfo,
    Navigation,
    SeoDefaults,
    HomePage,
    StudioPage,
    ContactPage,
    WorkPage,
    ProjectDetailSettings,
    ContactFormSettings,
  ],
  localization: {
    defaultLocale: "ru",
    fallback: true,
    locales: [
      { code: "ru", label: "Русский" },
      { code: "tj", label: "Тоҷикӣ" },
    ],
  },
  db: postgresAdapter({
    migrationDir: path.resolve(dirname, "payload/migrations"),
    pool: {
      connectionString: payloadEnv.DATABASE_URI,
    },
    push: process.env.NODE_ENV !== "production",
  }),
  secret: payloadEnv.PAYLOAD_SECRET,
  serverURL: payloadEnv.NEXT_PUBLIC_SITE_URL,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "types/payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(dirname, "types/payload-schema.graphql"),
  },
});
