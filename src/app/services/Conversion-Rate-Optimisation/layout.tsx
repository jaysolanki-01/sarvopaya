import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conversion Rate Optimisation (CRO) Agency & Services | Sarvopaya",
  description:
    "Turn existing traffic into compounding revenue. Our data-driven Conversion Rate Optimisation (CRO) services identify funnel drop-offs, eliminate checkout friction, and run scientific A/B tests to double your revenue without increasing ad spend.",
  alternates: {
    canonical: "/services/Conversion-Rate-Optimisation",
  },
  openGraph: {
    title: "Conversion Rate Optimisation (CRO) Agency & Services | Sarvopaya",
    description:
      "Data-driven Conversion Rate Optimisation (CRO) for D2C brands, ecommerce, and scaling digital platforms. Fix leaky funnels and maximize revenue per visitor.",
    url: "/services/Conversion-Rate-Optimisation",
    type: "website",
    siteName: "Sarvopaya",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conversion Rate Optimisation (CRO) Agency & Services | Sarvopaya",
    description:
      "Data-driven Conversion Rate Optimisation (CRO) for D2C brands, ecommerce, and scaling digital platforms. Fix leaky funnels and maximize revenue per visitor.",
  },
};

export default function ConversionRateOptimisationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
