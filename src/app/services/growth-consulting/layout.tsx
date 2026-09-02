import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growth Consulting Agency | GTM Strategy & Digital Audit | Sarvopaya",
  description:
    "Growth consulting for D2C brands, funded startups and scaling businesses. Go-to-market strategy, digital audits, growth roadmaps and ongoing advisory from Sarvopaya.",
  keywords: [
    "growth consulting agency",
    "growth strategy agency India",
    "go to market strategy",
    "digital audit agency",
    "startup growth consulting",
    "business growth advisor",
  ],
  alternates: {
    canonical: "/services/growth-consulting",
    languages: {
      "en": "https://sarvopaya.com/services/growth-consulting",
      "x-default": "https://sarvopaya.com/services/growth-consulting",
    },
  },
  openGraph: {
    title: "Growth Consulting Agency | GTM Strategy | Sarvopaya",
    description:
      "Go-to-market strategy, digital audits and ongoing growth advisory for brands that want to scale with clarity.",
    url: "/services/growth-consulting",
  },
};

export default function GrowthConsultingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
