import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Page } from "@/components/layout/Page";
import { HomeContactExperience } from "@/features/home/HomeContactExperience";
import { HomeFeaturedProject } from "@/features/home/HomeFeaturedProject";
import { HomeHero } from "@/features/home/HomeHero";
import { HomePartners } from "@/features/home/HomePartners";
import { HomeSelectedProjects } from "@/features/home/HomeSelectedProjects";
import { HomeStudioIntro } from "@/features/home/HomeStudioIntro";
import { getHomePageContent, getSiteChromeContent } from "@/lib/cms/siteContent";
import { isSiteLocale } from "@/lib/i18n/config";
import { createLocalizedPageMetadata } from "@/lib/seo/metadata";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSiteLocale(locale)) {
    return {};
  }

  return createLocalizedPageMetadata({
    description:
      locale === "tj"
        ? "Студияи меъморӣ ва тарроҳии дохилӣ, ки фазоҳоро бо рӯшноӣ, мавод ва оромӣ шакл медиҳад."
        : "Студия архитектуры и интерьера, создающая пространства через свет, материал и сдержанность.",
    locale,
    path: "/",
    title: locale === "tj" ? "Студияи меъморӣ ва интерьер" : "Студия архитектуры и интерьера",
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isSiteLocale(locale)) {
    notFound();
  }

  const [homeContent, siteContent] = await Promise.all([
    getHomePageContent(locale),
    getSiteChromeContent(locale),
  ]);

  return (
    <Page>
      <HomeHero content={homeContent.hero} siteName={siteContent.settings.siteName} />
      <HomeSelectedProjects content={homeContent.selectedProjects} locale={locale} />
      <HomeStudioIntro content={homeContent.studioIntro} locale={locale} />
      <HomeFeaturedProject content={homeContent.featuredProject} locale={locale} />
      <HomePartners locale={locale} />
      <HomeContactExperience contact={siteContent.contact} content={homeContent.contact} />
    </Page>
  );
}
