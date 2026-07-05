import type { Metadata } from "next";
import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
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

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://optimaloffshore.com";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
