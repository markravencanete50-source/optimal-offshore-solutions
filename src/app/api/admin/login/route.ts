import { NextResponse } from "next/server";
import { getAdminAuth } from "@/lib/firebaseAdmin";
import { createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE_S } from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Optional allowlist of admin emails (comma-separated in ADMIN_EMAILS). */
function allowedEmails(): string[] {
  return (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export async function POST(req: Request) {
  const auth = getAdminAuth();
  if (!auth) {
    return NextResponse.json(
      { error: "Admin sign-in is not configured. Set the Firebase Admin credentials in the environment." },
      { status: 503 },
    );
  }

  let idToken = "";
  try {
    const body = await req.json();
    idToken = typeof body?.idToken === "string" ? body.idToken : "";
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  if (!idToken) {
    return NextResponse.json({ error: "Missing sign-in token." }, { status: 400 });
  }

  // Verify the Firebase ID token server-side — never trust the client's claims.
  let decoded;
  try {
    decoded = await auth.verifyIdToken(idToken);
  } catch {
    await sleep(500);
    return NextResponse.json({ error: "Invalid or expired sign-in. Please try again." }, { status: 401 });
  }

  // Optional allowlist — restrict /admin to specific Firebase accounts.
  const allow = allowedEmails();
  const email = (decoded.email || "").toLowerCase();
  if (allow.length && !allow.includes(email)) {
    return NextResponse.json({ error: "This account is not authorised for the admin console." }, { status: 403 });
  }

  const token = await createSessionToken();
  if (!token) {
    return NextResponse.json(
      { error: "Could not create a session. Set ADMIN_SESSION_SECRET in the environment." },
      { status: 500 },
    );
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_S,
  });
  return res;
}

// Logout — clears the session cookie.
export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(SESSION_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
