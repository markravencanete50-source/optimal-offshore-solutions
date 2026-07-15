import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { ScrollProgress } from "@/components/motion";
import Tracker from "@/components/Tracker";
import { company, team } from "@/lib/content";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const sans = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Optimal Offshore Solutions — Offshore operations, held to the number",
  description:
    "A KPO delivery team built by BPO operators. We stand up, recover, and scale customer and back-office operations that stay in SLA — and prove it on a dashboard you can see.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "KPO",
    "BPO",
    "offshore operations",
    "customer support outsourcing",
    "program recovery",
    "workforce management",
    "healthcare operations",
  ],
  openGraph: {
    title: "Optimal Offshore Solutions",
    description:
      "Offshore operations, held to the number. Scalable, SLA-accountable KPO delivery for global clients.",
    url: siteUrl,
    siteName: "Optimal Offshore Solutions",
    type: "website",
    // Static file (not a runtime-generated route) so Facebook/WhatsApp/LinkedIn
    // scrapers always get the card image. Kept ~100KB — WhatsApp skips large images.
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Optimal Offshore Solutions — Your Growth. Our Expertise. Stronger Together.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Optimal Offshore Solutions",
    description: "Offshore operations, held to the number.",
    images: ["/og-image.jpg"],
  },
};

// Organization structured data (JSON-LD) so search engines can associate the
// name, logo, location and contact details — eligible for rich results.
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  alternateName: company.short,
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  image: `${siteUrl}/og-image.jpg`,
  description:
    "A KPO delivery team built by BPO operators. We stand up, recover, and scale customer and back-office operations that stay in SLA — and prove it on a dashboard you can see.",
  email: company.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bohol",
    addressCountry: "PH",
  },
  areaServed: ["US", "APAC"],
  founder: team.map((t) => ({
    "@type": "Person",
    name: t.name,
    jobTitle: t.position,
    url: `${siteUrl}/team`,
  })),
  knowsAbout: [
    "Knowledge Process Outsourcing",
    "Business Process Outsourcing",
    "Customer support outsourcing",
    "Program recovery",
    "Workforce management",
    "Healthcare operations",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: company.salesEmail,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable}`}
      suppressHydrationWarning /* admin theme script sets data-adm-theme on <html> pre-hydration */
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <ScrollProgress background="linear-gradient(90deg,#96700F,#E4B04A)" />
        <Tracker />
        {children}
      </body>
    </html>
  );
}
