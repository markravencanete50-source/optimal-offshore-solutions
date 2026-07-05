import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { getClientDb } from "@/lib/firebaseClient";

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

  try {
    // Preferred: Admin SDK (most spam-resistant) when a service account is set.
    const adminDb = getAdminDb();
    if (adminDb) {
      await adminDb.collection("leads").add({
        ...lead,
        createdAt: FieldValue.serverTimestamp(),
      });
      return NextResponse.json({ success: true, stored: true });
    }

    // Fallback: client SDK using the public web config. Requires Firestore
    // rules that allow validated `create` on the `leads` collection.
    const clientDb = getClientDb();
    if (clientDb) {
      await addDoc(collection(clientDb, "leads"), {
        ...lead,
        createdAt: serverTimestamp(),
      });
      return NextResponse.json({ success: true, stored: true });
    }

    // Nothing configured — don't lose the lead: log it so it's recoverable.
    console.warn("[contact] Firebase not configured. Lead (unstored):", lead);
    return NextResponse.json({ success: true, stored: false });
  } catch (err) {
    console.error("[contact] Failed to store lead:", err);
    return NextResponse.json(
      { error: "Something went wrong on our end. Please email us directly." },
      { status: 500 },
    );
  }
}
