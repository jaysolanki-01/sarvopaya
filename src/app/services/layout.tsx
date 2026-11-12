import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | Digital Growth, Marketing & AI Automation",
  description:
    "Explore Sarvopaya's full suite of digital growth services — performance advertising, SEO, website development, AI automation, D2C marketing, and growth consulting for scaling businesses.",
  keywords: [
    "digital marketing services India",
    "AI automation services",
    "performance advertising agency",
    "SEO agency India",
    "website development agency",
    "growth consulting services",
    "D2C marketing agency",
  ],
  alternates: {
    canonical: "/services",
    languages: {
      en: "https://www.sarvopaya.com/services",
      "x-default": "https://www.sarvopaya.com/services",
    },
  },
  openGraph: {
    title: "Our Services | Sarvopaya — Digital Growth Agency",
    description:
      "Performance advertising, SEO, website development, AI automation and growth consulting. One partner, every growth lever.",
    url: "/services",
  },
};

export default function ServicesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
