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
    </section>
  );
}
