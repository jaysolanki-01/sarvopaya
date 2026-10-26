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

const auditVectors = [
  {
    number: "01",
    title: "Paid Media & Ad Spend Forensic Review",
    subtitle: "Find where budget is being incinerated",
    desc: "We analyze historical spend across Meta Ads, Google Ads, YouTube, and TikTok. We evaluate account structure, bidding strategies, audience overlap, creative fatigue cycles, and actual Contribution Margin (CM2 & CM3) rather than platform-reported vanity ROAS.",
    deliverables: [
      "Ad account waste & leakage analysis",
      "Creative fatigue & iteration velocity review",
      "Audience cannibalization & overlap check",
      "True contribution margin calculation",
    ],
  },
  {
    number: "02",
    title: "Conversion Rate & Funnel Optimization (CRO)",
    subtitle: "Eliminate friction before checkout",
    desc: "Why are 97% of your visitors leaving without converting? We conduct behavioral teardowns using heatmaps, session recordings, scroll depth benchmarks, page latency metrics, and checkout drop-off analysis to pinpoint exactly where buyers bounce.",
    deliverables: [
      "Landing page & product page teardowns",
      "Mobile UX & Core Web Vitals speed audit",
      "Checkout friction & cart abandonment review",
      "High-impact CRO experiment hypotheses",
    ],
  },
  {
    number: "03",
    title: "Technical SEO & Generative AI Visibility (GEO)",
    subtitle: "Future-proof your organic search moat",
    desc: "We conduct an in-depth technical crawl evaluating site architecture, JavaScript hydration, canonical loops, Schema.org structured data, and search engine crawl budget. Plus, we audit your brand's presence in Generative AI answer engines (ChatGPT, Perplexity, Google AI Overviews).",
    deliverables: [
      "Indexation & crawl budget diagnostic",
      "Core Web Vitals & technical health score",
      "Generative Engine Optimization (GEO) audit",
      "Entity authority & backlink toxicity audit",
    ],
  },
  {
    number: "04",
    title: "Lifecycle Marketing, Email & Retention",
    subtitle: "Maximize 90-day Customer Lifetime Value (LTV)",
    desc: "First-purchase profitability is often razor-thin. We dissect your post-purchase onboarding, automated email/SMS flows (Klaviyo, Mailchimp, WhatsApp), VIP loyalty programs, and repeat repurchase intervals to unlock recurring net profit from existing customers.",
    deliverables: [
      "Email & SMS flow deliverability audit",
      "Welcome, browse & cart abandonment teardown",
      "90-day repeat purchase cohort modeling",
      "Customer segment RFM breakdown",
    ],
  },
  {
    number: "05",
    title: "Automation, Tech Stack & CRM Architecture",
    subtitle: "Remove human bottlenecks & lead decay",
    desc: "We review your operational plumbing: form-to-CRM routing SLAs, lead enrichment, webhook reliability, analytics tracking integrity (GA4, CAPI, offline conversions), and missed automation opportunities across tools like n8n, HubSpot, and WhatsApp.",
    deliverables: [
      "Lead-to-call response time diagnostic",
      "CRM pipeline hygiene & SLA audit",
      "Server-side tracking & CAPI validation",
      "n8n/Zapier workflow efficiency analysis",
    ],
  },
  {
    number: "06",
    title: "Competitive Benchmarking & Unit Economics",
    subtitle: "Benchmark against your fiercest competitors",
    desc: "We place your performance against category leaders: pricing elasticity, creative volume, digital positioning, organic footprint, and unit economics health. You get an objective, external reality check on where you hold an unfair advantage and where you lag.",
    deliverables: [
      "Competitor ad library & angle reverse-engineering",
      "Price elasticity & packaging comparison",
      "Market share & category search share audit",
      "Executive growth diagnostic summary",
    ],
  },
];

const auditDeliverables = [
  {
    title: "45+ Page Forensic Diagnostic Report",
    desc: "A comprehensive, unsparing breakdown of your paid ads, website conversion, SEO, email marketing, and tech stack with screen-recorded walkthroughs.",
    badge: "Detailed Blueprint",
  },
  {
    title: "RAG Risk & Opportunity Scorecard",
    desc: "An executive-level Red/Amber/Green visual dashboard scoring every growth lever by commercial health and urgency.",
    badge: "Executive Summary",
  },
  {
    title: "90-Day Prioritized Action Matrix",
    desc: "A clear Effort vs. Impact matrix separating quick wins you can execute this week from foundational strategic initiatives for the quarter.",
    badge: "Execution Plan",
  },
  {
    title: "60-Min Strategy Debrief Call",
    desc: "A live, interactive strategy call with founder Jay Solanki and senior discipline heads to answer your questions and align your leadership team.",
    badge: "Direct Advisory",
  },
];

