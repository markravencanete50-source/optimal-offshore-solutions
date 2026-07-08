import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

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
