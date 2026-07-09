import Reveal from "./Reveal";

type Crumb = { href: string; label: string };

/**
 * Shared hero for standalone pages (/services/*, /approach, /why-us, /team,
 * /book-a-pilot). Same "operating scorecard" voice as the homepage hero:
 * mono eyebrow, two-tone headline with a gold accent, muted sub.
 */
export default function PageHero({
  kicker,
  headline,
  sub,
  crumbs,
  children,
}: {
  kicker: string;
  headline: [string, string];
  sub: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="hero-grid-bg" aria-hidden />
      <div className="hero-glow" aria-hidden />
      <div className="page-hero-inner">
        {crumbs && (
          <Reveal>
            <nav className="crumbs" aria-label="Breadcrumb">
              {crumbs.map((c, i) => (
                <span key={c.href}>
                  {i > 0 && <span className="crumb-sep">/</span>}
                  <a href={c.href}>{c.label}</a>
                </span>
              ))}
            </nav>
          </Reveal>
        )}
        <Reveal delay={0.05}>
          <p className="eyebrow">{kicker}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1>
            {headline[0]} <span className="gold">{headline[1]}</span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="sub">{sub}</p>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
