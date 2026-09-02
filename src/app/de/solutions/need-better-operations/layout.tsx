import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Bessere Betriebsabläufe — Workflows automatisieren | Sarvopaya",
  description: "Vereinfachen Sie Workflows und eliminieren Sie manuelle Prozesse. Sarvopaya implementiert KI-Automatisierung, die Ihre Operations effizienter und skalierbarer macht.",
  alternates: {
    canonical: "https://sarvopaya.com/de/solutions/need-better-operations",
    languages: { de: "https://sarvopaya.com/de/solutions/need-better-operations", en: "https://sarvopaya.com/solutions/need-better-operations", "x-default": "https://sarvopaya.com/solutions/need-better-operations" },
  },
};
export default function L({ children }: { children: React.ReactNode }) { return <>{children}</>; }
