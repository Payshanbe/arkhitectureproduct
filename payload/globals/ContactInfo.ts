import type { GlobalConfig } from "payload";

import { isAdminOrEditor } from "../access/admins.ts";
import { localizeContentFields } from "../localization/localizeContentFields.ts";

export const ContactInfo: GlobalConfig = {
  slug: "contact-info",
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: localizeContentFields([
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "phone",
      type: "text",
    },
    {
      name: "address",
      type: "textarea",
    },
    {
      name: "googleMaps",
      type: "text",
      label: "Google Maps URL",
    },
    {
      name: "instagram",
      type: "text",
    },
    {
      name: "linkedin",
      type: "text",
    },
    {
      name: "behance",
      type: "text",
    },
    {
      name: "pinterest",
      type: "text",
    },
  ]),
};
