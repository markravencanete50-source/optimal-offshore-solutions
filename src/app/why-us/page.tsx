import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import { whyUsPage as c } from "@/lib/pageContent";
import { whyReasons, whyStats } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: c.metaTitle,
  description: c.metaDescription,
  alternates: { canonical: "/why-us" },
  openGraph: {
    title: c.metaTitle,
    description: c.metaDescription,
    url: `${siteUrl}/why-us`,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Why us", item: `${siteUrl}/why-us` },
  ],
};

const statClass = ["val gold", "val", "val", "val green"];

export default function WhyUsPage() {
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
            { href: "/why-us", label: "Why us" },
          ]}
        >
          <Reveal delay={0.22}>
            <div className="hero-ctas">
              <Link href="/book-a-pilot" className="btn btn-primary" data-track="why_hero_book_pilot">
                Book a pilot →
              </Link>
              <Link href="/approach" className="btn btn-ghost">
                See the delivery system
              </Link>
            </div>
          </Reveal>
        </PageHero>

        {/* Six reasons */}
        <section className="band">
          <div className="inner">
            <Reveal>
              <p className="eyebrow">01 ▸ Six reasons</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="sec-title">Why teams choose us over a generic vendor.</h2>
            </Reveal>
            <div className="gap-rows">
              {whyReasons.map((r, i) => (
                <Reveal key={r.title} delay={i * 0.05}>
                  <div className="gap-row">
                    <span className="num">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{r.title}</h3>
                      <p>{r.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Scoring & bands */}
        <section className="sec">
          <Reveal>
            <p className="eyebrow">02 ▸ {c.scoring.kicker}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="sec-title" style={{ marginBottom: 16 }}>
              {c.scoring.title}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="lead" style={{ maxWidth: 660, marginBottom: 44 }}>
              {c.scoring.sub}
            </p>
          </Reveal>
          <div className="why-grid" style={{ alignItems: "stretch" }}>
            <Reveal>
              <div className="bands-list">
                {c.scoring.bands.map((b) => (
                  <div key={b.k} className={`band-row${b.k.startsWith("Fail — ") ? " crit" : ""}`}>
                    <span>{b.k}</span>
                    <span className="v">{b.v}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="override-card" style={{ marginTop: 0, height: "100%" }}>
                <h3>{c.scoring.override.title}</h3>
                <p>{c.scoring.override.body}</p>
                <p className="benchmark-note" style={{ marginTop: 18 }}>
                  <strong>Principle</strong>
                  Every score below target requires cited evidence — deductions are defended, not felt.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Sigma ladder */}
        <section className="band">
          <div className="inner">
            <Reveal>
              <p className="eyebrow">03 ▸ {c.sigma.kicker}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="sec-title" style={{ marginBottom: 16 }}>
                {c.sigma.title}
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="lead" style={{ maxWidth: 680, marginBottom: 44 }}>
                {c.sigma.sub}
              </p>
            </Reveal>
            <div className="sigma-rows">
              {c.sigma.rows.map((r, i) => (
                <Reveal key={r.sigma} delay={i * 0.06}>
                  <div className={`sigma-row${r.label.startsWith("OOS") ? " highlight" : ""}`}>
                    <span className="s">{r.sigma}</span>
                    <span className="d">{r.dpmo}</span>
                    <span className="l">{r.label}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="sec" style={{ paddingTop: 40 }}>
          <Reveal>
            <div className="stats-band" style={{ marginTop: 0 }}>
              {whyStats.map((s, i) => (
                <div className="stat-cell" key={s.label}>
                  <div className={statClass[i] ?? "val"}>
                    <CountUp end={s.to} suffix={s.suffix} />
                  </div>
                  <div className="lbl">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
      </main>
      <CtaBand title={c.cta.title} body={c.cta.body} button={c.cta.button} />
      <Footer />
    </>
  );
}