const auditFaqs = [
  {
    q: "How does the Digital Audit connect to Sarvopaya's Growth Consulting service?",
    a: "The Digital Audit is an essential diagnostic pillar of our Growth Consulting offering (available at /services/growth-consulting#digital-audit). While a full growth roadmap looks forward to scale, the Digital Audit looks forensicly at what is broken today—revealing exactly where ad budget is being wasted and what must be fixed first.",
  },
  {
    q: "How quickly can you deliver the complete Digital Audit?",
    a: "We can initiate our audit within 24–48 hours of receiving read-only access. The complete diagnostic report, scorecard, and prioritized 90-day action plan are delivered within 48 to 72 business hours.",
  },
  {
    q: "What access do you need to conduct the audit?",
    a: "We only require standard Read-Only / Viewer access to your advertising platforms (Meta Ads Manager, Google Ads), analytics (GA4, Shopify, or custom backend), and email service provider (e.g. Klaviyo). We will never ask for admin credentials or payment permissions.",
  },
  {
    q: "What happens after the audit is delivered?",
    a: "You own the report and action plan with zero strings attached. Your internal marketing team or existing agency can execute the recommendations, or you can partner with Sarvopaya's dedicated execution pods (performance marketing, web development, AI automation) to implement the roadmap directly.",
  },
  {
    q: "Who is this audit specifically designed for?",
    a: "Founders, CMOs, and venture investors at D2C brands, funded technology startups (Seed to Series B), and scaling service businesses spending between ₹2L and ₹50L+ per month on digital acquisition who feel growth has stalled or CAC has become unsustainable.",
  },
];

