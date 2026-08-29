import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media Marketing Agency",
  description:
    "Sarvopaya is a social media marketing agency that grows your brand on Instagram, Facebook, LinkedIn, and YouTube — with content strategy, paid ads, and analytics that drive real results.",
  alternates: {
    canonical: "/services/social-media-marketing",
  },
  openGraph: {
    title: "Social Media Marketing Agency | Sarvopaya",
    description:
      "Sarvopaya is a social media marketing agency that grows your brand on Instagram, Facebook, LinkedIn, and YouTube — with content strategy, paid ads, and analytics that drive real results.",
    url: "/services/social-media-marketing",
  },
};

export default function SocialMediaMarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
