import Link from "next/link";
import Reveal from "./Reveal";
import { team } from "@/lib/content";

export default function Team() {
  return (
    <section className="band" id="team">
      <div className="inner">
        <Reveal>
          <p className="eyebrow">04 ▸ Meet the team</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="sec-title" style={{ maxWidth: 800 }}>
            Led by operators who have run the numbers you care about.
          </h2>
        </Reveal>

        <div className="team-grid">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={(i % 3) * 0.06}>
              <div className="team-card">
                {m.photo && (
                  <div className="team-photo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={m.photo} alt={m.name} loading="lazy" />
                  </div>
                )}
                <div className="team-body">
                  <p className="team-role">
                    {m.role} · {m.position}
                  </p>
                  <h3>{m.name}</h3>
                  <p className="bio">{m.bio}</p>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.12}>
            <div className="team-card lead-slot">
              <p className="team-role">Assigned per engagement</p>
              <h3>Your account lead</h3>
              <p className="bio">
                Every pilot gets a named operations lead accountable for your scorecard — a single
                point of ownership from day one through scale.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="sec-foot-link">
            <Link href="/team" className="btn btn-ghost">
              Meet the full team →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
