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

const devCapabilities = [
  {
    number: "01",
    title: "Next.js & React Web Applications",
    subtitle: "Blazing speed with enterprise scalability",
    desc: "We build bespoke web platforms using modern Next.js App Router, React, and TypeScript. Experience sub-second page transitions, dynamic server-side rendering (SSR), static site generation (SSG), and edge-cached architecture designed to handle tens of thousands of concurrent visitors without latency.",
    deliverables: [
      "Custom Next.js & React architecture",
      "Dynamic SSR & Edge caching optimization",
      "Tailwind CSS responsive design systems",
      "TypeScript code safety & maintainability",
    ],
  },
  {
    number: "02",
    title: "Headless & Custom Shopify Stores",
    subtitle: "Built for high-volume D2C ecommerce",
    desc: "Standard Shopify themes come burdened with bloated JavaScript, app-dependency lag, and inflexible layouts that limit conversion rates. We engineer custom Liquid themes or fully headless Shopify setups with lightning-fast checkouts and frictionless customer purchasing paths.",
    deliverables: [
      "Custom Shopify theme development (Liquid / Hydrogen)",
      "Headless storefront integration via Storefront API",
      "App bloat elimination & code cleanup",
      "One-click checkout & cart optimization",
    ],
  },
  {
    number: "03",
    title: "Conversion-Rate-Optimized (CRO) UX/UI",
    subtitle: "Every pixel engineered to drive buyer action",
    desc: "A beautiful website that fails to convert is an expensive brochure. We design wireframes and UI systems rooted in conversion psychology: magnetic above-the-fold value propositions, strategic social proof placement, clear visual hierarchies, and distraction-free conversion funnels.",
    deliverables: [
      "Figma UI/UX wireframes & interactive prototypes",
      "Mobile-first checkout and form flow design",
      "Trust badge & customer proof placement",
      "Sticky CTA & micro-interaction design",
    ],
  },
  {
    number: "04",
    title: "Core Web Vitals & Technical SEO Foundation",
    subtitle: "95+ PageSpeed scores that search engines reward",
    desc: "Slow sites get punished by Google and abandoned by impatient shoppers. We optimize Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS), pairing code-level optimizations with clean semantic HTML and automated Schema.org structured data.",
    deliverables: [
      "Sub-second Largest Contentful Paint (LCP < 1.2s)",
      "Zero Cumulative Layout Shift (CLS < 0.05)",
      "Semantic HTML & Schema.org rich snippets",
      "Automated XML sitemaps & crawl budget hygiene",
    ],
  },
  {
    number: "05",
    title: "Advanced Tracking, Analytics & CAPI Plumbing",
    subtitle: "Flawless attribution data for your ad campaigns",
    desc: "Your digital marketing is only as effective as the data tracking it. Every site we build includes enterprise tracking architecture: Google Tag Manager, GA4 custom event tracking, Meta Conversions API (CAPI), and offline event pipelines so your ad spend optimizes against clean signals.",
    deliverables: [
      "Google Tag Manager (GTM) container architecture",
      "GA4 custom event taxonomy & ecommerce funnels",
      "Meta CAPI & server-side event tracking",
      "Heatmap & session recording integration",
    ],
  },
  {
    number: "06",
    title: "Headless CMS & Content Management",
    subtitle: "Empower your marketing team without developer bottlenecks",
    desc: "We integrate visual headless CMS platforms like Sanity, Contentful, or Strapi. Your marketing team can launch landing pages, edit copy, publish blogs, and run promotional banners in real-time with modular block builders—without ever touching a line of code.",
    deliverables: [
      "Sanity / Contentful modular schema design",
      "Visual page builder with reusable components",
      "Draft preview & staging environments",
      "Granular user permissions & role-based editing",
    ],
  },
];

const techStack = [
  { name: "Next.js", category: "Full-Stack Framework", detail: "App Router, SSR, Edge runtime & Turbopack" },
  { name: "React 19", category: "UI Library", detail: "Component architecture, Server Components & Suspense" },
  { name: "TypeScript", category: "Language", detail: "Strict type safety, self-documenting codebases" },
  { name: "Tailwind CSS", category: "Styling", detail: "Zero-runtime CSS, modern design token systems" },
  { name: "Shopify Plus", category: "Ecommerce Platform", detail: "Liquid templating, Hydrogen & Storefront API" },
  { name: "Framer Motion", category: "Animation Engine", detail: "Hardware-accelerated micro-interactions" },
  { name: "Sanity CMS", category: "Content Architecture", detail: "Structured headless content with live previews" },
  { name: "Vercel", category: "Global Deployment", detail: "Sub-50ms edge delivery with instant previews" },
];

