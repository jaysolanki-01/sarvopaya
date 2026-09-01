"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const word = {
  hidden: { opacity: 0, y: "110%", rotateX: -18 },
  show: { opacity: 1, y: "0%", rotateX: 0, transition: { duration: 0.65, ease: EASE } },
};

/* ─── Animated word-by-word headline ─────────────────────────────────── */
function RevealHeading({
  text,
  className,
  as: Tag = "h2",
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();

  const words = text.split(" ");

  return (
    <div ref={ref} className={className} aria-label={text}>
      <Tag className="sr-only">{text}</Tag>
      <span aria-hidden className="flex flex-wrap gap-x-[0.3em] gap-y-0 overflow-hidden">
        {words.map((w, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={reduce ? false : "hidden"}
            animate={inView ? "show" : "hidden"}
            variants={word}
            transition={{ delay: delay + i * 0.06 }}
          >
            {w}
          </motion.span>
        ))}
      </span>
    </div>
  );
}

/* ─── Animated counter ────────────────────────────────────────────────── */
function Counter({ to, suffix = "", prefix = "" }: { to: number | string; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);
  const isNumeric = typeof to === "number";

  useEffect(() => {
    if (!inView || !isNumeric) return;
    const target = to as number;
    const duration = 1400;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.floor(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setCount(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, isNumeric]);

  return (
    <span ref={ref}>
      {prefix}{isNumeric ? count : to}{suffix}
    </span>
  );
}

/* ─── Section label chip ──────────────────────────────────────────────── */
function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider ${
        light
          ? "border-white/20 text-white/60"
          : "border-black/10 text-black/60"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full bg-accent`} />
      {children}
    </span>
  );
}

/* ─── Data ────────────────────────────────────────────────────────────── */
const pillars = [
  {
    id: "01",
    title: "Creative Media",
    body:
      "Strategy, storytelling, and production that stops thumbs. We build brand narratives, ad creative, and content systems that convert attention into intent across every platform and format.",
    tags: ["Brand Strategy", "Ad Creative", "Content Production", "Social Media", "Advertising"],
  },
  {
    id: "02",
    title: "Technology",
    body:
      "Clean, fast, conversion-engineered digital products. From performance landing pages to full-stack web applications built with modern stacks and zero bloat, so your tech serves the business.",
    tags: ["Website Development", "Landing Pages", "E-Commerce", "Performance", "CRO"],
  },
  {
    id: "03",
    title: "Artificial Intelligence",
    body:
      "AI isn't a feature. It's infrastructure. We embed intelligent automation into lead generation, customer journeys, internal workflows, and campaign operations so your growth compounds.",
    tags: ["AI Automation", "Lead Gen AI", "Workflow Automation", "Smart Funnels", "Analytics"],
  },
];

const values = [
  {
    icon: "◈",
    title: "Integrated by design",
    body: "Siloed agencies create siloed results. We built Sarvopaya as a single integrated system from day one so creative, tech, and AI compound each other rather than cancel.",
  },
  {
    icon: "◎",
    title: "ROI is the only metric that matters",
    body: "Impressions, reach, followers these are vanity metrics unless they move revenue. Every service we deliver is measured against actual business outcomes.",
  },
  {
    icon: "◇",
    title: "Execution over ideation",
    body: "The best strategy is the one that ships. We are a team of doers who move fast, iterate hard, and deliver finished work not decks and recommendations.",
  },
  {
    icon: "△",
    title: "Honest always",
    body: "We tell you what your brand needs, not what you want to hear. Bad news early is better than expensive surprises late. Trust is our longest-term investment.",
  },
  {
    icon: "◻",
    title: "Built to scale with you",
    body: "We work with seed-stage startups and established enterprises. Our systems are designed to grow without rebuilding so the work we do today compounds into tomorrow.",
  },
  {
    icon: "◉",
    title: "Ahmedabad-built. India-ready.",
    body: "Rooted in one of India's fastest-growing business cities, we understand the pace, ambition, and pragmatism of Indian commerce and we build accordingly.",
  },
];

const services = [
  "Lead Generation",
  "Performance Marketing",
  "Advertising",
  "SEO",
  "Social Media Marketing",
  "Website Development",
  "AI Automation",
  "Growth Consulting",
];

const clientTypes = [
  "D2C Brands",
  "Manufacturers",
  "B2B Companies",
  "Tech Startups",
  "E-Commerce",
  "Professional Services",
  "Product Businesses",
  "Growth-Stage Brands",
];

const stats = [
  { prefix: "", value: 50, suffix: "+", label: "Brands grown" },
  { prefix: "", value: "3-in-1", suffix: "", label: "Integrated disciplines" },
  { prefix: "", value: 100, suffix: "%", label: "ROI-focused" },
  { prefix: "", value: 8, suffix: "+", label: "Services under one roof" },
];

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Sarvopaya",
  url: "https://sarvopaya.com/about",
  description:
    "Sarvopaya is a creative media, technology and AI company from Ahmedabad, India.",
  mainEntity: {
    "@type": "Organization",
    name: "Sarvopaya",
    url: "https://sarvopaya.com",
    description:
      "A creative media, technology and AI company built for ambitious brands.",
    foundingLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: "Ahmedabad", addressCountry: "IN" } },
    email: "jay.sarvopaya@gmail.com",
    telephone: "+91-92655-03415",
    address: {
      "@type": "PostalAddress",
      streetAddress: "C-1102, PNTC, Times Of India Press Road, Vejalpur",
      addressLocality: "Ahmedabad",
      postalCode: "380015",
      addressCountry: "IN",
    },
  },
};

/* ═══════════════════════════════════════════════════════════════════════ */
export default function AboutPage() {
  const [activeValue, setActiveValue] = useState<number | null>(null);

  return (
    <main className="w-full overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      {/* ── S01 HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen w-full overflow-hidden bg-black">
        {/* Grid background */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Glow */}
        <div aria-hidden className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-accent/20 blur-[120px]" />
        <div aria-hidden className="absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-accent/10 blur-[100px]" />

        {/* Large ghost text */}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 select-none text-[clamp(80px,18vw,240px)] font-bold uppercase leading-none text-transparent"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.04)" }}
        >
          SARV
        </span>

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pb-28 pt-40 sm:px-6 sm:pt-44 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-5xl"
          >
            <motion.div variants={item}>
              <SectionLabel light>Our Story</SectionLabel>
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-8 text-[clamp(48px,9vw,120px)] font-bold uppercase leading-[0.88] tracking-tight text-white"
            >
              Built for brands<br />
              <span className="text-accent">that refuse</span><br />
              to stand still.
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-10 max-w-2xl text-lg leading-relaxed text-white/55 sm:text-xl"
            >
              Sarvopaya is a creative media, technology and AI company from Ahmedabad, India.
              We are a single integrated team that delivers complete digital solutions no handoffs,
              no gaps, no excuses.
            </motion.p>

            <motion.div variants={item} className="mt-12 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full bg-white px-7 text-sm font-bold uppercase tracking-wider text-black"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100" />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  Let&rsquo;s talk
                </span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/services"
                className="inline-flex h-14 items-center gap-3 rounded-full border border-white/20 px-7 text-sm font-bold uppercase tracking-wider text-white/80 transition-colors duration-300 hover:border-white/40 hover:text-white"
              >
                Our Services
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
              className="h-5 w-px bg-white/20"
            />
          </motion.div>
        </div>
      </section>

      {/* ── S02 THE NAME ─────────────────────────────────────────────── */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center lg:gap-24"
          >
            <div>
              <motion.div variants={item}>
                <SectionLabel>The Name</SectionLabel>
              </motion.div>
              <motion.h2
                variants={item}
                className="mt-6 text-5xl font-bold uppercase leading-tight tracking-tight text-black sm:text-6xl lg:text-7xl"
              >
                SARV<span className="text-accent">.</span><br />
                Complete<span className="font-body font-normal italic">.</span>
              </motion.h2>
              <motion.p variants={item} className="mt-8 text-lg leading-relaxed text-black/60">
                In Sanskrit, <strong className="text-black">Sarvopaya</strong> means{" "}
                <em>complete solutions</em> from{" "}
                <strong className="text-black">Sarv</strong> (all, complete) and{" "}
                <strong className="text-black">Upaya</strong> (solutions, means).
              </motion.p>
              <motion.p variants={item} className="mt-4 text-lg leading-relaxed text-black/60">
                It&rsquo;s not a clever startup name. It&rsquo;s a statement of intent. When we
                started, we made a decision: we would not be another single-service agency
                that hands you off at the edge of what they know. We would be complete.
              </motion.p>
            </div>

            <motion.div variants={item} className="space-y-0">
              {[
                { abbr: "SARV", meaning: "All / Complete", detail: "We cover every dimension of digital growth creative, technical, intelligent." },
                { abbr: "DIGITAL", meaning: "The medium", detail: "Our domain is the internet: paid channels, organic reach, and automation." },
                { abbr: "UPAYA", meaning: "Solutions / Means", detail: "Not services. Solutions. We solve the underlying business problem, not just the surface brief." },
              ].map((part, i) => (
                <div
                  key={part.abbr}
                  className="flex gap-6 border-b border-black/8 py-8 first:border-t first:border-black/8"
                >
                  <span className="w-14 shrink-0 pt-1 text-xs font-black uppercase tracking-widest text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-2xl font-bold uppercase tracking-tight text-black sm:text-3xl">
                      {part.abbr}
                    </p>
                    <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-black/40">
                      {part.meaning}
                    </p>
                    <p className="mt-2 text-base leading-relaxed text-black/60">{part.detail}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── S03 OUR MISSION ──────────────────────────────────────────── */}
      <section className="w-full bg-black">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={container}
          >
            <motion.div variants={item}>
              <SectionLabel light>Why We Exist</SectionLabel>
            </motion.div>

            <RevealHeading
              text="Most brands don't fail because of bad products."
              as="h2"
              className="mt-8 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
              delay={0.1}
            />
            <RevealHeading
              text="They fail because of fragmented execution."
              as="h2"
              className="mt-2 text-4xl font-bold leading-tight tracking-tight text-white/40 sm:text-5xl lg:text-6xl"
              delay={0.4}
            />

            <motion.div
              variants={item}
              className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3"
            >
              {[
                {
                  problem: "One agency does ads. Another does the website. A third handles social.",
                  outcome: "No one owns the full picture. The customer experience breaks between handoffs.",
                },
                {
                  problem: "You get deliverables, not results. Campaigns that run, but revenue that doesn't move.",
                  outcome: "The brief was fulfilled. The business problem wasn't solved.",
                },
                {
                  problem: "AI is a buzzword. Technology is an afterthought. Creativity is isolated.",
                  outcome: "Three disciplines that should compound each other kept apart.",
                },
              ].map((block, i) => (
                <motion.div
                  key={i}
                  variants={item}
                  className="rounded-3xl border border-white/8 bg-white/[0.03] p-8"
                >
                  <p className="text-sm font-semibold uppercase tracking-wider text-accent/70">
                    Problem {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-white/70">
                    {block.problem}
                  </p>
                  <div className="my-6 h-px w-full bg-white/8" />
                  <p className="text-sm leading-relaxed text-white/35">{block.outcome}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={item}
              className="mt-16 rounded-3xl border border-accent/20 bg-accent/5 p-10 sm:p-14"
            >
              <p className="text-2xl font-bold leading-snug text-white sm:text-3xl lg:text-4xl">
                Sarvopaya was built as the answer one integrated team that handles your
                creative, your technology, and your AI in a single coordinated system.
              </p>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/55">
                Not a holding company of separate agencies. Not a generalist freelancer pretending
                to be everything. A purpose-built, integrated team where Creative Media,
                Technology, and AI are three disciplines of one organism.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── S04 THREE PILLARS ────────────────────────────────────────── */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
          >
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <motion.div variants={item}>
                  <SectionLabel>Three Pillars</SectionLabel>
                </motion.div>
                <motion.h2
                  variants={item}
                  className="mt-4 text-4xl font-bold uppercase leading-tight tracking-tight text-black sm:text-5xl lg:text-6xl"
                >
                  One team.<br />
                  <span className="text-accent">Three superpowers.</span>
                </motion.h2>
              </div>
              <motion.p
                variants={item}
                className="max-w-xs text-sm leading-relaxed text-black/50 sm:text-right"
              >
                Each discipline is deep on its own. Together they create compound growth
                no single-service agency can match.
              </motion.p>
            </div>

            <motion.div
              variants={item}
              className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3"
            >
              {pillars.map((p) => (
                <motion.div
                  key={p.id}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="group flex flex-col justify-between rounded-3xl bg-black p-8 transition-colors duration-300 hover:bg-accent sm:p-10"
                >
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-white/30 group-hover:text-white/50">
                      {p.id}
                    </span>
                    <h3 className="mt-6 text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
                      {p.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-white/60 group-hover:text-white/80">
                      {p.body}
                    </p>
                  </div>
                  <div className="mt-10 flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/50 group-hover:border-white/30 group-hover:text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── S05 STATS ────────────────────────────────────────────────── */}
      <section className="w-full bg-black">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={container}
          >
            <motion.div variants={item}>
              <SectionLabel light>By The Numbers</SectionLabel>
            </motion.div>
            <motion.h2
              variants={item}
              className="mt-6 text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl"
            >
              The scorecard so far.
            </motion.h2>

            <motion.div
              variants={item}
              className="mt-14 grid grid-cols-2 gap-px border border-white/8 bg-white/8 sm:grid-cols-4"
            >
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col justify-between bg-black p-8 sm:p-10">
                  <p className="text-5xl font-black tabular-nums tracking-tight text-white sm:text-6xl lg:text-7xl">
                    <Counter
                      prefix={s.prefix}
                      to={typeof s.value === "number" ? s.value : s.value}
                      suffix={s.suffix}
                    />
                  </p>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-white/40">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── S06 VALUES ───────────────────────────────────────────────── */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
          >
            <motion.div variants={item}>
              <SectionLabel>How We Work</SectionLabel>
            </motion.div>
            <motion.h2
              variants={item}
              className="mt-6 text-4xl font-bold uppercase leading-tight tracking-tight text-black sm:text-5xl lg:text-6xl"
            >
              Our six<br />
              <span className="text-accent">non-negotiables.</span>
            </motion.h2>

            <motion.div
              variants={item}
              className="mt-14 grid grid-cols-1 gap-0 divide-y divide-black/8 border-y border-black/8 sm:grid-cols-2 sm:divide-y-0 sm:divide-x"
            >
              {values.map((v, i) => (
                <motion.button
                  key={v.title}
                  type="button"
                  onClick={() => setActiveValue(activeValue === i ? null : i)}
                  className="group flex flex-col gap-4 px-0 py-8 text-left transition-colors duration-200 hover:bg-black/[0.015] sm:px-8 sm:py-10"
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-5">
                      <span className="mt-0.5 text-xl text-accent/60">{v.icon}</span>
                      <p className="text-lg font-bold uppercase tracking-tight text-black sm:text-xl">
                        {v.title}
                      </p>
                    </div>
                    <span className={`mt-1 shrink-0 text-sm text-black/30 transition-transform duration-300 ${activeValue === i ? "rotate-45" : ""}`}>
                      +
                    </span>
                  </div>
                  <AnimatePresence>
                    {activeValue === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="overflow-hidden pl-9 text-base leading-relaxed text-black/55"
                      >
                        {v.body}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── S07 SERVICES LIST ────────────────────────────────────────── */}
      <section className="w-full bg-black">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
          >
            <motion.div variants={item}>
              <SectionLabel light>What We Do</SectionLabel>
            </motion.div>
            <motion.h2
              variants={item}
              className="mt-6 text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl"
            >
              Eight services.<br />One system.
            </motion.h2>

            <motion.div
              variants={item}
              className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {services.map((s, i) => (
                <motion.div
                  key={s}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5, ease: EASE }}
                  className="group rounded-2xl border border-white/8 bg-white/[0.03] p-6 transition-all duration-300 hover:border-accent/40 hover:bg-accent/5"
                >
                  <span className="text-xs font-black uppercase tracking-widest text-white/25 group-hover:text-accent/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-white/70 group-hover:text-white">
                    {s}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={item} className="mt-10 text-center">
              <Link
                href="/services"
                className="group inline-flex h-12 items-center gap-3 rounded-full border border-white/20 px-7 text-sm font-bold uppercase tracking-wider text-white/70 transition-all duration-300 hover:border-accent hover:text-white"
              >
                View all services
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── S08 WHO WE WORK WITH ─────────────────────────────────────── */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={container}
          >
            <motion.div variants={item}>
              <SectionLabel>Our Clients</SectionLabel>
            </motion.div>
            <motion.h2
              variants={item}
              className="mt-6 text-4xl font-bold uppercase leading-tight tracking-tight text-black sm:text-5xl"
            >
              We work with<br />
              <span className="text-accent">ambitious brands.</span>
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-black/55"
            >
              From early-stage startups to established manufacturers if you&rsquo;re
              serious about growth and open to a rigorous integrated approach, we&rsquo;re
              the right partner.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-14 flex flex-wrap gap-3"
            >
              {clientTypes.map((ct, i) => (
                <motion.span
                  key={ct}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: EASE }}
                  className="rounded-full border border-black/12 bg-black/[0.02] px-5 py-2.5 text-sm font-semibold text-black/70"
                >
                  {ct}
                </motion.span>
              ))}
            </motion.div>

            <motion.p
              variants={item}
              className="mt-10 text-sm font-semibold uppercase tracking-wider text-black/35"
            >
              Trusted by 50+ brands across India and internationally
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── S09 LOCATION ─────────────────────────────────────────────── */}
      <section className="w-full bg-black">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={container}
            className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center"
          >
            <div>
              <motion.div variants={item}>
                <SectionLabel light>Find Us</SectionLabel>
              </motion.div>
              <motion.h2
                variants={item}
                className="mt-6 text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl"
              >
                Ahmedabad.<br />
                <span className="text-accent">India.</span>
              </motion.h2>
              <motion.p
                variants={item}
                className="mt-6 max-w-lg text-lg leading-relaxed text-white/55"
              >
                We are based at PNTC, one of Ahmedabad&rsquo;s premier business addresses and we
                work with brands across India, Europe, and the Middle East.
              </motion.p>

              <motion.div
                variants={item}
                className="mt-10 space-y-5 divide-y divide-white/8 border-t border-white/8"
              >
                {[
                  {
                    label: "Address",
                    value: "C-1102, PNTC, Times Of India Press Road, Vejalpur, Ahmedabad 380015",
                    href: undefined,
                  },
                  {
                    label: "Email",
                    value: "jay.sarvopaya@gmail.com",
                    href: "mailto:jay.sarvopaya@gmail.com",
                  },
                  {
                    label: "Phone",
                    value: "+91 92655 03415",
                    href: "tel:+919265503415",
                  },
                ].map((row) => (
                  <div key={row.label} className="flex flex-col gap-1 py-5 sm:flex-row sm:gap-8">
                    <span className="w-24 shrink-0 text-xs font-semibold uppercase tracking-widest text-white/30">
                      {row.label}
                    </span>
                    {row.href ? (
                      <a
                        href={row.href}
                        className="text-base font-semibold text-white transition-colors duration-300 hover:text-accent"
                      >
                        {row.value}
                      </a>
                    ) : (
                      <p className="text-base font-semibold leading-relaxed text-white">{row.value}</p>
                    )}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Google Maps embed */}
            <motion.div
              variants={item}
              className="relative overflow-hidden rounded-3xl border border-white/8 sm:h-[420px]"
              style={{ height: "340px" }}
            >
              <iframe
                title="Sarvopaya office location"
                src="https://maps.google.com/maps?q=C-1102+PNTC+Times+Of+India+Press+Road+Vejalpur+Ahmedabad+380015+India&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* "Open in Maps" pill */}
              <a
                href="https://share.google/uof4RFT5sGHERr5LP"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-black/80 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition-colors duration-300 hover:bg-accent"
              >
                Open in Maps
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── S10 CTA ──────────────────────────────────────────────────── */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={container}
            className="flex flex-col items-center text-center"
          >
            <motion.div variants={item}>
              <SectionLabel>Work Together</SectionLabel>
            </motion.div>
            <motion.h2
              variants={item}
              className="mt-8 max-w-4xl text-5xl font-bold uppercase leading-tight tracking-tight text-black sm:text-6xl lg:text-7xl"
            >
              Ready to build<br />
              something <span className="text-accent">great?</span>
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-8 max-w-xl text-lg leading-relaxed text-black/55"
            >
              Tell us where your brand is and where you want it to go. We&rsquo;ll map out
              exactly how Sarvopaya can close the gap and we&rsquo;ll do it in one conversation.
            </motion.p>
            <motion.div variants={item} className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full bg-black px-8 text-sm font-bold uppercase tracking-wider text-white"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100" />
                <span className="relative z-10">Start a conversation</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/services"
                className="inline-flex h-14 items-center gap-3 rounded-full border border-black/15 px-8 text-sm font-bold uppercase tracking-wider text-black/70 transition-colors duration-300 hover:border-black/30 hover:text-black"
              >
                Explore our services
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
