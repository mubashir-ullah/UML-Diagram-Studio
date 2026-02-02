import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * SEO middleware: normalizes URLs for consistent indexing.
 * - Redirects www to non-www
 * - Redirects trailing slash to no trailing slash (except for root /)
 */
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  let redirect = false;

  // www → non-www
  if (url.hostname === "www.umldiagram.app") {
    url.hostname = "umldiagram.app";
    url.protocol = "https:";
    redirect = true;
  }

  // Trailing slash → no trailing slash (except root)
  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.replace(/\/+$/, "");
    redirect = true;
  }

  if (redirect) {
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}
