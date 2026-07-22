import configPromise from "@payload-config";
import { getPayload } from "payload";

import { normalizePayloadImageUrl } from "@/lib/cms/media";
import { BRAND_NAME, resolveBrandName } from "@/lib/brand";
import type { NavigationItem } from "@/lib/constants/navigation";
import { getPrimaryNavigation } from "@/lib/constants/navigation";
import { defaultLocale, type SiteLocale } from "@/lib/i18n/config";
import type { Media } from "@/types/payload-types";

type CmsGlobalSlug =
  | "contact-form-settings"
  | "contact-info"
  | "contact-page"
  | "home-page"
  | "navigation"
  | "project-detail-settings"
  | "seo-defaults"
  | "site-settings"
  | "studio-page"
  | "work-page";

interface MediaLike {
  alt?: null | string;
  sizes?: null | {
    large?: null | {
      url?: null | string;
    };
  };
  url?: null | string;
}

export interface HomePageContent {
  contact: {
    body: string;
    label: string;
    statement: string;
  };
  featuredProject: {
    heading: string;
    label: string;
    linkLabel: string;
  };
  hero: {
    imageAlt: string;
    imageSrc: string;
    label: string;
    locationLine: string;
    statement: string;
    supportingText: string;
  };
  selectedProjects: {
    archiveLinkLabel: string;
    heading: string;
    label: string;
  };
  studioIntro: {
    body: string;
    label: string;
    linkHref: string;
    linkLabel: string;
    statement: string;
  };
}

export interface StudioPageContent {
  contactCta: {
    label: string;
    linkLabel: string;
    statement: string;
  };
  hero: {
    label: string;
    statement: string;
  };
  information: Array<{
    label: string;
    value: string;
  }>;
  philosophy: {
    label: string;
    paragraphs: string[];
  };
  principles: string[];
  process: {
    label: string;
    statement: string;
  };
}

export interface ContactPageContent {
  closing: {
    label: string;
    statement: string;
  };
  collaboration: {
    label: string;
    statement: string;
  };
  hero: {
    label: string;
    statement: string;
  };
  inquiry: {
    body: string;
    label: string;
  };
}

export interface ContactFormSettingsContent {
  labels: {
    city: string;
    company: string;
    country: string;
    email: string;
    estimatedBudget: string;
    message: string;
    name: string;
    projectType: string;
    studioInformation: string;
    submit: string;
    timeline: string;
  };
  messages: {
    defaultNote: string;
    emailError: string;
    requiredError: string;
    success: string;
  };
  placeholders: {
    message: string;
  };
}

export interface WorkPageContent {
  archive: {
    ariaLabel: string;
    emptyLocationLabel: string;
    emptyNumberLabel: string;
    emptyTitle: string;
    emptyYearLabel: string;
    plateLabel: string;
    platePlaceholder: string;
  };
  fallbacks: {
    location: string;
    projectDescription: string;
    year: string;
    yearRange: string;
  };
  hero: {
    intro: string;
    label: string;
    pluralProjectLabel: string;
    singularProjectLabel: string;
    title: string;
  };
}

export interface ProjectDetailSettingsContent {
  fallbacks: {
    category: string;
    description: string;
    location: string;
    year: string;
  };
  labels: {
    architect: string;
    area: string;
    materials: string;
    nextProject: string;
    services: string;
    statement: string;
    status: string;
  };
  serviceLabels: {
    architecture: string;
    furnitureDesign: string;
    interiorDesign: string;
    landscape: string;
    masterPlanning: string;
  };
  statusLabels: {
    built: string;
    completed: string;
    concept: string;
    inProgress: string;
  };
}

export interface ContactDetails {
  address: string;
  city: string;
  country: string;
  email: string;
  phone: string;
  socialLinks: Array<{
    href: string;
    label: string;
  }>;
}

export interface SiteSettingsContent {
  copyright: string;
  footerDescription: string;
  siteName: string;
  tagline: string;
}

