import type { Metadata } from "next";
import type { ReactNode } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Scorecard from "./Scorecard";
import { readiness as c } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: c.metaTitle,
  description: c.metaDescription,
  alternates: { canonical: "/offshore-readiness" },
  openGraph: {
    title: c.metaTitle,
    description: c.metaDescription,
    url: `${siteUrl}/offshore-readiness`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

// FAQPage rich-result markup — mirrors the visible FAQ below exactly.
// (Organization JSON-LD is injected once, site-wide, by the root layout.)
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: c.faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/**
 * Renders inline [text](/path) links from content.ts prose as real anchors,
 * so internal links live in context and exist in the server HTML.
 */
function withLinks(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      <a key={m.index} href={m[2]} className="rdy-link">
        {m[1]}
      </a>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function OffshoreReadinessPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Nav />
      <main className="rdy" id="top">
        {/* ── hero — the H1 is the LCP element, so it renders unanimated ── */}
        <section className="rdy-hero">
          <div className="rdy-inner">
            <p className="rdy-eyebrow">{c.hero.kicker}</p>
            <h1>{c.hero.headline}</h1>
            <p className="rdy-standfirst">{c.hero.standfirst}</p>
            <Reveal delay={0.15}>
              <div className="rdy-hero-ctas">
                <a href="#scorecard" className="btn btn-primary" data-track="readiness_hero_cta">
                  {c.hero.cta}
                </a>
                <span className="rdy-mono-note">{c.hero.ctaNote}</span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── the problem ── */}
        <section className="rdy-sec">
          <div className="rdy-inner rdy-prose">
            <Reveal>
              <p className="rdy-eyebrow">▸ {c.problem.kicker}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2>{c.problem.title}</h2>
            </Reveal>
            {c.problem.paragraphs.map((p, i) => (
              <p key={i}>{withLinks(p)}</p>
            ))}
          </div>
        </section>

        {/* ── the four signals ── */}
        <section className="rdy-sec">
          <div className="rdy-inner rdy-prose">
            <Reveal>
              <p className="rdy-eyebrow">▸ {c.signals.kicker}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2>{c.signals.title}</h2>
            </Reveal>
            <p>{c.signals.intro}</p>
            {c.signals.items.map((s) => (
              <div key={s.title} className="rdy-signal">
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
            {c.signals.outro.map((p, i) => (
              <p key={i}>{withLinks(p)}</p>
            ))}
          </div>
        </section>

        {/* ── scorecard (light band) + results + gate — the interactive part ── */}
        <Scorecard />

        {/* ── who built this — the E-E-A-T block ── */}
        <section className="rdy-sec">
          <div className="rdy-inner rdy-prose">
            <Reveal>
              <p className="rdy-eyebrow">▸ {c.whoBuilt.kicker}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2>{c.whoBuilt.title}</h2>
            </Reveal>
            {c.whoBuilt.paragraphs.map((p, i) => (
              <p key={i}>{withLinks(p)}</p>
            ))}
            <p className="rdy-attribution">
              {c.whoBuilt.attribution}
              {" · "}
              <time dateTime={c.whoBuilt.lastReviewed}>{c.whoBuilt.lastReviewedLabel}</time>
            </p>
          </div>
        </section>

        {/* ── common questions ── */}
        <section className="rdy-sec">
          <div className="rdy-inner">
            <Reveal>
              <p className="rdy-eyebrow">▸ Common questions</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="rdy-h2">What operations leaders ask us.</h2>
            </Reveal>
            <div className="rdy-faq">
              {c.faqs.map((f) => (
                <details key={f.q} className="rdy-faq-item">
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── final CTA ── */}
        <section className="rdy-cta">
          <div className="rdy-inner">
            <Reveal>
              <h2 className="rdy-h2">{c.finalCta.title}</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="rdy-cta-body">{c.finalCta.body}</p>
            </Reveal>
            <Reveal delay={0.14}>
              <a href="/book-a-pilot" className="btn btn-primary" data-track="readiness_pilot_cta">
                {c.finalCta.button}
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
