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

const services = [
  {
    id: "n8n",
    title: "n8n Workflow Automation",
    desc: "Custom n8n automation workflows that connect your CRM, email, ads platforms, databases and internal tools. We design, build and maintain n8n automation so your team never touches the same task twice.",
    tags: ["n8n", "Webhooks", "APIs", "CRM", "Email", "Slack"],
  },
  {
    id: "marketing-automation",
    title: "Marketing Automation",
    desc: "Automate your full marketing operation — lead capture, nurturing sequences, retargeting triggers, ad reporting and campaign alerts. Built on n8n, Make, or custom stacks depending on your tech.",
    tags: ["Lead nurturing", "Ad automation", "Retargeting", "Reporting"],
  },
  {
    id: "ai-workflows",
    title: "AI Workflow Automation",
    desc: "Integrate LLMs (GPT-4, Claude, Gemini) into your business workflows — AI content generation, automated support triage, AI-assisted lead scoring and intelligent document processing.",
    tags: ["GPT-4", "Claude", "Gemini", "LLM", "Vector DB", "RAG"],
  },
  {
    id: "ops-automation",
    title: "Business Process Automation",
    desc: "Eliminate manual data entry, repetitive reporting and inter-tool copy-paste. We map your operations and build automation systems that run without human intervention.",
    tags: ["Process mapping", "Data sync", "Auto-reporting", "Zapier migration"],
  },
  {
    id: "support-automation",
    title: "AI Support Automation",
    desc: "Train an AI support agent on your knowledge base, product docs and past tickets. Resolve 60–80% of inbound support volume automatically. Hand off complex cases to humans with full context.",
    tags: ["AI chatbot", "Helpdesk", "Intercom", "Zendesk", "Knowledge base"],
  },
  {
    id: "crm-automation",
    title: "CRM & Sales Automation",
    desc: "Auto-enrich leads, score prospects, trigger follow-ups and sync deal data across tools. Build sales automation that keeps your CRM clean and your team focused on closing.",
    tags: ["HubSpot", "Pipedrive", "Lead scoring", "Follow-up", "Enrichment"],
  },
];

const tools = [
  "n8n", "Make (Integromat)", "Zapier", "GPT-4", "Claude", "Gemini",
  "LangChain", "Pinecone", "HubSpot", "Airtable", "Notion", "Slack",
  "Google Sheets", "Webhooks", "REST APIs", "PostgreSQL",
];

const faqs = [
  {
    q: "What is an AI automation agency?",
    a: "An AI automation agency designs and builds AI-powered workflow systems that replace manual, repetitive business tasks. Sarvopaya uses tools like n8n, Make, and LLM APIs (GPT-4, Claude) to automate marketing, operations, sales and support processes for businesses worldwide.",
  },
  {
    q: "What is n8n and why do you use it?",
    a: "n8n is an open-source workflow automation tool that connects APIs, apps and databases without code. We use n8n because it offers full customisation, can be self-hosted for data privacy, and handles complex multi-step workflows that Zapier or Make cannot. It is the backbone of our automation stack.",
  },
  {
    q: "How long does it take to build an automation workflow?",
    a: "Simple automations (lead capture to CRM sync, email triggers) take 3–7 days. Complex multi-system workflows with AI integrations typically take 2–4 weeks. We start with a workflow audit to map your processes before building anything.",
  },
  {
    q: "Can you automate my existing tools without replacing them?",
    a: "Yes — we build automation on top of your existing stack. Whether you use HubSpot, Salesforce, Pipedrive, Intercom, Zendesk, Shopify, or custom tools, we connect them with n8n or the appropriate automation layer without requiring tool replacement.",
  },
  {
    q: "Do you serve clients outside India?",
    a: "Yes. Sarvopaya is based in India and serves clients in the USA, UK, UAE, Saudi Arabia, Australia, Canada and Singapore. Working remotely, async, and on Indian time zones means cost-effective automation at enterprise quality.",
  },
  {
    q: "What is the difference between AI automation and traditional automation?",
    a: "Traditional automation follows fixed rules (if X then Y). AI automation uses language models and machine learning to handle unstructured inputs — reading emails, classifying tickets, generating content, scoring leads — tasks that previously required human judgement.",
  },
];

