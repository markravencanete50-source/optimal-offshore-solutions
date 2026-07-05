import Reveal from "./Reveal";
import { services } from "@/lib/content";

export default function Services() {
  return (
    <section className="sec" id="services" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="sec-index">01</span>
          <p className="eyebrow">
            <span className="tick">▸</span> Business operations solutions
          </p>
        </Reveal>
        <Reveal>
          <h2>Eight ways we take work off your floor.</h2>
        </Reveal>
        <Reveal className="svc-grid">
          {services.map((s) => (
            <div className="svc" key={s.id}>
              <span className="idx">{s.id}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <span className="arrow">{s.tag} →</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
