import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Page } from "@/components/layout/Page";
import { WorkArchive } from "@/features/work/WorkArchive";
import { isSiteLocale } from "@/lib/i18n/config";
import { createLocalizedPageMetadata } from "@/lib/seo/metadata";

interface WorkPageProps {
  params: Promise<{ locale: string }>;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSiteLocale(locale)) {
    return {};
  }

  return createLocalizedPageMetadata({
    description:
      locale === "tj"
        ? "Бойгонии таҳририи лоиҳаҳои меъморӣ ва тарроҳии дохилӣ."
        : "Редакционный архив проектов архитектуры и дизайна интерьера.",
    locale,
    path: "/work",
    title: locale === "tj" ? "Лоиҳаҳо" : "Проекты",
  });
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { locale } = await params;

  if (!isSiteLocale(locale)) {
    notFound();
  }

  return (
    <Page>
      <WorkArchive locale={locale} />
    </Page>
  );
}
