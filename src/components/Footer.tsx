import { company } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="foot">
          <div>
            <a href="#top" className="brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="mark" src="/logo-mark.png" alt="Optimal Offshore Solutions" />
              {company.short}
            </a>
            <p className="tag">{company.tagline}</p>
          </div>
          <div className="foot-cols">
            <div className="foot-col">
              <h4>Services</h4>
              <a href="#services">Offshore Setup</a>
              <a href="#services">Program Recovery</a>
              <a href="#services">Workforce Strategy</a>
              <a href="#services">Customer Support</a>
            </div>
            <div className="foot-col">
              <h4>Company</h4>
              <a href="#approach">Approach</a>
              <a href="#team">Team</a>
              <a href="#contact">Contact</a>
              <a href="#contact">Book a pilot</a>
            </div>
            <div className="foot-col">
              <h4>Get started</h4>
              <a href="#contact">Book a pilot</a>
              <p>{company.email}</p>
              <p>{company.location}</p>
            </div>
          </div>
        </div>
        <div className="foot-base">
          <span>© {new Date().getFullYear()} {company.name}</span>
          <span>{company.serving}</span>
        </div>
      </div>
    </footer>
  );
}
