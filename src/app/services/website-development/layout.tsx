import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Development & High-Converting Digital Platforms | Sarvopaya",
  description:
    "Engineering ultra-fast, custom websites on Next.js, React, and Shopify. Sub-second load speeds, mobile-first CRO architecture, and enterprise technical SEO foundations for scaling brands.",
  alternates: {
    canonical: "/services/website-development",
  },
  openGraph: {
    title: "Website Development & High-Converting Digital Platforms | Sarvopaya",
    description:
      "Custom Next.js & Shopify website development engineered for conversion, speed, and scalable growth. Sub-second load times and technical SEO built-in.",
    url: "/services/website-development",
    type: "website",
    siteName: "Sarvopaya",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Development & High-Converting Digital Platforms | Sarvopaya",
    description:
      "Custom Next.js & Shopify website development engineered for conversion, speed, and scalable growth. Sub-second load times and technical SEO built-in.",
  },
};

export default function WebsiteDevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
