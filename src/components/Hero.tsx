import Reveal from "./Reveal";
import CountUp from "./CountUp";
import { gauges } from "@/lib/content";

export default function Hero() {
  return (
    <section className="hero">
      <div className="grid-bg" />
      <div className="wrap hero-inner">
        <Reveal>
          <p className="eyebrow">
            <span className="tick">▸</span> KPO Delivery &nbsp;//&nbsp; Operations Accountability
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1>
            Offshore operations,
            <br />
            held to <em>the number.</em>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="lead">
            Optimal Offshore Solutions is a KPO delivery team built by BPO operators. We stand up,
            recover, and scale customer and back-office operations that stay in SLA — and prove it
            on a dashboard you can actually see.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="hero-cta">
            <a href="#contact" className="btn btn-primary">
              Schedule a pilot consultation →
            </a>
            <a href="#approach" className="btn btn-ghost">
              See how a pilot works
            </a>
          </div>
        </Reveal>

        {/* SIGNATURE: ops readout */}
        <Reveal delay={0.3}>
          <div className="readout">
            <div className="readout-top">
              <span>Operating scorecard</span>
              <span className="live">
                <span className="dot" />
                Metrics we&apos;re measured on
              </span>
            </div>
            <div className="gauges">
              {gauges.map((g) => (
                <div className="gauge" key={g.k}>
                  <div className="k">{g.k}</div>
                  <div className="v">
                    <CountUp end={g.count} prefix={g.prefix} suffix={g.suffix} />
                  </div>
                  <div className="n">{g.note}</div>
                </div>
              ))}
            </div>
            <div className="readout-foot">
              // Representative operating targets — every engagement is baselined to your own KPIs
              on day one.
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
