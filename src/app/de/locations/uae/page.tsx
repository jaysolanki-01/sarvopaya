import CountryPage from "@/components/CountryPage";
import type { CountryPageProps } from "@/components/CountryPage";

const data: CountryPageProps = {
  country: "VAE",
  flag: "🇦🇪",
  region: "Naher Osten",
  h1: "Digital Marketing & KI-Agentur für die|VAE",
  intro: "Sarvopaya bietet KI-Automatisierung, Performance Marketing und digitale Strategien für Unternehmen in den Vereinigten Arabischen Emiraten — mit besonderem Fokus auf Dubai und Abu Dhabi.",
  stats: [
    { value: "50+", label: "Betreute Marken" },
    { value: "3-in-1", label: "Kreativ · Tech · KI" },
    { value: "100%", label: "ROI-fokussiert" },
  ],
  whyUs: [
    { title: "MENA-Marktkenntnis", body: "Wir kennen die Besonderheiten des MENA-Marktes — kulturelle Nuancen, bevorzugte Plattformen, Ramadan-Marketing und lokale Consumer-Gewohnheiten." },
    { title: "Arabisch & Englisch", body: "Für den VAE-Markt produzieren wir Inhalte auf Englisch sowie in Zusammenarbeit mit lokalen Partnern auf Arabisch." },
    { title: "Schnell wachsender Markt", body: "Die VAE sind ein Wachstumsmarkt mit hoher Kaufkraft und digitalem Affinität. Wir helfen Ihnen, das Potenzial dieses Marktes zu erschließen." },
    { title: "Unkomplizierter Einstieg", body: "Starten Sie mit einem kostenlosen Erstgespräch — kein Setup-Aufwand, keine langfristige Verpflichtung zum Start." },
  ],
  industries: ["Real Estate", "Luxury Retail", "Hospitality & Tourism", "E-Commerce", "Financial Services", "Construction & Fit-out", "Healthcare", "Education"],
  services: [
    { title: "Performance Advertising", href: "/de/services/advertising", desc: "Meta, Google und Snapchat Kampagnen für VAE-Zielgruppen — auf Arabisch und Englisch." },
    { title: "SEO", href: "/de/services/seo", desc: "Organische Sichtbarkeit in den VAE für englisch- und arabischsprachige Suchanfragen." },
    { title: "Social Media Marketing", href: "/de/services/social-media-marketing", desc: "Instagram, TikTok und Snapchat — die dominanten Plattformen in den VAE." },
    { title: "KI & Automatisierung", href: "/de/services/ai-automation", desc: "KI-Workflows und Lead-Intelligence für VAE-Unternehmen und Immobilienprojekte." },
    { title: "Web & Digital Experience", href: "/de/services/website-digital-experience", desc: "Mehrsprachige Websites für den VAE-Markt." },
    { title: "Wachstumsberatung", href: "/de/services/growth-consulting", desc: "Strategieberatung für internationale Marken, die in den VAE Fuß fassen wollen." },
  ],
  faqs: [
    { q: "Arbeiten Sie mit VAE-ansässigen Unternehmen zusammen?", a: "Ja. Wir betreuen Kunden in Dubai, Abu Dhabi und anderen Emiraten remote und liefern vollständig gemanagte Marketing-Services." },
    { q: "Bieten Sie Inhalte auf Arabisch an?", a: "Für arabischsprachige Inhalte arbeiten wir mit verifizierten Muttersprachlern zusammen. Englischsprachiger Content für den VAE-Markt ist vollständig in-house." },
    { q: "Können Sie bei Influencer Marketing im VAE helfen?", a: "Ja. Wir identifizieren passende Influencer und Creator im VAE-Markt und koordinieren Kampagnen auf Instagram, TikTok und Snapchat." },
    { q: "Welche Plattformen dominieren im VAE?", a: "Instagram, TikTok, Snapchat (besonders junges Publikum), YouTube und WhatsApp haben die höchste Nutzerdichte im VAE. Google und Meta Ads sind die wichtigsten Paid-Kanäle." },
    { q: "Wie starten wir?", a: "Buchen Sie ein kostenloses 30-minütiges Erstgespräch und wir analysieren Ihre Situation im VAE-Markt." },
  ],
  slug: "uae",
};

export default function DeUAEPage() {
  return <CountryPage {...data} />;
}
