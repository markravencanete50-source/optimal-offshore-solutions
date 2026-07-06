import Reveal from "./Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion";
import { principles, coreValues } from "@/lib/content";
import { coreValueIcons } from "./graphics";

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

        {/* Core values */}
        <div className="core-values">
          <Reveal>
            <p className="eyebrow">
              <span className="tick">▸</span> Core values
            </p>
            <h3>The three things every engagement is built on.</h3>
          </Reveal>
          <StaggerGroup className="values-grid">
            {coreValues.map((v) => (
              <StaggerItem className="value-cell" key={v.key}>
                {coreValueIcons[v.key]}
                <div>
                  <h3>{v.title}</h3>
                  <p>{v.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
