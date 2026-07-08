import Reveal from "./Reveal";
import { services } from "@/lib/content";
import { serviceMotifs } from "./graphics";

export default function Services() {
  return (
    <section className="sec" id="services">
      <Reveal>
        <p className="eyebrow">01 ▸ Business operations solutions</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="sec-title" style={{ maxWidth: 720 }}>
          Nine ways we take work off your floor.
        </h2>
      </Reveal>

      <div className="svc-grid">
        {services.map((s, i) => (
          <Reveal key={s.id} delay={(i % 4) * 0.06}>
            <div className="svc-card">
              <div className="svc-art">{serviceMotifs[s.id]}</div>
              <div className="svc-body">
                <span className="svc-tag">
                  {s.id} {"//"} {s.caption}
                </span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
