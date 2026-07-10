import { absoluteUrl, siteConfig } from "@/lib/seo/metadata";

interface CreativeWorkData {
  category?: string;
  description: string;
  image?: string;
  location?: string;
  name: string;
  services?: string[];
  url: string;
  year?: string;
}

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: absoluteUrl("/"),
    description: siteConfig.description,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl("/"),
    description: siteConfig.description,
    inLanguage: "en",
  };
}

export function creativeWorkJsonLd({
  category,
  description,
  image,
  location,
  name,
  services,
  url,
  year,
}: CreativeWorkData) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    about: services,
    creator: {
      "@type": "Organization",
      name: siteConfig.name,
      url: absoluteUrl("/"),
    },
    dateCreated: year,
    description,
    genre: category,
    image: image ? absoluteUrl(image) : undefined,
    locationCreated: location
      ? {
          "@type": "Place",
          name: location,
        }
      : undefined,
    name,
    url: absoluteUrl(url),
  };
}

