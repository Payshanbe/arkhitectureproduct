import path from "node:path";

import configPromise from "@payload-config";
import { getPayload, type Payload } from "payload";

type PayloadID = number;
type BuildingType = "architecture" | "hospitality" | "interior" | "residential";
type ProjectStatus = "built" | "completed" | "concept" | "in-progress";
type SeedMediaRole = "cover" | "gallery-01" | "gallery-02" | "gallery-03";
type Service =
  | "architecture"
  | "furniture-design"
  | "interior-design"
  | "landscape"
  | "master-planning";

interface CategorySeed {
  description: string;
  order: number;
  slug: string;
  title: string;
}

interface ProjectSeed {
  area: string;
  buildingType: BuildingType;
  categorySlug: string;
  city: string;
  concept: string;
  country: string;
  description: string;
  excerpt: string;
  featured: boolean;
  lightingConcept: string;
  materials: string;
  order: number;
  photographyDirection: string;
  relatedSlugs: string[];
  seoDescription: string;
  seoTitle: string;
  services: Service[];
  slug: string;
  spatialQualities: string;
  status: ProjectStatus;
  summary: string;
  tagline: string;
  title: string;
  year: number;
}

const placeholderImagePath = path.resolve(process.cwd(), "public/images/home-hero-placeholder.png");
const studioName = "Arkhitecture";

