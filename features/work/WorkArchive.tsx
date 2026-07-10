import configPromise from "@payload-config";
import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { WorkArchiveMotion } from "@/features/work/WorkArchiveMotion";
import type { Media, Project, ProjectCategory } from "@/types/payload-types";
import { cn } from "@/utils/cn";

interface ArchiveProject {
  category: string;
  coverAlt: string;
  coverSrc: string;
  href: string;
  id: string;
  location: string;
  title: string;
  year: string;
}

function isMedia(value: Project["coverImage"]): value is Media {
  return typeof value === "object" && value !== null;
}

function isProjectCategory(value: Project["category"]): value is ProjectCategory {
  return typeof value === "object" && value !== null;
}

function normalizeImageUrl(url?: string | null) {
  if (!url) {
    return "/images/home-hero-placeholder.png";
  }

  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
}

function normalizeLocation(project: Project) {
  const primaryLocation = project.city ?? project.location;
  const location = [primaryLocation, project.country].filter(Boolean).join(", ");

  return location || "Location forthcoming";
}

function normalizeProject(project: Project): ArchiveProject {
  const coverImage = isMedia(project.coverImage) ? project.coverImage : null;
  const category = isProjectCategory(project.category) ? project.category.title : "Project";
  const coverSrc = normalizeImageUrl(coverImage?.sizes?.large?.url ?? coverImage?.url);

  return {
    category,
    coverAlt: coverImage?.alt ?? `${project.title} architectural project image.`,
    coverSrc,
    href: `/work/${project.slug}`,
    id: String(project.id),
    location: normalizeLocation(project),
    title: project.title,
    year: project.year ? String(project.year) : "Undated",
  };
}

async function getArchiveProjects(): Promise<ArchiveProject[]> {
  try {
    const payload = await getPayload({ config: configPromise });
    const projects = await payload.find({
      collection: "projects",
      depth: 2,
      limit: 100,
      sort: "-year",
      where: {
        published: {
          equals: true,
        },
      },
    });

    return projects.docs.map(normalizeProject);
  } catch {
    return [];
  }
}

const layoutPatterns = [
  {
    aspect: "aspect-[5/4] sm:aspect-[16/9] lg:aspect-[21/10]",
    image: "lg:col-span-10 lg:col-start-2",
    metadata: "lg:col-span-2 lg:col-start-11",
    sizes: "(min-width: 1024px) 83vw, 100vw",
  },
  {
    aspect: "aspect-[4/5] sm:aspect-[3/2] lg:aspect-[4/5]",
    image: "lg:col-span-6 lg:col-start-2",
    metadata: "lg:col-span-2 lg:col-start-9",
    sizes: "(min-width: 1024px) 50vw, 100vw",
  },
  {
    aspect: "aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/9]",
    image: "lg:col-span-9 lg:col-start-4",
    metadata: "lg:col-span-2",
    sizes: "(min-width: 1024px) 75vw, 100vw",
  },
  {
    aspect: "aspect-[4/5] sm:aspect-[16/10] lg:aspect-[3/2]",
    image: "lg:col-span-7 lg:col-start-5",
    metadata: "lg:col-span-2 lg:col-start-2",
    sizes: "(min-width: 1024px) 58vw, 100vw",
  },
];

export async function WorkArchive() {
  const projects = await getArchiveProjects();

  return (
    <WorkArchiveMotion>
      <Section className="bg-background pt-[calc(var(--section-spacing-large)+var(--space-20))]">
        <Container>
          <div
            className="grid gap-8 border-t border-border pt-6 lg:grid-cols-12 lg:gap-[var(--grid-gap)]"
            data-work-reveal
          >
            <p className="type-label text-foreground-muted lg:col-span-3">
              Work
            </p>

            <div className="lg:col-span-7 lg:col-start-5">
              <h1 className="type-display text-foreground">
                A considered archive of spaces, materials, and atmosphere.
              </h1>

              <p className="mt-8 max-w-[620px] text-pretty text-[length:var(--font-size-body-large)] leading-[var(--line-height-body-large)] text-foreground-secondary">
                A selection of residential, hospitality, interior, and architectural work shaped
                through proportion, restraint, and a close reading of place.
              </p>

              {projects.length > 0 ? (
                <p className="mt-10 type-label text-foreground-muted">
                  {projects.length} {projects.length === 1 ? "Project" : "Projects"}
                </p>
              ) : null}
            </div>
          </div>
        </Container>
      </Section>

      <Section
        className="bg-background py-[var(--section-spacing-large)] pt-[calc(var(--section-spacing-large)+var(--space-12))]"
        spacing="none"
      >
        <Container>
          {projects.length > 0 ? (
            <div className="space-y-[clamp(var(--space-30),14vw,280px)]">
              {projects.map((project, index) => {
                const layout = layoutPatterns[index % layoutPatterns.length];

                return (
                  <article
                    className="grid gap-7 lg:grid-cols-12 lg:gap-[var(--grid-gap)]"
                    data-work-reveal
                    key={project.id}
                  >
                    <div
                      className={cn(
                        "order-2 flex items-start justify-between gap-5 type-label text-foreground-muted lg:order-1 lg:block",
                        layout.metadata,
                      )}
                    >
                      <p aria-hidden="true" className="hidden font-display text-[length:var(--font-size-project-title)] leading-none text-foreground lg:block">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <p className="lg:mt-6">{project.category}</p>
                      <p className="lg:mt-3">{project.location}</p>
                      <p className="lg:mt-3">{project.year}</p>
                    </div>

                    <div className={cn("order-1 lg:order-2", layout.image)}>
                      <Link
                        aria-label={`View project: ${project.title}`}
                        className="plate-link group block"
                        href={project.href}
                      >
                        <div
                          className={cn(
                            "editorial-image-frame relative overflow-hidden bg-surface",
                            layout.aspect,
                          )}
                          data-work-image-frame
                        >
                          <Image
                            alt={project.coverAlt}
                            className="image-editorial h-full w-full object-cover transition-[opacity,transform] duration-slow ease-architectural-out group-hover:scale-[1.015] group-hover:opacity-95"
                            data-work-image
                            fill
                            sizes={layout.sizes}
                            src={project.coverSrc}
                          />
                        </div>

                        <div className="mt-5 border-t border-border/60 pt-4">
                          <h2 className="type-project-title text-foreground">
                            <span className="plate-link-underline">{project.title}</span>
                          </h2>
                        </div>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div
              className="grid gap-8 border-t border-border pt-6 lg:grid-cols-12 lg:gap-[var(--grid-gap)]"
              data-work-reveal
            >
              <p className="type-label text-foreground-muted lg:col-span-3">
                Archive
              </p>

              <p className="max-w-[620px] text-pretty text-[length:var(--font-size-body-large)] leading-[var(--line-height-body-large)] text-foreground-secondary lg:col-span-6 lg:col-start-5">
                Published projects will appear here once the CMS contains archive content.
              </p>
            </div>
          )}
        </Container>
      </Section>
    </WorkArchiveMotion>
  );
}
