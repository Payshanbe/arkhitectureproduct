"use server";

import configPromise from "@payload-config";
import { redirect } from "next/navigation";
import { getPayload } from "payload";

import { defaultLocale, isSiteLocale, localizePath, type SiteLocale } from "@/lib/i18n/config";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const fieldLimits = {
  email: 254,
  estimatedBudget: 160,
  message: 5000,
  name: 120,
  projectType: 160,
  timeline: 160,
} as const;

function field(formData: FormData, name: string) {
  const value = formData.get(name);

  return typeof value === "string" ? value.trim() : "";
}

function getFormLocale(formData: FormData): SiteLocale {
  const value = field(formData, "locale");

  return isSiteLocale(value) ? value : defaultLocale;
}

function contactPath(locale: SiteLocale, query: string) {
  return `${localizePath("/contact", locale)}?${query}#contact-form`;
}

function redirectWithError(error: "email" | "required", locale: SiteLocale) {
  redirect(contactPath(locale, `error=${error}`));
}

function exceedsLimit(value: string, name: keyof typeof fieldLimits) {
  return value.length > fieldLimits[name];
}

export async function submitContactInquiry(formData: FormData) {
  const locale = getFormLocale(formData);
  const company = field(formData, "company");

  if (company) {
    redirect(contactPath(locale, "sent=1"));
  }

  const name = field(formData, "name");
  const email = field(formData, "email");
  const message = field(formData, "message");
  const estimatedBudget = field(formData, "estimatedBudget");
  const projectType = field(formData, "projectType");
  const timeline = field(formData, "timeline");

  if (
    !name ||
    !email ||
    !message ||
    exceedsLimit(name, "name") ||
    exceedsLimit(message, "message") ||
    exceedsLimit(estimatedBudget, "estimatedBudget") ||
    exceedsLimit(projectType, "projectType") ||
    exceedsLimit(timeline, "timeline")
  ) {
    redirectWithError("required", locale);
  }

  if (!emailPattern.test(email) || exceedsLimit(email, "email")) {
    redirectWithError("email", locale);
  }

  const payload = await getPayload({ config: configPromise });

  await payload.create({
    collection: "contact-submissions",
    data: {
      email,
      estimatedBudget,
      message,
      name,
      projectType,
      source: "Contact page",
      timeline,
    },
    overrideAccess: true,
  });

  redirect(contactPath(locale, "sent=1"));
}
