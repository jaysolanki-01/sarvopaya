"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;
const up = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const seq = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };

function SectionLabel({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span
      className={
        light
          ? "mb-4 inline-block rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white/50"
          : "mb-4 inline-block rounded-full border border-black/10 bg-black/[0.04] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-black/50"
      }
    >
      {children}
    </span>
  );
}

const categories = [
  {
    id: "lead-gen",
    label: "Lead Generation & Growth Marketing",
    headline: "More Traffic. Better Leads.",
    accent: "More Conversions.",
    desc: "Full-funnel growth marketing across paid, organic and social. We build the acquisition engine that fills your pipeline with the right customers.",
    services: [
      {
        title: "Performance Advertising",
        desc: "Meta, Google and programmatic campaigns optimised for real ROI. We manage the full funnel from creative to conversion.",
        href: "/services/advertising",
      },
      {
        title: "SEO & GEO",
        desc: "Organic search that compounds. Technical SEO, content strategy, link acquisition and AI search optimisation to own your category.",
        href: "/services/seo",
      },
      {
        title: "Social Media Marketing",
        desc: "Content-led social strategy across Instagram, LinkedIn and YouTube that builds brand equity and drives measurable pipeline.",
        href: "/services/social-media-marketing",
      },
      {
        title: "D2C Marketing",
        desc: "Full-stack D2C growth: brand positioning, paid acquisition, retention loops, and community for consumer brands ready to scale.",
        href: "/services/d2c-marketing",
      },
    ],
  },
  {
    id: "website",
    label: "Website & Digital Experience",
    headline: "Websites That Convert.",
    accent: "Experiences That Retain.",
    desc: "Every pixel of your digital presence, designed to perform. From CRO-led redesigns to lightning-fast storefronts and high-converting landing pages.",
    services: [
      {
        title: "Website Development",
        desc: "Fast, conversion-focused websites built on modern stacks. Design, development and launch under one roof.",
        href: "/services/website-development",
      },
      {
        title: "Website & Digital Experience",
        desc: "CX audits, UX strategy and iterative design sprints that lift engagement, reduce drop-off and maximise on-site revenue.",
        href: "/services/website-digital-experience",
      },
      {
        title: "Landing Pages & Funnels",
        desc: "Dedicated landing pages and multi-step funnels built to convert paid traffic. A/B tested from day one.",
        href: "/services/landing-pages-funnels",
      },
      {
        title: "Conversion Rate Optimisation",
        desc: "Data-driven CRO experiments across your website, checkout and onboarding flows to lift conversion without increasing ad spend.",
        href: "/services/Conversion-Rate-Optimisation",
      },
    ],
  },
  {
    id: "ai",
    label: "AI & Automation",
    headline: "Automate the Ops.",
    accent: "Scale the Output.",
    desc: "We replace repetitive workflows with intelligent automation — AI agents, n8n pipelines and custom LLM applications that do the work of a whole team.",
    services: [
      {
        title: "AI Automation",
        desc: "Custom AI agents, n8n automations and LLM-powered workflows that eliminate manual work, accelerate delivery and reduce operational cost.",
        href: "/services/ai-automation",
      },
    ],
  },
  {
    id: "consulting",
    label: "Growth Consulting",
    headline: "Strategy First.",
    accent: "Execution Always.",
    desc: "Senior growth strategists who help you decide what to do next — go-to-market plans, growth roadmaps, digital audits and ongoing advisory.",
    services: [
      {
        title: "Growth Consulting",
        desc: "GTM strategy, growth roadmaps and digital audits for D2C brands, funded startups and scaling businesses that need clarity.",
        href: "/services/growth-consulting",
      },
      {
        title: "Go-to-Market Strategy",
        desc: "ICP definition, channel strategy, positioning and launch sequencing for new products, new markets and pivots.",
        href: "/services/go-to-market-startegy-expert",
      },
      {
        title: "Growth Strategy",
        desc: "A 6–12 month growth roadmap built around your business model, unit economics and highest-leverage growth levers.",
        href: "/services/growth-strategy",
      },
      {
        title: "Digital Audit",
        desc: "Complete audit of your digital presence — paid ads, SEO, website conversion, social and automation. Know exactly what to fix first.",
        href: "/services/digital-audit",
      },
      {
        title: "Ongoing Advisory",
        desc: "Monthly or weekly retainer with a senior growth strategist. Performance reviews, decision support and fundraising prep.",
        href: "/services/ongoing-advisory",
      },
    ],
  },
];

const faqs = [
  {
    q: "Do you work with businesses outside India?",
    a: "Yes. While we are based in Ahmedabad, India, we work with brands across the US, UK, UAE, Australia, Canada and Singapore. Our growth frameworks are market-agnostic; we localise strategy for each geography.",
  },
  {
    q: "Can I hire Sarvopaya for just one service?",
    a: "Absolutely. Many clients start with a single channel — SEO, paid ads or AI automation — then expand as they see results. There is no minimum suite requirement.",
  },
  {
    q: "How quickly can we get started?",
    a: "Most engagements kick off within 5–7 business days of signing. For a digital audit or a one-off landing page, we can often start within 48 hours.",
  },
  {
    q: "What industries do you specialise in?",
    a: "D2C brands, funded startups (Seed–Series B), SaaS, professional services and e-commerce are our strongest verticals. If you are a scaling business that has stalled on growth, we are likely a good fit.",
  },
  {
    q: "How do you measure success?",
    a: "We define KPIs at the start of every engagement — CAC, ROAS, qualified leads, organic revenue or pipeline growth, depending on the service. You receive a monthly performance report with commentary, not just numbers.",
  },
];

