import CountryPage, { type CountryPageProps } from "@/components/CountryPage";

const data: CountryPageProps = {
  country: "UAE",
  flag: "🇦🇪",
  region: "Middle East",
  slug: "uae",
  h1: "Digital Marketing Agency UAE | AI Automation Dubai",
  intro:
    "Sarvopaya is a digital marketing and AI automation agency working with UAE and Dubai businesses. We understand the Gulf market — high mobile penetration, Snapchat and Instagram-first audiences, bilingual content needs — and we deliver full-service digital growth at competitive rates.",
  stats: [
    { value: "99%", label: "Internet penetration in UAE" },
    { value: "IST+1.5h", label: "UAE timezone overlap" },
    { value: "2", label: "Languages served (EN + AR)" },
  ],
  whyUs: [
    {
      title: "MENA digital expertise",
      body: "We understand how UAE consumers discover, research and buy — Snapchat and Instagram for discovery, Google for intent, WhatsApp for conversion. We build funnels designed for Gulf consumer behaviour, not Western templates copy-pasted onto the MENA market.",
    },
    {
      title: "Bilingual English–Arabic capability",
      body: "Dubai is a bilingual market. We support English and Arabic content strategy, localised creative and ad copy for both language audiences. Whether you are targeting the expat English-speaking market or the Arabic-speaking Gulf audience, we build for both.",
    },
    {
      title: "Real estate & retail experience",
      body: "Two of the UAE's dominant verticals. We have experience running lead generation for Dubai real estate, e-commerce for retail brands, and performance marketing for luxury hospitality. We understand the deal values, lead quality expectations and buyer journey in these sectors.",
    },
    {
      title: "India–UAE corridor advantage",
      body: "India is UAE's largest trading partner, and the Indian community is the largest expatriate group in the UAE. The India–UAE business relationship creates natural alignment in strategy, communication speed and cultural understanding that no Western agency can match.",
    },
  ],
  industries: [
    "Real Estate",
    "Retail & Luxury",
    "Hospitality & Travel",
    "Fintech",
    "Healthcare",
    "Construction & Infrastructure",
    "Education",
    "F&B",
  ],
  services: [
    { title: "AI Automation", href: "/services/ai-automation", desc: "CRM automation, lead routing and AI workflows for UAE real estate, retail and service businesses." },
    { title: "D2C Marketing", href: "/services/d2c-marketing", desc: "Meta and Snapchat performance marketing tuned to UAE audiences and Gulf consumer behaviour." },
    { title: "SEO", href: "/services/seo", desc: "UAE and Dubai local SEO, Google Maps optimisation and content strategy for the Gulf market." },
    { title: "Social Media Marketing", href: "/services/social-media-marketing", desc: "Instagram, Snapchat and TikTok — the platforms UAE audiences actually use." },
    { title: "Website & Digital Experience", href: "/services/website-digital-experience", desc: "Arabic and English bilingual websites, conversion-optimised for UAE buyer journeys." },
    { title: "Growth Consulting", href: "/services/growth-consulting", desc: "GTM strategy and digital audits for UAE businesses entering new markets or scaling in the Gulf." },
  ],
  faqs: [
    {
      q: "Do you create Arabic content for UAE campaigns?",
      a: "Yes. We support Arabic content creation for ads, landing pages, social media and email — including right-to-left layout considerations for web properties. Our Arabic content is written for Modern Standard Arabic and Gulf dialect depending on the audience.",
    },
    {
      q: "Do you manage Snapchat advertising for the UAE market?",
      a: "Yes. Snapchat is a major platform in the UAE and wider Gulf, and we include it as a primary channel recommendation for relevant UAE clients. We manage Snapchat Ads campaigns including Snap Ads, Story Ads and Dynamic Product Ads.",
    },
    {
      q: "Can you help with real estate lead generation in Dubai?",
      a: "Yes. We have experience running lead generation campaigns for Dubai real estate — Meta lead gen campaigns, Google Search for high-intent buyers, landing pages designed for the Dubai property buyer journey and CRM automation to manage the lead-to-site-visit workflow.",
    },
    {
      q: "How do you handle the India–UAE timezone difference?",
      a: "UAE Standard Time (GST) is only 1.5 hours behind IST, making it the most timezone-compatible of all our markets. Near-real-time collaboration, same-day feedback cycles and live working sessions are all practical — making the India–UAE working relationship unusually smooth.",
    },
  ],
};

export default function UAEPage() {
  return <CountryPage {...data} />;
}
