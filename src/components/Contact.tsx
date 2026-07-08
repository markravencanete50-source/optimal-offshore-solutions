"use client";

import { useState, type FormEvent } from "react";
import Reveal from "./Reveal";
import { track } from "./Tracker";
import { company, industries } from "@/lib/content";

type Status = "idle" | "submitting" | "ok" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Submission failed.");

      setStatus("ok");
      track("lead_submitted", "contact_form");
      setMessage(
        `Thanks, ${data.firstName || "there"} — we've got it. Expect a reply within one business day.`,
      );
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <section className="contact-band" id="contact">
      <div className="cta-grid">
        <div className="cta-copy">
          <Reveal>
            <p className="eyebrow">▸ Get started</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2>Your pilot starts with a conversation.</h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="lead">
              Tell us the program you&apos;re worried about. We&apos;ll come back with how a low-risk
              pilot would work, and the exact metrics we&apos;d hold ourselves to.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="contact-lines">
              <span>{company.email}</span>
              <span>
                {company.location} · {company.serving}
              </span>
              <span className="ok-line">{"// We reply within one business day. No spam, ever."}</span>
            </div>
          </Reveal>
        </div>

        <Reveal className="form" delay={0.16}>
            <form onSubmit={onSubmit} noValidate>
              {status === "ok" && <div className="notice ok">{message}</div>}
              {status === "error" && <div className="notice err">{message}</div>}

              {/* honeypot — hidden from real users */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
                aria-hidden="true"
              />

              <div className="row">
                <div className="field">
                  <label htmlFor="firstName">First name</label>
                  <input id="firstName" name="firstName" type="text" placeholder="Jordan" required />
                </div>
                <div className="field">
                  <label htmlFor="email">Work email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="field">
                  <label htmlFor="company">Company</label>
                  <input id="company" name="company" type="text" placeholder="Acme Corp" required />
                </div>
                <div className="field">
                  <label htmlFor="industry">Industry</label>
                  <select id="industry" name="industry" defaultValue={industries[0]}>
                    {industries.map((i) => (
                      <option key={i}>{i}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor="challenge">What are you trying to fix or scale?</label>
                <textarea
                  id="challenge"
                  name="challenge"
                  placeholder="e.g. Our support queue keeps breaking SLA during peak…"
                />
              </div>
              <button className="btn btn-primary" type="submit" disabled={status === "submitting"}>
                {status === "submitting"
                  ? "Sending…"
                  : "Schedule a pilot consultation →"}
              </button>
              <p className="fineprint">
                We reply within one business day. No spam, ever.
              </p>
            </form>
          </Reveal>
      </div>
    </section>
  );
}