const process = [
  { step: "01", title: "Workflow Audit", desc: "We map your current processes, identify automation opportunities and calculate time/cost savings before writing a line of code." },
  { step: "02", title: "Architecture Design", desc: "We design the automation system — tools, data flows, triggers, error handling and escalation paths. You approve before we build." },
  { step: "03", title: "Build & Test", desc: "We build the workflows in n8n or your chosen platform, test every edge case and run parallel with existing processes." },
  { step: "04", title: "Deploy & Monitor", desc: "We deploy to production, monitor for errors, and handle edge cases that appear in real-world usage for 30 days." },
  { step: "05", title: "Handover & Docs", desc: "You receive full documentation, workflow diagrams and a recorded walkthrough. Ongoing maintenance available." },
];

const stats = [
  { value: "70%", label: "of support tickets resolved without human input" },
  { value: "4×", label: "faster lead follow-up with AI-triggered sequences" },
  { value: "12h", label: "average time saved per team member per week" },
  { value: "30d", label: "typical payback period on automation investment" },
];

export default function AIAutomationPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroIv = useInView(heroRef, { once: true, amount: 0.3 });
  const statsRef = useRef<HTMLDivElement>(null);
  const statsIv = useInView(statsRef, { once: true, amount: 0.3 });
  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesIv = useInView(servicesRef, { once: true, amount: 0.2 });
  const toolsRef = useRef<HTMLDivElement>(null);
  const toolsIv = useInView(toolsRef, { once: true, amount: 0.3 });
  const processRef = useRef<HTMLDivElement>(null);
  const processIv = useInView(processRef, { once: true, amount: 0.2 });
  const faqRef = useRef<HTMLDivElement>(null);
  const faqIv = useInView(faqRef, { once: true, amount: 0.2 });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "AI Automation Agency",
        serviceType: "AI Automation",
        provider: {
          "@type": "Organization",
          name: "Sarvopaya",
          url: "https://sarvopaya.com",
        },
        areaServed: ["IN", "US", "GB", "AE", "SA", "AU", "CA", "SG", "DE"],
        description:
          "AI-powered workflow automation using n8n, Make and LLM integrations for businesses worldwide. Marketing automation, business process automation, support automation and CRM automation.",
        url: "https://sarvopaya.com/services/ai-automation",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://sarvopaya.com" },
          { "@type": "ListItem", position: 2, name: "Services", item: "https://sarvopaya.com/services" },
          { "@type": "ListItem", position: 3, name: "AI Automation", item: "https://sarvopaya.com/services/ai-automation" },
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

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white pb-24 pt-32" ref={heroRef}>
        {/* ghost watermark */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 select-none font-black uppercase leading-none text-black/[0.03]"
          style={{ fontSize: "clamp(120px,20vw,280px)" }}
        >
          AI
        </span>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={heroIv ? "show" : "hidden"}>
            <motion.div variants={up}>
              <SectionLabel>AI Automation Agency</SectionLabel>
            </motion.div>
            <motion.h1
              variants={up}
              className="font-heading text-5xl font-black leading-[1.05] tracking-tight text-black sm:text-6xl lg:text-7xl"
            >
              AI Automation Built{" "}
              <span className="text-[var(--accent)]">Around Your Business.</span>
            </motion.h1>
            <motion.p
              variants={up}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-black/55 sm:text-xl"
            >
              Sarvopaya is an AI automation agency. We design and deploy custom n8n workflows, LLM
              integrations and business automation systems that eliminate manual work, accelerate
              follow-up and give your team back hours every week.
            </motion.p>
            <motion.div variants={up} className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex h-13 items-center gap-2 rounded-full bg-black px-8 text-sm font-bold text-white transition-colors duration-300 hover:bg-[var(--accent)]"
              >
                Book a Free Automation Audit
                <span aria-hidden="true">→</span>
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

      {/* ── STATS ── */}
      <section className="bg-black py-16" ref={statsRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={statsIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
                className="bg-black px-8 py-10 text-center"
              >
                <p className="font-heading text-4xl font-black text-[var(--accent)] sm:text-5xl">
                  {s.value}
                </p>
                <p className="mt-2 text-sm leading-snug text-white/50">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="bg-white py-24 sm:py-32" ref={servicesRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={seq}
            initial="hidden"
            animate={servicesIv ? "show" : "hidden"}
            className="mb-16"
          >
            <motion.div variants={up}>
              <SectionLabel>What We Build</SectionLabel>
            </motion.div>
            <motion.h2
              variants={up}
              className="font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              Automation for Every Part
              <br />
              <span className="text-black/30">of Your Business.</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((svc, i) => (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={servicesIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
                className="group rounded-3xl border border-black/8 bg-white p-8 transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="mb-1 h-1 w-10 rounded-full bg-[var(--accent)]" />
                <h3 className="mt-5 font-heading text-xl font-bold text-black">{svc.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-black/55">{svc.desc}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {svc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-black/8 bg-black/[0.03] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOOLS ── */}
      <section className="bg-black/[0.02] py-20" ref={toolsRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={seq}
            initial="hidden"
            animate={toolsIv ? "show" : "hidden"}
            className="mb-12 text-center"
          >
            <motion.div variants={up}>
              <SectionLabel>Tech Stack</SectionLabel>
            </motion.div>
            <motion.h2
              variants={up}
              className="font-heading text-3xl font-black text-black sm:text-4xl"
            >
              Tools We Work With
            </motion.h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3">
            {tools.map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={toolsIv ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.04, duration: 0.4, ease: EASE }}
                className="rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-sm"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="bg-white py-24 sm:py-32" ref={processRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={seq}
            initial="hidden"
            animate={processIv ? "show" : "hidden"}
            className="mb-16"
          >
            <motion.div variants={up}>
              <SectionLabel>Our Process</SectionLabel>
            </motion.div>
            <motion.h2
              variants={up}
              className="font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              From Audit to Automation.
            </motion.h2>
          </motion.div>

          <div className="space-y-0 divide-y divide-black/8 border-y border-black/8">
            {process.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, x: -16 }}
                animate={processIv ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
                className="flex items-start gap-8 py-8"
              >
                <span className="w-10 shrink-0 font-heading text-sm font-black text-black/20">
                  {p.step}
                </span>
                <div className="flex-1">
                  <p className="font-heading text-lg font-bold text-black">{p.title}</p>
                  <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-black/55">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY SARVOPAYA ── */}
      <section className="bg-black py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionLabel>Why Sarvopaya</SectionLabel>
              <h2 className="mt-4 font-heading text-4xl font-black leading-tight text-white sm:text-5xl">
                India-Based.{" "}
                <span className="text-white/30">Globally Capable.</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-white/50">
                As an AI automation agency based in India, we deliver enterprise-quality automation
                at competitive rates. Our team has built automation systems for D2C brands,
                funded startups, SaaS companies and B2B service businesses in India, the USA, UK,
                UAE, Australia, Canada and Singapore.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "n8n specialists with 50+ live workflows deployed",
                  "LLM integrations across GPT-4, Claude and Gemini",
                  "Full ownership — you own all workflows, credentials and code",
                  "Month-on-month retainers, no lock-in contracts",
                  "30-day monitoring included with every deployment",
                ].map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-sm text-white/60">
                    <span className="mt-0.5 shrink-0 text-[var(--accent)]">→</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10">
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/30">
                Markets We Serve
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {["India", "USA", "United Kingdom", "UAE / Dubai", "Saudi Arabia", "Australia", "Canada", "Singapore"].map(
                  (country) => (
                    <div
                      key={country}
                      className="rounded-xl border border-white/8 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white/70"
                    >
                      {country}
                    </div>
                  )
                )}
              </div>
              <div className="mt-8 border-t border-white/10 pt-8">
                <Link
                  href="/contact"
                  className="block rounded-full bg-[var(--accent)] py-4 text-center text-sm font-bold text-white transition-opacity hover:opacity-90"
                >
                  Book a Free Automation Audit →
                </Link>
                <p className="mt-3 text-center text-xs text-white/30">30 minutes · Free · No commitment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            <motion.h2
              variants={up}
              className="font-heading text-4xl font-black text-black sm:text-5xl"
            >
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
                  <span className="font-heading text-base font-bold text-black sm:text-lg">
                    {faq.q}
                  </span>
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
      <section className="bg-black/[0.02] py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <SectionLabel>Get Started</SectionLabel>
          <h2 className="mt-4 font-heading text-4xl font-black text-black sm:text-5xl">
            Ready to Automate?
          </h2>
          <p className="mt-5 text-base leading-relaxed text-black/55">
            Book a free 30-minute automation audit. We will map your biggest manual workflows and
            show you exactly what can be automated and what it will save you.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex h-13 items-center gap-2 rounded-full bg-black px-10 text-sm font-bold text-white transition-colors duration-300 hover:bg-[var(--accent)]"
            >
              Book Free Audit →
            </Link>
            <Link
              href="/work"
              className="inline-flex h-13 items-center gap-2 rounded-full border border-black/15 px-10 text-sm font-bold text-black transition-colors duration-300 hover:border-black/30"
            >
              See Case Studies
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
