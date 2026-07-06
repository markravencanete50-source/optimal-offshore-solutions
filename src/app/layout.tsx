import type { Metadata } from "next";
import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { ScrollProgress } from "@/components/motion";
import { company } from "@/lib/content";
import "./globals.css";

const serif = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
  adjustFontFallback: false,
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://optimaloffshoresolutions.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Optimal Offshore Solutions — Offshore operations, held to the number",
  description:
    "A KPO delivery team built by BPO operators. We stand up, recover, and scale customer and back-office operations that stay in SLA — and prove it on a dashboard you can see.",
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Optimal Offshore Solutions",
    description: "Offshore operations, held to the number.",
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
  image: `${siteUrl}/opengraph-image`,
  description:
    "A KPO delivery team built by BPO operators. We stand up, recover, and scale customer and back-office operations that stay in SLA — and prove it on a dashboard you can see.",
  email: company.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bohol",
    addressCountry: "PH",
  },
  areaServed: ["US", "APAC"],
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
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
