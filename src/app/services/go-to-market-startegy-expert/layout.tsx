import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Go-To-Market (GTM) Strategy Experts | Sarvopaya",
  description:
    "Partner with Sarvopaya's Go-to-Market (GTM) strategy experts. First-principles ICP validation, positioning, pricing, and multi-channel launch execution for D2C brands, tech startups, and scaling businesses.",
  alternates: {
    canonical: "/services/go-to-market-startegy-expert",
  },
  openGraph: {
    title: "Go-To-Market (GTM) Strategy Experts | Sarvopaya",
    description:
      "First-principles GTM strategy, ICP qualification, category positioning, and 90-day launch execution roadmaps that generate Day-1 pipeline.",
    url: "/services/go-to-market-startegy-expert",
    type: "website",
    siteName: "Sarvopaya",
  },
  twitter: {
    card: "summary_large_image",
    title: "Go-To-Market (GTM) Strategy Experts | Sarvopaya",
    description:
      "First-principles GTM strategy, ICP qualification, category positioning, and 90-day launch execution roadmaps that generate Day-1 pipeline.",
  },
};

export default function GtmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
