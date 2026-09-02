import CountryPage from "@/components/CountryPage";
import type { CountryPageProps } from "@/components/CountryPage";

const data: CountryPageProps = {
  country: "USA",
  flag: "🇺🇸",
  region: "Nordamerika",
  h1: "Digital Marketing & KI-Agentur für die|USA",
  intro: "Sarvopaya bietet amerikanischen Unternehmen KI-Automatisierung, Performance Marketing und SEO — skalierbar, datengetrieben und auf den US-Markt zugeschnitten.",
  stats: [
    { value: "50+", label: "Betreute Marken" },
    { value: "3×", label: "Durchschnittlicher ROAS" },
    { value: "100%", label: "ROI-fokussiert" },
  ],
  whyUs: [
    { title: "US-Marktkenntnis", body: "Wir kennen die Besonderheiten des amerikanischen Marktes — Consumer-Verhalten, Wettbewerbsintensität und regulatorische Anforderungen." },
    { title: "Zeitzonenübergreifende Zusammenarbeit", body: "Unser Team ist auf flexible internationale Kommunikation eingestellt und liefert Ergebnisse unabhängig von Ihrer Zeitzone." },
    { title: "Full-Stack Digital", body: "Performance Ads, SEO, KI-Automatisierung und Web — alles aus einer Hand, vollständig koordiniert." },
    { title: "Transparente Berichterstattung", body: "Monatliche Reports mit klaren KPIs, Umsatz-Attribution und Handlungsempfehlungen — keine Blackboxen." },
  ],
  industries: ["E-Commerce", "SaaS & Software", "Health & Wellness", "Finance & FinTech", "Education & EdTech", "B2B Technology", "D2C Brands", "Professional Services"],
  services: [
    { title: "Performance Advertising", href: "/de/services/advertising", desc: "Meta, Google und LinkedIn Kampagnen für den US-Markt — mit US-spezifischem Creative und Targeting." },
    { title: "SEO", href: "/de/services/seo", desc: "Organische Sichtbarkeit im kompetitiven US-Suchmarkt durch technisches SEO und Content-Strategie." },
    { title: "D2C Marketing", href: "/de/services/d2c-marketing", desc: "Full-Funnel D2C Strategie für amerikanische Direktvertriebs-Marken." },
    { title: "KI & Automatisierung", href: "/de/services/ai-automation", desc: "Automatisierte Lead-Intelligence und Workflow-Systeme für US-Unternehmen." },
    { title: "Web & Digital Experience", href: "/de/services/website-digital-experience", desc: "Hochperformante Websites und Landingpages für den US-Markt." },
    { title: "Wachstumsberatung", href: "/de/services/growth-consulting", desc: "Strategische GTM-Planung und Wachstumsberatung für den Markteintritt oder die Skalierung in den USA." },
  ],
  faqs: [
    { q: "Arbeiten Sie mit US-amerikanischen Unternehmen zusammen?", a: "Ja. Wir betreuen Kunden aus den USA remote und liefern vollständig gemanagte Marketing- und KI-Services. Die Kommunikation erfolgt auf Englisch über Ihre bevorzugten Kanäle." },
    { q: "Wie unterscheidet sich US-Marketing von anderen Märkten?", a: "Der US-Markt ist kompetitiver und werbeintensiver als die meisten anderen Märkte. Erfolgreiches Marketing erfordert eine starke Creative-Strategie, präzises Targeting und schnelle Optimierungszyklen." },
    { q: "Bieten Sie Preisangaben in USD an?", a: "Ja. Wir erstellen Angebote in USD oder INR je nach Präferenz. Kontaktieren Sie uns für ein individuelles Angebot." },
    { q: "Welche US-spezifischen Plattformen bedienen Sie?", a: "Meta, Google, YouTube, LinkedIn, Amazon Ads, Programmatic Display und alle gängigen US-Plattformen — abgestimmt auf Ihre Zielgruppe und Ihren Sektor." },
    { q: "Wie starten wir die Zusammenarbeit?", a: "Mit einem kostenlosen 30-minütigen Erstgespräch. Wir analysieren Ihre aktuelle digitale Präsenz im US-Markt und skizzieren konkret, welche Hebel den größten Effekt haben." },
  ],
  slug: "usa",
};

export default function DeUSAPage() {
  return <CountryPage {...data} />;
}
