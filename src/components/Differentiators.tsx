import Reveal from "./Reveal";
import { StaggerGroup, StaggerItem, Counter } from "@/components/motion";
import { whyLead, whyReasons, whyStats, scorecardMetrics } from "@/lib/content";

export default function Differentiators() {
  return (
    <section className="sec">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="sec-index">03</span>
          <p className="eyebrow">
            <span className="tick">▸</span> Why us
          </p>
        </Reveal>
        <Reveal>
          <h2 style={{ maxWidth: 640 }}>Why teams choose us over a generic vendor.</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="lead why-lead">{whyLead}</p>
        </Reveal>

        <div className="why-grid">
          {/* Live scorecard visual */}
          <Reveal className="scorecard">
            <div className="scorecard-head">
              <span>Client scorecard · 90-day trend</span>
              <span className="live">
                <span className="live-dot" />
                Live
              </span>
            </div>
            <div className="scorecard-chart">
              <svg viewBox="0 0 480 190" width="100%" height="auto">
                <line x1="20" y1="40" x2="460" y2="40" stroke="#22303A" strokeWidth="1" />
                <line x1="20" y1="90" x2="460" y2="90" stroke="#22303A" strokeWidth="1" />
                <line x1="20" y1="140" x2="460" y2="140" stroke="#22303A" strokeWidth="1" />
                <path
                  d="M20,150 80,140 140,150 200,120 260,126 320,92 380,78 440,50 L440,168 L20,168 Z"
                  fill="#E6C04B"
                  fillOpacity="0.08"
                />
                <polyline
                  points="20,150 80,140 140,150 200,120 260,126 320,92 380,78 440,50"
                  fill="none"
                  stroke="#E6C04B"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <circle cx="440" cy="50" r="5" fill="#E6C04B" />
                <circle cx="200" cy="120" r="3.5" fill="#141B21" stroke="#7C8F9C" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="scorecard-metrics">
              {scorecardMetrics.map((m) => (
                <div className="sc-metric" key={m.k}>
                  <div className="k">{m.k}</div>
                  <div className="v">{m.v}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Six reasons */}
          <StaggerGroup className="why-list">
            {whyReasons.map((r, i) => (
              <StaggerItem className="why-row" key={r.title}>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{r.title}</h3>
                  <p>{r.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        {/* Stats band */}
        <StaggerGroup className="why-stats">
          {whyStats.map((s) => (
            <StaggerItem className="why-stat" key={s.label}>
              <div className="v">
                <Counter to={s.to} suffix={s.suffix} />
              </div>
              <div className="k">{s.label}</div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
