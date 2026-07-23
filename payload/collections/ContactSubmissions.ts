import type { CollectionConfig } from "payload";

import { isAdmin, isAdminOrEditor } from "../access/admins.ts";

export const ContactSubmissions: CollectionConfig = {
  slug: "contact-submissions",
  labels: {
    singular: "Contact Submission",
    plural: "Contact Submissions",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "projectType", "status", "createdAt"],
  },
  access: {
    create: () => false,
    delete: isAdmin,
    read: isAdminOrEditor,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      maxLength: 120,
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "projectType",
      type: "text",
      label: "Project Type",
      maxLength: 160,
    },
    {
      name: "estimatedBudget",
      type: "text",
      label: "Estimated Budget",
      maxLength: 160,
    },
    {
      name: "timeline",
      type: "text",
      maxLength: 160,
    },
    {
      name: "message",
      type: "textarea",
      required: true,
      maxLength: 5000,
    },
    {
      name: "source",
      type: "text",
      defaultValue: "Contact page",
      maxLength: 120,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      admin: {
        position: "sidebar",
      },
      options: [
        { label: "New", value: "new" },
        { label: "Reviewed", value: "reviewed" },
        { label: "Replied", value: "replied" },
        { label: "Archived", value: "archived" },
      ],
    },
  ],
  timestamps: true,
};
