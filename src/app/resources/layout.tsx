import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Resources & Blog | Sarvopaya",
  description:
    "In-depth guides, playbooks and insights on AI automation, performance marketing, SEO, and business growth from the Sarvopaya team.",
  alternates: {
    canonical: "/resources",
    languages: {
      "en": "https://sarvopaya.com/resources",
      "x-default": "https://sarvopaya.com/resources",
    },
  },
  openGraph: {
    title: "Marketing Resources & Blog | Sarvopaya",
    description:
      "Explore websites, AI automation, SEO, and custom software case studies Sarvopaya has delivered for startups, SMEs, and D2C brands.",
    url: "/resources",
  },
};

export default function ResourcesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
