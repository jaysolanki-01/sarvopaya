import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Standorte — Internationale Märkte | Sarvopaya",
  description: "Sarvopaya bedient Unternehmen in 7 internationalen Märkten: USA, UK, VAE, Saudi-Arabien, Australien, Kanada und Singapur. Erfahren Sie, wie wir in Ihrem Markt arbeiten.",
  alternates: {
    canonical: "https://sarvopaya.com/de/locations",
    languages: { de: "https://sarvopaya.com/de/locations", en: "https://sarvopaya.com/locations", "x-default": "https://sarvopaya.com/locations" },
  },
};
export default function L({ children }: { children: React.ReactNode }) { return <>{children}</>; }
