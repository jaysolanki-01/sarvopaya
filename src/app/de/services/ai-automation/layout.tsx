import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "KI & Automatisierung — Skalieren ohne mehr Personal | Sarvopaya",
  description: "KI-Workflows, automatisiertes Lead-Nurturing, Reporting-Automatisierung und Betriebsoptimierung. Sarvopaya implementiert KI-Automatisierung, die sofort Wirkung zeigt.",
  alternates: {
    canonical: "https://sarvopaya.com/de/services/ai-automation",
    languages: { de: "https://sarvopaya.com/de/services/ai-automation", en: "https://sarvopaya.com/services/ai-automation", "x-default": "https://sarvopaya.com/services/ai-automation" },
  },
};
export default function L({ children }: { children: React.ReactNode }) { return <>{children}</>; }