const categories: CategorySeed[] = [
  {
    description: "Private residences and houses shaped around daily ritual, landscape, and light.",
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
    description: "Architecture-led cultural, gallery, pavilion, and spatial projects.",
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
    area: "420 sqm",
    buildingType: "residential",
    categorySlug: "residential",
    city: "Paros",
    concept:
      "An inward-facing house where the courtyard becomes the emotional and climatic center of the project.",
    country: "Greece",
    description:
      "Courtyard Residence begins with the idea of protection. Rather than opening entirely to the landscape, the house turns inward around a quiet garden, allowing light, wind, and shade to enter in measured ways. The plan is organized as a sequence of rooms and thresholds, each one calibrated to soften the transition between inside and outside.\n\nThe architecture uses local stone, natural plaster, oak, and pale concrete to create a restrained material language that feels rooted rather than decorative. Deep openings frame the courtyard, while low horizontal rooflines keep the building close to the ground. The interiors remain intentionally spare, allowing texture, shadow, and proportion to carry the atmosphere.\n\nThe project is not conceived as a villa, but as a slow domestic landscape. It prioritizes privacy, natural cooling, and daily rituals: breakfast in shade, movement across stone floors, and quiet evening light settling on plaster walls.",
    excerpt:
      "A low stone house organized around a protected interior garden, shaded openings, and calm domestic rooms.",
    summary:
      "Courtyard Residence is a low stone house organized around a protected interior garden. Thick walls, shaded openings, and restrained interiors create a calm sequence between domestic rooms, courtyard life, and the dry Aegean landscape while keeping light, wind, and privacy carefully balanced.",
    featured: true,
    lightingConcept:
      "Light is filtered through deep reveals, courtyard shade, and indirect reflections from pale plaster surfaces. The strongest light is kept outside the rooms, allowing interiors to feel quiet and cool.",
    materials:
      "Local limestone, natural plaster, pale concrete, oak joinery, bronze details, linen textiles, olive planting.",
    order: 1,
    photographyDirection:
      "Use wide courtyard views, long interior perspectives, and quiet threshold moments. Photograph in early morning or late afternoon with soft shadows.",
    relatedSlugs: ["stone-apartment", "plaster-house", "ridge-house"],
    seoDescription:
      "Courtyard Residence is a residential architecture project in Paros shaped by limestone, shade, natural plaster, and a protected courtyard sequence.",
    seoTitle: "Courtyard Residence | Architecture Studio",
    services: ["architecture", "interior-design", "landscape"],
    slug: "courtyard-residence",
    spatialQualities:
      "Protected courtyard sequence, thick thresholds, low horizontal massing, slow transitions between interior and exterior, calm domestic rooms, strong relationship to shade and wind.",
    status: "concept",
    tagline: "A stone residence shaped around shade, silence, and a protected garden room.",
    title: "Courtyard Residence",
    year: 2026,
  },
  {
    area: "165 sqm",
    buildingType: "interior",
    categorySlug: "interior",
    city: "Milan",
    concept:
      "A city apartment composed as a quiet material sequence, where stone and timber create continuity across rooms.",
    country: "Italy",
    description:
      "Stone Apartment is designed as a sequence of quiet rooms inside an existing Milanese building. The intervention does not attempt to compete with the city. Instead, it creates a protected interior world through material continuity, careful proportions, and a restrained approach to detail.\n\nTravertine surfaces define the kitchen and bathing spaces, while oak joinery softens the living areas and provides storage without visual interruption. Doorways are treated as thresholds rather than simple openings, giving each room a distinct pace. The palette remains warm and narrow, allowing the apartment to feel calm without becoming empty.\n\nThe furniture is low, tactile, and integrated where possible. Linen, bronze, stone, and timber are used to create subtle shifts in weight and texture. The result is an interior that feels precise but lived-in, where domestic function is absorbed into the architecture rather than displayed.",
    excerpt:
      "A restrained Milan interior shaped through travertine, oak joinery, and soft domestic thresholds.",
    summary:
      "Stone Apartment is a restrained city interior shaped through travertine, oak joinery, and soft thresholds between public and private rooms. The project reduces visual noise so daily domestic rituals feel clear, warm, and composed within a compact Milanese plan.",
    featured: true,
    lightingConcept:
      "Soft daylight is diffused through fabric and reflected across stone surfaces. Artificial lighting is concealed and warm, supporting the material atmosphere without becoming visible as a decorative system.",
    materials:
      "Travertine, oak veneer, natural plaster, bronze hardware, linen curtains, soft wool upholstery, honed stone flooring.",
    order: 2,
    photographyDirection:
      "Photograph from room edges to show depth and proportion. Include quiet details only after establishing the full spatial atmosphere.",
    relatedSlugs: ["courtyard-residence", "oak-room", "north-light-gallery"],
    seoDescription:
      "Stone Apartment is a Milan interior design project shaped by travertine, oak joinery, warm light, and restrained domestic proportions.",
    seoTitle: "Stone Apartment | Interior Design Studio",
    services: ["interior-design", "furniture-design"],
    slug: "stone-apartment",
    spatialQualities:
      "Calm room-to-room rhythm, integrated storage, soft thresholds, low visual noise, tactile material continuity, domestic intimacy.",
    status: "completed",
    tagline: "A Milan apartment refined through stone, oak, and quiet domestic proportion.",
    title: "Stone Apartment",
    year: 2025,
  },
  {
    area: "310 sqm",
    buildingType: "architecture",
    categorySlug: "architecture",
    city: "Copenhagen",
    concept:
      "A gallery organized as a sequence of light conditions, using indirect daylight to create stillness and focus.",
    country: "Denmark",
    description:
      "North Light Gallery is shaped by the discipline of looking. The project avoids spectacle and instead creates a calm sequence of rooms where indirect northern light becomes the primary architectural material. Each space is proportioned to slow the visitor, allowing artworks to be seen without visual interference.\n\nThe building uses pale plaster, concrete floors, and narrow openings to control brightness and shadow. Circulation is simple but deliberate, moving from a compressed entrance into more open exhibition rooms. The transitions are quiet, with subtle changes in ceiling height and wall thickness creating a sense of progression.\n\nThe gallery is not neutral in the generic sense. Its restraint is active. Surfaces, thresholds, and light conditions are designed to hold attention without demanding it. The result is a cultural space that feels precise, still, and deeply connected to the northern climate.",
    excerpt:
      "A compact cultural space organized around indirect daylight, plaster, and a slow room sequence.",
    summary:
      "North Light Gallery is a compact cultural space organized around indirect daylight and muted material surfaces. The architecture supports a slow movement through rooms where art, shadow, acoustic quiet, and precise proportions remain carefully balanced.",
    featured: true,
    lightingConcept:
      "North-facing apertures and concealed baffles create diffuse light without glare. Artificial lighting remains secondary and is used only to maintain consistency on darker days.",
    materials: "Lime plaster, pale concrete, brushed steel, soft white paint, oak benches, linen panels.",
    order: 3,
    photographyDirection:
      "Use frontal compositions, empty rooms, and soft daylight gradients. Show the gallery before showing objects.",
    relatedSlugs: ["stone-apartment", "garden-pavilion", "limestone-hotel"],
    seoDescription:
      "North Light Gallery is a Copenhagen architecture project shaped by indirect daylight, plaster surfaces, and a quiet sequence of exhibition rooms.",
    seoTitle: "North Light Gallery | Architecture Studio",
    services: ["architecture", "interior-design"],
    slug: "north-light-gallery",
    spatialQualities:
      "Slow exhibition sequence, controlled daylight, minimal thresholds, quiet acoustic atmosphere, muted surfaces, rooms scaled for attention.",
    status: "completed",
    tagline:
      "A small gallery where indirect light, plaster, and silence shape the experience of art.",
    title: "North Light Gallery",
    year: 2024,
  },
  {
    area: "780 sqm",
    buildingType: "hospitality",
    categorySlug: "hospitality",
    city: "Menorca",
    concept:
      "A hospitality project organized as a series of shaded thresholds between public gathering and private retreat.",
    country: "Spain",
    description:
      "Limestone Hotel is conceived as a quiet sequence of shared and private spaces. The project draws from Menorca's material landscape, using limestone walls, shaded passages, and soft exterior rooms to create a hospitality experience that feels grounded rather than styled.\n\nThe arrival is intentionally understated. Guests move through a compressed entry into a courtyard where stone, planting, and water moderate the climate. Public rooms are open and tactile, while guest suites are more enclosed, organized around calm light and simple material surfaces.\n\nThe interiors avoid the visual language of resort luxury. Linen, timber, plaster, and bronze are used with restraint, allowing the architecture to hold the atmosphere. Furniture is low and quiet. Details are durable and direct. The hotel is designed as a place for slower occupation, where shade, texture, and spatial rhythm become more important than display.",
    excerpt:
      "A small Menorca hotel shaped by local stone, shaded courtyards, and restrained guest rooms.",
    summary:
      "Limestone Hotel is a small hospitality project shaped by local stone, shaded courtyards, and restrained guest rooms. The design creates a gradual movement from public gathering spaces into private retreats without relying on decorative excess or resort-style spectacle.",
    featured: true,
    lightingConcept:
      "Light is softened through courtyards, covered passages, and recessed openings. Guest rooms use indirect daylight and warm evening lighting to preserve a quiet atmosphere.",
    materials:
      "Menorcan limestone, natural plaster, dark timber, bronze fixtures, linen textiles, clay-toned flooring, Mediterranean planting.",
    order: 4,
    photographyDirection:
      "Photograph courtyards, shaded passages, and quiet guest-room thresholds. Use late afternoon light with gentle shadows.",
    relatedSlugs: ["courtyard-residence", "north-light-gallery", "ridge-house"],
    seoDescription:
      "Limestone Hotel is a Menorca hospitality architecture project shaped by local stone, shaded courtyards, linen interiors, and restrained spatial transitions.",
    seoTitle: "Limestone Hotel | Hospitality Architecture",
    services: ["architecture", "interior-design", "furniture-design", "landscape"],
    slug: "limestone-hotel",
    spatialQualities:
      "Slow arrival sequence, shaded courtyards, public-to-private gradient, tactile guest rooms, calm exterior rooms, hospitality without spectacle.",
    status: "completed",
    tagline: "A small hospitality project built from local stone, shade, and slow transitions.",
    title: "Limestone Hotel",
    year: 2023,
  },
  {
    area: "510 sqm",
    buildingType: "residential",
    categorySlug: "residential",
    city: "Sonoma",
    concept:
      "A low hillside house that follows topography and uses long horizontal space to frame landscape without overpowering it.",
    country: "United States",
    description:
      "Ridge House begins with the line of the hill. The residence is arranged as a long, low structure that follows the terrain, allowing the building to sit quietly within the landscape. Instead of using height or spectacle, the project relies on proportion, shadow, and framed views.\n\nThe plan stretches along the ridge, with living spaces opening toward the valley and private rooms held closer to the slope. Terraces are protected by deep roof overhangs, creating exterior rooms that remain usable throughout the day. The material palette is direct and durable: concrete, charred timber, stone, and bronze.\n\nInside, the house is calm and grounded. Long sightlines connect rooms without making them feel exposed. Heavy materials are balanced by warm timber and soft textiles. The project is designed for a slow relationship with landscape, where weather, distance, and changing light become part of daily life.",
    excerpt:
      "A hillside residence shaped by terrain, long rooflines, protected terraces, and framed valley views.",
    summary:
      "Ridge House is a hillside residence shaped by terrain, long rooflines, and protected terraces. The architecture follows the land rather than dominating it, framing valley views through a restrained material palette and a calm horizontal spatial rhythm.",
    featured: true,
    lightingConcept:
      "Deep overhangs control solar exposure and create shaded exterior rooms. Interior light is directional but soft, with valley views framed through long horizontal openings.",
    materials:
      "Board-formed concrete, charred timber, natural stone, dark bronze, oak interiors, wool and linen textiles, native planting.",
    order: 5,
    photographyDirection:
      "Use wide landscape compositions, low exterior angles, and long interior perspectives toward the valley.",
    relatedSlugs: ["courtyard-residence", "plaster-house", "garden-pavilion"],
    seoDescription:
      "Ridge House is a Sonoma residential architecture project shaped by hillside terrain, concrete, charred timber, protected terraces, and framed valley views.",
    seoTitle: "Ridge House | Residential Architecture",
    services: ["architecture", "interior-design", "master-planning", "landscape"],
    slug: "ridge-house",
    spatialQualities:
      "Linear plan, terrain-led massing, protected terraces, framed long views, grounded interiors, strong indoor-outdoor continuity.",
    status: "in-progress",
    tagline: "A hillside residence following the contour of the land with quiet precision.",
    title: "Ridge House",
    year: 2025,
  },
  {
    area: "95 sqm",
    buildingType: "interior",
    categorySlug: "interior",
    city: "London",
    concept:
      "A compact interior where oak joinery becomes architecture, furniture, storage, and atmosphere at once.",
    country: "United Kingdom",
    description:
      "Oak Room is an interior study in compression and warmth. The project transforms a compact urban space into a private suite for reading, working, and retreat, using oak as both structure and atmosphere. Rather than adding decorative layers, the design absorbs function into the walls.\n\nStorage, shelving, seating, and work surfaces are integrated into a continuous timber language. The room is organized around proportion and touch: the height of a shelf, the depth of a bench, the softness of a curtain, the quiet weight of bronze hardware. Each detail is modest, but together they create a strong sense of enclosure.\n\nLighting is warm and indirect, reflected through timber surfaces rather than exposed as a visual feature. The result is intimate without feeling heavy. Oak Room is a small project, but it expresses the studio's larger philosophy: restraint, material clarity, and atmosphere shaped through precise decisions.",
    excerpt:
      "A compact private interior defined by oak paneling, integrated furniture, and warm reflected light.",
    summary:
      "Oak Room is a compact private interior defined by oak paneling, integrated furniture, and careful proportions. The project turns a small footprint into a warm, quiet sequence of work, reading, storage, and retreat through precise joinery.",
    featured: false,
    lightingConcept:
      "Indirect lighting washes timber surfaces and avoids glare. Small task lights support reading and work without disrupting the calm enclosure of the room.",
    materials:
      "Natural oak, bronze hardware, soft black metal, wool upholstery, linen curtains, honed stone surface, warm plaster.",
    order: 6,
    photographyDirection:
      "Balance wide room views with close material studies. Use warm but natural interior light.",
    relatedSlugs: ["stone-apartment", "garden-pavilion", "north-light-gallery"],
    seoDescription:
      "Oak Room is a London interior design project shaped by oak joinery, integrated furniture, bronze details, and warm reflected light.",
    seoTitle: "Oak Room | Interior Design Studio",
    services: ["interior-design", "furniture-design"],
    slug: "oak-room",
    spatialQualities:
      "Compact retreat, integrated furniture, warm enclosure, quiet acoustic quality, tactile surfaces, precise domestic scale.",
    status: "completed",
    tagline: "A compact private interior shaped by oak, proportion, and warm reflected light.",
    title: "Oak Room",
    year: 2024,
  },
  {
    area: "360 sqm",
    buildingType: "residential",
    categorySlug: "residential",
    city: "Tulum",
    concept:
      "A climate-led house where thick plaster walls, garden rooms, and shade create a calm domestic landscape.",
    country: "Mexico",
    description:
      "Plaster House is organized around the idea of coolness. In a tropical setting often associated with openness, the project instead uses mass, shade, and layered thresholds to create a slower form of comfort. Thick plaster walls define the rooms, while exterior passages and garden courts soften the boundary between inside and outside.\n\nThe plan is simple and porous. Living areas open to shaded terraces, bedrooms are held behind deeper walls, and planting is used as a spatial material rather than decoration. Clay-toned floors, natural plaster, timber, and linen create a palette that feels tactile and quiet.\n\nThe architecture avoids resort imagery. It is not designed as an escape from context, but as a calibrated response to climate, humidity, and daily use. The project holds light at the edges, allowing interiors to remain soft, shaded, and materially present.",
    excerpt:
      "A tropical residence shaped by thick plaster walls, shaded exterior rooms, and garden thresholds.",
    summary:
      "Plaster House is a tropical residence shaped by thick walls, shaded exterior rooms, and a soft boundary between garden and interior. The project uses mass, shadow, planting, and natural plaster to create calm in a humid landscape.",
    featured: false,
    lightingConcept:
      "Light is kept indirect through overhangs, screens, and garden-filtered openings. The strongest illumination remains outside, while interiors receive soft reflected light.",
    materials:
      "Natural plaster, clay flooring, timber screens, linen textiles, raw stone, bronze fixtures, dense tropical planting.",
    order: 7,
    photographyDirection:
      "Use shaded garden views, plaster texture, and calm exterior rooms. Avoid resort styling or saturated tropical cliches.",
    relatedSlugs: ["courtyard-residence", "ridge-house", "limestone-hotel"],
    seoDescription:
      "Plaster House is a Tulum residential architecture project shaped by natural plaster, shaded garden rooms, thick walls, and tropical light.",
    seoTitle: "Plaster House | Residential Architecture",
    services: ["architecture", "interior-design", "landscape"],
    slug: "plaster-house",
    spatialQualities:
      "Thick walls, shaded exterior rooms, garden thresholds, soft indoor-outdoor boundary, climate-led comfort, calm tropical atmosphere.",
    status: "concept",
    tagline: "A tropical residence of thick plaster walls, garden thresholds, and deep shade.",
    title: "Plaster House",
    year: 2026,
  },
  {
    area: "120 sqm",
    buildingType: "architecture",
    categorySlug: "architecture",
    city: "Kyoto",
    concept:
      "A garden room where timber structure, filtered light, and framed views create a slow sequence of arrival and pause.",
    country: "Japan",
    description:
      "Garden Pavilion is designed as a modest room within a larger landscape. The project is less concerned with object form than with how a person arrives, pauses, and looks outward. A narrow path leads through planting before reaching a timber structure held lightly above the ground.\n\nThe pavilion is organized around framed views and filtered light. Timber columns establish a calm rhythm, while translucent surfaces soften brightness and make the garden feel close without becoming visually loud. The interior is sparse: a low platform, a reading surface, concealed storage, and a small hearth-like point of gathering.\n\nMaterials are used with restraint and care. Timber, stone, plaster, and woven surfaces create a tactile but quiet setting. The pavilion is intentionally small, allowing scale, silence, and seasonal change to become the main experience. It is architecture as pause rather than performance.",
    excerpt:
      "A small timber pavilion set within a quiet garden sequence of filtered light and framed views.",
    summary:
      "Garden Pavilion is a small timber structure set within a quiet garden sequence. The project uses filtered light, framed views, restrained material detail, and a slow arrival path to create a room for pause, reading, and seasonal observation.",
    featured: false,
    lightingConcept:
      "Light is filtered through translucent surfaces, screens, and planting. The pavilion should feel softly illuminated, with shadow and garden movement forming part of the atmosphere.",
    materials:
      "Timber structure, natural plaster, stone path, woven screens, soft black metal, clay finish, garden planting.",
    order: 8,
    photographyDirection:
      "Photograph the approach, framed views, and quiet interior looking back to the garden. Use overcast or soft morning light.",
    relatedSlugs: ["north-light-gallery", "oak-room", "ridge-house"],
    seoDescription:
      "Garden Pavilion is a Kyoto architecture project shaped by timber structure, filtered daylight, garden views, and a quiet sequence of arrival.",
    seoTitle: "Garden Pavilion | Architecture Studio",
    services: ["architecture", "interior-design", "landscape"],
    slug: "garden-pavilion",
    spatialQualities:
      "Small pavilion scale, framed garden views, slow arrival path, filtered daylight, sparse interior, seasonal stillness.",
    status: "completed",
    tagline: "A small timber pavilion designed as a quiet room within a garden.",
    title: "Garden Pavilion",
    year: 2023,
  },
];

