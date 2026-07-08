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
};

/* ── tiny inline SVG bar chart ── */
function BarChart({ data, color = "var(--chart-2)" }: { data: DayPoint[]; color?: string }) {
  const W = 600;
  const H = 150;
  const PAD = 4;
  const max = Math.max(1, ...data.map((d) => d.count));
  const bw = (W - PAD * 2) / Math.max(1, data.length);
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
                fill={d.count > 0 ? color : "var(--border)"}
              >
                <title>{`${d.day}: ${d.count}`}</title>
              </rect>
            </g>
          );
        })}
        <text x={PAD} y={H + 16} fontSize="10" fill="var(--text-3)" fontFamily="var(--mono)">
          {data[0]?.day}
        </text>
        <text
          x={W - PAD}
          y={H + 16}
          fontSize="10"
          fill="var(--text-3)"
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
  const [section, setSection] = useState("overview");

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

  const navItems = [
    { id: "overview", label: "Overview", icon: IC.overview },
    { id: "analytics", label: "Analytics", icon: IC.analytics },
    { id: "leads", label: "Leads", icon: IC.leads, count: leads.length },
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
              {typeof n.count === "number" && n.count > 0 && (
                <span className="count">{n.count}</span>
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
                </div>
                <div className="adm-kpi">
                  <div className="head">
                    <span className="ic">
                      <Icon d={IC.eye} size={15} />
                    </span>
                    Visitors — 30 days
                  </div>
                  <div className="value">{t.visitors30}</div>
                  <div className="sub">{t.pageviews30} page views</div>
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
              <div className="adm-grid2">
                <div className="adm-panel">
                  <h4>Leads per day</h4>
                  <BarChart data={stats.leadsByDay ?? []} color="var(--chart-1)" />
                </div>
                <div className="adm-panel">
                  <h4>Page views per day</h4>
                  <BarChart data={stats.viewsByDay ?? []} />
                </div>
              </div>

              <div className="adm-grid3" style={{ marginTop: 14 }}>
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
            </section>

            {/* ── leads ── */}
            <section id="leads" className="adm-section">
              <p className="adm-h">
                Leads <span className="hint">{filtered.length} shown</span>
              </p>
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
                            <div className="adm-lead-id">
                              <span className="chip">{initials(l.firstName)}</span>
                              <div>
                                <div className="nm">{l.firstName}</div>
                                <a href={`mailto:${l.email}`}>{l.email}</a>
                              </div>
                            </div>
                          </td>
                          <td className="co">{l.company}</td>
                          <td>{l.industry}</td>
                          <td className="challenge">{l.challenge || "—"}</td>
                          <td>
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
                          <td>
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
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
