import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Page } from "@/components/layout/Page";
import { ContactPage } from "@/features/contact/ContactPage";
import {
  getContactFormSettings,
  getContactPageContent,
  getSiteChromeContent,
} from "@/lib/cms/siteContent";
import { isSiteLocale } from "@/lib/i18n/config";
import { createLocalizedPageMetadata } from "@/lib/seo/metadata";

interface ContactRouteProps {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{
    error?: string;
    sent?: string;
  }>;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }: ContactRouteProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSiteLocale(locale)) {
    return {};
  }

  return createLocalizedPageMetadata({
    description:
      locale === "tj"
        ? "Оғози суҳбат бо студия дар бораи лоиҳаи меъморӣ ё интерьер."
        : "Начните разговор со студией об архитектурном или интерьерном проекте.",
    locale,
    path: "/contact",
    title: locale === "tj" ? "Тамос" : "Контакты",
  });
}

export default async function ContactRoute({ params, searchParams }: ContactRouteProps) {
  const { locale } = await params;

  if (!isSiteLocale(locale)) {
    notFound();
  }

  const [content, formSettings, siteContent] = await Promise.all([
    getContactPageContent(locale),
    getContactFormSettings(locale),
    getSiteChromeContent(locale),
  ]);
  const query = await searchParams;
  const submissionStatus =
    query?.sent === "1"
      ? "sent"
      : query?.error === "email"
        ? "email"
        : query?.error === "required"
          ? "required"
          : undefined;

  return (
    <Page>
      <ContactPage
        contact={siteContent.contact}
        content={content}
        formSettings={formSettings}
        locale={locale}
        submissionStatus={submissionStatus}
      />
    </Page>
  );
}
