import configPromise from "@payload-config";
import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { HomeSelectedProjectsMotion } from "@/features/home/HomeSelectedProjectsMotion";
import type { Media, Project, ProjectCategory } from "@/types/payload-types";

interface SelectedProject {
  category: string;
  coverAlt: string;
  coverSrc: string;
  href: string;
  id: string;
  title: string;
  year: string;
}

const platePatterns = [
  {
    image: "lg:col-span-8 lg:col-start-1",
    media: "aspect-[3/2]",
  },
  {
    image: "lg:col-span-6 lg:col-start-7",
    media: "aspect-[4/5]",
  },
  {
    image: "lg:col-span-7 lg:col-start-3",
    media: "aspect-[16/10]",
  },
  {
    image: "lg:col-span-6 lg:col-start-1",
    media: "aspect-[3/2]",
  },
] as const;

const placeholderProjects: SelectedProject[] = [
  {
    category: "Residential",
    coverAlt:
      "Warm minimal architectural interior opening to a calm courtyard with stone, plaster, wood, and soft morning light.",
    coverSrc: "/images/home-hero-placeholder.png",
    href: "/work/courtyard-residence",
    id: "placeholder-courtyard-residence",
    title: "Courtyard Residence",
    year: "2026",
  },
  {
    category: "Interior",
    coverAlt:
      "Warm minimal architectural interior opening to a calm courtyard with stone, plaster, wood, and soft morning light.",
    coverSrc: "/images/home-hero-placeholder.png",
    href: "/work/stone-interior",
    id: "placeholder-stone-interior",
    title: "Stone Apartment",
    year: "2025",
  },
  {
    category: "Architecture",
    coverAlt:
      "Warm minimal architectural interior opening to a calm courtyard with stone, plaster, wood, and soft morning light.",
    coverSrc: "/images/home-hero-placeholder.png",
    href: "/work/house-of-light",
    id: "placeholder-light-house",
    title: "North Light Gallery",
    year: "2024",
  },
  {
    category: "Hospitality",
    coverAlt:
      "Warm minimal architectural interior opening to a calm courtyard with stone, plaster, wood, and soft morning light.",
    coverSrc: "/images/home-hero-placeholder.png",
    href: "/work/limestone-hotel",
    id: "placeholder-limestone-hotel",
    title: "Limestone Hotel",
    year: "2023",
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
    href: `/work/${project.slug}`,
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

    return projects.docs.map(normalizeProject).slice(0, 4);
  } catch {
    return placeholderProjects;
  }
}

export async function HomeSelectedProjects() {
  const projects = await getSelectedProjects();

  return (
    <Section className="bg-background py-[clamp(var(--space-24),10vw,var(--space-40))]" spacing="none">
      <HomeSelectedProjectsMotion>
        <Container>
          <div
            className="grid gap-8 lg:grid-cols-12 lg:gap-[var(--grid-gap)]"
            data-selected-projects-heading
          >
            <div className="flex items-center gap-8 lg:col-span-3">
              <p className="type-label text-foreground-muted">
                Selected Work
              </p>
              <span className="hidden h-px flex-1 bg-border lg:block" aria-hidden="true" />
            </div>
            <div className="lg:col-span-5 lg:col-start-5">
              <h2 className="type-statement text-foreground">
                A quiet sequence of spaces shaped by proportion, material, and light.
              </h2>
            </div>
          </div>

          <div className="mt-[clamp(var(--space-16),9vw,var(--space-30))] space-y-[clamp(var(--space-24),12vw,var(--space-40))]">
            {projects.map((project, index) => {
              const pattern = platePatterns[index % platePatterns.length];

              return (
                <article
                  className="grid lg:grid-cols-12 lg:gap-[var(--grid-gap)]"
                  key={project.id}
                >
                  <Link
                    className={`plate-link group block ${pattern.image}`}
                    href={project.href}
                  >
                    <div
                      className={`editorial-image-frame relative overflow-hidden bg-surface ${pattern.media}`}
                      data-project-reveal
                    >
                      <Image
                        alt={project.coverAlt}
                        className="image-editorial h-full w-full object-cover transition-[opacity,transform] duration-slow ease-architectural-out group-hover:scale-[1.02] group-hover:opacity-95"
                        data-project-image
                        fill
                        sizes="(min-width: 1024px) 67vw, 100vw"
                        src={project.coverSrc}
                      />
                    </div>

                    <div className="mt-5 grid gap-4 border-t border-border/60 pt-4 sm:grid-cols-[1fr_auto] sm:items-start">
                      <div className="flex items-start gap-5">
                        <span className="font-display text-[length:var(--font-size-project-title)] leading-none text-foreground">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="type-project-title text-foreground">
                          <span className="plate-link-underline">
                            {project.title}
                          </span>
                        </h3>
                      </div>

                      <p className="type-label text-foreground-muted sm:text-right">
                        {project.category}
                        {" \u00b7 "}
                        {project.year}
                      </p>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>

          <div className="mt-[clamp(var(--space-16),8vw,var(--space-24))] border-t border-border/60 pt-6 text-right">
            <Link
              className="plate-link inline-flex type-label text-foreground"
              href="/work"
            >
              <span className="plate-link-underline">View the archive &rarr;</span>
            </Link>
          </div>
        </Container>
      </HomeSelectedProjectsMotion>
    </Section>
  );
}
