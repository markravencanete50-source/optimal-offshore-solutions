"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LEAD_STATUSES, STATUS_LABELS, type LeadStatus } from "@/lib/leadStatus";
import { bands as READINESS_BANDS } from "@/lib/readiness";

type Lead = {
  id: string;
  firstName: string;
  email: string;
  company: string;
  phone: string;
  availability: string;
  contactMethod: string;
  industry: string;
  interest: string;
  budget: string;
  challenge: string;
  status: LeadStatus;
  notes: string;
  source: string;
  readinessScore: number | null;
  readinessBand: string;
  createdAt: string;
  updatedAt: string;
  bookedAt: string;
};

type DayPoint = { day: string; count: number };
type NameCount = { name: string; count: number; code?: string };

type Visitor = {
  when: string;
  country: string;
  countryCode: string;
  device: string;
  source: string;
  views: number;
  paths: string[];
};

type Stats = {
  configured: boolean;
  error?: string;
  totals?: {
    totalLeads: number;
    leads7: number;
    leads30: number;
    booked: number;
    bookedRate: number;
    pageviews30: number;
    visitors30: number;
    ctaClicks30: number;
    formSubmits30: number;
    botHits30?: number;
    visitorToLead: number;
  };
  byStatus?: Record<string, number>;
  byIndustry?: NameCount[];
  referrers?: NameCount[];
  devices?: NameCount[];
  countries?: NameCount[];
  recentVisitors?: Visitor[];
  leadsByDay?: DayPoint[];
  viewsByDay?: DayPoint[];
};

/* ── tiny stroke icon set ── */
function Icon({ d, size = 16 }: { d: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}
const IC = {
  overview: "M3 3h8v8H3zM13 3h8v5h-8zM13 12h8v9h-8zM3 15h8v6H3z",
  analytics: "M3 21h18M7 17V9M12 21V3M17 17v-6",
  leads: "M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87",
  site: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3",
  logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9",
  refresh: "M23 4v6h-6M1 20v-6h6M3.5 9a9 9 0 0 1 14.8-3.4L23 10M1 14l4.6 4.4A9 9 0 0 0 20.5 15",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  sun: "M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4",
  moon: "M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3",
  target: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  inbox: "M22 12h-6l-2 3h-4l-2-3H2M5.5 5.1L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.9A2 2 0 0 0 16.7 4H7.3a2 2 0 0 0-1.8 1.1z",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  trend: "M23 6l-9.5 9.5-5-5L1 18M17 6h6v6",
  x: "M18 6L6 18M6 6l12 12",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 7l-10 6L2 7",
  phone: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.6 2.6.7a2 2 0 0 1 1.7 2z",
  whatsapp: "M20.5 3.5A11 11 0 0 0 3.2 17L2 22l5.2-1.2A11 11 0 1 0 20.5 3.5zM8 8.5c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.5l.7 1.7c.1.2 0 .4-.1.5l-.5.6c-.1.2-.2.3-.1.5a5 5 0 0 0 2.6 2.6c.2.1.4 0 .5-.1l.6-.5c.1-.1.3-.2.5-.1l1.7.7c.5.2.5.4.5.6v.5c0 .2 0 .4-.5.6a3 3 0 0 1-3 .3 9 9 0 0 1-5-5 3 3 0 0 1 .1-3.2z",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 7v5l3 2",
  arrowUp: "M12 19V5M5 12l7-7 7 7",
  arrowDown: "M12 5v14M19 12l-7 7-7-7",
  check: "M20 6L9 17l-5-5",
  calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
};

/* ════════ charts ════════ */

const PALETTE = ["#E4B04A", "#60A5FA", "#34C98A", "#A78BFA", "#F07362", "#7BC0CE", "#D98CB3", "#9AA3B2"];

function fmtDay(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
}

/** Round a max up to a clean axis ceiling (1, 2, 5, 10, 20, 25, 50 …). */
function niceCeil(n: number): number {
  if (n <= 5) return Math.max(1, Math.ceil(n));
  const pow = Math.pow(10, Math.floor(Math.log10(n)));
  for (const m of [1, 2, 2.5, 5, 10]) if (n <= m * pow) return Math.ceil(m * pow);
  return 10 * pow;
}

/** Catmull-Rom smoothing, with control points clamped so the curve never
 *  overshoots past its endpoints (keeps spiky 0→1→0 data above the baseline). */
function smoothPath(pts: [number, number][]): string {
  if (!pts.length) return "";
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const lo = Math.min(p1[1], p2[1]);
    const hi = Math.max(p1[1], p2[1]);
    const clamp = (y: number) => Math.max(lo, Math.min(hi, y));
    d += ` C${p1[0] + (p2[0] - p0[0]) / 6},${clamp(p1[1] + (p2[1] - p0[1]) / 6)} ${
      p2[0] - (p3[0] - p1[0]) / 6
    },${clamp(p2[1] - (p3[1] - p1[1]) / 6)} ${p2[0]},${p2[1]}`;
  }
  return d;
}

/**
 * Dual-axis comparison line chart: page views (left axis, blue) vs leads
 * (right axis, gold), smooth curves with gradient area fills, gridlines and
 * a hover crosshair + tooltip.
 */
