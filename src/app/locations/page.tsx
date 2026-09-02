"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;
const up = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const seq = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-4 inline-block rounded-full border border-black/10 bg-black/[0.04] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-black/50">
      {children}
    </span>
  );
}

const markets = [
  { flag: "🇺🇸", country: "USA", region: "North America", slug: "usa", desc: "AI automation, performance marketing and SEO for US D2C brands, SaaS companies and B2B businesses.", priority: true },
  { flag: "🇬🇧", country: "United Kingdom", region: "Europe", slug: "uk", desc: "GDPR-compliant automation, digital marketing and SEO for UK businesses — without London agency rates.", priority: true },
  { flag: "🇦🇪", country: "UAE", region: "Middle East", slug: "uae", desc: "Performance marketing, AI automation and bilingual English–Arabic digital strategy for Gulf businesses.", priority: true },
  { flag: "🇸🇦", country: "Saudi Arabia", region: "Middle East", slug: "saudi-arabia", desc: "Snapchat Ads, Arabic content, Vision 2030 digital growth and performance marketing for KSA businesses.", priority: true },
  { flag: "🇦🇺", country: "Australia", region: "Asia Pacific", slug: "australia", desc: "D2C e-commerce marketing, AI workflow automation and SEO for Australian businesses.", priority: false },
  { flag: "🇨🇦", country: "Canada", region: "North America", slug: "canada", desc: "SaaS growth, D2C marketing and bilingual English–French digital strategy for Canadian businesses.", priority: false },
  { flag: "🇸🇬", country: "Singapore", region: "Southeast Asia", slug: "singapore", desc: "Fintech marketing, ASEAN digital strategy and AI automation for Singapore and Southeast Asia.", priority: false },
];

export default function LocationsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroIv = useInView(heroRef, { once: true, amount: 0.3 });
  const gridRef = useRef<HTMLDivElement>(null);
  const gridIv = useInView(gridRef, { once: true, amount: 0.1 });

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white pb-24 pt-32" ref={heroRef}>
        <span aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 select-none font-black uppercase leading-none text-black/[0.025]"
          style={{ fontSize: "clamp(80px,14vw,200px)" }}>
          GLOBAL
        </span>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={heroIv ? "show" : "hidden"}>
            <motion.div variants={up}><SectionLabel>International Markets</SectionLabel></motion.div>
            <motion.h1 variants={up}
              className="font-heading text-5xl font-black leading-[1.05] tracking-tight text-black sm:text-6xl lg:text-7xl">
              Based in India.
              <br /><span className="text-[var(--accent)]">Built for the World.</span>
            </motion.h1>
            <motion.p variants={up} className="mt-6 max-w-2xl text-lg leading-relaxed text-black/55 sm:text-xl">
              Sarvopaya delivers AI automation, performance marketing and digital growth to businesses
              across 9 international markets — at India pricing, with full-service execution and
              no communication overhead.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── MARKETS GRID ── */}
      <section className="bg-white pb-32 pt-4" ref={gridRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {markets.map((m, i) => (
              <motion.div key={m.slug}
                initial={{ opacity: 0, y: 20 }} animate={gridIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}>
                <Link href={`/locations/${m.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-black/8 bg-white p-8 transition-shadow duration-300 hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl" aria-hidden="true">{m.flag}</span>
                    {m.priority && (
                      <span className="rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/5 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[var(--accent)]">
                        Key Market
                      </span>
                    )}
                  </div>
                  <div className="mt-5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-black/30">{m.region}</p>
                    <h2 className="mt-1 font-heading text-xl font-bold text-black transition-colors duration-300 group-hover:text-[var(--accent)]">
                      {m.country}
                    </h2>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-black/50">{m.desc}</p>
                  <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-black/30 transition-colors duration-300 group-hover:text-[var(--accent)]">
                    View market page <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <SectionLabel>Work With Us</SectionLabel>
          <h2 className="mt-4 font-heading text-4xl font-black text-white sm:text-5xl">
            Your Market Not Listed?
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/50">
            We work with businesses in markets beyond those listed here. Book a call and
            tell us where you are — we will tell you how we can help.
          </p>
          <Link href="/contact"
            className="mt-10 inline-flex h-13 items-center gap-2 rounded-full bg-[var(--accent)] px-10 text-sm font-bold text-white transition-opacity hover:opacity-90">
            Book a Free Consultation →
          </Link>
        </div>
      </section>
    </>
  );
}
