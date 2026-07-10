import { Page } from "@/components/layout/Page";
import { ContactPage } from "@/features/contact/ContactPage";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description: "Begin a calm project conversation with Arkhitecture.",
  path: "/contact",
});

export default function ContactRoute() {
  return (
    <Page>
      <ContactPage />
    </Page>
  );
}
