import configPromise from "@payload-config";
import Image from "next/image";
import { getPayload } from "payload";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { HomeSelectedProjectsMotion } from "@/features/home/HomeSelectedProjectsMotion";
import type { Media, Project, ProjectCategory } from "@/types/payload-types";
import { cn } from "@/utils/cn";

interface SelectedProject {
  category: string;
  coverAlt: string;
  coverSrc: string;
  id: string;
  title: string;
  year: string;
}

const placeholderProjects: SelectedProject[] = [
  {
    category: "Residential",
    coverAlt:
      "Warm minimal architectural interior opening to a calm courtyard with stone, plaster, wood, and soft morning light.",
    coverSrc: "/images/home-hero-placeholder.png",
    id: "placeholder-courtyard-residence",
    title: "Courtyard Residence",
    year: "2026",
  },
  {
    category: "Interior",
    coverAlt:
      "Warm minimal architectural interior opening to a calm courtyard with stone, plaster, wood, and soft morning light.",
    coverSrc: "/images/home-hero-placeholder.png",
    id: "placeholder-stone-interior",
    title: "Stone Interior",
    year: "2025",
  },
  {
    category: "Architecture",
    coverAlt:
      "Warm minimal architectural interior opening to a calm courtyard with stone, plaster, wood, and soft morning light.",
    coverSrc: "/images/home-hero-placeholder.png",
    id: "placeholder-light-house",
    title: "House of Light",
    year: "2024",
  },
];

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

function normalizeProject(project: Project): SelectedProject {
  const coverImage = isMedia(project.coverImage) ? project.coverImage : null;
  const category = isProjectCategory(project.category) ? project.category.title : "Project";
  const coverSrc = normalizeImageUrl(coverImage?.sizes?.large?.url ?? coverImage?.url);

  return {
    category,
    coverAlt: coverImage?.alt ?? `${project.title} architectural project image.`,
    coverSrc,
    id: String(project.id),
    title: project.title,
    year: project.year ? String(project.year) : "Undated",
  };
}

async function getSelectedProjects(): Promise<SelectedProject[]> {
  try {
    const payload = await getPayload({ config: configPromise });
    const projects = await payload.find({
      collection: "projects",
      depth: 2,
      limit: 6,
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

    if (projects.docs.length === 0) {
      return placeholderProjects;
    }

    return projects.docs.map(normalizeProject);
  } catch {
    return placeholderProjects;
  }
}

export async function HomeSelectedProjects() {
  const projects = await getSelectedProjects();

  return (
    <Section className="bg-background" spacing="large">
      <HomeSelectedProjectsMotion>
        <Container>
          <div
            className="grid gap-8 border-t border-border pt-6 lg:grid-cols-12 lg:gap-[var(--grid-gap)]"
            data-selected-projects-heading
          >
            <p className="text-[length:var(--font-size-label)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-label)] text-foreground-muted lg:col-span-3">
              Selected Projects
            </p>
            <div className="lg:col-span-7 lg:col-start-5">
              <h2 className="font-display text-[length:var(--font-size-heading)] leading-[var(--line-height-heading)] tracking-[var(--letter-spacing-heading)] text-balance text-foreground">
                A quiet sequence of spaces shaped by proportion, material, and light.
              </h2>
            </div>
          </div>

          <div className="mt-[clamp(var(--space-20),12vw,var(--space-40))] space-y-[clamp(var(--space-24),12vw,var(--space-50))]">
            {projects.map((project, index) => {
              const isOffset = index % 2 === 1;

              return (
                <article
                  className="grid gap-6 lg:grid-cols-12 lg:gap-[var(--grid-gap)]"
                  key={project.id}
                >
                  <div
                    className={cn(
                      "order-2 flex items-start justify-between gap-6 border-t border-border pt-4 text-[length:var(--font-size-label)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-label)] text-foreground-muted lg:order-1 lg:block lg:border-t-0 lg:pt-0",
                      isOffset ? "lg:col-span-2 lg:col-start-10" : "lg:col-span-2",
                    )}
                  >
                    <p>{project.category}</p>
                    <p className="lg:mt-3">{project.year}</p>
                  </div>

                  <div
                    className={cn(
                      "order-1 lg:order-2",
                      isOffset ? "lg:col-span-8 lg:col-start-2" : "lg:col-span-9 lg:col-start-4",
                    )}
                  >
                    <div
                      className="group relative aspect-[4/5] overflow-hidden bg-surface sm:aspect-[16/10] lg:aspect-[16/9]"
                      data-project-reveal
                    >
                      <Image
                        alt={project.coverAlt}
                        className="h-full w-full object-cover transition-[opacity,transform] duration-slow ease-architectural-out group-hover:scale-[1.015] group-hover:opacity-95"
                        data-project-image
                        fill
                        sizes="(min-width: 1024px) 75vw, 100vw"
                        src={project.coverSrc}
                      />
                    </div>

                    <h3 className="mt-5 font-display text-[length:clamp(2.25rem,5vw,5.5rem)] leading-[0.95] tracking-[var(--letter-spacing-heading)] text-balance text-foreground">
                      {project.title}
                    </h3>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </HomeSelectedProjectsMotion>
    </Section>
  );
}
