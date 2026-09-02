import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Werbung & Performance Advertising — Meta, Google, LinkedIn | Sarvopaya",
  description: "Datengetriebene Werbekampagnen auf Meta, Google, YouTube, LinkedIn, TikTok und mehr. Sarvopaya baut Ihr gesamtes Ad-Ökosystem — Creative, Targeting, Optimierung und Skalierung.",
  alternates: {
    canonical: "https://sarvopaya.com/de/services/advertising",
    languages: { de: "https://sarvopaya.com/de/services/advertising", en: "https://sarvopaya.com/services/advertising", "x-default": "https://sarvopaya.com/services/advertising" },
  },
};
export default function L({ children }: { children: React.ReactNode }) { return <>{children}</>; }
