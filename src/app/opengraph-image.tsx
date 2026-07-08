import { ImageResponse } from "next/og";

// Branded social-share card shown when the link is pasted anywhere.
// Mirrors the light "operating scorecard" hero — warm off-white + gold.
export const runtime = "edge";
export const alt = "Optimal Offshore Solutions — Offshore operations, held to the number.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#F7F5F0";
const INK = "#1C2434";
const MUTED = "#5C6470";
const GOLD = "#E4B04A";
const GOLD_INK = "#96700F";
const LINE = "rgba(26,34,51,0.14)";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: PAPER,
          backgroundImage:
            "linear-gradient(rgba(26,34,51,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(26,34,51,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          padding: "72px 80px",
        }}
      >
        {/* brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 8,
              backgroundColor: GOLD,
              color: "#2A2210",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            OS
          </div>
          <div style={{ color: INK, fontSize: 30, fontWeight: 600, letterSpacing: -0.5 }}>
            Optimal Offshore Solutions
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: GOLD_INK,
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 2, backgroundColor: GOLD, display: "flex" }} />
            KPO Delivery // Operations Accountability
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 82, lineHeight: 1.05, color: INK, fontWeight: 700, letterSpacing: -2 }}>
            <span>Offshore operations,&nbsp;held to&nbsp;</span>
            <span style={{ color: GOLD_INK }}>the number.</span>
          </div>
        </div>

        {/* footer */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ width: "100%", height: 1, backgroundColor: LINE, display: "flex" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ color: MUTED, fontSize: 24 }}>
              Scalable, SLA-accountable customer &amp; back-office operations.
            </div>
            <div style={{ color: GOLD_INK, fontSize: 22, letterSpacing: 2 }}>
              optimaloffshoresolutions.com
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
