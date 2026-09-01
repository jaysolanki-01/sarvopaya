"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import CTAButton from "@/components/CTAButton";
import Testimonials from "@/components/Testimonials";
import {
  SearchIcon,
  ChartIcon,
  GearIcon,
  LayersIcon,
  GlobeIcon,
  TargetIcon,
  BoltIcon,
  ShieldIcon,
  BrowserPulseIcon,
  OrbitNodesIcon,
  CompassNeedleIcon,
  RocketIcon,
  FunnelIcon,
  StarIcon,
  CursorClickIcon,
  CartIcon,
} from "@/components/icons";
import type { ComponentType } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

// ─── Data ────────────────────────────────────────────────────────────────────

const heroSurfaces = [
  { label: "GOOGLE", radius: 175, duration: 28, start: 0 },
  { label: "AI SEARCH", radius: 135, duration: 21, start: 60 },
  { label: "YOUTUBE", radius: 205, duration: 36, start: 120 },
  { label: "MAPS", radius: 155, duration: 26, start: 185 },
  { label: "COMMUNITIES", radius: 185, duration: 32, start: 245 },
  { label: "SOCIAL", radius: 130, duration: 23, start: 300 },
  { label: "PUBLICATIONS", radius: 215, duration: 41, start: 335 },
];

const systemSteps = [
  {
    step: "01",
    icon: SearchIcon,
    title: "Discover",
    summary: "Keyword research, audience research, search intent, competitor analysis.",
    purpose:
      "We begin with data, not templates. We map how your audience searches, what questions they ask, what content competitors own, and where your real opportunities are.",
  },
  {
    step: "02",
    icon: BrowserPulseIcon,
    title: "Build",
    summary: "Technical SEO, information architecture, internal linking, schema, Core Web Vitals.",
    purpose:
      "A website that search engines cannot crawl, understand, or trust cannot rank. We fix the foundations before building anything on top of them.",
  },
  {
    step: "03",
    icon: LayersIcon,
    title: "Answer",
    summary: "AEO, question-based content, content structure, entity relationships.",
    purpose:
      "Modern search often wants a direct answer, not a list of links. We build content that satisfies search intent rather than simply targeting keywords.",
  },
  {
    step: "04",
    icon: OrbitNodesIcon,
    title: "Establish",
    summary: "Topical authority, digital PR, relevant mentions, brand entity consistency.",
    purpose:
      "Authority is built through consistent expertise across related topics and references from credible sources. We build it systematically.",
  },
  {
    step: "05",
    icon: GlobeIcon,
    title: "Optimise",
    summary: "GEO, AI-search visibility, content clarity, source relationships.",
    purpose:
      "We strengthen your brand's digital presence so it is easier for both traditional search engines and generative AI systems to understand, contextualise, and surface your brand.",
  },
  {
    step: "06",
    icon: ChartIcon,
    title: "Measure",
    summary: "GSC, GA4, rank tracking, organic conversions, search visibility signals.",
    purpose:
      "We track visibility, engagement, demand, and business outcomes not just rankings. Monthly reports translate data into decisions.",
  },
];

type TechItem = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  what: string;
  why: string;
};

const techItems: TechItem[] = [
  {
    icon: BrowserPulseIcon,
    title: "Crawlability & Indexation",
    what: "Ensuring search engines can discover, access, and index all pages that should be indexed and that pages which should not be indexed are correctly excluded.",
    why: "If a search engine cannot access a page, it cannot rank it. Poor crawl configuration wastes crawl budget and keeps important content out of the index.",
  },
  {
    icon: GearIcon,
    title: "Site Architecture",
    what: "The logical structure of your website how pages are organised, categorised, and connected to each other.",
    why: "A clear, logical site structure helps search engines understand the hierarchy of your content and pass authority to the pages that matter most.",
  },
  {
    icon: BoltIcon,
    title: "Core Web Vitals",
    what: "Google's set of performance metrics measuring load time (LCP), interactivity (INP), and visual stability (CLS).",
    why: "Core Web Vitals are a confirmed Google ranking factor and directly affect user experience. Poor scores can suppress ranking performance.",
  },
  {
    icon: OrbitNodesIcon,
    title: "Structured Data",
    what: "Machine-readable metadata added to page content using Schema.org vocabulary in JSON-LD format.",
    why: "Structured data helps search engines understand the context of your content and can enable rich results in search. It does not independently cause rankings.",
  },
  {
    icon: SearchIcon,
    title: "JavaScript SEO",
    what: "Ensuring that content rendered by JavaScript frameworks is correctly accessible to search engine crawlers.",
    why: "Many modern websites render critical content via JavaScript. If crawlers cannot access that content, it effectively doesn't exist in the index.",
  },
  {
    icon: ShieldIcon,
    title: "Canonical & Duplicate Content",
    what: "Resolving situations where the same or very similar content exists at multiple URLs.",
    why: "Duplicate content dilutes authority and confuses search engines about which version to rank. Canonical tags and proper redirect strategies resolve this.",
  },
  {
    icon: LayersIcon,
    title: "XML Sitemaps & Robots.txt",
    what: "Configuration files that guide search engine crawlers to important pages and away from pages that should not be indexed.",
    why: "These are foundational files that influence how search engines allocate crawl budget and which pages enter the index.",
  },
  {
    icon: CompassNeedleIcon,
    title: "Redirects & URL Structure",
    what: "Managing how URLs are structured and how traffic is directed when pages move, change, or are removed.",
    why: "Poor redirect management creates crawl errors, dilutes authority, and degrades user experience. URL structure affects both usability and search engine understanding.",
  },
  {
    icon: FunnelIcon,
    title: "Internal Linking",
    what: "The strategic connection of pages within your own website to distribute authority and guide search engines and users through the content.",
    why: "Internal links are one of the most underused and most impactful on-site SEO signals. They directly influence how authority flows and how pages rank.",
  },
];

type Service = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  what: string;
  how: string;
  when: string;
};

