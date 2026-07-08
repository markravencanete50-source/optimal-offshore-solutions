import { marqueeIndustries } from "@/lib/content";

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <div className="marquee-row" aria-hidden={hidden}>
      {marqueeIndustries.map((name) => (
        <span key={name} style={{ display: "contents" }}>
          <span>{name.toUpperCase()}</span>
          <span className="sep" aria-hidden>
            ✳
          </span>
        </span>
      ))}
    </div>
  );
}

/**
 * Infinitely scrolling industry strip. The track holds two identical rows and
 * translates −50%, so the loop is seamless; the second row is aria-hidden and
 * the whole strip pauses on hover / reduced-motion (see globals.css).
 */
export default function Marquee() {
  return (
    <div className="marquee" role="marquee" aria-label="Industries we serve">
      <div className="marquee-track">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
