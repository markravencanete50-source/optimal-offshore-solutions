import Reveal from "./Reveal";
import { principles, coreValues } from "@/lib/content";

export default function Principles() {
  return (
    <section className="sec">
      <div className="mission-grid">
        <div>
          <Reveal>
            <p className="eyebrow">05 ▸ Mission &amp; principles</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2>Performance accountability, customer first.</h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="lead">
              Our mandate is simple: deliver high-quality, scalable operations for global clients —
              and keep improving them with the data in front of us.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mandates">
              {principles.map((p, i) => (
                <div className="mandate" key={p}>
                  <span className="num">{i + 1}.</span>
                  <p>{p}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="values">
          <Reveal>
            <p className="label">▸ Core values</p>
          </Reveal>
          {coreValues.map((v, i) => (
            <Reveal key={v.key} delay={0.06 + i * 0.06}>
              <div className="value-card">
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
