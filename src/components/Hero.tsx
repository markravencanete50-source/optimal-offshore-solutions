import Reveal from "./Reveal";
import { WordRise, Counter } from "@/components/motion";
import { gauges } from "@/lib/content";

export default function Hero() {
  return (
    <section className="hero">
      <div className="grid-bg" />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <Reveal>
            <p className="eyebrow">
              <span className="tick">▸</span> KPO Delivery &nbsp;//&nbsp; Operations Accountability
            </p>
          </Reveal>
          <WordRise
            lines={[
              ["Offshore", "operations,"],
              ["held", "to", "the", "number."],
            ]}
            italicWords={["the", "number."]}
          />
          <Reveal delay={0.16}>
            <p className="lead">
              We are a specialized KPO (Knowledge Process Outsourcing) delivery unit composed of
              professionals with experience across telecommunications, technical support, travel,
              healthcare, and digital platforms. Our team combines operational leadership, KPI-driven
              performance management, and customer experience excellence. We deliver scalable, reliable
              customer support operations designed to improve service quality and efficiency.
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
        </div>

        {/* Operating scorecard — proof panel on the right */}
        <Reveal className="readout" delay={0.32}>
          <div className="readout-top">
            <span>Operating scorecard</span>
            <span className="live">
              <span className="dot" />
              Metrics we&rsquo;re measured on
            </span>
          </div>
          <div className="gauges">
            {gauges.map((g) => (
              <div className="gauge" key={g.k}>
                <div className="k">{g.k}</div>
                <div className="v">
                  <Counter to={g.count} prefix={g.prefix} suffix={g.suffix} />
                </div>
                <div className="n">{g.note}</div>
              </div>
            ))}
          </div>
          <div className="readout-foot">
            // Representative operating targets — every engagement is baselined to your own KPIs on
            day one.
          </div>
        </Reveal>
      </div>
    </section>
  );
}
