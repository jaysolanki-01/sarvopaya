import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Automation Agency USA | Growth Marketing | Sarvopaya",
  description:
    "Sarvopaya is an AI automation and growth marketing agency serving US businesses. Enterprise-quality AI workflows, performance marketing and SEO at competitive India pricing.",
  keywords: [
    "AI automation agency USA",
    "marketing automation agency USA",
    "digital marketing agency USA",
    "AI automation agency United States",
    "growth marketing agency USA",
    "performance marketing agency USA",
    "Indian marketing agency USA",
  ],
  alternates: {
    canonical: "https://sarvopaya.com/locations/usa",
    languages: {
      en: "https://sarvopaya.com/locations/usa",
      "x-default": "https://sarvopaya.com/locations/usa",
    },
  },
};

export default function USALayout({ children }: { children: React.ReactNode }) {
  return children;
}
