import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Sarvopaya | Creative Media, Technology & AI Company Ahmedabad",
  description:
    "Sarvopaya is a creative media, technology and AI company from Ahmedabad, India. One integrated team. Three disciplines. Complete digital solutions for ambitious brands.",
  alternates: {
    canonical: "/about",
    languages: {
      "en": "https://sarvopaya.com/about",
      "x-default": "https://sarvopaya.com/about",
    },
  },
  openGraph: {
    title: "About Sarvopaya | Creative Media, Technology & AI",
    description:
      "Built for brands that refuse to stand still. Sarvopaya combines creative media, technology and AI into one complete growth system.",
    url: "/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
