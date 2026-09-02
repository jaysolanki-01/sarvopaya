import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Sarvopaya | Book a Free Consultation",
  description:
    "Get in touch with Sarvopaya. Tell us your growth challenge and we will respond within one business day. Book a free 30-minute strategy call.",
  alternates: {
    canonical: "/contact",
    languages: {
      "en": "https://sarvopaya.com/contact",
      "x-default": "https://sarvopaya.com/contact",
    },
  },
  openGraph: {
    title: "Contact Sarvopaya | Book a Free Consultation",
    description:
      "Get in touch with Sarvopaya. Tell us where you are and where you want to be we'll get back to you within one business day.",
    url: "/contact",
  },
};

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
