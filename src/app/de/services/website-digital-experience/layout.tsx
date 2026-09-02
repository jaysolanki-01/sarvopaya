import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Website & Digital Experience — Conversion-optimiert | Sarvopaya",
  description: "Websites, Landingpages und digitale Erlebnisse, die konvertieren. Sarvopaya verbindet Design-Excellence mit technischer Performance und CRO-Expertise.",
  alternates: {
    canonical: "https://sarvopaya.com/de/services/website-digital-experience",
    languages: { de: "https://sarvopaya.com/de/services/website-digital-experience", en: "https://sarvopaya.com/services/website-digital-experience", "x-default": "https://sarvopaya.com/services/website-digital-experience" },
  },
};
export default function L({ children }: { children: React.ReactNode }) { return <>{children}</>; }
