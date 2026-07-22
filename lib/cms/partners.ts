import configPromise from "@payload-config";
import { getPayload } from "payload";

import { normalizePayloadImageUrl } from "@/lib/cms/media";
import type { Media, Partner } from "@/types/payload-types";

export interface PartnerRailItem {
  id: string;
  logoAlt: string;
  logoSrc: string;
  name: string;
  website?: string;
}

const placeholderPartners: PartnerRailItem[] = Array.from({ length: 6 }, (_, index) => ({
  id: `placeholder-partner-${index + 1}`,
  logoAlt: "",
  logoSrc: `/images/partners/logoipsum-${index + 1}.svg`,
  name: `Partner ${String(index + 1).padStart(2, "0")}`,
}));

function isMedia(value: Partner["logo"]): value is Media {
  return typeof value === "object" && value !== null;
}

function safeWebsite(value: null | string | undefined) {
  if (!value) {
    return undefined;
  }

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function normalizePartner(partner: Partner): PartnerRailItem {
  const logo = isMedia(partner.logo) ? partner.logo : null;
  const numericId = Number(partner.id);
  const placeholderIndex =
    Math.abs(Math.trunc((Number.isFinite(numericId) ? numericId : (partner.order ?? 1)) - 1)) % 6;

  return {
    id: String(partner.id),
    logoAlt: logo?.alt ?? "",
    logoSrc: normalizePayloadImageUrl(
      logo?.sizes?.large?.url ?? logo?.url,
      `/images/partners/logoipsum-${placeholderIndex + 1}.svg`,
    ),
    name: partner.name,
    website: safeWebsite(partner.website),
  };
}

export async function getPartnerRailItems(): Promise<PartnerRailItem[]> {
  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: "partners",
      depth: 1,
      limit: 30,
      sort: "order",
      where: {
        published: {
          equals: true,
        },
      },
    });

    return result.docs.length > 0 ? result.docs.map(normalizePartner) : placeholderPartners;
  } catch {
    return placeholderPartners;
  }
}
