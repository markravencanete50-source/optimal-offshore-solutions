import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { getClientDb } from "@/lib/firebaseClient";
import { sendReadinessEmails } from "@/lib/email";
import { BAND_SLUGS, TOTAL_POINTS, type BandSlug } from "@/lib/readiness";
import { siteUrl } from "@/lib/site";

export const runtime = "nodejs";

type Payload = {
  firstName?: string;
  email?: string;
  company?: string;
  industry?: string;
  readinessScore?: number;
  readinessBand?: string;
  sectionScores?: Record<string, unknown>;
  // honeypot — real users leave this empty
  website?: string;
  // Cloudflare Turnstile response token
  turnstileToken?: string;
};

const clean = (v: unknown, max = 200): string =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SECTION_KEYS = ["operational", "team", "impact", "technology"] as const;

/** Clamp a client-supplied section score to a sane 0–25 integer. */
function cleanSectionScore(v: unknown): number {
  const n = typeof v === "number" ? v : NaN;
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(25, Math.round(n)));
}

/**
 * Same Turnstile contract as /api/contact: skipped until
 * TURNSTILE_SECRET_KEY is set, fails closed once it exists.
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
    console.error("[readiness-lead] Turnstile verification errored:", err);
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

  const firstName = clean(body.firstName, 120);
  const email = clean(body.email, 200);
  const company = clean(body.company, 160);
  const industry = clean(body.industry, 80) || "Not specified";

  if (!firstName || !email || !company) {
    return NextResponse.json(
      { error: "Please fill in your name, work email and company." },
      { status: 400 },
    );
  }
  if (!emailRe.test(email)) {
    return NextResponse.json({ error: "Please enter a valid work email." }, { status: 400 });
  }

  const rawScore = typeof body.readinessScore === "number" ? body.readinessScore : NaN;
  const readinessScore = Number.isFinite(rawScore)
    ? Math.max(0, Math.min(TOTAL_POINTS, Math.round(rawScore)))
    : null;
  const readinessBand = BAND_SLUGS.includes(body.readinessBand as BandSlug)
    ? (body.readinessBand as BandSlug)
    : null;
  if (readinessScore === null || readinessBand === null) {
    return NextResponse.json(
      { error: "Please complete the scorecard before requesting the breakdown." },
      { status: 400 },
    );
  }

  const sectionScores = Object.fromEntries(
    SECTION_KEYS.map((k) => [k, cleanSectionScore(body.sectionScores?.[k])]),
  );

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
  if (!(await verifyTurnstile(body.turnstileToken, ip))) {
    return NextResponse.json(
      { error: "Human verification failed — please try the checkbox again." },
      { status: 400 },
    );
  }

  // Written to the same `leads` collection so /admin picks it up with no
  // schema fork; contact-form-only fields default to empty strings.
  const lead = {
    firstName,
    email,
    company,
    phone: "",
    availability: "",
    contactMethod: "Email",
    industry,
    interest: "Offshore readiness scorecard",
    budget: "Not specified",
    challenge: `Scored ${readinessScore}/100 (${readinessBand}). Sections — operational: ${sectionScores.operational}/25, team: ${sectionScores.team}/25, impact: ${sectionScores.impact}/25, technology: ${sectionScores.technology}/25.`,
    source: "readiness-scorecard",
    status: "new",
    readinessScore,
    readinessBand,
    sectionScores,
    createdAt: new Date().toISOString(),
  };

  let stored = false;
  try {
    const adminDb = getAdminDb();
    if (adminDb) {
      await adminDb.collection("leads").add({ ...lead, createdAt: FieldValue.serverTimestamp() });
      stored = true;
    } else {
      const clientDb = getClientDb();
      if (clientDb) {
        await addDoc(collection(clientDb, "leads"), { ...lead, createdAt: serverTimestamp() });
        stored = true;
      } else {
        console.warn("[readiness-lead] Firebase not configured. Lead (unstored):", lead);
      }
    }
  } catch (err) {
    console.error("[readiness-lead] Failed to store lead:", err);
    return NextResponse.json(
      { error: "Something went wrong on our end. Please email us directly." },
      { status: 500 },
    );
  }

  // Email out (best-effort; never fails the capture). No-op until RESEND_API_KEY is set.
  const emailResult = await sendReadinessEmails(
    { firstName, email, company, industry, readinessScore, readinessBand, sectionScores },
    `${siteUrl}/oos-offshore-readiness-scorecard.pdf`,
  );
  if (emailResult.error) console.error("[readiness-lead] Email send failed:", emailResult.error);

  return NextResponse.json({ success: true, stored, notified: emailResult.notified });
}
