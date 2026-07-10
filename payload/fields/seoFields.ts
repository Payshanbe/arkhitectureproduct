import type { Field } from "payload";

export const seoFields: Field = {
  name: "seo",
  type: "group",
  label: "SEO",
  fields: [
    {
      name: "title",
      type: "text",
      label: "SEO Title",
    },
    {
      name: "description",
      type: "textarea",
      label: "SEO Description",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "SEO Image",
    },
    {
      name: "canonical",
      type: "text",
      label: "Canonical URL",
    },
    {
      name: "keywords",
      type: "text",
      hasMany: true,
      label: "Keywords",
    },
  ],
};
