import configPromise from "@payload-config";
import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";

import { WorkArchiveMotion } from "@/features/work/WorkArchiveMotion";
import { getWorkPageContent, type WorkPageContent } from "@/lib/cms/siteContent";
import type { Media, Project } from "@/types/payload-types";

interface WorkProject {
  coverAlt: string;
  coverSrc: string | null;
  description: string;
  href: string;
  id: string;
  location: string;
  title: string;
  year: string;
}

function isMedia(value: Project["coverImage"]): value is Media {
  return typeof value === "object" && value !== null;
}

function normalizeImageUrl(url?: string | null) {
  if (!url) {
    return null;
  }

  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
}

function normalizeLocation(project: Project, content: WorkPageContent) {
  const primaryLocation = project.city ?? project.location;
  const location = [primaryLocation, project.country].filter(Boolean).join(", ");

  return location || content.fallbacks.location;
}

function normalizeDescription(project: Project, content: WorkPageContent) {
  return (
    project.excerpt ??
    project.summary ??
    project.description ??
    content.fallbacks.projectDescription
  );
}

function normalizeProject(project: Project, content: WorkPageContent): WorkProject {
  const coverImage = isMedia(project.coverImage) ? project.coverImage : null;

  return {
    coverAlt: coverImage?.alt ?? `${project.title} architectural project image.`,
    coverSrc: normalizeImageUrl(coverImage?.sizes?.large?.url ?? coverImage?.url),
    description: normalizeDescription(project, content),
    href: `/work/${project.slug}`,
    id: String(project.id),
    location: normalizeLocation(project, content),
    title: project.title,
    year: project.year ? String(project.year) : content.fallbacks.year,
  };
}

async function getArchiveProjects(content: WorkPageContent): Promise<WorkProject[]> {
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

    return projects.docs.map((project) => normalizeProject(project, content));
  } catch {
    return [];
  }
}

function Plate({
  content,
  index,
  project,
}: {
  content: WorkPageContent;
  index: number;
  project: WorkProject;
}) {
  if (project.coverSrc) {
    return (
      <div className="work-plate work-plate--image">
        <Image
          alt={project.coverAlt}
          className="image-editorial h-full w-full object-cover"
          fill
          sizes="(min-width: 1024px) 66vw, 100vw"
          src={project.coverSrc}
        />
      </div>
    );
  }

  return (
    <div
      aria-label={`${content.archive.plateLabel} ${String(index + 1).padStart(2, "0")} placeholder`}
      className="work-plate"
    >
      <div className="work-plate__label">
        <span>
          {content.archive.plateLabel} {String(index + 1).padStart(2, "0")}
        </span>
        <span>{content.archive.platePlaceholder}</span>
      </div>
    </div>
  );
}

function ProjectPlateLink({
  content,
  index,
  project,
}: {
  content: WorkPageContent;
  index: number;
  project: WorkProject;
}) {
  return (
    <Link
      aria-label={`View project: ${project.title}`}
      className="work-plate-link"
      href={project.href}
    >
      <Plate content={content} index={index} project={project} />
    </Link>
  );
}

export async function WorkArchive() {
  const content = await getWorkPageContent();
  const projects = await getArchiveProjects(content);
  const projectCount = String(projects.length).padStart(2, "0");
  const years = projects
    .map((project) => Number(project.year))
    .filter((year) => Number.isFinite(year));
  const yearRange =
    years.length > 0
      ? `${Math.min(...years)} - ${Math.max(...years)}`
      : content.fallbacks.yearRange;

  return (
    <WorkArchiveMotion>
      <div className="work-page">
        <div className="work-container work-main" aria-labelledby="work-title">
          <section className="work-hero">
            <p className="work-kicker">{content.hero.label}</p>

            <div>
              <h1 className="work-hero__title" id="work-title">
                {content.hero.title}
              </h1>

              <p className="work-hero__intro">{content.hero.intro}</p>

              <p className="work-hero__count">
                {projectCount}{" "}
                {projects.length === 1
                  ? content.hero.singularProjectLabel
                  : content.hero.pluralProjectLabel}{" "}
                · {yearRange}
              </p>
            </div>
          </section>

          <section aria-label={content.archive.ariaLabel}>
            {projects.length > 0 ? (
              projects.map((project, index) => {
                const number = String(index + 1).padStart(2, "0");
                const isTemplateB = index % 2 === 1;

                return (
                  <article
                    className={isTemplateB ? "work-project work-project--b" : "work-project work-project--a"}
                    data-work-reveal
                    key={project.id}
                  >
                    {isTemplateB ? (
                      <>
                        <div className="work-project__copy">
                          <div className="work-project__meta-row">
                            <span className="work-project__number">No. {number}</span>
                            <span>{project.location}</span>
                            <span>{project.year}</span>
                          </div>

                          <h2 className="work-project__title">
                            <Link href={project.href}>{project.title}</Link>
                          </h2>

                          <p className="work-project__description">{project.description}</p>
                        </div>

                        <ProjectPlateLink content={content} index={index} project={project} />
                      </>
                    ) : (
                      <>
                        <div className="work-project__meta-column">
                          <span className="work-project__number">No. {number}</span>
                          <span>{project.location}</span>
                          <span>{project.year}</span>
                        </div>

                        <div>
                          <ProjectPlateLink content={content} index={index} project={project} />

                          <h2 className="work-project__title">
                            <Link href={project.href}>{project.title}</Link>
                          </h2>

                          <p className="work-project__description">{project.description}</p>
                        </div>
                      </>
                    )}
                  </article>
                );
              })
            ) : (
              <article className="work-project work-project--a" data-work-reveal>
                <div className="work-project__meta-column">
                  <span className="work-project__number">{content.archive.emptyNumberLabel}</span>
                  <span>{content.archive.emptyLocationLabel}</span>
                  <span>{content.archive.emptyYearLabel}</span>
                </div>

                <div>
                  <Plate
                    content={content}
                    index={0}
                    project={{
                      coverAlt: "Project archive placeholder.",
                      coverSrc: null,
                      description: "",
                      href: "/work",
                      id: "empty",
                      location: content.archive.emptyLocationLabel,
                      title: content.archive.emptyTitle,
                      year: content.archive.emptyYearLabel,
                    }}
                  />
                  <h2 className="work-project__title">{content.archive.emptyTitle}</h2>
                </div>
              </article>
            )}
          </section>
        </div>
      </div>
    </WorkArchiveMotion>
  );
}
