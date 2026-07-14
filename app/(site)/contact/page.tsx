import { Page } from "@/components/layout/Page";
import { ContactPage } from "@/features/contact/ContactPage";
import {
  getContactFormSettings,
  getContactPageContent,
  getSiteChromeContent,
} from "@/lib/cms/siteContent";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description: "Begin a calm project conversation with Arkhitecture.",
  path: "/contact",
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface ContactRouteProps {
  searchParams?: Promise<{
    error?: string;
    sent?: string;
  }>;
}

export default async function ContactRoute({ searchParams }: ContactRouteProps) {
  const [content, formSettings, siteContent] = await Promise.all([
    getContactPageContent(),
    getContactFormSettings(),
    getSiteChromeContent(),
  ]);
  const params = await searchParams;
  const submissionStatus =
    params?.sent === "1"
      ? "sent"
      : params?.error === "email"
        ? "email"
        : params?.error === "required"
          ? "required"
          : undefined;

  return (
    <Page>
      <ContactPage
        contact={siteContent.contact}
        content={content}
        formSettings={formSettings}
        submissionStatus={submissionStatus}
      />
    </Page>
  );
}
