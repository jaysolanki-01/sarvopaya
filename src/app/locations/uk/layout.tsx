import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Automation Agency UK | Digital Marketing | Sarvopaya",
  description:
    "Sarvopaya is an AI automation and digital marketing agency serving UK businesses. GDPR-compliant automation, performance marketing and SEO at India pricing without London overhead.",
  keywords: [
    "AI automation agency UK",
    "digital marketing agency UK",
    "SEO agency UK",
    "marketing automation agency UK",
    "performance marketing UK",
    "growth marketing agency UK",
    "GDPR compliant automation UK",
  ],
  alternates: {
    canonical: "https://sarvopaya.com/locations/uk",
    languages: {
      en: "https://sarvopaya.com/locations/uk",
      "x-default": "https://sarvopaya.com/locations/uk",
    },
  },
};

export default function UKLayout({ children }: { children: React.ReactNode }) {
  return children;
}
