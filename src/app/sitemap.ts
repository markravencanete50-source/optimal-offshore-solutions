import type { MetadataRoute } from "next";

// Same origin convention as layout.tsx. Set NEXT_PUBLIC_APP_URL in the
// environment (Vercel) to the canonical production URL.
const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://optimaloffshoresolutions.com";

/**
 * Generates /sitemap.xml. The site is a single-page homepage — its sections
 * (#services, #approach, #team, #contact) are in-page anchors, not separate
 * indexable URLs, so the sitemap lists the one canonical page.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
