import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Branchen, Industrien die wir bedienen | Sarvopaya",
  description: "Sarvopaya arbeitet mit D2C-Marken, B2B-Unternehmen und Exporteuren in Küchen- und Haushaltsgeräten, Teppichen, Schmuck und mehr. Erfahren Sie, wie wir Ihre Branche kennen.",
  alternates: {
    canonical: "https://www.sarvopaya.com/de/industries",
    languages: { de: "https://www.sarvopaya.com/de/industries", en: "https://www.sarvopaya.com/industries", "x-default": "https://www.sarvopaya.com/industries" },
  },
};

export default function DeIndustriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
