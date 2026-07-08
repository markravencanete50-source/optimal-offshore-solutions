"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LEAD_STATUSES, STATUS_LABELS, type LeadStatus } from "@/lib/leadStatus";

type Lead = {
  id: string;
  firstName: string;
  email: string;
  company: string;
  industry: string;
  challenge: string;
  status: LeadStatus;
  notes: string;
  source: string;
  createdAt: string;
  bookedAt: string;
};

type DayPoint = { day: string; count: number };
type NameCount = { name: string; count: number };

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
    visitorToLead: number;
  };
  byStatus?: Record<string, number>;
  byIndustry?: NameCount[];
  referrers?: NameCount[];
  devices?: NameCount[];
  countries?: NameCount[];
  leadsByDay?: DayPoint[];
  viewsByDay?: DayPoint[];
};

/* ── tiny inline SVG bar chart ── */
function BarChart({ data, color = "var(--blue)" }: { data: DayPoint[]; color?: string }) {
  const W = 600;
  const H = 150;
  const PAD = 4;
  const max = Math.max(1, ...data.map((d) => d.count));
  const bw = (W - PAD * 2) / data.length;
  return (
    <div className="adm-chart">
      <svg viewBox={`0 0 ${W} ${H + 22}`} role="img" aria-label="Daily counts, last 30 days">
        {data.map((d, i) => {
          const h = Math.max(d.count > 0 ? 3 : 1, (d.count / max) * H);
          return (
            <g key={d.day}>
              <rect
                x={PAD + i * bw + 1}
                y={H - h}
                width={Math.max(1, bw - 2)}
                height={h}
                rx={2}
                fill={d.count > 0 ? color : "var(--line)"}
              >
                <title>{`${d.day}: ${d.count}`}</title>
              </rect>
            </g>
          );
        })}
        <text x={PAD} y={H + 16} fontSize="10" fill="var(--faint)" fontFamily="var(--mono)">
          {data[0]?.day}
        </text>
        <text
          x={W - PAD}
          y={H + 16}
          fontSize="10"
          fill="var(--faint)"
          fontFamily="var(--mono)"
          textAnchor="end"
        >
          {data[data.length - 1]?.day}
        </text>
      </svg>
    </div>
  );
}

