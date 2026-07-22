import type { CollectionConfig } from "payload";

import { isAdminOrEditor } from "../access/admins.ts";
import { slugField } from "../fields/slugField.ts";
import { localizeContentFields } from "../localization/localizeContentFields.ts";

export const ProjectCategories: CollectionConfig = {
  slug: "project-categories",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "order"],
  },
  access: {
    create: isAdminOrEditor,
    delete: isAdminOrEditor,
    read: () => true,
    update: isAdminOrEditor,
  },
  defaultSort: "order",
  fields: localizeContentFields([
    {
      name: "title",
      type: "text",
      required: true,
    },
    slugField(),
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: {
        position: "sidebar",
      },
    },
  ]),
};
