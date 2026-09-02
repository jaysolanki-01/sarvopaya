import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Launching a New Product? Go-to-Market Strategy | Sarvopaya",
  description:
    "Sarvopaya builds go-to-market plans for new products — positioning, landing pages, acquisition strategy, early traction and growth systems built to get traction fast.",
  alternates: {
    canonical: "/solutions/launching-a-new-product",
    languages: {
      "en": "https://sarvopaya.com/solutions/launching-a-new-product",
      "x-default": "https://sarvopaya.com/solutions/launching-a-new-product",
    },
  },
  openGraph: {
    title: "Launching a New Product? | GTM Strategy | Sarvopaya",
    description:
      "Go to market with a plan built to get traction fast. Positioning, landing pages, paid acquisition and early growth systems.",
    url: "/solutions/launching-a-new-product",
  },
};

export default function LaunchingANewProductLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
