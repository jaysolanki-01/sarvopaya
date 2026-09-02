"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;
const up = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const seq = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };

const projects = [
  {
    title: "Teleprompter-App",
    category: "performance-marketing",
    cat_label: "Performance Marketing",
    result: "+340% MoM Umsatz",
    desc: "Vollständige Performance-Marketing-Strategie für eine B2C-SaaS-App — von der User Acquisition bis zur Retention-Optimierung.",
    tags: ["Meta Ads", "Google Ads", "App-Marketing"],
  },
  {
    title: "Studienvisum-Beratung",
    category: "seo",
    cat_label: "SEO",
    result: "Von Seite 8 auf Seite 1",
    desc: "Technisches SEO, lokale Optimierung und Content-Strategie für eine Bildungsberatung mit internationalem Fokus.",
    tags: ["Technisches SEO", "Lokales SEO", "Content"],
  },
  {
    title: "Ayurvedische Marke",
    category: "performance-marketing",
    cat_label: "Performance Marketing",
    result: "3,2× ROAS in 90 Tagen",
    desc: "Kreative Kampagnenentwicklung und Performance-Marketing für eine D2C-Ayurveda-Brand in Indien und im Export.",
    tags: ["D2C Marketing", "Meta Ads", "Creative Strategy"],
  },
  {
    title: "Video-Conferencing SaaS",
    category: "performance-marketing",
    cat_label: "Performance Marketing",
    result: "+180% qualifizierte Trials",
    desc: "B2B-Demand-Generation für eine Video-Conferencing-Lösung — LinkedIn-Ads, Content-Funnel und Retargeting.",
    tags: ["LinkedIn Ads", "B2B Marketing", "SaaS"],
  },
  {
    title: "White-Label SaaS",
    category: "seo",
    cat_label: "SEO",
    result: "210% organisches Traffic-Wachstum",
    desc: "SEO- und Content-Strategie für eine White-Label-SaaS-Plattform mit globalem Marktfokus.",
    tags: ["Enterprise SEO", "Content Marketing"],
  },
  {
    title: "B2B Tech Brand",
    category: "performance-marketing",
    cat_label: "Performance Marketing",
    result: "CAC um 45% gesenkt",
    desc: "Full-Funnel-Marketing-Strategie mit AI-gestützter Lead-Qualifizierung für eine B2B-Technologiemarke.",
    tags: ["B2B", "KI-Marketing", "Lead Generation"],
  },
];

const filters = [
  { label: "Alle", value: "all" },
  { label: "Performance Marketing", value: "performance-marketing" },
  { label: "SEO", value: "seo" },
];

export default function DeWorkPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const gridIv = useInView(gridRef, { once: true, amount: 0.1 });

  const filtered = activeFilter === "all" ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden bg-white pb-16 pt-32" ref={heroRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate="show">
            <motion.p variants={up} className="mb-4 text-[11px] font-bold uppercase tracking-widest text-black/40">Unsere Arbeit</motion.p>
            <motion.h1 variants={up} className="text-5xl font-black leading-tight tracking-tight text-black sm:text-6xl">
              Ergebnisse, die<br />
              <span className="text-black/25">für sich sprechen.</span>
            </motion.h1>
            <motion.p variants={up} className="mt-6 max-w-xl text-lg leading-relaxed text-black/55">
              Ausgewählte Projekte aus Performance Marketing, SEO und digitaler Transformation — mit messbaren Ergebnissen für Marken weltweit.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="bg-white pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {filters.map(f => (
              <button key={f.value} type="button" onClick={() => setActiveFilter(f.value)}
                className={`rounded-full border px-5 py-2 text-sm font-bold transition-all ${
                  activeFilter === f.value
                    ? "border-black bg-black text-white"
                    : "border-black/15 text-black/60 hover:border-black/30"
                }`}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-black/[0.02] py-12 sm:py-16" ref={gridRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div key={activeFilter}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p, i) => (
                <motion.article key={p.title}
                  initial={{ opacity: 0, y: 20 }} animate={gridIv ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: EASE }}
                  className="rounded-3xl border border-black/8 bg-white p-8">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-red-500">{p.cat_label}</p>
                  <h2 className="text-xl font-black text-black">{p.title}</h2>
                  <p className="mt-1 text-sm font-bold text-black/40">{p.result}</p>
                  <p className="mt-3 text-sm leading-relaxed text-black/55">{p.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map(tag => (
                      <span key={tag} className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-[10px] font-bold text-black/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-4xl font-black text-white">Soll Ihr Projekt das nächste sein?</h2>
          <p className="mt-5 text-base text-white/50">Sprechen Sie mit uns über Ihre Wachstumsziele.</p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/de/contact"
              className="inline-flex h-14 items-center gap-2 rounded-full bg-red-600 px-10 text-sm font-bold text-white transition-opacity hover:opacity-90">
              Jetzt Gespräch buchen →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
