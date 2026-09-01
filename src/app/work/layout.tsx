import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work | Sarvopaya",
  description:
    "Real results from real campaigns. Browse Sarvopaya's portfolio of performance marketing, SEO, social media and growth consulting projects.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Our Work | Sarvopaya",
    description:
      "See how Sarvopaya drives measurable results across performance marketing, SEO, and growth strategy for brands across industries.",
    url: "/work",
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
