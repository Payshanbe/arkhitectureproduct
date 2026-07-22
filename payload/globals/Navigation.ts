import type { GlobalConfig } from "payload";

import { isAdminOrEditor } from "../access/admins.ts";
import { localizeContentFields } from "../localization/localizeContentFields.ts";

export const Navigation: GlobalConfig = {
  slug: "navigation",
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: localizeContentFields([
    {
      name: "items",
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
        {
          name: "order",
          type: "number",
          defaultValue: 0,
        },
        {
          name: "visible",
          type: "checkbox",
          defaultValue: true,
        },
      ],
    },
  ]),
};
