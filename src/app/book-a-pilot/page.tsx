import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Contact from "@/components/Contact";
import Reveal from "@/components/Reveal";
import { pilotPage as c } from "@/lib/pageContent";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: c.metaTitle,
  description: c.metaDescription,
  alternates: { canonical: "/book-a-pilot" },
  openGraph: {
    title: c.metaTitle,
    description: c.metaDescription,
    url: `${siteUrl}/book-a-pilot`,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Book a pilot", item: `${siteUrl}/book-a-pilot` },
  ],
};

// FAQPage rich-result eligibility for the questions below.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: c.faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function BookAPilotPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Nav />
      <main id="top">
        <PageHero
          kicker={c.hero.kicker}
          headline={c.hero.headline}
          sub={c.hero.sub}
          crumbs={[
            { href: "/", label: "Home" },
            { href: "/book-a-pilot", label: "Book a pilot" },
          ]}
        >
          <Reveal delay={0.22}>
            <div className="hero-ctas">
              <a href="#contact" className="btn btn-primary" data-track="pilot_hero_to_form">
                Start the conversation →
              </a>
              <span className="mono cta-band-note" style={{ alignSelf: "center" }}>
                We reply within one business day
              </span>
            </div>
          </Reveal>
        </PageHero>

        {/* What happens next */}
        <section className="band">
          <div className="inner">
            <Reveal>
              <p className="eyebrow">01 ▸ {c.next.kicker}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="sec-title">{c.next.title}</h2>
            </Reveal>
            <div className="cadence-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              {c.next.items.map((n, i) => (
                <Reveal key={n.k} delay={i * 0.08}>
                  <div className="cadence-card">
                    <div className="k">{n.k}</div>
                    <h3>{n.title}</h3>
                    <p>{n.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Form — the existing homepage contact section, reused wholesale */}
        <Contact />

        {/* FAQ */}
        <section className="sec">
          <Reveal>
            <p className="eyebrow">02 ▸ Questions, answered</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="sec-title">What founders usually ask first.</h2>
          </Reveal>
          <div className="faq-list">
            {c.faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.04}>
                <details className="faq-item">
                  <summary>{f.q}</summary>
                  <p className="faq-a">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
