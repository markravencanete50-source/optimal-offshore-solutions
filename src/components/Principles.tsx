import Reveal from "./Reveal";
import { principles } from "@/lib/content";

export default function Principles() {
  return (
    <section className="sec principles">
      <div className="wrap">
        <div className="prin-grid">
          <Reveal>
            <div className="sec-head">
              <span className="sec-index">05</span>
              <p className="eyebrow">
                <span className="tick">▸</span> Mission &amp; principles
              </p>
            </div>
            <h2 style={{ maxWidth: 440 }}>Performance accountability, customer first.</h2>
            <p className="lead" style={{ marginTop: 22, maxWidth: 400 }}>
              Our mandate is simple: deliver high-quality, scalable operations for global clients —
              and keep improving them with the data in front of us.
            </p>
          </Reveal>
          <Reveal as="ol" className="prin-list" delay={0.1}>
            {principles.map((p) => (
              <li key={p}>
                <span>{p}</span>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
