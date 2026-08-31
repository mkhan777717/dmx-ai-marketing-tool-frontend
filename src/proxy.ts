import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isAuthRoute = pathname === "/login" || pathname === "/signup";
  const isRootRoute = pathname === "/";

  const authCookie =
    request.cookies.get("sb-access-token")?.value ||
    request.cookies.get("sb-auth-token")?.value ||
    Array.from(request.cookies.getAll()).find((c) => c.name.includes("auth-token"))?.value;

  if (isRootRoute) {
    if (authCookie) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthRoute && authCookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isDashboardRoute && !authCookie) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup", "/dashboard/:path*"],
};
