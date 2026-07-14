import { Cormorant_Garamond, Inter } from "next/font/google";
import type { Viewport } from "next";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { RouteScrollRestoration } from "@/components/navigation/RouteScrollRestoration";
import { StructuredData } from "@/components/seo/StructuredData";
import { getSiteChromeContent } from "@/lib/cms/siteContent";
import { globalMetadata } from "@/lib/seo/metadata";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/structuredData";
import { MotionProvider } from "@/providers/MotionProvider";

import "../globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["500"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = globalMetadata;

export const viewport: Viewport = {
  themeColor: "#f4f1eb",
};

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default async function SiteLayout({ children }: SiteLayoutProps) {
  const siteContent = await getSiteChromeContent();

  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a
          className="fixed left-[var(--container-padding)] top-4 z-overlay -translate-y-24 bg-background px-4 py-3 type-label text-foreground shadow-sm transition-transform duration-base ease-architectural-out focus-visible:translate-y-0"
          href="#main-content"
        >
          Skip to content
        </a>
        <StructuredData data={[organizationJsonLd(), websiteJsonLd()]} />
        <MotionProvider>
          <RouteScrollRestoration />
          <Header
            menuDescription={siteContent.settings.footerDescription}
            navigationItems={siteContent.navigationItems}
            siteName={siteContent.settings.siteName}
          />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
