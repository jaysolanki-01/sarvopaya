"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;
const up = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const seq = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-4 inline-block rounded-full border border-black/10 bg-black/[0.04] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-black/50">
      {children}
    </span>
  );
}

const advisoryVectors = [
  {
    number: "01",
    title: "Performance & Campaign Course-Correction",
    subtitle: "Catch ad fatigue and spend leaks before budget is burnt",
    desc: "We look under the hood of your Meta Ads, Google Ads, and paid social campaigns every week. We evaluate creative fatigue signals, frequency saturation, and CAC vs. contribution margin thresholds, preventing wasted ad spend before it impacts monthly margins.",
    deliverables: [
      "Weekly media spend & attribution sanity check",
      "Creative fatigue & angle rotation recommendations",
      "Bidding strategy & budget reallocation guidance",
      "Live ad manager teardowns during calls",
    ],
  },
  {
    number: "02",
    title: "Board & Investor Readiness",
    subtitle: "Translate marketing chaos into executive clarity",
    desc: "Preparing for Seed, Series A/B, or quarterly board meetings? We help founders build institutional-grade reporting dashboards, articulate customer acquisition unit economics, and craft a compelling growth narrative that satisfies sophisticated investors.",
    deliverables: [
      "Board deck growth slides & KPI architecture",
      "Cohort retention & LTV:CAC payback models",
      "Cap-table friendly growth projections",
      "Due diligence data room preparation",
    ],
  },
  {
    number: "03",
    title: "Agency & Internal Team Governance",
    subtitle: "Keep execution partners strictly accountable",
    desc: "Most founders lack the technical bandwidth to verify if their digital agencies or media buyers are performing or making excuses. We serve as your technical buffer: evaluating agency deliverables, reviewing contracts, setting performance SLAs, and interviewing key hires.",
    deliverables: [
      "External agency audit & SLA governance",
      "Marketing team hiring scorecards & interview support",
      "Tooling & software contract negotiation review",
      "Internal growth pod workflow optimization",
    ],
  },
  {
    number: "04",
    title: "High-Stakes Decision Support",
    subtitle: "An objective second opinion on strategic bets",
    desc: "Contemplating a price increase? Launching in the US, UK, or UAE? Migrating from WooCommerce to Shopify Plus? Restructuring brand positioning? We provide fast, unbiased strategic sparring to pressure-test big bets before capital is committed.",
    deliverables: [
      "Pricing elasticity & packaging decision support",
      "Cross-border market entry risk assessments",
      "Platform migration & technical stack review",
      "Category rebrand & pivot risk mitigation",
    ],
  },
  {
    number: "05",
    title: "Founder Mentorship & Executive Sparring",
    subtitle: "Direct access to Jay Solanki & senior operators",
    desc: "Leadership can be isolating. You have a direct, private communication channel with experienced growth operators who have scaled multi-crore brands and navigated identical bottlenecks. No sugarcoating, no theoretical fluff—just honest, pragmatic guidance.",
    deliverables: [
      "Private Slack / WhatsApp async access",
      "Bi-weekly / weekly 1-on-1 strategic working sessions",
      "Loom async video reviews of campaigns & copy",
      "Continuous soundboarding for critical decisions",
    ],
  },
];

const engagementModels = [
  {
    tag: "Bi-Weekly Advisory",
    title: "Strategic Sounding Board",
    desc: "Designed for early-scaling founders (₹1Cr–₹5Cr ARR) who need high-level strategic alignment, campaign spot-checks, and monthly roadmap oversight.",
    cadence: "2x 60-min sessions per month + async Slack access",
    idealFor: "Founders managing their first internal marketing hire or boutique agency.",
  },
  {
    tag: "Weekly Embedded Lead",
    title: "Fractional Growth Director",
    desc: "Deep executive partnership for rapid-scale companies (₹5Cr–₹50Cr ARR). Weekly hands-on sprint reviews, team management, and board prep.",
    cadence: "4x 60-min sessions per month + unlimited async advisory + ad account deep dives",
    idealFor: "Series A/B startups and fast-moving D2C brands without a full-time VP of Growth.",
  },
  {
    tag: "Intensive 60-Day Sprint",
    title: "Fundraising & Transaction Prep",
    desc: "A concentrated advisory engagement specifically engineered for companies preparing for institutional investment, M&A, or major strategic pivots.",
    cadence: "Weekly high-frequency working sessions + investor data room modeling",
    idealFor: "Companies in active fundraising discussions or preparing due diligence materials.",
  },
];

