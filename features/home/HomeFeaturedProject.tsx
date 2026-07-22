import configPromise from "@payload-config";
import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { HomeFeaturedProjectMotion } from "@/features/home/HomeFeaturedProjectMotion";
import { normalizePayloadImageUrl } from "@/lib/cms/media";
import type { HomePageContent } from "@/lib/cms/siteContent";
import { defaultLocale, localizePath, type SiteLocale } from "@/lib/i18n/config";
import type { Media, Project, ProjectCategory } from "@/types/payload-types";

interface FeaturedProject {
  category: string;
  coverAlt: string;
  coverSrc: string;
  excerpt: string;
  href: string;
  id: string;
  location: string;
  title: string;
  year: string;
}

const placeholderFeaturedProject: FeaturedProject = {
  category: "Residential",
  coverAlt:
    "Warm minimal architectural interior opening to a calm courtyard with stone, plaster, wood, and soft morning light.",
  coverSrc: "/images/home-hero-placeholder.png",
  excerpt:
    "A quiet study in stone, shade, and open thresholds, shaped around natural light and a restrained material language.",
  href: "/work/courtyard-residence",
  id: "placeholder-featured-courtyard-residence",
  location: "Mediterranean Coast",
  title: "Courtyard Residence",
  year: "2026",
};

function isMedia(value: Project["coverImage"]): value is Media {
  return typeof value === "object" && value !== null;
}

function isProjectCategory(value: Project["category"]): value is ProjectCategory {
  return typeof value === "object" && value !== null;
}

function normalizeProject(project: Project): FeaturedProject {
  const coverImage = isMedia(project.coverImage) ? project.coverImage : null;
  const category = isProjectCategory(project.category) ? project.category.title : "Project";
  const coverSrc = normalizePayloadImageUrl(
    coverImage?.sizes?.large?.url ?? coverImage?.url,
    placeholderFeaturedProject.coverSrc,
  );
  const location = [project.location, project.country].filter(Boolean).join(", ");

  return {
    category,
    coverAlt: coverImage?.alt ?? `${project.title} architectural project image.`,
    coverSrc,
    excerpt:
      project.shortDescription ??
      project.concept ??
      "A selected architectural work shaped through proportion, material, atmosphere, and light.",
    href: `/work/${project.slug}`,
    id: String(project.id),
    location: location || "Location forthcoming",
    title: project.title,
    year: project.year ? String(project.year) : "Undated",
  };
}

async function getFeaturedProject(locale: SiteLocale): Promise<FeaturedProject> {
  try {
    const payload = await getPayload({ config: configPromise });
    const projects = await payload.find({
      collection: "projects",
      depth: 2,
      fallbackLocale: defaultLocale,
      limit: 1,
      locale,
      sort: "order",
      where: {
        and: [
          {
            featured: {
              equals: true,
            },
          },
          {
            published: {
              equals: true,
            },
          },
        ],
      },
    });

    const [project] = projects.docs;

    if (!project) {
      return placeholderFeaturedProject;
    }

    return normalizeProject(project);
  } catch {
    return placeholderFeaturedProject;
  }
}

interface HomeFeaturedProjectProps {
  content?: HomePageContent["featuredProject"];
  locale: SiteLocale;
}

export async function HomeFeaturedProject({ content, locale }: HomeFeaturedProjectProps) {
  const projectDocument = await getFeaturedProject(locale);
  const project = {
    ...projectDocument,
    href: localizePath(projectDocument.href, locale),
  };

  return (
    <Section className="bg-background" spacing="medium">
      <HomeFeaturedProjectMotion>
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <div className="flex items-center gap-8 lg:col-span-3" data-featured-project-text>
              <p className="type-label text-foreground-muted">
                {content?.label ?? "Featured Project"}
              </p>
              <span className="hidden h-px flex-1 bg-border lg:block" aria-hidden="true" />
            </div>
            <div className="lg:col-span-4 lg:col-start-5" data-featured-project-text>
              <h2 className="type-section-heading text-foreground">
                {content?.heading ?? "A slower look at one selected work."}
              </h2>
            </div>
          </div>
        </Container>

        <article className="mt-[clamp(var(--space-12),6vw,var(--space-20))]">
          <Link
            aria-label={`View project: ${project.title}`}
            className="group block"
            href={project.href}
          >
            <div
              className="editorial-image-frame relative aspect-[4/5] overflow-hidden bg-surface sm:aspect-[16/9] lg:aspect-[21/9]"
              data-featured-project-image-frame
            >
              <Image
                alt={project.coverAlt}
                className="image-editorial h-full w-full object-cover transition-transform duration-slow ease-architectural-out group-hover:scale-[1.01]"
                data-featured-project-image
                fill
                sizes="100vw"
                src={project.coverSrc}
              />
            </div>
          </Link>

          <Container as="div" className="mt-7 lg:mt-8">
            <div className="grid gap-8 border-t border-border/60 pt-5 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
              <div
                className="flex items-start justify-between gap-6 type-label text-foreground-muted lg:col-span-3 lg:block"
                data-featured-project-text
              >
                <p>{project.category}</p>
                <p className="lg:mt-2">{project.location}</p>
                <p className="lg:mt-2">{project.year}</p>
              </div>

              <div className="lg:col-span-5 lg:col-start-5">
                <h3 className="type-project-title text-foreground" data-featured-project-text>
                  {project.title}
                </h3>

                <p
                  className="mt-5 max-w-[420px] text-pretty type-body text-foreground-secondary"
                  data-featured-project-text
                >
                  {project.excerpt}
                </p>
              </div>

              <div
                className="lg:col-span-2 lg:col-start-11 lg:text-right"
                data-featured-project-text
              >
                <Link
                  className="plate-link inline-flex type-label text-foreground"
                  href={project.href}
                >
                  <span className="plate-link-underline">
                    {content?.linkLabel ?? "View Project →"}
                  </span>
                </Link>
              </div>
            </div>
          </Container>
        </article>
      </HomeFeaturedProjectMotion>
    </Section>
  );
}
