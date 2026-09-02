import CountryPage from "@/components/CountryPage";
import type { CountryPageProps } from "@/components/CountryPage";

const data: CountryPageProps = {
  country: "Großbritannien",
  flag: "🇬🇧",
  region: "Europa",
  h1: "Digital Marketing & KI-Agentur für|Großbritannien",
  intro: "Sarvopaya unterstützt britische Unternehmen mit KI-Automatisierung, Performance Marketing und SEO — maßgeschneidert für den UK-Markt und den europäischen Wachstumskurs.",
  stats: [
    { value: "50+", label: "Betreute Marken" },
    { value: "8+", label: "Dienstleistungen" },
    { value: "100%", label: "ROI-fokussiert" },
  ],
  whyUs: [
    { title: "UK-Marktkenntnis", body: "Wir kennen die britischen Consumer-Gewohnheiten, den regulatorischen Rahmen (GDPR, ASA) und den kompetitiven digitalen Markt des Vereinigten Königreichs." },
    { title: "Mehrsprachige Kapazität", body: "Für britische Marken mit europäischen Ambitionen bieten wir mehrsprachige Marketing-Lösungen auf Deutsch, Englisch und weiteren Sprachen." },
    { title: "Bewährte Methodik", body: "Dieselbe Full-Stack-Methodik, die wir für Marken in 7 internationalen Märkten anwenden — adaptiert für den britischen Kontext." },
    { title: "Kosteneffizienz", body: "Als in Indien ansässige Agentur bieten wir hochwertige Dienstleistungen zu einem signifikant günstigeren Preis als vergleichbare britische Agenturen." },
  ],
  industries: ["Retail & E-Commerce", "Financial Services", "Technology & SaaS", "Healthcare", "Education", "Real Estate", "Professional Services", "D2C Brands"],
  services: [
    { title: "Performance Advertising", href: "/de/services/advertising", desc: "Meta, Google und LinkedIn Kampagnen für britische Zielgruppen — GDPR-konform und zielgenau." },
    { title: "SEO", href: "/de/services/seo", desc: "Organische Sichtbarkeit auf google.co.uk und Bing UK — technisch und inhaltlich optimiert." },
    { title: "Social Media Marketing", href: "/de/services/social-media-marketing", desc: "Markenkommunikation auf Instagram, LinkedIn und TikTok für britische Zielgruppen." },
    { title: "KI & Automatisierung", href: "/de/services/ai-automation", desc: "KI-Workflows und Lead-Intelligence für UK-Unternehmen." },
    { title: "Web & Digital Experience", href: "/de/services/website-digital-experience", desc: "Websites und Landingpages, die im britischen Markt konvertieren." },
    { title: "Wachstumsberatung", href: "/de/services/growth-consulting", desc: "GTM-Strategie und Wachstumsberatung für britische Unternehmen und Markteinsteiger." },
  ],
  faqs: [
    { q: "Ist Ihre Arbeit GDPR-konform für den UK-Markt?", a: "Ja. Alle unsere Kampagnen und Datenverarbeitungsprozesse sind auf GDPR- bzw. UK GDPR-Compliance ausgelegt. Wir beraten Sie bei datenschutzkonformem Marketing." },
    { q: "Arbeiten Sie mit britischen KMUs oder eher mit Großunternehmen?", a: "Wir arbeiten mit Unternehmen jeder Größe — vom ambitionierten UK-Startup bis zur etablierten britischen Marke. Unsere Lösungen skalieren mit Ihren Anforderungen." },
    { q: "Berücksichtigen Sie Post-Brexit-Marktveränderungen?", a: "Ja. Wir berücksichtigen die Auswirkungen des Brexits auf Zielgruppen, Plattform-Regulierung und internationale Lieferketten in unserer Strategieentwicklung." },
    { q: "Wie starten wir?", a: "Buchen Sie ein kostenloses 30-minütiges Erstgespräch. Wir analysieren Ihre aktuelle Situation im UK-Markt und empfehlen konkrete erste Schritte." },
    { q: "Gibt es Mindestlaufzeiten für Verträge?", a: "Wir empfehlen eine Mindestlaufzeit von 3 Monaten für SEO und 6 Monaten für Performance-Kampagnen — damit wir echte, messbare Ergebnisse liefern können." },
  ],
  slug: "uk",
};

export default function DeUKPage() {
  return <CountryPage {...data} />;
}
