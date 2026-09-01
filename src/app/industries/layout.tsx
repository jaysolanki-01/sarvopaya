import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Digital solutions built for B2B, B2C, and export businesses kitchen equipment, carpet & rug, jewellery, and other niche industries.",
  alternates: {
    canonical: "/industries",
  },
  openGraph: {
    title: "Industries We Serve | Sarvopaya",
    description:
      "Digital solutions built for B2B, B2C, and export businesses kitchen equipment, carpet & rug, jewellery, and other niche industries.",
    url: "/industries",
  },
};

export default function IndustriesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
