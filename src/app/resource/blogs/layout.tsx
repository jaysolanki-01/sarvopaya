import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs & Growth Guides | Sarvopaya",
  description:
    "In-depth guides, tactical playbooks, and strategic insights on AI automation, performance marketing, SEO, and business growth from Sarvopaya.",
  alternates: {
    canonical: "https://www.sarvopaya.com/resource/blogs",
    languages: {
      en: "https://www.sarvopaya.com/resource/blogs",
      "x-default": "https://www.sarvopaya.com/resource/blogs",
    },
  },
  openGraph: {
    title: "Blogs & Growth Guides | Sarvopaya",
    description:
      "In-depth guides, tactical playbooks, and strategic insights on AI automation, performance marketing, SEO, and business growth from Sarvopaya.",
    url: "https://www.sarvopaya.com/resource/blogs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs & Growth Guides | Sarvopaya",
    description:
      "In-depth guides, tactical playbooks, and strategic insights on AI automation, performance marketing, SEO, and business growth from Sarvopaya.",
  },
};

export default function BlogsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