export default function DigitalAuditPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroIv = useInView(heroRef, { once: true, amount: 0.2 });
  const vectorsRef = useRef<HTMLDivElement>(null);
  const vectorsIv = useInView(vectorsRef, { once: true, amount: 0.1 });
  const deliverableRef = useRef<HTMLDivElement>(null);
  const deliverableIv = useInView(deliverableRef, { once: true, amount: 0.1 });
  const faqRef = useRef<HTMLDivElement>(null);
  const faqIv = useInView(faqRef, { once: true, amount: 0.2 });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "360° Digital Growth Audit",
        serviceType: "Digital Marketing Audit",
        provider: {
          "@type": "Organization",
          name: "Sarvopaya",
          url: "https://www.sarvopaya.com",
        },
        description:
          "Comprehensive digital marketing audit analyzing paid ads, conversion rate optimization, technical SEO, and retention automation with a prioritized 90-day action plan.",
        url: "https://www.sarvopaya.com/services/digital-audit",
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
            item: "https://www.sarvopaya.com/services/growth-consulting#digital-audit",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Digital Audit",
            item: "https://www.sarvopaya.com/services/digital-audit",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: auditFaqs.map((f) => ({
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
          AUDIT
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
                href="/services/growth-consulting#digital-audit"
                className="flex items-center gap-1 font-semibold text-[var(--accent)] hover:underline underline-offset-4 transition-all"
              >
                <span>Growth Consulting (#digital-audit)</span>
                <span className="text-[10px] text-black/40">↗</span>
              </Link>
              <span>/</span>
              <span className="font-bold text-black">Digital Audit</span>
            </motion.div>

            <motion.div variants={up}>
              <SectionLabel>360° Digital Growth Diagnostic</SectionLabel>
            </motion.div>

            <motion.h1
              variants={up}
              className="font-heading text-5xl font-black leading-[1.05] tracking-tight text-black sm:text-6xl lg:text-7xl"
            >
              Stop Guessing Where
              <br />
              <span className="text-[var(--accent)]">
                Your Budget Leaks.
              </span>
            </motion.h1>

            <motion.p
              variants={up}
              className="mt-6 max-w-3xl text-lg leading-relaxed text-black/60 sm:text-xl"
            >
              A forensic diagnostic of your entire digital acquisition ecosystem:
              paid advertising, conversion rate optimization, technical SEO, and retention automation.
              Delivered in 48 to 72 hours with an executive-ready action blueprint.
            </motion.p>

            {/* Quick Metrics Bar */}
            <motion.div
              variants={up}
              className="mt-10 grid grid-cols-2 gap-4 border-y border-black/8 py-6 sm:grid-cols-4"
            >
              <div>
                <p className="font-heading text-2xl font-black text-black sm:text-3xl">
                  48-72h
                </p>
                <p className="mt-1 text-xs text-black/50">Turnaround Time</p>
              </div>
              <div>
                <p className="font-heading text-2xl font-black text-black sm:text-3xl">
                  6 Vectors
                </p>
                <p className="mt-1 text-xs text-black/50">Forensic Scopes</p>
              </div>
              <div>
                <p className="font-heading text-2xl font-black text-[var(--accent)] sm:text-3xl">
                  100%
                </p>
                <p className="mt-1 text-xs text-black/50">Read-Only Safe Access</p>
              </div>
              <div>
                <p className="font-heading text-2xl font-black text-black sm:text-3xl">
                  90-Day
                </p>
                <p className="mt-1 text-xs text-black/50">Fix Roadmap Included</p>
              </div>
            </motion.div>

            <motion.div variants={up} className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex h-13 items-center gap-2 rounded-full bg-black px-8 text-sm font-bold text-white transition-all duration-300 hover:bg-[var(--accent)] hover:shadow-xl"
              >
                Request a Digital Audit <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/services/growth-consulting#digital-audit"
                className="inline-flex h-13 items-center gap-2 rounded-full border border-black/15 px-8 text-sm font-bold text-black transition-colors duration-300 hover:border-black/40 hover:bg-black/5"
              >
                Back to Growth Consulting Hub
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── THE AUDIT COMPARISON: SYMPTOMS VS ROOT CAUSES ── */}
      <section className="bg-black/[0.02] py-20 sm:py-28 border-y border-black/6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5">
              <SectionLabel>The Diagnostic Mindset</SectionLabel>
              <h2 className="font-heading text-3xl font-black leading-tight tracking-tight text-black sm:text-4xl">
                Treating Symptoms vs. Fixing The Root Cause.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-black/60">
                Most brands react to declining growth by simply switching ad agencies
                or throwing more money at Meta and Google. But without auditing the
                entire funnel, you're merely pouring water into a leaky bucket.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                <span className="text-xs font-bold uppercase tracking-wider text-black">
                  Our audit identifies the structural bottleneck holding your margins back.
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-red-500/10 bg-white p-6 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-red-500">
                  What You See (Symptom)
                </span>
                <h4 className="mt-2 font-heading text-lg font-bold text-black">
                  "Meta CAC is too high"
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-black/60">
                  The ad team blames algorithm changes and CPM inflation, cutting spend or cycling ad sets aimlessly.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-500/15 bg-white p-6 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  What The Audit Finds (Cause)
                </span>
                <h4 className="mt-2 font-heading text-lg font-bold text-black">
                  Landing Page Friction & Drop-off
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-black/60">
                  A 3.8s mobile load time, weak initial hook, and confusing shipping fees on checkout killing conversion by 45%.
                </p>
              </div>

              <div className="rounded-2xl border border-red-500/10 bg-white p-6 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-red-500">
                  What You See (Symptom)
                </span>
                <h4 className="mt-2 font-heading text-lg font-bold text-black">
                  "Organic search has flatlined"
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-black/60">
                  Publishing more generic blog posts every week that generate zero clicks and zero buyer pipeline.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-500/15 bg-white p-6 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  What The Audit Finds (Cause)
                </span>
                <h4 className="mt-2 font-heading text-lg font-bold text-black">
                  Index Bloat & Missing GEO Entities
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-black/60">
                  Crawl budget wasted on 500 thin URLs while AI answer engines have zero verified Schema to cite your product.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE 6 AUDIT VECTORS ── */}
      <section className="bg-white py-24 sm:py-32" ref={vectorsRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={seq}
            initial="hidden"
            animate={vectorsIv ? "show" : "hidden"}
            className="mb-16"
          >
            <motion.div variants={up}>
              <SectionLabel>Forensic Scope</SectionLabel>
            </motion.div>
            <motion.h2
              variants={up}
              className="font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              The 6 Vectors of Our
              <br />
              <span className="text-black/30">Growth Audit.</span>
            </motion.h2>
            <motion.p
              variants={up}
              className="mt-4 max-w-2xl text-base text-black/60"
            >
              We don't skim the surface. Every audit goes under the hood across all primary channels, funnels, and retention systems.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {auditVectors.map((vec, i) => (
              <motion.div
                key={vec.number}
                initial={{ opacity: 0, y: 24 }}
                animate={vectorsIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
                className="flex flex-col justify-between rounded-3xl border border-black/8 bg-white p-8 transition-all duration-300 hover:border-black/20 hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-3xl font-black text-[var(--accent)]">
                      {vec.number}
                    </span>
                    <span className="rounded-full bg-black/[0.04] px-2.5 py-0.5 text-[10px] font-bold text-black/50 uppercase tracking-wider">
                      Diagnostic
                    </span>
                  </div>

                  <h3 className="mt-4 font-heading text-xl font-bold text-black">
                    {vec.title}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-black/40 uppercase tracking-wider">
                    {vec.subtitle}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-black/60">
                    {vec.desc}
                  </p>
                </div>

                <div className="mt-6 border-t border-black/6 pt-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-black/35 mb-2.5">
                    What We Audit
                  </p>
                  <ul className="space-y-1.5">
                    {vec.deliverables.map((item) => (
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

      {/* ── AUDIT DELIVERABLES ── */}
      <section className="bg-black/[0.02] py-24 sm:py-32" ref={deliverableRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={seq}
            initial="hidden"
            animate={deliverableIv ? "show" : "hidden"}
            className="mb-16"
          >
            <motion.div variants={up}>
              <SectionLabel>What You Receive</SectionLabel>
            </motion.div>
            <motion.h2
              variants={up}
              className="font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              Actionable Outputs,
              <br />
              <span className="text-[var(--accent)]">Zero Generic Fluff.</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {auditDeliverables.map((d, idx) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 20 }}
                animate={deliverableIv ? { opacity: 1, y: 0 } : {}}
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
      <section className="bg-white py-20 sm:py-28 border-b border-black/6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-neutral-900 p-8 sm:p-12 text-white">
            <div className="max-w-3xl">
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">
                From Diagnosis To Execution
              </span>
              <h2 className="mt-4 font-heading text-3xl font-black text-white sm:text-4xl">
                Audit Delivered. What Comes Next?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
                An audit without execution is just an expensive diagnosis. After our
                debrief, you can hand the plan to your internal team, or activate
                Sarvopaya's specialized execution practices to implement the fixes immediately:
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/services/growth-consulting#digital-audit"
                className="rounded-2xl border border-[var(--accent)]/40 bg-[var(--accent)]/10 p-5 transition-all hover:bg-[var(--accent)]/15"
              >
                <p className="text-xs font-bold text-[var(--accent)]">01. Advisory Hub</p>
                <h4 className="mt-1 font-heading text-base font-bold text-white">
                  Growth Consulting
                </h4>
                <p className="mt-2 text-xs text-white/70">
                  Anchor hub connecting digital audits, GTM plans, and leadership advisory.
                </p>
              </Link>

              <Link
                href="/services/go-to-market-startegy-expert"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:bg-white/10 hover:border-white/20"
              >
                <p className="text-xs font-bold text-[var(--accent)]">02. GTM Strategy</p>
                <h4 className="mt-1 font-heading text-base font-bold text-white">
                  GTM Strategy Experts
                </h4>
                <p className="mt-2 text-xs text-white/60">
                  First-principles positioning and 90-day launch sequencing.
                </p>
              </Link>

              <Link
                href="/services/d2c-marketing"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:bg-white/10 hover:border-white/20"
              >
                <p className="text-xs font-bold text-[var(--accent)]">03. Paid Media</p>
                <h4 className="mt-1 font-heading text-base font-bold text-white">
                  Performance Ads
                </h4>
                <p className="mt-2 text-xs text-white/60">
                  Full-funnel Meta, Google & TikTok optimization to contribution margin.
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
                  Automated lead qualification and CRM hygiene in under 60 seconds.
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
              <SectionLabel>Common Inquiries</SectionLabel>
            </motion.div>
            <motion.h2
              variants={up}
              className="font-heading text-4xl font-black tracking-tight text-black sm:text-5xl"
            >
              Frequently Asked Questions.
            </motion.h2>
            <motion.p variants={up} className="mt-3 text-sm text-black/55">
              Clear answers regarding turnaround, required data access, and deliverables.
            </motion.p>
          </motion.div>

          <div className="space-y-4">
            {auditFaqs.map((faq, i) => (
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
          <SectionLabel>Stop Leaking Revenue</SectionLabel>
          <h2 className="mt-4 font-heading text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Book Your 360° Digital Audit.
            <br />
            <span className="text-[var(--accent)]">Get Total Clarity in 72 Hours.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/60 sm:text-lg">
            Stop guessing why acquisition costs are creeping up. Receive an unbiased,
            forensic audit of your ads, funnels, SEO, and automation from operators who manage scale.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex h-13 items-center gap-2 rounded-full bg-[var(--accent)] px-8 text-sm font-bold text-white transition-all duration-300 hover:brightness-110 hover:shadow-2xl"
            >
              Request a Digital Audit <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/services/growth-consulting#digital-audit"
              className="inline-flex h-13 items-center gap-2 rounded-full border border-white/20 px-8 text-sm font-bold text-white transition-colors duration-300 hover:border-white/50 hover:bg-white/5"
            >
              Explore Growth Consulting Hub
            </Link>
          </div>

          <p className="mt-6 text-xs text-white/40">
            Read-only access only. Confidentiality NDA signed prior to account review.
          </p>
        </div>
      </section>
    </>
  );
}
