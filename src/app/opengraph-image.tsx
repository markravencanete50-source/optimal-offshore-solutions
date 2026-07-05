import { ImageResponse } from "next/og";

// Branded social-share card shown when the link is pasted anywhere.
// Deliberately NO team photos — mirrors the hero, not anyone's face.
export const runtime = "edge";
export const alt = "Optimal Offshore Solutions — Offshore operations, held to the number.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#111827";
const GOLD = "#E6C04B";
const GOLD_DEEP = "#D4AF37";
const MUTED = "#94A7B5";
const LINE = "#2A3547";

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
          backgroundColor: INK,
          backgroundImage: "linear-gradient(135deg, #16203050 0%, #0e1622 100%)",
          padding: "72px 80px",
        }}
      >
        {/* brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              border: `2px solid #FFFFFF`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: "50%", border: `2px solid ${GOLD_DEEP}` }} />
          </div>
          <div style={{ color: "#FFFFFF", fontSize: 30, fontWeight: 600, letterSpacing: -0.5 }}>
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
              color: MUTED,
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 2, backgroundColor: GOLD, display: "flex" }} />
            KPO Delivery // Operations Accountability
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 82, lineHeight: 1.05, color: "#FFFFFF" }}>
            <span>Offshore operations,&nbsp;held to&nbsp;</span>
            <span style={{ color: GOLD }}>the number.</span>
          </div>
        </div>

        {/* footer */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ width: "100%", height: 1, backgroundColor: LINE, display: "flex" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ color: MUTED, fontSize: 24 }}>
              Scalable, SLA-accountable customer &amp; back-office operations.
            </div>
            <div style={{ color: GOLD_DEEP, fontSize: 22, letterSpacing: 2 }}>optimaloffshore.com</div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
