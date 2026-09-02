import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Neues Produkt launchen — GTM-Strategie die funktioniert | Sarvopaya",
  description: "Gehen Sie mit einem Plan an den Markt, der Traktion erzeugt. Sarvopaya baut Ihre Go-to-Market-Strategie, Ihr Messaging und Ihre Launch-Kampagnen.",
  alternates: {
    canonical: "https://sarvopaya.com/de/solutions/launching-a-new-product",
    languages: { de: "https://sarvopaya.com/de/solutions/launching-a-new-product", en: "https://sarvopaya.com/solutions/launching-a-new-product", "x-default": "https://sarvopaya.com/solutions/launching-a-new-product" },
  },
};
export default function L({ children }: { children: React.ReactNode }) { return <>{children}</>; }
