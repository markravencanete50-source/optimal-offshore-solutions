import Reveal from "./Reveal";
import { differentiators } from "@/lib/content";

export default function Differentiators() {
  return (
    <section className="sec">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="sec-index">03</span>
          <p className="eyebrow">
            <span className="tick">▸</span> Why us
          </p>
        </Reveal>
        <Reveal>
          <h2 style={{ maxWidth: 560 }}>A delivery partner that behaves like an owner.</h2>
        </Reveal>
        <Reveal className="diffs">
          {differentiators.map((d) => (
            <div className="diff" key={d.title}>
              <div className="k">
                <span className="dot" />
                <h3>{d.title}</h3>
              </div>
              <p>{d.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