const services: Service[] = [
  {
    icon: BrowserPulseIcon,
    title: "Technical SEO",
    what: "Ensuring your website's infrastructure is crawlable, indexable, fast, and structurally sound.",
    how: "Technical audit, crawl analysis, Core Web Vitals assessment, structured data implementation, canonicalisation, redirect strategy.",
    when: "When rankings are unexpectedly low despite good content, after major site migrations, or at the start of any serious SEO engagement.",
  },
  {
    icon: SearchIcon,
    title: "On-Page SEO",
    what: "Optimising the individual elements of each page titles, headings, content, internal links for relevance and authority.",
    how: "Page-level audits, title and meta optimisation, heading structure, content relevance assessment, E-E-A-T signals, image optimisation.",
    when: "When pages have weak organic visibility despite being well-built technically, or when launching new pages.",
  },
  {
    icon: GlobeIcon,
    title: "Enterprise SEO",
    what: "SEO at scale managing hundreds or thousands of pages, complex site architectures, and multi-stakeholder environments.",
    how: "Crawl intelligence, log file analysis, content audits at scale, faceted navigation, international SEO, template optimisation.",
    when: "For large websites, ecommerce platforms, news and media properties, or organisations with multiple digital properties.",
  },
  {
    icon: CompassNeedleIcon,
    title: "Local SEO",
    what: "Improving visibility in geographically targeted searches, including Google Maps and location-based results.",
    how: "Google Business Profile optimisation, local citation management, location-specific content, local structured data, review strategy.",
    when: "For businesses serving specific geographic areas retail, hospitality, healthcare, professional services with local offices.",
  },
  {
    icon: CartIcon,
    title: "Ecommerce SEO",
    what: "SEO tailored to product pages, category pages, faceted navigation, and the specific challenges of online retail.",
    how: "Product schema, category page architecture, faceted navigation handling, thin content resolution, product content strategy.",
    when: "For online stores with significant product catalogues that need organic visibility alongside paid acquisition.",
  },
  {
    icon: LayersIcon,
    title: "Content SEO",
    what: "Creating and optimising content that satisfies search intent, builds topical authority, and attracts organic traffic.",
    how: "Search intent mapping, content gap analysis, topic cluster planning, content briefs, content audits, content optimisation.",
    when: "When organic traffic from content is a meaningful growth channel, or when an existing blog or resource section isn't performing.",
  },
  {
    icon: TargetIcon,
    title: "Keyword Research",
    what: "Identifying the specific queries your audience uses to discover products, services, or information in your category.",
    how: "Primary and secondary keyword mapping, intent classification, opportunity assessment, competitor query analysis, semantic topic mapping.",
    when: "At the foundation of any content or SEO strategy, or when refreshing an existing strategy with updated search data.",
  },
  {
    icon: OrbitNodesIcon,
    title: "Topical Authority",
    what: "Building comprehensive coverage of a topic area so search engines recognise your brand as a credible, authoritative source.",
    how: "Topic cluster architecture, content gap mapping, pillar and satellite content strategy, semantic entity relationships.",
    when: "When a brand needs to establish domain expertise in a specific field, especially in competitive or regulated industries.",
  },
  {
    icon: FunnelIcon,
    title: "Internal Linking",
    what: "Strategic connection of pages within your website to distribute authority and signal relevance relationships.",
    how: "Internal link audit, anchor text analysis, link architecture planning, contextual link insertion, hub page optimisation.",
    when: "As part of any technical or content SEO project, particularly when pages with good content are underperforming.",
  },
  {
    icon: ShieldIcon,
    title: "Structured Data",
    what: "Schema.org markup that helps search engines understand the context and type of your content.",
    how: "JSON-LD implementation for Service, Organisation, Article, FAQ, Breadcrumb, Product, and other relevant types.",
    when: "Across all SEO projects where search engine understanding of content type matters, which is most of them.",
  },
  {
    icon: BoltIcon,
    title: "AEO",
    what: "Answer Engine Optimisation structuring content to satisfy answer-oriented search queries and search features.",
    how: "Question-based content development, FAQ architecture, concise answer formatting, intent-matched content structure.",
    when: "For businesses whose audiences frequently search for how, what, and why questions before making purchasing decisions.",
  },
  {
    icon: GlobeIcon,
    title: "GEO",
    what: "Generative Engine Optimisation improving a brand's digital presence for clarity and coherence in generative search environments.",
    how: "Entity clarity, topical consistency, first-party content signals, third-party brand mentions, structured information.",
    when: "For brands that want to build a consistent, well-understood digital presence as search increasingly integrates AI-generated experiences.",
  },
  {
    icon: StarIcon,
    title: "Digital PR",
    what: "Earning relevant mentions, links, and references from credible sources across the web.",
    how: "Story development, publication outreach, thought leadership placement, expert commentary, data-driven content for press.",
    when: "When building authority requires third-party validation, particularly in competitive markets where link quality matters.",
  },
  {
    icon: CursorClickIcon,
    title: "Entity Optimisation",
    what: "Ensuring your brand, products, and people are clearly understood as distinct, verifiable entities by search and AI systems.",
    how: "Organisation schema, consistent NAP data, Wikipedia/Wikidata presence where appropriate, author bios, brand consistency across platforms.",
    when: "When a brand is not surfacing appropriately in branded searches, or when building GEO foundations.",
  },
  {
    icon: ChartIcon,
    title: "SEO Analytics",
    what: "Converting search performance data into clear decisions that improve strategy each month.",
    how: "Google Search Console analysis, GA4 organic reporting, rank tracking, CTR opportunity identification, content decline monitoring.",
    when: "As an ongoing element of any SEO engagement strategy without measurement is guesswork.",
  },
];

const processSteps = [
  { label: "Audit", desc: "Comprehensive review of technical health, content performance, search visibility, and competitor landscape." },
  { label: "Strategy", desc: "A documented plan connecting search opportunities to your specific business objectives and timelines." },
  { label: "Implementation", desc: "Technical fixes, on-page optimisation, and structural improvements executed or guided by our team." },
  { label: "Content", desc: "Content creation and optimisation aligned to a search intent map and topical authority roadmap." },
  { label: "Authority", desc: "Digital PR, entity building, and external signals that reinforce relevance and trust." },
  { label: "Measurement", desc: "Monthly reporting that translates visibility data into clear, actionable next steps." },
  { label: "Optimisation", desc: "Continuous refinement based on data, algorithm changes, and evolving audience behaviour." },
];

const measurementTiers = [
  {
    label: "Visibility",
    metrics: ["Impressions", "Ranking distribution", "Search appearance types", "Organic click share"],
    meaning: "Is our brand appearing in front of the right people?",
  },
  {
    label: "Engagement",
    metrics: ["Click-through rate", "Organic sessions", "Engaged sessions", "Landing-page scroll depth"],
    meaning: "Is the traffic we're earning actually engaging with our content?",
  },
  {
    label: "Demand",
    metrics: ["Qualified enquiries", "Contact form submissions", "Calls from organic", "Product page interactions"],
    meaning: "Is organic search creating commercial intent?",
  },
  {
    label: "Business",
    metrics: ["Leads from organic", "Organic revenue", "Customer acquisition cost", "Organic pipeline contribution"],
    meaning: "Is search contributing to real business outcomes?",
  },
];