export interface SiteChromeContent {
  contact: ContactDetails;
  navigationItems: NavigationItem[];
  settings: SiteSettingsContent;
}

const fallbackHomePage: HomePageContent = {
  contact: {
    body: "For residences, interiors, and architectural collaborations, send a brief note and we will reply with a considered next step.",
    label: "Let's Connect",
    statement: "Begin with a conversation about place, atmosphere, and what should endure.",
  },
  featuredProject: {
    heading: "A slower look at one selected work.",
    label: "Featured Project",
    linkLabel: "View Project →",
  },
  hero: {
    imageAlt:
      "Warm minimal architectural interior opening to a calm courtyard with stone, plaster, wood, and soft morning light.",
    imageSrc: "/images/home-hero-placeholder.png",
    label: "Architecture Studio",
    locationLine: "Tashkent, UZ 41.3°N 69.2°E",
    statement: "Architecture shaped by light, material, and restraint.",
    supportingText:
      "A cinematic portfolio for spaces that feel calm, precise, and quietly enduring.",
  },
  selectedProjects: {
    archiveLinkLabel: "View the archive →",
    heading: "A quiet sequence of spaces shaped by proportion, material, and light.",
    label: "Selected Work",
  },
  studioIntro: {
    body: "The studio approaches each project as a careful composition of light, material, proportion, and daily ritual. The result is architecture that feels calm, precise, and quietly enduring.",
    label: "Our Approach",
    linkHref: "/studio",
    linkLabel: "Learn More",
    statement: "We design spaces through atmosphere, restraint, and a close reading of context.",
  },
};

const fallbackStudioPage: StudioPageContent = {
  contactCta: {
    label: "Contact",
    linkLabel: "Start a conversation",
    statement: "Begin with a place, a question, or a quiet ambition for how a space should feel.",
  },
  hero: {
    label: "Studio",
    statement: "We design spaces through atmosphere, restraint, and a careful reading of context.",
  },
  information: [
    {
      label: "Location",
      value: "Remote studio with projects across Europe and selected international contexts.",
    },
    {
      label: "Disciplines",
      value:
        "Architecture, interiors, furniture direction, landscape integration, and spatial strategy.",
    },
    {
      label: "Collaborations",
      value:
        "Independent makers, engineers, landscape designers, artists, fabricators, and photographers.",
    },
  ],
  philosophy: {
    label: "Philosophy",
    paragraphs: [
      "The studio works from the belief that architecture should become quieter as it becomes more precise. Each project begins with listening: to the site, to the pace of daily life, to climate, light, material, and the rituals that will eventually occupy the space.",
      "We are interested in restraint as an active design tool. A reduced palette is not an absence of thought; it is a way of allowing proportion, shadow, texture, and threshold to carry the emotional weight of a place.",
      "The result is not a fixed style, but a consistent way of working. Every decision is measured against atmosphere, longevity, and the ability of a space to feel inevitable over time.",
    ],
  },
  principles: [
    "Architecture should frame life rather than perform for attention.",
    "Every material must justify its presence through use, atmosphere, or touch.",
    "Light is never decorative; it is structural to the experience.",
    "A plan should feel calm before it feels impressive.",
    "Longevity matters more than novelty.",
  ],
  process: {
    label: "The Process",
    statement: "Six layers, from first trace to atmosphere. How every project is drawn into being.",
  },
};

const fallbackContactPage: ContactPageContent = {
  closing: {
    label: "Closing",
    statement:
      "The first conversation is simply a way to understand what should be protected, clarified, and made possible.",
  },
  collaboration: {
    label: "Collaboration",
    statement:
      "We work with private clients, developers, makers, and cultural collaborators who value restraint, clarity, and spaces that gather meaning slowly.",
  },
  hero: {
    label: "Contact",
    statement: "Begin with a conversation about place, atmosphere, and how a space should feel.",
  },
  inquiry: {
    body: "Write a short note about the place, the ambition, and the atmosphere you have in mind. We reply within a few working days.",
    label: "Inquiry",
  },
};