function CategorySection({ cat, index }: { cat: (typeof categories)[number]; index: number }) {
  const catRef = useRef<HTMLDivElement>(null);
  const catIv = useInView(catRef, { once: true, amount: 0.15 });
  const isEven = index % 2 === 0;
  return (
    <section
      id={cat.id}
      ref={catRef}
      className={isEven ? "bg-white py-24 sm:py-32" : "bg-black/[0.02] py-24 sm:py-32"}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={seq}
          initial="hidden"
          animate={catIv ? "show" : "hidden"}
          className="mb-16"
        >
          <motion.div variants={up}>
            <SectionLabel>{cat.label}</SectionLabel>
          </motion.div>
          <motion.h2
            variants={up}
            className="font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
          >
            {cat.headline}
            <br />
            <span className="text-[var(--accent)]">{cat.accent}</span>
          </motion.h2>
          <motion.p variants={up} className="mt-4 max-w-2xl text-base leading-relaxed text-black/55 sm:text-lg">
            {cat.desc}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cat.services.map((svc, si) => (
            <motion.div
              key={svc.href}
              initial={{ opacity: 0, y: 20 }}
              animate={catIv ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: si * 0.1, duration: 0.6, ease: EASE }}
            >
              <Link
                href={svc.href}
                className="group flex h-full flex-col rounded-3xl border border-black/8 bg-white p-8 transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="mb-1 h-1 w-10 rounded-full bg-[var(--accent)]" />
                <h3 className="mt-5 font-heading text-xl font-bold text-black">{svc.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-black/55">{svc.desc}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-black/30 transition-colors duration-300 group-hover:text-[var(--accent)]">
                  Learn more <span aria-hidden="true">→</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroIv = useInView(heroRef, { once: true, amount: 0.3 });
  const faqRef = useRef<HTMLDivElement>(null);
  const faqIv = useInView(faqRef, { once: true, amount: 0.2 });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Services",
        description:
          "Full suite of digital growth services from Sarvopaya — performance advertising, SEO, website development, AI automation, D2C marketing and growth consulting.",
        url: "https://www.sarvopaya.com/services",
        provider: { "@type": "Organization", name: "Sarvopaya", url: "https://www.sarvopaya.com" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.sarvopaya.com" },
          { "@type": "ListItem", position: 2, name: "Services", item: "https://www.sarvopaya.com/services" },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white pb-24 pt-32" ref={heroRef}>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 select-none font-black uppercase leading-none text-black/[0.03]"
          style={{ fontSize: "clamp(100px,18vw,260px)" }}
        >
          SERVICES
        </span>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={heroIv ? "show" : "hidden"}>
            <motion.div variants={up}>
              <SectionLabel>What We Do</SectionLabel>
            </motion.div>
            <motion.h1
              variants={up}
              className="font-heading text-5xl font-black leading-[1.05] tracking-tight text-black sm:text-6xl lg:text-7xl"
            >
              Every Growth Lever,
              <br />
              <span className="text-[var(--accent)]">Under One Roof.</span>
            </motion.h1>
            <motion.p variants={up} className="mt-6 max-w-2xl text-lg leading-relaxed text-black/55 sm:text-xl">
              From performance advertising and AI automation to website development and growth consulting — we
              build and run the systems that scale your business.
            </motion.p>
            <motion.div variants={up} className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex h-13 items-center gap-2 rounded-full bg-black px-8 text-sm font-bold text-white transition-colors duration-300 hover:bg-[var(--accent)]"
              >
                Book a Free Strategy Call <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/work"
                className="inline-flex h-13 items-center gap-2 rounded-full border border-black/15 px-8 text-sm font-bold text-black transition-colors duration-300 hover:border-black/30"
              >
                See Our Work
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICE CATEGORIES ── */}
      {categories.map((cat, ci) => (
        <CategorySection key={cat.id} cat={cat} index={ci} />
      ))}

      {/* ── FAQ ── */}
      <section className="bg-white py-24 sm:py-32" ref={faqRef}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={seq}
            initial="hidden"
            animate={faqIv ? "show" : "hidden"}
            className="mb-16 text-center"
          >
            <motion.div variants={up}>
              <SectionLabel>FAQ</SectionLabel>
            </motion.div>
            <motion.h2 variants={up} className="font-heading text-4xl font-black text-black sm:text-5xl">
              Common Questions
            </motion.h2>
          </motion.div>
          <div className="divide-y divide-black/8 border-y border-black/8">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={faqIv ? { opacity: 1 } : {}}
                transition={{ delay: i * 0.07 }}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left"
                >
                  <span className="font-heading text-base font-bold text-black sm:text-lg">{faq.q}</span>
                  <span
                    className="shrink-0 text-lg font-light text-black/30 transition-transform duration-300"
                    style={{ transform: openFaq === i ? "rotate(45deg)" : "none" }}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-sm leading-relaxed text-black/55">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <SectionLabel light>Get Started</SectionLabel>
          <h2 className="mt-4 font-heading text-4xl font-black text-white sm:text-5xl">
            Ready to Grow Faster?
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/50">
            Book a free 30-minute strategy call. We will diagnose your biggest growth challenge and
            show you the fastest path to results.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex h-13 items-center gap-2 rounded-full bg-[var(--accent)] px-10 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              Book Free Strategy Call →
            </Link>
            <Link
              href="/work"
              className="inline-flex h-13 items-center gap-2 rounded-full border border-white/15 px-10 text-sm font-bold text-white transition-colors hover:border-white/30"
            >
              View Our Case Studies
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
