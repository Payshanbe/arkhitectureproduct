import configPromise from "@payload-config";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { StructuredData } from "@/components/seo/StructuredData";
import { ProjectDetailMotion } from "@/features/work/ProjectDetailMotion";
import { creativeWorkJsonLd } from "@/lib/seo/structuredData";
import type { Media, Project, ProjectCategory } from "@/types/payload-types";
import { cn } from "@/utils/cn";

interface ProjectDetailProps {
  slug: string;
}

interface ProjectImage {
  alt: string;
  caption?: string;
  id: string;
  orientation?: string;
  src: string;
}

interface NormalizedProject {
  architect?: string;
  area?: string;
  category: string;
  description: string;
  featureImage: ProjectImage;
  gallery: ProjectImage[];
  heroImage: ProjectImage;
  id: string;
  location: string;
  materials: string[];
  services: string[];
  slug: string;
  status?: string;
  title: string;
  year: string;
}

interface NextProject {
  href: string;
  title: string;
}

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

function isMedia(value: Project["coverImage"]): value is Media {
  return typeof value === "object" && value !== null;
}

function isGalleryMedia(value: ProjectImageInput["image"]): value is Media {
  return typeof value === "object" && value !== null;
}

function isProjectCategory(value: Project["category"]): value is ProjectCategory {
  return typeof value === "object" && value !== null;
}

type ProjectImageInput = NonNullable<Project["gallery"]>[number];

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

