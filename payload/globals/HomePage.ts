import type { GlobalConfig } from "payload";

import { isAdminOrEditor } from "../access/admins.ts";
import { seoFields } from "../fields/seoFields.ts";

export const HomePage: GlobalConfig = {
  slug: "home-page",
  label: "Home Page",
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: "hero",
      type: "group",
      fields: [
        { name: "label", type: "text", defaultValue: "Architecture Studio" },
        {
          name: "heading",
          type: "text",
          defaultValue: "Architecture shaped by light, material, and restraint.",
          required: true,
        },
        {
          name: "supportingText",
          type: "textarea",
          defaultValue:
            "A cinematic portfolio for spaces that feel calm, precise, and quietly enduring.",
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "locationLine",
          type: "text",
          defaultValue: "Tashkent, UZ 41.3°N 69.2°E",
        },
      ],
    },
    {
      name: "selectedProjects",
      type: "group",
      label: "Selected Projects",
      fields: [
        { name: "label", type: "text", defaultValue: "Selected Work" },
        {
          name: "heading",
          type: "text",
          defaultValue: "A quiet sequence of spaces shaped by proportion, material, and light.",
        },
        { name: "archiveLinkLabel", type: "text", defaultValue: "View the archive →" },
      ],
    },
    {
      name: "studioIntro",
      type: "group",
      label: "Studio Intro",
      fields: [
        { name: "label", type: "text", defaultValue: "Our Approach" },
        {
          name: "statement",
          type: "text",
          defaultValue:
            "We design spaces through atmosphere, restraint, and a close reading of context.",
        },
        {
          name: "body",
          type: "textarea",
          defaultValue:
            "The studio approaches each project as a careful composition of light, material, proportion, and daily ritual. The result is architecture that feels calm, precise, and quietly enduring.",
        },
        { name: "linkLabel", type: "text", defaultValue: "Learn More" },
        { name: "linkHref", type: "text", defaultValue: "/studio" },
      ],
    },
    {
      name: "featuredProject",
      type: "group",
      label: "Featured Project",
      fields: [
        { name: "label", type: "text", defaultValue: "Featured Project" },
        { name: "heading", type: "text", defaultValue: "A slower look at one selected work." },
        { name: "linkLabel", type: "text", defaultValue: "View Project →" },
      ],
    },
    {
      name: "contact",
      type: "group",
      fields: [
        { name: "label", type: "text", defaultValue: "Let's Connect" },
        {
          name: "statement",
          type: "text",
          defaultValue:
            "Begin with a conversation about place, atmosphere, and what should endure.",
        },
        {
          name: "body",
          type: "textarea",
          defaultValue:
            "For residences, interiors, and architectural collaborations, send a brief note and we will reply with a considered next step.",
        },
      ],
    },
    seoFields,
  ],
};
