import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Digitalagentur Großbritannien, KI & Growth Marketing | Sarvopaya",
  description: "Sarvopaya bietet KI-Automatisierung, Performance Marketing und SEO für britische Unternehmen. Digitales Wachstum für Marken im UK-Markt.",
  alternates: {
    canonical: "https://www.sarvopaya.com/de/locations/uk",
    languages: { de: "https://www.sarvopaya.com/de/locations/uk", en: "https://www.sarvopaya.com/locations/uk", "x-default": "https://www.sarvopaya.com/locations/uk" },
  },
};
export default function L({ children }: { children: React.ReactNode }) { return <>{children}</>; }
