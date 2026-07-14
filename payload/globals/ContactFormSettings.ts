import type { GlobalConfig } from "payload";

import { isAdminOrEditor } from "../access/admins.ts";

export const ContactFormSettings: GlobalConfig = {
  slug: "contact-form-settings",
  label: "Contact Form Settings",
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: "labels",
      type: "group",
      fields: [
        { name: "email", type: "text", defaultValue: "Email" },
        { name: "city", type: "text", defaultValue: "City" },
        { name: "country", type: "text", defaultValue: "Country" },
        { name: "name", type: "text", defaultValue: "Name" },
        { name: "projectType", type: "text", defaultValue: "Project Type" },
        { name: "estimatedBudget", type: "text", defaultValue: "Estimated Budget" },
        { name: "timeline", type: "text", defaultValue: "Timeline" },
        { name: "message", type: "text", defaultValue: "Message" },
        { name: "company", type: "text", defaultValue: "Company" },
        { name: "submit", type: "text", defaultValue: "Send inquiry ->" },
        { name: "studioInformation", type: "text", defaultValue: "Studio Information" },
      ],
    },
    {
      name: "messages",
      type: "group",
      fields: [
        {
          name: "defaultNote",
          type: "textarea",
          defaultValue: "Your inquiry will be saved securely in the studio CMS for review.",
        },
        {
          name: "success",
          type: "text",
          defaultValue: "Thank you. Your inquiry has been received.",
        },
        {
          name: "emailError",
          type: "text",
          defaultValue: "Please enter a valid email address.",
        },
        {
          name: "requiredError",
          type: "text",
          defaultValue: "Please complete your name, email, and message.",
        },
      ],
    },
    {
      name: "placeholders",
      type: "group",
      fields: [
        {
          name: "message",
          type: "textarea",
          defaultValue: "The place, the ambition, the constraints.",
        },
      ],
    },
  ],
};
