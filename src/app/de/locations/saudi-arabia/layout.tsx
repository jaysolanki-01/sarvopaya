import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Digitalagentur Saudi-Arabien, KI & Marketing Riad | Sarvopaya",
  description: "Sarvopaya bietet digitale Wachstumsstrategien und KI-Automatisierung für Unternehmen in Saudi-Arabien. Performance Marketing lokalisiert für den saudischen Markt.",
  alternates: {
    canonical: "https://www.sarvopaya.com/de/locations/saudi-arabia",
    languages: { de: "https://www.sarvopaya.com/de/locations/saudi-arabia", en: "https://www.sarvopaya.com/locations/saudi-arabia", "x-default": "https://www.sarvopaya.com/locations/saudi-arabia" },
  },
};
export default function L({ children }: { children: React.ReactNode }) { return <>{children}</>; }
