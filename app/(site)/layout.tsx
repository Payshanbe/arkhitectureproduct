import { Cormorant_Garamond, Inter } from "next/font/google";
import { headers } from "next/headers";
import type { Viewport } from "next";

import { RouteScrollRestoration } from "@/components/navigation/RouteScrollRestoration";
import { getLanguageTag, normalizeLocale } from "@/lib/i18n/config";
import { globalMetadata } from "@/lib/seo/metadata";
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
  const requestHeaders = await headers();
  const locale = normalizeLocale(requestHeaders.get("x-site-locale"));

  return (
    <html lang={getLanguageTag(locale)} className={`${display.variable} ${sans.variable}`}>
      <body>
        <MotionProvider>
          <RouteScrollRestoration />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
