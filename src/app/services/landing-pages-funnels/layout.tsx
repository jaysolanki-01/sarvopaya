import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "High-Converting Landing Pages & Funnels Design | Sarvopaya",
  description:
    "Turn paid ad clicks into buyers with custom, high-converting landing pages and funnel architectures. Engineered for 100% message match, sub-second load times, and maximum ROAS on Meta and Google Ads.",
  alternates: {
    canonical: "/services/landing-pages-funnels",
  },
  openGraph: {
    title: "High-Converting Landing Pages & Funnels Design | Sarvopaya",
    description:
      "Bespoke campaign landing pages, advertorials, multi-step lead funnels, and post-purchase upsells engineered to multiply ad ROAS and conversion rates.",
    url: "/services/landing-pages-funnels",
    type: "website",
    siteName: "Sarvopaya",
  },
  twitter: {
    card: "summary_large_image",
    title: "High-Converting Landing Pages & Funnels Design | Sarvopaya",
    description:
      "Bespoke campaign landing pages, advertorials, multi-step lead funnels, and post-purchase upsells engineered to multiply ad ROAS and conversion rates.",
  },
};

export default function LandingPagesFunnelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
