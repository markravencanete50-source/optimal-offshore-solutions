import type { ReactNode } from "react";

/**
 * Hand-built inline SVG "instrument-panel" motifs, one per service (keyed by
 * service id) plus the three core-value icons. Geometry copied verbatim from
 * the design handoff reference so the marks stay crisp and theme-correct.
 * Palette: #E6C04B gold, #46586A muted, panel #141B21, grid #1e2b34.
 */

const vizProps = {
  viewBox: "0 0 340 152",
  width: "100%",
  height: "100%",
  style: { display: "block" as const },
  "aria-hidden": true,
  focusable: false,
};

export const serviceMotifs: Record<string, ReactNode> = {
  // S1 — rising bars, gold gradient
  S1: (
    <svg {...vizProps}>
      <line x1="40" y1="132" x2="300" y2="132" stroke="#2C3842" strokeWidth="1" />
      <rect x="52" y="98" width="34" height="34" fill="#8A6E28" />
      <rect x="102" y="76" width="34" height="56" fill="#B08C34" />
      <rect x="152" y="52" width="34" height="80" fill="#D4AF37" />
      <rect x="202" y="28" width="34" height="104" fill="#E6C04B" />
      <rect x="252" y="10" width="34" height="122" fill="#F0D165" />
    </svg>
  ),
  // S2 — line dips then recovers, gold node at peak
  S2: (
    <svg {...vizProps}>
      <line x1="20" y1="132" x2="320" y2="132" stroke="#2C3842" strokeWidth="1" strokeDasharray="3 5" />
      <polyline
        points="24,58 74,58 116,112 150,96 196,74 244,50 300,34"
        fill="none"
        stroke="#E6C04B"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="116" cy="112" r="5" fill="#141B21" stroke="#7C8F9C" strokeWidth="2" />
      <circle cx="300" cy="34" r="5" fill="#E6C04B" />
    </svg>
  ),
  // S3 — roster of 6 avatar dots + coverage bar
  S3: (
    <svg {...vizProps}>
      <circle cx="54" cy="60" r="13" fill="#E6C04B" />
      <circle cx="98" cy="60" r="13" fill="#46586A" />
      <circle cx="142" cy="60" r="13" fill="#E6C04B" />
      <circle cx="186" cy="60" r="13" fill="#E6C04B" />
      <circle cx="230" cy="60" r="13" fill="#46586A" />
      <circle cx="274" cy="60" r="13" fill="#E6C04B" />
      <rect x="54" y="104" width="232" height="8" rx="4" fill="#22303A" />
      <rect x="54" y="104" width="176" height="8" rx="4" fill="#E6C04B" />
    </svg>
  ),
  // S4 — channel waveform + 3 gold crest dots
  S4: (
    <svg {...vizProps}>
      <polyline
        points="20,88 46,66 72,88 98,110 124,88 150,66 176,88 202,110 228,88 254,66 280,88 306,110 320,99"
        fill="none"
        stroke="#46586A"
        strokeWidth="2"
      />
      <circle cx="46" cy="66" r="5" fill="#E6C04B" />
      <circle cx="150" cy="66" r="5" fill="#E6C04B" />
      <circle cx="254" cy="66" r="5" fill="#E6C04B" />
    </svg>
  ),
  // S5 — ECG pulse line + small plus mark
  S5: (
    <svg {...vizProps}>
      <line x1="16" y1="88" x2="330" y2="88" stroke="#2C3842" strokeWidth="1" />
      <polyline
        points="16,88 92,88 108,88 118,50 128,120 138,88 210,88 236,88 246,62 256,106 266,88 330,88"
        fill="none"
        stroke="#E6C04B"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <rect x="300" y="40" width="6" height="26" rx="2" fill="#46586A" />
      <rect x="290" y="50" width="26" height="6" rx="2" fill="#46586A" />
    </svg>
  ),
  // S6 — bar chart + gold gauge arc
  S6: (
    <svg {...vizProps}>
      <rect x="34" y="88" width="22" height="44" fill="#46586A" />
      <rect x="66" y="64" width="22" height="68" fill="#46586A" />
      <rect x="98" y="80" width="22" height="52" fill="#46586A" />
      <rect x="130" y="44" width="22" height="88" fill="#E6C04B" />
      <path d="M196,122 A52,52 0 0 1 300,122" fill="none" stroke="#22303A" strokeWidth="8" />
      <path d="M196,122 A52,52 0 0 1 284,76" fill="none" stroke="#E6C04B" strokeWidth="8" strokeLinecap="round" />
    </svg>
  ),
  // S7 — scatter dots + magnifier
  S7: (
    <svg {...vizProps}>
      <circle cx="44" cy="62" r="4" fill="#46586A" />
      <circle cx="72" cy="98" r="4" fill="#46586A" />
      <circle cx="98" cy="54" r="4" fill="#E6C04B" />
      <circle cx="120" cy="86" r="4" fill="#46586A" />
      <circle cx="150" cy="66" r="4" fill="#46586A" />
      <circle cx="176" cy="104" r="4" fill="#46586A" />
      <circle cx="150" cy="112" r="4" fill="#46586A" />
      <circle cx="70" cy="66" r="4" fill="#46586A" />
      <circle cx="250" cy="70" r="30" fill="none" stroke="#E6C04B" strokeWidth="3" />
      <line x1="272" y1="92" x2="300" y2="118" stroke="#E6C04B" strokeWidth="4" strokeLinecap="round" />
    </svg>
  ),
  // S8 — 3 connected nodes with checkmarks
  S8: (
    <svg {...vizProps}>
      <line x1="100" y1="80" x2="142" y2="80" stroke="#33434E" strokeWidth="2" strokeDasharray="3 4" />
      <line x1="196" y1="80" x2="240" y2="80" stroke="#33434E" strokeWidth="2" strokeDasharray="3 4" />
      <rect x="44" y="60" width="56" height="40" rx="6" fill="#1B252D" stroke="#33434E" />
      <rect x="142" y="60" width="56" height="40" rx="6" fill="#1B252D" stroke="#33434E" />
      <rect x="240" y="60" width="56" height="40" rx="6" fill="#1B252D" stroke="#33434E" />
      <polyline points="62,80 70,88 84,70" fill="none" stroke="#E6C04B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="160,80 168,88 182,70" fill="none" stroke="#E6C04B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="258,80 266,88 280,70" fill="none" stroke="#E6C04B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export const coreValueIcons: Record<string, ReactNode> = {
  // concentric target + center dot
  excellence: (
    <svg width="40" height="40" viewBox="0 0 40 40" style={{ flex: "none" }} aria-hidden focusable={false}>
      <circle cx="20" cy="20" r="15" fill="none" stroke="#94700F" strokeWidth="2" />
      <circle cx="20" cy="20" r="8" fill="none" stroke="#E6C04B" strokeWidth="2" />
      <circle cx="20" cy="20" r="2.5" fill="#94700F" />
    </svg>
  ),
  // check inside a ring
  integrity: (
    <svg width="40" height="40" viewBox="0 0 40 40" style={{ flex: "none" }} aria-hidden focusable={false}>
      <circle cx="20" cy="20" r="15" fill="none" stroke="#94700F" strokeWidth="2" />
      <polyline points="13,20 18,25 27,14" fill="none" stroke="#E6C04B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  // 4-point spark + center dot
  innovation: (
    <svg width="40" height="40" viewBox="0 0 40 40" style={{ flex: "none" }} aria-hidden focusable={false}>
      <line x1="20" y1="8" x2="20" y2="32" stroke="#94700F" strokeWidth="2" />
      <line x1="8" y1="20" x2="32" y2="20" stroke="#94700F" strokeWidth="2" />
      <line x1="12" y1="12" x2="28" y2="28" stroke="#E6C04B" strokeWidth="2" />
      <line x1="28" y1="12" x2="12" y2="28" stroke="#E6C04B" strokeWidth="2" />
      <circle cx="20" cy="20" r="3" fill="#E6C04B" />
    </svg>
  ),
};
