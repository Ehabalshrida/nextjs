import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { JWTPayload } from './utils/types';
// import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  console.log("{ id }Middleware");

  // when set token in authorization header
  // const accessToken = request.headers.get("Authorization");
  // when set token in cookie
  const token = request.cookies.get("jwtToken");
  console.log({
    token,
    request,
    cookies: request.cookies,
    pathname: request.nextUrl.pathname,
    url: request.url,
    headers: request.headers,
    method: request.method,
  });
  const accessToken = token?.value as string;
  if (!accessToken) {
    if (request.nextUrl.pathname.startsWith("/api/users/profile")) {
      return NextResponse.json(
        { message: "no token provided, access denied, Middleware response" },
        { status: 401 }
      );
    }
  } else {
    if (
      request.nextUrl.pathname === "/register" ||
      request.nextUrl.pathname === "/login"
    ) {
      return NextResponse.redirect(new URL("/", request.url)); }
}
}
export const config = {
  matcher: ["/api/users/profile/:path", "/register", "/login"], // Apply middleware to specific routes
  runtime: "nodejs",
};
