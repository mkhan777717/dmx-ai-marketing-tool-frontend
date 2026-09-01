import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isAuthRoute = pathname === "/login" || pathname === "/signup";
  const isRootRoute = pathname === "/";

  // Check for Supabase session cookies (supports @supabase/ssr and client auth cookies)
  const allCookies = request.cookies.getAll();
  const hasAuthCookie = allCookies.some((cookie) => {
    const name = cookie.name.toLowerCase();
    return (
      name.startsWith("sb-") ||
      name.includes("auth-token") ||
      name.includes("access-token") ||
      name.includes("supabase")
    );
  });

  if (isRootRoute) {
    if (hasAuthCookie) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthRoute && hasAuthCookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isDashboardRoute && !hasAuthCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup", "/dashboard/:path*"],
};
