import CountryPage, { type CountryPageProps } from "@/components/CountryPage";

const data: CountryPageProps = {
  country: "USA",
  flag: "🇺🇸",
  region: "North America",
  slug: "usa",
  h1: "AI Automation & Growth Marketing Agency | for US Businesses",
  intro:
    "Sarvopaya delivers AI automation, performance marketing and SEO to US businesses at a fraction of what comparable US agencies charge — without sacrificing strategy, quality or accountability. We have worked with US D2C brands, SaaS companies and B2B service businesses.",
  stats: [
    { value: "3–5×", label: "Cost advantage vs US agencies" },
    { value: "9", label: "International markets served" },
    { value: "48h", label: "Response time SLA" },
  ],
  whyUs: [
    {
      title: "Cost without compromise",
      body: "US digital marketing agencies typically charge $10K–$50K per month for full-service retainers. Sarvopaya delivers comparable strategic depth and execution quality at India rates — without the overhead of a San Francisco or New York agency. Your budget goes further.",
    },
    {
      title: "Async-first, EST-compatible",
      body: "Our team structures work to be EST-compatible. You get deliverables ready when you start your day, weekly video calls at your convenience and same-business-day responses. The async model means more work done, not less communication.",
    },
    {
      title: "US market experience",
      body: "We understand US consumer behaviour, ad platform benchmarks and what moves the needle in the American market. Meta CPMs, Google Shopping ROAS targets and US SaaS funnel benchmarks — we work to the right numbers for the US market, not Indian ones.",
    },
    {
      title: "Full-stack execution under one roof",
      body: "AI automation, paid media, SEO and web development — all in one partner. No coordinating between a US performance agency, a separate SEO firm and a development vendor. One retainer, one point of contact, unified execution.",
    },
  ],
  industries: [
    "SaaS & Technology",
    "D2C E-commerce",
    "Fintech",
    "Health & Wellness",
    "Professional Services",
    "Education Technology",
    "B2B Services",
    "Consumer Goods",
  ],
  services: [
    { title: "AI Automation", href: "/services/ai-automation", desc: "n8n workflows, marketing automation and AI business process automation for US companies." },
    { title: "D2C Marketing", href: "/services/d2c-marketing", desc: "Meta and Google performance marketing tuned to US market CPMs, ROAS targets and creative benchmarks." },
    { title: "SEO", href: "/services/seo", desc: "US-market SEO strategy, technical audits and content built to rank in .com search results." },
    { title: "Social Media Marketing", href: "/services/social-media-marketing", desc: "US-focused organic and paid social — Instagram, LinkedIn, X and YouTube." },
    { title: "Website & Digital Experience", href: "/services/website-digital-experience", desc: "Conversion-optimised websites and landing pages built for US audiences and buyer behaviour." },
    { title: "Growth Consulting", href: "/services/growth-consulting", desc: "GTM strategy, digital audits and growth roadmaps for US startups and scaling businesses." },
  ],
  faqs: [
    {
      q: "Why hire an Indian agency for US market work?",
      a: "The quality of strategic marketing work is not geography-dependent. Sarvopaya brings senior-level strategy, deep execution capacity and US market experience at India pricing — giving US businesses a significant cost advantage without any quality trade-off. We are accountable to outcomes, not billable hours.",
    },
    {
      q: "How do you ensure US market-specific strategy?",
      a: "We track US market benchmarks across our client base and run campaigns to US-specific performance targets. We study the US competitive landscape, US consumer research and platform data specific to US audiences — not generic global benchmarks.",
    },
    {
      q: "How does communication work across timezones?",
      a: "We operate an async-first model with EST-compatible hours. You get a dedicated point of contact who responds within the same business day, structured weekly calls and Slack or email communication. Most clients find the rhythm works better than a local agency where people are in meetings all day.",
    },
    {
      q: "What do US clients typically pay?",
      a: "Our retainers are significantly lower than comparable US agencies — typically 60–75% less for equivalent scope. We do not publish fixed pricing because the scope varies, but we are transparent about cost from the first call. Book a consultation and we will give you a clear number.",
    },
  ],
};

export default function USAPage() {
  return <CountryPage {...data} />;
}
