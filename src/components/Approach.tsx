import Reveal from "./Reveal";
import { steps } from "@/lib/content";

export default function Approach() {
  return (
    <section className="sec approach" id="approach">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="sec-index">02</span>
          <p className="eyebrow">
            <span className="tick">▸</span> How engagements work
          </p>
        </Reveal>
        <Reveal>
          <h2 style={{ maxWidth: 640 }}>
            Every engagement starts with a pilot — small, low-risk, and measured.
          </h2>
        </Reveal>
        <div className="steps">
          {steps.map((s, i) => (
            <Reveal className="step" key={s.num} delay={i * 0.08}>
              <span className="num">{s.num}</span>
              <div className="rail" />
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