async function upsertCategory(payload: Payload, category: CategorySeed) {
  const existing = await payload.find({
    collection: "project-categories",
    limit: 1,
    where: { slug: { equals: category.slug } },
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

  return payload.create({ collection: "project-categories", data });
}

function getSeedMediaAlt(project: ProjectSeed, role: SeedMediaRole) {
  return `${project.title} ${role} editorial placeholder image.`;
}

function isPayloadMedia(value: unknown): value is { photographer?: null | string; url?: null | string } {
  return typeof value === "object" && value !== null;
}

function isSeedPlaceholderMedia(value: unknown) {
  if (!isPayloadMedia(value)) {
    return false;
  }

  const url = value.url ?? "";

  return value.photographer === "Placeholder" && url.includes("home-hero-placeholder");
}

function getMediaId(value: unknown): PayloadID | undefined {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "object" && value !== null && "id" in value) {
    const id = (value as { id?: unknown }).id;

    return typeof id === "number" ? id : undefined;
  }

  return undefined;
}

async function getOrCreateProjectMedia(
  payload: Payload,
  project: ProjectSeed,
  role: SeedMediaRole,
) {
  const alt = getSeedMediaAlt(project, role);
  const existing = await payload.find({
    collection: "media",
    limit: 1,
    where: { alt: { equals: alt } },
  });

  const data = {
    alt,
    caption: `${project.title}, ${role} temporary placeholder image pending final photography.`,
    orientation: "landscape" as const,
    photographer: "Placeholder",
  };

  if (existing.docs[0]) {
    return payload.update({
      collection: "media",
      data,
      id: existing.docs[0].id,
    });
  }

  return payload.create({
    collection: "media",
    data,
    filePath: placeholderImagePath,
  });
}

async function upsertProject(
  payload: Payload,
  project: ProjectSeed,
  categoryId: PayloadID,
  coverMediaId: PayloadID,
  galleryMediaIds: PayloadID[],
) {
  const existing = await payload.find({
    collection: "projects",
    depth: 2,
    limit: 1,
    where: { slug: { equals: project.slug } },
  });

  const existingProject = existing.docs[0];
  const existingCoverImage = existingProject?.coverImage;
  const existingGallery = existingProject?.gallery ?? [];
  const existingSeoImage = existingProject?.seo?.image;
  const shouldPreserveCover = existingProject && !isSeedPlaceholderMedia(existingCoverImage);
  const shouldPreserveGallery =
    existingProject &&
    existingGallery.length > 0 &&
    existingGallery.some((item) => !isSeedPlaceholderMedia(item.image));
  const shouldPreserveSeoImage = existingProject && !isSeedPlaceholderMedia(existingSeoImage);
  const coverImage = shouldPreserveCover ? (getMediaId(existingCoverImage) ?? coverMediaId) : coverMediaId;
  const seoImage = shouldPreserveSeoImage ? (getMediaId(existingSeoImage) ?? coverMediaId) : coverMediaId;
  const gallery = [1, 2, 3].map((index) => ({
    altText: `${project.title} architectural placeholder image ${index}.`,
    caption: `${project.title}, placeholder study image ${index}.`,
    image: galleryMediaIds[index - 1] ?? coverMediaId,
    order: index,
    orientation: "landscape" as const,
  }));
  const projectGallery = shouldPreserveGallery ? existingGallery : gallery;

  const data = {
    architect: `${studioName} Studio`,
    area: project.area,
    buildingType: project.buildingType,
    category: categoryId,
    city: project.city,
    concept: project.concept,
    country: project.country,
    coverImage,
    description: project.description,
    excerpt: project.excerpt,
    featured: project.featured,
    gallery: projectGallery,
    lightingConcept: project.lightingConcept,
    location: project.city,
    materials: project.materials,
    order: project.order,
    photographyDirection: project.photographyDirection,
    published: true,
    seo: {
      description: project.seoDescription,
      image: seoImage,
      keywords: [
        project.buildingType,
        "architecture studio",
        "interior design",
        "quiet luxury",
        project.city,
        project.country,
      ],
      title: project.seoTitle,
    },
    services: project.services,
    shortDescription: project.excerpt,
    slug: project.slug,
    spatialQualities: project.spatialQualities,
    status: project.status,
    summary: project.summary,
    tagline: project.tagline,
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

  return payload.create({ collection: "projects", data });
}

async function updateProjectRelationships(
  payload: Payload,
  project: ProjectSeed,
  projectIdBySlug: Map<string, PayloadID>,
) {
  const projectId = projectIdBySlug.get(project.slug);

  if (!projectId) {
    throw new Error(`Missing saved project id for ${project.slug}`);
  }

  const relatedProjects = project.relatedSlugs
    .map((slug) => projectIdBySlug.get(slug))
    .filter((id): id is PayloadID => id !== undefined);

  await payload.update({
    collection: "projects",
    data: { relatedProjects },
    id: projectId,
  });
}

async function populateGlobals(payload: Payload) {
  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      copyright: `© ${new Date().getFullYear()} ${studioName}. All rights reserved.`,
      footerDescription: "Architecture studio shaping calm spaces through light and material.",
      siteDescription:
        "A premium architecture and interiors studio designing calm, enduring spaces through light, material, proportion, and context.",
      siteName: studioName,
      socialLinks: [
        { label: "Instagram", url: "https://instagram.com/" },
        { label: "Pinterest", url: "https://pinterest.com/" },
        { label: "LinkedIn", url: "https://linkedin.com/" },
      ],
      studioDescription:
        "The studio works from the belief that architecture should become quieter as it becomes more precise. Each project begins with a close reading of place, light, material, and daily ritual.",
      tagline: "Architecture shaped by light, material, and restraint.",
      seo: {
        description:
          "Architecture and interior design studio shaping calm, enduring spaces through light, material, proportion, and context.",
        keywords: [
          "architecture studio",
          "interior design studio",
          "residential architecture",
          "hospitality interiors",
          "architectural portfolio",
        ],
        title: `${studioName} | Architecture Studio`,
      },
    },
  });

  await payload.updateGlobal({
    slug: "contact-info",
    data: {
      address: "Tashkent, Uzbekistan",
      behance: "https://behance.net/",
      email: "studio@arkhitecture.com",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
      phone: "+1 555 123 4567",
      pinterest: "https://pinterest.com/",
    },
  });

  await payload.updateGlobal({
    slug: "navigation",
    data: {
      items: [
        { label: "Home", order: 1, url: "/", visible: true },
        { label: "Work", order: 2, url: "/work", visible: true },
        { label: "Studio", order: 3, url: "/studio", visible: true },
        { label: "Contact", order: 4, url: "/contact", visible: true },
      ],
    },
  });

  await payload.updateGlobal({
    slug: "seo-defaults",
    data: {
      defaultDescription:
        "Architecture and interior design studio shaping calm, enduring spaces through light, material, proportion, and context.",
      defaultTitle: `${studioName} Architecture Studio`,
      titleTemplate: `%s | ${studioName}`,
    },
  });
}

