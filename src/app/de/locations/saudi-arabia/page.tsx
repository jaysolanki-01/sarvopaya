import CountryPage from "@/components/CountryPage";
import type { CountryPageProps } from "@/components/CountryPage";

const data: CountryPageProps = {
  country: "Saudi-Arabien",
  flag: "🇸🇦",
  region: "Naher Osten",
  h1: "Digital Marketing & KI für|Saudi-Arabien",
  intro: "Sarvopaya bietet KI-Automatisierung, Performance Marketing und digitale Strategien für saudi-arabische Unternehmen — abgestimmt auf Vision 2030 und den wachsenden digitalen Markt.",
  stats: [
    { value: "50+", label: "Betreute Marken" },
    { value: "8+", label: "Dienstleistungen" },
    { value: "100%", label: "Ergebnisorientiert" },
  ],
  whyUs: [
    { title: "Vision-2030-kompatibel", body: "Unsere Strategien sind auf die Digitalisierungsziele Saudi-Arabiens ausgerichtet — Wachstum, Innovation und Diversifizierung der Wirtschaft." },
    { title: "Kulturelle Sensibilität", body: "Wir berücksichtigen kulturelle und religiöse Besonderheiten des saudi-arabischen Marktes in jeder Kampagne — von Ramadan-Marketing bis zur lokalen Kommunikationskultur." },
    { title: "Arabische Sprachkompetenz", body: "Arabischsprachige Inhalte in Zusammenarbeit mit Muttersprachlern, englischsprachiger Content vollständig in-house." },
    { title: "Schneller Marktstart", body: "Wir können schnell starten und liefern erste Ergebnisse innerhalb der ersten 30 Tage der Zusammenarbeit." },
  ],
  industries: ["Retail & E-Commerce", "Real Estate", "Construction & Infrastructure", "Healthcare", "Education & EdTech", "Financial Services", "Food & Beverage", "Government & Public Sector"],
  services: [
    { title: "Performance Advertising", href: "/de/services/advertising", desc: "Google, Meta und Snapchat Kampagnen für den saudi-arabischen Markt — auf Arabisch und Englisch." },
    { title: "SEO", href: "/de/services/seo", desc: "Organische Sichtbarkeit für arabische und englische Suchanfragen in Saudi-Arabien." },
    { title: "Social Media Marketing", href: "/de/services/social-media-marketing", desc: "X (Twitter), Snapchat und Instagram — die meistgenutzten Plattformen in Saudi-Arabien." },
    { title: "KI & Automatisierung", href: "/de/services/ai-automation", desc: "KI-gestützte Prozessautomatisierung für saudi-arabische Unternehmen." },
    { title: "Web & Digital Experience", href: "/de/services/website-digital-experience", desc: "Mehrsprachige Websites (AR/EN) für den saudi-arabischen Markt." },
    { title: "Wachstumsberatung", href: "/de/services/growth-consulting", desc: "GTM-Strategie für internationale Marken mit Saudi-Arabien-Fokus." },
  ],
  faqs: [
    { q: "Kennen Sie den saudi-arabischen Markt?", a: "Ja. Wir haben Erfahrung mit Marketing für den saudi-arabischen Markt — einschließlich Ramadan-Kampagnen, lokalen Plattform-Präferenzen (Snapchat, X/Twitter) und kultureller Sensibilität." },
    { q: "Ist Vision 2030 relevant für meine Marketing-Strategie?", a: "Absolut. Vision 2030 treibt enorme Veränderungen im Konsumverhalten, der Digitalisierung und dem E-Commerce-Wachstum in Saudi-Arabien. Wir helfen Ihnen, von diesen Entwicklungen zu profitieren." },
    { q: "Welche Plattformen funktionieren in Saudi-Arabien am besten?", a: "Saudi-Arabien hat eine der weltweit höchsten Social-Media-Nutzungsraten. X (Twitter), Snapchat, YouTube und Instagram sind führend. Google und Meta sind die wichtigsten Paid-Ad-Plattformen." },
    { q: "Wie kommunizieren wir bei einem Unterschied von Zeitzonen?", a: "Wir sind flexibel in der Terminplanung und bieten Sessions in Saudi-Arabischer Zeit (AST) an. Asynchrone Kommunikation über E-Mail oder Slack funktioniert ebenfalls problemlos." },
    { q: "Wie starten wir?", a: "Buchen Sie ein kostenloses Erstgespräch. Wir besprechen Ihre Ziele im saudi-arabischen Markt und skizzieren konkrete Maßnahmen." },
  ],
  slug: "saudi-arabia",
};

export default function DeSaudiArabiaPage() {
  return <CountryPage {...data} />;
}
