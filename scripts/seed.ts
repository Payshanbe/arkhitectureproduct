import path from "node:path";

import configPromise from "@payload-config";
import { getPayload, type Payload } from "payload";

interface CategorySeed {
  description: string;
  order: number;
  slug: string;
  title: string;
}

interface ProjectSeed {
  architect: string;
  area: string;
  categorySlug: string;
  city: string;
  country: string;
  description: string;
  excerpt: string;
  featured: boolean;
  order: number;
  services: Array<
    "architecture" | "interior-design" | "master-planning" | "furniture-design" | "landscape"
  >;
  slug: string;
  title: string;
  year: number;
}

const placeholderImagePath = path.resolve(process.cwd(), "public/images/home-hero-placeholder.png");

const categories: CategorySeed[] = [
  {
    description: "Private residences, villas, and houses shaped around daily ritual and landscape.",
    order: 1,
    slug: "residential",
    title: "Residential",
  },
  {
    description: "Interior environments with a careful relationship between material, light, and use.",
    order: 2,
    slug: "interior",
    title: "Interior",
  },
  {
    description: "Architecture-led cultural, hospitality, and public-facing spaces.",
    order: 3,
    slug: "architecture",
    title: "Architecture",
  },
  {
    description: "Hospitality spaces that hold atmosphere without excess.",
    order: 4,
    slug: "hospitality",
    title: "Hospitality",
  },
];

const projects: ProjectSeed[] = [
  {
    architect: "Arkhitecture Studio",
    area: "420 sqm",
    categorySlug: "residential",
    city: "Paros",
    country: "Greece",
    description:
      "A low courtyard residence arranged around shade, threshold, and the movement of sea air. The plan separates public and private rooms with a sequence of sheltered terraces, allowing the house to open gradually to the landscape while remaining quiet at its centre.",
    excerpt:
      "A courtyard residence shaped by stone, shade, and open thresholds near the Aegean coast.",
    featured: true,
    order: 1,
    services: ["architecture", "interior-design", "landscape"],
    slug: "courtyard-residence",
    title: "Courtyard Residence",
    year: 2026,
  },
  {
    architect: "Arkhitecture Studio",
    area: "180 sqm",
    categorySlug: "interior",
    city: "Milan",
    country: "Italy",
    description:
      "A restrained apartment interior defined by mineral plaster, walnut joinery, and diffused northern light. Rooms are treated as a continuous sequence, with storage, seating, and thresholds integrated into the architecture rather than added as objects.",
    excerpt:
      "A Milan apartment composed through mineral surfaces, walnut joinery, and softened daylight.",
    featured: true,
    order: 2,
    services: ["interior-design", "furniture-design"],
    slug: "stone-apartment",
    title: "Stone Apartment",
    year: 2025,
  },
  {
    architect: "Arkhitecture Studio",
    area: "760 sqm",
    categorySlug: "architecture",
    city: "Copenhagen",
    country: "Denmark",
    description:
      "A small gallery and archive for architectural drawings, models, and material studies. The building uses a compact footprint and a quiet sequence of rooms, balancing controlled exhibition light with moments of openness to the street.",
    excerpt:
      "A compact gallery and archive arranged around controlled light and measured public rooms.",
    featured: true,
    order: 3,
    services: ["architecture", "interior-design"],
    slug: "north-light-gallery",
    title: "North Light Gallery",
    year: 2024,
  },
  {
    architect: "Arkhitecture Studio",
    area: "52 rooms",
    categorySlug: "hospitality",
    city: "Lisbon",
    country: "Portugal",
    description:
      "A quiet hotel renovation that preserves the weight of the existing masonry while introducing lighter timber rooms above. Public spaces are kept low and atmospheric, with furniture, lighting, and stone details working as part of one continuous language.",
    excerpt:
      "A Lisbon hotel renewal balancing historic masonry with quiet contemporary interiors.",
    featured: true,
    order: 4,
    services: ["architecture", "interior-design", "furniture-design"],
    slug: "limestone-hotel",
    title: "Limestone Hotel",
    year: 2026,
  },
  {
    architect: "Arkhitecture Studio",
    area: "310 sqm",
    categorySlug: "residential",
    city: "Sonoma",
    country: "United States",
    description:
      "A rural house placed lightly between oak trees and low vineyard rows. Deep roof edges temper the sun, while the interior is organized as a long inhabited wall facing a shaded outdoor room.",
    excerpt:
      "A rural house placed between oak trees, vineyard rows, and long shaded thresholds.",
    featured: false,
    order: 5,
    services: ["architecture", "interior-design", "landscape"],
    slug: "oak-house",
    title: "Oak House",
    year: 2023,
  },
  {
    architect: "Arkhitecture Studio",
    area: "240 sqm",
    categorySlug: "interior",
    city: "Paris",
    country: "France",
    description:
      "An atelier interior for a ceramicist, designed around worktables, drying shelves, and the changing texture of raw clay. The palette remains quiet so that the objects, tools, and daylight become the main presence.",
    excerpt:
      "A ceramic atelier organized around work, storage, daylight, and the texture of raw clay.",
    featured: false,
    order: 6,
    services: ["interior-design", "furniture-design"],
    slug: "ceramic-atelier",
    title: "Ceramic Atelier",
    year: 2024,
  },
  {
    architect: "Arkhitecture Studio",
    area: "680 sqm",
    categorySlug: "architecture",
    city: "Kyoto",
    country: "Japan",
    description:
      "A small research retreat composed as a sequence of rooms, gardens, and covered walks. The project studies privacy through layers rather than enclosure, allowing each interior to hold a precise relationship to moss, water, and timber shadow.",
    excerpt:
      "A research retreat composed through rooms, gardens, covered walks, and layered privacy.",
    featured: false,
    order: 7,
    services: ["architecture", "landscape"],
    slug: "garden-research-house",
    title: "Garden Research House",
    year: 2025,
  },
  {
    architect: "Arkhitecture Studio",
    area: "95 sqm",
    categorySlug: "hospitality",
    city: "Reykjavik",
    country: "Iceland",
    description:
      "A small dining room shaped around stone, steam, and the low winter horizon. The interior uses few elements: a long counter, dark timber seating, and a soft ceiling plane that gathers the room without closing it down.",
    excerpt:
      "A quiet dining room shaped by stone, steam, timber, and the low northern horizon.",
    featured: false,
    order: 8,
    services: ["interior-design", "furniture-design"],
    slug: "basalt-room",
    title: "Basalt Room",
    year: 2023,
  },
];

