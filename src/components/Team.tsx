import Reveal from "./Reveal";
import { team } from "@/lib/content";

export default function Team() {
  return (
    <section className="sec" id="team" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="team-lead">
          <Reveal>
            <div className="sec-head">
              <span className="sec-index">04</span>
              <p className="eyebrow">
                <span className="tick">▸</span> Meet the team
              </p>
            </div>
            <h2 style={{ maxWidth: 560 }}>
              Led by operators who have run the numbers you care about.
            </h2>
          </Reveal>
          <Reveal className="team-stat" delay={0.1}>
            <div className="v">
              50<span style={{ fontSize: "0.5em" }}>+</span>
            </div>
            <div className="k">Years combined ops leadership</div>
          </Reveal>
        </div>

        <div className="team-grid">
          {team.map((m, i) => (
            <Reveal className="member" key={m.name} delay={(i % 3) * 0.07}>
              {/* Photos are being collected — placeholder shows initials for now */}
              <div className="av" aria-hidden="true">
                {m.initials}
                <span className="ph">photo soon</span>
              </div>
              <div className="role">{m.role}</div>
              <h3>{m.name}</h3>
              <div className="pos">{m.position}</div>
              <p>{m.bio}</p>
            </Reveal>
          ))}

          {/* Open seat — assigned per engagement */}
          <Reveal className="member" delay={0.14}>
            <div style={{ justifyContent: "center", display: "flex", flexDirection: "column", flex: 1 }}>
              <div className="role" style={{ color: "var(--faint)" }}>
                Growing
              </div>
              <h3 style={{ color: "var(--muted)" }}>Your account lead</h3>
              <div className="pos">Assigned per engagement</div>
              <p>
                Every pilot gets a named operations lead accountable for your scorecard — a single
                point of ownership from day one through scale.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
