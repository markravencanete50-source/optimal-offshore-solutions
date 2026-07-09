import Link from "next/link";
import Reveal from "./Reveal";
import { services } from "@/lib/content";
import { servicePages } from "@/lib/servicePages";
import { serviceMotifs } from "./graphics";

// id (S1–S9) → detail-page slug, so each card deep-links to its page.
const slugById = Object.fromEntries(servicePages.map((p) => [p.id, p.slug]));

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
            <Link href={`/services/${slugById[s.id]}`} className="svc-card svc-card-link">
              <div className="svc-art">{serviceMotifs[s.id]}</div>
              <div className="svc-body">
                <span className="svc-tag">
                  {s.id} {"//"} {s.caption}
                </span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <span className="svc-more">Explore the system →</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="sec-foot-link">
          <Link href="/services" className="btn btn-ghost">
            See all nine services in detail →
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