async function upsertCategory(payload: Payload, category: CategorySeed) {
  const existing = await payload.find({
    collection: "project-categories",
    limit: 1,
    where: {
      slug: {
        equals: category.slug,
      },
    },
  });

  const data = {
    description: category.description,
    order: category.order,
    slug: category.slug,
    title: category.title,
  };

  if (existing.docs[0]) {
    return payload.update({
      collection: "project-categories",
      data,
      id: existing.docs[0].id,
    });
  }

  return payload.create({
    collection: "project-categories",
    data,
  });
}

async function getOrCreatePlaceholderMedia(payload: Payload) {
  const existing = await payload.find({
    collection: "media",
    limit: 1,
    where: {
      alt: {
        equals: "Editorial placeholder image for architecture project content.",
      },
    },
  });

  if (existing.docs[0]) {
    return existing.docs[0];
  }

  return payload.create({
    collection: "media",
    data: {
      alt: "Editorial placeholder image for architecture project content.",
      caption: "Temporary image pending final project photography.",
      orientation: "landscape",
      photographer: "Placeholder",
    },
    filePath: placeholderImagePath,
  });
}

async function upsertProject(
  payload: Payload,
  project: ProjectSeed,
  categoryId: number,
  mediaId: number,
) {
  const existing = await payload.find({
    collection: "projects",
    limit: 1,
    where: {
      slug: {
        equals: project.slug,
      },
    },
  });

  const location = project.city;
  const gallery = [1, 2, 3].map((index) => ({
    altText: `${project.title} architectural placeholder image ${index}.`,
    caption: `${project.title}, study image ${index}.`,
    image: mediaId,
    order: index,
    orientation: "landscape" as const,
  }));

  const data = {
    architect: project.architect,
    area: project.area,
    category: categoryId,
    city: project.city,
    concept: project.description,
    country: project.country,
    coverImage: mediaId,
    description: project.description,
    excerpt: project.excerpt,
    featured: project.featured,
    gallery,
    location,
    order: project.order,
    published: true,
    services: project.services,
    shortDescription: project.excerpt,
    slug: project.slug,
    title: project.title,
    year: project.year,
    _status: "published" as const,
  };

  if (existing.docs[0]) {
    return payload.update({
      collection: "projects",
      data,
      id: existing.docs[0].id,
    });
  }

  return payload.create({
    collection: "projects",
    data,
  });
}

async function seed() {
  const payload = await getPayload({ config: configPromise });
  const categoryBySlug = new Map<string, number>();

  for (const category of categories) {
    const savedCategory = await upsertCategory(payload, category);
    categoryBySlug.set(category.slug, Number(savedCategory.id));
  }

  const placeholderMedia = await getOrCreatePlaceholderMedia(payload);
  const mediaId = Number(placeholderMedia.id);

  for (const project of projects) {
    const categoryId = categoryBySlug.get(project.categorySlug);

    if (!categoryId) {
      throw new Error(`Missing category for project: ${project.title}`);
    }

    await upsertProject(payload, project, categoryId, mediaId);
  }

  payload.logger.info(`Seeded ${categories.length} categories and ${projects.length} projects.`);
}

await seed();
