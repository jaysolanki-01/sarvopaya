import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Marketing Agency Saudi Arabia | Sarvopaya",
  description:
    "Sarvopaya is a digital marketing and AI automation agency serving Saudi Arabian businesses. Snapchat Ads, Arabic content, Vision 2030 digital growth and performance marketing for KSA.",
  keywords: [
    "digital marketing agency Saudi Arabia",
    "AI automation KSA",
    "performance marketing Saudi Arabia",
    "Snapchat Ads Saudi Arabia",
    "digital marketing agency KSA",
    "marketing agency Saudi Arabia",
    "social media marketing KSA",
    "SEO agency Saudi Arabia",
  ],
  alternates: {
    canonical: "https://sarvopaya.com/locations/saudi-arabia",
    languages: {
      en: "https://sarvopaya.com/locations/saudi-arabia",
      "x-default": "https://sarvopaya.com/locations/saudi-arabia",
    },
  },
};

export default function SaudiArabiaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
