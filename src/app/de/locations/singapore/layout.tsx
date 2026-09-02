import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Digitalagentur Singapur — KI & Marketing APAC | Sarvopaya",
  description: "Sarvopaya bietet KI-Automatisierung und Performance Marketing für Unternehmen in Singapur und der APAC-Region. Digitales Wachstum für den asiatischen Markt.",
  alternates: {
    canonical: "https://sarvopaya.com/de/locations/singapore",
    languages: { de: "https://sarvopaya.com/de/locations/singapore", en: "https://sarvopaya.com/locations/singapore", "x-default": "https://sarvopaya.com/locations/singapore" },
  },
};
export default function L({ children }: { children: React.ReactNode }) { return <>{children}</>; }
