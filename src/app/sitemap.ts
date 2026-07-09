import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { servicePages } from "@/lib/servicePages";

/**
 * Generates /sitemap.xml — homepage, the four company pages, the services
 * index, and one entry per service detail page.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/approach`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/why-us`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/team`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/book-a-pilot`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];

  const serviceDetail: MetadataRoute.Sitemap = servicePages.map((s) => ({
    url: `${siteUrl}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: s.flagship ? 0.9 : 0.8,
  }));

  return [...staticPages, ...serviceDetail];
}
