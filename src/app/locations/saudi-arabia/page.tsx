import CountryPage, { type CountryPageProps } from "@/components/CountryPage";

const data: CountryPageProps = {
  country: "Saudi Arabia",
  flag: "🇸🇦",
  region: "Middle East",
  slug: "saudi-arabia",
  h1: "Digital Marketing Agency Saudi Arabia | Growth Marketing for KSA",
  intro:
    "Sarvopaya is a digital marketing and AI automation agency serving Saudi Arabian businesses navigating the Vision 2030 digital transformation. From Snapchat Ads and Arabic content strategy to AI automation and performance marketing, we help Saudi brands grow in the Kingdom's fast-expanding digital economy.",
  stats: [
    { value: "2.5h", label: "IST / AST timezone difference" },
    { value: "#1", label: "Saudi Snapchat usage globally" },
    { value: "2030", label: "Vision 2030 digital alignment" },
  ],
  whyUs: [
    {
      title: "Vision 2030 digital alignment",
      body: "Saudi Arabia's Vision 2030 is driving massive investment in digital transformation, fintech, entertainment and tourism. We build marketing systems designed for this growth arc — AI automation that scales with rapid business expansion, and digital strategies that position Saudi brands for the next decade.",
    },
    {
      title: "Snapchat-first strategy",
      body: "Saudi Arabia has one of the highest Snapchat usage rates per capita in the world. Snapchat is where a significant portion of the Saudi audience — particularly younger demographics — spends their time. We have Snapchat Ads expertise built specifically for the KSA market.",
    },
    {
      title: "Arabic content & cultural alignment",
      body: "Arabic content creation, Gulf-dialect social media, culturally appropriate creative and Hijri calendar-aware campaign planning (Ramadan, National Day, Eid). We understand the Saudi market context, not just the platform mechanics.",
    },
    {
      title: "Near-real-time collaboration",
      body: "Arabia Standard Time (AST) is only 2.5 hours behind IST — the tightest timezone gap among all our Western markets. Live working sessions, same-day feedback and real-time Slack collaboration are practical and common with our Saudi clients.",
    },
  ],
  industries: [
    "Retail & Consumer Goods",
    "Real Estate",
    "Healthcare",
    "Fintech",
    "Hospitality & Tourism",
    "F&B & Restaurant Chains",
    "Education",
    "Construction",
  ],
  services: [
    { title: "AI Automation", href: "/services/ai-automation", desc: "Lead routing, CRM automation and AI workflows for Saudi retail, real estate and service businesses." },
    { title: "D2C Marketing", href: "/services/d2c-marketing", desc: "Snapchat Ads, Meta and Google performance marketing for the Saudi consumer market." },
    { title: "SEO", href: "/services/seo", desc: "Arabic and English SEO for Saudi Arabia — local search, Google KSA and multilingual content strategy." },
    { title: "Social Media Marketing", href: "/services/social-media-marketing", desc: "Snapchat, Instagram and X — the platforms the Saudi audience uses most." },
    { title: "Website & Digital Experience", href: "/services/website-digital-experience", desc: "Arabic-first websites with RTL design, bilingual content and conversion optimisation for KSA." },
    { title: "Growth Consulting", href: "/services/growth-consulting", desc: "Digital audits and GTM strategy for Saudi businesses scaling during the Vision 2030 transformation." },
  ],
  faqs: [
    {
      q: "Do you manage Snapchat Ads for the Saudi market?",
      a: "Yes. Snapchat is one of the most important advertising platforms in Saudi Arabia, and we include it as a primary channel recommendation for most KSA clients. We manage Snap Ads, Story Ads, Spotlight and Dynamic Product Ads — with KSA-specific audience targeting and creative.",
    },
    {
      q: "Can you create Arabic content for Saudi campaigns?",
      a: "Yes. We create Arabic content for ads, landing pages, social media and email — including Modern Standard Arabic and Gulf dialect for social. We also handle Hijri calendar-aware campaign planning for Ramadan, Eid, Saudi National Day and other key calendar moments.",
    },
    {
      q: "Do you understand the Saudi market and its regulations?",
      a: "We understand the Saudi digital landscape — platform regulations, advertising guidelines for GCAM and the General Authority for Visual and Audio Media, content restrictions and the cultural context required for effective creative in KSA. We have worked with Saudi clients and understand what is and is not appropriate.",
    },
    {
      q: "How can Sarvopaya help with Vision 2030 digital initiatives?",
      a: "Vision 2030 is creating demand for digital transformation across every sector. We build the marketing and automation infrastructure that supports this: AI workflows that scale operations, digital acquisition systems that attract new customers, and online brand presence that positions Saudi businesses for growth in the 2030 economy.",
    },
  ],
};

export default function SaudiArabiaPage() {
  return <CountryPage {...data} />;
}
