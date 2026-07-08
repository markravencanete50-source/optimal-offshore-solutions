import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { getClientDb } from "@/lib/firebaseClient";
import { sendLeadEmails } from "@/lib/email";

export const runtime = "nodejs";

type Payload = {
  firstName?: string;
  email?: string;
  company?: string;
  industry?: string;
  challenge?: string;
  // honeypot — real users leave this empty
  website?: string;
  // Cloudflare Turnstile response token
  turnstileToken?: string;
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Verify a Cloudflare Turnstile token. Skipped (returns true) until
 * TURNSTILE_SECRET_KEY is set, so the form works before Turnstile is
 * configured. Fails closed once the secret exists.
 */
async function verifyTurnstile(token: string | undefined, ip: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: token, ...(ip ? { remoteip: ip } : {}) }),
    });
    const json = await res.json();
    return json?.success === true;
  } catch (err) {
    console.error("[contact] Turnstile verification errored:", err);
    return false;
  }
}

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

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
  if (!(await verifyTurnstile(body.turnstileToken, ip))) {
    return NextResponse.json(
      { error: "Human verification failed — please try the checkbox again." },
      { status: 400 },
    );
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

  let stored = false;
  try {
    // Preferred: Admin SDK (most spam-resistant) when a service account is set.
    const adminDb = getAdminDb();
    if (adminDb) {
      await adminDb.collection("leads").add({ ...lead, createdAt: FieldValue.serverTimestamp() });
      stored = true;
    } else {
      // Fallback: client SDK using the public web config. Requires Firestore
      // rules that allow validated `create` on the `leads` collection.
      const clientDb = getClientDb();
      if (clientDb) {
        await addDoc(collection(clientDb, "leads"), { ...lead, createdAt: serverTimestamp() });
        stored = true;
      } else {
        console.warn("[contact] Firebase not configured. Lead (unstored):", lead);
      }
    }
  } catch (err) {
    console.error("[contact] Failed to store lead:", err);
    return NextResponse.json(
      { error: "Something went wrong on our end. Please email us directly." },
      { status: 500 },
    );
  }

  // Email the lead out (best-effort; never throws). No-op until RESEND_API_KEY is set.
  const emailResult = await sendLeadEmails(lead);
  if (emailResult.error) console.error("[contact] Email send failed:", emailResult.error);

  return NextResponse.json({ success: true, stored, notified: emailResult.notified });
}
