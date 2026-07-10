import type { GlobalConfig } from "payload";

import { isAdminOrEditor } from "../access/admins.ts";
import { seoFields } from "../fields/seoFields.ts";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: "siteName",
      type: "text",
      required: true,
      defaultValue: "Arkhitecture",
    },
    {
      name: "tagline",
      type: "text",
    },
    {
      name: "siteDescription",
      type: "textarea",
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "favicon",
      type: "upload",
      relationTo: "media",
    },
    seoFields,
    {
      name: "socialLinks",
      type: "array",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "url",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
