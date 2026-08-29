import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Performance Marketing for D2C Brands | Sarvopaya",
  description:
    "Performance marketing for D2C and ecommerce brands built around tracking, media buying, creative testing, attribution and measurable revenue. Meta Ads, Google Ads, ROAS, CAC, MER, server-side tracking and CRO.",
  alternates: {
    canonical: "/services/performance-marketing",
  },
  openGraph: {
    title: "Performance Marketing for D2C Brands | Sarvopaya",
    description:
      "Performance marketing for D2C brands built around tracking, creative, media buying and measurable revenue outcomes.",
    url: "/services/performance-marketing",
  },
};

export default function PMLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
