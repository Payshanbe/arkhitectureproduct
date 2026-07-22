export const BRAND_NAME = "PRO DESIGN";

const legacyPlaceholderNames = new Set(["architecture", "arkhitecture"]);

export function resolveBrandName(value?: null | string) {
  const normalizedValue = value?.trim();

  if (!normalizedValue || legacyPlaceholderNames.has(normalizedValue.toLowerCase())) {
    return BRAND_NAME;
  }

  return normalizedValue;
}
