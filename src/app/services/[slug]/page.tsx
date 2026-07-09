import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { servicePages, getServicePage, getServiceImage } from "@/lib/servicePages";
import { company } from "@/lib/content";
import { siteUrl } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return servicePages.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const page = getServicePage(params.slug);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: { canonical: `/services/${page.slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `${siteUrl}/services/${page.slug}`,
      siteName: company.name,
      type: "website",
    },
  };
}

export default function ServiceDetail({ params }: { params: Params }) {
  const page = getServicePage(params.slug);
  if (!page) notFound();

  const image = getServiceImage(page.slug);
  const related = page.related
    .map((slug) => getServicePage(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.title,
    serviceType: page.title,
    description: page.metaDescription,
    url: `${siteUrl}/services/${page.slug}`,
    provider: {
      "@type": "Organization",
      name: company.name,
      url: siteUrl,
    },
    areaServed: ["US", "APAC"],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
      {
        "@type": "ListItem",
        position: 3,
        name: page.title,
        item: `${siteUrl}/services/${page.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Nav />
      <main id="top">
        <PageHero
          kicker={page.hero.kicker}
          headline={page.hero.headline}
          sub={page.hero.sub}
          crumbs={[
            { href: "/", label: "Home" },
            { href: "/services", label: "Services" },
            { href: `/services/${page.slug}`, label: page.caption },
          ]}
        >
          <Reveal delay={0.22}>
            <div className="hero-ctas">
              <Link href="/book-a-pilot" className="btn btn-primary" data-track="svc_hero_book_pilot">
                {page.cta.button} →
              </Link>
              <a href="#system" className="btn btn-ghost">
                See how it works
              </a>
            </div>
          </Reveal>
        </PageHero>

        {/* Branded service visual */}
        {image && (
          <section className="svc-media-wrap">
            <Reveal y={32}>
              <figure className={`svc-media${image.portrait ? " portrait" : ""}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  srcSet={`${image.srcSm} 640w, ${image.src} 1200w`}
                  sizes="(min-width: 1280px) 1200px, 92vw"
                  alt={`${page.title} — Optimal Offshore Solutions`}
                  decoding="async"
                />
              </figure>
            </Reveal>
          </section>
        )}

        {/* The problem */}
        <section className="band">
          <div className="inner">
            <Reveal>
              <p className="eyebrow">01 ▸ The problem</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="sec-title" style={{ marginBottom: 28, maxWidth: 720 }}>
                {page.problem.title}
              </h2>
            </Reveal>
            {page.problem.paras.map((p, i) => (
              <Reveal key={i} delay={0.12 + i * 0.05}>
                <p className="lead" style={{ maxWidth: 680, marginBottom: 14 }}>
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Why it breaks */}
        <section className="sec">
          <Reveal>
            <p className="eyebrow">02 ▸ Why it breaks</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="sec-title">{page.gaps.title}</h2>
          </Reveal>
          <div className="gap-rows">
            {page.gaps.items.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.05}>
                <div className="gap-row">
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{g.title}</h3>
                    <p>{g.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* The reframe */}
        <section className="band">
          <div className="inner">
            <div className="reframe">
              <Reveal>
                <div className="rag-dots" aria-hidden>
                  <span />
                  <span />
                  <span />
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <h2>
                  <span className="dim">{page.reframe.muted}</span>
                  {page.reframe.plain} <span className="gold">{page.reframe.gold}</span>
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="lead">{page.reframe.sub}</p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mono-note">No black box · Operator-owned</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* The system */}
        <section className="sec" id="system">
          <Reveal>
            <p className="eyebrow">03 ▸ How we do it</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="sec-title" style={{ marginBottom: 16 }}>
              {page.phases.title}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="lead" style={{ maxWidth: 640, marginBottom: 44 }}>
              {page.phases.sub}
            </p>
          </Reveal>
          <div className="phase-grid">
            {page.phases.items.map((ph, i) => (
              <Reveal key={ph.name} delay={(i % 2) * 0.08}>
                <div className="phase-card">
                  <span className="phase-idx">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{ph.name}</h3>
                  <p>{ph.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="benchmark-note">
              <strong>Benchmark</strong>
              {page.phases.benchmark}
            </p>
          </Reveal>
        </section>

        {/* What you get */}
        <section className="band">
          <div className="inner">
            <Reveal>
              <p className="eyebrow">04 ▸ What you get</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="sec-title">{page.outcomes.title}</h2>
            </Reveal>
            <div className="check-rows">
              {page.outcomes.items.map((o, i) => (
                <Reveal key={o.title} delay={i * 0.05}>
                  <div className="check-row">
                    <span className="tick">✓</span>
                    <div>
                      <h3>{o.title}</h3>
                      <p>{o.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* The numbers */}
        <section className="sec">
          <Reveal>
            <p className="eyebrow">05 ▸ Held to the number</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="sec-title" style={{ marginBottom: 16 }}>
              {page.metrics.title}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="lead" style={{ maxWidth: 640, marginBottom: 44 }}>
              {page.metrics.sub}
            </p>
          </Reveal>
          <div className="metric-grid">
            {page.metrics.items.map((m, i) => (
              <Reveal key={m.k} delay={(i % 2) * 0.08}>
                <div className="metric-card">
                  <div className="k">
                    {m.k}
                    {m.dir && <span className="dir">{m.dir === "up" ? "↑" : "↓"}</span>}
                  </div>
                  <p>{m.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="benchmark-note">
              <strong>Governance</strong>
              Red-amber-green, in the open, every day. No black box.
            </p>
          </Reveal>
        </section>

        {/* Related services */}
        {related.length > 0 && (
          <section className="band">
            <div className="inner">
              <Reveal>
                <p className="eyebrow">06 ▸ Related services</p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="sec-title" style={{ fontSize: "clamp(28px,3vw,40px)" }}>
                  Often paired with {page.caption}.
                </h2>
              </Reveal>
              <div className="related-grid">
                {related.map((r, i) => (
                  <Reveal key={r.slug} delay={i * 0.06}>
                    <Link href={`/services/${r.slug}`} className="related-card">
                      <span className="svc-tag">
                        {r.id} {"//"} {r.caption}
                      </span>
                      <h3>{r.title}</h3>
                      <p>{r.hero.sub}</p>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <CtaBand title={page.cta.title} body={page.cta.body} button={page.cta.button} />
      <Footer />
    </>
  );
}
