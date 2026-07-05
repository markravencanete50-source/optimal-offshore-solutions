import Reveal from "./Reveal";

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
      </div>
    </section>
  );
}
