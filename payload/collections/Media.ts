import type { CollectionConfig } from "payload";

import { isAdminOrEditor } from "../access/admins.ts";
import { localizeContentFields } from "../localization/localizeContentFields.ts";

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    staticDir: "public/media",
    focalPoint: true,
    mimeTypes: ["image/*"],
    imageSizes: [
      {
        name: "thumbnail",
        width: 480,
        height: 320,
        position: "centre",
      },
      {
        name: "large",
        width: 1920,
        withoutEnlargement: true,
      },
    ],
  },
  admin: {
    useAsTitle: "alt",
  },
  access: {
    create: isAdminOrEditor,
    delete: isAdminOrEditor,
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: localizeContentFields([
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "caption",
      type: "text",
    },
    {
      name: "orientation",
      type: "select",
      options: [
        { label: "Landscape", value: "landscape" },
        { label: "Portrait", value: "portrait" },
        { label: "Square", value: "square" },
      ],
    },
    {
      name: "photographer",
      type: "text",
    },
  ]),
};
