import { Page } from "@/components/layout/Page";
import { WorkArchive } from "@/features/work/WorkArchive";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Work",
  description: "An editorial archive of architecture and interior design projects.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <Page>
      <WorkArchive />
    </Page>
  );
}
