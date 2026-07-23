import path from "node:path";
import { fileURLToPath } from "node:url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Media } from "./payload/collections/Media.ts";
import { ContactSubmissions } from "./payload/collections/ContactSubmissions.ts";
import { Partners } from "./payload/collections/Partners.ts";
import { ProjectCategories } from "./payload/collections/ProjectCategories.ts";
import { Projects } from "./payload/collections/Projects.ts";
import { Users } from "./payload/collections/Users.ts";
import { getPayloadEnv, getVercelBlobToken } from "./payload/env.ts";
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
const vercelBlobToken = getVercelBlobToken();

function getOrigin(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  try {
    const url = new URL(value.includes("://") ? value : `https://${value}`);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return undefined;
    }

    return url.origin;
  } catch {
    return undefined;
  }
}

const trustedOrigins = Array.from(
  new Set(
    [
      payloadEnv.NEXT_PUBLIC_SITE_URL,
      process.env.VERCEL_URL,
      process.env.VERCEL_BRANCH_URL,
      process.env.VERCEL_PROJECT_PRODUCTION_URL,
    ]
      .map(getOrigin)
      .filter(Boolean),
  ),
) as string[];

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: dirname,
    },
  },
  collections: [Users, Media, ProjectCategories, Projects, Partners, ContactSubmissions],
  cors: trustedOrigins,
  csrf: trustedOrigins,
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
    disable: process.env.NODE_ENV === "production",
    schemaOutputFile: path.resolve(dirname, "types/payload-schema.graphql"),
  },
  plugins: [
    vercelBlobStorage({
      addRandomSuffix: false,
      clientUploads: true,
      collections: {
        media: true,
      },
      token: vercelBlobToken,
    }),
  ],
  telemetry: false,
});
