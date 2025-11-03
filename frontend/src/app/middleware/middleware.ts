// middleware.ts (or middleware.js if not using TS)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  const { pathname } = req.nextUrl;

  // ✅ Redirect logged-in users away from /login
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // ❌ Redirect non-logged-in users trying to access /home
  if (!token && pathname.startsWith("/home")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/home/:path*"], // apply only to these routes
};
