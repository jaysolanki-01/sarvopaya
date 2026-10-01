import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Sarvopaya",
  description:
    "Learn how Sarvopaya collects, uses, protects, and handles your personal data across our digital marketing, AI automation, and consulting services. Fully compliant with GDPR, DPDPA, and global privacy standards.",
  alternates: {
    canonical: "https://www.sarvopaya.com/privacy-policy",
    languages: {
      en: "https://www.sarvopaya.com/privacy-policy",
      "x-default": "https://www.sarvopaya.com/privacy-policy",
    },
  },
  openGraph: {
    title: "Privacy Policy | Sarvopaya",
    description:
      "Learn how Sarvopaya protects and handles your personal data across our digital marketing, AI automation, and consulting services.",
    url: "https://www.sarvopaya.com/privacy-policy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Sarvopaya",
    description:
      "Learn how Sarvopaya protects and handles your personal data across our digital marketing, AI automation, and consulting services.",
  },
};

export default function PrivacyPolicyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
