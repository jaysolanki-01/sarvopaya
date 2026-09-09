import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Digitalagentur Kanada, KI & Growth Marketing | Sarvopaya",
  description: "Sarvopaya bietet KI-Automatisierung, Performance Marketing und SEO für kanadische Unternehmen. Digitales Wachstum für den kanadischen Markt.",
  alternates: {
    canonical: "https://www.sarvopaya.com/de/locations/canada",
    languages: { de: "https://www.sarvopaya.com/de/locations/canada", en: "https://www.sarvopaya.com/locations/canada", "x-default": "https://www.sarvopaya.com/locations/canada" },
  },
};
export default function L({ children }: { children: React.ReactNode }) { return <>{children}</>; }
