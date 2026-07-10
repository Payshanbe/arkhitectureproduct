import type { Metadata } from "next";

export const siteConfig = {
  name: "Arkhitecture",
  title: "Arkhitecture",
  titleTemplate: "%s | Arkhitecture",
  description:
    "A quiet architecture and interior design studio shaping spaces through light, proportion, material, and restraint.",
  urlFallback: "http://localhost:3000",
  locale: "en_US",
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
        type: "image/svg+xml",
        url: "/favicons/favicon.svg",
      },
    ],
    shortcut: "/favicons/favicon.svg",
  },
  metadataBase: getSiteUrl(),
  openGraph: {
    description: siteConfig.description,
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: siteConfig.title,
    type: "website",
    url: absoluteUrl("/"),
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
