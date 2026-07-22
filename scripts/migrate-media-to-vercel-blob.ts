import { BlobNotFoundError, head, put } from "@vercel/blob";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const mediaRoot = path.resolve(process.cwd(), "public/media");
const dryRun = process.argv.includes("dry-run") || process.argv.includes("--dry-run");
const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();

const contentTypes: Record<string, string> = {
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

async function collectFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const absolutePath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return collectFiles(absolutePath);
      }

      return entry.isFile() && entry.name !== ".gitkeep" ? [absolutePath] : [];
    }),
  );

  return files.flat();
}

async function blobExists(pathname: string): Promise<boolean> {
  try {
    await head(pathname, { token });
    return true;
  } catch (error) {
    if (error instanceof BlobNotFoundError) {
      return false;
    }

    throw error;
  }
}

async function migrateMedia() {
  const files = await collectFiles(mediaRoot);

  if (dryRun) {
    console.log(`Dry run: ${files.length} media files are ready for Vercel Blob.`);
    return;
  }

  if (!token) {
    throw new Error("BLOB_READ_WRITE_TOKEN is required to migrate media.");
  }

  let uploaded = 0;
  let skipped = 0;

  for (const absolutePath of files) {
    const pathname = path.relative(mediaRoot, absolutePath).split(path.sep).join("/");

    if (await blobExists(pathname)) {
      skipped += 1;
      continue;
    }

    await put(pathname, await readFile(absolutePath), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: false,
      cacheControlMaxAge: 31_536_000,
      contentType: contentTypes[path.extname(pathname).toLowerCase()],
      token,
    });
    uploaded += 1;
  }

  console.log(`Vercel Blob migration complete: ${uploaded} uploaded, ${skipped} already present.`);
}

await migrateMedia();
