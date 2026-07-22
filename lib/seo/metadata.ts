import type { Metadata } from "next";

import { BRAND_NAME } from "@/lib/brand";
import { getOpenGraphLocale, localizePath, type SiteLocale } from "@/lib/i18n/config";

export const siteConfig = {
  name: BRAND_NAME,
  title: BRAND_NAME,
  titleTemplate: `%s | ${BRAND_NAME}`,
  description:
    "A quiet architecture and interior design studio shaping spaces through light, proportion, material, and restraint.",
  urlFallback: "http://localhost:3000",
  locale: "ru_RU",
  twitterCard: "summary_large_image",
} as const;

interface PageMetadataOptions {
  description: string;
  image?: {
    alt?: string;
    url: string;
  };
  path: string;
  title: string;
  type?: "website" | "article";
}

export function getSiteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim() || siteConfig.urlFallback;

  try {
    return new URL(value);
  } catch {
    return new URL(siteConfig.urlFallback);
  }
}

export function absoluteUrl(path: string) {
  try {
    return new URL(path).toString();
  } catch {
    return new URL(path, getSiteUrl()).toString();
  }
}

export function compactStrings(values: Array<string | null | undefined>) {
  return values.filter((value): value is string => Boolean(value));
}

export function truncate(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 3).trimEnd()}...`;
}

export function createPageMetadata({
  description,
  image,
  path,
  title,
  type = "website",
}: PageMetadataOptions): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = image?.url ? absoluteUrl(image.url) : undefined;

  return {
    alternates: {
      canonical,
    },
    description,
    openGraph: {
      description,
      images: imageUrl
        ? [
            {
              alt: image?.alt ?? title,
              url: imageUrl,
            },
          ]
        : undefined,
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title,
      type,
      url: canonical,
    },
    title,
    twitter: {
      card: siteConfig.twitterCard,
      description,
      images: imageUrl ? [imageUrl] : undefined,
      title,
    },
  };
}

interface LocalizedPageMetadataOptions extends PageMetadataOptions {
  locale: SiteLocale;
}

export function createLocalizedPageMetadata({
  locale,
  path,
  ...options
}: LocalizedPageMetadataOptions): Metadata {
  const localizedPath = localizePath(path, locale);
  const metadata = createPageMetadata({ ...options, path: localizedPath });

  return {
    ...metadata,
    alternates: {
      canonical: absoluteUrl(localizedPath),
      languages: {
        ru: absoluteUrl(localizePath(path, "ru")),
        tg: absoluteUrl(localizePath(path, "tj")),
      },
    },
    openGraph: {
      ...metadata.openGraph,
      locale: getOpenGraphLocale(locale),
      url: absoluteUrl(localizedPath),
    },
  };
}

export const globalMetadata: Metadata = {
  description: siteConfig.description,
  icons: {
    apple: [
      {
        sizes: "180x180",
        url: "/icons/apple-touch-icon.png",
      },
    ],
    icon: [
      {
        sizes: "64x64",
        type: "image/png",
        url: "/favicons/favicon.png",
      },
    ],
    shortcut: "/favicons/favicon.png",
  },
  metadataBase: getSiteUrl(),
  openGraph: {
    description: siteConfig.description,
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: siteConfig.title,
    type: "website",
    url: absoluteUrl("/ru"),
  },
  title: {
    default: siteConfig.title,
    template: siteConfig.titleTemplate,
  },
  twitter: {
    card: siteConfig.twitterCard,
    description: siteConfig.description,
    title: siteConfig.title,
  },
};