const advisoryDeliverables = [
  {
    title: "Private Async Channel",
    desc: "Direct access via dedicated Slack or WhatsApp for quick feedback on campaign launches, ad copy, and urgent growth questions.",
    badge: "Direct Access",
  },
  {
    title: "Live Working Sessions",
    desc: "Focused 60-minute strategy sessions with founder Jay Solanki. Screenshare in Ads Manager, live data modeling, and zero filler.",
    badge: "Live Strategy",
  },
  {
    title: "Post-Call Action Memos",
    desc: "Concise summary memos after each session detailing agreed decisions, assigned owners, and key performance milestones.",
    badge: "Accountability",
  },
  {
    title: "Unit Economics Health Checks",
    desc: "Monthly review of Contribution Margin 1, 2, and 3, return rates, CAC inflation, and cohort retention decay.",
    badge: "Financial Health",
  },
];

const advisoryFaqs = [
  {
    q: "How does Ongoing Advisory connect to Sarvopaya's Growth Consulting service?",
    a: "Ongoing Advisory is the long-term partnership pillar of our Growth Consulting offering (anchored at /services/growth-consulting#ongoing-advisory). While digital audits diagnose existing leaks and growth strategies map out the 12-month blueprint, Ongoing Advisory keeps an experienced growth leader in your corner continuously to ensure execution never derails.",
  },
  {
    q: "How is Ongoing Advisory different from hiring a full-time VP of Growth?",
    a: "A seasoned VP of Growth commands ₹60L–₹1.2Cr+ in annual salary plus equity, and carries substantial hiring risk. Sarvopaya's Ongoing Advisory gives you instant access to senior operators with cross-industry pattern recognition at a fraction of the cost, with zero long-term employment lock-in.",
  },
  {
    q: "Do you only advise, or can you also handle execution?",
    a: "Ongoing Advisory is flexible. If you have an internal team or agency, we mentor and govern them. If you encounter execution bottlenecks (such as needing performance ads, web engineering, or AI automation), you can instantly tap into Sarvopaya's full execution pods.",
  },
  {
    q: "What is the minimum contract commitment for Ongoing Advisory?",
    a: "We work on flexible 3-month rolling retainers. We do not believe in locking clients into 12-month rigid contracts—our advisory must prove its commercial value every single month.",
  },
  {
    q: "Who conducts the advisory sessions?",
    a: "Sessions are led directly by Sarvopaya founder Jay Solanki alongside senior discipline leads (paid media, SEO, automation) tailored to the specific topics on your agenda.",
  },
];

