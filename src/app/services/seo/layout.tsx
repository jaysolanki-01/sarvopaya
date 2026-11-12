import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Services | Search Visibility Agency | Sarvopaya",
  description:
    "SEO, AEO, and GEO services that improve your visibility across Google, AI Search, and every modern discovery surface. Technical SEO, content strategy, topical authority, and entity optimisation for brands that want to be found, understood, and chosen.",
  alternates: {
    canonical: "/services/seo",
    languages: {
      "en": "https://www.sarvopaya.com/services/seo",
      "x-default": "https://www.sarvopaya.com/services/seo",
    },
  },
  openGraph: {
    title: "SEO Services | Search Visibility Agency | Sarvopaya",
    description:
      "SEO, AEO, and GEO services that improve your visibility across Google, AI Search, and every modern discovery surface.",
    url: "/services/seo",
    images: [
      {
        url: "https://www.sarvopaya.com/images/seo-og.webp",
        width: 1512,
        height: 756,
        alt: "Be Found. Be Understood. Be Chosen. — SEO, AEO & GEO by Sarvopaya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Services | Search Visibility Agency | Sarvopaya",
    description:
      "SEO, AEO, and GEO services that improve your visibility across Google, AI Search, and every modern discovery surface.",
    images: ["https://www.sarvopaya.com/images/seo-og.webp"],
  },
};

export default function SeoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
