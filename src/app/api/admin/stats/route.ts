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

// ── traffic-source classification ─────────────────────────────────────
const OWN_HOSTS = new Set(["optimaloffshoresolutions.com", "www.optimaloffshoresolutions.com"]);
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1"]);

/** Friendly names for referrer hostnames the owner will recognize. */
const SOURCE_NAMES: [RegExp, string][] = [
  [/(^|\.)google\./i, "Google search"],
  [/(^|\.)bing\.com$/i, "Bing search"],
  [/duckduckgo\.com$/i, "DuckDuckGo"],
  [/search\.yahoo\.com$/i, "Yahoo search"],
  [/(^|\.)linkedin\.com$|lnkd\.in$/i, "LinkedIn"],
  [/(^|\.)facebook\.com$|fb\.me$|(^|\.)messenger\.com$/i, "Facebook"],
  [/(^|\.)instagram\.com$/i, "Instagram"],
  [/(^|\.)twitter\.com$|(^|\.)x\.com$|t\.co$/i, "X (Twitter)"],
  [/(^|\.)youtube\.com$|youtu\.be$/i, "YouTube"],
  [/(^|\.)tiktok\.com$/i, "TikTok"],
  [/(^|\.)reddit\.com$/i, "Reddit"],
  [/web\.whatsapp\.com$/i, "WhatsApp"],
  [/(^|\.)vercel\.app$/i, "Vercel preview"],
];

/**
 * Classify a raw document.referrer into a human source.
 * Returns null when the "visit" shouldn't count as an external source at all
 * (own-site internal navigation, or a leftover localhost/dev event).
 */
function classifySource(ref: unknown): string | null {
  const raw = typeof ref === "string" ? ref.trim() : "";
  if (!raw) return "Direct visit (typed URL, bookmark or chat app)";
  try {
    const host = new URL(raw).hostname.replace(/^www\./, "");
    if (LOCAL_HOSTS.has(host)) return null; // dev-server junk — drop
    if (OWN_HOSTS.has(host) || OWN_HOSTS.has(`www.${host}`)) return "__internal__";
    for (const [re, name] of SOURCE_NAMES) if (re.test(host)) return name;
    return host;
  } catch {
    return "Direct visit (typed URL, bookmark or chat app)";
  }
}

/** True when the event was recorded from a local dev server (historical junk). */
function isLocalDevEvent(ref: unknown): boolean {
  const raw = typeof ref === "string" ? ref.trim() : "";
  if (!raw) return false;
  try {
    return LOCAL_HOSTS.has(new URL(raw).hostname);
  } catch {
    return false;
  }
}

const countryNames = new Intl.DisplayNames(["en"], { type: "region" });
function countryLabel(code: string): { name: string; code: string } {
  if (!/^[A-Za-z]{2}$/.test(code)) return { name: "Unknown location", code: "" };
  try {
    return { name: countryNames.of(code.toUpperCase()) ?? code.toUpperCase(), code: code.toUpperCase() };
  } catch {
    return { name: code.toUpperCase(), code: code.toUpperCase() };
  }
}

interface SessionInfo {
  firstSeen: Date;
  lastSeen: Date;
  views: number;
  paths: string[];
  country: string;
  countryCode: string;
  device: string;
  source: string;
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
    // People-only metrics: bot hits are counted separately, and events recorded
    // from local dev servers (localhost referrers) are dropped entirely.
    const viewsByDay = emptySeries(now);
    const sessions = new Map<string, SessionInfo>();
    const referrers = new Map<string, number>();
    const devices = new Map<string, number>();
    const countries = new Map<string, { name: string; code: string; count: number }>();
    let pageviews = 0;
    let ctaClicks = 0;
    let formSubmits = 0;
    let botHits = 0;

    for (const doc of eventsSnap.docs) {
      const data = doc.data();
      const type = data.type;
      const created = toDate(data.createdAt);

      if (type === "pageview") {
        if (isLocalDevEvent(data.ref)) continue; // historical dev junk
        const device = typeof data.device === "string" && data.device ? data.device : "unknown";
        if (device === "bot") {
          botHits++;
          continue; // crawlers are not people — keep them out of every audience number
        }

        pageviews++;
        if (created) {
          const key = dayKey(created);
          if (viewsByDay.has(key)) viewsByDay.set(key, (viewsByDay.get(key) ?? 0) + 1);
        }

        const source = classifySource(data.ref);
        if (source && source !== "__internal__") {
          referrers.set(source, (referrers.get(source) ?? 0) + 1);
        }

        devices.set(device, (devices.get(device) ?? 0) + 1);

        const { name: cName, code: cCode } = countryLabel(String(data.country ?? ""));
        const cEntry = countries.get(cName) ?? { name: cName, code: cCode, count: 0 };
        cEntry.count++;
        countries.set(cName, cEntry);

        // Per-session detail for the "Recent visitors" panel.
        const sid = typeof data.sid === "string" && data.sid ? data.sid : "";
        if (sid && created) {
          const path = String(data.path ?? "/").slice(0, 120);
          const existing = sessions.get(sid);
          if (existing) {
            existing.views++;
            if (created < existing.firstSeen) existing.firstSeen = created;
            if (created > existing.lastSeen) existing.lastSeen = created;
            if (!existing.paths.includes(path) && existing.paths.length < 6) existing.paths.push(path);
            if (existing.source === "" && source && source !== "__internal__") existing.source = source;
          } else {
            sessions.set(sid, {
              firstSeen: created,
              lastSeen: created,
              views: 1,
              paths: [path],
              country: cName,
              countryCode: cCode,
              device,
              source: source && source !== "__internal__" ? source : "",
            });
          }
        }
      } else if (type === "cta_click") {
        ctaClicks++;
      } else if (type === "lead_submitted") {
        formSubmits++;
      }
    }

    const visitors = sessions.size;
    const recentVisitors = [...sessions.values()]
      .sort((a, b) => b.lastSeen.getTime() - a.lastSeen.getTime())
      .slice(0, 15)
      .map((s) => ({
        when: s.lastSeen.toISOString(),
        country: s.country,
        countryCode: s.countryCode,
        device: s.device,
        source: s.source || "Direct visit (typed URL, bookmark or chat app)",
        views: s.views,
        paths: s.paths,
      }));

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
        botHits30: botHits,
        visitorToLead: visitors ? Math.round((leads30 / visitors) * 1000) / 10 : 0,
      },
      byStatus,
      byIndustry: topCounts(byIndustry),
      referrers: topCounts(referrers),
      devices: topCounts(devices, 4),
      countries: [...countries.values()]
        .sort((a, b) => b.count - a.count)
        .slice(0, 8)
        .map(({ name, code, count }) => ({ name, code, count })),
      recentVisitors,
      leadsByDay: [...leadsByDay.entries()].map(([day, count]) => ({ day, count })),
      viewsByDay: [...viewsByDay.entries()].map(([day, count]) => ({ day, count })),
    });
  } catch (err) {
    console.error("[admin/stats] Failed to compute stats:", err);
    return NextResponse.json({ error: "Failed to load stats." }, { status: 500 });
  }
}