function Breakdown({ items }: { items: NameCount[] }) {
  const max = Math.max(1, ...items.map((i) => i.count));
  if (!items.length) return <div className="adm-empty">No data yet.</div>;
  return (
    <div className="adm-rows">
      {items.map((i) => (
        <div className="adm-row" key={i.name}>
          <span className="name">{i.name}</span>
          <span className="n">{i.count}</span>
          <span className="track">
            <span className="fill" style={{ width: `${(i.count / max) * 100}%`, display: "block" }} />
          </span>
        </div>
      ))}
    </div>
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
  const header = ["Date", "Name", "Email", "Company", "Industry", "Status", "Challenge", "Notes"];
  const rows = leads.map((l) =>
    [l.createdAt, l.firstName, l.email, l.company, l.industry, l.status, l.challenge, l.notes]
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

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [refreshedAt, setRefreshedAt] = useState<Date | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [notesOpen, setNotesOpen] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState("");

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
    }
  }

  async function deleteLead(id: string) {
    if (!confirm("Delete this lead permanently?")) return;
    const res = await fetch("/api/admin/leads", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) setLeads((ls) => ls.filter((l) => l.id !== id));
    else alert("Delete failed — please try again.");
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.replace("/admin/login");
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((l) => {
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (!q) return true;
      return [l.firstName, l.email, l.company, l.industry, l.challenge, l.notes]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [leads, query, statusFilter]);

  const t = stats?.totals;
  const configured = stats?.configured !== false;

  return (
    <>
      <div className="adm-bar">
        <div className="wrap">
          <div className="adm-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-mark.png" alt="" />
            OOS <span className="tag">/ Admin</span>
          </div>
          <div className="adm-actions">
            {refreshedAt && (
              <span className="adm-refreshed" suppressHydrationWarning>
                Updated {refreshedAt.toLocaleTimeString()}
              </span>
            )}
            <button className="adm-btn" onClick={load} disabled={loading}>
              {loading ? "Loading…" : "Refresh"}
            </button>
            <button className="adm-btn" onClick={() => exportCsv(filtered)} disabled={!leads.length}>
              Export CSV
            </button>
            <button className="adm-btn gold" onClick={logout}>
              Log out
            </button>
          </div>
        </div>
      </div>

      <div className="wrap">
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
            <p className="adm-h">
              <span className="tick">▸</span> Key numbers
            </p>
            <div className="adm-kpis">
              <div className="adm-kpi hero">
                <div className="label">Pilot calls booked</div>
                <div className="value">{t.booked}</div>
                <div className="sub">{t.bookedRate}% of all leads</div>
              </div>
              <div className="adm-kpi">
                <div className="label">Total leads</div>
                <div className="value">{t.totalLeads}</div>
                <div className="sub">
                  {t.leads7} this week · {t.leads30} last 30 days
                </div>
              </div>
              <div className="adm-kpi">
                <div className="label">Visitors — 30 days</div>
                <div className="value">{t.visitors30}</div>
                <div className="sub">{t.pageviews30} page views</div>
              </div>
              <div className="adm-kpi">
                <div className="label">Visitor → lead</div>
                <div className="value">{t.visitorToLead}%</div>
                <div className="sub">{t.ctaClicks30} CTA clicks in 30 days</div>
              </div>
            </div>

            <p className="adm-h">
              <span className="tick">▸</span> Conversion funnel — last 30 days
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
                    {base ? `${Math.round((value / Math.max(1, base)) * 100)}%` : " "}
                  </div>
                </div>
              ))}
            </div>

            <div className="adm-grid2" style={{ marginTop: 24 }}>
              <div className="adm-panel">
                <h4>Leads per day — last 30 days</h4>
                <BarChart data={stats.leadsByDay ?? []} color="var(--gold)" />
              </div>
              <div className="adm-panel">
                <h4>Page views per day — last 30 days</h4>
                <BarChart data={stats.viewsByDay ?? []} />
              </div>
            </div>

            <div className="adm-grid3" style={{ marginTop: 12 }}>
              <div className="adm-panel">
                <h4>Leads by industry</h4>
                <Breakdown items={stats.byIndustry ?? []} />
              </div>
              <div className="adm-panel">
                <h4>Traffic sources</h4>
                <Breakdown items={stats.referrers ?? []} />
              </div>
              <div className="adm-panel">
                <h4>Visitors by country / device</h4>
                <Breakdown items={[...(stats.countries ?? []), ...(stats.devices ?? [])]} />
              </div>
            </div>

            <p className="adm-h">
              <span className="tick">▸</span> Leads ({filtered.length})
            </p>
            <div className="adm-toolbar">
              <input
                type="search"
                placeholder="Search name, email, company, notes…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">All statuses</option>
                {LEAD_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]} ({stats.byStatus?.[s] ?? 0})
                  </option>
                ))}
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
                      <th>Industry</th>
                      <th>Challenge</th>
                      <th>Status</th>
                      <th>Notes</th>
                      <th aria-label="Delete" />
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((l) => (
                      <tr key={l.id}>
                        <td className="when">{fmtDate(l.createdAt)}</td>
                        <td className="who">
                          {l.firstName}
                          <br />
                          <a href={`mailto:${l.email}`}>{l.email}</a>
                        </td>
                        <td className="co">{l.company}</td>
                        <td>{l.industry}</td>
                        <td className="challenge">{l.challenge || "—"}</td>
                        <td>
                          <select
                            className="status"
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
                        <td style={{ minWidth: 180 }}>
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
                              className="adm-btn"
                              style={{ whiteSpace: "normal", textAlign: "left", textTransform: "none", letterSpacing: 0 }}
                              onClick={() => {
                                setNotesOpen(l.id);
                                setNotesDraft(l.notes);
                              }}
                            >
                              {l.notes ? l.notes.slice(0, 80) + (l.notes.length > 80 ? "…" : "") : "+ Add note"}
                            </button>
                          )}
                        </td>
                        <td>
                          <button
                            className="adm-del"
                            aria-label="Delete lead"
                            title="Delete lead"
                            onClick={() => deleteLead(l.id)}
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
