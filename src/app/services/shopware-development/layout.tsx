import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopware Development Agency in India | Shopware 6 Experts — Sarvopaya",
  description:
    "Sarvopaya is a certified Shopware development agency in India offering custom Shopware 6 development, migration from WooCommerce & Magento, plugin development, B2B suite, and ongoing support. Serving India, UAE & Europe.",
  keywords: [
    "Shopware development agency India",
    "Shopware 6 development India",
    "Shopware development company India",
    "Shopware agency India",
    "Shopware migration India",
    "Shopware plugin development India",
    "hire Shopware developer India",
    "Shopware B2B development India",
    "Shopware ecommerce India",
    "Shopware 6 development company",
  ],
  alternates: {
    canonical: "https://www.sarvopaya.com/services/shopware-development",
  },
  openGraph: {
    type: "website",
    url: "https://www.sarvopaya.com/services/shopware-development",
    title: "Shopware Development Agency in India | Shopware 6 Experts — Sarvopaya",
    description:
      "Custom Shopware 6 development, migrations, plugin development & B2B suite implementation by certified Shopware developers in India.",
    images: [
      {
        url: "/images/homepage-og.webp",
        width: 1512,
        height: 756,
        alt: "Sarvopaya — Shopware Development Agency India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shopware Development Agency in India | Sarvopaya",
    description:
      "Custom Shopware 6 builds, migrations & plugin development by certified Shopware developers in India.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function ShopwareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
