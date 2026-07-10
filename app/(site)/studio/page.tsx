import { Page } from "@/components/layout/Page";
import { StudioPage } from "@/features/studio/StudioPage";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Studio",
  description: "A philosophy-first introduction to the studio's approach to architecture.",
  path: "/studio",
});

export default function StudioRoute() {
  return (
    <Page>
      <StudioPage />
    </Page>
  );
}
