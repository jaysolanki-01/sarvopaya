import CountryPage from "@/components/CountryPage";
import type { CountryPageProps } from "@/components/CountryPage";

const data: CountryPageProps = {
  country: "Singapur",
  flag: "🇸🇬",
  region: "Südostasien",
  h1: "Digital Marketing & KI für|Singapur",
  intro: "Sarvopaya bietet singapurischen Unternehmen KI-Automatisierung, Performance Marketing und SEO — als Gateway für die APAC-Region und für den hochkompetitiven Singapur-Markt selbst.",
  stats: [
    { value: "50+", label: "Betreute Marken" },
    { value: "3-in-1", label: "Kreativ · Tech · KI" },
    { value: "100%", label: "ROI-fokussiert" },
  ],
  whyUs: [
    { title: "APAC-Gateway Singapur", body: "Singapur ist das regionale Headquarter vieler internationaler Marken für APAC. Wir helfen Ihnen, von Singapur aus die Region zu adressieren — mit skalierbaren digitalen Systemen." },
    { title: "Mehrsprachige Kapazität", body: "Der singapurische Markt ist mehrsprachig (Englisch, Mandarin, Malay, Tamil). Wir produzieren englischen und mandarin-chinesischen Content sowie koordinieren Inhalte für weitere Sprachen." },
    { title: "Tech-affine Zielgruppen", body: "Singapur hat eine der weltweit höchsten Internetzugangsdichten und Digital-Affinität. Performante digitale Strategien entfalten hier besonders starke Wirkung." },
    { title: "Bewährte Methodik", body: "Dieselbe Full-Stack-Methodik, die wir für Märkte in 7 Ländern anwenden — optimiert für den singapurischen und südostasiatischen Kontext." },
  ],
  industries: ["Financial Services & FinTech", "E-Commerce", "Technology & SaaS", "Healthcare", "Education & EdTech", "Real Estate", "Hospitality & Tourism", "Retail"],
  services: [
    { title: "Performance Advertising", href: "/de/services/advertising", desc: "Meta, Google und LinkedIn Kampagnen für den Singapur- und APAC-Markt." },
    { title: "SEO", href: "/de/services/seo", desc: "Organische Sichtbarkeit für englisch- und mandarin-chinesische Suchanfragen in Singapur." },
    { title: "Social Media Marketing", href: "/de/services/social-media-marketing", desc: "Instagram, LinkedIn und TikTok für singapurische und APAC-Zielgruppen." },
    { title: "KI & Automatisierung", href: "/de/services/ai-automation", desc: "KI-Workflows für singapurische Unternehmen mit APAC-Skalierungszielen." },
    { title: "Web & Digital Experience", href: "/de/services/website-digital-experience", desc: "Mehrsprachige, hochperformante Websites für den Singapur-Markt." },
    { title: "Wachstumsberatung", href: "/de/services/growth-consulting", desc: "GTM-Strategie für den Markteintritt in Singapur und die APAC-Expansion." },
  ],
  faqs: [
    { q: "Arbeiten Sie mit singapurischen Unternehmen zusammen?", a: "Ja. Wir betreuen Kunden in Singapur remote und liefern vollständig gemanagte Marketing- und KI-Services auf Englisch." },
    { q: "Können Sie für den APAC-Markt über Singapur hinaus skalieren?", a: "Absolut. Singapur ist oft der erste Schritt in die APAC-Region. Wir helfen Ihnen, von dort aus in Märkten wie Malaysia, Indonesien, Thailand, Australien und weitere APAC-Länder zu expandieren." },
    { q: "Bieten Sie Inhalte auf Mandarin an?", a: "Für chinesischsprachige Zielgruppen in Singapur arbeiten wir mit Mandarin-Muttersprachlern zusammen. Englischsprachiger Content ist vollständig in-house." },
    { q: "Berücksichtigen Sie den Personal Data Protection Act (PDPA) Singapurs?", a: "Ja. Der PDPA regelt Datenschutz in Singapur. Unsere Kampagnen und Datenverarbeitungsprozesse sind vollständig PDPA-konform ausgelegt." },
    { q: "Wie starten wir?", a: "Mit einem kostenlosen 30-minütigen Erstgespräch. Wir besprechen Ihre Ziele im Singapur- und APAC-Markt und skizzieren konkrete erste Schritte." },
  ],
  slug: "singapore",
};

export default function DeSingaporePage() {
  return <CountryPage {...data} />;
}
