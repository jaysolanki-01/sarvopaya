import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Mehr Umsatz — Pipeline zu Abschlüssen konvertieren | Sarvopaya",
  description: "Konvertieren Sie mehr aus der Pipeline, die Sie bereits haben. Sarvopaya optimiert Ihren gesamten Sales-Funnel — von der ersten Impression bis zum Abschluss.",
  alternates: {
    canonical: "https://sarvopaya.com/de/solutions/need-more-sales",
    languages: { de: "https://sarvopaya.com/de/solutions/need-more-sales", en: "https://sarvopaya.com/solutions/need-more-sales", "x-default": "https://sarvopaya.com/solutions/need-more-sales" },
  },
};
export default function L({ children }: { children: React.ReactNode }) { return <>{children}</>; }
