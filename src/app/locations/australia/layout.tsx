import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Automation & Digital Marketing Agency Australia | Sarvopaya",
  description:
    "Sarvopaya is an AI automation and digital marketing agency serving Australian businesses. D2C e-commerce, performance marketing and AI workflows, India expertise at AEST-compatible hours.",
  keywords: [
    "AI automation agency Australia",
    "digital marketing agency Australia",
    "performance marketing Australia",
    "growth marketing agency Australia",
    "e-commerce marketing Australia",
    "marketing automation Australia",
    "SEO agency Australia",
  ],
  alternates: {
    canonical: "https://www.sarvopaya.com/locations/australia",
    languages: {
      en: "https://www.sarvopaya.com/locations/australia",
      "x-default": "https://www.sarvopaya.com/locations/australia",
    },
  },
};

export default function AustraliaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
