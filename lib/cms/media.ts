const payloadFileRoute = "/api/media/file/";
const staticMediaRoute = "/media/";

export function normalizePayloadImageUrl(url: null | string | undefined, fallback: string) {
  if (!url) {
    return fallback;
  }

  let pathname = url;

  try {
    pathname = new URL(url).pathname;
  } catch {
    pathname = url.split("?")[0] ?? url;
  }

  if (pathname.startsWith(payloadFileRoute)) {
    return `${staticMediaRoute}${pathname.slice(payloadFileRoute.length)}`;
  }

  return pathname;
}
