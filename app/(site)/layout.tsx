import { Cormorant_Garamond, Inter } from "next/font/google";
import type { Viewport } from "next";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { RouteScrollRestoration } from "@/components/navigation/RouteScrollRestoration";
import { StructuredData } from "@/components/seo/StructuredData";
import { globalMetadata } from "@/lib/seo/metadata";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/structuredData";
import { MotionProvider } from "@/providers/MotionProvider";

import "../globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = globalMetadata;

export const viewport: Viewport = {
  themeColor: "#f4f1eb",
};

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a
          className="fixed left-[var(--container-padding)] top-4 z-overlay -translate-y-24 bg-background px-4 py-3 text-[length:var(--font-size-ui)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-ui)] text-foreground shadow-sm transition-transform duration-base ease-architectural-out focus-visible:translate-y-0"
          href="#main-content"
        >
          Skip to content
        </a>
        <StructuredData data={[organizationJsonLd(), websiteJsonLd()]} />
        <MotionProvider>
          <RouteScrollRestoration />
          <Header />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
