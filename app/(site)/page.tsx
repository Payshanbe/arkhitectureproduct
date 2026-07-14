import { createPageMetadata } from "@/lib/seo/metadata";
import { Page } from "@/components/layout/Page";
import { HomeContactExperience } from "@/features/home/HomeContactExperience";
import { HomeFeaturedProject } from "@/features/home/HomeFeaturedProject";
import { HomeHero } from "@/features/home/HomeHero";
import { HomeSelectedProjects } from "@/features/home/HomeSelectedProjects";
import { HomeStudioIntro } from "@/features/home/HomeStudioIntro";
import { getHomePageContent, getSiteChromeContent } from "@/lib/cms/siteContent";

export const metadata = createPageMetadata({
  description:
    "Arkhitecture is a quiet architecture and interior design studio creating cinematic, material-led spaces with restraint and atmosphere.",
  path: "/",
  title: "Architecture and Interior Design Studio",
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const [homeContent, siteContent] = await Promise.all([
    getHomePageContent(),
    getSiteChromeContent(),
  ]);

  return (
    <Page>
      <HomeHero content={homeContent.hero} siteName={siteContent.settings.siteName} />
      <HomeSelectedProjects content={homeContent.selectedProjects} />
      <HomeStudioIntro content={homeContent.studioIntro} />
      <HomeFeaturedProject content={homeContent.featuredProject} />
      <HomeContactExperience contact={siteContent.contact} content={homeContent.contact} />
    </Page>
  );
}
