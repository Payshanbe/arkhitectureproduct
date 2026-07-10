import type { Field } from "payload";

import { formatSlug } from "../hooks/generateSlug.ts";

export const slugField = (sourceField = "title"): Field => ({
  name: "slug",
  type: "text",
  index: true,
  required: true,
  unique: true,
  admin: {
    position: "sidebar",
  },
  hooks: {
    beforeValidate: [
      ({ siblingData, value }) => {
        if (typeof value === "string" && value.trim().length > 0) {
          return formatSlug(value);
        }

        return formatSlug(siblingData?.[sourceField]);
      },
    ],
  },
});
