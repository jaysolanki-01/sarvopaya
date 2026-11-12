import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "D2C Marketing Agentur | Performance Marketing | Sarvopaya",
  },
  description:
    "Sarvopaya ist eine führende D2C-Marketing-Agentur. Wir entwickeln Full-Funnel-Performance-Marketing, Tracking-Infrastruktur, Creative-Testing und Kundenbindungssysteme.",
  keywords: [
    "D2C Marketing Agentur",
    "Performance Marketing D2C",
    "Direct to Consumer Marketing",
    "D2C E-Commerce Marketing",
    "Meta Ads D2C",
    "Google Ads E-Commerce",
    "server-side tracking CAPI",
    "ROAS Optimierung",
    "E-Commerce Wachstum Agentur",
    "D2C Marken Marketing",
  ],
  authors: [{ name: "Jay Solanki", url: "https://www.sarvopaya.com/about" }],
  creator: "Sarvopaya",
  publisher: "Sarvopaya",
  alternates: {
    canonical: "https://www.sarvopaya.com/de/services/d2c-marketing",
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
    locale: "de_DE",
    siteName: "Sarvopaya",
    title: "D2C Marketing Agentur | Performance Marketing Systeme | Sarvopaya",
    description:
      "Full-Funnel D2C-Marketing-Agentur. Server-seitiges Tracking, Creative-Testing, Multi-Channel-Media-Buying, Kundenbindung und messbarer Nettoumsatz.",
    url: "https://www.sarvopaya.com/de/services/d2c-marketing",
    images: [
      {
        url: "https://www.sarvopaya.com/images/Main_icon.png",
        width: 1200,
        height: 630,
        alt: "Sarvopaya - D2C Marketing Agentur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "D2C Marketing Agentur | Performance Marketing Systeme | Sarvopaya",
    description:
      "Full-Funnel D2C-Marketing-Agentur. Server-seitiges Tracking, Creative-Testing, Multi-Channel-Media-Buying, Kundenbindung und messbarer Nettoumsatz.",
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
