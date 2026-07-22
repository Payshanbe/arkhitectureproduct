import type { GlobalConfig } from "payload";

import { isAdminOrEditor } from "../access/admins.ts";
import { localizeContentFields } from "../localization/localizeContentFields.ts";

export const ProjectDetailSettings: GlobalConfig = {
  slug: "project-detail-settings",
  label: "Project Detail Settings",
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: localizeContentFields([
    {
      name: "labels",
      type: "group",
      fields: [
        { name: "statement", type: "text", defaultValue: "Statement" },
        { name: "services", type: "text", defaultValue: "Services" },
        { name: "area", type: "text", defaultValue: "Area" },
        { name: "architect", type: "text", defaultValue: "Architect" },
        { name: "status", type: "text", defaultValue: "Status" },
        { name: "materials", type: "text", defaultValue: "Materials" },
        { name: "nextProject", type: "text", defaultValue: "Next Project" },
      ],
    },
    {
      name: "fallbacks",
      type: "group",
      fields: [
        { name: "category", type: "text", defaultValue: "Project" },
        { name: "location", type: "text", defaultValue: "Location forthcoming" },
        { name: "year", type: "text", defaultValue: "Undated" },
        {
          name: "description",
          type: "textarea",
          defaultValue:
            "A quiet architectural study shaped through proportion, atmosphere, and material restraint.",
        },
      ],
    },
    {
      name: "serviceLabels",
      type: "group",
      fields: [
        { name: "architecture", type: "text", defaultValue: "Architecture" },
        { name: "interiorDesign", type: "text", defaultValue: "Interior Design" },
        { name: "masterPlanning", type: "text", defaultValue: "Master Planning" },
        { name: "furnitureDesign", type: "text", defaultValue: "Furniture Design" },
        { name: "landscape", type: "text", defaultValue: "Landscape" },
      ],
    },
    {
      name: "statusLabels",
      type: "group",
      fields: [
        { name: "built", type: "text", defaultValue: "Built" },
        { name: "completed", type: "text", defaultValue: "Completed" },
        { name: "concept", type: "text", defaultValue: "Concept" },
        { name: "inProgress", type: "text", defaultValue: "In Progress" },
      ],
    },
  ]),
};
