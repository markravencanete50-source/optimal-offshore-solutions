import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { getClientDb } from "@/lib/firebaseClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_TYPES = new Set(["pageview", "cta_click", "lead_submitted"]);

// Light per-instance rate limit — serverless instances are short-lived, so this
// is a nuisance brake on floods, not a hard guarantee.
const hits = new Map<string, { count: number; windowStart: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 60;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    hits.set(ip, { count: 1, windowStart: now });
    return false;
  }
  entry.count++;
  return entry.count > MAX_PER_WINDOW;
}

function deviceFromUa(ua: string): string {
  if (/bot|crawl|spider|slurp|bingpreview/i.test(ua)) return "bot";
  if (/iPad|Tablet|PlayBook|Silk/i.test(ua)) return "tablet";
  if (/Mobi|Android|iPhone/i.test(ua)) return "mobile";
  return "desktop";
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return NextResponse.json({ success: true }); // silently drop

  let body: { type?: string; path?: string; ref?: string; sid?: string; label?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const type = String(body.type ?? "");
  if (!ALLOWED_TYPES.has(type)) {
    return NextResponse.json({ error: "Unknown event type." }, { status: 400 });
  }

  const ua = req.headers.get("user-agent") ?? "";
  const event = {
    type,
    path: String(body.path ?? "/").slice(0, 300),
    label: String(body.label ?? "").slice(0, 100),
    ref: String(body.ref ?? "").slice(0, 500),
    sid: String(body.sid ?? "").slice(0, 100),
    device: deviceFromUa(ua),
    // Vercel injects the visitor's country code at the edge.
    country: (req.headers.get("x-vercel-ip-country") ?? "").slice(0, 10),
  };

  try {
    const adminDb = getAdminDb();
    if (adminDb) {
      await adminDb.collection("events").add({ ...event, createdAt: FieldValue.serverTimestamp() });
    } else {
      const clientDb = getClientDb();
      if (clientDb) {
        await addDoc(collection(clientDb, "events"), { ...event, createdAt: serverTimestamp() });
      }
      // No Firebase configured → drop silently; tracking must never break the site.
    }
  } catch (err) {
    console.error("[track] Failed to store event:", err);
  }

  return NextResponse.json({ success: true });
}
