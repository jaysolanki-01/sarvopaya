import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Wachstumsberatung — GTM, Digitalaudit & Strategie | Sarvopaya",
  description: "Go-to-Market-Strategie, umfassende Digital-Audits und laufende Wachstumsberatung. Sarvopaya ist Ihr strategischer Partner für nachhaltiges, messbares Unternehmenswachstum.",
  alternates: {
    canonical: "https://sarvopaya.com/de/services/growth-consulting",
    languages: { de: "https://sarvopaya.com/de/services/growth-consulting", en: "https://sarvopaya.com/services/growth-consulting", "x-default": "https://sarvopaya.com/services/growth-consulting" },
  },
};
export default function L({ children }: { children: React.ReactNode }) { return <>{children}</>; }
