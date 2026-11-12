import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Agência de Marketing D2C | Performance Marketing | Sarvopaya",
  },
  description:
    "Sarvopaya é uma agência de marketing D2C líder. Desenvolvemos sistemas de performance marketing full-funnel, infraestrutura de rastreamento, testes criativos e retenção de clientes.",
  keywords: [
    "agência marketing D2C",
    "performance marketing D2C",
    "marketing direto ao consumidor",
    "marketing e-commerce D2C",
    "Meta Ads D2C",
    "Google Ads e-commerce",
    "rastreamento server-side CAPI",
    "otimização ROAS",
    "agência crescimento e-commerce",
    "marketing marcas D2C",
  ],
  authors: [{ name: "Jay Solanki", url: "https://www.sarvopaya.com/about" }],
  creator: "Sarvopaya",
  publisher: "Sarvopaya",
  alternates: {
    canonical: "https://www.sarvopaya.com/pt/services/d2c-marketing",
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
    locale: "pt_BR",
    siteName: "Sarvopaya",
    title: "Agência de Marketing D2C | Sistemas de Performance Marketing | Sarvopaya",
    description:
      "Agência de marketing D2C full-funnel. Rastreamento server-side, testes criativos, compra de mídia multicanal, retenção de clientes e receita líquida mensurável.",
    url: "https://www.sarvopaya.com/pt/services/d2c-marketing",
    images: [
      {
        url: "https://www.sarvopaya.com/images/Main_icon.png",
        width: 1200,
        height: 630,
        alt: "Sarvopaya - Agência de Marketing D2C",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agência de Marketing D2C | Sistemas de Performance Marketing | Sarvopaya",
    description:
      "Agência de marketing D2C full-funnel. Rastreamento server-side, testes criativos, compra de mídia multicanal, retenção de clientes e receita líquida mensurável.",
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
