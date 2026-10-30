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

const funnelArchitectures = [
  {
    number: "01",
    title: "Direct-Response Campaign Landing Pages",
    subtitle: "100% ad-to-page message match for paid media",
    desc: "Sending paid traffic to generic homepages or basic product pages burns ad budget. We engineer dedicated direct-response landing pages tailored to specific Meta, Google, and TikTok ad angles. Featuring compelling narrative copy, hook-problem-solution frameworks, objection handling, and persistent conversion anchors.",
    deliverables: [
      "Angle-specific headline & hook alignment",
      "Story-driven problem & agitation architecture",
      "Frictionless sticky buy/lead trigger bars",
      "Dynamic URL parameter headline injection",
    ],
  },
  {
    number: "02",
    title: "Multi-Step Lead Generation & Quiz Funnels",
    subtitle: "Engage, qualify, and capture high-intent prospects",
    desc: "Single-field static forms suffer from abysmal conversion rates. We design multi-step interactive quiz and progressive qualification funnels that guide prospects through a personalized assessment, increasing completion rates by 40%+ while enriching lead data before submission.",
    deliverables: [
      "Branching logic & interactive quiz workflows",
      "Progressive profiling to minimize form fatigue",
      "Instant lead enrichment & CRM syncing",
      "Sub-60s automated qualification routing",
    ],
  },
  {
    number: "03",
    title: "Pre-Purchase Advertorials & Listicle Landers",
    subtitle: "Warm up skeptical cold traffic before the pitch",
    desc: "Cold audiences don't trust direct sales pitches. We build editorial-style bridge pages, 5-reason listicles, and founder story advertorials that educate readers on the core problem, establish authority, and prime them to purchase before redirecting them to checkout.",
    deliverables: [
      "Journalistic editorial & advertorial copywriting",
      "Visual comparison tables & alternative teardowns",
      "Scientific & clinical proof integration",
      "Seamless click-through bridge to checkout",
    ],
  },
  {
    number: "04",
    title: "Post-Purchase Upsell & AOV Maximization Funnels",
    subtitle: "Boost Average Order Value by 25%–40% instantly",
    desc: "The most profitable moment to sell to a customer is immediately after they enter their payment info. We build 1-click post-purchase upsell and cross-sell funnels that present relevant complementary bundles, extended warranties, or volume refills without requiring re-entry of card details.",
    deliverables: [
      "1-click native post-purchase upsell cascades",
      "Dynamic cart drawer upsells & tiered progress bars",
      "Smart thank-you page referral & retention loops",
      "AOV elasticity & bundle pricing testing",
    ],
  },
  {
    number: "05",
    title: "High-Ticket VSL & Calendar Booking Funnels",
    subtitle: "Fill sales calendars with pre-qualified buyers",
    desc: "For B2B firms, high-ticket consultants, and service enterprises, we engineer Video Sales Letter (VSL) landing pages paired with seamless calendar booking systems. Prospects consume an authoritative presentation, answer qualification criteria, and book straight into your sales pipeline.",
    deliverables: [
      "High-converting VSL page layout & video player",
      "Interactive calendar booking (Cal.com / Calendly)",
      "Automated SMS/Email show-up sequences",
      "Pre-call homework & case study authority decks",
    ],
  },
  {
    number: "06",
    title: "Split-Testing Infrastructure & Rapid Iteration",
    subtitle: "Test headlines, hooks, and offers continuously",
    desc: "A landing page is never finished; it is an evolving revenue asset. We implement sub-second split-testing infrastructure to experiment with alternate headlines, hero images, pricing tiers, and risk reversals to steadily drive down Cost Per Acquisition (CPA).",
    deliverables: [
      "Server-side edge redirect A/B split testing",
      "Headline & hook multivariate matrix",
      "Offer structure & bundle variation testing",
      "Real-time Bayesian statistical reporting",
    ],
  },
];

const comparisonPoints = [
  {
    metric: "Traffic Destination",
    traditional: "Generic homepage or standard Shopify product display page",
    sarvopaya: "Dedicated, campaign-specific landing page matched 1:1 to ad creative",
  },
  {
    metric: "Visitor Experience",
    traditional: "Distracting header navigation, competing links, and weak CTAs",
    sarvopaya: "Tunnel-vision conversion path with single, high-conviction call to action",
  },
  {
    metric: "Mobile Page Speed",
    traditional: "3.5s+ due to app bloat, causing 50%+ bounce before view",
    sarvopaya: "Sub-second (<1.0s) edge-cached Next.js/Shopify performance",
  },
  {
    metric: "AOV Expansion",
    traditional: "Standard static checkout with zero post-purchase monetization",
    sarvopaya: "Integrated 1-click upsells, bundles, and tiered progress bars boosting AOV by 30%",
  },
];

