/**
 * Single source of truth for the canonical site origin used by metadata,
 * sitemap.xml, robots.txt and JSON-LD.
 *
 * The Vercel domain redirects the apex (non-www) and http to
 * https://www.optimaloffshoresolutions.com, so www IS the canonical origin.
 * Everything the crawler reads must match it, or Google reports
 * "Page with redirect" and rejects the sitemap.
 *
 * NEXT_PUBLIC_APP_URL may be set (e.g. to the apex, or to localhost in dev),
 * so we normalize: any *.optimaloffshoresolutions.com apex is forced to www.
 * Non-production hosts (localhost, previews) are left untouched.
 */
function normalizeSiteUrl(raw: string): string {
  try {
    const url = new URL(raw);
    if (url.hostname === "optimaloffshoresolutions.com") {
      url.hostname = "www.optimaloffshoresolutions.com";
    }
    // Drop any trailing slash so downstream code appends paths predictably.
    return url.origin;
  } catch {
    return "https://www.optimaloffshoresolutions.com";
  }
}

export const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_APP_URL || "https://www.optimaloffshoresolutions.com",
);
