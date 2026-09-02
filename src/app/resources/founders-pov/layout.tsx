import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Founder's POVs | Growth, Marketing & Brand Building | Sarvopaya",
  description:
    "Unfiltered takes on growth, performance marketing, AI automation and building a brand in India — from the desk of Jay Solanki, founder of Sarvopaya.",
  alternates: {
    canonical: "/resources/founders-pov",
    languages: {
      "en": "https://sarvopaya.com/resources/founders-pov",
      "x-default": "https://sarvopaya.com/resources/founders-pov",
    },
  },
  openGraph: {
    title: "Founder's POVs | Sarvopaya",
    description:
      "Unfiltered takes on growth, marketing and building a brand in India from Jay Solanki, founder of Sarvopaya.",
    url: "/resources/founders-pov",
  },
};

export default function FoundersPovLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
