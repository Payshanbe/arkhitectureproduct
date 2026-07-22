import type { MetadataRoute } from "next";
import configPromise from "@payload-config";
import { getPayload } from "payload";

import { absoluteUrl } from "@/lib/seo/metadata";
import { localizePath, siteLocales } from "@/lib/i18n/config";
import type { Project } from "@/types/payload-types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const staticRoutes = ["", "/work", "/studio", "/contact"];

async function getPublishedProjects(): Promise<Project[]> {
  try {
    const payload = await getPayload({ config: configPromise });
    const projects = await payload.find({
      collection: "projects",
      depth: 0,
      limit: 100,
      sort: "-year",
      where: {
        published: {
          equals: true,
        },
      },
    });

    return projects.docs;
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getPublishedProjects();
  const now = new Date();
  const localizedStaticRoutes = siteLocales.flatMap((locale) =>
    staticRoutes.map((route) => ({ locale, route })),
  );
  const localizedProjects = siteLocales.flatMap((locale) =>
    projects.map((project) => ({ locale, project })),
  );

  return [
    ...localizedStaticRoutes.map(({ locale, route }) => ({
      alternates: {
        languages: {
          ru: absoluteUrl(localizePath(route || "/", "ru")),
          tg: absoluteUrl(localizePath(route || "/", "tj")),
        },
      },
      changeFrequency: "monthly" as const,
      lastModified: now,
      priority: route === "" ? 1 : 0.8,
      url: absoluteUrl(localizePath(route || "/", locale)),
    })),
    ...localizedProjects.map(({ locale, project }) => ({
      alternates: {
        languages: {
          ru: absoluteUrl(localizePath(`/work/${project.slug}`, "ru")),
          tg: absoluteUrl(localizePath(`/work/${project.slug}`, "tj")),
        },
      },
      changeFrequency: "monthly" as const,
      lastModified: project.updatedAt ? new Date(project.updatedAt) : now,
      priority: 0.7,
      url: absoluteUrl(localizePath(`/work/${project.slug}`, locale)),
    })),
  ];
}
