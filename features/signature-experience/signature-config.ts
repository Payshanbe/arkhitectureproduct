import type {
  Layer,
  Scene,
  SignatureMobileBehavior,
  SignatureReducedMotionBehavior,
  SignatureTiming,
} from "@/features/signature-experience/types";
import type { SiteLocale } from "@/lib/i18n/config";

export const signatureSceneOrder = [
  "research",
  "context",
  "structure",
  "material",
  "light",
  "atmosphere",
] as const;

export const signatureLayers: Layer[] = [
  {
    alt: "Base architectural grid for the process drawing.",
    file: "grid.svg",
    id: "grid",
    label: "Grid",
    sceneId: "research",
  },
  {
    alt: "Loose site traces and survey marks.",
    file: "site.svg",
    id: "site",
    label: "Site",
    sceneId: "research",
  },
  {
    alt: "Primary structural order emerging from the site.",
    file: "structure.svg",
    id: "structure",
    label: "Structure",
    sceneId: "structure",
  },
  {
    alt: "Architectural envelope defining the spatial boundary.",
    file: "envelope.svg",
    id: "envelope",
    label: "Envelope",
    sceneId: "context",
  },
  {
    alt: "Muted material planes giving the space weight and tactility.",
    file: "materials.svg",
    id: "materials",
    label: "Materials",
    sceneId: "material",
  },
  {
    alt: "Soft light wash moving through the architectural composition.",
    file: "light.svg",
    id: "light",
    label: "Light",
    sceneId: "light",
  },
  {
    alt: "Resolved atmospheric state of the process composition.",
    file: "atmosphere.svg",
    id: "atmosphere",
    label: "Atmosphere",
    sceneId: "atmosphere",
  },
];

export const signatureScenes: Scene[] = [
  {
    description:
      "We begin by listening to the brief, the site, and the quiet rituals that will shape the work.",
    durationVh: 76,
    id: "research",
    index: "01",
    layerIds: ["grid", "site"],
    pacing: "slow",
    title: "Research",
    transition: "Loose traces appear from near-stillness.",
  },
  {
    description:
      "Existing conditions, orientation, climate, and daily movement define the first limits of the project.",
    durationVh: 78,
    id: "context",
    index: "02",
    layerIds: ["grid", "site", "envelope"],
    pacing: "measured",
    title: "Context",
    transition: "Loose traces become place.",
  },
  {
    description:
      "Proportion, circulation, and order turn early observations into a spatial framework.",
    durationVh: 84,
    id: "structure",
    index: "03",
    layerIds: ["grid", "site", "envelope", "structure"],
    pacing: "steady",
    title: "Structure",
    transition: "Place becomes order.",
  },
  {
    description:
      "Surfaces are chosen for touch, ageing, restraint, and their relationship to light.",
    durationVh: 88,
    id: "material",
    index: "04",
    layerIds: ["grid", "envelope", "structure", "materials"],
    pacing: "sensory",
    title: "Material",
    transition: "Order becomes touch.",
  },
  {
    description:
      "Light is composed as part of the architecture, shaping rhythm, depth, and stillness.",
    durationVh: 98,
    id: "light",
    index: "05",
    layerIds: ["grid", "envelope", "structure", "materials", "light"],
    pacing: "climactic",
    title: "Light",
    transition: "Touch becomes depth.",
  },
  {
    description:
      "The final space is measured by how calmly it supports life, movement, and memory.",
    durationVh: 88,
    id: "atmosphere",
    index: "06",
    layerIds: ["grid", "envelope", "structure", "materials", "light", "atmosphere"],
    pacing: "resolved",
    title: "Atmosphere",
    transition: "Depth becomes feeling.",
  },
];

const localizedSignatureCopy: Record<
  SiteLocale,
  Record<Scene["id"], Pick<Scene, "description" | "title" | "transition">>
> = {
  ru: {
    research: {
      description:
        "Мы начинаем с изучения задачи, места и повседневных ритуалов, которые сформируют проект.",
      title: "Исследование",
      transition: "Первые линии возникают из тишины.",
    },
    context: {
      description:
        "Существующие условия, ориентация, климат и движение определяют первые границы проекта.",
      title: "Контекст",
      transition: "Линии обретают место.",
    },
    structure: {
      description:
        "Пропорция, движение и порядок превращают наблюдения в пространственную систему.",
      title: "Структура",
      transition: "Место обретает порядок.",
    },
    material: {
      description:
        "Материалы выбираются за тактильность, естественное старение и взаимодействие со светом.",
      title: "Материал",
      transition: "Порядок обретает материальность.",
    },
    light: {
      description: "Свет становится частью архитектуры, формируя ритм, глубину и состояние покоя.",
      title: "Свет",
      transition: "Материя обретает глубину.",
    },
    atmosphere: {
      description:
        "Итоговое пространство оценивается по тому, насколько спокойно оно поддерживает жизнь и память.",
      title: "Атмосфера",
      transition: "Глубина становится ощущением.",
    },
  },
  tj: {
    research: {
      description:
        "Мо аз омӯзиши вазифа, макон ва одатҳои рӯзмаррае оғоз мекунем, ки лоиҳаро шакл медиҳанд.",
      title: "Таҳқиқ",
      transition: "Хатҳои аввал аз оромӣ пайдо мешаванд.",
    },
    context: {
      description:
        "Шароити мавҷуда, самтгирӣ, иқлим ва ҳаракат ҳудудҳои аввалини лоиҳаро муайян мекунанд.",
      title: "Контекст",
      transition: "Хатҳо ба макон табдил меёбанд.",
    },
    structure: {
      description: "Таносуб, ҳаракат ва низом мушоҳидаҳоро ба сохтори фазоӣ табдил медиҳанд.",
      title: "Сохтор",
      transition: "Макон низом пайдо мекунад.",
    },
    material: {
      description: "Мавод барои ламс, пиршавии табиӣ ва муносибаташ бо рӯшноӣ интихоб мешавад.",
      title: "Мавод",
      transition: "Низом ба моддият табдил меёбад.",
    },
    light: {
      description: "Рӯшноӣ қисми меъморӣ шуда, ритм, амиқӣ ва оромиро шакл медиҳад.",
      title: "Рӯшноӣ",
      transition: "Мавод амиқӣ пайдо мекунад.",
    },
    atmosphere: {
      description:
        "Фазои ниҳоӣ бо он санҷида мешавад, ки зиндагӣ ва хотираро то чӣ андоза ором дастгирӣ мекунад.",
      title: "Муҳит",
      transition: "Амиқӣ ба эҳсос табдил меёбад.",
    },
  },
};

export function getSignatureScenes(locale: SiteLocale): Scene[] {
  return signatureScenes.map((scene) => ({
    ...scene,
    ...localizedSignatureCopy[locale][scene.id],
  }));
}

export const signatureTiming: SignatureTiming = {
  anticipatePin: 1,
  scrub: 0.95,
  totalDurationVh: signatureScenes.reduce((total, scene) => total + scene.durationVh, 0),
};

export const signatureMobileBehavior: SignatureMobileBehavior = {
  pin: false,
  renderMode: "static-sequence",
  showPerSceneVisual: true,
};

export const signatureReducedMotionBehavior: SignatureReducedMotionBehavior = {
  pin: false,
  renderMode: "static-readable-sequence",
  showAllText: true,
  showFinalVisual: true,
};

export const signatureConfig = {
  layers: signatureLayers,
  mobileBehavior: signatureMobileBehavior,
  order: signatureSceneOrder,
  reducedMotionBehavior: signatureReducedMotionBehavior,
  scenes: signatureScenes,
  timing: signatureTiming,
} as const;
