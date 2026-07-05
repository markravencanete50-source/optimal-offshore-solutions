import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

type Payload = {
  firstName?: string;
  email?: string;
  company?: string;
  industry?: string;
  challenge?: string;
  // honeypot — real users leave this empty
  website?: string;
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Spam trap: silently accept bots but store nothing.
  if (body.website) {
    return NextResponse.json({ success: true });
  }

  const firstName = body.firstName?.trim();
  const email = body.email?.trim();
  const company = body.company?.trim();

  if (!firstName || !email || !company) {
    return NextResponse.json(
      { error: "Please fill in your name, work email, and company." },
      { status: 400 },
    );
  }
  if (!emailRe.test(email)) {
    return NextResponse.json({ error: "Please enter a valid work email." }, { status: 400 });
  }

  const lead = {
    firstName,
    email,
    company,
    industry: body.industry?.trim() || "Not specified",
    challenge: body.challenge?.trim() || "",
    source: "website-contact",
    status: "new",
    createdAt: new Date().toISOString(),
  };

  const db = getAdminDb();
  if (!db) {
    // Firebase not configured yet — don't lose the lead: log it server-side
    // so it's recoverable, and let the visitor see success.
    console.warn("[contact] Firebase Admin not configured. Lead (unstored):", lead);
    return NextResponse.json({ success: true, stored: false });
  }

  try {
    await db.collection("leads").add({
      ...lead,
      createdAt: FieldValue.serverTimestamp(),
    });
    return NextResponse.json({ success: true, stored: true });
  } catch (err) {
    console.error("[contact] Failed to store lead:", err);
    return NextResponse.json(
      { error: "Something went wrong on our end. Please email us directly." },
      { status: 500 },
    );
  }
}
