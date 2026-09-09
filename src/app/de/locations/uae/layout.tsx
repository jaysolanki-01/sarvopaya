import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Digitalagentur VAE, KI & Marketing Dubai | Sarvopaya",
  description: "Sarvopaya bietet KI-Automatisierung und Performance Marketing für Unternehmen in den Vereinigten Arabischen Emiraten und Dubai. Wachstum im Nahen Osten.",
  alternates: {
    canonical: "https://www.sarvopaya.com/de/locations/uae",
    languages: { de: "https://www.sarvopaya.com/de/locations/uae", en: "https://www.sarvopaya.com/locations/uae", "x-default": "https://www.sarvopaya.com/locations/uae" },
  },
};
export default function L({ children }: { children: React.ReactNode }) { return <>{children}</>; }
