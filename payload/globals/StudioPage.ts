import type { GlobalConfig } from "payload";

import { isAdminOrEditor } from "../access/admins.ts";
import { seoFields } from "../fields/seoFields.ts";
import { localizeContentFields } from "../localization/localizeContentFields.ts";

export const StudioPage: GlobalConfig = {
  slug: "studio-page",
  label: "Studio Page",
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: localizeContentFields([
    {
      name: "hero",
      type: "group",
      fields: [
        { name: "label", type: "text", defaultValue: "Studio" },
        {
          name: "statement",
          type: "text",
          defaultValue:
            "We design spaces through atmosphere, restraint, and a careful reading of context.",
        },
      ],
    },
    {
      name: "philosophy",
      type: "group",
      fields: [
        { name: "label", type: "text", defaultValue: "Philosophy" },
        {
          name: "paragraphs",
          type: "array",
          fields: [{ name: "text", type: "textarea", required: true }],
        },
      ],
    },
    {
      name: "process",
      type: "group",
      fields: [
        { name: "label", type: "text", defaultValue: "The Process" },
        {
          name: "statement",
          type: "text",
          defaultValue:
            "Six layers, from first trace to atmosphere. How every project is drawn into being.",
        },
      ],
    },
    {
      name: "principles",
      type: "array",
      fields: [{ name: "text", type: "text", required: true }],
    },
    {
      name: "information",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "value", type: "textarea", required: true },
      ],
    },
    {
      name: "contactCta",
      type: "group",
      label: "Contact CTA",
      fields: [
        { name: "label", type: "text", defaultValue: "Contact" },
        {
          name: "statement",
          type: "text",
          defaultValue:
            "Begin with a place, a question, or a quiet ambition for how a space should feel.",
        },
        { name: "linkLabel", type: "text", defaultValue: "Start a conversation" },
      ],
    },
    seoFields,
  ]),
};
