type RequiredEnvKey = "DATABASE_URI" | "PAYLOAD_SECRET" | "NEXT_PUBLIC_SITE_URL";

type PayloadEnv = Record<RequiredEnvKey, string>;

const placeholderSecrets = new Set(["replace-with-a-secure-random-string"]);

function readRequiredEnv(key: RequiredEnvKey): string {
  const value = process.env[key]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}.`);
  }

  return value;
}

function validateUrl(name: RequiredEnvKey, value: string, allowedProtocols: string[]) {
  let parsed: URL;

  try {
    parsed = new URL(value);
  } catch {
    throw new Error(`${name} must be a valid URL.`);
  }

  if (!allowedProtocols.includes(parsed.protocol)) {
    throw new Error(`${name} must use one of these protocols: ${allowedProtocols.join(", ")}.`);
  }

  return value;
}

function validatePayloadSecret(value: string) {
  if (placeholderSecrets.has(value)) {
    throw new Error("PAYLOAD_SECRET must be replaced with a secure non-placeholder value.");
  }

  if (value.length < 32) {
    throw new Error("PAYLOAD_SECRET must be at least 32 characters long.");
  }

  return value;
}

export function getPayloadEnv(): PayloadEnv {
  const databaseUri = validateUrl("DATABASE_URI", readRequiredEnv("DATABASE_URI"), [
    "postgres:",
    "postgresql:",
  ]);
  const payloadSecret = validatePayloadSecret(readRequiredEnv("PAYLOAD_SECRET"));
  const siteUrl = validateUrl("NEXT_PUBLIC_SITE_URL", readRequiredEnv("NEXT_PUBLIC_SITE_URL"), [
    "http:",
    "https:",
  ]);

  return {
    DATABASE_URI: databaseUri,
    NEXT_PUBLIC_SITE_URL: siteUrl,
    PAYLOAD_SECRET: payloadSecret,
  };
}

export function getVercelBlobToken(): string | undefined {
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();

  if (!token) {
    if (process.env.VERCEL_ENV === "production") {
      throw new Error(
        "Missing required environment variable: BLOB_READ_WRITE_TOKEN. Connect a Vercel Blob store before deploying to production.",
      );
    }

    return undefined;
  }

  if (!/^vercel_blob_rw_[a-z\d]+_[a-z\d]+$/i.test(token)) {
    throw new Error("BLOB_READ_WRITE_TOKEN has an invalid Vercel Blob token format.");
  }

  return token;
}