const fallbackContactFormSettings: ContactFormSettingsContent = {
  labels: {
    city: "City",
    company: "Company",
    country: "Country",
    email: "Email",
    estimatedBudget: "Estimated Budget",
    message: "Message",
    name: "Name",
    projectType: "Project Type",
    studioInformation: "Studio Information",
    submit: "Send inquiry ->",
    timeline: "Timeline",
  },
  messages: {
    defaultNote: "Your inquiry will be saved securely in the studio CMS for review.",
    emailError: "Please enter a valid email address.",
    requiredError: "Please complete your name, email, and message.",
    success: "Thank you. Your inquiry has been received.",
  },
  placeholders: {
    message: "The place, the ambition, the constraints.",
  },
};

const fallbackWorkPage: WorkPageContent = {
  archive: {
    ariaLabel: "Project archive",
    emptyLocationLabel: "Archive",
    emptyNumberLabel: "No. 00",
    emptyTitle: "Projects will appear here once Payload contains published work.",
    emptyYearLabel: "Pending",
    plateLabel: "Plate",
    platePlaceholder: "Photograph to come",
  },
  fallbacks: {
    location: "Location forthcoming",
    projectDescription:
      "A quiet architectural study shaped by material restraint, atmosphere, and a close reading of place.",
    year: "Undated",
    yearRange: "Archive",
  },
  hero: {
    intro:
      "A selection of residential, hospitality, interior, and architectural work - shaped through renovation, restraint, and a close reading of place.",
    label: "Work",
    pluralProjectLabel: "projects",
    singularProjectLabel: "project",
    title: "A considered archive of spaces, materials, and atmosphere.",
  },
};

const fallbackProjectDetailSettings: ProjectDetailSettingsContent = {
  fallbacks: {
    category: "Project",
    description:
      "A quiet architectural study shaped through proportion, atmosphere, and material restraint.",
    location: "Location forthcoming",
    year: "Undated",
  },
  labels: {
    architect: "Architect",
    area: "Area",
    materials: "Materials",
    nextProject: "Next Project",
    services: "Services",
    statement: "Statement",
    status: "Status",
  },
  serviceLabels: {
    architecture: "Architecture",
    furnitureDesign: "Furniture Design",
    interiorDesign: "Interior Design",
    landscape: "Landscape",
    masterPlanning: "Master Planning",
  },
  statusLabels: {
    built: "Built",
    completed: "Completed",
    concept: "Concept",
    inProgress: "In Progress",
  },
};

const fallbackContactDetails: ContactDetails = {
  address: "Tashkent, Uzbekistan",
  city: "Tashkent",
  country: "Uzbekistan",
  email: "studio@arkhitecture.com",
  phone: "+1 555 123 4567",
  socialLinks: [
    { href: "https://www.instagram.com/", label: "Instagram" },
    { href: "https://www.linkedin.com/", label: "LinkedIn" },
    { href: "https://www.behance.net/", label: "Behance" },
  ],
};

const fallbackSiteSettings: SiteSettingsContent = {
  copyright: `© ${new Date().getFullYear()} ${BRAND_NAME}`,
  footerDescription: "Architecture studio shaping calm spaces through light and material.",
  siteName: BRAND_NAME,
  tagline: "Architecture Studio",
};

function text(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim().length > 0 ? value : fallback;
}

function arrayItems<T>(value: unknown, fallback: T[]) {
  return Array.isArray(value) && value.length > 0 ? value : fallback;
}

function isMediaLike(value: unknown): value is MediaLike {
  return typeof value === "object" && value !== null;
}

function mediaImage(value: unknown) {
  const image = isMediaLike(value) ? value : null;

  return {
    alt: text(image?.alt, fallbackHomePage.hero.imageAlt),
    src: normalizePayloadImageUrl(
      image?.sizes?.large?.url ?? image?.url,
      fallbackHomePage.hero.imageSrc,
    ),
  };
}

