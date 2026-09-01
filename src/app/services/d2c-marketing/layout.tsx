import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "D2C Marketing Agency India | Performance Marketing | Sarvopaya",
  description:
    "Sarvopaya is a D2C marketing agency in India. We build performance marketing systems for direct-to-consumer brands — tracking infrastructure, Meta Ads, Google Ads, creative testing, attribution and revenue optimization.",
  keywords: [
    "D2C marketing agency",
    "D2C marketing agency India",
    "performance marketing for D2C brands",
    "D2C performance marketing",
    "direct to consumer marketing agency",
    "Meta Ads for D2C",
    "Google Ads for ecommerce",
  ],
  alternates: {
    canonical: "/services/d2c-marketing",
  },
  openGraph: {
    title: "D2C Marketing Agency India | Performance Marketing | Sarvopaya",
    description:
      "Sarvopaya is a D2C marketing agency in India. Performance marketing built around tracking, creative testing, media buying and measurable revenue for D2C brands.",
    url: "/services/d2c-marketing",
  },
};

export default function PMLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
