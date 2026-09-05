import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Need More Leads? Find the Buyers You Already Have | Sarvopaya",
  description:
    "Your website already has high-intent visitors. Sarvopaya uses AI to identify buying signals, qualify opportunities and trigger the right action before the opportunity disappears.",
  alternates: {
    canonical: "/solutions/need-more-leads",
    languages: {
      "en": "https://sarvopaya.com/solutions/need-more-leads",
      "x-default": "https://sarvopaya.com/solutions/need-more-leads",
    },
  },
  openGraph: {
    title: "Need More Leads? AI Lead Intelligence by Sarvopaya",
    description:
      "Stop counting clicks. Start finding buyers. Sarvopaya AI combines behaviour, intent signals and automation to turn anonymous visitors into real opportunities.",
    url: "/solutions/need-more-leads",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