const processSteps = [
  {
    num: "01",
    phase: "Discovery & Architecture",
    desc: "We audit your business model, customer journey, competitor landscape, and conversion goals to define the technical specifications and site blueprint before writing any code.",
  },
  {
    num: "02",
    phase: "Figma UI/UX Prototyping",
    desc: "High-fidelity, interactive prototypes crafted around conversion heuristics, brand guidelines, and responsive design for mobile, tablet, and desktop viewports.",
  },
  {
    num: "03",
    phase: "Clean Code Engineering",
    desc: "Component-driven development in Next.js or Shopify. Every page is optimized for lightning-fast asset loading, accessible markup, and zero layout shift.",
  },
  {
    num: "04",
    phase: "Tracking & Performance Hardening",
    desc: "End-to-end QA across 20+ mobile and desktop browsers, Core Web Vitals benchmark audits, and full GTM, GA4, and Meta CAPI tracking validation.",
  },
  {
    num: "05",
    phase: "Zero-Downtime Launch & Scale",
    desc: "Seamless DNS cutover with zero downtime, automated redirect mapping for SEO preservation, post-launch monitoring, and complete client handoff training.",
  },
];

const devFaqs = [
  {
    q: "How does this Website Development page relate to Website & Digital Experience?",
    a: "This dedicated Website Development practice is the core engineering pillar of our Website & Digital Experience service (available at /services/website-digital-experience#website-development). While our digital experience offering also encompasses CRO audits and rapid ad landing pages, this page focuses specifically on end-to-end custom website and platform builds.",
  },
  {
    q: "How long does a custom website development project take?",
    a: "A high-converting dedicated campaign landing page typically takes 1 to 2 weeks. A complete custom corporate website or bespoke Shopify ecommerce store takes 4 to 8 weeks depending on page count, custom functionality, and CMS integrations.",
  },
  {
    q: "Do you build on Shopify or custom tech stacks like Next.js?",
    a: "We build on both depending on your business requirements. For D2C ecommerce brands, we engineer custom Shopify Liquid themes or headless Shopify setups. For SaaS companies, high-ticket services, and tech firms, we develop on Next.js, React, and TypeScript paired with headless CMS platforms.",
  },
  {
    q: "Will our website be fast and optimized for Google Core Web Vitals?",
    a: "Yes, without exception. We treat web performance as a core feature, not an afterthought. Every website we build is optimized to achieve green Core Web Vitals scores (90+ on Google PageSpeed Insights for both mobile and desktop) with sub-second page loading.",
  },
  {
    q: "Do you set up analytics, GTM, and Meta CAPI during development?",
    a: "Yes. Every website build comes pre-wired with Google Tag Manager, GA4 ecommerce and lead event tracking, and server-side Meta Conversions API (CAPI). We ensure your ad campaigns have clean, uninterrupted attribution data from Day 1.",
  },
  {
    q: "Can our marketing team edit website copy and pages easily after launch?",
    a: "Absolutely. We integrate headless CMS platforms like Sanity or configure user-friendly Shopify admin sections so your non-technical marketing team can easily update content, publish new blog articles, and launch landing pages without needing developer intervention.",
  },
];