async function getGlobal<T>(
  slug: CmsGlobalSlug,
  locale: SiteLocale = defaultLocale,
): Promise<null | T> {
  try {
    const payload = await getPayload({ config: configPromise });
    return (await payload.findGlobal({
      slug,
      depth: 2,
      fallbackLocale: defaultLocale,
      locale,
    })) as T;
  } catch {
    return null;
  }
}

export async function getHomePageContent(
  locale: SiteLocale = defaultLocale,
): Promise<HomePageContent> {
  const data = await getGlobal<Record<string, unknown>>("home-page", locale);
  const hero = (data?.hero ?? {}) as Record<string, unknown>;
  const heroImage = mediaImage(hero.image);
  const selectedProjects = (data?.selectedProjects ?? {}) as Record<string, unknown>;
  const studioIntro = (data?.studioIntro ?? {}) as Record<string, unknown>;
  const featuredProject = (data?.featuredProject ?? {}) as Record<string, unknown>;
  const contact = (data?.contact ?? {}) as Record<string, unknown>;

  return {
    contact: {
      body: text(contact.body, fallbackHomePage.contact.body),
      label: text(contact.label, fallbackHomePage.contact.label),
      statement: text(contact.statement, fallbackHomePage.contact.statement),
    },
    featuredProject: {
      heading: text(featuredProject.heading, fallbackHomePage.featuredProject.heading),
      label: text(featuredProject.label, fallbackHomePage.featuredProject.label),
      linkLabel: text(featuredProject.linkLabel, fallbackHomePage.featuredProject.linkLabel),
    },
    hero: {
      imageAlt: heroImage.alt,
      imageSrc: heroImage.src,
      label: text(hero.label, fallbackHomePage.hero.label),
      locationLine: text(hero.locationLine, fallbackHomePage.hero.locationLine),
      statement: text(hero.heading, fallbackHomePage.hero.statement),
      supportingText: text(hero.supportingText, fallbackHomePage.hero.supportingText),
    },
    selectedProjects: {
      archiveLinkLabel: text(
        selectedProjects.archiveLinkLabel,
        fallbackHomePage.selectedProjects.archiveLinkLabel,
      ),
      heading: text(selectedProjects.heading, fallbackHomePage.selectedProjects.heading),
      label: text(selectedProjects.label, fallbackHomePage.selectedProjects.label),
    },
    studioIntro: {
      body: text(studioIntro.body, fallbackHomePage.studioIntro.body),
      label: text(studioIntro.label, fallbackHomePage.studioIntro.label),
      linkHref: text(studioIntro.linkHref, fallbackHomePage.studioIntro.linkHref),
      linkLabel: text(studioIntro.linkLabel, fallbackHomePage.studioIntro.linkLabel),
      statement: text(studioIntro.statement, fallbackHomePage.studioIntro.statement),
    },
  };
}

