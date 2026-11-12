import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "D2C Marketing Bureau | Performance Marketing | Sarvopaya",
  },
  description:
    "Sarvopaya is een toonaangevend D2C-marketingbureau. Wij bouwen full-funnel performance marketing, tracking-infrastructuur, creative testing en klantbehoud systemen.",
  keywords: [
    "D2C marketing bureau",
    "performance marketing D2C",
    "direct to consumer marketing",
    "D2C e-commerce marketing",
    "Meta Ads D2C",
    "Google Ads e-commerce",
    "server-side tracking CAPI",
    "ROAS optimalisatie",
    "e-commerce groei bureau",
    "D2C merken marketing",
  ],
  authors: [{ name: "Jay Solanki", url: "https://www.sarvopaya.com/about" }],
  creator: "Sarvopaya",
  publisher: "Sarvopaya",
  alternates: {
    canonical: "https://www.sarvopaya.com/nl/services/d2c-marketing",
    languages: {
      "x-default": "https://www.sarvopaya.com/services/d2c-marketing",
      "en-IN": "https://www.sarvopaya.com/services/d2c-marketing",
      "en-US": "https://www.sarvopaya.com/en-us/services/d2c-marketing",
      "en-GB": "https://www.sarvopaya.com/en-gb/services/d2c-marketing",
      "en-AE": "https://www.sarvopaya.com/en-ae/services/d2c-marketing",
      "hi": "https://www.sarvopaya.com/hi/services/d2c-marketing",
      "de": "https://www.sarvopaya.com/de/services/d2c-marketing",
      "nl": "https://www.sarvopaya.com/nl/services/d2c-marketing",
      "fr": "https://www.sarvopaya.com/fr/services/d2c-marketing",
      "pt": "https://www.sarvopaya.com/pt/services/d2c-marketing",
    },
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "Sarvopaya",
    title: "D2C Marketing Bureau | Performance Marketing Systemen | Sarvopaya",
    description:
      "Full-funnel D2C-marketingbureau. Server-side tracking, creative testing, multi-channel media-inkoop, klantbehoud en meetbare netto-omzet.",
    url: "https://www.sarvopaya.com/nl/services/d2c-marketing",
    images: [
      {
        url: "https://www.sarvopaya.com/images/Main_icon.png",
        width: 1200,
        height: 630,
        alt: "Sarvopaya - D2C Marketing Bureau",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "D2C Marketing Bureau | Performance Marketing Systemen | Sarvopaya",
    description:
      "Full-funnel D2C-marketingbureau. Server-side tracking, creative testing, multi-channel media-inkoop, klantbehoud en meetbare netto-omzet.",
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
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
