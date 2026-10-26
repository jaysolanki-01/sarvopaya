import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comprehensive Digital Marketing & Growth Audit | Sarvopaya",
  description:
    "Uncover hidden revenue leaks and wasted ad spend. Our 360° Digital Audit analyzes your paid media, technical SEO, conversion funnels, and CRM automation with a prioritized 90-day fix roadmap.",
  alternates: {
    canonical: "/services/digital-audit",
  },
  openGraph: {
    title: "Comprehensive Digital Marketing & Growth Audit | Sarvopaya",
    description:
      "A forensic 360° diagnostic of your paid ads, website CRO, technical SEO, and automation stack. Delivered in 48-72 hours with a prioritized action blueprint.",
    url: "/services/digital-audit",
    type: "website",
    siteName: "Sarvopaya",
  },
  twitter: {
    card: "summary_large_image",
    title: "Comprehensive Digital Marketing & Growth Audit | Sarvopaya",
    description:
      "A forensic 360° diagnostic of your paid ads, website CRO, technical SEO, and automation stack. Delivered in 48-72 hours with a prioritized action blueprint.",
  },
};

export default function DigitalAuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
