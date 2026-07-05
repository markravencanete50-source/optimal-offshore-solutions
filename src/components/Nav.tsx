"use client";

import { useEffect, useState } from "react";
import { company } from "@/lib/content";

const links = [
  { href: "#services", label: "Services" },
  { href: "#approach", label: "Approach" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site${scrolled ? " scrolled" : ""}`}>
      <div className="wrap nav">
        <a href="#top" className="brand">
          <span className="glyph" />
          {company.short}
        </a>
        <nav className={`navlinks${open ? " open" : ""}`}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn btn-primary" onClick={() => setOpen(false)}>
            Book a pilot →
          </a>
        </nav>
        <button
          className="navtoggle"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
