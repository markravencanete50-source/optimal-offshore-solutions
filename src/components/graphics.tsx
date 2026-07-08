import type { ReactNode } from "react";

/**
 * Hand-built inline SVG "schematic" motifs, one per service (keyed by service
 * id). They stand in for the operations photography the client is still
 * sourcing — crisp gold-on-warm line art that matches the light scorecard
 * palette, so the cards never ship with broken or empty image slots.
 *
 * Palette: gold #E4B04A / deep gold #96700F, ink hairlines rgba(26,34,51,…),
 * signal green #178A5B, on the warm tint the .svc-art container provides.
 */

const GOLD = "#E4B04A";
const GOLD_DEEP = "#96700F";
const GREEN = "#178A5B";
const INK_FAINT = "rgba(26,34,51,0.14)";
const INK_SOFT = "rgba(26,34,51,0.28)";

const vizProps = {
  viewBox: "0 0 340 150",
  width: "100%",
  height: "100%",
  preserveAspectRatio: "xMidYMid slice" as const,
  style: { display: "block" as const },
  "aria-hidden": true,
  focusable: false,
};

/* Shared faint baseline grid so every motif sits on the same "chart paper". */
function Grid() {
  return (
    <g stroke={INK_FAINT} strokeWidth="1">
      <line x1="0" y1="38" x2="340" y2="38" />
      <line x1="0" y1="75" x2="340" y2="75" />
      <line x1="0" y1="112" x2="340" y2="112" />
    </g>
  );
}

