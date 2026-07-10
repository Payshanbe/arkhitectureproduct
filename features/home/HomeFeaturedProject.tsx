import configPromise from "@payload-config";
import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { HomeFeaturedProjectMotion } from "@/features/home/HomeFeaturedProjectMotion";
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

function normalizeImageUrl(url?: string | null) {
  if (!url) {
    return placeholderFeaturedProject.coverSrc;
  }

  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
}

function normalizeProject(project: Project): FeaturedProject {
  const coverImage = isMedia(project.coverImage) ? project.coverImage : null;
  const category = isProjectCategory(project.category) ? project.category.title : "Project";
  const coverSrc = normalizeImageUrl(coverImage?.sizes?.large?.url ?? coverImage?.url);
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

async function getFeaturedProject(): Promise<FeaturedProject> {
  try {
    const payload = await getPayload({ config: configPromise });
    const projects = await payload.find({
      collection: "projects",
      depth: 2,
      limit: 1,
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

export async function HomeFeaturedProject() {
  const project = await getFeaturedProject();

  return (
    <Section className="bg-background" spacing="large">
      <HomeFeaturedProjectMotion>
        <Container>
          <div className="grid gap-8 border-t border-border pt-6 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <p
              className="text-[length:var(--font-size-label)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-label)] text-foreground-muted lg:col-span-3"
              data-featured-project-text
            >
              Featured Project
            </p>
            <div className="lg:col-span-7 lg:col-start-5" data-featured-project-text>
              <h2 className="font-display text-[length:var(--font-size-heading)] leading-[var(--line-height-heading)] tracking-[var(--letter-spacing-heading)] text-balance text-foreground">
                A slower look at one selected work.
              </h2>
            </div>
          </div>

          <article className="mt-[clamp(var(--space-20),11vw,var(--space-40))]">
            <div
              className="relative aspect-[4/5] overflow-hidden bg-surface sm:aspect-[16/10] lg:min-h-[72svh] lg:aspect-auto"
              data-featured-project-image-frame
            >
              <Image
                alt={project.coverAlt}
                className="h-full w-full object-cover"
                data-featured-project-image
                fill
                sizes="100vw"
                src={project.coverSrc}
              />
            </div>

            <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
              <div
                className="flex items-start justify-between gap-6 border-t border-border pt-4 text-[length:var(--font-size-label)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-label)] text-foreground-muted lg:col-span-3 lg:block lg:border-t-0 lg:pt-0"
                data-featured-project-text
              >
                <p>{project.category}</p>
                <p className="lg:mt-3">{project.location}</p>
                <p className="lg:mt-3">{project.year}</p>
              </div>

              <div className="lg:col-span-7 lg:col-start-5">
                <h3
                  className="font-display text-[length:clamp(3rem,7vw,8.25rem)] leading-[0.94] tracking-[var(--letter-spacing-heading)] text-balance text-foreground"
                  data-featured-project-text
                >
                  {project.title}
                </h3>

                <p
                  className="mt-8 max-w-[620px] text-pretty text-[length:var(--font-size-body-large)] leading-[var(--line-height-body-large)] text-foreground-secondary lg:mt-10"
                  data-featured-project-text
                >
                  {project.excerpt}
                </p>

                <Link
                  className="group mt-10 inline-flex text-[length:var(--font-size-ui)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-ui)] text-foreground transition-colors duration-base ease-architectural-out hover:text-accent focus-visible:text-accent"
                  data-featured-project-text
                  href={project.href}
                >
                  <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:100%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-base ease-architectural-out group-hover:bg-[length:0%_1px] group-focus-visible:bg-[length:0%_1px]">
                    View Project
                  </span>
                </Link>
              </div>
            </div>
          </article>
        </Container>
      </HomeFeaturedProjectMotion>
    </Section>
  );
}
