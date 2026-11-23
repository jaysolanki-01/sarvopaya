"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;

const up = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};
const seq = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span
      className={`mb-4 inline-block rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest ${
        light
          ? "border-white/20 bg-white/10 text-white/60"
          : "border-black/10 bg-black/[0.04] text-black/50"
      }`}
    >
      {children}
    </span>
  );
}

function Divider() {
  return <div className="h-px w-full bg-black/8" />;
}

// ─────────────────── DATA ───────────────────

const capabilities = [
  {
    number: "01",
    title: "Brand Identity & Visual Systems",
    subtitle: "The face your audience never forgets",
    desc: "We build complete brand identities from first principles — not logo-first, but strategy-first. Every mark, typeface, and color system is derived from your brand's positioning, audience psychology, and competitive differentiation. The result is a cohesive visual language that owns its category.",
    deliverables: [
      "Logomark, wordmark & full logo suite",
      "Primary and secondary color palette systems",
      "Typography hierarchy & font licensing",
      "Brand pattern, texture & visual motif design",
    ],
  },
  {
    number: "02",
    title: "Brand Strategy & Positioning",
    subtitle: "What you stand for before how you look",
    desc: "Visual design without strategic clarity is expensive decoration. We define your brand's core narrative, competitive positioning, and audience persona before a single pixel is drawn. This strategy layer ensures every design decision serves a commercial purpose — not just an aesthetic one.",
    deliverables: [
      "Brand archetype & personality definition",
      "Competitive positioning map",
      "Core messaging hierarchy & brand voice",
      "Target audience persona development",
    ],
  },
  {
    number: "03",
    title: "Brand Guidelines & Design Systems",
    subtitle: "Consistency that compounds over time",
    desc: "A powerful brand loses its equity when it's executed inconsistently. We create comprehensive brand guidelines and component-level design systems that empower your internal teams and external partners to produce on-brand work at any scale — from social posts to investor decks.",
    deliverables: [
      "Comprehensive brand standards manual",
      "Logo usage rules & clear-space specifications",
      "Typography, color & imagery application guides",
      "Component library for digital & print production",
    ],
  },
  {
    number: "04",
    title: "Packaging & Print Design",
    subtitle: "Tactile brand experiences that convert at shelf",
    desc: "For product-first brands, packaging is your highest-ROI marketing asset. We design packaging systems that command attention at shelf and online, communicate your brand's premium positioning, and are engineered for cost-effective production without compromising visual impact.",
    deliverables: [
      "Primary packaging dieline design",
      "Secondary packaging & gift box systems",
      "Print-ready files & production-spec documentation",
      "Unboxing experience design",
    ],
  },
  {
    number: "05",
    title: "Digital Brand Experience",
    subtitle: "Brand cohesion across every touchpoint",
    desc: "Modern brands live across dozens of digital touchpoints simultaneously. We design digital brand experiences — social media templates, presentation decks, email design systems, and digital ad creative frameworks — that maintain visual consistency and conversion effectiveness across every channel.",
    deliverables: [
      "Social media template systems (IG, LinkedIn)",
      "Brand pitch deck & investor presentation design",
      "Email design system & newsletter templates",
      "Digital ad creative framework",
    ],
  },
  {
    number: "06",
    title: "Brand Audits & Rebranding",
    subtitle: "Evolve without losing what works",
    desc: "Sometimes a brand needs refinement, not replacement. Our brand audits identify what's working, what's diluting your equity, and what's holding you back from premium positioning. We guide rebrands that modernize and elevate without abandoning brand recognition built over years.",
    deliverables: [
      "Full visual equity audit",
      "Competitor brand landscape analysis",
      "Phased brand refresh roadmap",
      "Before/after brand transition management",
    ],
  },
];

