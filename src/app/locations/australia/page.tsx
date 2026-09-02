import CountryPage, { type CountryPageProps } from "@/components/CountryPage";

const data: CountryPageProps = {
  country: "Australia",
  flag: "🇦🇺",
  region: "Asia Pacific",
  slug: "australia",
  h1: "AI Automation & Digital Marketing Agency | for Australian Businesses",
  intro:
    "Sarvopaya partners with Australian businesses to scale through AI automation, performance marketing, SEO and conversion-optimised websites. The India–Australia digital partnership is one of the fastest-growing bilateral relationships in the Asia Pacific — and Sarvopaya brings Indian technology depth to the Australian market at genuinely competitive rates.",
  stats: [
    { value: "4.5h", label: "IST / AEST timezone difference" },
    { value: "15%+", label: "AU D2C e-commerce growth YoY" },
    { value: "60%+", label: "Cost advantage vs AU agencies" },
  ],
  whyUs: [
    {
      title: "AEST-compatible workflow",
      body: "AEST is 4.5 hours ahead of IST (4h during AEDT in summer). Our team structures work so Australian clients have deliverables ready when their business day starts — and our team is active during your afternoon for live calls and questions. The timezone is one of the easiest we work with.",
    },
    {
      title: "Australian D2C expertise",
      body: "Australia has a strong D2C e-commerce market with high consumer digital adoption. We understand Australian consumer behaviour, Google Shopping AU performance expectations and Meta audience sizing in Australia — and we run campaigns to local benchmarks, not global ones.",
    },
    {
      title: "Familiar tech stack",
      body: "Australian businesses typically use Shopify, HubSpot, Klaviyo, Xero and the standard global SaaS stack. Our automation and marketing systems are already built around these tools — no custom integration overhead, no learning curve. We start executing from day one.",
    },
    {
      title: "Indo-Pacific corridor advantage",
      body: "India–Australia is one of the fastest-growing bilateral digital relationships in the Asia Pacific. We understand both markets — and if your Australian business has interests in India, Southeast Asia or the broader Indo-Pacific, we have that regional context built in.",
    },
  ],
  industries: [
    "D2C E-commerce",
    "Health & Wellness",
    "Fintech",
    "SaaS & Technology",
    "Real Estate",
    "Professional Services",
    "Mining & Resources (digital transformation)",
    "Education",
  ],
  services: [
    { title: "AI Automation", href: "/services/ai-automation", desc: "n8n workflows, Klaviyo automation and AI processes for Australian Shopify stores and SaaS companies." },
    { title: "D2C Marketing", href: "/services/d2c-marketing", desc: "Meta and Google Shopping performance marketing tuned to Australian CPMs and local consumer behaviour." },
    { title: "SEO", href: "/services/seo", desc: "Australian market SEO, google.com.au optimisation and content strategy for Australian audiences." },
    { title: "Social Media Marketing", href: "/services/social-media-marketing", desc: "Instagram, Facebook, LinkedIn and TikTok — organic and paid social for Australian audiences." },
    { title: "Website & Digital Experience", href: "/services/website-digital-experience", desc: "Shopify stores, landing pages and conversion rate optimisation for Australian D2C brands." },
    { title: "Growth Consulting", href: "/services/growth-consulting", desc: "Digital audits and growth strategy for Australian businesses ready to scale." },
  ],
  faqs: [
    {
      q: "Do you have experience with the Australian D2C e-commerce market?",
      a: "Yes. We run performance marketing campaigns tuned to Australian market benchmarks — Meta CPMs for AU audiences, Google Shopping ROAS expectations in the AU market and Klaviyo email performance for Australian customer cohorts. We know what good looks like in AU, not just globally.",
    },
    {
      q: "Can you manage Google Shopping campaigns for Australia?",
      a: "Yes. Google Shopping AU is one of the primary performance channels for Australian D2C brands, and we manage Google Shopping campaigns including product feed optimisation, Performance Max, Smart Shopping migration and manual Shopping campaign management.",
    },
    {
      q: "How do you handle the IST to AEST timezone difference?",
      a: "AEST is 4.5 hours ahead of IST in standard time (4h during AEDT). We structure our working day so Australian clients have deliverables ready at their morning start. Most Australian clients find this works well — they brief us in the afternoon, we work overnight and they have outputs ready to review after their morning coffee.",
    },
    {
      q: "Do you work with Shopify and the typical Australian tech stack?",
      a: "Yes. Shopify is the dominant platform for Australian D2C, and we work with the full Australian e-commerce stack: Shopify, Klaviyo, Gorgias, Yotpo, Afterpay integrations, Google Merchant Center AU and Meta Commerce. We do not need time to learn your tools.",
    },
  ],
};

export default function AustraliaPage() {
  return <CountryPage {...data} />;
}
