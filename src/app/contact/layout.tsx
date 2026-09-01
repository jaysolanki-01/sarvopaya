import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Sarvopaya. Tell us where you are and where you want to be we'll get back to you within one business day.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Sarvopaya",
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
