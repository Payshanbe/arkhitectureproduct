import { Page } from "@/components/layout/Page";
import { StudioPage } from "@/features/studio/StudioPage";
import { getSiteChromeContent, getStudioPageContent } from "@/lib/cms/siteContent";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Studio",
  description: "A philosophy-first introduction to the studio's approach to architecture.",
  path: "/studio",
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function StudioRoute() {
  const [content, siteContent] = await Promise.all([
    getStudioPageContent(),
    getSiteChromeContent(),
  ]);

  return (
    <Page>
      <StudioPage contact={siteContent.contact} content={content} />
    </Page>
  );
}
