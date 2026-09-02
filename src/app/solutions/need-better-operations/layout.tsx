import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Need Better Operations? Automate Workflows & Cut Manual Work | Sarvopaya",
  description:
    "Sarvopaya builds AI automation systems that eliminate repetitive manual tasks, streamline operations and free your team to focus on work that actually moves the business forward.",
  alternates: {
    canonical: "/solutions/need-better-operations",
    languages: {
      "en": "https://sarvopaya.com/solutions/need-better-operations",
      "x-default": "https://sarvopaya.com/solutions/need-better-operations",
    },
  },
  openGraph: {
    title: "Need Better Operations? | AI Automation | Sarvopaya",
    description:
      "Automate repetitive workflows, eliminate manual work and build systems that scale. AI automation for marketing, ops and support.",
    url: "/solutions/need-better-operations",
  },
};

export default function NeedBetterOperationsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
