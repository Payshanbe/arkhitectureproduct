import configPromise from "@payload-config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

import { Page } from "@/components/layout/Page";
import { ProjectDetail } from "@/features/work/ProjectDetail";
import {
  defaultLocale,
  getOpenGraphLocale,
  isSiteLocale,
  localizePath,
  type SiteLocale,
} from "@/lib/i18n/config";
import { absoluteUrl, compactStrings, siteConfig, truncate } from "@/lib/seo/metadata";
import type { Media, Project, ProjectCategory } from "@/types/payload-types";

interface ProjectPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

const serviceLabels: Record<NonNullable<Project["services"]>[number], string> = {
  architecture: "Architecture",
  "furniture-design": "Furniture Design",
  "interior-design": "Interior Design",
  landscape: "Landscape",
  "master-planning": "Master Planning",
};

const statusLabels: Record<NonNullable<Project["status"]>, string> = {
  built: "Built",
  completed: "Completed",
  concept: "Concept",
  "in-progress": "In Progress",
};

function isMedia(
  value: Project["coverImage"] | NonNullable<Project["seo"]>["image"],
): value is Media {
  return typeof value === "object" && value !== null;
}

function isProjectCategory(value: Project["category"]): value is ProjectCategory {
  return typeof value === "object" && value !== null;
}

function normalizeLocation(project: Project) {
  return (
    [project.city ?? project.location, project.country].filter(Boolean).join(", ") || undefined
  );
}

function getProjectDetails(project: Project) {
  return compactStrings([
    normalizeLocation(project),
    project.year ? String(project.year) : undefined,
    isProjectCategory(project.category) ? project.category.title : undefined,
    project.services?.map((service) => serviceLabels[service]).join(", "),
    project.area,
    project.architect,
    project.status ? statusLabels[project.status] : undefined,
  ]);
}

async function getPublishedProject(slug: string, locale: SiteLocale): Promise<Project | null> {
  try {
    const payload = await getPayload({ config: configPromise });
    const projects = await payload.find({
      collection: "projects",
      depth: 2,
      fallbackLocale: defaultLocale,
      limit: 1,
      locale,
      where: {
        and: [{ slug: { equals: slug } }, { published: { equals: true } }],
      },
    });

    return projects.docs[0] ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isSiteLocale(locale)) {
    return {};
  }

  const project = await getPublishedProject(slug, locale);

  if (!project) {
    return {
      robots: { follow: false, index: false },
      title: locale === "tj" ? "Лоиҳа ёфт нашуд" : "Проект не найден",
    };
  }

  const details = getProjectDetails(project);
  const title = project.seo?.title ?? project.title;
  const summary =
    project.seo?.description ??
    project.excerpt ??
    project.description ??
    project.shortDescription ??
    project.concept ??
    details.join(" - ");
  const description = truncate([summary, details.join(" - ")].filter(Boolean).join(" "), 180);
  const seoImage = isMedia(project.seo?.image) ? project.seo?.image : null;
  const coverImage = isMedia(project.coverImage) ? project.coverImage : null;
  const image = seoImage ?? coverImage;
  const imageUrl = image?.sizes?.large?.url ?? image?.url;
  const path = localizePath(`/work/${project.slug}`, locale);
  const canonical = absoluteUrl(project.seo?.canonical ?? path);

  return {
    alternates: {
      canonical,
      languages: {
        ru: absoluteUrl(localizePath(`/work/${project.slug}`, "ru")),
        tg: absoluteUrl(localizePath(`/work/${project.slug}`, "tj")),
      },
    },
    description,
    keywords: compactStrings([...(project.seo?.keywords ?? []), project.title, ...details]),
    openGraph: {
      description,
      images: imageUrl
        ? [{ alt: image?.alt ?? project.title, url: absoluteUrl(imageUrl) }]
        : undefined,
      locale: getOpenGraphLocale(locale),
      siteName: siteConfig.name,
      title,
      type: "article",
      url: canonical,
    },
    title,
    twitter: {
      card: "summary_large_image",
      description,
      images: imageUrl ? [absoluteUrl(imageUrl)] : undefined,
      title,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;

  if (!isSiteLocale(locale)) {
    notFound();
  }

  return (
    <Page>
      <ProjectDetail locale={locale} slug={slug} />
    </Page>
  );
}
