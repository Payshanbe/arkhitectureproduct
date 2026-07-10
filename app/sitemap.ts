import type { MetadataRoute } from "next";
import configPromise from "@payload-config";
import { getPayload } from "payload";

import { absoluteUrl } from "@/lib/seo/metadata";
import type { Project } from "@/types/payload-types";

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

  return [
    ...staticRoutes.map((route) => ({
      changeFrequency: "monthly" as const,
      lastModified: now,
      priority: route === "" ? 1 : 0.8,
      url: absoluteUrl(route || "/"),
    })),
    ...projects.map((project) => ({
      changeFrequency: "monthly" as const,
      lastModified: project.updatedAt ? new Date(project.updatedAt) : now,
      priority: 0.7,
      url: absoluteUrl(`/work/${project.slug}`),
    })),
  ];
}

