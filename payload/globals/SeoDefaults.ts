import type { GlobalConfig } from "payload";

import { isAdminOrEditor } from "../access/admins.ts";
import { localizeContentFields } from "../localization/localizeContentFields.ts";

export const SeoDefaults: GlobalConfig = {
  slug: "seo-defaults",
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: localizeContentFields([
    {
      name: "defaultTitle",
      type: "text",
      required: true,
      defaultValue: "Arkhitecture",
    },
    {
      name: "titleTemplate",
      type: "text",
      defaultValue: "%s | Arkhitecture",
    },
    {
      name: "defaultDescription",
      type: "textarea",
    },
    {
      name: "defaultImage",
      type: "upload",
      relationTo: "media",
    },
  ]),
};
