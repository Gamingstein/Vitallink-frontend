import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path.startsWith("/auth") || path.startsWith("/home");
  const isTokenPresent = request.cookies.has("accessToken");
  if (isPublicPath && isTokenPresent) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (!isPublicPath && !isTokenPresent) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/home", "/auth/(.*)", "/dashboard/(.*)"],
};
