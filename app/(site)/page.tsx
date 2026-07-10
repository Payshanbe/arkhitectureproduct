import { createPageMetadata } from "@/lib/seo/metadata";
import { Page } from "@/components/layout/Page";
import { HomeContactExperience } from "@/features/home/HomeContactExperience";
import { HomeFeaturedProject } from "@/features/home/HomeFeaturedProject";
import { HomeHero } from "@/features/home/HomeHero";
import { HomeSelectedProjects } from "@/features/home/HomeSelectedProjects";
import { HomeStudioIntro } from "@/features/home/HomeStudioIntro";

export const metadata = createPageMetadata({
  description:
    "Arkhitecture is a quiet architecture and interior design studio creating cinematic, material-led spaces with restraint and atmosphere.",
  path: "/",
  title: "Architecture and Interior Design Studio",
});

export default function HomePage() {
  return (
    <Page>
      <HomeHero />
      <HomeSelectedProjects />
      <HomeStudioIntro />
      <HomeFeaturedProject />
      <HomeContactExperience />
    </Page>
  );
}
