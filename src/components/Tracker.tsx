"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * First-party, cookie-free analytics beacon. Records pageviews, clicks on
 * "book a pilot" CTAs (any `a[href="#contact"]` or element with [data-track]),
 * and successful lead submissions into the `events` Firestore collection via
 * /api/track — surfaced on the /admin dashboard.
 */

function sessionId(): string {
  try {
    let sid = sessionStorage.getItem("oos_sid");
    if (!sid) {
      sid = crypto.randomUUID();
      sessionStorage.setItem("oos_sid", sid);
    }
    return sid;
  } catch {
    return "no-storage";
  }
}

export function track(type: "pageview" | "cta_click" | "lead_submitted", label = "") {
  try {
    const payload = JSON.stringify({
      type,
      label,
      path: window.location.pathname,
      ref: document.referrer,
      sid: sessionId(),
    });
    // sendBeacon survives page unloads; fall back to keepalive fetch.
    if (!navigator.sendBeacon?.("/api/track", new Blob([payload], { type: "application/json" }))) {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Analytics must never break the site.
  }
}

export default function Tracker() {
  const pathname = usePathname();

  // One pageview per route (admin pages excluded — don't count ourselves).
  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;
    track("pageview");
  }, [pathname]);

  // Delegated CTA listener: any link to #contact or explicit [data-track].
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as Element | null)?.closest?.('[data-track], a[href="#contact"]');
      if (!el) return;
      track("cta_click", el.getAttribute("data-track") || "contact_cta");
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
