import { NextResponse } from "next/server";
import { Timestamp } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { LEAD_STATUSES } from "@/lib/leadStatus";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DAYS = 30;
const DAY_MS = 24 * 60 * 60 * 1000;

function toDate(v: unknown): Date | null {
  if (v instanceof Timestamp) return v.toDate();
  if (typeof v === "string") {
    const d = new Date(v);
    return isNaN(d.getTime()) ? null : d;
  }
  return null;
}

function dayKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** Last `DAYS` day-keys, oldest first, each pre-seeded with count 0. */
function emptySeries(now: Date): Map<string, number> {
  const series = new Map<string, number>();
  for (let i = DAYS - 1; i >= 0; i--) {
    series.set(dayKey(new Date(now.getTime() - i * DAY_MS)), 0);
  }
  return series;
}

function topCounts(counts: Map<string, number>, limit = 8) {
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }));
}

export async function GET() {
  const db = getAdminDb();
  if (!db) {
    return NextResponse.json({
      configured: false,
      error:
        "Firebase Admin is not configured. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY from a service-account key.",
    });
  }

  try {
    const now = new Date();
    const since = Timestamp.fromDate(new Date(now.getTime() - DAYS * DAY_MS));

    const [leadsSnap, eventsSnap] = await Promise.all([
      db.collection("leads").limit(2000).get(),
      db.collection("events").where("createdAt", ">=", since).limit(20000).get(),
    ]);

    // ---- leads ----
    const byStatus: Record<string, number> = Object.fromEntries(LEAD_STATUSES.map((s) => [s, 0]));
    const byIndustry = new Map<string, number>();
    const leadsByDay = emptySeries(now);
    let leads7 = 0;
    let leads30 = 0;

    for (const doc of leadsSnap.docs) {
      const data = doc.data();
      const status = typeof data.status === "string" ? data.status : "new";
      byStatus[status] = (byStatus[status] ?? 0) + 1;

      const industry = typeof data.industry === "string" && data.industry ? data.industry : "Not specified";
      byIndustry.set(industry, (byIndustry.get(industry) ?? 0) + 1);

      const created = toDate(data.createdAt);
      if (created) {
        const age = now.getTime() - created.getTime();
        if (age <= 7 * DAY_MS) leads7++;
        if (age <= DAYS * DAY_MS) leads30++;
        const key = dayKey(created);
        if (leadsByDay.has(key)) leadsByDay.set(key, (leadsByDay.get(key) ?? 0) + 1);
      }
    }

    const totalLeads = leadsSnap.size;
    const booked = (byStatus.booked ?? 0) + (byStatus.won ?? 0); // won implies a pilot happened

    // ---- traffic events (last 30 days) ----
    const viewsByDay = emptySeries(now);
    const sessions = new Set<string>();
    const referrers = new Map<string, number>();
    const devices = new Map<string, number>();
    const countries = new Map<string, number>();
    let pageviews = 0;
    let ctaClicks = 0;
    let formSubmits = 0;

    for (const doc of eventsSnap.docs) {
      const data = doc.data();
      const type = data.type;
      const created = toDate(data.createdAt);

      if (type === "pageview") {
        pageviews++;
        if (typeof data.sid === "string" && data.sid) sessions.add(data.sid);
        if (created) {
          const key = dayKey(created);
          if (viewsByDay.has(key)) viewsByDay.set(key, (viewsByDay.get(key) ?? 0) + 1);
        }
        const ref = typeof data.ref === "string" && data.ref ? data.ref : "Direct / none";
        let refName = ref;
        try {
          if (ref !== "Direct / none") refName = new URL(ref).hostname.replace(/^www\./, "");
        } catch {
          /* keep raw value */
        }
        referrers.set(refName, (referrers.get(refName) ?? 0) + 1);

        const device = typeof data.device === "string" && data.device ? data.device : "unknown";
        devices.set(device, (devices.get(device) ?? 0) + 1);

        const country = typeof data.country === "string" && data.country ? data.country : "Unknown";
        countries.set(country, (countries.get(country) ?? 0) + 1);
      } else if (type === "cta_click") {
        ctaClicks++;
      } else if (type === "lead_submitted") {
        formSubmits++;
      }
    }

    const visitors = sessions.size;

    return NextResponse.json({
      configured: true,
      totals: {
        totalLeads,
        leads7,
        leads30,
        booked,
        bookedRate: totalLeads ? Math.round((booked / totalLeads) * 100) : 0,
        pageviews30: pageviews,
        visitors30: visitors,
        ctaClicks30: ctaClicks,
        formSubmits30: formSubmits,
        visitorToLead: visitors ? Math.round((leads30 / visitors) * 1000) / 10 : 0,
      },
      byStatus,
      byIndustry: topCounts(byIndustry),
      referrers: topCounts(referrers),
      devices: topCounts(devices, 4),
      countries: topCounts(countries),
      leadsByDay: [...leadsByDay.entries()].map(([day, count]) => ({ day, count })),
      viewsByDay: [...viewsByDay.entries()].map(([day, count]) => ({ day, count })),
    });
  } catch (err) {
    console.error("[admin/stats] Failed to compute stats:", err);
    return NextResponse.json({ error: "Failed to load stats." }, { status: 500 });
  }
}
