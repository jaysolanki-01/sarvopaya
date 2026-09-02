import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Branchen — Industrien die wir bedienen | Sarvopaya",
  description: "Sarvopaya arbeitet mit D2C-Marken, B2B-Unternehmen und Exporteuren in Küchen- und Haushaltsgeräten, Teppichen, Schmuck und mehr. Erfahren Sie, wie wir Ihre Branche kennen.",
  alternates: {
    canonical: "https://sarvopaya.com/de/industries",
    languages: { de: "https://sarvopaya.com/de/industries", en: "https://sarvopaya.com/industries", "x-default": "https://sarvopaya.com/industries" },
  },
};

export default function DeIndustriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