const faqData = [
  {
    question: "What is SEO?",
    answer:
      "Search Engine Optimisation (SEO) is the practice of improving a website's visibility in organic (non-paid) search results. It covers technical infrastructure, on-page relevance, content quality, and authority signals. The goal is to make a website easier for search engines to discover, understand, and surface when users search for relevant topics.",
  },
  {
    question: "What is AEO?",
    answer:
      "Answer Engine Optimisation (AEO) is the practice of structuring content to satisfy answer-oriented search queries. As search engines increasingly surface direct answers through featured snippets, People Also Ask boxes, and other search features content that is clearly structured and intent-matched is more likely to be used. AEO focuses on question-based content, concise answers, and logical information architecture.",
  },
  {
    question: "What is GEO?",
    answer:
      "Generative Engine Optimisation (GEO) is the practice of improving a brand's digital presence so it is more clearly understood by generative AI systems including Google AI Overviews, ChatGPT, Gemini, Perplexity, and others. GEO focuses on entity clarity, topical authority, consistent brand information, and high-quality content across multiple platforms. It does not guarantee that any AI system will cite or surface a specific brand.",
  },
  {
    question: "Is GEO replacing SEO?",
    answer:
      "No. GEO is an extension of good SEO practice, not a replacement. Most GEO best practices clear entity information, topical authority, high-quality content, structured data, and relevant third-party mentions are also strong SEO fundamentals. Traditional search remains widely used. GEO simply addresses a broader set of discovery surfaces that have emerged alongside generative AI search.",
  },
  {
    question: "What is the difference between SEO and GEO?",
    answer:
      "SEO primarily focuses on improving visibility in traditional search engine results pages (SERPs). GEO focuses on improving a brand's presence and clarity in generative AI search experiences. SEO success is measured in rankings, clicks, and organic sessions. GEO success is harder to measure directly it relates more to brand entity coherence, topical association, and the overall quality of a brand's digital information ecosystem.",
  },
  {
    question: "How does AEO work?",
    answer:
      "AEO works by structuring content to directly and clearly answer the questions your audience is asking. This means writing content with clear question-and-answer formats, organising information logically, using concise direct answers followed by supporting context, and targeting specific search intents rather than broad topics. Structured data such as FAQPage schema can also help search engines identify answer content.",
  },
  {
    question: "Can SEO help with AI search?",
    answer:
      "Yes, indirectly. Strong SEO fundamentals clear content, well-structured information, topical authority, consistent entity signals, and relevant external references are also the foundations of a strong GEO presence. A brand with high organic search visibility has usually built many of the signals that also help generative AI systems understand and contextualise it. However, SEO and GEO are not identical, and neither guarantees AI citation.",
  },
  {
    question: "How long does SEO take?",
    answer:
      "For most businesses, meaningful organic visibility improvements take three to six months. Significant business impact typically takes six to twelve months. This depends on the competitiveness of your market, your current site health, the quality and quantity of content you publish, and the authority your domain has already built. SEO is a compounding discipline results grow over time rather than arriving immediately.",
  },
  {
    question: "How much does SEO cost?",
    answer:
      "SEO costs vary significantly based on scope, market competitiveness, and what the work involves. Technical SEO projects, content programmes, and ongoing retained engagements all carry different costs. At Sarvopaya, we scope each engagement based on your objectives and what achieving them actually requires. We do not offer flat-rate packages that apply the same work to every business.",
  },
  {
    question: "Does SEO still work in 2026?",
    answer:
      "Yes. Organic search remains one of the highest-intent discovery channels for most businesses. Google continues to process billions of searches per day. What has changed is that search is more sophisticated it rewards genuine expertise, clear information, and helpful content rather than keyword repetition. SEO that focuses on user value and search intent works as well as it always has.",
  },
  {
    question: "How do I appear in AI search results?",
    answer:
      "There is no guaranteed method to appear in AI-generated search results or be cited by systems like ChatGPT, Gemini, or Perplexity. These systems draw on a wide range of sources and their inclusion criteria are not fully transparent. However, brands with clear entity information, topical authority, consistent digital presence, high-quality content, and relevant third-party references have a stronger information ecosystem which is the foundation of GEO.",
  },
  {
    question: "Can you guarantee Google rankings?",
    answer:
      "No. Anyone who guarantees specific Google rankings is making a claim they cannot fulfil. Google's algorithms consider hundreds of signals and are continuously updated. What we can commit to is sound strategy, thorough implementation, and consistent measurement the conditions most likely to result in improved visibility over time.",
  },
  {
    question: "Can you guarantee ChatGPT or AI citations?",
    answer:
      "No. No agency can guarantee inclusion in AI-generated answers from ChatGPT, Google AI Overviews, Gemini, Perplexity, or any other generative system. These systems make their own decisions based on their training data and retrieval mechanisms. We focus on building the underlying conditions entity clarity, topical authority, quality content, relevant mentions that create a stronger foundation for potential inclusion.",
  },
  {
    question: "Does Google Search Console measure GEO?",
    answer:
      "No. Google Search Console provides data about your website's performance in traditional Google Search impressions, clicks, positions, and search queries. It does not directly measure your brand's presence or performance in AI-generated experiences, AI Overviews, or generative search. Some AI Overview appearances may generate clicks that appear in GSC, but GSC was not built as a GEO measurement tool and should not be treated as one.",
  },
  {
    question: "How do you measure SEO success?",
    answer:
      "We measure across four layers: Visibility (impressions, ranking distribution, organic click share), Engagement (CTR, organic sessions, engaged sessions), Demand (enquiries, form submissions, calls from organic), and Business (leads, revenue, organic pipeline contribution). The most important metrics depend on your business model and objectives. We align measurement to what actually matters for your business at the start of every engagement.",
  },
];

const searchQs = [
  { text: "Best SEO agency for SaaS?", angle: 0, radius: 190, speed: 0.003, intent: "Commercial", content: "Agency comparison page", entity: "SEO Agency" },
  { text: "How does GEO work?", angle: 1.1, radius: 145, speed: 0.0045, intent: "Informational", content: "GEO explainer", entity: "Generative Engine Optimisation" },
  { text: "Why is organic traffic declining?", angle: 2.2, radius: 220, speed: 0.002, intent: "Investigational", content: "Traffic decline guide", entity: "Organic Search" },
  { text: "AEO vs SEO differences?", angle: 3.3, radius: 165, speed: 0.0035, intent: "Informational", content: "Comparison article", entity: "AEO, SEO" },
  { text: "How long does SEO take?", angle: 4.4, radius: 180, speed: 0.004, intent: "Informational", content: "SEO timeline guide", entity: "SEO" },
  { text: "Appear in AI search results?", angle: 5.5, radius: 135, speed: 0.005, intent: "Informational", content: "GEO strategy guide", entity: "AI Search, GEO" },
  { text: "Technical SEO audit checklist", angle: 0.7, radius: 205, speed: 0.0025, intent: "Informational", content: "Technical audit guide", entity: "Technical SEO" },
  { text: "What is topical authority?", angle: 2.0, radius: 155, speed: 0.0038, intent: "Informational", content: "Content strategy article", entity: "Topical Authority" },
  { text: "How to improve Google rankings?", angle: 3.8, radius: 175, speed: 0.0032, intent: "Commercial", content: "SEO guide", entity: "Google Search" },
  { text: "Content strategy for SEO 2026", angle: 5.0, radius: 210, speed: 0.0022, intent: "Informational", content: "Content strategy guide", entity: "Content, SEO" },
];

