"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;
const up = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const seq = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-4 inline-block rounded-full border border-black/10 bg-black/[0.04] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-black/50">
      {children}
    </span>
  );
}

const services = [
  {
    id: "gtm",
    anchor: "gtm",
    title: "Go-to-Market Strategy",
    desc: "We build your GTM plan from first principles — ICP definition, positioning, channel selection, pricing, messaging hierarchy and launch sequencing. For new products, new markets and pivots.",
    deliverables: ["ICP definition", "Positioning framework", "Channel strategy", "Launch sequencing", "90-day execution roadmap"],
  },
  {
    id: "digital-audit",
    anchor: "digital-audit",
    title: "Digital Audit",
    desc: "A complete audit of your digital presence — paid ads, organic search, website conversion, social, email and automation. We identify exactly what is working, what is wasting budget and what to fix first.",
    deliverables: ["Ads audit (Meta + Google)", "SEO technical audit", "CRO audit", "Email & automation review", "Prioritised action report"],
  },
  {
    id: "growth-strategy",
    anchor: "growth-strategy",
    title: "Growth Strategy",
    desc: "A 6–12 month growth roadmap built around your business model, unit economics and market. We identify your highest-leverage growth levers and build the plan to execute them in the right order.",
    deliverables: ["Unit economics review", "Channel prioritisation", "Growth model", "Experiment roadmap", "OKRs & KPIs"],
  },
  {
    id: "ongoing-advisory",
    anchor: "ongoing-advisory",
    title: "Ongoing Advisory",
    desc: "Monthly or weekly advisory retainer. A senior growth strategist in your corner — reviewing performance, course-correcting campaigns, preparing for fundraising and helping you make better decisions faster.",
    deliverables: ["Weekly / monthly calls", "Performance review", "Decision support", "Fundraising prep", "Team mentoring"],
  },
];

const faqs = [
  {
    q: "Who is growth consulting for?",
    a: "Founders and marketing teams at D2C brands, funded startups (Seed–Series B) and scaling service businesses. Typically companies with ₹1Cr–₹50Cr ARR that have tried execution but aren't sure what to do next.",
  },
  {
    q: "What is the difference between a digital audit and a growth strategy?",
    a: "A digital audit looks backwards — it diagnoses what is broken today. A growth strategy looks forwards — it defines the playbook to scale. Most clients benefit from an audit first, then a strategy built on what the audit reveals.",
  },
  {
    q: "How quickly can we start?",
    a: "A digital audit can begin within 48 hours of engagement. A full GTM strategy or growth roadmap typically takes 2–3 weeks to deliver.",
  },
  {
    q: "Do you only consult, or do you also execute?",
    a: "Both. Growth consulting gives you the strategy and plan. If you want us to execute — run the ads, build the pages, automate the workflows — we bring in the relevant Sarvopaya team. One partner, full execution.",
  },
];

