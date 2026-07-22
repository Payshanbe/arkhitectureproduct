import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/seo/metadata";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#f4f1eb",
    description: siteConfig.description,
    display: "standalone",
    icons: [
      {
        sizes: "64x64",
        src: "/favicons/favicon.png",
        type: "image/png",
      },
      {
        purpose: "any",
        sizes: "180x180",
        src: "/icons/apple-touch-icon.png",
        type: "image/png",
      },
    ],
    name: siteConfig.title,
    short_name: siteConfig.name,
    start_url: "/",
    theme_color: "#f4f1eb",
  };
}
