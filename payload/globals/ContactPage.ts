import type { GlobalConfig } from "payload";

import { isAdminOrEditor } from "../access/admins.ts";
import { seoFields } from "../fields/seoFields.ts";
import { localizeContentFields } from "../localization/localizeContentFields.ts";

export const ContactPage: GlobalConfig = {
  slug: "contact-page",
  label: "Contact Page",
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: localizeContentFields([
    {
      name: "hero",
      type: "group",
      fields: [
        { name: "label", type: "text", defaultValue: "Contact" },
        {
          name: "statement",
          type: "text",
          defaultValue:
            "Begin with a conversation about place, atmosphere, and how a space should feel.",
        },
      ],
    },
    {
      name: "inquiry",
      type: "group",
      fields: [
        { name: "label", type: "text", defaultValue: "Inquiry" },
        {
          name: "body",
          type: "textarea",
          defaultValue:
            "Write a short note about the place, the ambition, and the atmosphere you have in mind. We reply within a few working days.",
        },
      ],
    },
    {
      name: "collaboration",
      type: "group",
      fields: [
        { name: "label", type: "text", defaultValue: "Collaboration" },
        {
          name: "statement",
          type: "text",
          defaultValue:
            "We work with private clients, developers, makers, and cultural collaborators who value restraint, clarity, and spaces that gather meaning slowly.",
        },
      ],
    },
    {
      name: "closing",
      type: "group",
      fields: [
        { name: "label", type: "text", defaultValue: "Closing" },
        {
          name: "statement",
          type: "text",
          defaultValue:
            "The first conversation is simply a way to understand what should be protected, clarified, and made possible.",
        },
      ],
    },
    seoFields,
  ]),
};
