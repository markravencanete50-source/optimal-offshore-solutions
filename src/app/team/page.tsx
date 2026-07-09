import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { teamPage as c } from "@/lib/pageContent";
import { team, principles, coreValues, company } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: c.metaTitle,
  description: c.metaDescription,
  alternates: { canonical: "/team" },
  openGraph: {
    title: c.metaTitle,
    description: c.metaDescription,
    url: `${siteUrl}/team`,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Team", item: `${siteUrl}/team` },
  ],
};

// Person entries help Google connect founders to the Organization entity.
const teamSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Meet the team — Optimal Offshore Solutions",
  url: `${siteUrl}/team`,
  mainEntity: {
    "@type": "Organization",
    name: company.name,
    url: siteUrl,
    member: team.map((m) => ({
      "@type": "Person",
      name: m.name.replace(/[“”]/g, '"'),
      jobTitle: `${m.role} · ${m.position}`,
      worksFor: { "@type": "Organization", name: company.name },
    })),
  },
};

export default function TeamPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamSchema) }}
      />
      <Nav />
      <main id="top">
        <PageHero
          kicker={c.hero.kicker}
          headline={c.hero.headline}
          sub={c.hero.sub}
          crumbs={[
            { href: "/", label: "Home" },
            { href: "/team", label: "Team" },
          ]}
        >
          <Reveal delay={0.22}>
            <div className="hero-ctas">
              <Link href="/book-a-pilot" className="btn btn-primary" data-track="team_hero_book_pilot">
                Book a pilot →
              </Link>
            </div>
          </Reveal>
        </PageHero>

        {/* Founders */}
        <section className="band">
          <div className="inner">
            <Reveal>
              <p className="eyebrow">01 ▸ The founders</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="sec-title" style={{ maxWidth: 800 }}>
                Five operators. 50+ years of floors, queues and scorecards.
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
                    Every pilot gets a named operations lead accountable for your scorecard — a
                    single point of ownership from day one through scale.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="sec">
          <Reveal>
            <p className="eyebrow">02 ▸ What we run on</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="sec-title">The principles behind every account.</h2>
          </Reveal>
          <div className="gap-rows">
            {principles.map((p, i) => (
              <Reveal key={p} delay={i * 0.05}>
                <div className="gap-row">
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{p}</h3>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="band">
          <div className="inner">
            <Reveal>
              <p className="eyebrow">03 ▸ Core values</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="sec-title">What we refuse to compromise.</h2>
            </Reveal>
            <div className="cadence-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              {coreValues.map((v, i) => (
                <Reveal key={v.key} delay={i * 0.08}>
                  <div className="cadence-card">
                    <div className="k">{v.key}</div>
                    <h3>{v.title}</h3>
                    <p>{v.body}</p>
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
