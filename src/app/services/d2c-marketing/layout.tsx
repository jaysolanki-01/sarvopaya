import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "D2C Marketing Agency India | Performance Marketing | Sarvopaya",
  },
  description:
    "Sarvopaya is a premier D2C marketing agency in India. We engineer full-funnel performance marketing, tracking infrastructure, creative testing & customer retention.",
  keywords: [
    "D2C marketing agency",
    "D2C marketing agency India",
    "performance marketing for D2C brands",
    "D2C performance marketing",
    "direct to consumer marketing strategy",
    "customer retention for D2C brands",
    "D2C ecommerce marketing",
    "Meta Ads for D2C",
    "Google Ads for ecommerce",
    "server-side tracking CAPI",
    "CAC and ROAS optimization",
    "D2C unit economics",
    "ecommerce growth agency",
  ],
  authors: [{ name: "Jay Solanki", url: "https://www.sarvopaya.com/about" }],
  creator: "Sarvopaya",
  publisher: "Sarvopaya",
  alternates: {
    canonical: "https://www.sarvopaya.com/services/d2c-marketing",
    languages: {
      "en": "https://www.sarvopaya.com/services/d2c-marketing",
      "x-default": "https://www.sarvopaya.com/services/d2c-marketing",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Sarvopaya",
    title: "D2C Marketing Agency India | Performance Marketing Systems | Sarvopaya",
    description:
      "Full-funnel D2C marketing agency in India. Server-side tracking, creative testing, multi-channel media buying, customer retention and measurable net revenue.",
    url: "https://www.sarvopaya.com/services/d2c-marketing",
    images: [
      {
        url: "https://www.sarvopaya.com/images/Main_icon.png",
        width: 1200,
        height: 630,
        alt: "Sarvopaya - D2C Marketing Agency India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "D2C Marketing Agency India | Performance Marketing Systems | Sarvopaya",
    description:
      "Full-funnel D2C marketing agency in India. Server-side tracking, creative testing, multi-channel media buying, customer retention and measurable net revenue.",
    images: ["https://www.sarvopaya.com/images/Main_icon.png"],
    creator: "@sarvopaya",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Marketing & Advertising",
};

export default function PMLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
