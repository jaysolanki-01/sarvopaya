import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "D2C Marketing — Direktvertrieb digital skalieren | Sarvopaya",
  description: "Full-Funnel D2C Marketing: von der Awareness bis zur Retention. Sarvopaya hilft Direct-to-Consumer-Marken dabei, profitabel zu skalieren — mit kreativer Strategie und Performance-Marketing.",
  alternates: {
    canonical: "https://sarvopaya.com/de/services/d2c-marketing",
    languages: { de: "https://sarvopaya.com/de/services/d2c-marketing", en: "https://sarvopaya.com/services/d2c-marketing", "x-default": "https://sarvopaya.com/services/d2c-marketing" },
  },
};
export default function L({ children }: { children: React.ReactNode }) { return <>{children}</>; }
