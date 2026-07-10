import type { CollectionConfig } from "payload";

import { isAdminOrEditor } from "../access/admins.ts";
import { publishedOnly } from "../access/publishedOnly.ts";
import { galleryField } from "../fields/imageFields.ts";
import { seoFields } from "../fields/seoFields.ts";
import { slugField } from "../fields/slugField.ts";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "year", "published", "featured", "order"],
  },
  access: {
    create: isAdminOrEditor,
    delete: isAdminOrEditor,
    read: publishedOnly,
    update: isAdminOrEditor,
  },
  defaultSort: "order",
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    slugField(),
    {
      name: "category",
      type: "relationship",
      relationTo: "project-categories",
      required: true,
    },
    {
      name: "location",
      type: "text",
      admin: {
        description: "Legacy display location. Prefer City and Country for new content.",
      },
    },
    {
      name: "city",
      type: "text",
    },
    {
      name: "country",
      type: "text",
    },
    {
      name: "year",
      type: "number",
      min: 1900,
      max: 2100,
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Built", value: "built" },
        { label: "Concept", value: "concept" },
        { label: "In Progress", value: "in-progress" },
        { label: "Completed", value: "completed" },
      ],
    },
    {
      name: "services",
      type: "select",
      hasMany: true,
      options: [
        { label: "Architecture", value: "architecture" },
        { label: "Interior Design", value: "interior-design" },
        { label: "Master Planning", value: "master-planning" },
        { label: "Furniture Design", value: "furniture-design" },
        { label: "Landscape", value: "landscape" },
      ],
    },
    {
      name: "area",
      type: "text",
    },
    {
      name: "architect",
      type: "text",
    },
    {
      name: "client",
      type: "text",
    },
    {
      name: "photographer",
      type: "text",
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    galleryField,
    {
      name: "excerpt",
      type: "textarea",
      maxLength: 220,
      admin: {
        description: "Short editorial summary for listing and featured project contexts.",
      },
    },
    {
      name: "description",
      type: "textarea",
      admin: {
        description: "Longer project description for future project detail pages.",
      },
    },
    {
      name: "shortDescription",
      type: "textarea",
      admin: {
        description: "Legacy excerpt field. Prefer Excerpt for new content.",
      },
    },
    {
      name: "concept",
      type: "textarea",
    },
    {
      name: "materials",
      type: "textarea",
    },
    {
      name: "credits",
      type: "textarea",
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "published",
      type: "checkbox",
      defaultValue: false,
      index: true,
      admin: {
        position: "sidebar",
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
    seoFields,
  ],
};
