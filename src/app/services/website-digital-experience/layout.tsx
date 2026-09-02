import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Development & Digital Experience | Sarvopaya",
  description:
    "Website development, CRO, and landing page design for brands that want a site that converts. We build fast, modern, conversion-focused websites using Next.js, React and Shopify.",
  keywords: [
    "website development agency India",
    "conversion rate optimisation",
    "landing page design",
    "Next.js website development",
    "Shopify development",
    "CRO agency India",
    "website design and development",
  ],
  alternates: {
    canonical: "/services/website-digital-experience",
    languages: {
      "en": "https://sarvopaya.com/services/website-digital-experience",
      "x-default": "https://sarvopaya.com/services/website-digital-experience",
    },
  },
  openGraph: {
    title: "Website Development & Digital Experience | Sarvopaya",
    description:
      "Fast, conversion-focused website development, CRO and landing pages. Built for brands that want a digital presence that drives revenue.",
    url: "/services/website-digital-experience",
  },
};

export default function WebsiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