export async function getStudioPageContent(
  locale: SiteLocale = defaultLocale,
): Promise<StudioPageContent> {
  const data = await getGlobal<Record<string, unknown>>("studio-page", locale);
  const hero = (data?.hero ?? {}) as Record<string, unknown>;
  const philosophy = (data?.philosophy ?? {}) as Record<string, unknown>;
  const process = (data?.process ?? {}) as Record<string, unknown>;
  const contactCta = (data?.contactCta ?? {}) as Record<string, unknown>;

  const paragraphs = arrayItems(philosophy.paragraphs, [])
    .map((item) => text((item as Record<string, unknown>).text, ""))
    .filter(Boolean);
  const principles = arrayItems(data?.principles, [])
    .map((item) => text((item as Record<string, unknown>).text, ""))
    .filter(Boolean);
  const information = arrayItems(data?.information, [])
    .map((item) => {
      const row = item as Record<string, unknown>;
      return {
        label: text(row.label, ""),
        value: text(row.value, ""),
      };
    })
    .filter((item) => item.label && item.value);

  return {
    contactCta: {
      label: text(contactCta.label, fallbackStudioPage.contactCta.label),
      linkLabel: text(contactCta.linkLabel, fallbackStudioPage.contactCta.linkLabel),
      statement: text(contactCta.statement, fallbackStudioPage.contactCta.statement),
    },
    hero: {
      label: text(hero.label, fallbackStudioPage.hero.label),
      statement: text(hero.statement, fallbackStudioPage.hero.statement),
    },
    information: information.length > 0 ? information : fallbackStudioPage.information,
    philosophy: {
      label: text(philosophy.label, fallbackStudioPage.philosophy.label),
      paragraphs: paragraphs.length > 0 ? paragraphs : fallbackStudioPage.philosophy.paragraphs,
    },
    principles: principles.length > 0 ? principles : fallbackStudioPage.principles,
    process: {
      label: text(process.label, fallbackStudioPage.process.label),
      statement: text(process.statement, fallbackStudioPage.process.statement),
    },
  };
}

export async function getContactPageContent(
  locale: SiteLocale = defaultLocale,
): Promise<ContactPageContent> {
  const data = await getGlobal<Record<string, unknown>>("contact-page", locale);
  const hero = (data?.hero ?? {}) as Record<string, unknown>;
  const inquiry = (data?.inquiry ?? {}) as Record<string, unknown>;
  const collaboration = (data?.collaboration ?? {}) as Record<string, unknown>;
  const closing = (data?.closing ?? {}) as Record<string, unknown>;

  return {
    closing: {
      label: text(closing.label, fallbackContactPage.closing.label),
      statement: text(closing.statement, fallbackContactPage.closing.statement),
    },
    collaboration: {
      label: text(collaboration.label, fallbackContactPage.collaboration.label),
      statement: text(collaboration.statement, fallbackContactPage.collaboration.statement),
    },
    hero: {
      label: text(hero.label, fallbackContactPage.hero.label),
      statement: text(hero.statement, fallbackContactPage.hero.statement),
    },
    inquiry: {
      body: text(inquiry.body, fallbackContactPage.inquiry.body),
      label: text(inquiry.label, fallbackContactPage.inquiry.label),
    },
  };
}

export async function getContactFormSettings(
  locale: SiteLocale = defaultLocale,
): Promise<ContactFormSettingsContent> {
  const data = await getGlobal<Record<string, unknown>>("contact-form-settings", locale);
  const labels = (data?.labels ?? {}) as Record<string, unknown>;
  const messages = (data?.messages ?? {}) as Record<string, unknown>;
  const placeholders = (data?.placeholders ?? {}) as Record<string, unknown>;

  return {
    labels: {
      city: text(labels.city, fallbackContactFormSettings.labels.city),
      company: text(labels.company, fallbackContactFormSettings.labels.company),
      country: text(labels.country, fallbackContactFormSettings.labels.country),
      email: text(labels.email, fallbackContactFormSettings.labels.email),
      estimatedBudget: text(
        labels.estimatedBudget,
        fallbackContactFormSettings.labels.estimatedBudget,
      ),
      message: text(labels.message, fallbackContactFormSettings.labels.message),
      name: text(labels.name, fallbackContactFormSettings.labels.name),
      projectType: text(labels.projectType, fallbackContactFormSettings.labels.projectType),
      studioInformation: text(
        labels.studioInformation,
        fallbackContactFormSettings.labels.studioInformation,
      ),
      submit: text(labels.submit, fallbackContactFormSettings.labels.submit),
      timeline: text(labels.timeline, fallbackContactFormSettings.labels.timeline),
    },
    messages: {
      defaultNote: text(messages.defaultNote, fallbackContactFormSettings.messages.defaultNote),
      emailError: text(messages.emailError, fallbackContactFormSettings.messages.emailError),
      requiredError: text(
        messages.requiredError,
        fallbackContactFormSettings.messages.requiredError,
      ),
      success: text(messages.success, fallbackContactFormSettings.messages.success),
    },
    placeholders: {
      message: text(placeholders.message, fallbackContactFormSettings.placeholders.message),
    },
  };
}

