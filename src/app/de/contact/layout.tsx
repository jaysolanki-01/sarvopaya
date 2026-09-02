import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt — Kostenlose Beratung buchen | Sarvopaya",
  description: "Bereit zu wachsen? Buchen Sie eine kostenlose 30-minütige Strategiesession mit dem Sarvopaya-Team und erfahren Sie, wie KI und Performance-Marketing Ihr Unternehmen voranbringen.",
  alternates: {
    canonical: "https://sarvopaya.com/de/contact",
    languages: { de: "https://sarvopaya.com/de/contact", en: "https://sarvopaya.com/contact", "x-default": "https://sarvopaya.com/contact" },
  },
};

export default function DeContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
