import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Need More Sales? Convert More of the Pipeline You Have | Sarvopaya",
  description:
    "Stop losing deals you should win. Sarvopaya builds conversion systems — CRO, sales funnel optimisation, landing pages and follow-up automation — that turn pipeline into revenue.",
  alternates: {
    canonical: "/solutions/need-more-sales",
    languages: {
      "en": "https://sarvopaya.com/solutions/need-more-sales",
      "x-default": "https://sarvopaya.com/solutions/need-more-sales",
    },
  },
  openGraph: {
    title: "Need More Sales? | Sarvopaya",
    description:
      "Convert more of the pipeline you already have with CRO, landing page optimisation and sales automation.",
    url: "/solutions/need-more-sales",
  },
};

export default function NeedMoreSalesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
