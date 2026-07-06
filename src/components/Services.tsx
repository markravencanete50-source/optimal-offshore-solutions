import Reveal from "./Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion";
import { services } from "@/lib/content";
import { serviceMotifs } from "./graphics";

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
        <StaggerGroup className="svc-grid">
          {services.map((s) => (
            <StaggerItem className="svc" key={s.id}>
              <div className="service-viz">
                <span className="viz-cap">{s.caption}</span>
                {serviceMotifs[s.id]}
              </div>
              <div className="service-body">
                <span className="idx">{s.id}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <span className="arrow">{s.tag} →</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
