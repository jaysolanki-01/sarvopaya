import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growth Strategy Consulting for Scaling Brands | Sarvopaya",
  description:
    "Scale with mathematical precision. Our Growth Strategy consulting designs custom 6-12 month revenue expansion models, unit economics optimization, channel sequencing, and high-velocity experiment loops.",
  alternates: {
    canonical: "/services/growth-strategy",
  },
  openGraph: {
    title: "Growth Strategy Consulting for Scaling Brands | Sarvopaya",
    description:
      "A 6–12 month revenue roadmap built on unit economics, channel prioritisation, and experiment velocity. Built by operators who manage scale.",
    url: "/services/growth-strategy",
    type: "website",
    siteName: "Sarvopaya",
  },
  twitter: {
    card: "summary_large_image",
    title: "Growth Strategy Consulting for Scaling Brands | Sarvopaya",
    description:
      "A 6–12 month revenue roadmap built on unit economics, channel prioritisation, and experiment velocity. Built by operators who manage scale.",
  },
};

export default function GrowthStrategyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
