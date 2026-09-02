import CountryPage from "@/components/CountryPage";
import type { CountryPageProps } from "@/components/CountryPage";

const data: CountryPageProps = {
  country: "Australien",
  flag: "🇦🇺",
  region: "Asien-Pazifik",
  h1: "Digital Marketing & KI für|Australien",
  intro: "Sarvopaya bietet australischen Unternehmen KI-Automatisierung, Performance Marketing und SEO — auf den australischen Markt zugeschnitten und mit APAC-Expertise verknüpft.",
  stats: [
    { value: "50+", label: "Betreute Marken" },
    { value: "3×", label: "Durchschnittlicher ROAS" },
    { value: "100%", label: "ROI-fokussiert" },
  ],
  whyUs: [
    { title: "Australischer Markt", body: "Wir verstehen den australischen Consumer — digital-affin, preisbewusst und plattform-selektiv. Unsere Strategien berücksichtigen lokale Trends und Saisonalität (umgekehrte Jahreszeiten zum Nordhalbkugel-Markt)." },
    { title: "APAC-Reichweite", body: "Für australische Marken mit APAC-Ambitionen verbinden wir australisches Marketing mit Expertise in Singapur, Indien und anderen APAC-Märkten." },
    { title: "Bewährte Methodik", body: "Dieselbe Full-Stack-Methodik, die wir weltweit einsetzen — adaptiert für australische Plattformgewohnheiten und regulatorische Anforderungen." },
    { title: "Kosteneffizienz", body: "Als indische Agentur bieten wir hochwertige Dienstleistungen zu deutlich günstigeren Konditionen als vergleichbare australische Agenturen." },
  ],
  industries: ["E-Commerce & Retail", "Financial Services & FinTech", "Healthcare", "Real Estate", "Education", "Hospitality & Tourism", "Professional Services", "SaaS & Technology"],
  services: [
    { title: "Performance Advertising", href: "/de/services/advertising", desc: "Meta, Google und LinkedIn Kampagnen für australische Zielgruppen — ACCC-konform." },
    { title: "SEO", href: "/de/services/seo", desc: "Organische Sichtbarkeit auf google.com.au für australische und internationale Suchanfragen." },
    { title: "Social Media Marketing", href: "/de/services/social-media-marketing", desc: "Instagram, TikTok und LinkedIn — die dominanten Plattformen in Australien." },
    { title: "KI & Automatisierung", href: "/de/services/ai-automation", desc: "KI-Workflows und Prozessautomatisierung für australische Unternehmen." },
    { title: "Web & Digital Experience", href: "/de/services/website-digital-experience", desc: "Hochperformante Websites für den australischen Markt." },
    { title: "Wachstumsberatung", href: "/de/services/growth-consulting", desc: "Strategie und GTM-Planung für australische Unternehmen und APAC-Expansion." },
  ],
  faqs: [
    { q: "Arbeiten Sie mit australischen Unternehmen zusammen?", a: "Ja. Wir betreuen australische Kunden remote und liefern vollständig gemanagte Marketing- und KI-Services. Die Kommunikation erfolgt auf Englisch." },
    { q: "Wie managen Sie Zeitzonen zwischen Indien und Australien?", a: "Wir sind an flexible Kommunikation gewöhnt und bieten Meetings in australischen Zeitzonen (AEST/AEDT/AWST) an. Asynchrone Zusammenarbeit über Slack und E-Mail ergänzt die Echtzeitkommunikation." },
    { q: "Berücksichtigen Sie australische Datenschutzgesetze?", a: "Ja. Der australische Privacy Act und die APP (Australian Privacy Principles) werden in unserer Kampagnenplanung und Datenverarbeitung berücksichtigt." },
    { q: "Bieten Sie Preisangaben in AUD an?", a: "Ja. Wir erstellen Angebote in AUD oder INR je nach Präferenz. Kontaktieren Sie uns für ein individuelles Angebot." },
    { q: "Wie starten wir?", a: "Mit einem kostenlosen 30-minütigen Erstgespräch in australischer Zeitzone. Wir analysieren Ihre aktuelle Situation und skizzieren konkrete Wachstumshebel." },
  ],
  slug: "australia",
};

export default function DeAustraliaPage() {
  return <CountryPage {...data} />;
}
