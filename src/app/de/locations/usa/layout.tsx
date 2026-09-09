import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Digitalagentur USA, KI & Performance Marketing | Sarvopaya",
  description: "Sarvopaya bietet KI-Automatisierung, Performance Marketing und SEO für Unternehmen in den USA. Kostenlose Beratung für amerikanische Marken, die digital wachsen wollen.",
  alternates: {
    canonical: "https://www.sarvopaya.com/de/locations/usa",
    languages: { de: "https://www.sarvopaya.com/de/locations/usa", en: "https://www.sarvopaya.com/locations/usa", "x-default": "https://www.sarvopaya.com/locations/usa" },
  },
};
export default function L({ children }: { children: React.ReactNode }) { return <>{children}</>; }
