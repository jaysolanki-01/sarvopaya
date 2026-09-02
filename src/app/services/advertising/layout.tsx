import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advertising Services for D2C & Consumer Brands | Sarvopaya",
  description:
    "Digital advertising services combining sharp creative, intelligent media buying and deliberate distribution across Meta, Google, YouTube, LinkedIn and TikTok. D2C and ecommerce advertising that gets noticed and drives action.",
  alternates: {
    canonical: "/services/advertising",
    languages: {
      "en": "https://sarvopaya.com/services/advertising",
      "x-default": "https://sarvopaya.com/services/advertising",
    },
  },
  openGraph: {
    title: "Advertising Services for D2C & Consumer Brands | Sarvopaya",
    description:
      "Advertising campaigns that combine creative, media buying and distribution across platforms where your audience actually spends their attention.",
    url: "/services/advertising",
  },
};

export default function AdvertisingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
