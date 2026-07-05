import Reveal from "./Reveal";

export default function ProblemSolution() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="split">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: 20 }}>
              <span className="tick">▸</span> The problem
            </p>
            <p className="statement">
              Outsourcing usually means handing your customers to a vendor and hoping the QBR looks
              good.{" "}
              <span className="muted">
                Programs drift out of SLA, reporting becomes a black box, and by the time the
                numbers surface, the damage is done.
              </span>
            </p>
          </Reveal>
          <Reveal delay={0.1} className="body">
            <p className="eyebrow" style={{ marginBottom: 20 }}>
              <span className="tick">▸</span> How we work instead
            </p>
            <p>
              We&apos;re a specialised KPO delivery unit — professionals with real experience across
              telecommunications, technical support, travel, healthcare, and digital platforms.
            </p>
            <p>
              We combine operational leadership, KPI-driven performance management, and
              customer-experience discipline into one measured operation. You get scalable, reliable
              support designed to lift service quality and efficiency — with the metrics visible the
              whole way.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
