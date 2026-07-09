import Link from "next/link";
import Reveal from "./Reveal";
import { steps } from "@/lib/content";

export default function Approach() {
  return (
    <section className="band" id="approach">
      <div className="inner">
        <Reveal>
          <p className="eyebrow">02 ▸ How engagements work</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="sec-title" style={{ marginBottom: 64 }}>
            Every engagement starts with a pilot — small, low-risk, and measured.
          </h2>
        </Reveal>

        <div className="steps">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.12}>
              <div className="step">
                <div className="step-num">{String(i + 1).padStart(2, "0")}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="sec-foot-link">
            <Link href="/approach" className="btn btn-ghost">
              See the full delivery system →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
