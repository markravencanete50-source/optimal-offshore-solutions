"use client";

import { useEffect, useRef } from "react";

/**
 * Cloudflare Turnstile widget (CAPTCHA). Renders nothing until
 * NEXT_PUBLIC_TURNSTILE_SITE_KEY is set, so the contact form keeps working
 * before the Cloudflare site is created. Server-side verification lives in
 * /api/contact (TURNSTILE_SECRET_KEY).
 *
 * Remount (change the `key` prop) to issue a fresh challenge after a submit.
 */

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      remove: (id: string) => void;
    };
    __oosTurnstileOnload?: () => void;
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const SCRIPT_ID = "oos-turnstile-script";

export function turnstileEnabled(): boolean {
  return Boolean(SITE_KEY);
}

export default function Turnstile({ onToken }: { onToken: (token: string) => void }) {
  const slotRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;

  useEffect(() => {
    if (!SITE_KEY || !slotRef.current) return;
    let cancelled = false;

    const render = () => {
      if (cancelled || !slotRef.current || !window.turnstile || widgetId.current) return;
      widgetId.current = window.turnstile.render(slotRef.current, {
        sitekey: SITE_KEY,
        theme: "light",
        callback: (token: string) => onTokenRef.current(token),
        "expired-callback": () => onTokenRef.current(""),
        "error-callback": () => onTokenRef.current(""),
      });
    };

    if (window.turnstile) {
      render();
    } else {
      // Load the API script once; chain onload so multiple widgets don't race.
      if (!document.getElementById(SCRIPT_ID)) {
        const s = document.createElement("script");
        s.id = SCRIPT_ID;
        s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=__oosTurnstileOnload";
        s.async = true;
        s.defer = true;
        document.head.appendChild(s);
      }
      const prev = window.__oosTurnstileOnload;
      window.__oosTurnstileOnload = () => {
        prev?.();
        render();
      };
    }

    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetId.current);
        } catch {
          /* widget already gone */
        }
        widgetId.current = null;
      }
    };
  }, []);

  if (!SITE_KEY) return null;
  return <div ref={slotRef} className="turnstile-slot" />;
}