export default function WebsiteDevelopmentPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroIv = useInView(heroRef, { once: true, amount: 0.2 });
  const capRef = useRef<HTMLDivElement>(null);
  const capIv = useInView(capRef, { once: true, amount: 0.1 });
  const techRef = useRef<HTMLDivElement>(null);
  const techIv = useInView(techRef, { once: true, amount: 0.1 });
  const processRef = useRef<HTMLDivElement>(null);
  const processIv = useInView(processRef, { once: true, amount: 0.1 });
  const faqRef = useRef<HTMLDivElement>(null);
  const faqIv = useInView(faqRef, { once: true, amount: 0.2 });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Website Development",
        serviceType: "Custom Website & Platform Development",
        provider: {
          "@type": "Organization",
          name: "Sarvopaya",
          url: "https://www.sarvopaya.com",
        },
        description:
          "Custom website development using Next.js, React, and Shopify. Sub-second load times, mobile-first CRO architecture, and technical SEO foundations for scaling businesses.",
        url: "https://www.sarvopaya.com/services/website-development",
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
            item: "https://www.sarvopaya.com/services/website-digital-experience#website-development",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Website Development",
            item: "https://www.sarvopaya.com/services/website-development",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: devFaqs.map((f) => ({
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
          DEVELOP
        </span>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={seq}
            initial="hidden"
            animate={heroIv ? "show" : "hidden"}
          >
            {/* Breadcrumb link connecting to website-digital-experience#website-development */}
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
                href="/services/website-digital-experience#website-development"
                className="flex items-center gap-1 font-semibold text-[var(--accent)] hover:underline underline-offset-4 transition-all"
              >
                <span>Website & Digital Experience (#website-development)</span>
                <span className="text-[10px] text-black/40">↗</span>
              </Link>
              <span>/</span>
              <span className="font-bold text-black">Website Development</span>
            </motion.div>

            <motion.div variants={up}>
              <SectionLabel>Custom Digital Engineering</SectionLabel>
            </motion.div>

            {/* Explicit <h1> with "Website Development" as requested */}
            <motion.h1
              variants={up}
              className="font-heading text-5xl font-black leading-[1.05] tracking-tight text-black sm:text-6xl lg:text-7xl"
            >
              Website Development
              <br />
              <span className="text-[var(--accent)]">
                Built to Perform. Engineered to Convert.
              </span>
            </motion.h1>

            <motion.p
              variants={up}
              className="mt-6 max-w-3xl text-lg leading-relaxed text-black/60 sm:text-xl"
            >
              We design and develop lightning-fast, bespoke websites and ecommerce platforms
              using Next.js, React, and Shopify. Sub-second load times, mobile-first CRO architecture,
              and enterprise tracking built to turn traffic into compounding revenue.
            </motion.p>

            {/* Quick Metrics Bar */}
            <motion.div
              variants={up}
              className="mt-10 grid grid-cols-2 gap-4 border-y border-black/8 py-6 sm:grid-cols-4"
            >
              <div>
                <p className="font-heading text-2xl font-black text-black sm:text-3xl">
                  &lt; 1.2s
                </p>
                <p className="mt-1 text-xs text-black/50">LCP Mobile Speed</p>
              </div>
              <div>
                <p className="font-heading text-2xl font-black text-black sm:text-3xl">
                  95+
                </p>
                <p className="mt-1 text-xs text-black/50">Google PageSpeed Score</p>
              </div>
              <div>
                <p className="font-heading text-2xl font-black text-[var(--accent)] sm:text-3xl">
                  Next.js & Shopify
                </p>
                <p className="mt-1 text-xs text-black/50">Modern Full-Stack</p>
              </div>
              <div>
                <p className="font-heading text-2xl font-black text-black sm:text-3xl">
                  100%
                </p>
                <p className="mt-1 text-xs text-black/50">Tracking & CAPI Setup</p>
              </div>
            </motion.div>

            <motion.div variants={up} className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex h-13 items-center gap-2 rounded-full bg-black px-8 text-sm font-bold text-white transition-all duration-300 hover:bg-[var(--accent)] hover:shadow-xl"
              >
                Start Your Website Project <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/services/website-digital-experience#website-development"
                className="inline-flex h-13 items-center gap-2 rounded-full border border-black/15 px-8 text-sm font-bold text-black transition-colors duration-300 hover:border-black/40 hover:bg-black/5"
              >
                Back to Website & Digital Experience Hub
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── THE PROBLEM WITH BLOATED TEMPLATES ── */}
      <section className="bg-black/[0.02] py-20 sm:py-28 border-y border-black/6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5">
              <SectionLabel>The Performance Barrier</SectionLabel>
              <h2 className="font-heading text-3xl font-black leading-tight tracking-tight text-black sm:text-4xl">
                Why Slow, Bloated Websites Destroy Your Ad ROAS.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-black/60">
                Every extra second of load time cuts conversion rates by 20%. Most agencies
                slap together bloated WordPress themes or slow Shopify apps that degrade user
                experience, drag down Google Quality Scores, and cause visitors to bounce before they ever read your value proposition.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                <span className="text-xs font-bold uppercase tracking-wider text-black">
                  We engineer lean, high-velocity code that converts traffic into buyers.
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-red-500/10 bg-white p-6 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-red-500">
                  Bloated Agency Templates
                </span>
                <h4 className="mt-2 font-heading text-lg font-bold text-black">
                  3.5s+ Load Time Drag
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-black/60">
                  Excessive JavaScript, unused CSS, and third-party plugin lag causing high mobile bounce rates and wasted ad spend.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-500/15 bg-white p-6 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  Sarvopaya Custom Build
                </span>
                <h4 className="mt-2 font-heading text-lg font-bold text-black">
                  Sub-Second Server-Rendered Speed
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-black/60">
                  Next.js App Router edge caching and optimized image pipelines ensuring instantaneous page loads on mobile networks.
                </p>
              </div>

              <div className="rounded-2xl border border-red-500/10 bg-white p-6 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-red-500">
                  Bloated Agency Templates
                </span>
                <h4 className="mt-2 font-heading text-lg font-bold text-black">
                  Generic "Brochureware" Layouts
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-black/60">
                  Pretty designs with zero conversion architecture, weak calls to action, and confusing user checkout paths.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-500/15 bg-white p-6 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  Sarvopaya Custom Build
                </span>
                <h4 className="mt-2 font-heading text-lg font-bold text-black">
                  CRO-Driven Conversion Architecture
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-black/60">
                  Intentional visual hierarchy, compelling value props, sticky CTAs, and frictionless checkouts engineered to maximize revenue per session.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6 CORE CAPABILITIES ── */}
      <section className="bg-white py-24 sm:py-32" ref={capRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={seq}
            initial="hidden"
            animate={capIv ? "show" : "hidden"}
            className="mb-16"
          >
            <motion.div variants={up}>
              <SectionLabel>Core Development Vectors</SectionLabel>
            </motion.div>
            <motion.h2
              variants={up}
              className="font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              Custom Web Engineering
              <br />
              <span className="text-black/30">Tailored to Your Business Model.</span>
            </motion.h2>
            <motion.p
              variants={up}
              className="mt-4 max-w-2xl text-base text-black/60"
            >
              From custom Next.js platforms to scalable Shopify Plus stores, we provide full-stack
              engineering that aligns aesthetic excellence with commercial conversion.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {devCapabilities.map((cap, i) => (
              <motion.div
                key={cap.number}
                initial={{ opacity: 0, y: 24 }}
                animate={capIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
                className="flex flex-col justify-between rounded-3xl border border-black/8 bg-white p-8 transition-all duration-300 hover:border-black/20 hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-3xl font-black text-[var(--accent)]">
                      {cap.number}
                    </span>
                    <span className="rounded-full bg-black/[0.04] px-2.5 py-0.5 text-[10px] font-bold text-black/50 uppercase tracking-wider">
                      Capability
                    </span>
                  </div>

                  <h3 className="mt-4 font-heading text-xl font-bold text-black">
                    {cap.title}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-black/40 uppercase tracking-wider">
                    {cap.subtitle}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-black/60">
                    {cap.desc}
                  </p>
                </div>

                <div className="mt-6 border-t border-black/6 pt-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-black/35 mb-2.5">
                    What's Delivered
                  </p>
                  <ul className="space-y-1.5">
                    {cap.deliverables.map((item) => (
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

      {/* ── MODERN TECH STACK ── */}
      <section className="bg-black/[0.02] py-24 sm:py-32" ref={techRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={seq}
            initial="hidden"
            animate={techIv ? "show" : "hidden"}
            className="mb-16"
          >
            <motion.div variants={up}>
              <SectionLabel>Technology Philosophy</SectionLabel>
            </motion.div>
            <motion.h2
              variants={up}
              className="font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              Modern, Future-Proof Stacks.
              <br />
              <span className="text-[var(--accent)]">Zero Obsolete Plugins.</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {techStack.map((tech, idx) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={techIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.08, duration: 0.6, ease: EASE }}
                className="rounded-2xl border border-black/8 bg-white p-6 shadow-sm transition-all duration-300 hover:border-black/20 hover:shadow-md"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">
                  {tech.category}
                </span>
                <h3 className="mt-2 font-heading text-xl font-bold text-black">
                  {tech.name}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-black/55">
                  {tech.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5-PHASE PROCESS PIPELINE ── */}
      <section className="bg-white py-24 sm:py-32" ref={processRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={seq}
            initial="hidden"
            animate={processIv ? "show" : "hidden"}
            className="mb-16"
          >
            <motion.div variants={up}>
              <SectionLabel>How We Deliver</SectionLabel>
            </motion.div>
            <motion.h2
              variants={up}
              className="font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              The Development Lifecycle.
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
            {processSteps.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                animate={processIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.1, duration: 0.6, ease: EASE }}
                className="relative flex flex-col justify-between rounded-2xl border border-black/8 bg-white p-6"
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

      {/* ── ATTACHED ECOSYSTEM ── */}
      <section className="bg-white py-20 sm:py-28 border-y border-black/6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-neutral-900 p-8 sm:p-12 text-white">
            <div className="max-w-3xl">
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">
                Unified Digital Ecosystem
              </span>
              <h2 className="mt-4 font-heading text-3xl font-black text-white sm:text-4xl">
                Development Backed By A Full Growth Agency.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
                A custom website is only the foundation. Because Sarvopaya is a growth marketing,
                technology, and AI company, your website integrates seamlessly with performance advertising,
                SEO moats, and workflow automation:
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/services/website-digital-experience#website-development"
                className="rounded-2xl border border-[var(--accent)]/40 bg-[var(--accent)]/10 p-5 transition-all hover:bg-[var(--accent)]/15"
              >
                <p className="text-xs font-bold text-[var(--accent)]">01. Experience Hub</p>
                <h4 className="mt-1 font-heading text-base font-bold text-white">
                  Website & Digital Experience
                </h4>
                <p className="mt-2 text-xs text-white/70">
                  Anchor portal connecting web development, CRO audits, and sales funnels.
                </p>
              </Link>

              <Link
                href="/services/d2c-marketing"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:bg-white/10 hover:border-white/20"
              >
                <p className="text-xs font-bold text-[var(--accent)]">02. Acquisition</p>
                <h4 className="mt-1 font-heading text-base font-bold text-white">
                  D2C Performance Marketing
                </h4>
                <p className="mt-2 text-xs text-white/60">
                  Drive high-intent traffic to your new website with Meta and Google Ads.
                </p>
              </Link>

              <Link
                href="/services/seo"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:bg-white/10 hover:border-white/20"
              >
                <p className="text-xs font-bold text-[var(--accent)]">03. Organic Visibility</p>
                <h4 className="mt-1 font-heading text-base font-bold text-white">
                  SEO & Generative GEO
                </h4>
                <p className="mt-2 text-xs text-white/60">
                  Rank on Google and get cited by AI answer engines (ChatGPT, Perplexity).
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
                  Connect website forms to CRM, WhatsApp bots, and email sequences in real time.
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
            {devFaqs.map((faq, i) => (
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
          <SectionLabel>Ready to Build?</SectionLabel>
          <h2 className="mt-4 font-heading text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Build A Website That Converts
            <br />
            <span className="text-[var(--accent)]">Visitors Into Lifetime Buyers.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/60 sm:text-lg">
            Stop losing potential customers to slow load speeds and clunky layouts.
            Schedule a 30-minute discovery session with our engineering and growth team.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex h-13 items-center gap-2 rounded-full bg-[var(--accent)] px-8 text-sm font-bold text-white transition-all duration-300 hover:brightness-110 hover:shadow-2xl"
            >
              Start Your Website Project <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/services/website-digital-experience#website-development"
              className="inline-flex h-13 items-center gap-2 rounded-full border border-white/20 px-8 text-sm font-bold text-white transition-colors duration-300 hover:border-white/50 hover:bg-white/5"
            >
              Explore Digital Experience Hub
            </Link>
          </div>

          <p className="mt-6 text-xs text-white/40">
            Next.js & Shopify builds. Fixed pricing, clear milestone deliverables, and zero technical debt.
          </p>
        </div>
      </section>
    </>
  );
}
