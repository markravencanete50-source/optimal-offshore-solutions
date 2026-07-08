import Reveal from "./Reveal";
import CountUp from "./CountUp";
import { whyLead, whyReasons, whyStats, scorecardMetrics } from "@/lib/content";

const metricClass: Record<string, string> = {
  CSAT: "val gold",
  FCR: "val",
  "In-SLA": "val green",
};

const statClass = ["val gold", "val", "val", "val green"];

export default function Differentiators() {
  return (
    <section className="sec" id="why">
      <div className="why-grid">
        <div className="why-sticky">
          <Reveal>
            <p className="eyebrow">03 ▸ Why us</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2>Why teams choose us over a generic vendor.</h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="lead">{whyLead}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mini-scorecard">
              <div className="mini-scorecard-head">
                <span className="mono">Client scorecard · 90-day trend</span>
                <span className="live">LIVE</span>
              </div>
              <div className="mini-metrics">
                {scorecardMetrics.map((m) => (
                  <div key={m.k}>
                    <div className={metricClass[m.k] ?? "val"}>
                      <CountUp end={parseInt(m.v, 10)} suffix="%" />
                    </div>
                    <div className="lbl">{m.k}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="why-rows">
          {whyReasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.06}>
              <div className="why-row">
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{r.title}</h3>
                  <p>{r.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal>
        <div className="stats-band">
          {whyStats.map((s, i) => (
            <div className="stat-cell" key={s.label}>
              <div className={statClass[i] ?? "val"}>
                <CountUp end={s.to} suffix={s.suffix} />
              </div>
              <div className="lbl">{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
