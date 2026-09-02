import CountryPage from "@/components/CountryPage";
import type { CountryPageProps } from "@/components/CountryPage";

const data: CountryPageProps = {
  country: "Kanada",
  flag: "🇨🇦",
  region: "Nordamerika",
  h1: "Digital Marketing & KI für|Kanada",
  intro: "Sarvopaya bietet kanadischen Unternehmen KI-Automatisierung, Performance Marketing und SEO — zweisprachig (EN/FR), datengetrieben und auf den kanadischen Markt zugeschnitten.",
  stats: [
    { value: "50+", label: "Betreute Marken" },
    { value: "8+", label: "Dienstleistungen" },
    { value: "100%", label: "ROI-fokussiert" },
  ],
  whyUs: [
    { title: "Kanadischer Marktkontext", body: "Wir kennen die Besonderheiten des kanadischen Marktes — CASL-Compliance, zweisprachige Zielgruppen (EN/FR) und die Unterschiede zwischen amerikanischem und kanadischem Consumer-Verhalten." },
    { title: "CASL-konformes E-Mail-Marketing", body: "Der Canada Anti-Spam Law (CASL) ist einer der strengsten der Welt. Alle unsere E-Mail-Kampagnen werden vollständig CASL-konform konzipiert und umgesetzt." },
    { title: "Full-Stack Expertise", body: "Performance Ads, SEO, KI und Web — alles aus einer Hand, koordiniert auf Ihre kanadischen Wachstumsziele ausgerichtet." },
    { title: "Kosteneffizienz", body: "Als indische Agentur liefern wir Qualität auf Niveau kanadischer Top-Agenturen — zu einem Bruchteil der lokalen Kosten." },
  ],
  industries: ["E-Commerce", "SaaS & Technology", "Financial Services", "Healthcare & MedTech", "Education", "Real Estate", "D2C Brands", "Professional Services"],
  services: [
    { title: "Performance Advertising", href: "/de/services/advertising", desc: "Meta, Google und LinkedIn Kampagnen für kanadische Zielgruppen — auf Englisch und Französisch." },
    { title: "SEO", href: "/de/services/seo", desc: "Organische Sichtbarkeit auf google.ca für englisch- und französischsprachige Suchanfragen." },
    { title: "Social Media Marketing", href: "/de/services/social-media-marketing", desc: "Markenkommunikation für kanadische Zielgruppen auf Instagram, LinkedIn und TikTok." },
    { title: "KI & Automatisierung", href: "/de/services/ai-automation", desc: "KI-gestützte Prozessautomatisierung und Lead-Intelligence für kanadische Unternehmen." },
    { title: "Web & Digital Experience", href: "/de/services/website-digital-experience", desc: "Zweisprachige Websites (EN/FR) und hochkonvertierende Landingpages für den kanadischen Markt." },
    { title: "Wachstumsberatung", href: "/de/services/growth-consulting", desc: "GTM-Strategie und digitale Wachstumsberatung für kanadische Unternehmen." },
  ],
  faqs: [
    { q: "Bieten Sie Inhalte auf Französisch an?", a: "Für québécois- und frankophone Zielgruppen in Kanada arbeiten wir mit verifizierten Muttersprachlern zusammen. Englischsprachiger Content für Kanada ist vollständig in-house." },
    { q: "Was ist CASL und wie gehen Sie damit um?", a: "CASL (Canada Anti-Spam Law) reguliert kommerzielle E-Mail-Kommunikation in Kanada streng. Unsere Kampagnen werden vollständig CASL-konform konzipiert — mit korrekten Opt-in-Mechanismen und Abmelde-Prozessen." },
    { q: "Arbeiten Sie mit kanadischen KMUs zusammen?", a: "Ja. Vom Startup in Toronto bis zur etablierten Marke in Vancouver — wir skalieren unsere Services auf Ihre Bedürfnisse und Ihr Budget." },
    { q: "Bieten Sie Preisangaben in CAD an?", a: "Ja. Wir erstellen Angebote in CAD, USD oder INR je nach Präferenz. Kontaktieren Sie uns für ein individuelles Angebot." },
    { q: "Wie starten wir?", a: "Mit einem kostenlosen 30-minütigen Erstgespräch. Wir analysieren Ihre aktuelle Situation im kanadischen Markt und skizzieren konkrete Wachstumsmaßnahmen." },
  ],
  slug: "canada",
};

export default function DeCanadaPage() {
  return <CountryPage {...data} />;
}