async function seed() {
  const payload = await getPayload({ config: configPromise });
  const categoryBySlug = new Map<string, PayloadID>();
  const coverMediaBySlug = new Map<string, PayloadID>();
  const galleryMediaBySlug = new Map<string, PayloadID[]>();
  const projectIdBySlug = new Map<string, PayloadID>();

  for (const category of categories) {
    const savedCategory = await upsertCategory(payload, category);
    categoryBySlug.set(category.slug, savedCategory.id);
  }

  for (const project of projects) {
    const coverMedia = await getOrCreateProjectMedia(payload, project, "cover");
    const galleryMedia = await Promise.all([
      getOrCreateProjectMedia(payload, project, "gallery-01"),
      getOrCreateProjectMedia(payload, project, "gallery-02"),
      getOrCreateProjectMedia(payload, project, "gallery-03"),
    ]);

    coverMediaBySlug.set(project.slug, coverMedia.id);
    galleryMediaBySlug.set(
      project.slug,
      galleryMedia.map((media) => media.id),
    );
  }

  for (const project of projects) {
    const categoryId = categoryBySlug.get(project.categorySlug);
    const coverMediaId = coverMediaBySlug.get(project.slug);
    const galleryMediaIds = galleryMediaBySlug.get(project.slug);

    if (!categoryId) {
      throw new Error(`Missing category for project: ${project.title}`);
    }

    if (!coverMediaId || !galleryMediaIds) {
      throw new Error(`Missing media for project: ${project.title}`);
    }

    const savedProject = await upsertProject(
      payload,
      project,
      categoryId,
      coverMediaId,
      galleryMediaIds,
    );
    projectIdBySlug.set(project.slug, savedProject.id);
  }

  for (const project of projects) {
    await updateProjectRelationships(payload, project, projectIdBySlug);
  }

  await populateGlobals(payload);

  payload.logger.info(
    `Seeded ${categories.length} categories, ${projects.length} projects, project media, relationships, and globals.`,
  );
}

await seed();
