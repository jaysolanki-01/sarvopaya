import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Suchmaschinenoptimierung (SEO), Organisch wachsen | Sarvopaya",
  description: "Technisches SEO, Content-Strategie und Link-Building, die Ihre organische Sichtbarkeit nachhaltig steigern. Sarvopaya liefert SEO, das konvertiert, nicht nur rankt.",
  alternates: {
    canonical: "https://www.sarvopaya.com/de/services/seo",
    languages: { de: "https://www.sarvopaya.com/de/services/seo", en: "https://www.sarvopaya.com/services/seo", "x-default": "https://www.sarvopaya.com/services/seo" },
  },
};
export default function L({ children }: { children: React.ReactNode }) { return <>{children}</>; }
