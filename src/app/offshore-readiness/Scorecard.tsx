"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Turnstile, { turnstileEnabled } from "@/components/Turnstile";
import { track } from "@/components/Tracker";
import { readiness as c, industries } from "@/lib/content";
import {
  sections,
  allStatementIds,
  bandFor,
  POINTS_PER_STATEMENT,
  TOTAL_POINTS,
  type SectionKey,
} from "@/lib/readiness";

const STORAGE_KEY = "oos_readiness_answers";

type Answers = Record<string, boolean>;

function loadAnswers(): Answers {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const out: Answers = {};
    for (const id of allStatementIds) {
      if (typeof parsed[id] === "boolean") out[id] = parsed[id] as boolean;
    }
    return out;
  } catch {
    return {};
  }
}

/** Gold digits that tick on change — instant under reduced motion. */
function ScoreDigits({ value, reduce }: { value: number; reduce: boolean }) {
  if (reduce) return <span className="rdy-score-num">{value}</span>;
  return (
    <motion.span
      key={value}
      className="rdy-score-num"
      initial={{ y: 8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {value}
    </motion.span>
  );
}

type GateStatus = "idle" | "submitting" | "ok" | "error";

export default function Scorecard() {
  const reduce = useReducedMotion() ?? false;
  const [answers, setAnswers] = useState<Answers>({});
  const [hydrated, setHydrated] = useState(false);
  const startedRef = useRef(false);
  const completedRef = useRef(false);

  // sessionStorage restore (after mount, so SSR HTML stays deterministic).
  useEffect(() => {
    const restored = loadAnswers();
    if (Object.keys(restored).length) {
      setAnswers(restored);
      startedRef.current = true; // don't re-fire scorecard_start on refresh
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {
      /* private mode — the score still works, it just won't survive refresh */
    }
  }, [answers, hydrated]);

  const answered = allStatementIds.filter((id) => id in answers).length;
  const complete = answered === allStatementIds.length;
  const score = allStatementIds.filter((id) => answers[id] === true).length * POINTS_PER_STATEMENT;
  const band = bandFor(score);

  const sectionScores = useMemo(() => {
    const out = {} as Record<SectionKey, number>;
    for (const s of sections) {
      out[s.key] =
        s.statements.filter((q) => answers[q.id] === true).length * POINTS_PER_STATEMENT;
    }
    return out;
  }, [answers]);

  useEffect(() => {
    if (complete && !completedRef.current) {
      completedRef.current = true;
      track("scorecard_complete", String(score));
    }
  }, [complete, score]);

  function answer(id: string, value: boolean) {
    if (!startedRef.current) {
      startedRef.current = true;
      track("scorecard_start");
    }
    setAnswers((a) => ({ ...a, [id]: value }));
  }

  // Mobile bottom bar shows only while the assessment itself is on screen.
  // rAF-throttled scroll check rather than IntersectionObserver — same cost
  // in practice, and it can't be starved by a busy main thread on load.
  const bandRef = useRef<HTMLDivElement>(null);
  const [barVisible, setBarVisible] = useState(false);
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const el = bandRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setBarVisible(r.top < window.innerHeight - 80 && r.bottom > 160);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* ── gate form ── */
  const [gateStatus, setGateStatus] = useState<GateStatus>("idle");
  const [gateMessage, setGateMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaEpoch, setCaptchaEpoch] = useState(0);

  async function onGateSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (turnstileEnabled() && !captchaToken) {
      setGateStatus("error");
      setGateMessage("Please complete the verification below, then submit again.");
      return;
    }
    setGateStatus("submitting");
    setGateMessage("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/readiness-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          turnstileToken: captchaToken,
          readinessScore: score,
          readinessBand: band.slug,
          sectionScores,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Submission failed.");
      setGateStatus("ok");
      track("lead_submitted", "readiness_gate");
      form.reset();
    } catch (err) {
      setGateStatus("error");
      setGateMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setCaptchaToken("");
      setCaptchaEpoch((n) => n + 1);
    }
  }

  const railStatus = complete ? band.label : `${answered} / 20 answered`;

  return (
    <>
      {/* ── the assessment — the one light band on the page ── */}
      <div className="rdy-band" id="scorecard" ref={bandRef}>
        <div className="rdy-inner">
          <p className="rdy-eyebrow ink">▸ {c.scorecard.kicker}</p>
          <h2 className="rdy-band-title">{c.scorecard.title}</h2>
          <p className="rdy-band-instruction">{c.scorecard.instruction}</p>

          <div className="rdy-band-grid">
            <form className="rdy-questions" onSubmit={(e) => e.preventDefault()}>
              {sections.map((s) => (
                <fieldset className="rdy-section" key={s.key}>
                  <legend>
                    <span className="rdy-section-num">{s.num} //</span> {s.title}
                    <span className="rdy-section-score">{sectionScores[s.key]} / 25</span>
                  </legend>
                  <p className="rdy-section-frame">{s.frame}</p>
                  {s.statements.map((q) => {
                    const a = answers[q.id];
                    return (
                      <div
                        className="rdy-q"
                        key={q.id}
                        role="radiogroup"
                        aria-labelledby={`ql-${q.id}`}
                      >
                        <span className="rdy-q-text" id={`ql-${q.id}`}>
                          {q.text}
                        </span>
                        <span className="rdy-q-opts">
                          <label className={`rdy-opt${a === true ? " on" : ""}`}>
                            <input
                              type="radio"
                              name={q.id}
                              value="yes"
                              checked={a === true}
                              onChange={() => answer(q.id, true)}
                            />
                            True
                          </label>
                          <label className={`rdy-opt no${a === false ? " on" : ""}`}>
                            <input
                              type="radio"
                              name={q.id}
                              value="no"
                              checked={a === false}
                              onChange={() => answer(q.id, false)}
                            />
                            False
                          </label>
                        </span>
                      </div>
                    );
                  })}
                </fieldset>
              ))}
            </form>

            {/* sticky rail — desktop; box dimensions reserved so nothing shifts */}
            <aside className="rdy-rail" aria-live="polite">
              <div className="rdy-rail-card">
                <div className="rdy-rail-head">
                  <span className="rdy-rail-label">{c.scorecard.yourScore}</span>
                  <span className="live">LIVE</span>
                </div>
                <div className="rdy-score">
                  <ScoreDigits value={score} reduce={reduce} />
                  <span className="rdy-score-of">/ {TOTAL_POINTS}</span>
                </div>
                <div className="rdy-rail-band">{railStatus}</div>
                <div className="rdy-rail-meter" aria-hidden>
                  <span style={{ width: `${(answered / allStatementIds.length) * 100}%` }} />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* mobile sticky score bar */}
      <div
        className={`rdy-bar${barVisible ? " show" : ""}`}
        aria-hidden={!barVisible}
      >
        <span className="rdy-bar-label">
          <span className="live">LIVE</span>
          {c.scorecard.yourScore}
        </span>
        <span className="rdy-bar-score">
          <ScoreDigits value={score} reduce={reduce} />
          <span className="rdy-score-of">/ {TOTAL_POINTS}</span>
        </span>
        <span className="rdy-bar-band">{railStatus}</span>
      </div>

      {/* ── your band — revealed on completion, always ungated ── */}
      <section className="rdy-result" id="result">
        <div className="rdy-inner">
          {!complete ? (
            <p className="rdy-result-placeholder">{c.scorecard.resultPlaceholder}</p>
          ) : (
            <>
              <div className="rdy-result-score">
                <span className="rdy-result-num">{score}</span>
                <span className="rdy-result-of">/ {TOTAL_POINTS}</span>
              </div>
              <p className="rdy-result-band">{band.label}</p>
              <p className="rdy-result-diagnosis">{band.diagnosis}</p>

              <div className="rdy-wins">
                <p className="rdy-eyebrow">▸ {c.scorecard.quickWinsTitle}</p>
                <p className="rdy-wins-note">{c.scorecard.quickWinsNote}</p>
                <ol className="rdy-wins-list">
                  {band.quickWins.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ol>
              </div>

              {/* ── the gate — the only gated thing on the page ── */}
              <div className="rdy-gate">
                <h3>{c.gate.title}</h3>
                <p className="rdy-gate-body">{c.gate.body}</p>

                {gateStatus === "ok" ? (
                  <div className="rdy-gate-ok" role="status">
                    <p className="rdy-gate-sent">{c.gate.success}</p>
                    <p>{c.gate.successBody}</p>
                    <a
                      href="/oos-offshore-readiness-scorecard.pdf"
                      className="btn btn-primary"
                      download
                    >
                      {c.gate.downloadLabel}
                    </a>
                  </div>
                ) : (
                  <form onSubmit={onGateSubmit} noValidate>
                    {gateStatus === "error" && (
                      <div className="rdy-gate-err" role="alert">
                        {gateMessage}
                      </div>
                    )}
                    {/* honeypot — hidden from real users */}
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
                      aria-hidden="true"
                    />
                    <div className="rdy-gate-row">
                      <div className="rdy-field">
                        <label htmlFor="rdy-firstName">First name</label>
                        <input id="rdy-firstName" name="firstName" type="text" required />
                      </div>
                      <div className="rdy-field">
                        <label htmlFor="rdy-email">Work email</label>
                        <input id="rdy-email" name="email" type="email" required />
                      </div>
                    </div>
                    <div className="rdy-gate-row">
                      <div className="rdy-field">
                        <label htmlFor="rdy-company">Company</label>
                        <input id="rdy-company" name="company" type="text" required />
                      </div>
                      <div className="rdy-field">
                        <label htmlFor="rdy-industry">Industry</label>
                        <select id="rdy-industry" name="industry" defaultValue={industries[0]}>
                          {industries.map((i) => (
                            <option key={i}>{i}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <Turnstile key={captchaEpoch} onToken={setCaptchaToken} />
                    <button
                      className="btn btn-primary"
                      type="submit"
                      disabled={gateStatus === "submitting"}
                    >
                      {gateStatus === "submitting" ? "Sending…" : c.gate.button}
                    </button>
                    <p className="rdy-fineprint">{c.gate.fineprint}</p>
                  </form>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
