import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        allow: ["/"],
        disallow: ["/admin", "/api"],
        userAgent: "*",
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}

