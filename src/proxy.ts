import { i18n } from "@/i18n-config";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get("host") || "";

  // Skip static files, api, images, etc.
  if (
    pathname.startsWith("/_next") ||
    pathname.includes("/api/") ||
    pathname.includes(".") ||
    pathname.startsWith("/fonts")
  ) {
    return NextResponse.next();
  }

  // Check if current hostname is bundle.dev.sungmin.me or bundle.localhost
  const isBundleSubdomain =
    hostname.startsWith("bundle.dev.sungmin.me") ||
    hostname.startsWith("bundle.localhost");

  // Extract locale from path
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  const locale = pathnameHasLocale
    ? pathname.split("/")[1]
    : i18n.defaultLocale;

  if (isBundleSubdomain) {
    // If request is to bundle.dev.sungmin.me/
    // rewrite internally to /[locale]/bundle
    if (pathname === "/" || pathname === `/${locale}`) {
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/bundle`;
      return NextResponse.rewrite(url);
    }
    if (!pathnameHasLocale) {
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}${pathname === "/bundle" ? "/bundle" : pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  // If path doesn't have locale on main domain
  if (!pathnameHasLocale) {
    const url = request.nextUrl.clone();
    if (pathname === "/bundle") {
      url.pathname = `/${locale}/bundle`;
      return NextResponse.redirect(url);
    }
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
