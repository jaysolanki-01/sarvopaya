"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ─────────────────── TYPES ────────────────────────────
interface Capability {
  number: string;
  title: string;
  subtitle: string;
  desc: string;
  deliverables: string[];
}

interface BrandWork {
  label: string;
  title: string;
  detail: string;
  year: string;
  bg: string;
  textLight: boolean;
}

interface ProcessStep {
  num: string;
  phase: string;
  desc: string;
}

interface FAQ {
  q: string;
  a: string;
}

// ─────────────────── EASINGS ──────────────────────────
const EXPO = [0.16, 1, 0.3, 1] as const;
const SMOOTH = [0.4, 0, 0.2, 1] as const;

// ─────────────────── WORD REVEAL ─────────────────────
function WordReveal({
  text,
  className = "",
  delay = 0,
  trigger,
}: {
  text: string;
  className?: string;
  delay?: number;
  trigger: boolean;
}) {
  const words = text.split(" ");
  return (
    <span className={`inline ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden leading-[1.1]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={trigger ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{
              duration: 0.75,
              ease: EXPO,
              delay: delay + i * 0.055,
            }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// ─────────────────── LINE REVEAL ─────────────────────
function LineReveal({
  children,
  className = "",
  delay = 0,
  trigger,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  trigger: boolean;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "105%", opacity: 0 }}
        animate={trigger ? { y: "0%", opacity: 1 } : { y: "105%", opacity: 0 }}
        transition={{ duration: 0.8, ease: EXPO, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─────────────────── FADE REVEAL ─────────────────────
function FadeUp({
  children,
  delay = 0,
  trigger,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  trigger: boolean;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={trigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.7, ease: EXPO, delay }}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────── CLIP REVEAL IMAGE ───────────────
function ClipReveal({
  children,
  delay = 0,
  trigger,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  trigger: boolean;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={trigger ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
        transition={{ duration: 1.1, ease: EXPO, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─────────────────── CUSTOM CURSOR ───────────────────
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);
  const [hidden, setHidden] = useState(true);
  const pos = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Don't show on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const animate = () => {
      current.current.x = lerp(current.current.x, pos.current.x, 0.12);
      current.current.y = lerp(current.current.y, pos.current.y, 0.12);
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${current.current.x - 24}px, ${current.current.y - 24}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 3}px, ${pos.current.y - 3}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      setHidden(false);
    };
    const onLeave = () => setHidden(true);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    rafRef.current = requestAnimationFrame(animate);

    // Attach data-cursor attributes to project cards
    const cards = document.querySelectorAll("[data-cursor]");
    cards.forEach((card) => {
      const lbl = card.getAttribute("data-cursor") || "";
      card.addEventListener("mouseenter", () => { setLabel(lbl); setActive(true); });
      card.addEventListener("mouseleave", () => { setLabel(""); setActive(false); });
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Large ring */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        style={{ opacity: hidden ? 0 : 1 }}
        className={`pointer-events-none fixed left-0 top-0 z-[9999] h-12 w-12 rounded-full border border-black/40 transition-all duration-200 ${
          active ? "scale-150 border-[var(--accent)] bg-[var(--accent)]/10" : "scale-100"
        }`}
      />
      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{ opacity: hidden ? 0 : 1 }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-black transition-opacity duration-200"
      />
      {/* Label */}
      <AnimatePresence>
        {active && label && (
          <motion.div
            key="cursor-label"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              left: pos.current.x + 16,
              top: pos.current.y - 10,
              zIndex: 10000,
              pointerEvents: "none",
            }}
            className="rounded-full bg-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─────────────────── DATA ─────────────────────────────
const capabilities: Capability[] = [
  {
    number: "01",
    title: "Brand Identity & Visual Systems",
    subtitle: "The face your audience never forgets",
    desc: "We build complete brand identities from first principles — strategy first, aesthetics second. Every mark, typeface, and color system is derived from your positioning, audience psychology, and competitive differentiation.",
    deliverables: ["Logomark, wordmark & full logo suite", "Primary & secondary color palette", "Typography hierarchy & licensing", "Brand pattern, texture & visual motif"],
  },
  {
    number: "02",
    title: "Brand Strategy & Positioning",
    subtitle: "What you stand for before how you look",
    desc: "Visual design without strategic clarity is expensive decoration. We define your brand's core narrative and competitive positioning before a single pixel is drawn.",
    deliverables: ["Brand archetype & personality", "Competitive positioning map", "Core messaging hierarchy", "Target audience persona development"],
  },
  {
    number: "03",
    title: "Brand Guidelines & Design Systems",
    subtitle: "Consistency that compounds over time",
    desc: "A powerful brand loses its equity when executed inconsistently. We create comprehensive brand guidelines and component-level systems that enable any team to produce on-brand work at scale.",
    deliverables: ["Comprehensive brand standards manual", "Logo usage & clear-space specifications", "Typography, color & imagery guides", "Component library for digital & print"],
  },
  {
    number: "04",
    title: "Packaging & Print Design",
    subtitle: "Tactile brand experiences that convert at shelf",
    desc: "For product-first brands, packaging is your highest-ROI marketing asset. We engineer packaging systems that command attention and are built for cost-effective production without compromising impact.",
    deliverables: ["Primary packaging dieline design", "Secondary packaging & gift box systems", "Print-ready files & production specs", "Unboxing experience design"],
  },
  {
    number: "05",
    title: "Digital Brand Experience",
    subtitle: "Brand cohesion across every touchpoint",
    desc: "Modern brands live across dozens of touchpoints simultaneously. We design the full digital brand stack — social templates, decks, email systems, and ad creative frameworks.",
    deliverables: ["Social media template systems", "Brand pitch deck & investor presentations", "Email design system & newsletters", "Digital ad creative framework"],
  },
  {
    number: "06",
    title: "Brand Audits & Rebranding",
    subtitle: "Evolve without losing what works",
    desc: "Sometimes a brand needs refinement, not replacement. Our audits identify what's working and what's diluting your equity — then we guide rebrands that modernize without abandoning earned recognition.",
    deliverables: ["Full visual equity audit", "Competitor brand landscape analysis", "Phased brand refresh roadmap", "Brand transition management"],
  },
];

const brandWork: BrandWork[] = [
  {
    label: "D2C Consumer",
    title: "Complete Brand Identity",
    detail: "Logo system · Packaging · Digital templates",
    year: "2025",
    bg: "#0a0a0a",
    textLight: true,
  },
  {
    label: "B2B SaaS Platform",
    title: "Brand Strategy & Visual Language",
    detail: "Positioning · UI system · Verbal identity",
    year: "2025",
    bg: "#f5f0ea",
    textLight: false,
  },
  {
    label: "Fine Jewellery",
    title: "Premium Brand Rebrand",
    detail: "Visual identity · Packaging · Lookbook",
    year: "2024",
    bg: "#1a1410",
    textLight: true,
  },
  {
    label: "Health & Wellness",
    title: "Brand Launch System",
    detail: "GTM identity · Packaging · Campaign creative",
    year: "2024",
    bg: "#0f1a0f",
    textLight: true,
  },
];

const processSteps: ProcessStep[] = [
  { num: "01", phase: "Brand Discovery", desc: "Deep-dive into your business model, competitive landscape, customer persona, and growth ambitions. We surface what makes you genuinely different." },
  { num: "02", phase: "Strategy & Positioning", desc: "Define your brand architecture — positioning, personality, voice, and narrative — before any visual work begins. Strategy is the brief design executes against." },
  { num: "03", phase: "Visual Exploration", desc: "Multiple design directions developed in parallel. Distinct approaches to typography, color, form language, and visual metaphor — deliberately divergent before converging." },
  { num: "04", phase: "System Development", desc: "Selected direction evolved into a complete visual system: logo suite, color palette, type hierarchy, pattern library, and usage guidelines." },
  { num: "05", phase: "Handoff & Activation", desc: "Brand guidelines delivered, files organized for every use case, and your team trained on consistent application. Launch creative produced on request." },
];

const faqs: FAQ[] = [
  { q: "What is included in a full brand identity project?", a: "A full brand identity includes strategy & positioning, logo design (wordmark, logomark, and variations), color palette, typography system, brand guidelines document, and an application set covering digital and print use cases. Exact deliverables are scoped during discovery." },
  { q: "How is branding different from just designing a logo?", a: "A logo is a single mark. A brand is the entire system of meaning, visual language, and emotional associations that surround your business. We design brand identities — cohesive visual systems rooted in strategy — not isolated logos." },
  { q: "How long does a brand identity project take?", a: "A focused brand identity project typically takes 4 to 6 weeks from discovery to final delivery. Projects with packaging, complex design systems, or large asset libraries may extend to 8 to 10 weeks." },
  { q: "Can you help us rebrand without losing our existing recognition?", a: "Yes. We start with a brand equity audit to identify which elements carry meaningful recognition. The rebrand then modernizes and elevates your brand while carefully preserving or intentionally evolving the equity-bearing elements." },
  { q: "Does branding integrate with the performance marketing work?", a: "Directly. A strong brand reduces your customer acquisition cost over time by building recognition and trust. We design brand creative frameworks specifically for paid ads — creative systems that maintain brand equity while being optimized for conversion." },
];

// ─────────────────── PAGE ─────────────────────────────
export default function BrandingDesignPage() {
  // Hero
  const heroRef = useRef<HTMLDivElement>(null);
  const heroIv = useInView(heroRef, { once: true, amount: 0.1 });

  // Manifesto
  const mfRef = useRef<HTMLDivElement>(null);
  const mfIv = useInView(mfRef, { once: true, amount: 0.3 });

  // Capabilities
  const capRef = useRef<HTMLDivElement>(null);
  const capIv = useInView(capRef, { once: true, amount: 0.05 });

  // Work
  const workRef = useRef<HTMLDivElement>(null);
  const workIv = useInView(workRef, { once: true, amount: 0.05 });

  // Process
  const procRef = useRef<HTMLDivElement>(null);
  const procIv = useInView(procRef, { once: true, amount: 0.05 });

  // FAQ
  const faqRef = useRef<HTMLDivElement>(null);
  const faqIv = useInView(faqRef, { once: true, amount: 0.1 });

  // CTA
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaIv = useInView(ctaRef, { once: true, amount: 0.2 });

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [hoveredCap, setHoveredCap] = useState<number | null>(null);

  // GSAP line draw
  const lineRef = useRef<SVGLineElement>(null);
  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    el.style.strokeDasharray = `${el.getTotalLength?.() ?? 2000}`;
    el.style.strokeDashoffset = `${el.getTotalLength?.() ?? 2000}`;
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Branding & Design",
        serviceType: "Brand Identity & Visual Design",
        provider: { "@type": "Organization", name: "Sarvopaya", url: "https://www.sarvopaya.com" },
        description: "Strategic brand identity design, visual systems, packaging, and brand guidelines for D2C brands and growth-stage companies seeking premium positioning.",
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
      <CustomCursor />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ══════════════════════════════════════════════════════
          HERO — Full viewport, word-by-word reveal
      ══════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-white pb-12 pt-28 sm:pt-36"
      >
        {/* Background large ghost number */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 -top-4 select-none font-black uppercase leading-none text-black/[0.025] sm:right-0"
          style={{ fontSize: "clamp(100px,22vw,320px)" }}
          animate={{ y: "0%" }}
        >
          BRAND
        </motion.div>

        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">

          {/* Breadcrumb */}
          <FadeUp trigger={heroIv} delay={0.05} className="mb-10">
            <div className="flex items-center gap-2 text-[11px] font-medium text-black/35 tracking-wider">
              <Link href="/services" className="transition-colors hover:text-black">Services</Link>
              <span>/</span>
              <span className="text-black/70">Branding & Design</span>
            </div>
          </FadeUp>

          {/* Main headline — large editorial treatment */}
          <div className="max-w-6xl">
            <h1 className="font-heading font-black leading-[0.95] tracking-tight">

              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: "110%" }}
                  animate={heroIv ? { y: "0%" } : { y: "110%" }}
                  transition={{ duration: 0.9, ease: EXPO, delay: 0.1 }}
                  style={{ fontSize: "clamp(52px,9vw,128px)" }}
                  className="block text-black"
                >
                  Brands Built to
                </motion.div>
              </div>

              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: "110%" }}
                  animate={heroIv ? { y: "0%" } : { y: "110%" }}
                  transition={{ duration: 0.9, ease: EXPO, delay: 0.22 }}
                  style={{ fontSize: "clamp(52px,9vw,128px)" }}
                  className="block italic text-[var(--accent)]"
                >
                  Own Their Category.
                </motion.div>
              </div>
            </h1>
          </div>

          {/* Sub-row: tagline + CTA side by side */}
          <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-14 lg:grid-cols-12 lg:items-end">
            <FadeUp trigger={heroIv} delay={0.4} className="lg:col-span-6">
              <p className="text-base leading-relaxed text-black/50 sm:text-lg lg:max-w-lg">
                Not just logo design. We build strategic brand identities — visual languages
                rooted in market positioning that build recognition, trust, and pricing power
                for scaling brands.
              </p>
            </FadeUp>

            <FadeUp trigger={heroIv} delay={0.52} className="flex flex-wrap gap-3 lg:col-span-4 lg:col-start-9 lg:justify-end">
              <Link
                href="/contact"
                className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-black px-7 text-xs font-bold tracking-wide text-white transition-all duration-400 hover:bg-[var(--accent)] hover:shadow-2xl"
              >
                Start a Brand Project
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/resources"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-black/15 px-7 text-xs font-bold text-black transition-colors duration-300 hover:border-black/35"
              >
                View Work
              </Link>
            </FadeUp>
          </div>
        </div>

        {/* Bottom stats strip */}
        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={heroIv ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EXPO, delay: 0.6 }}
            className="mt-16 grid grid-cols-2 gap-6 border-t border-black/8 pt-7 sm:grid-cols-4"
          >
            {[
              { n: "50+", l: "Brand Projects" },
              { n: "4–6w", l: "Delivery Timeline" },
              { n: "Strategy-First", l: "Our Process" },
              { n: "India · UAE · EU", l: "Market Experience" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-heading text-xl font-black text-black sm:text-2xl">{s.n}</p>
                <p className="mt-1 text-[11px] text-black/40">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          MANIFESTO — Full-width dark editorial
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0a0a0a] py-24 sm:py-36" ref={mfRef}>
        {/* Thin accent line */}
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <motion.div
            initial={{ scaleX: 0, transformOrigin: "left" }}
            animate={mfIv ? { scaleX: 1 } : {}}
            transition={{ duration: 1, ease: EXPO, delay: 0.05 }}
            className="mb-10 h-px w-full bg-white/10"
          />

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">

            {/* Large statement */}
            <div className="lg:col-span-7">
              <div className="font-heading font-black leading-[1.1] tracking-tight text-white" style={{ fontSize: "clamp(32px,5vw,72px)" }}>
                <LineReveal trigger={mfIv} delay={0.1}>
                  &ldquo;A brand is the single most
                </LineReveal>
                <LineReveal trigger={mfIv} delay={0.2}>
                  important investment you can make
                </LineReveal>
                <LineReveal trigger={mfIv} delay={0.3}>
                  in your business — before the ads,
                </LineReveal>
                <LineReveal trigger={mfIv} delay={0.4}>
                  before the SEO, before the
                </LineReveal>
                <LineReveal trigger={mfIv} delay={0.5}>
                  <span className="italic text-[var(--accent)]">product launch.&rdquo;</span>
                </LineReveal>
              </div>
              <FadeUp trigger={mfIv} delay={0.65} className="mt-6 flex items-center gap-3">
                <div className="h-px w-8 bg-[var(--accent)]" />
                <p className="text-xs font-bold tracking-widest text-white/40 uppercase">Jay Solanki · Founder, Sarvopaya</p>
              </FadeUp>
            </div>

            {/* Right: why branding first */}
            <div className="lg:col-span-4 lg:col-start-9 flex flex-col justify-end">
              <FadeUp trigger={mfIv} delay={0.4}>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Why Branding First</span>
                <p className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base">
                  Most brands invest in performance marketing before building a coherent visual identity.
                  The result: expensive ads that fail to convert because the landing page doesn&apos;t feel
                  premium enough to justify the price.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base">
                  A strong brand identity compounds. Every ad impression, every piece of packaging,
                  every social post builds recognition. When recognition builds, CAC drops and LTV grows.
                </p>
                <div className="mt-7">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 text-sm font-bold text-white/60 transition-colors hover:text-white"
                  >
                    Discuss your brand project
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </FadeUp>
            </div>
          </div>

          <motion.div
            initial={{ scaleX: 0, transformOrigin: "left" }}
            animate={mfIv ? { scaleX: 1 } : {}}
            transition={{ duration: 1, ease: EXPO, delay: 0.7 }}
            className="mt-16 h-px w-full bg-white/10"
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          COST OF WEAK BRANDING — editorial asymmetric
      ══════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-14">
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/35">The Problem</span>
            <h2 className="mt-3 font-heading text-3xl font-black leading-tight tracking-tight text-black sm:text-4xl lg:text-5xl">
              Generic Design Is Not Neutral.
              <br />
              <span className="text-black/20">It Actively Loses You Business.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-px bg-black/8 overflow-hidden rounded-2xl sm:grid-cols-3">
            {[
              { title: "High CAC", body: "Unmemorable visuals force you to re-earn attention every time. Ads spend more to generate the same trust a recognized brand gets for free.", tag: "Cost of Weakness" },
              { title: "Price Pressure", body: "Commoditized brands compete on price. Premium brands command premium margins. Visual identity is the primary lever between the two.", tag: "Cost of Weakness" },
              { title: "Low Conversion", body: "Visitors judge credibility in milliseconds. Inconsistent or amateurish design creates friction that well-designed checkout flows cannot overcome.", tag: "Cost of Weakness" },
            ].map((item, i) => (
              <div
                key={item.title}
                className="group bg-white p-8 transition-colors duration-300 hover:bg-black/[0.02] sm:p-10"
              >
                <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--accent)]">{item.tag}</span>
                <h3 className="mt-3 font-heading text-2xl font-black text-black">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-black/50">{item.body}</p>
                <div className="mt-5 h-0.5 w-0 bg-[var(--accent)] transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>

          {/* Accent answer strip */}
          <div className="mt-px overflow-hidden rounded-b-none bg-[var(--accent)] p-8 sm:p-10 -mx-0 rounded-2xl mt-4">
            <span className="text-[9px] font-bold uppercase tracking-widest text-white/60">The Sarvopaya Difference</span>
            <h3 className="mt-3 font-heading text-2xl font-black text-white sm:text-3xl">
              Strategy-led brand identities that anchor visual design in market positioning —
              giving you a sustainable competitive advantage built into the visual layer.
            </h3>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CAPABILITIES — editorial accordion list
      ══════════════════════════════════════════════════════ */}
      <section className="bg-black/[0.015] py-24 sm:py-32" ref={capRef}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="mb-16 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-black/35">What We Design</span>
              <h2 className="mt-3 font-heading text-4xl font-black leading-[1.05] tracking-tight text-black sm:text-5xl">
                Six Brand
                <br />
                Design Capabilities.
              </h2>
            </div>
            <FadeUp trigger={capIv} delay={0.2} className="lg:col-span-5 lg:col-start-8 flex items-end">
              <p className="text-base leading-relaxed text-black/50">
                From foundational strategy through production-ready visual systems — a complete
                brand design offering for companies at every stage of growth.
              </p>
            </FadeUp>
          </div>

          <div>
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.number}
                initial={{ opacity: 0, y: 20 }}
                animate={capIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.06, duration: 0.65, ease: EXPO }}
                className={`group cursor-pointer border-t border-black/8 py-8 transition-colors duration-300 sm:py-10 ${
                  hoveredCap === i ? "bg-white" : ""
                }`}
                onMouseEnter={() => setHoveredCap(i)}
                onMouseLeave={() => setHoveredCap(null)}
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-12 sm:items-center">

                  {/* Number */}
                  <div className="sm:col-span-1">
                    <span className="font-heading text-2xl font-black text-black/15 transition-colors duration-300 group-hover:text-[var(--accent)] sm:text-3xl">
                      {cap.number}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="sm:col-span-4">
                    <h3 className="font-heading text-xl font-bold text-black sm:text-2xl">{cap.title}</h3>
                    <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-black/35">{cap.subtitle}</p>
                  </div>

                  {/* Desc */}
                  <div className="sm:col-span-4">
                    <p className="text-sm leading-relaxed text-black/50">{cap.desc}</p>
                  </div>

                  {/* Deliverables + arrow */}
                  <div className="flex items-center justify-between gap-4 sm:col-span-3">
                    <ul className="hidden space-y-1 lg:block">
                      {cap.deliverables.slice(0, 2).map((d) => (
                        <li key={d} className="text-[11px] text-black/40">— {d}</li>
                      ))}
                    </ul>
                    <div className="shrink-0 flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-sm text-black/30 transition-all duration-300 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white ml-auto">
                      →
                    </div>
                  </div>
                </div>

                {/* Expanded deliverables on hover — mobile-friendly */}
                <AnimatePresence>
                  {hoveredCap === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: SMOOTH }}
                      className="overflow-hidden"
                    >
                      <div className="mt-5 grid grid-cols-2 gap-2 pl-0 pt-4 border-t border-black/6 sm:grid-cols-4 sm:pl-[8.33%]">
                        {cap.deliverables.map((d) => (
                          <div key={d} className="flex items-start gap-2 text-xs text-black/60">
                            <span className="mt-0.5 text-[var(--accent)]">✓</span>
                            {d}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
            <div className="border-t border-black/8" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BRAND WORK — large editorial grid
      ══════════════════════════════════════════════════════ */}
      <section className="bg-white py-24 sm:py-32" ref={workRef}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="mb-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-black/35">Selected Work</span>
              <h2 className="mt-2 font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl">
                Brand Projects.
              </h2>
            </div>
            <FadeUp trigger={workIv} delay={0.2}>
              <Link href="/resources" className="group inline-flex items-center gap-2 text-sm font-bold text-black/40 transition-colors hover:text-black">
                View all work
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </FadeUp>
          </div>

          {/* Top row: 2 columns */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {brandWork.slice(0, 2).map((item, i) => (
              <WorkCard key={item.title} item={item} delay={i * 0.12} trigger={workIv} />
            ))}
          </div>

          {/* Bottom row: 1 wide + 1 narrow */}
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-12">
            <div className="sm:col-span-7">
              <WorkCard item={brandWork[2]} delay={0.24} trigger={workIv} tall />
            </div>
            <div className="sm:col-span-5">
              <WorkCard item={brandWork[3]} delay={0.3} trigger={workIv} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PROCESS — numbered timeline, light editorial
      ══════════════════════════════════════════════════════ */}
      <section className="bg-black/[0.015] py-24 sm:py-32" ref={procRef}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="mb-16 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-black/35">How We Work</span>
              <h2 className="mt-3 font-heading text-4xl font-black leading-[1.05] tracking-tight text-black sm:text-5xl">
                The Brand Design
                <br />
                Lifecycle.
              </h2>
            </div>
          </div>

          <div>
            {processSteps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                animate={procIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.09, duration: 0.65, ease: EXPO }}
                className="group grid grid-cols-1 gap-4 border-t border-black/8 py-8 transition-colors duration-300 hover:bg-white sm:grid-cols-12 sm:gap-8 sm:py-10"
              >
                <div className="flex items-start gap-4 sm:col-span-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-black/10 bg-white transition-all duration-300 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)]">
                    <span className="font-heading text-xs font-black text-black/50 transition-colors duration-300 group-hover:text-white">{i + 1}</span>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <h3 className="font-heading text-xl font-bold text-black sm:text-2xl">{step.phase}</h3>
                  <span className="mt-1 block font-heading text-4xl font-black text-black/6">{step.num}</span>
                </div>
                <div className="sm:col-span-6">
                  <p className="text-sm leading-relaxed text-black/50 sm:text-base">{step.desc}</p>
                </div>
                <div className="hidden items-center justify-end sm:col-span-1 sm:flex">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-black/8 text-sm text-black/25 transition-all duration-300 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white">→</div>
                </div>
              </motion.div>
            ))}
            <div className="border-t border-black/8" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TOOLS — compact grid
      ══════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-black/35">Design Craft</span>
              <h2 className="mt-2 font-heading text-2xl font-black text-black sm:text-3xl">The Tools Behind the Work.</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {["Figma", "Illustrator", "InDesign", "Photoshop", "Spline", "Framer"].map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-black/10 bg-black/[0.02] px-4 py-2 text-xs font-bold text-black/60 transition-all duration-200 hover:border-black/25 hover:text-black"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          ECOSYSTEM — dark panel
      ══════════════════════════════════════════════════════ */}
      <section className="bg-black/[0.015] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="overflow-hidden rounded-3xl bg-[#0a0a0a] p-8 sm:p-12">
            <div className="mb-8 max-w-2xl">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Full Growth Ecosystem</span>
              <h2 className="mt-3 font-heading text-3xl font-black text-white sm:text-4xl">
                Branding Backed by a
                <br />Full-Stack Growth Agency.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/50 sm:text-base">
                Your brand identity integrates directly with performance advertising, digital
                experience design, and AI-powered content systems — all under one roof.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { n: "01", href: "/services/website-digital-experience", label: "Digital Experience", title: "Website & UI Design", body: "Brand identity translated into high-converting digital experiences.", accent: true },
                { n: "02", href: "/services/d2c-marketing", label: "Performance", title: "D2C Ads & Growth", body: "Brand creative frameworks built for Meta and Google Ads conversion.", accent: false },
                { n: "03", href: "/services/social-media-marketing", label: "Social & Content", title: "Social Media", body: "On-brand content systems for Instagram, LinkedIn, and YouTube.", accent: false },
                { n: "04", href: "/services/seo", label: "Organic Growth", title: "SEO & GEO", body: "Brand authority amplified through content and search engine visibility.", accent: false },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`group rounded-2xl p-5 transition-all duration-300 ${
                    item.accent
                      ? "border border-[var(--accent)]/30 bg-[var(--accent)]/8 hover:bg-[var(--accent)]/15"
                      : "border border-white/8 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.06]"
                  }`}
                >
                  <p className="text-[9px] font-bold uppercase tracking-widest text-[var(--accent)]">{item.n}. {item.label}</p>
                  <h4 className="mt-1 font-heading text-sm font-bold text-white">{item.title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-white/45">{item.body}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-bold text-white/30 transition-colors group-hover:text-[var(--accent)]">
                    Explore <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════ */}
      <section className="bg-white py-24 sm:py-32" ref={faqRef}>
        <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:px-10">
          <FadeUp trigger={faqIv} delay={0} className="mb-14 text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/35">FAQ</span>
            <h2 className="mt-3 font-heading text-4xl font-black tracking-tight text-black sm:text-5xl">Common Questions.</h2>
          </FadeUp>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <FadeUp key={faq.q} trigger={faqIv} delay={i * 0.06}>
                <div className="overflow-hidden rounded-2xl border border-black/8 bg-white transition-colors hover:border-black/15">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between p-6 text-left"
                    aria-expanded={openFaq === i}
                  >
                    <span className="pr-4 font-heading text-base font-bold text-black sm:text-lg">{faq.q}</span>
                    <span className={`shrink-0 text-xl font-bold transition-transform duration-300 ${openFaq === i ? "rotate-45 text-[var(--accent)]" : "text-black/30"}`} aria-hidden="true">+</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: SMOOTH }}
                      >
                        <div className="border-t border-black/5 px-6 pb-6 pt-4 text-sm leading-relaxed text-black/55">{faq.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA — Full bleed, premium
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0a0a0a] py-24 sm:py-36" ref={ctaRef}>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -bottom-10 select-none font-black uppercase leading-none text-white/[0.02]"
          style={{ fontSize: "clamp(100px,20vw,280px)" }}
        >
          BRAND
        </span>

        <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8 lg:px-10">
          <FadeUp trigger={ctaIv} delay={0}>
            <span className="inline-block rounded-full border border-white/15 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/40">
              Ready to Build Your Brand?
            </span>
          </FadeUp>

          <div className="mt-6 font-heading font-black leading-[0.95] tracking-tight" style={{ fontSize: "clamp(44px,8vw,110px)" }}>
            <LineReveal trigger={ctaIv} delay={0.1} className="text-white">
              Your Brand Is Your
            </LineReveal>
            <LineReveal trigger={ctaIv} delay={0.22} className="italic text-[var(--accent)]">
              Most Durable Asset.
            </LineReveal>
          </div>

          <FadeUp trigger={ctaIv} delay={0.4}>
            <p className="mx-auto mt-7 max-w-xl text-base text-white/45 sm:text-lg">
              Stop competing on price. Build a brand identity that positions you above the
              noise — and makes every future marketing rupee work harder.
            </p>
          </FadeUp>

          <FadeUp trigger={ctaIv} delay={0.52} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-[var(--accent)] px-8 text-sm font-bold text-white transition-all duration-300 hover:brightness-110 hover:shadow-2xl"
            >
              Start a Brand Project
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/resources"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 px-8 text-sm font-bold text-white transition-colors duration-300 hover:border-white/40"
            >
              View Brand Work
            </Link>
          </FadeUp>

          <FadeUp trigger={ctaIv} delay={0.6}>
            <p className="mt-6 text-xs text-white/25">4–6 week delivery · Strategy-first process · Files for digital & print</p>
          </FadeUp>
        </div>
      </section>
    </>
  );
}

// ─────────────────── WORK CARD COMPONENT ─────────────
function WorkCard({
  item,
  delay,
  trigger,
  tall = false,
}: {
  item: BrandWork;
  delay: number;
  trigger: boolean;
  tall?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={trigger ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      className="group relative overflow-hidden rounded-3xl"
      data-cursor="View Work"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Canvas */}
      <div
        className={`relative flex flex-col justify-end overflow-hidden p-8 sm:p-10 ${
          tall ? "min-h-[460px] sm:min-h-[520px]" : "min-h-[320px] sm:min-h-[380px]"
        }`}
        style={{ background: item.bg }}
      >
        {/* Abstract geometric brand identity visual */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.07]">
          <div className="relative" style={{ width: "clamp(120px,30%,200px)", height: "clamp(120px,30%,200px)" }}>
            <div className="absolute inset-0 rounded-full border-[2px] border-current" style={{ color: item.textLight ? "#fff" : "#000" }} />
            <div className="absolute inset-[20%] rounded-full border-[1.5px] border-current" style={{ color: item.textLight ? "#fff" : "#000" }} />
            <div className="absolute inset-[40%] rounded-full bg-current" style={{ color: item.textLight ? "#fff" : "#000" }} />
            <div className="absolute left-0 top-1/2 h-[1px] w-full -translate-y-1/2 bg-current" style={{ color: item.textLight ? "#fff" : "#000" }} />
            <div className="absolute left-1/2 top-0 h-full w-[1px] -translate-x-1/2 bg-current" style={{ color: item.textLight ? "#fff" : "#000" }} />
          </div>
        </div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-[var(--accent)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 0.08 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Year */}
        <span
          className={`absolute right-6 top-6 rounded-full px-3 py-1 text-[9px] font-bold tracking-widest backdrop-blur-sm ${
            item.textLight ? "bg-white/10 text-white/60" : "bg-black/8 text-black/50"
          }`}
        >
          {item.year}
        </span>

        {/* Text group — slides up on hover */}
        <motion.div
          animate={{ y: hovered ? -6 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <span className={`text-[9px] font-bold uppercase tracking-widest ${item.textLight ? "text-white/50" : "text-black/40"}`}>
            {item.label}
          </span>
          <h3 className={`mt-1 font-heading text-xl font-bold leading-tight sm:text-2xl ${item.textLight ? "text-white" : "text-black"}`}>
            {item.title}
          </h3>
          <p className={`mt-1 text-xs ${item.textLight ? "text-white/50" : "text-black/40"}`}>{item.detail}</p>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-black/8 bg-white px-6 py-4">
        <span className="text-xs font-bold text-black/35">{item.label}</span>
        <Link
          href="/resources"
          className="group/link inline-flex items-center gap-1.5 text-xs font-bold text-black/35 transition-colors hover:text-[var(--accent)]"
        >
          View case
          <span className="transition-transform duration-200 group-hover/link:translate-x-1">→</span>
        </Link>
      </div>
    </motion.div>
  );
}
