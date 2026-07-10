import type { Field } from "payload";

export const galleryField: Field = {
  name: "gallery",
  type: "array",
  minRows: 3,
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "caption",
      type: "text",
    },
    {
      name: "altText",
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
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: {
        position: "sidebar",
      },
    },
  ],
};