export default function GrowthConsultingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroIv = useInView(heroRef, { once: true, amount: 0.3 });
  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesIv = useInView(servicesRef, { once: true, amount: 0.2 });
  const faqRef = useRef<HTMLDivElement>(null);
  const faqIv = useInView(faqRef, { once: true, amount: 0.2 });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Growth Consulting",
        serviceType: "Growth Consulting",
        provider: { "@type": "Organization", name: "Sarvopaya", url: "https://sarvopaya.com" },
        description: "Go-to-market strategy, digital audits, growth roadmaps and ongoing advisory for D2C brands and funded startups.",
        url: "https://sarvopaya.com/services/growth-consulting",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://sarvopaya.com" },
          { "@type": "ListItem", position: 2, name: "Services", item: "https://sarvopaya.com/services" },
          { "@type": "ListItem", position: 3, name: "Growth Consulting", item: "https://sarvopaya.com/services/growth-consulting" },
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
        <span aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 select-none font-black uppercase leading-none text-black/[0.03]"
          style={{ fontSize: "clamp(100px,18vw,260px)" }}>
          GTM
        </span>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={heroIv ? "show" : "hidden"}>
            <motion.div variants={up}><SectionLabel>Growth Consulting</SectionLabel></motion.div>
            <motion.h1 variants={up}
              className="font-heading text-5xl font-black leading-[1.05] tracking-tight text-black sm:text-6xl lg:text-7xl">
              Strategy That Ships.
              <br />
              <span className="text-[var(--accent)]">Results That Scale.</span>
            </motion.h1>
            <motion.p variants={up} className="mt-6 max-w-2xl text-lg leading-relaxed text-black/55 sm:text-xl">
              Go-to-market strategy, digital audits, growth roadmaps and ongoing advisory for D2C
              brands, funded startups and scaling businesses that need clarity on what to do next.
            </motion.p>
            <motion.div variants={up} className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact"
                className="inline-flex h-13 items-center gap-2 rounded-full bg-black px-8 text-sm font-bold text-white transition-colors duration-300 hover:bg-[var(--accent)]">
                Book a Strategy Call <span aria-hidden="true">→</span>
              </Link>
              <Link href="/work"
                className="inline-flex h-13 items-center gap-2 rounded-full border border-black/15 px-8 text-sm font-bold text-black transition-colors duration-300 hover:border-black/30">
                See Our Work
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="bg-white py-24 sm:py-32" ref={servicesRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={servicesIv ? "show" : "hidden"} className="mb-16">
            <motion.div variants={up}><SectionLabel>What We Offer</SectionLabel></motion.div>
            <motion.h2 variants={up} className="font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl">
              Four Ways We Help
              <br /><span className="text-black/30">You Grow.</span>
            </motion.h2>
          </motion.div>
          <div className="space-y-8">
            {services.map((svc, i) => (
              <motion.div key={svc.id} id={svc.anchor}
                initial={{ opacity: 0, y: 20 }} animate={servicesIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
                className="grid grid-cols-1 gap-8 rounded-3xl border border-black/8 bg-white p-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <div className="mb-1 h-1 w-10 rounded-full bg-[var(--accent)]" />
                  <h3 className="mt-5 font-heading text-2xl font-bold text-black">{svc.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-black/55">{svc.desc}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-black/30">Deliverables</p>
                  <ul className="mt-4 space-y-2">
                    {svc.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm text-black/60">
                        <span className="mt-0.5 shrink-0 text-[var(--accent)]">→</span>{d}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-black/[0.02] py-24 sm:py-32" ref={faqRef}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={faqIv ? "show" : "hidden"} className="mb-16 text-center">
            <motion.div variants={up}><SectionLabel>FAQ</SectionLabel></motion.div>
            <motion.h2 variants={up} className="font-heading text-4xl font-black text-black sm:text-5xl">Common Questions</motion.h2>
          </motion.div>
          <div className="divide-y divide-black/8 border-y border-black/8">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={faqIv ? { opacity: 1 } : {}} transition={{ delay: i * 0.07 }}>
                <button type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left">
                  <span className="font-heading text-base font-bold text-black sm:text-lg">{faq.q}</span>
                  <span className="shrink-0 text-lg font-light text-black/30 transition-transform duration-300"
                    style={{ transform: openFaq === i ? "rotate(45deg)" : "none" }}>+</span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }} className="overflow-hidden">
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
          <SectionLabel>Get Started</SectionLabel>
          <h2 className="mt-4 font-heading text-4xl font-black text-white sm:text-5xl">Ready to Build the Plan?</h2>
          <p className="mt-5 text-base leading-relaxed text-white/50">
            Book a free 30-minute strategy call. We will diagnose your biggest growth challenge and
            tell you the most direct path forward.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/contact"
              className="inline-flex h-13 items-center gap-2 rounded-full bg-[var(--accent)] px-10 text-sm font-bold text-white transition-opacity hover:opacity-90">
              Book Free Strategy Call →
            </Link>
            <Link href="/services/ai-automation"
              className="inline-flex h-13 items-center gap-2 rounded-full border border-white/15 px-10 text-sm font-bold text-white transition-colors hover:border-white/30">
              Explore AI Automation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
