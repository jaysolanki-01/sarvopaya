import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ressourcen — Guides, Playbooks & Insights | Sarvopaya",
  description: "Tiefgehende Leitfäden und Marketingeinblicke vom Sarvopaya-Team: von Performance-Marketing-Strategien bis hin zu KI-Automatisierung im Unternehmensalltag.",
  alternates: {
    canonical: "https://sarvopaya.com/de/resources",
    languages: { de: "https://sarvopaya.com/de/resources", en: "https://sarvopaya.com/resources", "x-default": "https://sarvopaya.com/resources" },
  },
};

export default function DeResourcesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