function TrendChart({ views, leads }: { views: DayPoint[]; leads: DayPoint[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const W = 760;
  const H = 210;
  const L = 34;
  const R = 30;
  const T = 14;
  const B = 24;
  const iw = W - L - R;
  const ih = H - T - B;
  const n = Math.max(views.length, leads.length);

  const maxV = niceCeil(Math.max(1, ...views.map((d) => d.count)));
  const maxL = niceCeil(Math.max(1, ...leads.map((d) => d.count)));

  const x = (i: number) => L + (n <= 1 ? iw / 2 : (i / (n - 1)) * iw);
  const yV = (c: number) => T + ih - (c / maxV) * ih;
  const yL = (c: number) => T + ih - (c / maxL) * ih;

  const vPts: [number, number][] = views.map((d, i) => [x(i), yV(d.count)]);
  const lPts: [number, number][] = leads.map((d, i) => [x(i), yL(d.count)]);
  const vLine = smoothPath(vPts);
  const lLine = smoothPath(lPts);
  const vArea = vLine ? `${vLine} L${x(n - 1)},${T + ih} L${x(0)},${T + ih} Z` : "";

  const gridYs = [0, 0.25, 0.5, 0.75, 1];

  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const fx = ((e.clientX - rect.left) / rect.width) * W;
    const idx = Math.round(((fx - L) / iw) * (n - 1));
    setHover(Math.max(0, Math.min(n - 1, idx)));
  };

  const hv = hover !== null ? views[hover] : null;
  const hl = hover !== null ? leads[hover] : null;

  return (
    <div className="adm-trend">
      <div className="adm-legend">
        <span className="key">
          <span className="dot" style={{ background: "var(--chart-2)" }} />
          Page views
        </span>
        <span className="key">
          <span className="dot" style={{ background: "var(--chart-1)" }} />
          Leads
        </span>
      </div>
      <div className="adm-trend-plot">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label="Page views vs leads per day, last 30 days"
          onMouseMove={onMove}
          onMouseLeave={() => setHover(null)}
        >
          <defs>
            <linearGradient id="tv-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-2)" stopOpacity="0.22" />
              <stop offset="100%" stopColor="var(--chart-2)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {gridYs.map((g) => {
            const gy = T + ih - g * ih;
            return (
              <g key={g}>
                <line x1={L} y1={gy} x2={W - R} y2={gy} stroke="var(--border)" strokeWidth="1" />
                <text x={L - 6} y={gy + 3} fontSize="9" fill="var(--text-3)" fontFamily="var(--mono)" textAnchor="end">
                  {Math.round(g * maxV)}
                </text>
                <text x={W - R + 6} y={gy + 3} fontSize="9" fill="var(--chart-1)" fontFamily="var(--mono)" opacity="0.85">
                  {Math.round(g * maxL)}
                </text>
              </g>
            );
          })}

          {vArea && <path d={vArea} fill="url(#tv-area)" />}
          {vLine && <path d={vLine} fill="none" stroke="var(--chart-2)" strokeWidth="2" strokeLinecap="round" />}
          {lLine && (
            <path d={lLine} fill="none" stroke="var(--chart-1)" strokeWidth="2" strokeLinecap="round" />
          )}
          {lPts.map(([px, py], i) => (leads[i]?.count ?? 0) > 0 && (
            <circle key={`l${i}`} cx={px} cy={py} r="2.6" fill="var(--chart-1)" />
          ))}

          {hover !== null && (
            <g>
              <line x1={x(hover)} y1={T} x2={x(hover)} y2={T + ih} stroke="var(--border-2)" strokeWidth="1" />
              {hv && <circle cx={x(hover)} cy={yV(hv.count)} r="4" fill="var(--chart-2)" stroke="var(--surface)" strokeWidth="1.5" />}
              {hl && <circle cx={x(hover)} cy={yL(hl.count)} r="4" fill="var(--chart-1)" stroke="var(--surface)" strokeWidth="1.5" />}
            </g>
          )}

          <text x={L} y={H - 6} fontSize="9.5" fill="var(--text-3)" fontFamily="var(--mono)">
            {views[0] ? fmtDay(views[0].day) : ""}
          </text>
          <text x={W - R} y={H - 6} fontSize="9.5" fill="var(--text-3)" fontFamily="var(--mono)" textAnchor="end">
            {views[n - 1] ? fmtDay(views[n - 1].day) : ""}
          </text>
        </svg>

        {hover !== null && (hv || hl) && (
          <div
            className="adm-tip"
            style={{ left: `${((x(hover) - 0) / W) * 100}%` }}
          >
            <div className="d">{fmtDay((hv ?? hl)!.day)}</div>
            <div className="r">
              <span className="dot" style={{ background: "var(--chart-2)" }} />
              {hv?.count ?? 0} views
            </div>
            <div className="r">
              <span className="dot" style={{ background: "var(--chart-1)" }} />
              {hl?.count ?? 0} {(hl?.count ?? 0) === 1 ? "lead" : "leads"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/** Donut with center total + legend. */
function Donut({ items, unit }: { items: NameCount[]; unit: string }) {
  const total = items.reduce((s, i) => s + i.count, 0);
  if (!total) return <div className="adm-empty">No data yet.</div>;
  const r = 44;
  const C = 2 * Math.PI * r;
  let acc = 0;
  return (
    <div className="adm-donut-wrap">
      <div className="adm-donut">
        <svg viewBox="0 0 120 120" role="img" aria-label={`${unit} breakdown`}>
          {items.map((it, i) => {
            const frac = it.count / total;
            const seg = Math.max(0, frac * C - (items.length > 1 ? 2.5 : 0));
            const off = -acc * C;
            acc += frac;
            return (
              <circle
                key={it.name}
                cx="60"
                cy="60"
                r={r}
                fill="none"
                stroke={PALETTE[i % PALETTE.length]}
                strokeWidth="13"
                strokeDasharray={`${seg} ${C}`}
                strokeDashoffset={off}
                transform="rotate(-90 60 60)"
                strokeLinecap="butt"
              >
                <title>{`${it.name}: ${it.count}`}</title>
              </circle>
            );
          })}
        </svg>
        <div className="center">
          <div className="t">{total}</div>
          <div className="u">{unit}</div>
        </div>
      </div>
      <div className="adm-donut-legend">
        {items.map((it, i) => (
          <div className="lr" key={it.name}>
            <span className="dot" style={{ background: PALETTE[i % PALETTE.length] }} />
            <span className="name">{it.name}</span>
            <span className="n">
              {it.count} <em>· {Math.round((it.count / total) * 100)}%</em>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Ranked bar list with share %, gradient fills and row hover. */
function BarList({ items, flags = false }: { items: NameCount[]; flags?: boolean }) {
  const total = items.reduce((s, i) => s + i.count, 0);
  const max = Math.max(1, ...items.map((i) => i.count));
  if (!items.length) return <div className="adm-empty">No data yet.</div>;
  return (
    <div className="adm-bl">
      {items.map((it, i) => (
        <div className="bl-row" key={it.name}>
          <div className="bl-head">
            <span className="rank">{i + 1}</span>
            <span className="name">
              {flags && <span className="flag">{flagEmoji(it.code ?? it.name)}</span>}
              {it.name}
            </span>
            <span className="n">
              {it.count} <em>· {total ? Math.round((it.count / total) * 100) : 0}%</em>
            </span>
          </div>
          <div className="bl-track">
            <span className="bl-fill" style={{ width: `${(it.count / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function flagEmoji(code: string): string {
  if (!/^[A-Za-z]{2}$/.test(code)) return "🌐";
  return String.fromCodePoint(
    ...[...code.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65),
  );
}

/** Single stacked split bar (device share). */
function SplitBar({ items }: { items: NameCount[] }) {
  const total = items.reduce((s, i) => s + i.count, 0);
  if (!total) return <div className="adm-empty">No data yet.</div>;
  return (
    <div className="adm-split">
      <div className="bar">
        {items.map((it, i) => (
          <span
            key={it.name}
            style={{ width: `${(it.count / total) * 100}%`, background: PALETTE[(i + 1) % PALETTE.length] }}
            title={`${it.name}: ${it.count}`}
          />
        ))}
      </div>
      <div className="keys">
        {items.map((it, i) => (
          <span className="key" key={it.name}>
            <span className="dot" style={{ background: PALETTE[(i + 1) % PALETTE.length] }} />
            {it.name} <em>{Math.round((it.count / total) * 100)}%</em>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── light/dark toggle — persists to localStorage, applied by the layout script ── */
function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const t = document.documentElement.getAttribute("data-adm-theme");
    if (t === "dark" || t === "light") setTheme(t);
  }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-adm-theme", next);
    try {
      localStorage.setItem("oos-adm-theme", next);
    } catch {
      /* private mode */
    }
  };
  return (
    <button
      className="adm-btn icon"
      onClick={toggle}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      aria-label="Toggle dark mode"
    >
      <Icon d={theme === "dark" ? IC.sun : IC.moon} />
    </button>
  );
}

function initials(name: string): string {
  return (
    name
      .split(/\s+/)
      .map((w) => w.replace(/[^\p{L}\p{N}]/gu, "")) // letters/digits only
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("") || "?"
  );
}

function fmtDate(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" }) +
    " · " +
    d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function exportCsv(leads: Lead[]) {
  const esc = (v: string) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const header = [
    "Date", "Name", "Email", "Phone", "Preferred contact", "Best time",
    "Company", "Industry", "Interest", "Budget", "Status",
    "Readiness score", "Readiness band", "Details", "Notes",
  ];
  const rows = leads.map((l) =>
    [
      l.createdAt, l.firstName, l.email, l.phone, l.contactMethod, l.availability,
      l.company, l.industry, l.interest, l.budget, l.status,
      l.readinessScore != null ? String(l.readinessScore) : "",
      l.readinessBand, l.challenge, l.notes,
    ]
      .map(esc)
      .join(","),
  );
  const blob = new Blob([[header.join(","), ...rows].join("\r\n")], {
    type: "text/csv;charset=utf-8",
  });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
}

/* ── time helpers (action queue, age badges, momentum deltas) ── */
const HOUR = 3_600_000;
const DAY = 86_400_000;

function tsOf(iso: string): number {
  const t = iso ? new Date(iso).getTime() : NaN;
  return isNaN(t) ? NaN : t;
}

/** Compact age from an elapsed millisecond span: "4m", "2h", "3d". */
function fmtAge(ms: number): string {
  if (!isFinite(ms) || ms < 0) return "";
  if (ms < HOUR) return `${Math.max(1, Math.floor(ms / 60000))}m`;
  if (ms < DAY) return `${Math.floor(ms / HOUR)}h`;
  return `${Math.floor(ms / DAY)}d`;
}

/** mailto: with a smart, URL-encoded first-touch or nudge template. */
function mailtoFor(l: Lead, kind: "intro" | "followup"): string {
  const name = l.firstName || "there";
  const co = l.company ? ` at ${l.company}` : "";
  const focus =
    l.interest && l.interest !== "Not specified"
      ? l.interest
      : l.challenge || "your goals";
  const [subject, body] =
    kind === "intro"
      ? [
          "Your pilot with Optimal Offshore Solutions",
          `Hi ${name},\n\nThanks for requesting a pilot with Optimal Offshore Solutions. I'd love to learn more about ${focus}${co} and show how our team can support you.\n\nAre you free for a short call this week? Reply with a time that suits and I'll send an invite.\n\n— Optimal Offshore Solutions`,
        ]
      : [
          "Following up on your Optimal Offshore pilot",
          `Hi ${name},\n\nJust circling back on your pilot with Optimal Offshore Solutions. I'd still love to set up a quick call to walk through how we'd help with ${focus}${co}.\n\nWould later this week work? Happy to fit around your schedule.\n\n— Optimal Offshore Solutions`,
        ];
  return `mailto:${l.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Small ▲/▼ chip comparing the last 7 days against the previous 7. */
function DeltaChip({ cur, prev, unit }: { cur: number; prev: number; unit: string }) {
  const diff = cur - prev;
  const title = `${cur} ${unit} in the last 7 days vs ${prev} the previous 7`;
  if (diff === 0)
    return (
      <span className="adm-delta flat" title={title}>
        = {cur} this wk
      </span>
    );
  const up = diff > 0;
  return (
    <span className={`adm-delta ${up ? "up" : "down"}`} title={title}>
      <Icon d={up ? IC.arrowUp : IC.arrowDown} size={11} />
      {Math.abs(diff)} vs last wk
    </span>
  );
}

/** Colour-coded age pill; `warn` turns it amber for overdue/cold leads. */
function AgeBadge({ ms, warn = false, title }: { ms: number; warn?: boolean; title?: string }) {
  const a = fmtAge(ms);
  if (!a) return null;
  return (
    <span className={`adm-age${warn ? " warn" : ""}`} title={title} aria-label={title}>
      {a}
    </span>
  );
}

const BAND_LABEL: Record<string, string> = Object.fromEntries(
  READINESS_BANDS.map((b) => [b.slug, b.label]),
);

/** Readiness score chip; gold ("hot") at 76+ — call those within the hour. */
function ScorePill({ score, band }: { score: number | null; band: string }) {
  if (score == null) return <span>—</span>;
  return (
    <span
      className={`adm-rdy${score >= 76 ? " hot" : ""}`}
      title={score >= 76 ? "Highly ready — call within the hour" : BAND_LABEL[band] ?? band}
    >
      <b>{score}</b>/100
      {band && <em>{BAND_LABEL[band] ?? band}</em>}
    </span>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [refreshedAt, setRefreshedAt] = useState<Date | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [bandFilter, setBandFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"newest" | "score">("newest");
  const [notesOpen, setNotesOpen] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState("");
  const [section, setSection] = useState("overview");
  const [segment, setSegment] = useState("all");
  const [selectedLead, setSelectedLead] = useState<string | null>(null);
  const [drawerNotes, setDrawerNotes] = useState("");
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const [statsRes, leadsRes] = await Promise.all([
        fetch("/api/admin/stats", { cache: "no-store" }),
        fetch("/api/admin/leads", { cache: "no-store" }),
      ]);
      if (statsRes.status === 401 || leadsRes.status === 401) {
        router.replace("/admin/login");
        return;
      }
      const statsJson: Stats = await statsRes.json();
      const leadsJson = await leadsRes.json();
      if (!statsRes.ok) throw new Error(statsJson.error || "Failed to load stats.");
      if (!leadsRes.ok) throw new Error(leadsJson.error || "Failed to load leads.");
      setStats(statsJson);
      setLeads(leadsJson.leads ?? []);
      setRefreshedAt(new Date());
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Failed to load the dashboard.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  /** Quietly re-pull the aggregate numbers (KPIs, funnel, charts) so the
   *  whole dashboard reflects lead edits/deletes — not just the table. */
  const refreshStats = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/stats", { cache: "no-store" });
      if (res.ok) {
        const json: Stats = await res.json();
        if (json.configured !== false) setStats(json);
      }
    } catch {
      /* keep showing the last good stats */
    }
  }, []);

  async function updateLead(id: string, patch: { status?: LeadStatus; notes?: string }) {
    const prev = leads;
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch } : l)));
    const res = await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...patch }),
    });
    if (!res.ok) {
      setLeads(prev); // roll back optimistic update
      alert("Update failed — please try again.");
    } else if (patch.status) {
      refreshStats(); // booked KPI, funnel and status counts shift with the pipeline
    }
  }

  async function deleteLead(id: string) {
    if (!confirm("Delete this lead permanently?")) return;
    const res = await fetch("/api/admin/leads", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setLeads((ls) => ls.filter((l) => l.id !== id));
      refreshStats(); // totals, funnel, industry donut and daily series all change
    } else {
      alert("Delete failed — please try again.");
    }
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.replace("/admin/login");
  }

  /* Prioritised worklist computed client-side: leads awaiting a first touch,
   * plus contacted/qualified leads that have gone quiet for 3+ days. */
  const queue = useMemo(() => {
    const now = Date.now();
    type QItem = { lead: Lead; ageMs: number; kind: "new" | "cold"; overdue: boolean };
    const items: QItem[] = [];
    for (const l of leads) {
      if (l.status === "new") {
        const c = tsOf(l.createdAt);
        const ageMs = isNaN(c) ? 0 : now - c;
        items.push({ lead: l, ageMs, kind: "new", overdue: ageMs > 24 * HOUR });
      } else if (l.status === "contacted" || l.status === "qualified") {
        const ref = !isNaN(tsOf(l.updatedAt)) ? tsOf(l.updatedAt) : tsOf(l.createdAt);
        const ageMs = isNaN(ref) ? 0 : now - ref;
        if (ageMs >= 3 * DAY) items.push({ lead: l, ageMs, kind: "cold", overdue: false });
      }
    }
    // uncontacted first (speed-to-lead), then cold; each oldest-first
    items.sort((a, b) => {
      if (a.kind !== b.kind) return a.kind === "new" ? -1 : 1;
      return b.ageMs - a.ageMs;
    });
    return items;
  }, [leads]);

  const attentionIds = useMemo(() => new Set(queue.map((q) => q.lead.id)), [queue]);
  const attentionCount = attentionIds.size;

  /* Week-over-week momentum + mean time-to-book, all from the leads array. */
  const deltas = useMemo(() => {
    const now = Date.now();
    const w = 7 * DAY;
    let leads0 = 0, leads1 = 0, booked0 = 0, booked1 = 0, bookSum = 0, bookN = 0;
    for (const l of leads) {
      const c = tsOf(l.createdAt);
      if (!isNaN(c)) {
        const age = now - c;
        if (age < w) leads0++;
        else if (age < 2 * w) leads1++;
      }
      const b = tsOf(l.bookedAt);
      if (!isNaN(b)) {
        const age = now - b;
        if (age < w) booked0++;
        else if (age < 2 * w) booked1++;
        if (!isNaN(c) && b >= c) { bookSum += b - c; bookN++; }
      }
    }
    return { leads0, leads1, booked0, booked1, avgBook: bookN ? bookSum / bookN : null, bookN };
  }, [leads]);

  const selected = useMemo(
    () => (selectedLead ? leads.find((l) => l.id === selectedLead) ?? null : null),
    [selectedLead, leads],
  );

  const openLead = (id: string) => {
    restoreFocusRef.current = (document.activeElement as HTMLElement) ?? null;
    const l = leads.find((x) => x.id === id);
    setDrawerNotes(l?.notes ?? "");
    setSelectedLead(id);
  };
  const closeLead = () => setSelectedLead(null);

  const gotoAttention = () => {
    setSegment("attention");
    setStatusFilter("all");
    setSection("leads");
  };

  /* Drawer as a dialog: focus the close button, Esc closes, restore focus. */
  useEffect(() => {
    if (!selectedLead) return;
    const restore = restoreFocusRef.current;
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedLead(null);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      restore?.focus?.();
    };
  }, [selectedLead]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = leads.filter((l) => {
      if (segment === "attention" && !attentionIds.has(l.id)) return false;
      if (segment === "new" && l.status !== "new") return false;
      if (segment === "booked" && l.status !== "booked") return false;
      if (segment === "won" && l.status !== "won") return false;
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (bandFilter !== "all" && l.readinessBand !== bandFilter) return false;
      if (!q) return true;
      return [l.firstName, l.email, l.company, l.industry, l.challenge, l.notes]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
    // Leads without a score sink to the bottom when sorting by score.
    if (sortBy === "score") {
      list.sort((a, b) => (b.readinessScore ?? -1) - (a.readinessScore ?? -1));
    }
    return list;
  }, [leads, query, statusFilter, segment, attentionIds, bandFilter, sortBy]);

  const t = stats?.totals;
  const configured = stats?.configured !== false;

  const navItems = [
    { id: "overview", label: "Overview", icon: IC.overview },
    { id: "analytics", label: "Analytics", icon: IC.analytics },
    { id: "leads", label: "Leads", icon: IC.leads },
  ];

  return (
    <div className="adm-shell">
      {/* ── sidebar ── */}
      <aside className="adm-side">
        <div className="adm-side-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.png" alt="" />
          Optimal Offshore
          <span className="tag">Admin</span>
        </div>
        <nav aria-label="Dashboard sections">
          <span className="adm-side-label">Workspace</span>
          {navItems.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`adm-nav-item${section === n.id ? " active" : ""}`}
              onClick={() => setSection(n.id)}
            >
              <Icon d={n.icon} />
              <span>{n.label}</span>
              {n.id === "leads" && attentionCount > 0 && (
                <span className="count attention" title={`${attentionCount} need attention`}>
                  {attentionCount}
                </span>
              )}
            </a>
          ))}
        </nav>
        <div className="adm-side-foot">
          <a className="adm-nav-item" href="/" target="_blank" rel="noreferrer">
            <Icon d={IC.site} />
            <span>View site</span>
          </a>
          <button className="adm-nav-item" onClick={logout}>
            <Icon d={IC.logout} />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* ── main ── */}
      <div className="adm-main">
        <header className="adm-top">
          <div>
            <h1>Dashboard</h1>
            <p className="crumb">Lead pipeline &amp; site performance</p>
          </div>
          <div className="adm-top-actions">
            {refreshedAt && (
              <span className="adm-refreshed" suppressHydrationWarning>
                Updated {refreshedAt.toLocaleTimeString()}
              </span>
            )}
            <button className="adm-btn" onClick={load} disabled={loading} title="Refresh data">
              <Icon d={IC.refresh} size={14} />
              {loading ? "Loading…" : "Refresh"}
            </button>
            <button
              className="adm-btn"
              onClick={() => exportCsv(filtered)}
              disabled={!leads.length}
              title="Export the filtered leads as CSV"
            >
              <Icon d={IC.download} size={14} />
              Export
            </button>
            <ThemeToggle />
            <span className="adm-avatar" title="Optimal Offshore Solutions">
              OS
            </span>
          </div>
        </header>

        {loading && !stats && <div className="adm-loading">Loading dashboard…</div>}
        {loadError && <div className="adm-notice">⚠ {loadError}</div>}

        {stats && !configured && (
          <div className="adm-notice">
            <strong>One step left — connect Firebase Admin.</strong> The dashboard reads leads and
            traffic with the Firebase Admin SDK, which needs a service-account key:
            <ol>
              <li>
                Firebase console → Project settings → <em>Service accounts</em> →{" "}
                <strong>Generate new private key</strong>.
              </li>
              <li>
                From the downloaded JSON, set <code>FIREBASE_PROJECT_ID</code>,{" "}
                <code>FIREBASE_CLIENT_EMAIL</code> and <code>FIREBASE_PRIVATE_KEY</code> in{" "}
                <code>.env.local</code> (and in Vercel → Settings → Environment Variables).
              </li>
              <li>Redeploy / restart, then refresh this page.</li>
            </ol>
          </div>
        )}

        {stats && configured && t && (
          <>
            {/* ── overview ── */}
            <section id="overview" className="adm-section">
              <p className="adm-h">
                Needs attention{" "}
                <span className="hint">{attentionCount ? `${attentionCount} waiting` : "All clear"}</span>
              </p>
              <div className="adm-panel adm-queue">
                {queue.length === 0 ? (
                  <div className="adm-queue-clear">
                    <span className="ic">
                      <Icon d={IC.check} size={18} />
                    </span>
                    You&apos;re all caught up — no leads waiting on a first touch.
                  </div>
                ) : (
                  <>
                    <ul className="adm-queue-list">
                      {queue.slice(0, 8).map(({ lead: l, ageMs, kind, overdue }) => (
                        <li key={l.id}>
                          <div
                            className="adm-q-row"
                            role="button"
                            tabIndex={0}
                            aria-label={`Open ${l.firstName}`}
                            onClick={() => openLead(l.id)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                openLead(l.id);
                              }
                            }}
                          >
                            <span className="chip">{initials(l.firstName)}</span>
                            <div className="adm-q-main">
                              <div className="nm">
                                {l.firstName}
                                {l.company && <span className="co"> · {l.company}</span>}
                              </div>
                              <div className="adm-q-sub">
                                {l.interest && l.interest !== "Not specified"
                                  ? l.interest
                                  : l.challenge
                                  ? l.challenge.slice(0, 70) + (l.challenge.length > 70 ? "…" : "")
                                  : "No details provided"}
                              </div>
                            </div>
                            <span
                              className={`adm-age${overdue || kind === "cold" ? " warn" : ""}`}
                              title={
                                kind === "new"
                                  ? overdue
                                    ? "Overdue — over 24h without first contact"
                                    : "Awaiting first contact"
                                  : "Going cold — no activity in 3+ days"
                              }
                            >
                              {overdue && <Icon d={IC.clock} size={11} />}
                              {fmtAge(ageMs)}
                            </span>
                            <div className="adm-q-actions" onClick={(e) => e.stopPropagation()}>
                              <a
                                className="adm-q-act"
                                href={mailtoFor(l, kind === "new" ? "intro" : "followup")}
                                title={`Email ${l.firstName}`}
                                aria-label={`Email ${l.firstName}`}
                              >
                                <Icon d={IC.mail} size={14} />
                              </a>
                              {l.phone && (
                                <a
                                  className="adm-q-act"
                                  href={`tel:${l.phone}`}
                                  title={`Call ${l.firstName}`}
                                  aria-label={`Call ${l.firstName}`}
                                >
                                  <Icon d={IC.phone} size={14} />
                                </a>
                              )}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    {queue.length > 8 && (
                      <button className="adm-q-more" onClick={gotoAttention}>
                        +{queue.length - 8} more need follow-up →
                      </button>
                    )}
                  </>
                )}
              </div>

              <p className="adm-h">
                Key numbers <span className="hint">Live from Firestore</span>
              </p>
              <div className="adm-kpis">
                <div className="adm-kpi hero">
                  <div className="head">
                    <span className="ic">
                      <Icon d={IC.target} size={15} />
                    </span>
                    Pilot calls booked
                  </div>
                  <div className="value">{t.booked}</div>
                  <div className="sub">{t.bookedRate}% of all leads</div>
                  <DeltaChip cur={deltas.booked0} prev={deltas.booked1} unit="booked" />
                </div>
                <div className="adm-kpi">
                  <div className="head">
                    <span className="ic">
                      <Icon d={IC.inbox} size={15} />
                    </span>
                    Total leads
                  </div>
                  <div className="value">{t.totalLeads}</div>
                  <div className="sub">
                    {t.leads7} this week · {t.leads30} last 30 days
                  </div>
                  <DeltaChip cur={deltas.leads0} prev={deltas.leads1} unit="leads" />
                </div>
                <div className="adm-kpi">
                  <div className="head">
                    <span className="ic">
                      <Icon d={IC.eye} size={15} />
                    </span>
                    Visitors — 30 days
                  </div>
                  <div className="value">{t.visitors30}</div>
                  <div className="sub">
                    {t.pageviews30} page views
                    {t.botHits30 ? ` · ${t.botHits30} bot hits excluded` : ""}
                  </div>
                </div>
                <div className="adm-kpi">
                  <div className="head">
                    <span className="ic">
                      <Icon d={IC.trend} size={15} />
                    </span>
                    Visitor → lead
                  </div>
                  <div className="value">{t.visitorToLead}%</div>
                  <div className="sub">{t.ctaClicks30} CTA clicks in 30 days</div>
                </div>
                <div className="adm-kpi">
                  <div className="head">
                    <span className="ic">
                      <Icon d={IC.clock} size={15} />
                    </span>
                    Avg. time to book
                  </div>
                  <div className="value">
                    {deltas.avgBook != null ? (deltas.avgBook / DAY).toFixed(1) : "—"}
                    {deltas.avgBook != null && <span className="unit">days</span>}
                  </div>
                  <div className="sub">
                    {deltas.bookN
                      ? `across ${deltas.bookN} booked ${deltas.bookN === 1 ? "lead" : "leads"}`
                      : "no bookings yet"}
                  </div>
                </div>
              </div>

              <p className="adm-h">
                Conversion funnel <span className="hint">Last 30 days</span>
              </p>
              <div className="adm-funnel">
                {(
                  [
                    ["Visitors", t.visitors30, null],
                    ["CTA clicks", t.ctaClicks30, t.visitors30],
                    ["Leads submitted", t.leads30, t.visitors30],
                    ["Pilot calls booked", t.booked, t.totalLeads],
                  ] as [string, number, number | null][]
                ).map(([label, value, base]) => (
                  <div className="adm-step" key={label}>
                    <div className="value">{value}</div>
                    <div className="label">{label}</div>
                    <div className="pct">
                      {base ? `${Math.round((value / Math.max(1, base)) * 100)}%` : " "}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── analytics ── */}
            <section id="analytics" className="adm-section">
              <p className="adm-h">
                Analytics <span className="hint">Last 30 days</span>
              </p>
              <div className="adm-panel">
                <h4>Traffic vs leads</h4>
                <TrendChart views={stats.viewsByDay ?? []} leads={stats.leadsByDay ?? []} />
              </div>

              <div className="adm-grid3" style={{ marginTop: 14 }}>
                <div className="adm-panel">
                  <h4>Leads by industry</h4>
                  <Donut items={stats.byIndustry ?? []} unit="leads" />
                </div>
                <div className="adm-panel">
                  <h4>Traffic sources</h4>
                  <p className="adm-minicap" style={{ marginBottom: 10 }}>
                    Where visitors came from — search, social, or straight to the site
                  </p>
                  <BarList items={stats.referrers ?? []} />
                </div>
                <div className="adm-panel">
                  <h4>Audience</h4>
                  <p className="adm-minicap">Country (bots &amp; dev visits excluded)</p>
                  <BarList items={stats.countries ?? []} flags />
                  <p className="adm-minicap" style={{ marginTop: 16 }}>
                    Device
                  </p>
                  <SplitBar items={stats.devices ?? []} />
                </div>
              </div>

              <div className="adm-panel" style={{ marginTop: 14 }}>
                <h4>Recent visitors</h4>
                <p className="adm-minicap" style={{ marginBottom: 10 }}>
                  Every recent session — one row per person. Analytics are cookie-free, so
                  visitors stay anonymous until they submit the pilot form (then they appear in
                  Leads with a name).
                </p>
                {(stats.recentVisitors?.length ?? 0) === 0 ? (
                  <div className="adm-empty">No visits recorded yet.</div>
                ) : (
                  <div className="adm-tablewrap">
                    <table className="adm-table">
                      <thead>
                        <tr>
                          <th>Last seen</th>
                          <th>Location</th>
                          <th>Device</th>
                          <th>Came from</th>
                          <th>Pages viewed</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(stats.recentVisitors ?? []).map((v, i) => (
                          <tr key={`${v.when}-${i}`}>
                            <td style={{ whiteSpace: "nowrap" }}>{fmtDate(v.when)}</td>
                            <td style={{ whiteSpace: "nowrap" }}>
                              {flagEmoji(v.countryCode || v.country)} {v.country}
                            </td>
                            <td style={{ textTransform: "capitalize" }}>{v.device}</td>
                            <td>{v.source}</td>
                            <td>
                              {v.views} view{v.views === 1 ? "" : "s"}
                              <span className="adm-paths"> · {v.paths.join(" · ")}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>

            {/* ── leads ── */}
            <section id="leads" className="adm-section">
              <p className="adm-h">
                Leads <span className="hint">{filtered.length} shown</span>
              </p>
              <div className="adm-chips">
                {(
                  [
                    ["all", "All"],
                    ["attention", "Needs follow-up"],
                    ["new", "New"],
                    ["booked", "Booked"],
                    ["won", "Won"],
                  ] as [string, string][]
                ).map(([id, label]) => (
                  <button
                    key={id}
                    className={`adm-chip${segment === id ? " active" : ""}`}
                    onClick={() => setSegment(id)}
                    aria-pressed={segment === id}
                  >
                    {label}
                    {id === "attention" && attentionCount > 0 && (
                      <span className="c">{attentionCount}</span>
                    )}
                  </button>
                ))}
              </div>
              <div className="adm-toolbar">
                <div className="searchbox">
                  <Icon d={IC.search} size={14} />
                  <input
                    type="search"
                    placeholder="Search name, email, company, notes…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="all">All statuses</option>
                  {LEAD_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {STATUS_LABELS[s]} ({stats.byStatus?.[s] ?? 0})
                    </option>
                  ))}
                </select>
                <select
                  value={bandFilter}
                  onChange={(e) => setBandFilter(e.target.value)}
                  aria-label="Filter by readiness band"
                >
                  <option value="all">All readiness bands</option>
                  {READINESS_BANDS.map((b) => (
                    <option key={b.slug} value={b.slug}>
                      {b.label} ({b.min}–{b.max})
                    </option>
                  ))}
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "newest" | "score")}
                  aria-label="Sort leads"
                >
                  <option value="newest">Newest first</option>
                  <option value="score">Score, high → low</option>
                </select>
              </div>

              <div className="adm-table-wrap">
                {filtered.length === 0 ? (
                  <div className="adm-empty">
                    {leads.length === 0
                      ? "No leads yet — they'll appear here the moment someone submits the pilot form."
                      : "No leads match your search."}
                  </div>
                ) : (
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>Received</th>
                        <th>Contact</th>
                        <th>Company</th>
                        <th>Interest</th>
                        <th>Score</th>
                        <th>Budget</th>
                        <th>Status</th>
                        <th>Notes</th>
                        <th aria-label="Delete" />
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((l) => {
                        const ageRef = !isNaN(tsOf(l.updatedAt))
                          ? tsOf(l.updatedAt)
                          : tsOf(l.createdAt);
                        const ageMs = isNaN(ageRef) ? NaN : Date.now() - ageRef;
                        return (
                        <tr
                          key={l.id}
                          className="adm-row-click"
                          onClick={() => openLead(l.id)}
                        >
                          <td className="when">
                            <span className="d">{fmtDate(l.createdAt)}</span>
                            <AgeBadge
                              ms={ageMs}
                              warn={attentionIds.has(l.id)}
                              title={`Last activity ${fmtAge(ageMs)} ago`}
                            />
                          </td>
                          <td className="who">
                            <div className="adm-lead-id">
                              <span className="chip">{initials(l.firstName)}</span>
                              <div>
                                <div className="nm">{l.firstName}</div>
                                <a href={`mailto:${l.email}`} onClick={(e) => e.stopPropagation()}>
                                  {l.email}
                                </a>
                                {l.phone && (
                                  <a href={`tel:${l.phone}`} onClick={(e) => e.stopPropagation()}>
                                    {l.phone}
                                  </a>
                                )}
                                {(l.contactMethod || l.availability) && (
                                  <span className="meta">
                                    {[l.contactMethod, l.availability].filter(Boolean).join(" · ")}
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="co">
                            {l.company}
                            {l.industry && l.industry !== "Not specified" && (
                              <span className="sub">{l.industry}</span>
                            )}
                          </td>
                          <td className="challenge">
                            {l.interest && l.interest !== "Not specified" && (
                              <span className="tagline">{l.interest}</span>
                            )}
                            {l.challenge && <span className="detail">{l.challenge}</span>}
                            {(!l.interest || l.interest === "Not specified") && !l.challenge && "—"}
                          </td>
                          <td className="rdy-col">
                            <ScorePill score={l.readinessScore} band={l.readinessBand} />
                          </td>
                          <td className="budget">
                            {l.budget && l.budget !== "Not specified" ? l.budget : "—"}
                          </td>
                          <td onClick={(e) => e.stopPropagation()}>
                            <select
                              className={`status s-${l.status}`}
                              value={l.status}
                              onChange={(e) =>
                                updateLead(l.id, { status: e.target.value as LeadStatus })
                              }
                            >
                              {LEAD_STATUSES.map((s) => (
                                <option key={s} value={s}>
                                  {STATUS_LABELS[s]}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td style={{ minWidth: 180 }} onClick={(e) => e.stopPropagation()}>
                            {notesOpen === l.id ? (
                              <div className="adm-notes">
                                <textarea
                                  value={notesDraft}
                                  onChange={(e) => setNotesDraft(e.target.value)}
                                  autoFocus
                                />
                                <div className="row">
                                  <button className="adm-btn" onClick={() => setNotesOpen(null)}>
                                    Cancel
                                  </button>
                                  <button
                                    className="adm-btn gold"
                                    onClick={() => {
                                      updateLead(l.id, { notes: notesDraft });
                                      setNotesOpen(null);
                                    }}
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button
                                className="adm-note-btn"
                                onClick={() => {
                                  setNotesOpen(l.id);
                                  setNotesDraft(l.notes);
                                }}
                              >
                                {l.notes
                                  ? l.notes.slice(0, 80) + (l.notes.length > 80 ? "…" : "")
                                  : "+ Add note"}
                              </button>
                            )}
                          </td>
                          <td onClick={(e) => e.stopPropagation()}>
                            <button
                              className="adm-del"
                              aria-label="Delete lead"
                              title="Delete lead"
                              onClick={() => deleteLead(l.id)}
                            >
                              <Icon d={IC.x} size={15} />
                            </button>
                          </td>
                        </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </section>
          </>
        )}
      </div>

      {/* ── lead detail drawer ── */}
      {selected && (
        <>
          <div className="adm-scrim" onClick={closeLead} />
          <aside
            className="adm-drawer"
            role="dialog"
            aria-modal="true"
            aria-label={`Lead detail — ${selected.firstName}`}
          >
            <div className="adm-drawer-head">
              <span className="chip">{initials(selected.firstName)}</span>
              <div className="who">
                <div className="nm">{selected.firstName}</div>
                <div className="co">
                  {[
                    selected.company,
                    selected.industry && selected.industry !== "Not specified"
                      ? selected.industry
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" · ") || "—"}
                </div>
              </div>
              <span className={`adm-pill s-${selected.status}`}>
                {STATUS_LABELS[selected.status]}
              </span>
              <button
                ref={closeBtnRef}
                className="adm-drawer-close"
                onClick={closeLead}
                aria-label="Close panel"
              >
                <Icon d={IC.x} size={18} />
              </button>
            </div>

            <div className="adm-drawer-body">
              <div className="adm-dr-actions">
                <a className="adm-dr-act" href={mailtoFor(selected, "intro")}>
                  <Icon d={IC.mail} size={15} />
                  Intro
                </a>
                <a className="adm-dr-act" href={mailtoFor(selected, "followup")}>
                  <Icon d={IC.mail} size={15} />
                  Follow-up
                </a>
                {selected.phone && (
                  <a className="adm-dr-act" href={`tel:${selected.phone}`}>
                    <Icon d={IC.phone} size={15} />
                    Call
                  </a>
                )}
                {selected.phone && (
                  <a
                    className="adm-dr-act"
                    href={`https://wa.me/${selected.phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon d={IC.whatsapp} size={15} />
                    WhatsApp
                  </a>
                )}
                {selected.status !== "booked" &&
                  selected.status !== "won" &&
                  selected.status !== "lost" && (
                    <button
                      className="adm-dr-act gold"
                      onClick={() => updateLead(selected.id, { status: "booked" })}
                    >
                      <Icon d={IC.calendar} size={15} />
                      Mark booked
                    </button>
                  )}
              </div>

              <div className="adm-dr-section">
                <h5>Timeline</h5>
                <div className="adm-dr-timeline">
                  <div>
                    <span>Received</span>
                    <b>{fmtDate(selected.createdAt)}</b>
                  </div>
                  <div>
                    <span>Last activity</span>
                    <b>{selected.updatedAt ? fmtDate(selected.updatedAt) : "—"}</b>
                  </div>
                  <div>
                    <span>Pilot booked</span>
                    <b>{selected.bookedAt ? fmtDate(selected.bookedAt) : "—"}</b>
                  </div>
                </div>
              </div>

              <div className="adm-dr-section">
                <h5>Details</h5>
                <div className="adm-dr-grid">
                  <div className="adm-dr-field">
                    <span>Email</span>
                    <a href={`mailto:${selected.email}`}>{selected.email || "—"}</a>
                  </div>
                  <div className="adm-dr-field">
                    <span>Phone</span>
                    {selected.phone ? (
                      <a href={`tel:${selected.phone}`}>{selected.phone}</a>
                    ) : (
                      <b>—</b>
                    )}
                  </div>
                  <div className="adm-dr-field">
                    <span>Preferred contact</span>
                    <b>{selected.contactMethod || "—"}</b>
                  </div>
                  <div className="adm-dr-field">
                    <span>Best time</span>
                    <b>{selected.availability || "—"}</b>
                  </div>
                  <div className="adm-dr-field">
                    <span>Source</span>
                    <b>{selected.source || "—"}</b>
                  </div>
                  <div className="adm-dr-field">
                    <span>Readiness</span>
                    <b>
                      <ScorePill score={selected.readinessScore} band={selected.readinessBand} />
                    </b>
                  </div>
                  <div className="adm-dr-field">
                    <span>Budget</span>
                    <b>
                      {selected.budget && selected.budget !== "Not specified"
                        ? selected.budget
                        : "—"}
                    </b>
                  </div>
                  <div className="adm-dr-field wide">
                    <span>Interest</span>
                    <b>
                      {selected.interest && selected.interest !== "Not specified"
                        ? selected.interest
                        : "—"}
                    </b>
                  </div>
                  <div className="adm-dr-field wide">
                    <span>Challenge</span>
                    <p>{selected.challenge || "—"}</p>
                  </div>
                </div>
              </div>

              <div className="adm-dr-section">
                <h5>Status</h5>
                <select
                  className={`status s-${selected.status}`}
                  value={selected.status}
                  onChange={(e) =>
                    updateLead(selected.id, { status: e.target.value as LeadStatus })
                  }
                >
                  {LEAD_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {STATUS_LABELS[s]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="adm-dr-section">
                <h5>Notes</h5>
                <textarea
                  className="adm-dr-notes"
                  value={drawerNotes}
                  onChange={(e) => setDrawerNotes(e.target.value)}
                  placeholder="Add a note about this lead…"
                />
                <div className="adm-dr-notes-row">
                  <button
                    className="adm-btn gold"
                    onClick={() => updateLead(selected.id, { notes: drawerNotes })}
                  >
                    Save note
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}
