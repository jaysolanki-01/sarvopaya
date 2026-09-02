import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Automation & Digital Marketing Agency Singapore | Sarvopaya",
  description:
    "Sarvopaya is an AI automation and digital marketing agency serving Singapore businesses. Fintech marketing, ASEAN digital strategy, multilingual campaigns and AI workflow automation for Singapore.",
  keywords: [
    "AI automation agency Singapore",
    "digital marketing agency Singapore",
    "fintech marketing Singapore",
    "performance marketing Singapore",
    "ASEAN digital marketing",
    "marketing automation Singapore",
    "SEO agency Singapore",
    "growth marketing Singapore",
  ],
  alternates: {
    canonical: "https://sarvopaya.com/locations/singapore",
    languages: {
      en: "https://sarvopaya.com/locations/singapore",
      "x-default": "https://sarvopaya.com/locations/singapore",
    },
  },
};

export default function SingaporeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