const funnelProcess = [
  {
    num: "01",
    phase: "Creative & Audience Angle Mapping",
    desc: "We analyze your top-performing ad angles, audience pain points, and objections to ensure 100% emotional congruence between ad creative and landing page hook.",
  },
  {
    num: "02",
    phase: "Direct-Response Copywriting",
    desc: "We draft compelling, conversion-focused sales copy: magnetic above-the-fold headlines, problem agitation, product mechanism explanations, and risk reversals.",
  },
  {
    num: "03",
    phase: "Figma UI/UX & Mobile Prototyping",
    desc: "Conversion-first visual design crafted specifically for mobile viewports, featuring scannable typography, sticky CTA bars, and high-trust social proof sections.",
  },
  {
    num: "04",
    phase: "Clean Full-Stack Development",
    desc: "Coded in lean Next.js or custom Shopify Liquid. Optimized for sub-second load times, Core Web Vitals compliance, and zero layout shift on live ad traffic.",
  },
  {
    num: "05",
    phase: "Tracking, Split Testing & Scaling",
    desc: "Pre-wired with Meta CAPI, GA4 ecommerce events, and edge split-testing scripts so you can scale ad budget with clean, verified attribution data.",
  },
];

const funnelDeliverables = [
  {
    title: "Bespoke Campaign Landing Page",
    desc: "High-converting, responsive landing page engineered in Next.js or Shopify, fully optimized for Meta, Google, and TikTok ad traffic.",
    badge: "Core Asset",
  },
  {
    title: "1-Click Upsell & Slide-Cart Funnel",
    desc: "Integrated post-purchase or slide-cart bundle flows designed to immediately boost Average Order Value (AOV) by 25% to 40%.",
    badge: "AOV Multiplier",
  },
  {
    title: "Mobile Sticky Buy / Booking Module",
    desc: "Frictionless mobile navigation and sticky conversion triggers that keep the call to action accessible across all scroll depths.",
    badge: "Mobile CRO",
  },
  {
    title: "A/B Split Test Setup & Analytics",
    desc: "Edge-based split testing setup with automated GA4 custom event tracking and Meta Conversions API (CAPI) validation.",
    badge: "Attribution Engine",
  },
];

const funnelFaqs = [
  {
    q: "How does Landing Pages & Funnels connect to Website & Digital Experience?",
    a: "Landing Pages & Funnels is an elite conversion discipline within our Website & Digital Experience practice (located at /services/website-digital-experience#landing-pages-funnels). While our web development team builds complete corporate sites and stores, our funnels team focuses specifically on high-velocity direct-response pages engineered to maximize paid ad ROAS.",
  },
  {
    q: "Why should we build dedicated landing pages instead of using our existing product page?",
    a: "Standard product pages are designed for browsing, not buying. They contain header navigation, footer links, and generic information that distracts visitors. Dedicated landing pages eliminate distractions, match the exact promise made in your ad, and guide visitors along a single, focused path to purchase.",
  },
  {
    q: "How quickly can a custom landing page be designed and launched?",
    a: "A complete custom direct-response landing page—including angle strategy, copywriting, Figma design, and Next.js or Shopify development—is typically delivered in 7 to 14 business days.",
  },
  {
    q: "What tech stack do you use for landing page and funnel development?",
    a: "We engineer landing pages on Next.js, React, and Shopify Plus, as well as visual headless CMS platforms like Sanity and Contentful. We avoid clunky page builders that drag down mobile page speed and degrade Google Quality Scores.",
  },
  {
    q: "Do you also write the sales copy, or do we need to provide it?",
    a: "Our team writes the complete direct-response copy from scratch. We conduct deep customer reviews research, competitor angle teardowns, and messaging workshops to craft high-converting copy that addresses buyer objections and highlights your product's unique mechanism.",
  },
  {
    q: "Can you build post-purchase 1-click upsells for our Shopify store?",
    a: "Yes. We configure native 1-click post-purchase upsells and downsells that appear between checkout and the thank you page, allowing customers to add complementary products with a single tap without re-entering payment or shipping details.",
  },
];

