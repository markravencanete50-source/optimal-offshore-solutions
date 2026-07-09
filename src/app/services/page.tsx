import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { serviceMotifs } from "@/components/graphics";
import { servicePages, serviceFamilies, getServiceImage } from "@/lib/servicePages";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Offshore BPO & KPO Services — Nine Service Lines, One Standard",
  description:
    "Nine offshore service lines across managed operations, insight services and advisory — customer support, program recovery, healthcare ops, reporting and more. Every one runs on the same measured scorecard.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — Optimal Offshore Solutions",
    description:
      "Nine ways we take work off your floor — every service line held to the number on a live scorecard.",
    url: `${siteUrl}/services`,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
  ],
};

export default function ServicesIndex() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Nav />
      <main id="top">
        <PageHero
          kicker="Business operations solutions"
          headline={["Nine service lines.", "One governed standard."]}
          sub="Three families of work — run, analyze, build — every one measured on the same six scorecard dimensions, reviewed on the same cadence, and held to the number in the open."
          crumbs={[
            { href: "/", label: "Home" },
            { href: "/services", label: "Services" },
          ]}
        />

        <section className="sec" style={{ paddingTop: 24 }}>
          {serviceFamilies.map((f) => {
            const members = servicePages.filter((s) => s.family === f.name);
            return (
              <div key={f.name}>
                <Reveal>
                  <div className="family-head">
                    <span className="mono">{f.tagline}</span>
                    <h2>{f.name}</h2>
                  </div>
                </Reveal>
                <Reveal delay={0.06}>
                  <p className="family-blurb">{f.blurb}</p>
                </Reveal>
                <div className="svc-grid three">
                  {members.map((s, i) => {
                    const img = getServiceImage(s.slug);
                    return (
                    <Reveal key={s.slug} delay={(i % 3) * 0.06}>
                      <Link href={`/services/${s.slug}`} className="svc-card svc-card-link">
                        <div className={`svc-art${img?.portrait ? " portrait" : ""}`}>
                          {img ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={img.srcSm}
                              srcSet={`${img.srcSm} 640w, ${img.src} 1200w`}
                              sizes="(min-width: 1024px) 400px, 90vw"
                              alt={s.title}
                              loading="lazy"
                              decoding="async"
                              className="svc-art-img"
                            />
                          ) : (
                            serviceMotifs[s.id]
                          )}
                        </div>
                        <div className="svc-body">
                          <span className="svc-tag">
                            {s.id} {"//"} {s.caption}
                            {s.flagship ? " · flagship" : ""}
                          </span>
                          <h3>{s.title}</h3>
                          <p>{s.hero.sub}</p>
                          <span className="svc-more">Explore the system →</span>
                        </div>
                      </Link>
                    </Reveal>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>
      </main>
      <CtaBand
        title="Not sure which service fits?"
        body="Tell us the problem — a slipping SLA, a queue you can't cover, a site you need stood up. We'll come back with the service line and the pilot that proves it."
      />
      <Footer />
    </>
  );
}