export async function getWorkPageContent(
  locale: SiteLocale = defaultLocale,
): Promise<WorkPageContent> {
  const data = await getGlobal<Record<string, unknown>>("work-page", locale);
  const hero = (data?.hero ?? {}) as Record<string, unknown>;
  const archive = (data?.archive ?? {}) as Record<string, unknown>;
  const fallbacks = (data?.fallbacks ?? {}) as Record<string, unknown>;

  return {
    archive: {
      ariaLabel: text(archive.ariaLabel, fallbackWorkPage.archive.ariaLabel),
      emptyLocationLabel: text(
        archive.emptyLocationLabel,
        fallbackWorkPage.archive.emptyLocationLabel,
      ),
      emptyNumberLabel: text(archive.emptyNumberLabel, fallbackWorkPage.archive.emptyNumberLabel),
      emptyTitle: text(archive.emptyTitle, fallbackWorkPage.archive.emptyTitle),
      emptyYearLabel: text(archive.emptyYearLabel, fallbackWorkPage.archive.emptyYearLabel),
      plateLabel: text(archive.plateLabel, fallbackWorkPage.archive.plateLabel),
      platePlaceholder: text(archive.platePlaceholder, fallbackWorkPage.archive.platePlaceholder),
    },
    fallbacks: {
      location: text(fallbacks.location, fallbackWorkPage.fallbacks.location),
      projectDescription: text(
        fallbacks.projectDescription,
        fallbackWorkPage.fallbacks.projectDescription,
      ),
      year: text(fallbacks.year, fallbackWorkPage.fallbacks.year),
      yearRange: text(fallbacks.yearRange, fallbackWorkPage.fallbacks.yearRange),
    },
    hero: {
      intro: text(hero.intro, fallbackWorkPage.hero.intro),
      label: text(hero.label, fallbackWorkPage.hero.label),
      pluralProjectLabel: text(hero.pluralProjectLabel, fallbackWorkPage.hero.pluralProjectLabel),
      singularProjectLabel: text(
        hero.singularProjectLabel,
        fallbackWorkPage.hero.singularProjectLabel,
      ),
      title: text(hero.title, fallbackWorkPage.hero.title),
    },
  };
}

export async function getProjectDetailSettings(
  locale: SiteLocale = defaultLocale,
): Promise<ProjectDetailSettingsContent> {
  const data = await getGlobal<Record<string, unknown>>("project-detail-settings", locale);
  const labels = (data?.labels ?? {}) as Record<string, unknown>;
  const fallbacks = (data?.fallbacks ?? {}) as Record<string, unknown>;
  const serviceLabels = (data?.serviceLabels ?? {}) as Record<string, unknown>;
  const statusLabels = (data?.statusLabels ?? {}) as Record<string, unknown>;

  return {
    fallbacks: {
      category: text(fallbacks.category, fallbackProjectDetailSettings.fallbacks.category),
      description: text(fallbacks.description, fallbackProjectDetailSettings.fallbacks.description),
      location: text(fallbacks.location, fallbackProjectDetailSettings.fallbacks.location),
      year: text(fallbacks.year, fallbackProjectDetailSettings.fallbacks.year),
    },
    labels: {
      architect: text(labels.architect, fallbackProjectDetailSettings.labels.architect),
      area: text(labels.area, fallbackProjectDetailSettings.labels.area),
      materials: text(labels.materials, fallbackProjectDetailSettings.labels.materials),
      nextProject: text(labels.nextProject, fallbackProjectDetailSettings.labels.nextProject),
      services: text(labels.services, fallbackProjectDetailSettings.labels.services),
      statement: text(labels.statement, fallbackProjectDetailSettings.labels.statement),
      status: text(labels.status, fallbackProjectDetailSettings.labels.status),
    },
    serviceLabels: {
      architecture: text(
        serviceLabels.architecture,
        fallbackProjectDetailSettings.serviceLabels.architecture,
      ),
      furnitureDesign: text(
        serviceLabels.furnitureDesign,
        fallbackProjectDetailSettings.serviceLabels.furnitureDesign,
      ),
      interiorDesign: text(
        serviceLabels.interiorDesign,
        fallbackProjectDetailSettings.serviceLabels.interiorDesign,
      ),
      landscape: text(
        serviceLabels.landscape,
        fallbackProjectDetailSettings.serviceLabels.landscape,
      ),
      masterPlanning: text(
        serviceLabels.masterPlanning,
        fallbackProjectDetailSettings.serviceLabels.masterPlanning,
      ),
    },
    statusLabels: {
      built: text(statusLabels.built, fallbackProjectDetailSettings.statusLabels.built),
      completed: text(statusLabels.completed, fallbackProjectDetailSettings.statusLabels.completed),
      concept: text(statusLabels.concept, fallbackProjectDetailSettings.statusLabels.concept),
      inProgress: text(
        statusLabels.inProgress,
        fallbackProjectDetailSettings.statusLabels.inProgress,
      ),
    },
  };
}

