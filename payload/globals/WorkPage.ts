import type { GlobalConfig } from "payload";

import { isAdminOrEditor } from "../access/admins.ts";
import { localizeContentFields } from "../localization/localizeContentFields.ts";

export const WorkPage: GlobalConfig = {
  slug: "work-page",
  label: "Work Page",
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: localizeContentFields([
    {
      name: "hero",
      type: "group",
      fields: [
        { name: "label", type: "text", defaultValue: "Work" },
        {
          name: "title",
          type: "text",
          defaultValue: "A considered archive of spaces, materials, and atmosphere.",
        },
        {
          name: "intro",
          type: "textarea",
          defaultValue:
            "A selection of residential, hospitality, interior, and architectural work - shaped through renovation, restraint, and a close reading of place.",
        },
        { name: "singularProjectLabel", type: "text", defaultValue: "project" },
        { name: "pluralProjectLabel", type: "text", defaultValue: "projects" },
      ],
    },
    {
      name: "archive",
      type: "group",
      fields: [
        { name: "ariaLabel", type: "text", defaultValue: "Project archive" },
        { name: "emptyNumberLabel", type: "text", defaultValue: "No. 00" },
        { name: "emptyLocationLabel", type: "text", defaultValue: "Archive" },
        { name: "emptyYearLabel", type: "text", defaultValue: "Pending" },
        {
          name: "emptyTitle",
          type: "text",
          defaultValue: "Projects will appear here once Payload contains published work.",
        },
        { name: "plateLabel", type: "text", defaultValue: "Plate" },
        { name: "platePlaceholder", type: "text", defaultValue: "Photograph to come" },
      ],
    },
    {
      name: "fallbacks",
      type: "group",
      fields: [
        { name: "location", type: "text", defaultValue: "Location forthcoming" },
        { name: "year", type: "text", defaultValue: "Undated" },
        { name: "yearRange", type: "text", defaultValue: "Archive" },
        {
          name: "projectDescription",
          type: "textarea",
          defaultValue:
            "A quiet architectural study shaped by material restraint, atmosphere, and a close reading of place.",
        },
      ],
    },
  ]),
};
