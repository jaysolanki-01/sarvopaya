import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Sarvopaya",
  description:
    "Explore Sarvopaya's full range of digital growth services — lead generation, SEO, website development, AI & automation, and growth consulting.",
  alternates: {
    canonical: "/services",
    languages: {
      en: "https://www.sarvopaya.com/services",
      "x-default": "https://www.sarvopaya.com/services",
    },
  },
  openGraph: {
    title: "Services | Sarvopaya",
    description:
      "Explore Sarvopaya's full range of digital growth services — lead generation, SEO, website development, AI & automation, and growth consulting.",
    url: "/services",
  },
};

export default function ServicesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