export const serviceMotifs: Record<string, ReactNode> = {
  // S1 — Offshore Setup & Expansion: bars ramping up as a site goes live
  S1: (
    <svg {...vizProps}>
      <Grid />
      <rect x="52" y="104" width="30" height="28" rx="3" fill={GOLD} opacity="0.35" />
      <rect x="100" y="86" width="30" height="46" rx="3" fill={GOLD} opacity="0.55" />
      <rect x="148" y="64" width="30" height="68" rx="3" fill={GOLD} opacity="0.75" />
      <rect x="196" y="42" width="30" height="90" rx="3" fill={GOLD} />
      <rect x="244" y="22" width="30" height="110" rx="3" fill={GOLD_DEEP} opacity="0.85" />
      <line x1="36" y1="132" x2="304" y2="132" stroke={INK_SOFT} strokeWidth="1.5" />
    </svg>
  ),

  // S2 — Program Recovery: line dips out of SLA, then recovers above target
  S2: (
    <svg {...vizProps}>
      <Grid />
      <line x1="24" y1="56" x2="316" y2="56" stroke={GOLD_DEEP} strokeWidth="1" strokeDasharray="6 6" opacity="0.6" />
      <path
        d="M24 62 C 70 68, 92 118, 130 116 C 158 114, 172 96, 200 76 C 228 56, 262 40, 316 34"
        fill="none"
        stroke={GOLD_DEEP}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="130" cy="116" r="5" fill="#FFFFFF" stroke={GOLD_DEEP} strokeWidth="2.5" />
      <circle cx="316" cy="34" r="5" fill={GREEN} />
    </svg>
  ),

  // S3 — HR & Workforce Strategy: staffed shift blocks across a volume curve
  S3: (
    <svg {...vizProps}>
      <Grid />
      <path
        d="M24 108 C 80 108, 96 44, 170 44 C 244 44, 260 96, 316 96"
        fill="none"
        stroke={INK_SOFT}
        strokeWidth="2"
        strokeDasharray="2 5"
        strokeLinecap="round"
      />
      {[
        { x: 52, y: 92 }, { x: 96, y: 66 }, { x: 140, y: 48 },
        { x: 184, y: 48 }, { x: 228, y: 64 }, { x: 272, y: 84 },
      ].map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="9" fill={i === 2 || i === 3 ? GOLD : "#FFFFFF"} stroke={GOLD_DEEP} strokeWidth="2" />
          <path d={`M${p.x - 12} ${p.y + 26} a12 12 0 0 1 24 0`} fill="none" stroke={GOLD_DEEP} strokeWidth="2" opacity="0.7" />
        </g>
      ))}
    </svg>
  ),

  // S4 — Multichannel Support: channel lines converging into one queue
  S4: (
    <svg {...vizProps}>
      <Grid />
      {[30, 60, 90, 120].map((y, i) => (
        <path
          key={y}
          d={`M24 ${y} C 110 ${y}, 150 75, 210 75`}
          fill="none"
          stroke={i === 1 ? GOLD_DEEP : GOLD}
          strokeWidth="2.5"
          opacity={i === 1 ? 0.9 : 0.55}
          strokeLinecap="round"
        />
      ))}
      <circle cx="240" cy="75" r="18" fill="#FFFFFF" stroke={GOLD_DEEP} strokeWidth="2.5" />
      <circle cx="240" cy="75" r="7" fill={GOLD} />
      <line x1="258" y1="75" x2="316" y2="75" stroke={GREEN} strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),

  // S5 — Technical & Healthcare Ops: clinical pulse trace
  S5: (
    <svg {...vizProps}>
      <Grid />
      <path
        d="M24 75 H 96 L 116 75 L 132 34 L 152 118 L 168 58 L 182 75 H 244"
        fill="none"
        stroke={GOLD_DEEP}
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M244 75 H 316" fill="none" stroke={GREEN} strokeWidth="3" strokeLinecap="round" strokeDasharray="1 10" />
      <circle cx="244" cy="75" r="5" fill={GREEN} />
    </svg>
  ),

  // S6 — Data Analysis & Reporting: dashboard tiles with sparkline
  S6: (
    <svg {...vizProps}>
      <Grid />
      <rect x="36" y="26" width="128" height="60" rx="8" fill="#FFFFFF" stroke={INK_SOFT} strokeWidth="1.5" />
      <path d="M50 70 L 74 56 L 96 62 L 120 40 L 148 46" fill="none" stroke={GOLD_DEEP} strokeWidth="2.5" strokeLinecap="round" />
      <rect x="176" y="26" width="60" height="60" rx="8" fill="#FFFFFF" stroke={INK_SOFT} strokeWidth="1.5" />
      <rect x="188" y="58" width="10" height="18" rx="2" fill={GOLD} />
      <rect x="203" y="46" width="10" height="30" rx="2" fill={GOLD} />
      <rect x="218" y="38" width="10" height="38" rx="2" fill={GOLD_DEEP} />
      <rect x="36" y="98" width="200" height="26" rx="8" fill="#FFFFFF" stroke={INK_SOFT} strokeWidth="1.5" />
      <rect x="44" y="107" width="120" height="8" rx="4" fill={GOLD} opacity="0.85" />
      <rect x="248" y="26" width="60" height="98" rx="8" fill="#FFFFFF" stroke={INK_SOFT} strokeWidth="1.5" />
      <circle cx="278" cy="60" r="18" fill="none" stroke={GOLD} strokeWidth="6" strokeDasharray="84 30" strokeLinecap="round" transform="rotate(-90 278 60)" />
      <rect x="262" y="94" width="32" height="6" rx="3" fill={INK_SOFT} />
      <rect x="262" y="106" width="22" height="6" rx="3" fill={INK_FAINT} />
    </svg>
  ),

  // S7 — Research & Insights: scatter field with a fitted trend
  S7: (
    <svg {...vizProps}>
      <Grid />
      {[
        [50, 108], [74, 92], [96, 100], [118, 78], [142, 84], [162, 64],
        [186, 70], [208, 52], [232, 58], [256, 40], [280, 46],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4.5" fill={i % 3 === 0 ? GOLD_DEEP : GOLD} opacity={i % 3 === 0 ? 0.9 : 0.6} />
      ))}
      <line x1="40" y1="114" x2="300" y2="36" stroke={GOLD_DEEP} strokeWidth="2" strokeDasharray="7 6" opacity="0.75" />
      <circle cx="256" cy="40" r="14" fill="none" stroke={GREEN} strokeWidth="2.5" />
    </svg>
  ),

  // S8 — Process Documentation & SOPs: stacked playbook pages with checks
  S8: (
    <svg {...vizProps}>
      <Grid />
      <rect x="112" y="34" width="132" height="104" rx="8" fill={GOLD} opacity="0.18" transform="rotate(-4 178 86)" />
      <rect x="104" y="26" width="132" height="108" rx="8" fill="#FFFFFF" stroke={INK_SOFT} strokeWidth="1.5" />
      {[48, 68, 88, 108].map((y, i) => (
        <g key={y}>
          <path d={`M120 ${y} l4 4 l7 -8`} fill="none" stroke={i < 3 ? GREEN : INK_SOFT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="140" y={y - 4} width={i === 1 ? 66 : 82} height="7" rx="3.5" fill={i < 3 ? INK_SOFT : INK_FAINT} opacity="0.7" />
        </g>
      ))}
      <rect x="252" y="58" width="52" height="44" rx="8" fill="#FFFFFF" stroke={GOLD_DEEP} strokeWidth="1.5" strokeDasharray="5 4" />
      <path d="M266 80 h24 M278 68 v24" stroke={GOLD_DEEP} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};
