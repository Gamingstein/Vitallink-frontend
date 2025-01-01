import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PublicRoutes = ["/auth/login", "/auth/signup", "/home"];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = PublicRoutes.includes(path);
  const isTokenPresent = (await cookies()).has("accessToken");

  if (isPublicPath && isTokenPresent) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (!isPublicPath && !isTokenPresent) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/home", "/auth/(.*)", "/dashboard/(.*)"],
};
