import { NextResponse, userAgent } from "next/server";
import type { NextRequest } from "next/server";

const PublicRoutes = ["/auth/login", "/auth/signup", "/home", "/mobile"];
const NotAllowedDevices = [
  "console",
  "mobile",
  "tablet",
  "smarttv",
  "wearable",
  "embedded",
];
// This function can be marked `async` if using `await` inside
export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const { device } = userAgent(request);
  if (NotAllowedDevices.includes(device.type as string) && path !== "/mobile") {
    console.log("mobile site");
    return NextResponse.redirect(new URL("/mobile", request.nextUrl));
  }
  if (
    !NotAllowedDevices.includes(device.type as string) &&
    path === "/mobile"
  ) {
    console.log("desktop site");
    return NextResponse.redirect(new URL("/home", request.nextUrl));
  }
  const isPublicPath = PublicRoutes.includes(path);
  const isTokenPresent = request.cookies.has("accessToken");

  if (isPublicPath && isTokenPresent) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }
  if (!isPublicPath && !isTokenPresent) {
    return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/home", "/auth/(.*)", "/dashboard/(.*)", "/dashboard", "/mobile"],
};
