import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Branding & Design Services | Sarvopaya",
  description:
    "Strategic brand identity design for D2C brands and growth-stage companies. Visual systems, logo design, brand guidelines, and packaging that command premium positioning.",
  alternates: {
    canonical: "/services/branding-design",
  },
  openGraph: {
    title: "Branding & Design Services | Sarvopaya",
    description:
      "Strategic brand identity, visual systems, and design craft that build premium positioning for scaling brands. From logo to full brand architecture.",
    url: "/services/branding-design",
    type: "website",
    siteName: "Sarvopaya",
  },
  twitter: {
    card: "summary_large_image",
    title: "Branding & Design Services | Sarvopaya",
    description:
      "Strategic brand identity, visual systems, and design craft that build premium positioning for scaling brands.",
  },
};

export default function BrandingDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
