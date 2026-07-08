import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/adminAuth";

/**
 * Guards the admin area. Every /admin page and /api/admin route requires a
 * valid session cookie — unauthenticated pages bounce to /admin/login,
 * unauthenticated API calls get 401 JSON.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // The login screen and its API are the only unauthenticated entry points.
  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  const authed = await verifySessionToken(req.cookies.get(SESSION_COOKIE)?.value);
  if (authed) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  }

  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
