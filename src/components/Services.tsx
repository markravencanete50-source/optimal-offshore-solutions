"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";
import { servicePages, getServiceImage } from "@/lib/servicePages";
import { serviceMotifs } from "./graphics";

/*
  Services showcase — scroll-driven horizontal lanes.

  Desktop (lg+): the section is tall (SECTION_VH), the viewport pins via
  position:sticky, and vertical scroll drives the card track left/right
  (useScroll → translateX). A gold progress bar mirrors the journey.

  Mobile / reduced-motion: a native swipeable overflow-x track with
  scroll-snap — same cards, no hijacking.
*/

const TRACK_END = "-72%"; // how far the track travels across the pinned scroll

function useIsDesktop(query = "(min-width: 1024px)") {
  const [v, setV] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    const on = () => setV(m.matches);
    on();
    m.addEventListener("change", on);
    // Fallback for embedded webviews that resize without firing matchMedia.
    window.addEventListener("resize", on, { passive: true });
    return () => {
      m.removeEventListener("change", on);
      window.removeEventListener("resize", on);
    };
  }, [query]);
  return v;
}

export default function Services() {
  const reduce = useReducedMotion();
  const isDesktop = useIsDesktop();
  const slide = isDesktop && !reduce; // scroll-linked motion only where it belongs

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Constant output range — useTransform captures its ranges on first render,
  // so the desktop/mobile switch is applied at the style level instead.
  const trackX = useTransform(scrollYProgress, [0, 1], ["0%", TRACK_END]);
  const bar = useTransform(scrollYProgress, [0, 1], ["8%", "100%"]);

  return (
    <section ref={ref} className={`lanes${slide ? " lanes-tall" : ""}`} id="services">
      <div className="lanes-pin">
        <div className="lanes-head">
          <div>
            <Reveal>
              <p className="eyebrow">01 ▸ Business operations solutions</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="sec-title" style={{ marginBottom: 0, maxWidth: 720 }}>
                Nine ways we take work off your floor.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.14}>
            <span className="lanes-hint mono" aria-hidden>
              {slide ? "Scroll ▸▸" : "Swipe ▸▸"}
            </span>
          </Reveal>
        </div>

        <motion.div className="lane-track" style={{ x: slide ? trackX : 0 }}>
          {servicePages.map((s, i) => {
            const img = getServiceImage(s.slug);
            return (
              <motion.article
                key={s.slug}
                className="lane-card"
                initial={reduce ? undefined : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1], delay: (i % 3) * 0.07 }}
              >
                <Link href={`/services/${s.slug}`} className="lane-link">
                  <div className={`lane-media${img?.portrait ? " portrait" : ""}`}>
                    {img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={img.src}
                        srcSet={`${img.srcSm} 640w, ${img.src} 1200w`}
                        sizes="(min-width: 1024px) 440px, 78vw"
                        alt={s.title}
                        loading={i < 2 ? "eager" : "lazy"}
                        decoding="async"
                      />
                    ) : (
                      <div className="lane-motif">{serviceMotifs[s.id]}</div>
                    )}
                    <span className="lane-badge">
                      {s.id} {"//"} {s.caption}
                      {s.flagship ? " · flagship" : ""}
                    </span>
                  </div>
                  <div className="lane-body">
                    <h3>{s.title}</h3>
                    <p>{s.hero.sub}</p>
                    <span className="lane-more">Explore the system →</span>
                  </div>
                </Link>
              </motion.article>
            );
          })}

          {/* terminal CTA card */}
          <article className="lane-card lane-cta">
            <p className="eyebrow" style={{ color: "var(--gold)" }}>
              ▸ Not sure which fits?
            </p>
            <h3>Tell us the problem — we&apos;ll bring the service line and the pilot.</h3>
            <Link href="/book-a-pilot" className="btn btn-primary" data-track="lanes_cta_book_pilot">
              Book a pilot →
            </Link>
          </article>
        </motion.div>

        <div className="lanes-bar" aria-hidden>
          <motion.span style={{ width: bar }} />
        </div>

        <div className="sec-foot-link" style={{ marginTop: 28 }}>
          <Link href="/services" className="btn btn-ghost">
            See all nine services in detail →
          </Link>
        </div>
      </div>
    </section>
  );
}
