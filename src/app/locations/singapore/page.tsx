import CountryPage, { type CountryPageProps } from "@/components/CountryPage";

const data: CountryPageProps = {
  country: "Singapore",
  flag: "🇸🇬",
  region: "Southeast Asia",
  slug: "singapore",
  h1: "AI Automation & Digital Marketing Agency | for Singapore Businesses",
  intro:
    "Sarvopaya is an AI automation and digital marketing agency serving Singapore businesses and Southeast Asia-facing brands. Singapore is the region's digital hub — and Sarvopaya brings India's technology depth and operational scale to help Singapore businesses automate, scale and compete across the ASEAN market.",
  stats: [
    { value: "2.5h", label: "IST / SGT timezone difference" },
    { value: "#1", label: "Asia digital competitiveness" },
    { value: "ASEAN", label: "Southeast Asia market reach" },
  ],
  whyUs: [
    {
      title: "ASEAN market understanding",
      body: "Singapore businesses often target the wider ASEAN market — Malaysia, Indonesia, Thailand, Vietnam, Philippines. We understand multi-market digital strategy and the localisation requirements for the region: different platforms by country, language considerations and the varying digital maturity across Southeast Asia.",
    },
    {
      title: "Fintech and SaaS expertise",
      body: "Singapore is Southeast Asia's fintech capital and a major SaaS hub. We have experience with B2B SaaS demand generation, compliance-aware marketing for MAS-regulated businesses, fintech product positioning and the enterprise sales cycles common in Singapore's B2B market.",
    },
    {
      title: "India–Singapore strategic corridor",
      body: "India and Singapore have one of the deepest bilateral digital and business relationships in Asia. The UPI–PayNow linkage, strong Indian diaspora and active bilateral trade mean our two markets are deeply connected. We understand how Singapore businesses think and operate — and how to bridge the India–Singapore relationship when it is commercially relevant.",
    },
    {
      title: "Near-real-time collaboration",
      body: "Singapore Standard Time (SGT) is only 2.5 hours ahead of IST — one of the most convenient timezones we work with. Live working sessions, real-time Slack collaboration and same-day feedback cycles are standard. Most Singapore clients find the working rhythm closer to working with a local team than with a European or US agency.",
    },
  ],
  industries: [
    "Fintech & Financial Services",
    "SaaS & Technology",
    "Logistics & Supply Chain",
    "E-commerce",
    "Healthcare & MedTech",
    "Professional Services",
    "Real Estate",
    "Education Technology",
  ],
  services: [
    { title: "AI Automation", href: "/services/ai-automation", desc: "n8n and Make workflows, CRM automation and AI business processes for Singapore fintech and SaaS companies." },
    { title: "D2C Marketing", href: "/services/d2c-marketing", desc: "Meta and Google performance marketing for Singapore audiences — and multi-market ASEAN campaigns." },
    { title: "SEO", href: "/services/seo", desc: "Singapore local SEO, multilingual content strategy and GEO optimisation for ASEAN-facing businesses." },
    { title: "Social Media Marketing", href: "/services/social-media-marketing", desc: "LinkedIn for Singapore B2B, Instagram and TikTok — including multilingual social for ASEAN markets." },
    { title: "Website & Digital Experience", href: "/services/website-digital-experience", desc: "Multilingual websites, conversion-optimised landing pages and CRO for Singapore and ASEAN audiences." },
    { title: "Growth Consulting", href: "/services/growth-consulting", desc: "GTM strategy and digital audits for Singapore businesses expanding across ASEAN or into new verticals." },
  ],
  faqs: [
    {
      q: "Can you help Singapore businesses market to Southeast Asia?",
      a: "Yes. Many Singapore businesses use the country as a hub for ASEAN expansion. We help with multi-market digital strategy — adapting campaigns for Malaysia, Indonesia, Thailand and Vietnam, understanding which platforms dominate in each market (LINE in Thailand, Tokopedia in Indonesia, Lazada vs Shopee) and localising content appropriately.",
    },
    {
      q: "Do you have experience with Singapore fintech companies?",
      a: "Yes. Singapore fintech has specific marketing requirements — MAS advertising guidelines, compliance-aware content, B2B marketing for enterprise financial clients and the precision required in financial product positioning. We understand the regulatory context and have worked with fintech companies navigating these requirements.",
    },
    {
      q: "What is the timezone overlap with your team?",
      a: "SGT is 2.5 hours ahead of IST, making Singapore one of our closest timezone markets. Our team's working day overlaps significantly with the Singapore business day — live sessions, real-time Slack and same-day reviews are all easy. Most Singapore clients do not find the timezone a constraint at all.",
    },
    {
      q: "Can you run multilingual campaigns for ASEAN audiences from Singapore?",
      a: "Yes. We support multilingual campaign management across English, Mandarin and Bahasa. For other ASEAN languages (Thai, Vietnamese, Tagalog), we coordinate with specialist translation partners while managing the campaign strategy and execution centrally.",
    },
  ],
};

export default function SingaporePage() {
  return <CountryPage {...data} />;
}
