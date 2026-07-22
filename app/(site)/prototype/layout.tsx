import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getSiteChromeContent } from "@/lib/cms/siteContent";
import { defaultLocale } from "@/lib/i18n/config";

interface PrototypeLayoutProps {
  children: React.ReactNode;
}

export default async function PrototypeLayout({ children }: PrototypeLayoutProps) {
  const siteContent = await getSiteChromeContent(defaultLocale);

  return (
    <>
      <Header
        menuDescription={siteContent.settings.footerDescription}
        navigationItems={siteContent.navigationItems}
        locale={defaultLocale}
        siteName={siteContent.settings.siteName}
      />
      {children}
      <Footer locale={defaultLocale} />
    </>
  );
}
