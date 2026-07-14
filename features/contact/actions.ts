"use server";

import configPromise from "@payload-config";
import { redirect } from "next/navigation";
import { getPayload } from "payload";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(formData: FormData, name: string) {
  const value = formData.get(name);

  return typeof value === "string" ? value.trim() : "";
}

function redirectWithError(error: "email" | "required") {
  redirect(`/contact?error=${error}#contact-form`);
}

export async function submitContactInquiry(formData: FormData) {
  const company = field(formData, "company");

  if (company) {
    redirect("/contact?sent=1#contact-form");
  }

  const name = field(formData, "name");
  const email = field(formData, "email");
  const message = field(formData, "message");

  if (!name || !email || !message) {
    redirectWithError("required");
  }

  if (!emailPattern.test(email)) {
    redirectWithError("email");
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

  redirect("/contact?sent=1#contact-form");
}