const processSteps = [
  {
    num: "01",
    phase: "Brand Discovery",
    desc: "Deep-dive into your business model, competitive landscape, customer persona, and growth ambitions. We surface what makes you genuinely different.",
  },
  {
    num: "02",
    phase: "Strategy & Positioning",
    desc: "Define your brand architecture — positioning, personality, voice, and narrative — before any visual work begins. Strategy is the brief design executes against.",
  },
  {
    num: "03",
    phase: "Visual Exploration",
    desc: "Multiple design directions developed in parallel. Distinct approaches to typography, color, form language, and visual metaphor — deliberately divergent before converging.",
  },
  {
    num: "04",
    phase: "System Development",
    desc: "Selected direction evolved into a complete, production-ready visual system: logo suite, color palette, type hierarchy, pattern library, and usage guidelines.",
  },
  {
    num: "05",
    phase: "Handoff & Activation",
    desc: "Brand guidelines delivered, files organized for every use case, and your team trained on consistent application. Brand launch creative produced on request.",
  },
];

const brandWork = [
  {
    label: "D2C Consumer Brand",
    title: "Complete Brand Identity",
    detail: "Logo system, color palette, packaging & digital templates",
    year: "2025",
    color: "bg-neutral-900",
    textColor: "text-white",
  },
  {
    label: "B2B SaaS Platform",
    title: "Brand Strategy & Visual Language",
    detail: "Positioning, verbal identity, UI design system",
    year: "2025",
    color: "bg-stone-100",
    textColor: "text-black",
  },
  {
    label: "Jewellery Brand",
    title: "Premium Brand Rebrand",
    detail: "Visual identity evolution, packaging & lookbook design",
    year: "2024",
    color: "bg-zinc-800",
    textColor: "text-white",
  },
];

const faqs = [
  {
    q: "What is included in a full brand identity project?",
    a: "A full brand identity project includes brand strategy & positioning, logo design (wordmark, logomark, and variations), color palette, typography system, brand guidelines document, and an application set covering digital and print use cases. The exact deliverables are scoped based on your business stage and goals during discovery.",
  },
  {
    q: "How is branding different from just designing a logo?",
    a: "A logo is a single mark. A brand is the entire system of meaning, visual language, and emotional associations that surround your business. We design brand identities — cohesive visual systems rooted in strategy — not isolated logos. A well-designed logo within a weak brand system will fail to build recognition or trust.",
  },
  {
    q: "How long does a brand identity project take?",
    a: "A focused brand identity project typically takes 4 to 6 weeks from discovery to final delivery. This includes strategy definition, visual exploration, refinement, full system development, and guidelines production. Projects with packaging, complex design systems, or large asset libraries may extend to 8 to 10 weeks.",
  },
  {
    q: "Can you help us rebrand without losing our existing recognition?",
    a: "Yes. We start with a brand equity audit to identify which visual and verbal elements carry meaningful recognition. The rebrand then modernizes and elevates your brand while carefully preserving or intentionally evolving the equity-bearing elements. We manage the transition to minimise confusion.",
  },
  {
    q: "Do you design for both digital and physical / print use cases?",
    a: "Yes. We deliver files optimized for both digital (SVG, PNG, web color profiles) and print (PDF, EPS, CMYK color profiles) production. For packaging projects, we provide printer-ready dieline files with bleed and trim specifications. All deliverables are production-ready on receipt.",
  },
  {
    q: "Does branding integrate with the performance marketing work?",
    a: "Directly. Brand identity and performance marketing are complementary, not separate. A strong brand reduces your customer acquisition cost over time by building recognition and trust. We design brand creative frameworks specifically for paid ads — creative systems that maintain brand equity while being optimized for conversion.",
  },
];

// ─────────────────── PAGE ───────────────────

