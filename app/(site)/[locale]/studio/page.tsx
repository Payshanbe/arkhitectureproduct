import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Page } from "@/components/layout/Page";
import { StudioPage } from "@/features/studio/StudioPage";
import { getSiteChromeContent, getStudioPageContent } from "@/lib/cms/siteContent";
import { isSiteLocale } from "@/lib/i18n/config";
import { createLocalizedPageMetadata } from "@/lib/seo/metadata";

interface StudioRouteProps {
  params: Promise<{ locale: string }>;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }: StudioRouteProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSiteLocale(locale)) {
    return {};
  }

  return createLocalizedPageMetadata({
    description:
      locale === "tj"
        ? "Шиносоӣ бо фалсафа ва равиши студия ба меъморӣ."
        : "Знакомство с философией студии и её подходом к архитектуре.",
    locale,
    path: "/studio",
    title: locale === "tj" ? "Студия" : "Студия",
  });
}

export default async function StudioRoute({ params }: StudioRouteProps) {
  const { locale } = await params;

  if (!isSiteLocale(locale)) {
    notFound();
  }

  const [content, siteContent] = await Promise.all([
    getStudioPageContent(locale),
    getSiteChromeContent(locale),
  ]);

  return (
    <Page>
      <StudioPage contact={siteContent.contact} content={content} locale={locale} />
    </Page>
  );
}
