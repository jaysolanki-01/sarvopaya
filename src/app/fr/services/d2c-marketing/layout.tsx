import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Agence Marketing D2C | Performance Marketing | Sarvopaya",
  },
  description:
    "Sarvopaya est une agence marketing D2C de premier plan. Nous construisons des systèmes de performance marketing full-funnel, d'infrastructure de tracking, de test créatif et de rétention client.",
  keywords: [
    "agence marketing D2C",
    "performance marketing D2C",
    "direct to consumer marketing",
    "marketing e-commerce D2C",
    "Meta Ads D2C",
    "Google Ads e-commerce",
    "tracking server-side CAPI",
    "optimisation ROAS",
    "agence croissance e-commerce",
    "marketing marques D2C",
  ],
  authors: [{ name: "Jay Solanki", url: "https://www.sarvopaya.com/about" }],
  creator: "Sarvopaya",
  publisher: "Sarvopaya",
  alternates: {
    canonical: "https://www.sarvopaya.com/fr/services/d2c-marketing",
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
    locale: "fr_FR",
    siteName: "Sarvopaya",
    title: "Agence Marketing D2C | Systèmes de Performance Marketing | Sarvopaya",
    description:
      "Agence marketing D2C full-funnel. Tracking server-side, test créatif, achat média multi-canal, rétention client et chiffre d'affaires net mesurable.",
    url: "https://www.sarvopaya.com/fr/services/d2c-marketing",
    images: [
      {
        url: "https://www.sarvopaya.com/images/Main_icon.png",
        width: 1200,
        height: 630,
        alt: "Sarvopaya - Agence Marketing D2C",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agence Marketing D2C | Systèmes de Performance Marketing | Sarvopaya",
    description:
      "Agence marketing D2C full-funnel. Tracking server-side, test créatif, achat média multi-canal, rétention client et chiffre d'affaires net mesurable.",
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
