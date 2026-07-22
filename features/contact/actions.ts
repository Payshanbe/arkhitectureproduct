"use server";

import configPromise from "@payload-config";
import { redirect } from "next/navigation";
import { getPayload } from "payload";

import { defaultLocale, isSiteLocale, localizePath, type SiteLocale } from "@/lib/i18n/config";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

export async function submitContactInquiry(formData: FormData) {
  const locale = getFormLocale(formData);
  const company = field(formData, "company");

  if (company) {
    redirect(contactPath(locale, "sent=1"));
  }

  const name = field(formData, "name");
  const email = field(formData, "email");
  const message = field(formData, "message");

  if (!name || !email || !message) {
    redirectWithError("required", locale);
  }

  if (!emailPattern.test(email)) {
    redirectWithError("email", locale);
  }

  const payload = await getPayload({ config: configPromise });

  await payload.create({
    collection: "contact-submissions",
    data: {
      email,
      estimatedBudget: field(formData, "estimatedBudget"),
      message,
      name,
      projectType: field(formData, "projectType"),
      source: "Contact page",
      timeline: field(formData, "timeline"),
    },
  });

  redirect(contactPath(locale, "sent=1"));
}
