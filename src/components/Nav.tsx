"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { company } from "@/lib/content";

const links = [
  { href: "/services", label: "Services" },
  { href: "/approach", label: "Approach" },
  { href: "/why-us", label: "Why us" },
  { href: "/offshore-readiness", label: "Assessment" },
  { href: "/team", label: "Team" },
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
        <Link href="/" className="brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="mark" src="/logo-mark.png" alt="Optimal Offshore Solutions" />
          {company.short}
        </Link>
        <nav className={`navlinks${open ? " open" : ""}`}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link
            href="/book-a-pilot"
            className="btn btn-primary"
            data-track="nav_book_pilot"
            onClick={() => setOpen(false)}
          >
            Book a pilot →
          </Link>
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
