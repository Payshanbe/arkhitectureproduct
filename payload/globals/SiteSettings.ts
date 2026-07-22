import type { GlobalConfig } from "payload";

import { isAdminOrEditor } from "../access/admins.ts";
import { localizeContentFields } from "../localization/localizeContentFields.ts";
import { seoFields } from "../fields/seoFields.ts";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: localizeContentFields([
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
      name: "studioDescription",
      type: "textarea",
      admin: {
        description: "Editorial studio description for future global/page content integration.",
      },
    },
    {
      name: "footerDescription",
      type: "textarea",
      admin: {
        description: "Short footer studio description.",
      },
    },
    {
      name: "copyright",
      type: "text",
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
  ]),
};
