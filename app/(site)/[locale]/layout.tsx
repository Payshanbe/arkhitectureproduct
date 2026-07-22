import { notFound } from "next/navigation";

import { LocaleDocument } from "@/components/i18n/LocaleDocument";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StructuredData } from "@/components/seo/StructuredData";
import { getSiteChromeContent } from "@/lib/cms/siteContent";
import { isSiteLocale, siteLocales } from "@/lib/i18n/config";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/structuredData";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export function generateStaticParams() {
  return siteLocales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isSiteLocale(locale)) {
    notFound();
  }

  const siteContent = await getSiteChromeContent(locale);
  const skipLabel = locale === "tj" ? "Гузаштан ба муҳтаво" : "Перейти к содержанию";

  return (
    <>
      <LocaleDocument locale={locale} />
      <a
        className="fixed left-[var(--container-padding)] top-4 z-overlay -translate-y-24 bg-background px-4 py-3 type-label text-foreground shadow-sm transition-transform duration-base ease-architectural-out focus-visible:translate-y-0"
        href="#main-content"
      >
        {skipLabel}
      </a>
      <StructuredData data={[organizationJsonLd(), websiteJsonLd()]} />
      <Header
        menuDescription={siteContent.settings.footerDescription}
        navigationItems={siteContent.navigationItems}
        locale={locale}
        siteName={siteContent.settings.siteName}
      />
      {children}
      <Footer locale={locale} />
    </>
  );
}