function normalizeMaterials(materials?: string | null) {
  if (!materials) {
    return [];
  }

  return materials
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitEditorialText(text: string) {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (paragraphs.length > 1) {
    return paragraphs;
  }

  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  if (sentences.length < 3) {
    return [text];
  }

  const midpoint = Math.ceil(sentences.length / 2);

  return [sentences.slice(0, midpoint).join(" "), sentences.slice(midpoint).join(" ")].filter(
    Boolean,
  );
}

function normalizeGalleryImage(item: ProjectImageInput, index: number, title: string): ProjectImage {
  const image = isGalleryMedia(item.image) ? item.image : null;

  return {
    alt: item.altText ?? image?.alt ?? `${title} gallery image ${index + 1}.`,
    caption: item.caption ?? image?.caption ?? undefined,
    id: item.id ?? `${title}-${index}`,
    orientation: item.orientation ?? image?.orientation ?? undefined,
    src: normalizeImageUrl(image?.sizes?.large?.url ?? image?.url),
  };
}

function normalizeProject(project: Project): NormalizedProject {
  const coverImage = isMedia(project.coverImage) ? project.coverImage : null;
  const category = isProjectCategory(project.category) ? project.category.title : "Project";
  const gallery = [...(project.gallery ?? [])]
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((item, index) => normalizeGalleryImage(item, index, project.title));

  const heroImage: ProjectImage = {
    alt: coverImage?.alt ?? `${project.title} architectural project image.`,
    caption: coverImage?.caption ?? undefined,
    id: `${project.id}-cover`,
    orientation: coverImage?.orientation ?? undefined,
    src: normalizeImageUrl(coverImage?.sizes?.large?.url ?? coverImage?.url),
  };

  return {
    architect: project.architect ?? undefined,
    area: project.area ?? undefined,
    category,
    description:
      project.description ??
      project.concept ??
      project.excerpt ??
      project.shortDescription ??
      "A quiet architectural study shaped through proportion, atmosphere, and material restraint.",
    featureImage: gallery[0] ?? heroImage,
    gallery,
    heroImage,
    id: String(project.id),
    location: normalizeLocation(project),
    materials: normalizeMaterials(project.materials),
    services: project.services?.map((service) => serviceLabels[service]) ?? [],
    slug: project.slug,
    status: project.status ? statusLabels[project.status] : undefined,
    title: project.title,
    year: project.year ? String(project.year) : "Undated",
  };
}

async function getProjectBySlug(slug: string): Promise<Project | null> {
  const payload = await getPayload({ config: configPromise });
  const projects = await payload.find({
    collection: "projects",
    depth: 2,
    limit: 1,
    where: {
      and: [
        {
          slug: {
            equals: slug,
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

  return projects.docs[0] ?? null;
}

async function getNextProject(currentSlug: string): Promise<NextProject | null> {
  const payload = await getPayload({ config: configPromise });
  const projects = await payload.find({
    collection: "projects",
    depth: 0,
    limit: 100,
    sort: "order",
    where: {
      published: {
        equals: true,
      },
    },
  });

  const currentIndex = projects.docs.findIndex((project) => project.slug === currentSlug);

  if (currentIndex === -1 || projects.docs.length < 2) {
    return null;
  }

  const nextProject = projects.docs[(currentIndex + 1) % projects.docs.length];

  if (!nextProject) {
    return null;
  }

  return {
    href: `/work/${nextProject.slug}`,
    title: nextProject.title,
  };
}

function DetailItem({ label, value }: { label: string; value?: string | string[] }) {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return null;
  }

  return (
    <div className="border-t border-border pt-4">
      <dt className="type-label text-foreground-muted">
        {label}
      </dt>
      <dd className="mt-3 text-pretty text-[length:var(--font-size-body)] leading-[var(--line-height-body)] text-foreground">
        {Array.isArray(value) ? value.join(", ") : value}
      </dd>
    </div>
  );
}

function ProjectHero({ project }: { project: NormalizedProject }) {
  return (
    <Section
      className="bg-background pt-[calc(var(--section-spacing-large)+var(--space-20))]"
      spacing="none"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-[var(--grid-gap)]" data-project-detail-reveal>
          <p className="type-label text-foreground-muted lg:col-span-2">
            {project.category}
          </p>

          <h1 className="max-w-[900px] type-display text-foreground lg:col-span-9 lg:col-start-4">
            {project.title}
          </h1>
        </div>

        <div
          className="mt-[clamp(var(--space-12),5vw,var(--space-16))] flex flex-wrap items-baseline justify-between gap-x-10 gap-y-2 border-t border-border pt-4 type-label text-foreground-muted"
          data-project-detail-reveal
        >
          <p>{project.location}</p>
          <p>{project.year}</p>
        </div>
      </Container>

      <div
        className="relative mt-[clamp(var(--space-12),6vw,var(--space-20))] aspect-[4/5] overflow-hidden bg-surface sm:aspect-[3/2] lg:aspect-auto lg:min-h-[90svh]"
        data-project-detail-image-frame
      >
        <Image
          alt={project.heroImage.alt}
          className="image-editorial image-editorial-hero h-full w-full object-cover"
          data-project-detail-image
          fill
          priority
          quality={92}
          sizes="100vw"
          src={project.heroImage.src}
        />
      </div>
    </Section>
  );
}

function ProjectGallery({ images }: { images: ProjectImage[] }) {
  if (images.length === 0) {
    return null;
  }

  return (
    <Section className="bg-background py-[var(--section-spacing-large)]" spacing="none">
      <Container>
        <div className="space-y-[clamp(var(--space-24),10vw,var(--space-40))]">
          {images.map((image, index) => {
            const isPortrait = image.orientation === "portrait";
            const rhythm = [
              {
                frame: "relative aspect-[4/5] overflow-hidden bg-surface sm:aspect-[16/10]",
                image: "lg:col-span-12",
                sizes: "(min-width: 1824px) 1680px, (min-width: 1024px) calc(100vw - 144px), calc(100vw - 40px)",
              },
              {
                frame: "relative aspect-[4/5] overflow-hidden bg-surface sm:aspect-[3/2]",
                image: "lg:col-span-8 lg:col-start-3",
                sizes: "(min-width: 1024px) 66vw, 100vw",
              },
              {
                frame: "relative aspect-[4/5] overflow-hidden bg-surface",
                image: "lg:col-span-5 lg:col-start-2",
                sizes: "(min-width: 1024px) 42vw, 100vw",
              },
              {
                frame: "relative aspect-[4/5] overflow-hidden bg-surface sm:aspect-[16/9]",
                image: "lg:col-span-9 lg:col-start-4",
                sizes: "(min-width: 1024px) 75vw, 100vw",
              },
            ][index % 4];

            const imageClass = isPortrait ? "lg:col-span-5 lg:col-start-4" : rhythm.image;
            const frameClass = isPortrait
              ? "relative aspect-[4/5] overflow-hidden bg-surface"
              : rhythm.frame;

            return (
              <figure
                className="grid gap-5 lg:grid-cols-12 lg:gap-y-6 lg:gap-x-[var(--grid-gap)]"
                data-project-detail-reveal
                key={image.id}
              >
                <div className={imageClass}>
                  <div
                    className={cn("editorial-image-frame", frameClass)}
                    data-project-detail-image-frame
                  >
                    <Image
                      alt={image.alt}
                      className="image-editorial h-full w-full object-cover"
                      data-project-detail-image
                      fill
                      sizes={isPortrait ? "(min-width: 1024px) 42vw, 100vw" : rhythm.sizes}
                      src={image.src}
                    />
                  </div>
                </div>

                {image.caption ? (
                  <figcaption
                    className={cn(
                      "max-w-[360px] type-caption text-foreground-muted",
                      imageClass,
                    )}
                  >
                    {image.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

export async function ProjectDetail({ slug }: ProjectDetailProps) {
  const projectDocument = await getProjectBySlug(slug);

  if (!projectDocument) {
    notFound();
  }

  const project = normalizeProject(projectDocument);
  const nextProject = await getNextProject(project.slug);
  const statementParagraphs = splitEditorialText(project.description);
  const projectStructuredData = creativeWorkJsonLd({
    category: project.category,
    description: project.description,
    image: project.heroImage.src,
    location: project.location,
    name: project.title,
    services: project.services,
    url: `/work/${project.slug}`,
    year: project.year === "Undated" ? undefined : project.year,
  });

  return (
    <ProjectDetailMotion>
      <StructuredData data={projectStructuredData} />
      <ProjectHero project={project} />

      <Section
        className="bg-background py-[var(--section-spacing-large)] pb-[calc(var(--section-spacing-large)+var(--space-12))]"
        spacing="none"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <aside
              className="self-start lg:sticky lg:top-32 lg:col-span-3"
              data-project-detail-reveal
            >
              <p className="type-label text-foreground-muted">
                Statement
              </p>

              <dl className="mt-10 grid gap-6">
                <DetailItem label="Services" value={project.services} />
                <DetailItem label="Area" value={project.area} />
                <DetailItem label="Architect" value={project.architect} />
                <DetailItem label="Status" value={project.status} />
              </dl>
            </aside>

            <div className="lg:col-span-8 lg:col-start-5" data-project-detail-reveal>
              {statementParagraphs.map((paragraph, index) =>
                index === 0 ? (
                  <p className="type-statement text-foreground" key={paragraph}>
                    {paragraph}
                  </p>
                ) : (
                  <p
                    className="mt-8 max-w-[620px] text-pretty text-[length:var(--font-size-body-large)] leading-[var(--line-height-body-large)] text-foreground-secondary lg:mt-10"
                    key={paragraph}
                  >
                    {paragraph}
                  </p>
                ),
              )}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-background py-0" spacing="none">
        <div
          className="editorial-image-frame relative aspect-[4/5] overflow-hidden bg-surface sm:aspect-[16/10] lg:min-h-[82svh] lg:aspect-auto"
          data-project-detail-image-frame
        >
          <Image
            alt={project.featureImage.alt}
            className="image-editorial h-full w-full object-cover"
            data-project-detail-image
            fill
            sizes="100vw"
            src={project.featureImage.src}
          />
        </div>
      </Section>

      {project.materials.length > 0 ? (
        <Section
          className="bg-background-secondary py-[var(--section-spacing-large)]"
          spacing="none"
        >
          <Container>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
              <p
                className="type-label text-foreground-muted lg:col-span-2"
                data-project-detail-reveal
              >
                Materials
              </p>

              <ul
                className="grid gap-x-[var(--grid-gap)] gap-y-5 lg:col-span-8 lg:col-start-4 lg:grid-cols-2"
                data-project-detail-reveal
              >
                {project.materials.map((material, index) => (
                  <li
                    className="grid grid-cols-[3ch_1fr] gap-5 border-t border-border pt-5 text-[length:var(--font-size-body-large)] leading-[var(--line-height-body-large)] text-foreground"
                    key={material}
                  >
                    <span className="font-sans type-label text-foreground-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{material}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </Section>
      ) : null}

      <ProjectGallery images={project.gallery} />

      {nextProject ? (
        <Section className="bg-background-secondary" spacing="large">
          <Container>
            <Link
              className="plate-link group block"
              data-project-detail-reveal
              href={nextProject.href}
            >
              <div className="grid gap-8 border-t border-border pt-6 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
                <p className="type-label text-foreground-muted lg:col-span-3">
                  Next Project
                </p>

                <div className="flex items-baseline justify-between gap-8 lg:col-span-8 lg:col-start-5">
                  <span className="type-display text-foreground">
                    <span className="plate-link-underline">{nextProject.title}</span>
                  </span>
                  <span
                    className="hidden text-[length:clamp(1.5rem,2vw,2.25rem)] leading-none text-foreground transition-transform duration-base ease-architectural-out group-hover:translate-x-2 sm:block"
                    aria-hidden="true"
                  >
                    &rarr;
                  </span>
                </div>
              </div>
            </Link>
          </Container>
        </Section>
      ) : null}
    </ProjectDetailMotion>
  );
}
