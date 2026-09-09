import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unsere Arbeit, Fallstudien & Ergebnisse | Sarvopaya",
  description: "Entdecken Sie ausgewählte Projekte von Sarvopaya: Performance-Marketing-Kampagnen, SEO-Erfolge und digitale Transformationsprojekte für Marken weltweit.",
  alternates: {
    canonical: "https://www.sarvopaya.com/de/work",
    languages: { de: "https://www.sarvopaya.com/de/work", en: "https://www.sarvopaya.com/work", "x-default": "https://www.sarvopaya.com/work" },
  },
};

export default function DeWorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
