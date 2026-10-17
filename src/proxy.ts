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

  // Check if current hostname is coffee-bun or bundle subdomain
  const isCoffeeBunSubdomain =
    hostname.startsWith("coffee-bun.dev.sungmin.me") ||
    hostname.startsWith("coffee-bun.localhost") ||
    hostname.startsWith("bundle.dev.sungmin.me") ||
    hostname.startsWith("bundle.localhost");

  // Extract locale from path
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  const locale = pathnameHasLocale
    ? pathname.split("/")[1]
    : i18n.defaultLocale;

  if (isCoffeeBunSubdomain) {
    // If request is to coffee-bun.dev.sungmin.me/
    // rewrite internally to /[locale]/coffee-bun
    if (pathname === "/" || pathname === `/${locale}`) {
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/coffee-bun`;
      return NextResponse.rewrite(url);
    }
    if (!pathnameHasLocale) {
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}${
        pathname === "/coffee-bun" || pathname === "/bundle"
          ? "/coffee-bun"
          : pathname
      }`;
      return NextResponse.rewrite(url);
    }
  }

  // If path doesn't have locale on main domain
  if (!pathnameHasLocale) {
    const url = request.nextUrl.clone();
    if (pathname === "/coffee-bun" || pathname === "/bundle") {
      url.pathname = `/${locale}/coffee-bun`;
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
