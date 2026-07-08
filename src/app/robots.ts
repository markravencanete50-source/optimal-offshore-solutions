import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * Generates /robots.txt — allows all crawlers, blocks the API route, and
 * points search engines to the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
