import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PublicRoutes = ["/auth/login", "/auth/signup", "/home"];

// This function can be marked `async` if using `await` inside
export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = PublicRoutes.includes(path);
  const isTokenPresent = request.cookies.has("accessToken");
  // console.log(
  //   `TokenPresent\t${isTokenPresent}\nPublicPath\t${isPublicPath}\nToken\t\t${request.cookies.get("accessToken")?.value.split(".")[0]}`,
  // );
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
  matcher: ["/home", "/auth/(.*)", "/dashboard/(.*)", "/dashboard"],
};
