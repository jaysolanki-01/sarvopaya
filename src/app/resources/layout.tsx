import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies & Work",
  description:
    "Explore websites, AI automation, SEO, and custom software case studies Sarvopaya has delivered for startups, SMEs, and D2C brands.",
  alternates: {
    canonical: "/resources",
  },
  openGraph: {
    title: "Case Studies & Work | Sarvopaya",
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