const discoverySurfaces = [
  { label: "Google Search", desc: "Organic search results, featured snippets, knowledge panels" },
  { label: "AI Search", desc: "Google AI Overviews, ChatGPT, Gemini, Perplexity" },
  { label: "YouTube", desc: "Video search, Shorts, channel discovery" },
  { label: "Google Maps", desc: "Local business discovery and navigation" },
  { label: "Reddit", desc: "Community discussions and peer recommendations" },
  { label: "Social Platforms", desc: "Instagram, LinkedIn, X, TikTok search and discovery" },
  { label: "Industry Publications", desc: "Trade media, niche directories, vertical platforms" },
  { label: "News & PR", desc: "Google News, press mentions, earned media" },
  { label: "Review Platforms", desc: "Google Reviews, Trustpilot, G2, Clutch" },
  { label: "Communities", desc: "Slack groups, Discord, newsletters, forums" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider ${
        dark ? "border-white/10 text-white/60" : "border-black/10 text-black/60"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}

function PlusIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10">
      <motion.span
        animate={{ rotate: open ? 45 : 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="relative flex h-8 w-8 items-center justify-center"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={open ? "text-accent" : "text-black"}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      </motion.span>
    </span>
  );
}

function HeroOrbit({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative mx-auto h-[400px] w-[400px] sm:h-[460px] sm:w-[460px]">
      {/* Orbit rings */}
      {[130, 165, 200, 215].map((r) => (
        <div
          key={r}
          style={{ width: r * 2, height: r * 2, top: "50%", left: "50%", marginTop: -r, marginLeft: -r }}
          className="absolute rounded-full border border-white/[0.06]"
        />
      ))}

      {/* Center node */}
      <div className="absolute top-1/2 left-1/2 z-10 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/20 bg-black shadow-[0_0_40px_rgba(220,38,38,0.2)]">
        <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/40">BRAND</span>
        <span className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.2em] text-white/40">ENTITY</span>
        <span className="mt-1.5 h-1 w-1 rounded-full bg-accent" />
      </div>

      {/* Orbiting labels */}
      {heroSurfaces.map((s) => (
        <motion.div
          key={s.label}
          style={{ position: "absolute", top: "50%", left: "50%", width: 0, height: 0 }}
          animate={reduced ? {} : { rotate: 360 }}
          initial={{ rotate: s.start }}
          transition={{ duration: s.duration, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            style={{ position: "absolute", left: s.radius - 2, top: -14, whiteSpace: "nowrap" }}
            animate={reduced ? {} : { rotate: -360 }}
            initial={{ rotate: -s.start }}
            transition={{ duration: s.duration, repeat: Infinity, ease: "linear" }}
            className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/50 backdrop-blur-sm"
          >
            {s.label}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

function SearchJourneyCanvas({ reduced }: { reduced: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const qRef = useRef(searchQs.map((q) => ({ ...q, cur: q.angle })));
  const [selected, setSelected] = useState(-1);

  function rrect(
    ctx: CanvasRenderingContext2D,
    x: number, y: number, w: number, h: number, r: number
  ) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
  }

  const draw = useCallback(
    (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
      const dpr = window.devicePixelRatio || 1;
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;

      if (canvas.width !== W * dpr || canvas.height !== H * dpr) {
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      ctx.clearRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2;
      const qs = qRef.current;
      const mouse = mouseRef.current;
      const isMobile = W < 640;
      const fontSize = isMobile ? 10 : 12;

      // Advance angles
      if (!reduced) {
        for (const q of qs) q.cur += q.speed;
      }

      // Orbit rings
      const radii = [...new Set(qs.map((q) => q.radius))];
      for (const r of radii) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255,255,255,0.035)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.font = `${fontSize}px system-ui,-apple-system,sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let i = 0; i < qs.length; i++) {
        const q = qs[i];
        const rad = isMobile ? q.radius * 0.72 : q.radius;
        let qx = cx + Math.cos(q.cur) * rad;
        let qy = cy + Math.sin(q.cur) * rad;

        // Mouse repulsion
        const dx = qx - mouse.x;
        const dy = qy - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90 && dist > 0) {
          const strength = ((90 - dist) / 90) * 22;
          qx += (dx / dist) * strength;
          qy += (dy / dist) * strength;
        }

        const isSelected = selected === i;
        const tw = ctx.measureText(q.text).width;
        const ph = 26;
        const pw = tw + 20;
        const alpha = isSelected ? 1 : 0.65;

        // Pill background
        ctx.fillStyle = isSelected ? "rgba(220,38,38,0.9)" : `rgba(255,255,255,${0.06 * alpha})`;
        rrect(ctx, qx - pw / 2, qy - ph / 2, pw, ph, 5);
        ctx.fill();

        // Border
        ctx.strokeStyle = isSelected ? "rgba(220,38,38,0.5)" : `rgba(255,255,255,${0.12 * alpha})`;
        ctx.lineWidth = 1;
        rrect(ctx, qx - pw / 2, qy - ph / 2, pw, ph, 5);
        ctx.stroke();

        // Text
        ctx.fillStyle = isSelected ? "#ffffff" : `rgba(255,255,255,${0.55 + (alpha - 0.65) * 2})`;
        ctx.fillText(q.text, qx, qy);

        // Line to center
        if (isSelected) {
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(qx, qy);
          ctx.strokeStyle = "rgba(220,38,38,0.25)";
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      // Center circle
      ctx.beginPath();
      ctx.arc(cx, cy, 40, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();

      ctx.fillStyle = "#111111";
      ctx.font = `bold 9px system-ui,sans-serif`;
      ctx.fillText("BRAND", cx, cy - 6);
      ctx.font = `9px system-ui,sans-serif`;
      ctx.fillStyle = "#555555";
      ctx.fillText("ENTITY", cx, cy + 6);

      rafRef.current = requestAnimationFrame(() => draw(canvas, ctx));
    },
    [selected, reduced]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const onMouseMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    const onClick = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      const mx = e.clientX - r.left;
      const my = e.clientY - r.top;
      const cx = r.width / 2;
      const cy = r.height / 2;
      const isMobile = r.width < 640;

      let closest = -1;
      let minDist = 55;
      qRef.current.forEach((q, i) => {
        const rad = isMobile ? q.radius * 0.72 : q.radius;
        const qx = cx + Math.cos(q.cur) * rad;
        const qy = cy + Math.sin(q.cur) * rad;
        const d = Math.sqrt((mx - qx) ** 2 + (my - qy) ** 2);
        if (d < minDist) { minDist = d; closest = i; }
      });

      setSelected((prev) => (prev === closest ? -1 : closest));
    };

    const onTouch = (e: TouchEvent) => {
      const r = canvas.getBoundingClientRect();
      const t = e.touches[0];
      mouseRef.current = { x: t.clientX - r.left, y: t.clientY - r.top };
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("click", onClick);
    canvas.addEventListener("touchmove", onTouch, { passive: true });

    rafRef.current = requestAnimationFrame(() => draw(canvas, ctx));

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("click", onClick);
      canvas.removeEventListener("touchmove", onTouch);
    };
  }, [draw]);

  const selQ = selected >= 0 && selected < searchQs.length ? searchQs[selected] : null;

  return (
    <div className="relative h-[460px] w-full sm:h-[560px]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full cursor-crosshair"
        aria-label="Interactive visualisation of search questions orbiting a brand entity. Click a question to see how it connects to discovery."
        role="img"
      />

      {/* Hint */}
      {selected === -1 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-[11px] font-semibold uppercase tracking-widest text-white/25"
        >
          Click a question
        </motion.p>
      )}

      {/* Journey overlay */}
      <AnimatePresence>
        {selQ && (
          <motion.div
            key={selected}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="absolute right-4 top-4 sm:right-6 sm:top-6 w-[170px] rounded-2xl border border-white/10 bg-black/60 p-5 backdrop-blur-md"
          >
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-accent">
              Search Journey
            </p>
            <p className="mt-2 text-[11px] italic leading-4 text-white/40">
              "{selQ.text}"
            </p>
            <div className="mt-4 flex flex-col gap-0">
              {[
                { label: "Question", value: selQ.text.replace("?", "") },
                { label: "Intent", value: selQ.intent },
                { label: "Content", value: selQ.content },
                { label: "Entity", value: selQ.entity },
                { label: "Discovery", value: "Brand found" },
              ].map((row, i) => (
                <motion.div
                  key={row.label}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.25, ease: EASE }}
                  className="flex flex-col"
                >
                  <div className="flex items-start gap-2">
                    <div className="mt-1.5 flex flex-col items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
                      {i < 4 && <span className="h-4 w-px bg-white/10" />}
                    </div>
                    <div className="pb-1">
                      <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/30">{row.label}</p>
                      <p className="text-[11px] leading-4 text-white/70">{row.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SeoPage() {
  const [activeTech, setActiveTech] = useState<number | null>(0);
  const [activeService, setActiveService] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const prefersReduced = useReducedMotion() ?? false;

  return (
    <>
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "SEO Services",
            provider: { "@type": "Organization", name: "Sarvopaya", url: "https://sarvopaya.com" },
            description:
              "SEO, AEO, and GEO services designed to improve search visibility across traditional search engines, AI-powered search experiences, and other modern discovery surfaces.",
            areaServed: "IN",
            serviceType: "Search Engine Optimisation",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqData.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://sarvopaya.com" },
              { "@type": "ListItem", position: 2, name: "Services", item: "https://sarvopaya.com/services" },
              { "@type": "ListItem", position: 3, name: "SEO Services", item: "https://sarvopaya.com/services/seo" },
            ],
          }),
        }}
      />

      {/* ── Section 1: Hero ─────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-black py-16 sm:py-20 lg:min-h-[calc(100dvh-4rem)]">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 top-0 select-none text-[130px] font-bold uppercase leading-none text-transparent sm:text-[200px] lg:text-[280px]"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.04)" }}
        >
          SEARCH
        </span>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
            {/* Left: text */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="flex-1 text-center lg:text-left"
            >
              <motion.div variants={fadeUp}>
                <SectionLabel dark>SEO · AEO · GEO</SectionLabel>
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="mt-6 text-4xl font-bold leading-[1.03] tracking-tight text-white sm:text-6xl lg:text-7xl"
              >
                Be Found.<br />
                Be{" "}
                <span className="text-accent">Understood.</span>
                <br />
                Be Chosen.
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/60 lg:mx-0 sm:text-lg"
              >
                Search has expanded beyond the search bar. We build search visibility systems
                covering SEO, AEO, and GEO so your brand is easier to discover, understand,
                and trust across every surface where your audience is looking.
              </motion.p>
              <motion.div
                variants={fadeUp}
                className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
              >
                <CTAButton href="/contact" variant="inverted" size="lg">
                  Get a Search Visibility Audit
                </CTAButton>
                <CTAButton href="/contact" variant="outline" size="lg">
                  Talk to a Strategist
                </CTAButton>
              </motion.div>
              <motion.p variants={fadeUp} className="mt-6 text-xs text-white/30">
                Technical SEO · Content SEO · AEO · GEO · Topical Authority · Entity Optimisation
              </motion.p>
            </motion.div>

            {/* Right: orbit visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: EASE }}
              className="flex-1 flex items-center justify-center"
            >
              <HeroOrbit reduced={prefersReduced} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Search Has Changed ───────────────────────────────────── */}
      <section className="w-full bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl"
          >
            <motion.div variants={item}>
              <SectionLabel>Search Has Changed</SectionLabel>
            </motion.div>
            <motion.h2
              variants={item}
              className="mt-6 text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl lg:text-5xl"
            >
              Search is no longer{" "}
              <span className="text-accent">one search box.</span>
            </motion.h2>
            <motion.p variants={item} className="mt-4 max-w-2xl text-base leading-7 text-black/60">
              The way people discover businesses, products, and information has expanded significantly.
              Traditional search remains important, but it is no longer the only path from question to discovery.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            {/* Old model */}
            <motion.div variants={item} className="rounded-3xl border border-black/10 bg-neutral-50 p-8">
              <p className="text-[11px] font-bold uppercase tracking-widest text-black/30">Old model</p>
              <h3 className="mt-3 font-heading text-lg font-bold text-black">Query → Webpage → Click</h3>
              <div className="mt-6 flex flex-col gap-2">
                {["Query", "Search engine", "Ranked webpages", "User clicks a result", "Landing page"].map((step, i) => (
                  <div key={step} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-black/10 text-[10px] font-bold text-black/50">
                        {i + 1}
                      </span>
                      {i < 4 && <span className="h-3 w-px bg-black/10" />}
                    </div>
                    <p className="text-sm text-black/60">{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* New model */}
            <motion.div variants={item} className="rounded-3xl border border-black bg-black p-8">
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/30">Modern model</p>
              <h3 className="mt-3 font-heading text-lg font-bold text-white">Question → Multiple surfaces → Trust → Action</h3>
              <div className="mt-6 flex flex-col gap-2">
                {[
                  "Question (spoken, typed, or contextual)",
                  "Search engine, AI chat, platform, community",
                  "Sources, entities, content, answers",
                  "AI-generated answer, link, video, map",
                  "Brand trust built across multiple touchpoints",
                  "Action: visit, enquiry, purchase, follow",
                ].map((step, i) => (
                  <div key={step} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-accent text-[10px] font-bold text-white">
                        {i + 1}
                      </span>
                      {i < 5 && <span className="h-3 w-px bg-white/10" />}
                    </div>
                    <p className="text-sm text-white/70">{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Section 3: SEO + AEO + GEO ───────────────────────────────────────── */}
      <section className="w-full bg-neutral-50 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl"
          >
            <motion.div variants={item}>
              <SectionLabel>Three Disciplines, One System</SectionLabel>
            </motion.div>
            <motion.h2
              variants={item}
              className="mt-6 text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl lg:text-5xl"
            >
              SEO. AEO. GEO.{" "}
              <span className="text-accent">They are not separate services.</span>
            </motion.h2>
            <motion.p variants={item} className="mt-4 max-w-2xl text-base leading-7 text-black/60">
              They are overlapping disciplines, each addressing a different layer of modern search visibility.
              The strongest search strategies integrate all three.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={container}
            className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3"
          >
            {[
              {
                abbr: "SEO",
                full: "Search Engine Optimisation",
                goal: "Improve organic search visibility in traditional search engines.",
                focus: [
                  "Technical infrastructure",
                  "On-page content and relevance",
                  "Internal linking",
                  "Site authority",
                  "User experience",
                  "Crawlability and indexation",
                ],
                note: "The established foundation of search visibility. Still essential.",
              },
              {
                abbr: "AEO",
                full: "Answer Engine Optimisation",
                goal: "Structure content to directly satisfy answer-oriented search queries.",
                focus: [
                  "Question-based content",
                  "Concise, structured answers",
                  "Search intent mapping",
                  "FAQ and content architecture",
                  "Entity relationships",
                  "People Also Ask opportunities",
                ],
                note: "Addresses how search increasingly surfaces answers rather than just links.",
              },
              {
                abbr: "GEO",
                full: "Generative Engine Optimisation",
                goal: "Improve a brand's clarity and coherence within generative AI search environments.",
                focus: [
                  "Entity clarity and consistency",
                  "Topical authority",
                  "First-party content signals",
                  "Third-party brand mentions",
                  "Structured information",
                  "Digital PR and references",
                ],
                note: "Cannot guarantee AI citations. Focuses on the conditions that strengthen brand understanding.",
              },
            ].map((d) => (
              <motion.div
                key={d.abbr}
                variants={item}
                className="group flex flex-col overflow-hidden rounded-3xl border border-black/10 bg-white p-8 transition-shadow duration-300 hover:shadow-xl hover:shadow-black/5"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-heading text-4xl font-bold text-black">{d.abbr}</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-black/40">{d.full}</span>
                </div>
                <div className="mt-5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-black/30">Goal</p>
                  <p className="mt-1 text-sm leading-6 text-black/70">{d.goal}</p>
                </div>
                <div className="mt-5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-black/30">Focus areas</p>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {d.focus.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-black/60">
                        <span className="h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto pt-6 border-t border-black/10">
                  <p className="text-xs italic text-black/40">{d.note}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Section 4: Search Visibility System ─────────────────────────────── */}
      <section className="w-full bg-black py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl"
          >
            <motion.div variants={item}>
              <SectionLabel dark>Our Approach</SectionLabel>
            </motion.div>
            <motion.h2
              variants={item}
              className="mt-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              The Search{" "}
              <span className="text-accent">Visibility System</span>
            </motion.h2>
            <motion.p variants={item} className="mt-4 max-w-xl text-base leading-7 text-white/60">
              Six interconnected stages from research to ongoing optimisation.
              Each stage has a clear purpose not just a deliverable.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={container}
            className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {systemSteps.map((step) => (
              <motion.div
                key={step.step}
                variants={item}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors duration-500 hover:border-accent/30 hover:bg-accent/10"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 -top-5 font-heading text-[5rem] font-bold leading-none text-white/[0.04]"
                >
                  {step.step}
                </span>
                <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white transition-colors duration-500 group-hover:bg-accent">
                  <step.icon className="h-6 w-6" />
                </span>
                <h3 className="relative mt-5 font-heading text-base font-bold text-white">{step.title}</h3>
                <p className="relative mt-1 text-xs font-semibold uppercase tracking-wider text-accent">{step.summary}</p>
                <p className="relative mt-3 text-sm leading-6 text-white/50">{step.purpose}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Section 5: Technical SEO ─────────────────────────────────────────── */}
      <section className="w-full bg-neutral-50 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl"
          >
            <motion.div variants={item}>
              <SectionLabel>Technical SEO</SectionLabel>
            </motion.div>
            <motion.h2
              variants={item}
              className="mt-6 text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl"
            >
              The infrastructure beneath{" "}
              <span className="text-accent">every ranking.</span>
            </motion.h2>
            <motion.p variants={item} className="mt-4 max-w-2xl text-base leading-7 text-black/60">
              Great content on a technically weak website will underperform. Technical SEO ensures
              search engines can find, access, understand, and trust your website before anything else.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-12 divide-y divide-black/10 border-t border-b border-black/10"
          >
            {techItems.map((tech, index) => {
              const open = activeTech === index;
              return (
                <div key={tech.title}>
                  <button
                    type="button"
                    onClick={() => setActiveTech(open ? null : index)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/5 text-black/50">
                        <tech.icon className="h-5 w-5" />
                      </span>
                      <span className="font-heading text-base font-semibold text-black sm:text-lg">{tech.title}</span>
                    </div>
                    <PlusIcon open={open} />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 gap-5 pb-6 pl-14 sm:grid-cols-2">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-black/30">What it is</p>
                            <p className="mt-1.5 text-sm leading-6 text-black/70">{tech.what}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-black/30">Why it matters</p>
                            <p className="mt-1.5 text-sm leading-6 text-black/70">{tech.why}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Section 6: Content + Topical Authority ───────────────────────────── */}
      <section className="w-full bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div variants={item}>
                <SectionLabel>Content + Topical Authority</SectionLabel>
              </motion.div>
              <motion.h2
                variants={item}
                className="mt-6 text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl"
              >
                One article is not{" "}
                <span className="text-accent">a strategy.</span>
              </motion.h2>
              <motion.div variants={item} className="mt-5 flex flex-col gap-4 text-base leading-7 text-black/60">
                <p>
                  Search engines build a picture of a brand's expertise over time. Publishing a
                  single article about a topic does not establish authority in that topic.
                  Publishing comprehensive, interconnected coverage of a topic area does.
                </p>
                <p>
                  Topical authority is built through clusters a primary topic supported by
                  satellite content that covers every meaningful question, subtopic, and angle.
                  Each piece connects to the others through internal links, reinforcing relevance
                  across the entire cluster.
                </p>
                <p>
                  We build topical ecosystems, not content calendars. Every piece of content has
                  a defined role, a target search intent, and a place in the broader information
                  architecture.
                </p>
              </motion.div>
            </motion.div>

            {/* Topic cluster visual */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="flex items-center justify-center"
            >
              <div className="relative w-full max-w-sm">
                {/* Center */}
                <div className="flex justify-center">
                  <div className="rounded-2xl bg-black px-5 py-3 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Primary Topic</p>
                    <p className="mt-1 text-base font-bold text-white">SEO</p>
                  </div>
                </div>

                {/* Connector line */}
                <div className="mx-auto mt-2 h-4 w-px bg-black/20" />

                {/* Satellite topics */}
                <div className="flex flex-wrap justify-center gap-2 mt-0">
                  {[
                    "Technical SEO",
                    "On-Page SEO",
                    "Local SEO",
                    "Ecommerce SEO",
                    "Content SEO",
                    "AEO",
                    "GEO",
                    "Keyword Research",
                    "Internal Linking",
                    "Structured Data",
                    "Search Intent",
                  ].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-black/10 bg-neutral-50 px-3 py-1.5 text-xs font-semibold text-black/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Connector line */}
                <div className="mx-auto mt-2 h-4 w-px bg-black/20" />

                {/* Supporting articles */}
                <div className="flex justify-center">
                  <div className="flex flex-col gap-2 w-full max-w-[280px]">
                    {[
                      "How long does SEO take?",
                      "Technical SEO audit checklist",
                      "What is topical authority?",
                    ].map((a) => (
                      <div key={a} className="rounded-xl border border-black/10 bg-white px-4 py-2.5 text-xs text-black/50">
                        {a}
                      </div>
                    ))}
                    <p className="text-center text-[10px] font-semibold uppercase tracking-widest text-black/30">
                      + supporting articles
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 7: AEO ───────────────────────────────────────────────────── */}
      <section className="w-full bg-black py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div variants={item}>
                <SectionLabel dark>AEO</SectionLabel>
              </motion.div>
              <motion.h2
                variants={item}
                className="mt-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl"
              >
                Search doesn't always want a page.{" "}
                <span className="text-accent">Sometimes it wants an answer.</span>
              </motion.h2>
              <motion.div variants={item} className="mt-5 flex flex-col gap-4 text-base leading-7 text-white/60">
                <p>
                  A growing proportion of searches are answered directly in the search results
                  page, without the user needing to click. Featured snippets, People Also Ask
                  boxes, knowledge panels, and AI Overviews can all surface answers before a
                  link is ever clicked.
                </p>
                <p>
                  AEO is about writing content that satisfies those questions not just with
                  keywords, but with clear, direct, well-structured answers that search engines
                  can identify and use. Content that is genuinely helpful is also content that
                  performs well in answer-oriented contexts.
                </p>
              </motion.div>
            </motion.div>

            {/* AEO content example */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                AEO content structure example
              </p>
              <p className="mt-4 text-sm font-semibold text-white/60 italic">
                Query: "How long does SEO take?"
              </p>
              <div className="mt-6 flex flex-col gap-5">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-accent">Direct Answer</p>
                  <p className="mt-2 text-sm leading-6 text-white/80">
                    For most businesses, meaningful SEO results take three to six months. Significant business impact from organic search typically takes six to twelve months.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Supporting Context</p>
                  <p className="mt-2 text-sm leading-6 text-white/60">
                    The timeline depends on market competitiveness, current site health, content quality, and domain authority. New domains in competitive markets take longer than established sites in niche categories.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Related Questions</p>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {["Why does SEO take so long?", "Can SEO results come faster?", "What affects SEO timelines?"].map((q) => (
                      <li key={q} className="text-xs text-white/50">· {q}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 8: GEO ───────────────────────────────────────────────────── */}
      <section className="w-full bg-neutral-50 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl"
          >
            <motion.div variants={item}>
              <SectionLabel>GEO</SectionLabel>
            </motion.div>
            <motion.h2
              variants={item}
              className="mt-6 text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl lg:text-5xl"
            >
              The search experience{" "}
              <span className="text-accent">is becoming generative.</span>
            </motion.h2>
            <motion.p variants={item} className="mt-4 max-w-2xl text-base leading-7 text-black/60">
              AI systems are increasingly integrated into how people search and discover information.
              GEO is about building the conditions that make a brand easier for those systems to
              understand not gaming them, but building something worth understanding.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={container}
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            <motion.div variants={item} className="flex flex-col gap-4">
              <p className="text-sm font-bold uppercase tracking-wider text-black/40">Brand signal sources</p>
              {[
                { label: "Website", detail: "Entity definition, service pages, about pages, author information" },
                { label: "Content", detail: "Blog articles, guides, FAQ content, expert commentary" },
                { label: "Reviews", detail: "Google, industry directories, third-party platforms" },
                { label: "Publications", detail: "Earned media, trade press, industry references" },
                { label: "Communities", detail: "Forums, Slack groups, Reddit, professional networks" },
                { label: "Social", detail: "Consistent brand presence and topical association" },
              ].map((row) => (
                <div key={row.label} className="flex items-start gap-4 rounded-xl border border-black/10 bg-white px-5 py-4">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-black text-[10px] font-bold text-white">
                    ↗
                  </span>
                  <div>
                    <p className="text-sm font-bold text-black">{row.label}</p>
                    <p className="mt-0.5 text-xs leading-5 text-black/50">{row.detail}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={item} className="flex flex-col justify-between gap-6">
              <div className="rounded-3xl border border-black/10 bg-white p-8 flex-1">
                <p className="text-sm font-bold uppercase tracking-wider text-black/40">The GEO premise</p>
                <div className="mt-6 flex flex-col gap-3">
                  {[
                    "Consistent signals across platforms",
                    "Clear entity definition",
                    "Topical depth and authority",
                    "Relevant third-party references",
                    "High-quality, structured content",
                  ].map((point) => (
                    <div key={point} className="flex items-center gap-3 text-sm text-black/70">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {point}
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-xl bg-black/[0.04] p-4">
                  <p className="text-xs font-semibold leading-5 text-black/60 italic">
                    No agency can guarantee that your brand will be cited by ChatGPT, Google AI
                    Overviews, Gemini, or Perplexity. GEO focuses on building the underlying
                    conditions that make a brand easier to understand and potentially surface —
                    not on gaming systems that do not allow for it.
                  </p>
                </div>
              </div>
              <div className="rounded-3xl border border-black bg-black p-8">
                <p className="text-sm font-bold text-white/40">Think of GEO as</p>
                <p className="mt-3 text-xl font-bold text-white leading-snug">
                  Building a brand that is clear, credible, and consistent enough to be understood
                  by any intelligent system human or machine.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Section 9: Entity Authority ───────────────────────────────────────── */}
      <section className="w-full bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl"
          >
            <motion.div variants={item}>
              <SectionLabel>Entity Optimisation</SectionLabel>
            </motion.div>
            <motion.h2
              variants={item}
              className="mt-6 text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl"
            >
              Search engines need to{" "}
              <span className="text-accent">understand who you are.</span>
            </motion.h2>
            <motion.p variants={item} className="mt-4 max-w-2xl text-base leading-7 text-black/60">
              Before a search engine can rank your business, it needs to understand it as
              a coherent entity: who you are, what you do, who you serve, where you operate,
              and what expertise you hold. Entity optimisation ensures that information is
              clear, consistent, and verifiable.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={container}
            className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              { label: "Organisation Schema", desc: "Machine-readable markup defining your business: name, address, URL, contact, services, and social profiles." },
              { label: "Consistent NAP", desc: "Name, address, and phone number consistent across Google Business Profile, website, directories, and citations." },
              { label: "Author Information", desc: "Clear authorship on content demonstrates expertise and supports E-E-A-T signals that influence search quality assessments." },
              { label: "About Page", desc: "A clear, comprehensive About page that establishes who the organisation is, its expertise, and its history." },
              { label: "SameAs Associations", desc: "Links connecting your website entity to other verified profiles (LinkedIn, Wikipedia, Wikidata where appropriate)." },
              { label: "Topical Association", desc: "Consistent coverage of a topic area builds semantic association between your brand entity and relevant subjects." },
            ].map((card) => (
              <motion.div
                key={card.label}
                variants={item}
                className="group rounded-2xl border border-black/10 bg-neutral-50 p-6 transition-colors duration-300 hover:border-black hover:bg-black"
              >
                <h3 className="font-heading text-sm font-bold text-black transition-colors duration-300 group-hover:text-white">
                  {card.label}
                </h3>
                <p className="mt-2 text-sm leading-6 text-black/60 transition-colors duration-300 group-hover:text-white/60">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Section 10: Search Journey (interactive canvas) ───────────────────── */}
      <section className="w-full bg-black py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl"
          >
            <motion.div variants={item}>
              <SectionLabel dark>The Search Journey</SectionLabel>
            </motion.div>
            <motion.h2
              variants={item}
              className="mt-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl"
            >
              Every question is{" "}
              <span className="text-accent">a path to your brand.</span>
            </motion.h2>
            <motion.p variants={item} className="mt-4 max-w-xl text-base leading-7 text-white/60">
              The questions below represent real searches your audience uses to find
              businesses like yours. Each one follows the same journey from question to
              discovery. Click any question to trace the path.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-10"
          >
            <SearchJourneyCanvas reduced={prefersReduced} />
          </motion.div>

          <p className="mt-4 text-center text-xs text-white/25">
            Conceptual visualisation of search query patterns
          </p>
        </div>
      </section>

      {/* ── Section 11: Search Everywhere ────────────────────────────────────── */}
      <section className="w-full bg-neutral-50 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl"
          >
            <motion.div variants={item}>
              <SectionLabel>Search Everywhere</SectionLabel>
            </motion.div>
            <motion.h2
              variants={item}
              className="mt-6 text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl"
            >
              Your website is the foundation.{" "}
              <span className="text-accent">Your entire digital presence reinforces it.</span>
            </motion.h2>
            <motion.p variants={item} className="mt-4 max-w-2xl text-base leading-7 text-black/60">
              Modern discovery can happen across many surfaces. Not every channel is relevant
              to every business but understanding where your audience searches is the
              starting point for any search visibility strategy.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={container}
            className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
          >
            {discoverySurfaces.map((surface, i) => (
              <motion.div
                key={surface.label}
                variants={item}
                className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white p-5 transition-shadow duration-300 hover:shadow-lg hover:shadow-black/5"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-1 -top-3 font-heading text-[4rem] font-bold leading-none text-black/[0.03]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="relative text-sm font-bold text-black">{surface.label}</h3>
                <p className="relative mt-2 text-xs leading-5 text-black/50">{surface.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Section 12: What We Do ────────────────────────────────────────────── */}
      <section className="w-full bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl"
          >
            <motion.div variants={item}>
              <SectionLabel>Services</SectionLabel>
            </motion.div>
            <motion.h2
              variants={item}
              className="mt-6 text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl lg:text-5xl"
            >
              What We Do:{" "}
              <span className="text-accent">And When You Need It</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: EASE }}
            onMouseLeave={() => setActiveService(null)}
            className="mt-10 border-t border-black/10"
          >
            {services.map((service, index) => {
              const isActive = activeService === index;
              return (
                <div
                  key={service.title}
                  onMouseEnter={() => setActiveService(index)}
                  onClick={() => setActiveService(index)}
                  className="cursor-pointer border-b border-black/10 py-6 transition-colors"
                >
                  <div className="flex items-center gap-3 sm:gap-8">
                    <span className="w-8 shrink-0 font-heading text-sm font-bold text-black/30 sm:w-16 sm:text-base">
                      ({String(index + 1).padStart(2, "0")})
                    </span>
                    <motion.div
                      layout
                      transition={{ duration: 0.5, ease: EASE }}
                      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-black ${
                        isActive ? "h-14 w-20 sm:h-36 sm:w-60" : "h-9 w-14 sm:h-14 sm:w-20"
                      }`}
                    >
                      <service.icon
                        className={`text-white/20 transition-all duration-500 ${
                          isActive ? "h-12 w-12 sm:h-14 sm:w-14" : "h-5 w-5 sm:h-6 sm:w-6"
                        }`}
                      />
                    </motion.div>
                    <h3
                      className={`font-heading font-bold uppercase tracking-tight transition-all duration-500 ${
                        isActive ? "text-base text-black sm:text-2xl lg:text-3xl" : "text-sm text-black/40 sm:text-xl"
                      }`}
                    >
                      {service.title}
                    </h3>
                  </div>

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
                      className="mt-5 pl-10 sm:pl-[6rem]"
                    >
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-black/30">What it is</p>
                          <p className="mt-1.5 text-sm leading-6 text-black/70">{service.what}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-black/30">What we do</p>
                          <p className="mt-1.5 text-sm leading-6 text-black/70">{service.how}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-black/30">When you need it</p>
                          <p className="mt-1.5 text-sm leading-6 text-black/70">{service.when}</p>
                        </div>
                      </div>
                      <div className="mt-5">
                        <CTAButton href="/contact" variant="primary" size="sm">
                          Discuss This Service
                        </CTAButton>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Section 13: Process ───────────────────────────────────────────────── */}
      <section className="w-full bg-black py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl"
          >
            <motion.div variants={item}>
              <SectionLabel dark>Process</SectionLabel>
            </motion.div>
            <motion.h2
              variants={item}
              className="mt-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl"
            >
              SEO is an ongoing system,{" "}
              <span className="text-accent">not a one-time task.</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={container}
            className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-7"
          >
            {processSteps.map((step, i) => (
              <motion.div key={step.label} variants={item} className="relative flex flex-col">
                <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-0">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  {i < processSteps.length - 1 && (
                    <span className="hidden h-px flex-1 bg-white/10 lg:block lg:mt-4 lg:h-px lg:w-full" />
                  )}
                </div>
                <div className="mt-3 lg:mt-4">
                  <p className="font-heading text-sm font-bold uppercase tracking-wider text-white">{step.label}</p>
                  <p className="mt-2 text-xs leading-5 text-white/50">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Section 14: Measurement ───────────────────────────────────────────── */}
      <section className="w-full bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl"
          >
            <motion.div variants={item}>
              <SectionLabel>Measurement</SectionLabel>
            </motion.div>
            <motion.h2
              variants={item}
              className="mt-6 text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl"
            >
              Rankings are a signal,{" "}
              <span className="text-accent">not the outcome.</span>
            </motion.h2>
            <motion.p variants={item} className="mt-4 max-w-xl text-base leading-7 text-black/60">
              We measure across four layers, from search visibility to business outcomes.
              The weight of each layer depends on your objective.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={container}
            className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {measurementTiers.map((tier) => (
              <motion.div
                key={tier.label}
                variants={item}
                className="flex flex-col rounded-2xl border border-black/10 bg-neutral-50 p-6"
              >
                <span className="inline-flex self-start rounded-full bg-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                  {tier.label}
                </span>
                <p className="mt-4 text-xs italic leading-5 text-black/40">{tier.meaning}</p>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {tier.metrics.map((m) => (
                    <li key={m} className="flex items-center gap-2.5 text-sm text-black/70">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {m}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 max-w-2xl text-sm leading-6 text-black/40"
          >
            Primary tools: Google Search Console (search performance), Google Analytics 4 (organic sessions and conversions),
            Google Business Profile (local visibility), rank tracking platforms. Note: Google Search Console reports
            traditional search performance it does not directly measure GEO or AI search performance.
          </motion.p>
        </div>
      </section>

      {/* ── Section 15: GSC Insights ──────────────────────────────────────────── */}
      <section className="w-full bg-neutral-50 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div variants={item}>
                <SectionLabel>Search Console Insights</SectionLabel>
              </motion.div>
              <motion.h2
                variants={item}
                className="mt-6 text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl"
              >
                Real search data should{" "}
                <span className="text-accent">drive real decisions.</span>
              </motion.h2>
              <motion.div variants={item} className="mt-5 flex flex-col gap-4 text-base leading-7 text-black/60">
                <p>
                  Google Search Console provides one of the most valuable data sources
                  in any SEO engagement: the actual queries people used to find your website.
                  Most businesses only scratch the surface of what this data can reveal.
                </p>
                <p>
                  We use Search Console data to inform content strategy, AEO priorities,
                  and on-page optimisation not just to report on what happened, but to
                  identify what to do next.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.p
                variants={item}
                className="text-sm font-bold uppercase tracking-wider text-black/40"
              >
                What GSC data can reveal
              </motion.p>
              <motion.div variants={item} className="mt-4 flex flex-col gap-3">
                {[
                  { insight: "Unexpected queries you rank for but haven't targeted", action: "Informs content expansion" },
                  { insight: "High-impression, low-CTR pages", action: "Title and meta description optimisation" },
                  { insight: "Questions your audience is asking", action: "AEO and FAQ content opportunities" },
                  { insight: "Queries where rankings have declined", action: "Content refresh and competitive audit" },
                  { insight: "Branded query growth over time", action: "Brand visibility and awareness signals" },
                  { insight: "Pages with zero impressions despite being indexed", action: "Content quality and relevance review" },
                  { insight: "Queries with high click share concentrated on one page", action: "Internal link optimisation opportunity" },
                ].map((row) => (
                  <div key={row.insight} className="flex items-start gap-4 rounded-xl border border-black/10 bg-white px-5 py-4">
                    <SearchIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <div>
                      <p className="text-sm font-medium text-black">{row.insight}</p>
                      <p className="mt-0.5 text-xs text-black/50">→ {row.action}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────────── */}
      <Testimonials />

      {/* ── Section 16: FAQ ───────────────────────────────────────────────────── */}
      <section className="w-full bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl"
          >
            <motion.div variants={item}>
              <SectionLabel>FAQ</SectionLabel>
            </motion.div>
            <motion.h2
              variants={item}
              className="mt-6 text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl lg:text-5xl"
            >
              Questions worth{" "}
              <span className="text-accent">direct answers.</span>
            </motion.h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="mt-12 divide-y divide-black/10 border-t border-black/10"
          >
            {faqData.map((faq, index) => {
              const open = openFaq === index;
              return (
                <motion.div key={faq.question} variants={item}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : index)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-heading text-base font-medium text-black sm:text-lg">
                      {faq.question}
                    </span>
                    <PlusIcon open={open} />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-3xl pb-6 text-base leading-7 text-black/60">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Section 17: Final CTA ─────────────────────────────────────────────── */}
      <section className="w-full bg-black py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.p
              variants={fadeUp}
              className="text-sm font-bold uppercase tracking-widest text-white/40"
            >
              Ready to start
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Your next customer is{" "}
              <span className="text-accent">already searching.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/60 sm:text-lg"
            >
              We will audit your current search visibility, identify the gaps in your technical
              foundation, content, and entity signals, and show you exactly how we would
              approach building a system that makes your brand easier to find, understand,
              and choose.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <CTAButton href="/contact" variant="inverted" size="lg">
                Get Your Search Visibility Audit
              </CTAButton>
              <Link
                href="/contact"
                className="text-sm font-semibold text-white/50 transition-colors duration-300 hover:text-white"
              >
                Talk to an SEO Strategist →
              </Link>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center justify-center gap-3"
            >
              {[
                "Technical SEO",
                "AEO",
                "GEO",
                "Content Strategy",
                "Topical Authority",
                "Entity Optimisation",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/30"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