export default function LandingPagesFunnelsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroIv = useInView(heroRef, { once: true, amount: 0.2 });
  const compRef = useRef<HTMLDivElement>(null);
  const compIv = useInView(compRef, { once: true, amount: 0.1 });
  const archRef = useRef<HTMLDivElement>(null);
  const archIv = useInView(archRef, { once: true, amount: 0.1 });
  const processRef = useRef<HTMLDivElement>(null);
  const processIv = useInView(processRef, { once: true, amount: 0.1 });
  const delivRef = useRef<HTMLDivElement>(null);
  const delivIv = useInView(delivRef, { once: true, amount: 0.1 });
  const faqRef = useRef<HTMLDivElement>(null);
  const faqIv = useInView(faqRef, { once: true, amount: 0.2 });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Landing Pages & Funnels",
        serviceType: "Direct-Response Landing Page & Funnel Design",
        provider: {
          "@type": "Organization",
          name: "Sarvopaya",
          url: "https://www.sarvopaya.com",
        },
        description:
          "High-converting landing pages, advertorials, lead quiz funnels, and post-purchase upsells engineered to maximize paid ad ROAS on Meta and Google Ads.",
        url: "https://www.sarvopaya.com/services/landing-pages-funnels",
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
            name: "Website & Digital Experience",
            item: "https://www.sarvopaya.com/services/website-digital-experience#landing-pages-funnels",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Landing Pages & Funnels",
            item: "https://www.sarvopaya.com/services/landing-pages-funnels",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: funnelFaqs.map((f) => ({
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
          FUNNELS
        </span>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={seq}
            initial="hidden"
            animate={heroIv ? "show" : "hidden"}
          >
            {/* Breadcrumb connecting to website-digital-experience#landing-pages-funnels */}
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
                href="/services/website-digital-experience#landing-pages-funnels"
                className="flex items-center gap-1 font-semibold text-[var(--accent)] hover:underline underline-offset-4 transition-all"
              >
                <span>Website & Digital Experience (#landing-pages-funnels)</span>
                <span className="text-[10px] text-black/40">↗</span>
              </Link>
              <span>/</span>
              <span className="font-bold text-black">Landing Pages & Funnels</span>
            </motion.div>

            <motion.div variants={up}>
              <SectionLabel>Direct-Response Conversion Architecture</SectionLabel>
            </motion.div>

            {/* Explicit <h1> with "Landing Pages & Funnels" as requested */}
            <motion.h1
              variants={up}
              className="font-heading text-5xl font-black leading-[1.05] tracking-tight text-black sm:text-6xl lg:text-7xl"
            >
              Landing Pages & Funnels
              <br />
              <span className="text-[var(--accent)]">
                Engineered to Turn Clicks Into Customers.
              </span>
            </motion.h1>

            <motion.p
              variants={up}
              className="mt-6 max-w-3xl text-lg leading-relaxed text-black/60 sm:text-xl"
            >
              Generic product pages kill ad performance. We design and build dedicated,
              high-converting landing pages, advertorials, and multi-step funnels matched
              100% to your paid ad campaigns to extract maximum revenue from every visitor.
            </motion.p>

            {/* Quick Metrics Bar */}
            <motion.div
              variants={up}
              className="mt-10 grid grid-cols-2 gap-4 border-y border-black/8 py-6 sm:grid-cols-4"
            >
              <div>
                <p className="font-heading text-2xl font-black text-black sm:text-3xl">
                  &lt; 1.0s
                </p>
                <p className="mt-1 text-xs text-black/50">Mobile Edge Speed</p>
              </div>
              <div>
                <p className="font-heading text-2xl font-black text-black sm:text-3xl">
                  100%
                </p>
                <p className="mt-1 text-xs text-black/50">Ad-to-Page Congruence</p>
              </div>
              <div>
                <p className="font-heading text-2xl font-black text-[var(--accent)] sm:text-3xl">
                  +30%–40%
                </p>
                <p className="mt-1 text-xs text-black/50">AOV via 1-Click Upsells</p>
              </div>
              <div>
                <p className="font-heading text-2xl font-black text-black sm:text-3xl">
                  7-14 Days
                </p>
                <p className="mt-1 text-xs text-black/50">Turnaround Velocity</p>
              </div>
            </motion.div>

            <motion.div variants={up} className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex h-13 items-center gap-2 rounded-full bg-black px-8 text-sm font-bold text-white transition-all duration-300 hover:bg-[var(--accent)] hover:shadow-xl"
              >
                Build Your Campaign Funnel <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/services/website-digital-experience#landing-pages-funnels"
                className="inline-flex h-13 items-center gap-2 rounded-full border border-black/15 px-8 text-sm font-bold text-black transition-colors duration-300 hover:border-black/40 hover:bg-black/5"
              >
                Back to Website & Digital Experience Hub
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── THE PROBLEM: HOMEPAGE VS DEDICATED FUNNEL ── */}
      <section className="bg-black/[0.02] py-20 sm:py-28 border-y border-black/6" ref={compRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={seq}
            initial="hidden"
            animate={compIv ? "show" : "hidden"}
            className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center"
          >
            <motion.div variants={up} className="lg:col-span-5">
              <SectionLabel>The Message-Match Dilemma</SectionLabel>
              <h2 className="font-heading text-3xl font-black leading-tight tracking-tight text-black sm:text-4xl">
                Why Standard Product Pages Incinerate Ad Budgets.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-black/60">
                A prospect clicks an ad promising a specific solution, only to land
                on a busy homepage or standard PDP with 40 links, competing navigation menus,
                and zero mention of the hook that captured their attention.
                The cognitive disconnect causes 70%+ of paid clicks to bounce immediately.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                <span className="text-xs font-bold uppercase tracking-wider text-black">
                  Funnels provide an uninterrupted psychological path from click to conversion.
                </span>
              </div>
            </motion.div>

            <motion.div variants={up} className="lg:col-span-7">
              <div className="overflow-hidden rounded-3xl border border-black/8 bg-white shadow-sm">
                <div className="border-b border-black/6 bg-black/[0.02] px-6 py-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-black/50">
                    Standard Storefront vs. Dedicated Campaign Funnel
                  </p>
                </div>
                <div className="divide-y divide-black/6">
                  {comparisonPoints.map((row) => (
                    <div key={row.metric} className="p-6">
                      <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] mb-2">
                        {row.metric}
                      </p>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="rounded-xl bg-red-500/[0.04] border border-red-500/10 p-3.5">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-red-500">
                            Standard Product Page
                          </p>
                          <p className="mt-1 text-xs text-black/70">{row.traditional}</p>
                        </div>
                        <div className="rounded-xl bg-emerald-500/[0.05] border border-emerald-500/15 p-3.5">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                            Sarvopaya Funnel Architecture
                          </p>
                          <p className="mt-1 text-xs text-black/85 font-medium">{row.sarvopaya}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 6 FUNNEL ARCHITECTURES ── */}
      <section className="bg-white py-24 sm:py-32" ref={archRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={seq}
            initial="hidden"
            animate={archIv ? "show" : "hidden"}
            className="mb-16"
          >
            <motion.div variants={up}>
              <SectionLabel>Specialized Funnel Frameworks</SectionLabel>
            </motion.div>
            <motion.h2
              variants={up}
              className="font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              Funnels Engineered For
              <br />
              <span className="text-black/30">Every Stage of Intent.</span>
            </motion.h2>
            <motion.p
              variants={up}
              className="mt-4 max-w-2xl text-base text-black/60"
            >
              From cold-traffic pre-purchase advertorials to high-ticket VSL booking funnels,
              we design the exact conversion vehicle suited to your offer and traffic temperature.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {funnelArchitectures.map((arch, i) => (
              <motion.div
                key={arch.number}
                initial={{ opacity: 0, y: 24 }}
                animate={archIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
                className="flex flex-col justify-between rounded-3xl border border-black/8 bg-white p-8 transition-all duration-300 hover:border-black/20 hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-3xl font-black text-[var(--accent)]">
                      {arch.number}
                    </span>
                    <span className="rounded-full bg-black/[0.04] px-2.5 py-0.5 text-[10px] font-bold text-black/50 uppercase tracking-wider">
                      Funnel Architecture
                    </span>
                  </div>

                  <h3 className="mt-4 font-heading text-xl font-bold text-black">
                    {arch.title}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-black/40 uppercase tracking-wider">
                    {arch.subtitle}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-black/60">
                    {arch.desc}
                  </p>
                </div>

                <div className="mt-6 border-t border-black/6 pt-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-black/35 mb-2.5">
                    Key Features
                  </p>
                  <ul className="space-y-1.5">
                    {arch.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-xs font-medium text-black/75"
                      >
                        <span className="text-[var(--accent)] font-bold">→</span>
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

      {/* ── 5-PHASE PROCESS ── */}
      <section className="bg-black/[0.02] py-24 sm:py-32" ref={processRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={seq}
            initial="hidden"
            animate={processIv ? "show" : "hidden"}
            className="mb-16"
          >
            <motion.div variants={up}>
              <SectionLabel>Deployment Process</SectionLabel>
            </motion.div>
            <motion.h2
              variants={up}
              className="font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              From Ad Hook to Launch.
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
            {funnelProcess.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                animate={processIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.1, duration: 0.6, ease: EASE }}
                className="relative flex flex-col justify-between rounded-2xl border border-black/8 bg-white p-6 shadow-sm"
              >
                <div>
                  <span className="font-heading text-3xl font-black text-[var(--accent)]">
                    {step.num}
                  </span>
                  <h3 className="mt-3 font-heading text-lg font-bold text-black">
                    {step.phase}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-black/60">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DELIVERABLES MATRIX ── */}
      <section className="bg-white py-24 sm:py-32" ref={delivRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={seq}
            initial="hidden"
            animate={delivIv ? "show" : "hidden"}
            className="mb-16"
          >
            <motion.div variants={up}>
              <SectionLabel>What You Receive</SectionLabel>
            </motion.div>
            <motion.h2
              variants={up}
              className="font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              Turnkey Funnel Deliverables.
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {funnelDeliverables.map((d, idx) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 20 }}
                animate={delivIv ? { opacity: 1, y: 0 } : {}}
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
                Funnels Powering Full-Stack Growth.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
                A high-converting landing page is only half the equation. Because Sarvopaya
                is an integrated growth marketing, technology, and AI firm, your funnels operate
                in tight lockstep with our performance advertising, CRO, and automation practices:
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/services/website-digital-experience#landing-pages-funnels"
                className="rounded-2xl border border-[var(--accent)]/40 bg-[var(--accent)]/10 p-5 transition-all hover:bg-[var(--accent)]/15"
              >
                <p className="text-xs font-bold text-[var(--accent)]">01. Experience Hub</p>
                <h4 className="mt-1 font-heading text-base font-bold text-white">
                  Website & Digital Experience
                </h4>
                <p className="mt-2 text-xs text-white/70">
                  Anchor portal connecting funnels, bespoke websites, and CRO audits.
                </p>
              </Link>

              <Link
                href="/services/Conversion-Rate-Optimisation"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:bg-white/10 hover:border-white/20"
              >
                <p className="text-xs font-bold text-[var(--accent)]">02. Optimization</p>
                <h4 className="mt-1 font-heading text-base font-bold text-white">
                  CRO Practice
                </h4>
                <p className="mt-2 text-xs text-white/60">
                  Continuous A/B testing and friction elimination across your funnels.
                </p>
              </Link>

              <Link
                href="/services/d2c-marketing"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:bg-white/10 hover:border-white/20"
              >
                <p className="text-xs font-bold text-[var(--accent)]">03. Paid Media</p>
                <h4 className="mt-1 font-heading text-base font-bold text-white">
                  D2C Performance Marketing
                </h4>
                <p className="mt-2 text-xs text-white/60">
                  Drive high-intent Meta & Google ad traffic to your dedicated funnels.
                </p>
              </Link>

              <Link
                href="/services/ai-automation"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:bg-white/10 hover:border-white/20"
              >
                <p className="text-xs font-bold text-[var(--accent)]">04. Automation</p>
                <h4 className="mt-1 font-heading text-base font-bold text-white">
                  AI & n8n Workflows
                </h4>
                <p className="mt-2 text-xs text-white/60">
                  Sub-60s lead notification, instant WhatsApp follow-ups, and CRM routing.
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
            {funnelFaqs.map((faq, i) => (
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
          <SectionLabel>Scale Your Campaigns</SectionLabel>
          <h2 className="mt-4 font-heading text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Stop Sending Paid Traffic
            <br />
            <span className="text-[var(--accent)]">To Low-Converting Pages.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/60 sm:text-lg">
            Build bespoke landing pages and multi-step funnels engineered specifically
            for your ad creative, audience psychology, and revenue targets.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex h-13 items-center gap-2 rounded-full bg-[var(--accent)] px-8 text-sm font-bold text-white transition-all duration-300 hover:brightness-110 hover:shadow-2xl"
            >
              Build Your Campaign Funnel <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/services/website-digital-experience#landing-pages-funnels"
              className="inline-flex h-13 items-center gap-2 rounded-full border border-white/20 px-8 text-sm font-bold text-white transition-colors duration-300 hover:border-white/50 hover:bg-white/5"
            >
              Explore Digital Experience Hub
            </Link>
          </div>

          <p className="mt-6 text-xs text-white/40">
            Next.js & Shopify builds. 100% ad-to-page message match. Pre-wired with CAPI attribution.
          </p>
        </div>
      </section>
    </>
  );
}
