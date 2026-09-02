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

export interface WhyPoint { title: string; body: string }
export interface FAQ { q: string; a: string }
export interface Stat { value: string; label: string }
export interface ServiceLink { title: string; href: string; desc: string }

export interface CountryPageProps {
  country: string;
  flag: string;
  region: string;
  h1: string;
  intro: string;
  whyUs: WhyPoint[];
  industries: string[];
  stats: Stat[];
  services: ServiceLink[];
  faqs: FAQ[];
  slug: string;
}

const siteUrl = "https://sarvopaya.com";

export default function CountryPage({
  country, flag, region, h1, intro, whyUs, industries, stats, services, faqs, slug,
}: CountryPageProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroIv = useInView(heroRef, { once: true, amount: 0.3 });
  const statsRef = useRef<HTMLDivElement>(null);
  const statsIv = useInView(statsRef, { once: true, amount: 0.5 });
  const whyRef = useRef<HTMLDivElement>(null);
  const whyIv = useInView(whyRef, { once: true, amount: 0.2 });
  const svcsRef = useRef<HTMLDivElement>(null);
  const svcsIv = useInView(svcsRef, { once: true, amount: 0.2 });
  const indRef = useRef<HTMLDivElement>(null);
  const indIv = useInView(indRef, { once: true, amount: 0.3 });
  const faqRef = useRef<HTMLDivElement>(null);
  const faqIv = useInView(faqRef, { once: true, amount: 0.2 });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        name: "Sarvopaya",
        url: siteUrl,
        description: `AI automation and digital marketing agency serving ${country}. ${intro.slice(0, 120)}`,
        areaServed: country,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `Digital Marketing & AI Automation Services — ${country}`,
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, url: `${siteUrl}${s.href}` },
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Locations", item: `${siteUrl}/locations` },
          { "@type": "ListItem", position: 3, name: country, item: `${siteUrl}/locations/${slug}` },
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
          className="pointer-events-none absolute right-0 top-0 select-none font-black uppercase leading-none text-black/[0.025]"
          style={{ fontSize: "clamp(80px,15vw,220px)" }}>
          {country.toUpperCase()}
        </span>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={heroIv ? "show" : "hidden"}>
            <motion.div variants={up} className="mb-4 flex items-center gap-2">
              <span className="text-2xl" aria-hidden="true">{flag}</span>
              <SectionLabel>{region}</SectionLabel>
            </motion.div>
            <motion.h1 variants={up}
              className="font-heading text-5xl font-black leading-[1.05] tracking-tight text-black sm:text-6xl lg:text-7xl">
              {h1.split("|").map((part, i) => (
                <span key={i}>
                  {i > 0 && <><br /><span className="text-[var(--accent)]">{part.trim()}</span></>}
                  {i === 0 && part.trim()}
                </span>
              ))}
            </motion.h1>
            <motion.p variants={up} className="mt-6 max-w-2xl text-lg leading-relaxed text-black/55 sm:text-xl">
              {intro}
            </motion.p>
            <motion.div variants={up} className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact"
                className="inline-flex h-13 items-center gap-2 rounded-full bg-black px-8 text-sm font-bold text-white transition-colors duration-300 hover:bg-[var(--accent)]">
                Book a Free Consultation <span aria-hidden="true">→</span>
              </Link>
              <Link href="/work"
                className="inline-flex h-13 items-center gap-2 rounded-full border border-black/15 px-8 text-sm font-bold text-black transition-colors duration-300 hover:border-black/30">
                See Our Work
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-black py-10" ref={statsRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4 divide-x divide-white/10 sm:gap-0">
            {stats.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 12 }} animate={statsIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.6, ease: EASE }}
                className="flex flex-col items-center px-4 text-center sm:px-8">
                <span className="font-heading text-3xl font-black text-white sm:text-4xl">{s.value}</span>
                <span className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/35">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY SARVOPAYA ── */}
      <section className="bg-white py-24 sm:py-32" ref={whyRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={whyIv ? "show" : "hidden"} className="mb-16">
            <motion.div variants={up}><SectionLabel>Why Sarvopaya</SectionLabel></motion.div>
            <motion.h2 variants={up} className="font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl">
              Why Businesses in {country}
              <br /><span className="text-black/25">Choose Us.</span>
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {whyUs.map((w, i) => (
              <motion.div key={w.title}
                initial={{ opacity: 0, y: 20 }} animate={whyIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
                className="rounded-3xl border border-black/8 bg-white p-8">
                <div className="mb-5 h-1 w-10 rounded-full bg-[var(--accent)]" />
                <h3 className="font-heading text-xl font-bold text-black">{w.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-black/55">{w.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="bg-black/[0.02] py-24 sm:py-32" ref={svcsRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={svcsIv ? "show" : "hidden"} className="mb-16">
            <motion.div variants={up}><SectionLabel>Services for {country}</SectionLabel></motion.div>
            <motion.h2 variants={up} className="font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl">
              What We Do
              <br /><span className="text-black/25">for Your Market.</span>
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-px border-l border-t border-black/8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((svc, i) => (
              <motion.div key={svc.href}
                initial={{ opacity: 0 }} animate={svcsIv ? { opacity: 1 } : {}}
                transition={{ delay: i * 0.08 }}
                className="border-b border-r border-black/8 bg-white p-8 transition-colors duration-300 hover:bg-black/[0.02]">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-heading text-base font-bold text-black">{svc.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/50">{svc.desc}</p>
                <Link href={svc.href}
                  className="mt-5 flex items-center gap-1.5 text-xs font-bold text-black/35 transition-colors hover:text-[var(--accent)]">
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="bg-white py-24" ref={indRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={indIv ? "show" : "hidden"}>
            <motion.div variants={up}><SectionLabel>Industries</SectionLabel></motion.div>
            <motion.h2 variants={up} className="font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl">
              Sectors We Serve
              <br /><span className="text-black/25">in {country}.</span>
            </motion.h2>
            <motion.div variants={up} className="mt-10 flex flex-wrap gap-3">
              {industries.map((ind) => (
                <span key={ind}
                  className="rounded-full border border-black/10 bg-black/[0.03] px-5 py-2.5 text-sm font-semibold text-black/60">
                  {ind}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-black/[0.02] py-24 sm:py-32" ref={faqRef}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={faqIv ? "show" : "hidden"} className="mb-16 text-center">
            <motion.div variants={up}><SectionLabel>FAQ</SectionLabel></motion.div>
            <motion.h2 variants={up} className="font-heading text-4xl font-black text-black sm:text-5xl">
              Questions About {country}
            </motion.h2>
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
          <h2 className="mt-4 font-heading text-4xl font-black text-white sm:text-5xl">
            Ready to Grow in {country}?
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/50">
            Book a free 30-minute consultation. We will look at your current digital presence
            and tell you exactly what will move the needle in the {country} market.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/contact"
              className="inline-flex h-13 items-center gap-2 rounded-full bg-[var(--accent)] px-10 text-sm font-bold text-white transition-opacity hover:opacity-90">
              Book Free Consultation →
            </Link>
            <Link href="/locations"
              className="inline-flex h-13 items-center gap-2 rounded-full border border-white/15 px-10 text-sm font-bold text-white transition-colors hover:border-white/30">
              All Markets
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
