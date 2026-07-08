import Reveal from "./Reveal";

export default function ProblemSolution() {
  return (
    <section className="split">
      <div className="split-grid">
        <Reveal>
          <div className="split-card">
            <p className="eyebrow quiet">▸ The problem</p>
            <p className="big">
              Outsourcing usually means handing your customers to a vendor and hoping the QBR looks
              good. Programs drift out of SLA, reporting becomes a black box — and by the time the
              numbers surface, <span className="pop">the damage is done.</span>
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="split-card gold">
            <p className="eyebrow">▸ How we work instead</p>
            <p className="big">
              Operational leadership, KPI-driven performance management and customer-experience
              discipline in one measured operation —{" "}
              <span className="pop">with the metrics visible the whole way.</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
