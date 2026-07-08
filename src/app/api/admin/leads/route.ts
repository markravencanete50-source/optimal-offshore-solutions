import { NextResponse } from "next/server";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { LEAD_STATUSES } from "@/lib/leadStatus";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function toIso(v: unknown): string {
  if (v instanceof Timestamp) return v.toDate().toISOString();
  if (typeof v === "string") return v;
  return "";
}

const notConfigured = () =>
  NextResponse.json({
    configured: false,
    error:
      "Firebase Admin is not configured. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY from a service-account key.",
  });

export async function GET() {
  const db = getAdminDb();
  if (!db) return notConfigured();

  try {
    const snap = await db.collection("leads").orderBy("createdAt", "desc").limit(1000).get();
    const leads = snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        firstName: data.firstName ?? "",
        email: data.email ?? "",
        company: data.company ?? "",
        phone: data.phone ?? "",
        availability: data.availability ?? "",
        contactMethod: data.contactMethod ?? "",
        industry: data.industry ?? "",
        interest: data.interest ?? "",
        budget: data.budget ?? "",
        challenge: data.challenge ?? "",
        status: data.status ?? "new",
        notes: data.notes ?? "",
        source: data.source ?? "",
        createdAt: toIso(data.createdAt),
        bookedAt: toIso(data.bookedAt),
      };
    });
    return NextResponse.json({ configured: true, leads });
  } catch (err) {
    console.error("[admin/leads] Failed to list leads:", err);
    return NextResponse.json({ error: "Failed to load leads." }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const db = getAdminDb();
  if (!db) return notConfigured();

  let body: { id?: string; status?: string; notes?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  if (!body.id) return NextResponse.json({ error: "Missing lead id." }, { status: 400 });

  const update: Record<string, unknown> = { updatedAt: FieldValue.serverTimestamp() };

  if (body.status !== undefined) {
    if (!LEAD_STATUSES.includes(body.status as (typeof LEAD_STATUSES)[number])) {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }
    update.status = body.status;
    // Stamp the moment a pilot call is first marked booked — powers the KPI.
    if (body.status === "booked") update.bookedAt = FieldValue.serverTimestamp();
  }
  if (body.notes !== undefined) {
    update.notes = String(body.notes).slice(0, 5000);
  }

  try {
    await db.collection("leads").doc(body.id).update(update);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[admin/leads] Failed to update lead:", err);
    return NextResponse.json({ error: "Failed to update lead." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const db = getAdminDb();
  if (!db) return notConfigured();

  let body: { id?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  if (!body.id) return NextResponse.json({ error: "Missing lead id." }, { status: 400 });

  try {
    await db.collection("leads").doc(body.id).delete();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[admin/leads] Failed to delete lead:", err);
    return NextResponse.json({ error: "Failed to delete lead." }, { status: 500 });
  }
}
