import Reveal from "./Reveal";
import { company } from "@/lib/content";

/**
 * Closing conversion band used on every standalone page — mirrors the final
 * slide of the pitch carousels: headline, promise, contact lines, one CTA
 * into /book-a-pilot.
 */
export default function CtaBand({
  title,
  body,
  button = "Book a pilot",
}: {
  title: string;
  body: string;
  button?: string;
}) {
  return (
    <section className="cta-band">
      <div className="cta-band-inner">
        <Reveal>
          <p className="eyebrow">▸ Start with a pilot</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2>{title}</h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="lead">{body}</p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="cta-band-actions">
            <a href="/book-a-pilot" className="btn btn-primary" data-track="cta_band_book_pilot">
              {button} →
            </a>
            <span className="mono cta-band-note">We reply within one business day</span>
          </div>
        </Reveal>
        <Reveal delay={0.26}>
          <div className="contact-lines">
            <span>{company.email}</span>
            <span>
              {company.location} · {company.serving}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