export default function BrandingDesignPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroIv = useInView(heroRef, { once: true, amount: 0.15 });
  const manifestoRef = useRef<HTMLDivElement>(null);
  const manifestoIv = useInView(manifestoRef, { once: true, amount: 0.3 });
  const capRef = useRef<HTMLDivElement>(null);
  const capIv = useInView(capRef, { once: true, amount: 0.1 });
  const workRef = useRef<HTMLDivElement>(null);
  const workIv = useInView(workRef, { once: true, amount: 0.1 });
  const processRef = useRef<HTMLDivElement>(null);
  const processIv = useInView(processRef, { once: true, amount: 0.1 });
  const faqRef = useRef<HTMLDivElement>(null);
  const faqIv = useInView(faqRef, { once: true, amount: 0.15 });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Branding & Design",
        serviceType: "Brand Identity & Visual Design",
        provider: {
          "@type": "Organization",
          name: "Sarvopaya",
          url: "https://www.sarvopaya.com",
        },
        description:
          "Strategic brand identity design, visual systems, packaging, and brand guidelines for D2C brands and growth-stage companies seeking premium positioning.",
        url: "https://www.sarvopaya.com/services/branding-design",
        areaServed: ["India", "United States", "United Kingdom", "United Arab Emirates"],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.sarvopaya.com" },
          { "@type": "ListItem", position: 2, name: "Services", item: "https://www.sarvopaya.com/services" },
          { "@type": "ListItem", position: 3, name: "Branding & Design", item: "https://www.sarvopaya.com/services/branding-design" },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
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

      {/* ══════════════════════════════════════════
          01 · HERO
      ══════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden bg-white pb-0 pt-32 sm:pt-40"
        ref={heroRef}
      >
        {/* Oversized watermark */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-[-2%] top-0 select-none font-black uppercase leading-none text-black/[0.025]"
          style={{ fontSize: "clamp(90px,15vw,220px)" }}
        >
          BRAND
        </span>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={heroIv ? "show" : "hidden"}>

            {/* Breadcrumb */}
            <motion.div variants={up} className="mb-8 flex flex-wrap items-center gap-2 text-xs text-black/40">
              <Link href="/services" className="transition-colors hover:text-black">Services</Link>
              <span>/</span>
              <span className="font-semibold text-black">Branding & Design</span>
            </motion.div>

            {/* Label + headline */}
            <motion.div variants={up}>
              <SectionLabel>Brand Identity & Design</SectionLabel>
            </motion.div>

            <motion.h1
              variants={up}
              className="mt-3 font-heading text-5xl font-black leading-[1.03] tracking-tight text-black sm:text-6xl lg:text-[80px]"
            >
              Brands Built to
              <br />
              <span className="italic text-[var(--accent)]">Own Their Category.</span>
            </motion.h1>

            <motion.p
              variants={up}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-black/55 sm:text-xl"
            >
              We design brand identities and visual systems that position you above the
              noise — not just pretty logos, but strategic visual languages that build
              recognition, trust, and pricing power.
            </motion.p>

            {/* Stats bar */}
            <motion.div
              variants={up}
              className="mt-10 grid grid-cols-2 gap-6 border-y border-black/8 py-7 sm:grid-cols-4"
            >
              {[
                { stat: "50+", label: "Brands Identity Projects" },
                { stat: "4–6w", label: "Typical Delivery Timeline" },
                { stat: "100%", label: "Strategy-Led Process" },
                { stat: "India · UAE · EU", label: "Market Experience" },
              ].map((m) => (
                <div key={m.label}>
                  <p className="font-heading text-2xl font-black text-black sm:text-3xl">
                    {m.stat}
                  </p>
                  <p className="mt-1 text-xs text-black/45">{m.label}</p>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={up} className="mt-9 flex flex-wrap gap-4 pb-20 sm:pb-28">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-black px-8 text-sm font-bold text-white transition-all duration-300 hover:bg-[var(--accent)] hover:shadow-xl"
              >
                Start a Brand Project <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/resources"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-black/15 px-8 text-sm font-bold text-black transition-colors duration-300 hover:border-black/35 hover:bg-black/[0.03]"
              >
                See Our Work
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════════════════
          02 · MANIFESTO / POSITIONING STATEMENT
      ══════════════════════════════════════════ */}
      <section className="bg-white py-20 sm:py-28" ref={manifestoRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">

            {/* Left: oversized pull quote */}
            <motion.div
              variants={seq}
              initial="hidden"
              animate={manifestoIv ? "show" : "hidden"}
              className="lg:col-span-7"
            >
              <motion.p
                variants={up}
                className="font-heading text-3xl font-black leading-[1.15] tracking-tight text-black sm:text-4xl lg:text-5xl"
              >
                "A brand is the single most important investment you can make in your
                business — before the ads, before the SEO, before the product launch."
              </motion.p>
              <motion.div variants={up} className="mt-6 flex items-center gap-3">
                <div className="h-px w-10 bg-[var(--accent)]" />
                <p className="text-sm font-bold text-black/50">Jay Solanki, Founder — Sarvopaya</p>
              </motion.div>
            </motion.div>

            {/* Right: positioning text */}
            <motion.div
              variants={seq}
              initial="hidden"
              animate={manifestoIv ? "show" : "hidden"}
              className="lg:col-span-5 flex flex-col justify-center"
            >
              <motion.div variants={up}>
                <SectionLabel>Why Branding First</SectionLabel>
              </motion.div>
              <motion.p variants={up} className="mt-3 text-base leading-relaxed text-black/60 sm:text-lg">
                Most brands invest in performance marketing before building a coherent visual
                identity. The result: expensive ads that fail to convert because the landing page
                doesn&apos;t feel premium enough to justify the price.
              </motion.p>
              <motion.p variants={up} className="mt-4 text-base leading-relaxed text-black/60 sm:text-lg">
                A strong brand identity compounds. Every ad impression, every piece of packaging,
                every social post contributes to building recognition. When recognition builds,
                CAC drops and LTV grows.
              </motion.p>
              <motion.div variants={up} className="mt-6">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 text-sm font-bold text-black transition-colors hover:text-[var(--accent)]"
                >
                  Discuss your brand project
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════════════════
          03 · WHAT WEAK BRANDING COSTS
      ══════════════════════════════════════════ */}
      <section className="bg-black/[0.015] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <SectionLabel>The Cost of Weak Branding</SectionLabel>
            <h2 className="mt-3 font-heading text-3xl font-black leading-tight tracking-tight text-black sm:text-4xl">
              Generic Design Is Not Neutral.
              <br />
              <span className="text-black/30">It Actively Loses You Business.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                problem: "High CAC",
                body: "Unmemorable visuals force you to re-earn attention every time. Ads spend more to generate the same trust a recognized brand gets for free.",
                accent: false,
              },
              {
                problem: "Price Pressure",
                body: "Commoditized brands compete on price. Premium brands command premium margins. Visual identity is the primary lever between the two.",
                accent: false,
              },
              {
                problem: "Low Conversion",
                body: "Visitors judge credibility in milliseconds. Inconsistent or amateurish design creates friction that well-designed checkout flows cannot overcome.",
                accent: false,
              },
              {
                problem: "Sarvopaya Approach",
                body: "Strategy-led brand identities that anchor visual design in market positioning — giving you a sustainable competitive advantage built into the visual layer.",
                accent: true,
              },
            ].map((item) => (
              <div
                key={item.problem}
                className={`rounded-2xl p-7 ${
                  item.accent
                    ? "bg-[var(--accent)] text-white"
                    : "border border-black/8 bg-white"
                }`}
              >
                <span
                  className={`text-[10px] font-bold uppercase tracking-widest ${
                    item.accent ? "text-white/70" : "text-[var(--accent)]"
                  }`}
                >
                  {item.accent ? "Our Difference" : "The Problem"}
                </span>
                <h3
                  className={`mt-2 font-heading text-xl font-bold ${
                    item.accent ? "text-white" : "text-black"
                  }`}
                >
                  {item.problem}
                </h3>
                <p
                  className={`mt-3 text-sm leading-relaxed ${
                    item.accent ? "text-white/80" : "text-black/55"
                  }`}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          04 · 6 CORE CAPABILITIES
      ══════════════════════════════════════════ */}
      <section className="bg-white py-24 sm:py-32" ref={capRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={seq}
            initial="hidden"
            animate={capIv ? "show" : "hidden"}
            className="mb-16"
          >
            <motion.div variants={up}>
              <SectionLabel>What We Design</SectionLabel>
            </motion.div>
            <motion.h2
              variants={up}
              className="font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              Six Brand Design Capabilities.
              <br />
              <span className="text-black/25">One Integrated Practice.</span>
            </motion.h2>
            <motion.p variants={up} className="mt-5 max-w-2xl text-base text-black/55 sm:text-lg">
              From foundational strategy through production-ready visual systems — a complete brand
              design offering for companies at every stage of growth.
            </motion.p>
          </motion.div>

          <div className="space-y-0">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.number}
                initial={{ opacity: 0, y: 20 }}
                animate={capIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.07, duration: 0.65, ease: EASE }}
                className="group grid grid-cols-1 gap-6 border-t border-black/8 py-10 transition-colors duration-300 hover:bg-black/[0.015] lg:grid-cols-12 lg:items-start lg:gap-10 px-2 -mx-2 rounded-2xl"
              >
                {/* Number */}
                <div className="lg:col-span-1">
                  <span className="font-heading text-4xl font-black text-black/10 transition-colors duration-300 group-hover:text-[var(--accent)]">
                    {cap.number}
                  </span>
                </div>

                {/* Title + subtitle */}
                <div className="lg:col-span-4">
                  <h3 className="font-heading text-xl font-bold text-black sm:text-2xl">
                    {cap.title}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-black/35">
                    {cap.subtitle}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-black/55 lg:max-w-sm">
                    {cap.desc}
                  </p>
                </div>

                {/* Deliverables */}
                <div className="lg:col-span-5 lg:col-start-8">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-black/30 mb-4">
                    What&apos;s Delivered
                  </p>
                  <ul className="space-y-2.5">
                    {cap.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-black/70">
                        <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/8 flex items-center justify-center">
                          <span className="text-[8px] font-black text-[var(--accent)]">✓</span>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
            {/* Final border */}
            <div className="border-t border-black/8" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          05 · FEATURED BRAND WORK
      ══════════════════════════════════════════ */}
      <section className="bg-black/[0.015] py-24 sm:py-32" ref={workRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={seq}
            initial="hidden"
            animate={workIv ? "show" : "hidden"}
            className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <motion.div variants={up}>
                <SectionLabel>Selected Work</SectionLabel>
              </motion.div>
              <motion.h2
                variants={up}
                className="mt-3 font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
              >
                Brand Projects.
              </motion.h2>
            </div>
            <motion.div variants={fadeIn}>
              <Link
                href="/resources"
                className="group inline-flex items-center gap-2 text-sm font-bold text-black/50 transition-colors hover:text-black"
              >
                View all work
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {brandWork.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                animate={workIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.65, ease: EASE }}
                className="group relative overflow-hidden rounded-3xl"
              >
                {/* Visual canvas */}
                <div
                  className={`relative ${item.color} flex aspect-[4/3] items-end overflow-hidden p-7 transition-transform duration-500`}
                >
                  {/* Abstract geometric brand mark placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <div className="relative h-32 w-32">
                      <div className="absolute inset-0 rounded-full border-[3px] border-current" />
                      <div className="absolute inset-6 rounded-full border-[2px] border-current" />
                      <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-current" />
                      <div className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-current" />
                    </div>
                  </div>

                  {/* Large hover overlay */}
                  <div className="absolute inset-0 bg-[var(--accent)]/0 transition-all duration-500 group-hover:bg-[var(--accent)]/10" />

                  {/* Year badge */}
                  <span className="absolute right-5 top-5 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold tracking-wider text-white/70 backdrop-blur-sm">
                    {item.year}
                  </span>

                  {/* Text */}
                  <div className="relative z-10 translate-y-2 transition-transform duration-400 group-hover:translate-y-0">
                    <span className={`text-[10px] font-bold uppercase tracking-widest opacity-60 ${item.textColor}`}>
                      {item.label}
                    </span>
                    <h3 className={`mt-1 font-heading text-xl font-bold leading-tight ${item.textColor}`}>
                      {item.title}
                    </h3>
                    <p className={`mt-1 text-xs opacity-60 ${item.textColor}`}>{item.detail}</p>
                  </div>
                </div>

                {/* Card footer */}
                <div className="flex items-center justify-between border-t border-black/8 bg-white px-6 py-4">
                  <span className="text-xs font-bold text-black/40">{item.label}</span>
                  <Link
                    href="/resources"
                    className="group/link inline-flex items-center gap-1.5 text-xs font-bold text-black/40 transition-colors hover:text-[var(--accent)]"
                  >
                    View case
                    <span aria-hidden="true" className="transition-transform duration-200 group-hover/link:translate-x-1">→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          06 · 5-STEP PROCESS
      ══════════════════════════════════════════ */}
      <section className="bg-white py-24 sm:py-32" ref={processRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={seq}
            initial="hidden"
            animate={processIv ? "show" : "hidden"}
            className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-12"
          >
            <div className="lg:col-span-6">
              <motion.div variants={up}>
                <SectionLabel>How We Work</SectionLabel>
              </motion.div>
              <motion.h2
                variants={up}
                className="mt-3 font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
              >
                The Brand Design
                <br />
                Lifecycle.
              </motion.h2>
            </div>
            <motion.div variants={up} className="lg:col-span-5 lg:col-start-8 flex items-end">
              <p className="text-base leading-relaxed text-black/55">
                Every engagement follows a disciplined sequence: discover before strategize,
                strategize before design, design before system. No shortcuts that dilute
                the final brand equity.
              </p>
            </motion.div>
          </motion.div>

          <div className="relative">
            {/* Vertical connecting line */}
            <div
              aria-hidden="true"
              className="absolute left-[1.9rem] top-6 hidden h-[calc(100%-3rem)] w-px bg-black/8 md:block"
            />

            <div className="space-y-0">
              {processSteps.map((step, idx) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: -16 }}
                  animate={processIv ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: idx * 0.1, duration: 0.65, ease: EASE }}
                  className="group relative grid grid-cols-1 gap-4 border-t border-black/8 py-9 md:grid-cols-12 md:gap-8"
                >
                  {/* Step number with dot */}
                  <div className="relative flex items-start gap-4 md:col-span-2">
                    <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-black/15 bg-white transition-all duration-300 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)]">
                      <span className="font-heading text-xs font-black text-black/40 transition-colors duration-300 group-hover:text-white">
                        {idx + 1}
                      </span>
                    </div>
                    <span className="font-heading text-3xl font-black text-black/8 group-hover:text-black/15 transition-colors duration-300">
                      {step.num}
                    </span>
                  </div>

                  <div className="md:col-span-4">
                    <h3 className="font-heading text-xl font-bold text-black sm:text-2xl">
                      {step.phase}
                    </h3>
                  </div>

                  <div className="md:col-span-6">
                    <p className="text-sm leading-relaxed text-black/55 sm:text-base">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div className="border-t border-black/8" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          07 · TOOLS & CRAFT
      ══════════════════════════════════════════ */}
      <section className="bg-black/[0.015] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <SectionLabel>Design Craft</SectionLabel>
            <h2 className="mt-3 font-heading text-3xl font-black leading-tight tracking-tight text-black sm:text-4xl">
              The Tools Behind the Work.
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { tool: "Figma", role: "UI & Brand Design" },
              { tool: "Adobe Illustrator", role: "Vector & Logo Craft" },
              { tool: "Adobe InDesign", role: "Print & Publication" },
              { tool: "Adobe Photoshop", role: "Image & Compositing" },
              { tool: "Spline / Rive", role: "Motion & 3D Brand" },
              { tool: "Framer", role: "Interactive Prototypes" },
            ].map((item) => (
              <div
                key={item.tool}
                className="rounded-2xl border border-black/8 bg-white p-5 transition-all duration-300 hover:border-black/20 hover:shadow-sm"
              >
                <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--accent)]">
                  {item.role}
                </span>
                <p className="mt-2 font-heading text-sm font-bold text-black">{item.tool}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          08 · CONNECTED ECOSYSTEM
      ══════════════════════════════════════════ */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-neutral-900 p-8 sm:p-12">
            <div className="mb-8 max-w-2xl">
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">
                Full Growth Ecosystem
              </span>
              <h2 className="mt-4 font-heading text-3xl font-black text-white sm:text-4xl">
                Branding Backed by a
                <br />
                Full-Stack Growth Agency.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base">
                Your brand identity integrates directly with performance advertising, digital
                experience design, and AI-powered content systems — all under one roof.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  num: "01",
                  link: "/services/website-digital-experience",
                  accent: true,
                  label: "Digital Experience",
                  title: "Website & UI Design",
                  body: "Brand identity translated into high-converting digital experiences.",
                },
                {
                  num: "02",
                  link: "/services/d2c-marketing",
                  accent: false,
                  label: "Performance Marketing",
                  title: "D2C Ads & Growth",
                  body: "Brand creative frameworks built for Meta and Google Ads conversion.",
                },
                {
                  num: "03",
                  link: "/services/social-media-marketing",
                  accent: false,
                  label: "Social & Content",
                  title: "Social Media Marketing",
                  body: "On-brand content systems for Instagram, LinkedIn, and YouTube.",
                },
                {
                  num: "04",
                  link: "/services/seo",
                  accent: false,
                  label: "Organic Growth",
                  title: "SEO & GEO",
                  body: "Brand authority amplified through content and search engine visibility.",
                },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={item.link}
                  className={`group rounded-2xl p-5 transition-all duration-300 ${
                    item.accent
                      ? "border border-[var(--accent)]/40 bg-[var(--accent)]/10 hover:bg-[var(--accent)]/15"
                      : "border border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8"
                  }`}
                >
                  <p className="text-xs font-bold text-[var(--accent)]">{item.num}. {item.label}</p>
                  <h4 className="mt-1 font-heading text-base font-bold text-white">{item.title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-white/55">{item.body}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-bold text-white/40 transition-colors group-hover:text-[var(--accent)]">
                    Explore
                    <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          09 · FAQ
      ══════════════════════════════════════════ */}
      <section className="bg-black/[0.015] py-24 sm:py-32" ref={faqRef}>
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
              className="mt-3 font-heading text-4xl font-black tracking-tight text-black sm:text-5xl"
            >
              Common Questions.
            </motion.h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={faq.q}
                className="overflow-hidden rounded-2xl border border-black/8 bg-white transition-colors hover:border-black/15"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between p-6 text-left"
                  aria-expanded={openFaq === i}
                >
                  <span className="pr-4 font-heading text-base font-bold text-black sm:text-lg">
                    {faq.q}
                  </span>
                  <span
                    className={`shrink-0 text-xl font-bold transition-transform duration-200 ${
                      openFaq === i ? "rotate-45 text-[var(--accent)]" : "text-black/35"
                    }`}
                    aria-hidden="true"
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
                      <div className="border-t border-black/5 px-6 pb-6 pt-4 text-sm leading-relaxed text-black/60">
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

      {/* ══════════════════════════════════════════
          10 · BOTTOM CTA
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-black py-20 text-white sm:py-28">
        {/* Background texture */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-[-3%] top-0 select-none font-black uppercase leading-none text-white/[0.03]"
          style={{ fontSize: "clamp(90px,14vw,200px)" }}
        >
          BRAND
        </span>

        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-block rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white/50">
            Ready to Build Your Brand?
          </span>

          <h2 className="mt-5 font-heading text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Your Brand Is Your
            <br />
            <span className="italic text-[var(--accent)]">Most Durable Asset.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base text-white/55 sm:text-lg">
            Stop competing on price. Build a brand identity that positions you above the
            noise — and makes every future marketing rupee work harder.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-[var(--accent)] px-8 text-sm font-bold text-white transition-all duration-300 hover:brightness-110 hover:shadow-2xl"
            >
              Start a Brand Project <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/resources"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 px-8 text-sm font-bold text-white transition-colors duration-300 hover:border-white/45 hover:bg-white/8"
            >
              View Brand Work
            </Link>
          </div>

          <p className="mt-7 text-xs text-white/30">
            4–6 week delivery. Strategy-first process. Files for digital & print.
          </p>
        </div>
      </section>
    </>
  );
}
