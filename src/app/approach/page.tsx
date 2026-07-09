import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { approachPage as c } from "@/lib/pageContent";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: c.metaTitle,
  description: c.metaDescription,
  alternates: { canonical: "/approach" },
  openGraph: {
    title: c.metaTitle,
    description: c.metaDescription,
    url: `${siteUrl}/approach`,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Approach", item: `${siteUrl}/approach` },
  ],
};

export default function ApproachPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Nav />
      <main id="top">
        <PageHero
          kicker={c.hero.kicker}
          headline={c.hero.headline}
          sub={c.hero.sub}
          crumbs={[
            { href: "/", label: "Home" },
            { href: "/approach", label: "Approach" },
          ]}
        >
          <Reveal delay={0.22}>
            <div className="hero-ctas">
              <Link href="/book-a-pilot" className="btn btn-primary" data-track="approach_hero_book_pilot">
                Book a pilot →
              </Link>
            </div>
          </Reveal>
        </PageHero>

        {/* Pilot → Measure → Scale */}
        <section className="band">
          <div className="inner">
            <Reveal>
              <p className="eyebrow">01 ▸ The engagement path</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="sec-title" style={{ marginBottom: 64 }}>
                Pilot. Measure. Scale. In that order — always.
              </h2>
            </Reveal>
            <div className="steps">
              {c.steps.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.12}>
                  <div className="step">
                    <div className="step-num">{String(i + 1).padStart(2, "0")}</div>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Four gates */}
        <section className="sec">
          <Reveal>
            <p className="eyebrow">02 ▸ {c.gates.kicker}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="sec-title" style={{ marginBottom: 16 }}>
              {c.gates.title}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="lead" style={{ maxWidth: 640, marginBottom: 44 }}>
              {c.gates.sub}
            </p>
          </Reveal>
          <div className="phase-grid">
            {c.gates.items.map((g, i) => (
              <Reveal key={g.name} delay={(i % 2) * 0.08}>
                <div className="phase-card">
                  <span className="phase-idx">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{g.name}</h3>
                  <p>{g.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Six dimensions */}
        <section className="band">
          <div className="inner">
            <Reveal>
              <p className="eyebrow">03 ▸ {c.dimensions.kicker}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="sec-title" style={{ marginBottom: 16 }}>
                {c.dimensions.title}
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="lead" style={{ maxWidth: 680, marginBottom: 44 }}>
                {c.dimensions.sub}
              </p>
            </Reveal>
            <div className="cadence-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              {c.dimensions.items.map((d, i) => (
                <Reveal key={d.title} delay={(i % 3) * 0.06}>
                  <div className="cadence-card dim-card">
                    <h3>{d.title}</h3>
                    <p className="mono" style={{ textTransform: "none", letterSpacing: "0.02em", fontSize: 13 }}>
                      {d.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Cadence */}
        <section className="sec">
          <Reveal>
            <p className="eyebrow">04 ▸ {c.cadence.kicker}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="sec-title" style={{ marginBottom: 16 }}>
              {c.cadence.title}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="lead" style={{ maxWidth: 680, marginBottom: 44 }}>
              {c.cadence.sub}
            </p>
          </Reveal>
          <div className="cadence-grid">
            {c.cadence.items.map((item, i) => (
              <Reveal key={item.k} delay={(i % 2) * 0.08}>
                <div className="cadence-card">
                  <div className="k">{item.k}</div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Escalation */}
        <section className="band">
          <div className="inner">
            <Reveal>
              <p className="eyebrow">05 ▸ {c.escalation.kicker}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="sec-title">{c.escalation.title}</h2>
            </Reveal>
            <div className="gap-rows">
              {c.escalation.items.map((e, i) => (
                <Reveal key={e.k} delay={i * 0.06}>
                  <div className="gap-row">
                    <span className="num">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{e.k}</h3>
                      <p>{e.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <CtaBand title={c.cta.title} body={c.cta.body} button={c.cta.button} />
      <Footer />
    </>
  );
}
