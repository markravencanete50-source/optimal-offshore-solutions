import Link from "next/link";
import { company } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="foot">
          <div className="brand-blurb">
            <Link href="/" className="brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="mark" src="/logo-mark.png" alt="Optimal Offshore Solutions" />
              {company.short}
            </Link>
            <p className="tag">{company.tagline}</p>
          </div>
          <div className="foot-cols">
            <div className="foot-col">
              <h4>Services</h4>
              <Link href="/services/offshore-setup-and-expansion">Offshore Setup</Link>
              <Link href="/services/program-recovery">Program Recovery</Link>
              <Link href="/services/workforce-strategy">Workforce Strategy</Link>
              <Link href="/services/customer-support-outsourcing">Customer Support</Link>
              <Link href="/services">All nine services →</Link>
            </div>
            <div className="foot-col">
              <h4>Company</h4>
              <Link href="/approach">Approach</Link>
              <Link href="/why-us">Why us</Link>
              <Link href="/team">Team</Link>
              <Link href="/book-a-pilot">Contact</Link>
            </div>
            <div className="foot-col">
              <h4>Get started</h4>
              <Link href="/book-a-pilot" className="gold">
                Book a pilot →
              </Link>
              <Link href="/offshore-readiness">Free offshore assessment</Link>
              <p>{company.email}</p>
              <p>{company.location}</p>
            </div>
          </div>
        </div>
        <div className="foot-base">
          <span>
            © {new Date().getFullYear()} {company.name}
          </span>
          <span className="foot-base-end">
            {company.location} · {company.serving}
            <a href="/admin" className="foot-admin">
              Admin
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
