import { type NextRequest, NextResponse } from "next/server";

import { getLocaleFromPathname } from "@/lib/i18n/config";

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-site-locale", getLocaleFromPathname(request.nextUrl.pathname));

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!api|admin|_next/static|_next/image|favicons|icons|media|.*\\..*).*)"],
};
