import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Need More Leads? AI-Powered Lead Generation | Sarvopaya",
  description:
    "Struggling to generate quality leads? Sarvopaya builds AI-powered lead generation systems across paid search, social, SEO and content — turning traffic into predictable pipeline.",
  alternates: {
    canonical: "/solutions/need-more-leads",
    languages: {
      en: "https://sarvopaya.com/solutions/need-more-leads",
      "x-default": "https://sarvopaya.com/solutions/need-more-leads",
    },
  },
  openGraph: {
    title: "Need More Leads? AI-Powered Lead Generation | Sarvopaya",
    description:
      "AI-powered lead generation systems that build predictable pipeline across paid, organic and content channels.",
    url: "/solutions/need-more-leads",
  },
};

export default function SolutionsNeedMoreLeadsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
