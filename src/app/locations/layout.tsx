import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Countries We Serve | International Markets | Sarvopaya",
  description:
    "Sarvopaya delivers AI automation, performance marketing and digital growth to businesses in the USA, UK, UAE, Saudi Arabia, Australia, Canada, Singapore and beyond.",
  keywords: [
    "AI automation agency international",
    "digital marketing agency global",
    "AI automation agency USA",
    "digital marketing agency UAE",
    "AI automation agency UK",
    "growth marketing agency international",
    "Indian marketing agency global",
  ],
  alternates: {
    canonical: "https://sarvopaya.com/locations",
    languages: {
      en: "https://sarvopaya.com/locations",
      "x-default": "https://sarvopaya.com/locations",
    },
  },
};

export default function LocationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
