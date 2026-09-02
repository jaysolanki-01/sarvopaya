import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Marketing Agency UAE | AI Automation Dubai | Sarvopaya",
  description:
    "Sarvopaya is a digital marketing and AI automation agency serving UAE and Dubai businesses. MENA digital expertise, bilingual English–Arabic capability and Gulf market knowledge.",
  keywords: [
    "digital marketing agency UAE",
    "AI automation agency Dubai",
    "performance marketing UAE",
    "digital marketing agency Dubai",
    "marketing agency UAE",
    "social media marketing UAE",
    "SEO agency Dubai",
    "AI automation UAE",
  ],
  alternates: {
    canonical: "https://sarvopaya.com/locations/uae",
    languages: {
      en: "https://sarvopaya.com/locations/uae",
      "x-default": "https://sarvopaya.com/locations/uae",
    },
  },
};

export default function UAELayout({ children }: { children: React.ReactNode }) {
  return children;
}
