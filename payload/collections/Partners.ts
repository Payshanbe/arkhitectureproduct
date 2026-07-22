import type { CollectionConfig } from "payload";

import { isAdminOrEditor } from "../access/admins.ts";
import { publishedOnly } from "../access/publishedOnly.ts";

export const Partners: CollectionConfig = {
  slug: "partners",
  labels: {
    singular: "Partner",
    plural: "Partners",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "logo", "order", "published"],
    description:
      "Homepage partner rail. An uploaded Media logo replaces the selected Logoipsum placeholder.",
  },
  access: {
    create: isAdminOrEditor,
    delete: isAdminOrEditor,
    read: publishedOnly,
    update: isAdminOrEditor,
  },
  defaultSort: "order",
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      admin: {
        description: "Used as accessible text when the visual logo has no readable wordmark.",
      },
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      admin: {
        description:
          "Optional. Upload or select the real partner logo here; it takes priority over the placeholder.",
      },
    },
    {
      name: "website",
      type: "text",
      admin: {
        description: "Optional absolute URL beginning with https:// or http://.",
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      index: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "published",
      type: "checkbox",
      defaultValue: true,
      index: true,
      admin: {
        position: "sidebar",
      },
    },
  ],
};