export default function OngoingAdvisoryPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroIv = useInView(heroRef, { once: true, amount: 0.2 });
  const vectorsRef = useRef<HTMLDivElement>(null);
  const vectorsIv = useInView(vectorsRef, { once: true, amount: 0.1 });
  const modelsRef = useRef<HTMLDivElement>(null);
  const modelsIv = useInView(modelsRef, { once: true, amount: 0.1 });
  const deliverablesRef = useRef<HTMLDivElement>(null);
  const deliverablesIv = useInView(deliverablesRef, { once: true, amount: 0.1 });
  const faqRef = useRef<HTMLDivElement>(null);
  const faqIv = useInView(faqRef, { once: true, amount: 0.2 });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Ongoing Growth Advisory",
        serviceType: "Executive Growth Advisory & Fractional CMO",
        provider: {
          "@type": "Organization",
          name: "Sarvopaya",
          url: "https://www.sarvopaya.com",
        },
        description:
          "Monthly or weekly executive growth advisory retainer. A senior growth strategist in your corner, reviewing performance, course-correcting campaigns, preparing for fundraising and helping you make better decisions faster.",
        url: "https://www.sarvopaya.com/services/ongoing-advisory",
        areaServed: [
          "India",
          "United States",
          "United Kingdom",
          "United Arab Emirates",
          "Saudi Arabia",
          "Australia",
          "Singapore",
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.sarvopaya.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: "https://www.sarvopaya.com/services",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Growth Consulting",
            item: "https://www.sarvopaya.com/services/growth-consulting#ongoing-advisory",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Ongoing Advisory",
            item: "https://www.sarvopaya.com/services/ongoing-advisory",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: advisoryFaqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden bg-white pb-20 pt-32 sm:pb-28 sm:pt-40"
        ref={heroRef}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 select-none font-black uppercase leading-none text-black/[0.03]"
          style={{ fontSize: "clamp(80px,14vw,200px)" }}
        >
          ADVISORY
        </span>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={seq}
            initial="hidden"
            animate={heroIv ? "show" : "hidden"}
          >
            {/* Breadcrumb back link */}
            <motion.div
              variants={up}
              className="mb-6 flex flex-wrap items-center gap-2 text-xs text-black/50"
            >
              <Link
                href="/services"
                className="hover:text-black transition-colors"
              >
                Services
              </Link>
              <span>/</span>
              <Link
                href="/services/growth-consulting#ongoing-advisory"
                className="flex items-center gap-1 font-semibold text-[var(--accent)] hover:underline underline-offset-4 transition-all"
              >
                <span>Growth Consulting (#ongoing-advisory)</span>
                <span className="text-[10px] text-black/40">↗</span>
              </Link>
              <span>/</span>
              <span className="font-bold text-black">Ongoing Advisory</span>
            </motion.div>

            <motion.div variants={up}>
              <SectionLabel>Executive Growth Leadership</SectionLabel>
            </motion.div>

            {/* Explicit <h1> with "Ongoing Advisory" */}
            <motion.h1
              variants={up}
              className="font-heading text-5xl font-black leading-[1.05] tracking-tight text-black sm:text-6xl lg:text-7xl"
            >
              Ongoing Advisory
              <br />
              <span className="text-[var(--accent)]">
                Executive Growth Leadership in Your Corner.
              </span>
            </motion.h1>

            <motion.p
              variants={up}
              className="mt-6 max-w-3xl text-lg leading-relaxed text-black/60 sm:text-xl"
            >
              Monthly or weekly growth advisory retainer. A senior growth strategist in your corner,
              reviewing performance, course-correcting ad spend, preparing for fundraising,
              and helping leadership make high-stakes marketing decisions faster and with total conviction.
            </motion.p>

            {/* Quick Metrics Bar */}
            <motion.div
              variants={up}
              className="mt-10 grid grid-cols-2 gap-4 border-y border-black/8 py-6 sm:grid-cols-4"
            >
              <div>
                <p className="font-heading text-2xl font-black text-black sm:text-3xl">
                  Weekly
                </p>
                <p className="mt-1 text-xs text-black/50">Working Sessions</p>
              </div>
              <div>
                <p className="font-heading text-2xl font-black text-black sm:text-3xl">
                  Direct
                </p>
                <p className="mt-1 text-xs text-black/50">Founder Access (Jay Solanki)</p>
              </div>
              <div>
                <p className="font-heading text-2xl font-black text-[var(--accent)] sm:text-3xl">
                  Async
                </p>
                <p className="mt-1 text-xs text-black/50">Private Slack / WhatsApp</p>
              </div>
              <div>
                <p className="font-heading text-2xl font-black text-black sm:text-3xl">
                  0 Lock-In
                </p>
                <p className="mt-1 text-xs text-black/50">Rolling 3-Mo Terms</p>
              </div>
            </motion.div>

            <motion.div variants={up} className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex h-13 items-center gap-2 rounded-full bg-black px-8 text-sm font-bold text-white transition-all duration-300 hover:bg-[var(--accent)] hover:shadow-xl"
              >
                Apply for Advisory Retainer <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/services/growth-consulting#ongoing-advisory"
                className="inline-flex h-13 items-center gap-2 rounded-full border border-black/15 px-8 text-sm font-bold text-black transition-colors duration-300 hover:border-black/40 hover:bg-black/5"
              >
                Back to Growth Consulting Hub
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── THE FOUNDER'S DILEMMA: ISOLATION VS CONFIDENCE ── */}
      <section className="bg-black/[0.02] py-20 sm:py-28 border-y border-black/6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5">
              <SectionLabel>The Strategic Gap</SectionLabel>
              <h2 className="font-heading text-3xl font-black leading-tight tracking-tight text-black sm:text-4xl">
                Who Do You Turn To When Critical Growth Decisions Arrive?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-black/60">
                Founders often navigate hundreds of thousands in ad spend alone,
                relying on biased feedback from agency account managers or junior in-house
                marketers. Ongoing Advisory gives you an unsparing, senior partner who has
                managed scale and has zero incentive to feed you vanity metrics.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                <span className="text-xs font-bold uppercase tracking-wider text-black">
                  Unbiased counsel. Mathematical rigor. Real-time accountability.
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-red-500/10 bg-white p-6 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-red-500">
                  Without Ongoing Advisory
                </span>
                <h4 className="mt-2 font-heading text-lg font-bold text-black">
                  Agency Blame-Shifting
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-black/60">
                  When CAC climbs, your agency blames algorithm updates or website copy,
                  while your internal team blames ad fatigue. You are stuck refereeing.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-500/15 bg-white p-6 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  With Sarvopaya Advisory
                </span>
                <h4 className="mt-2 font-heading text-lg font-bold text-black">
                  Technical Governance
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-black/60">
                  We look at the raw campaign data, establish non-negotiable SLAs,
                  and direct your execution teams with exact technical clarity.
                </p>
              </div>

              <div className="rounded-2xl border border-red-500/10 bg-white p-6 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-red-500">
                  Without Ongoing Advisory
                </span>
                <h4 className="mt-2 font-heading text-lg font-bold text-black">
                  Expensive Trial & Error
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-black/60">
                  Testing unproven channels, hiring the wrong growth agency, or botching
                  a pricing change because no one on your team has done it before.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-500/15 bg-white p-6 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  With Sarvopaya Advisory
                </span>
                <h4 className="mt-2 font-heading text-lg font-bold text-black">
                  Battle-Tested Pattern Recognition
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-black/60">
                  Tapping into playbooks forged across dozens of brands in India, the US,
                  UK, and GCC—bypassing mistakes that cost months of runway.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5 ADVISORY VECTORS ── */}
      <section className="bg-white py-24 sm:py-32" ref={vectorsRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={seq}
            initial="hidden"
            animate={vectorsIv ? "show" : "hidden"}
            className="mb-16"
          >
            <motion.div variants={up}>
              <SectionLabel>Core Focus Areas</SectionLabel>
            </motion.div>
            <motion.h2
              variants={up}
              className="font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              How We Create Impact
              <br />
              <span className="text-black/30">In Every Single Session.</span>
            </motion.h2>
            <motion.p
              variants={up}
              className="mt-4 max-w-2xl text-base text-black/60"
            >
              We don't hold vague motivational chats. Each session is structured around active
              account teardowns, unit economics verification, and clear operational decisions.
            </motion.p>
          </motion.div>

          <div className="space-y-8">
            {advisoryVectors.map((vec, i) => (
              <motion.div
                key={vec.number}
                initial={{ opacity: 0, y: 24 }}
                animate={vectorsIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
                className="grid grid-cols-1 gap-8 rounded-3xl border border-black/8 bg-white p-8 transition-all duration-300 hover:border-black/20 hover:shadow-xl lg:grid-cols-12"
              >
                <div className="lg:col-span-2 flex items-start">
                  <span className="font-heading text-4xl font-black text-[var(--accent)]">
                    {vec.number}
                  </span>
                </div>

                <div className="lg:col-span-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-black/40">
                    {vec.subtitle}
                  </span>
                  <h3 className="mt-1 font-heading text-2xl font-bold text-black sm:text-3xl">
                    {vec.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-black/65 sm:text-base">
                    {vec.desc}
                  </p>
                </div>

                <div className="lg:col-span-4 rounded-2xl bg-black/[0.02] p-5 border border-black/5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">
                    Advisory Focus
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {vec.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-xs font-medium text-black/80"
                      >
                        <span className="mt-0.5 text-[var(--accent)] font-bold">
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENGAGEMENT MODELS ── */}
      <section className="bg-black/[0.02] py-24 sm:py-32" ref={modelsRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={seq}
            initial="hidden"
            animate={modelsIv ? "show" : "hidden"}
            className="mb-16"
          >
            <motion.div variants={up}>
              <SectionLabel>Engagement Tiers</SectionLabel>
            </motion.div>
            <motion.h2
              variants={up}
              className="font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              Retainer Structures Built
              <br />
              <span className="text-[var(--accent)]">For Your Stage of Growth.</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {engagementModels.map((m, idx) => (
              <motion.div
                key={m.tag}
                initial={{ opacity: 0, y: 20 }}
                animate={modelsIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.1, duration: 0.6, ease: EASE }}
                className="flex flex-col justify-between rounded-3xl border border-black/8 bg-white p-8 shadow-sm transition-all duration-300 hover:border-black/20 hover:shadow-xl"
              >
                <div>
                  <div className="inline-block rounded-full bg-[var(--accent)]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[var(--accent)]">
                    {m.tag}
                  </div>
                  <h3 className="mt-4 font-heading text-2xl font-bold text-black">
                    {m.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-black/60">
                    {m.desc}
                  </p>

                  <div className="mt-6 rounded-2xl bg-black/[0.03] p-4 text-xs font-semibold text-black/75">
                    <span className="block text-[10px] font-bold text-black/40 uppercase tracking-widest mb-1">
                      Session Cadence
                    </span>
                    {m.cadence}
                  </div>
                </div>

                <div className="mt-6 border-t border-black/6 pt-4 text-xs text-black/50">
                  <span className="font-bold text-black/75">Best for: </span>
                  {m.idealFor}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DELIVERABLES MATRIX ── */}
      <section className="bg-white py-24 sm:py-32" ref={deliverablesRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={seq}
            initial="hidden"
            animate={deliverablesIv ? "show" : "hidden"}
            className="mb-16"
          >
            <motion.div variants={up}>
              <SectionLabel>What's Included</SectionLabel>
            </motion.div>
            <motion.h2
              variants={up}
              className="font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              Every Retainer Delivers.
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {advisoryDeliverables.map((d, idx) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 20 }}
                animate={deliverablesIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.1, duration: 0.6, ease: EASE }}
                className="flex flex-col justify-between rounded-3xl border border-black/8 bg-white p-7 shadow-sm transition-all duration-300 hover:border-black/20 hover:shadow-lg"
              >
                <div>
                  <span className="inline-block rounded-full bg-[var(--accent)]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                    {d.badge}
                  </span>
                  <h3 className="mt-4 font-heading text-xl font-bold text-black">
                    {d.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-black/60">
                    {d.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ATTACHED ECOSYSTEM ── */}
      <section className="bg-white py-20 sm:py-28 border-y border-black/6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-neutral-900 p-8 sm:p-12 text-white">
            <div className="max-w-3xl">
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">
                Unified Growth Ecosystem
              </span>
              <h2 className="mt-4 font-heading text-3xl font-black text-white sm:text-4xl">
                Advisory Backed By Execution Power.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
                Unlike purely theoretical consultants, Sarvopaya builds, codes, and scales.
                Whenever advisory uncover an execution deficit, our specialist practices
                are on standby to plug the gap:
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/services/growth-consulting#ongoing-advisory"
                className="rounded-2xl border border-[var(--accent)]/40 bg-[var(--accent)]/10 p-5 transition-all hover:bg-[var(--accent)]/15"
              >
                <p className="text-xs font-bold text-[var(--accent)]">01. Consulting Hub</p>
                <h4 className="mt-1 font-heading text-base font-bold text-white">
                  Growth Consulting Hub
                </h4>
                <p className="mt-2 text-xs text-white/70">
                  Anchor portal connecting advisory, digital audits, and GTM strategy.
                </p>
              </Link>

              <Link
                href="/services/digital-audit"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:bg-white/10 hover:border-white/20"
              >
                <p className="text-xs font-bold text-[var(--accent)]">02. Diagnostics</p>
                <h4 className="mt-1 font-heading text-base font-bold text-white">
                  360° Digital Audit
                </h4>
                <p className="mt-2 text-xs text-white/60">
                  Forensic audit of ad spend leakage, CRO, and SEO architecture.
                </p>
              </Link>

              <Link
                href="/services/growth-strategy"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:bg-white/10 hover:border-white/20"
              >
                <p className="text-xs font-bold text-[var(--accent)]">03. Scale Strategy</p>
                <h4 className="mt-1 font-heading text-base font-bold text-white">
                  Growth Strategy
                </h4>
                <p className="mt-2 text-xs text-white/60">
                  6-12 month quantitative models and weekly experiment sprint backlogs.
                </p>
              </Link>

              <Link
                href="/services/go-to-market-startegy-expert"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:bg-white/10 hover:border-white/20"
              >
                <p className="text-xs font-bold text-[var(--accent)]">04. Launch Engine</p>
                <h4 className="mt-1 font-heading text-base font-bold text-white">
                  GTM Strategy Experts
                </h4>
                <p className="mt-2 text-xs text-white/60">
                  First-principles positioning and 90-day launch sequencing.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ACCORDION ── */}
      <section className="bg-white py-24 sm:py-32" ref={faqRef}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={seq}
            initial="hidden"
            animate={faqIv ? "show" : "hidden"}
            className="mb-14 text-center"
          >
            <motion.div variants={up}>
              <SectionLabel>FAQ</SectionLabel>
            </motion.div>
            <motion.h2
              variants={up}
              className="font-heading text-4xl font-black tracking-tight text-black sm:text-5xl"
            >
              Frequently Asked Questions.
            </motion.h2>
          </motion.div>

          <div className="space-y-4">
            {advisoryFaqs.map((faq, i) => (
              <div
                key={faq.q}
                className="overflow-hidden rounded-2xl border border-black/8 bg-white transition-colors hover:border-black/15"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between p-6 text-left transition-colors"
                >
                  <span className="font-heading text-base font-bold text-black sm:text-lg pr-4">
                    {faq.q}
                  </span>
                  <span
                    className={`shrink-0 text-xl font-bold transition-transform duration-200 ${
                      openFaq === i ? "rotate-45 text-[var(--accent)]" : "text-black/40"
                    }`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      <div className="px-6 pb-6 text-sm leading-relaxed text-black/60 border-t border-black/4 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="bg-black py-20 text-white sm:py-28">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <SectionLabel>Direct Operator Partnership</SectionLabel>
          <h2 className="mt-4 font-heading text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Get Senior Growth Leadership
            <br />
            <span className="text-[var(--accent)]">In Your Corner.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/60 sm:text-lg">
            Stop making high-stakes marketing decisions in a vacuum. Partner with
            proven operators who review your data, eliminate campaign waste, and
            accelerate your growth velocity.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex h-13 items-center gap-2 rounded-full bg-[var(--accent)] px-8 text-sm font-bold text-white transition-all duration-300 hover:brightness-110 hover:shadow-2xl"
            >
              Book an Advisory Discovery Call <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/services/growth-consulting#ongoing-advisory"
              className="inline-flex h-13 items-center gap-2 rounded-full border border-white/20 px-8 text-sm font-bold text-white transition-colors duration-300 hover:border-white/50 hover:bg-white/5"
            >
              Explore Growth Consulting Hub
            </Link>
          </div>

          <p className="mt-6 text-xs text-white/40">
            Limited retainer slots available each quarter to ensure deep partner focus.
          </p>
        </div>
      </section>
    </>
  );
}
