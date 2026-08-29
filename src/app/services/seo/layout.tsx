import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Services | Search Visibility Agency | Sarvopaya",
  description:
    "SEO, AEO, and GEO services that improve your visibility across Google, AI Search, and every modern discovery surface. Technical SEO, content strategy, topical authority, and entity optimisation for brands that want to be found, understood, and chosen.",
  alternates: {
    canonical: "/services/seo",
  },
  openGraph: {
    title: "SEO Services | Search Visibility Agency | Sarvopaya",
    description:
      "SEO, AEO, and GEO services that improve your visibility across Google, AI Search, and every modern discovery surface.",
    url: "/services/seo",
  },
};

export default function SeoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
