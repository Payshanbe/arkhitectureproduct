import type { Field } from "payload";

const localizableTypes = new Set(["text", "textarea", "richText"]);

const sharedFieldNames = new Set([
  "behance",
  "canonical",
  "email",
  "googleMaps",
  "instagram",
  "keywords",
  "linkHref",
  "linkedin",
  "phone",
  "pinterest",
  "siteName",
  "slug",
  "url",
]);

function localizeField(field: Field): Field {
  let nextField = { ...field } as Field;

  if ("fields" in nextField && Array.isArray(nextField.fields)) {
    nextField = {
      ...nextField,
      fields: localizeContentFields(nextField.fields),
    } as Field;
  }

  if (
    "name" in nextField &&
    typeof nextField.name === "string" &&
    "type" in nextField &&
    localizableTypes.has(nextField.type) &&
    !sharedFieldNames.has(nextField.name)
  ) {
    return {
      ...nextField,
      localized: true,
    } as Field;
  }

  return nextField;
}

export function localizeContentFields(fields: Field[]): Field[] {
  return fields.map(localizeField);
}