export async function getSiteChromeContent(
  locale: SiteLocale = defaultLocale,
): Promise<SiteChromeContent> {
  const [settingsData, contactData, navigationData] = await Promise.all([
    getGlobal<Record<string, unknown>>("site-settings", locale),
    getGlobal<Record<string, unknown>>("contact-info", locale),
    getGlobal<Record<string, unknown>>("navigation", locale),
  ]);

  const navigationItems = arrayItems(navigationData?.items, [])
    .map((item) => {
      const row = item as Record<string, unknown>;
      return {
        href: text(row.url, ""),
        label: text(row.label, ""),
        order: typeof row.order === "number" ? row.order : 0,
        visible: row.visible !== false,
      };
    })
    .filter((item) => item.href && item.label && item.visible)
    .sort((a, b) => a.order - b.order)
    .map(({ href, label }) => ({ href, label }));

  const socialLinks = arrayItems(settingsData?.socialLinks, [])
    .map((item) => {
      const row = item as Record<string, unknown>;
      return {
        href: text(row.url, ""),
        label: text(row.label, ""),
      };
    })
    .filter((item) => item.href && item.label);

  const address = text(contactData?.address, fallbackContactDetails.address);
  const [city = fallbackContactDetails.city, country = fallbackContactDetails.country] = address
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  const networkLinks = [
    { href: text(contactData?.instagram, ""), label: "Instagram" },
    { href: text(contactData?.linkedin, ""), label: "LinkedIn" },
    { href: text(contactData?.behance, ""), label: "Behance" },
    { href: text(contactData?.pinterest, ""), label: "Pinterest" },
  ].filter((item) => item.href);

  return {
    contact: {
      address,
      city,
      country,
      email: text(contactData?.email, fallbackContactDetails.email),
      phone: text(contactData?.phone, fallbackContactDetails.phone),
      socialLinks:
        socialLinks.length > 0
          ? socialLinks
          : networkLinks.length > 0
            ? networkLinks
            : fallbackContactDetails.socialLinks,
    },
    navigationItems: navigationItems.length > 0 ? navigationItems : getPrimaryNavigation(locale),
    settings: {
      copyright: text(settingsData?.copyright, fallbackSiteSettings.copyright),
      footerDescription: text(
        settingsData?.footerDescription,
        fallbackSiteSettings.footerDescription,
      ),
      siteName: resolveBrandName(text(settingsData?.siteName, fallbackSiteSettings.siteName)),
      tagline: text(settingsData?.tagline, fallbackSiteSettings.tagline),
    },
  };
}

export type CmsMedia = Media;
