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
      <dt className="text-[length:var(--font-size-label)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-label)] text-foreground-muted">
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
    <Section className="relative min-h-[90svh] overflow-hidden py-0" spacing="none">
      <div className="absolute inset-0" data-project-detail-image-frame>
        <Image
          alt={project.heroImage.alt}
          className="h-full w-full object-cover"
          data-project-detail-image
          fill
          priority
          quality={92}
          sizes="100vw"
          src={project.heroImage.src}
        />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(244_241_235_/_0.34)_0%,rgb(244_241_235_/_0.14)_44%,rgb(31_29_26_/_0.18)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(244_241_235_/_0.58)_0%,rgb(244_241_235_/_0.22)_42%,rgb(244_241_235_/_0.02)_100%)]" />

      <Container
        as="div"
        className="relative z-base flex min-h-[90svh] items-end pb-[clamp(var(--space-16),10vw,var(--space-30))] pt-[var(--space-30)]"
      >
        <div className="grid w-full gap-8 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
          <div className="max-w-[900px] lg:col-span-7 lg:col-start-2" data-project-detail-reveal>
            <p className="mb-5 text-[length:var(--font-size-label)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-label)] text-foreground-muted">
              {project.category}
            </p>
            <h1 className="font-display text-[length:clamp(3rem,7vw,8rem)] leading-[0.96] tracking-[var(--letter-spacing-heading)] text-balance text-foreground">
              {project.title}
            </h1>
          </div>

          <div
            className="flex items-start justify-between gap-6 border-t border-border pt-4 text-[length:var(--font-size-label)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-label)] text-foreground-secondary lg:col-span-2 lg:col-start-10 lg:block lg:border-t-0 lg:pt-0 lg:text-right"
            data-project-detail-reveal
          >
            <p>{project.location}</p>
            <p className="lg:mt-4">{project.year}</p>
          </div>
        </div>
      </Container>
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
        <div className="space-y-[clamp(var(--space-24),12vw,var(--space-50))]">
          {images.map((image, index) => {
            const isPortrait = image.orientation === "portrait";
            const rhythm = [
              {
                frame: "relative aspect-[4/5] overflow-hidden bg-surface sm:aspect-[16/10]",
                image: "lg:col-span-12",
                sizes: "100vw",
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
                    className={frameClass}
                    data-project-detail-image-frame
                  >
                    <Image
                      alt={image.alt}
                      className="h-full w-full object-cover"
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
                      "max-w-[360px] text-[length:var(--font-size-label)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-label)] text-foreground-muted/80",
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

      <Section className="bg-background-secondary" spacing="large">
        <Container>
          <dl className="grid gap-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <div className="lg:col-span-3" data-project-detail-reveal>
              <DetailItem label="Services" value={project.services} />
            </div>
            <div className="lg:col-span-2" data-project-detail-reveal>
              <DetailItem label="Area" value={project.area} />
            </div>
            <div className="lg:col-span-3" data-project-detail-reveal>
              <DetailItem label="Architect" value={project.architect} />
            </div>
            <div className="lg:col-span-2 lg:col-start-11" data-project-detail-reveal>
              <DetailItem label="Status" value={project.status} />
            </div>
          </dl>
        </Container>
      </Section>

      <Section
        className="bg-background py-[var(--section-spacing-large)] pb-[calc(var(--section-spacing-large)+var(--space-12))]"
        spacing="none"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <p
              className="text-[length:var(--font-size-label)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-label)] text-foreground-muted lg:col-span-2"
              data-project-detail-reveal
            >
              Statement
            </p>

            <div
              className="space-y-8 font-display text-[length:clamp(2.1rem,4.7vw,5.75rem)] leading-[1.04] text-balance text-foreground lg:col-span-8 lg:col-start-4 lg:space-y-10"
              data-project-detail-reveal
            >
              {statementParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-background py-0" spacing="none">
        <div
          className="relative aspect-[4/5] overflow-hidden bg-surface sm:aspect-[16/10] lg:min-h-[82svh] lg:aspect-auto"
          data-project-detail-image-frame
        >
          <Image
            alt={project.featureImage.alt}
            className="h-full w-full object-cover"
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
                className="text-[length:var(--font-size-label)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-label)] text-foreground-muted lg:col-span-2"
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
                    <span className="font-sans text-[length:var(--font-size-label)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-label)] text-foreground-muted">
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
            <div
              className="grid gap-8 border-t border-border pt-6 lg:grid-cols-12 lg:gap-[var(--grid-gap)]"
              data-project-detail-reveal
            >
              <p className="text-[length:var(--font-size-label)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-label)] text-foreground-muted lg:col-span-3">
                Next Project
              </p>

              <Link
                className="group font-display text-[length:clamp(2.75rem,6vw,7rem)] leading-[0.96] tracking-[var(--letter-spacing-heading)] text-balance text-foreground transition-colors duration-base ease-architectural-out hover:text-accent focus-visible:text-accent lg:col-span-7 lg:col-start-5"
                href={nextProject.href}
              >
                {nextProject.title}
              </Link>
            </div>
          </Container>
        </Section>
      ) : null}
    </ProjectDetailMotion>
  );
}
