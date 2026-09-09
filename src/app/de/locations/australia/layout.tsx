import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Digitalagentur Australien, KI & Performance Marketing | Sarvopaya",
  description: "Sarvopaya bietet KI-Automatisierung, SEO und Performance Marketing für australische Unternehmen. Digitales Wachstum für den APAC-Markt.",
  alternates: {
    canonical: "https://www.sarvopaya.com/de/locations/australia",
    languages: { de: "https://www.sarvopaya.com/de/locations/australia", en: "https://www.sarvopaya.com/locations/australia", "x-default": "https://www.sarvopaya.com/locations/australia" },
  },
};
export default function L({ children }: { children: React.ReactNode }) { return <>{children}</>; }
