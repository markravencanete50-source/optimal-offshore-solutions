"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import Reveal from "./Reveal";
import CountUp from "./CountUp";
import { gauges } from "@/lib/content";

/* Word-by-word headline rise. Entrances start at 0.02 (not 0) opacity so the
   browser counts the H1 as painted immediately — it's the page's LCP element. */
const headlineStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.12 } },
};
const wordRise: Variants = {
  hidden: { opacity: 0.02, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.2, 0.7, 0.2, 1] } },
};

const LINE_A = "Offshore operations,".split(" ");
const LINE_B = "held to the number.".split(" ");

/** Which scorecard tiles read gold vs neutral, and their bar fill. */
const tileStyle: Record<string, { valClass: string; barClass: string; barPct: number }> = {
  "CSAT target": { valClass: "val gold", barClass: "", barPct: 94 },
  "AHT trend": { valClass: "val", barClass: "green", barPct: 60 },
  "FCR target": { valClass: "val", barClass: "green", barPct: 85 },
  SLA: { valClass: "val gold", barClass: "", barPct: 99 },
};

const tileLabels: Record<string, string> = {
  "CSAT target": "CSAT target",
  "AHT trend": "AHT reduction",
  "FCR target": "First-contact resolution",
  SLA: "In-SLA delivery",
};

function Meter({ pct, green }: { pct: number; green?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <div className="meter">
      <motion.span
        className={green ? "green" : undefined}
        initial={reduce ? { width: `${pct}%` } : { width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.4, ease: [0.2, 0.7, 0.2, 1] }}
      />
    </div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="hero">
      <div className="hero-photo" aria-hidden>
        <Image
          src="/images/hero-banner.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={78}
        />
      </div>
      <div className="hero-grid-bg" aria-hidden />
      <div className="hero-glow" aria-hidden />
      <div className="hero-cols">
        <div>
          <Reveal>
            <p className="eyebrow">▸ KPO delivery // Operations accountability</p>
          </Reveal>
          {reduce ? (
            <h1>
              Offshore operations, <span className="gold">held to the number.</span>
            </h1>
          ) : (
            <motion.h1 initial="hidden" animate="visible" variants={headlineStagger}>
              {LINE_A.map((w, i) => (
                <motion.span key={`a${i}`} variants={wordRise} className="hero-word">
                  {w}&nbsp;
                </motion.span>
              ))}
              <span className="gold">
                {LINE_B.map((w, i) => (
                  <motion.span key={`b${i}`} variants={wordRise} className="hero-word">
                    {w}&nbsp;
                  </motion.span>
                ))}
              </span>
            </motion.h1>
          )}
          <Reveal delay={0.16}>
            <p className="sub">
              A KPO delivery team built by BPO operators. We stand up, recover, and scale customer
              and back-office operations that stay in SLA — and prove it on a dashboard you can
              see.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="hero-ctas">
              <a href="#contact" className="btn btn-primary" data-track="hero_pilot_cta">
                Schedule a pilot consultation →
              </a>
              <a href="#approach" className="btn btn-ghost">
                See how a pilot works
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="scorecard">
            <div className="scorecard-head">
              <span className="mono">Operating scorecard</span>
              <span className="live">LIVE</span>
            </div>
            <div className="scorecard-tiles">
              {gauges.map((g) => {
                const t = tileStyle[g.k] ?? { valClass: "val", barClass: "", barPct: g.count };
                return (
                  <div className="tile" key={g.k}>
                    <div className={t.valClass}>
                      <CountUp end={g.count} prefix={g.prefix} suffix={g.suffix} duration={1500} />
                    </div>
                    <div className="lbl">{tileLabels[g.k] ?? g.k}</div>
                    <Meter pct={t.barPct} green={t.barClass === "green"} />
                  </div>
                );
              })}
            </div>
            <p className="scorecard-note">
              {"// Representative targets — every engagement is baselined to your own KPIs on day one."}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
