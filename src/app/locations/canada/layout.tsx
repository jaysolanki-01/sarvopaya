import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Automation & Digital Marketing Agency Canada | Sarvopaya",
  description:
    "Sarvopaya is an AI automation and digital marketing agency serving Canadian businesses. SaaS growth, D2C e-commerce, French–English bilingual capability and performance marketing for Canada.",
  keywords: [
    "AI automation agency Canada",
    "digital marketing agency Canada",
    "performance marketing Canada",
    "growth marketing Canada",
    "SaaS marketing agency Canada",
    "marketing automation Canada",
    "digital marketing agency Toronto",
    "digital marketing agency Vancouver",
  ],
  alternates: {
    canonical: "https://sarvopaya.com/locations/canada",
    languages: {
      en: "https://sarvopaya.com/locations/canada",
      "x-default": "https://sarvopaya.com/locations/canada",
    },
  },
};

export default function CanadaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
