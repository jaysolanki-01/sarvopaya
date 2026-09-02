"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;
const up = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const seq = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };

const markets = [
  { flag: "🇺🇸", country: "USA", region: "Nordamerika", desc: "Performance Marketing, SEO und KI-Automatisierung für Unternehmen in den Vereinigten Staaten.", href: "/de/locations/usa", priority: true },
  { flag: "🇬🇧", country: "Vereinigtes Königreich", region: "Europa", desc: "Digitales Wachstum und KI-Strategien für britische Marken und Unternehmen.", href: "/de/locations/uk", priority: true },
  { flag: "🇦🇪", country: "Vereinigte Arabische Emirate", region: "Naher Osten", desc: "Marketing und KI-Automatisierung für Unternehmen in Dubai und den Emiraten.", href: "/de/locations/uae", priority: true },
  { flag: "🇸🇦", country: "Saudi-Arabien", region: "Naher Osten", desc: "Wachstumsstrategien für saudische Unternehmen — lokalisiert und kulturell abgestimmt.", href: "/de/locations/saudi-arabia", priority: true },
  { flag: "🇦🇺", country: "Australien", region: "Asien-Pazifik", desc: "Performance-Marketing und SEO für australische Marken mit internationalen Ambitionen.", href: "/de/locations/australia", priority: false },
  { flag: "🇨🇦", country: "Kanada", region: "Nordamerika", desc: "Digitales Wachstum für kanadische Unternehmen — B2C, B2B und Export.", href: "/de/locations/canada", priority: false },
  { flag: "🇸🇬", country: "Singapur", region: "Asien-Pazifik", desc: "Marketing und KI-Strategien für Unternehmen im asiatisch-pazifischen Wachstumsmarkt.", href: "/de/locations/singapore", priority: false },
];

export default function DeLocationsPage() {
  const marketsRef = useRef<HTMLDivElement>(null);
  const marketsIv = useInView(marketsRef, { once: true, amount: 0.1 });

  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden bg-white pb-24 pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate="show">
            <motion.p variants={up} className="mb-4 text-[11px] font-bold uppercase tracking-widest text-black/40">Standorte</motion.p>
            <motion.h1 variants={up} className="text-5xl font-black leading-tight tracking-tight text-black sm:text-6xl lg:text-7xl">
              Global aufgestellt.<br />
              <span className="text-black/25">Lokal gedacht.</span>
            </motion.h1>
            <motion.p variants={up} className="mt-6 max-w-2xl text-lg leading-relaxed text-black/55">
              Von Indien aus betreuen wir Unternehmen in 7 internationalen Märkten — mit Strategien, die auf die Realität jedes Marktes zugeschnitten sind.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Markets grid */}
      <section className="bg-black/[0.02] py-24 sm:py-32" ref={marketsRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {markets.map((m, i) => (
              <motion.div key={m.country}
                initial={{ opacity: 0, y: 20 }} animate={marketsIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5, ease: EASE }}>
                <Link href={m.href}
                  className="group flex h-full flex-col rounded-3xl border border-black/8 bg-white p-8 transition-all duration-300 hover:border-black/20 hover:shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-3xl" aria-hidden>{m.flag}</span>
                    <span className="rounded-full border border-black/10 bg-black/[0.04] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black/50">
                      {m.region}
                    </span>
                    {m.priority && (
                      <span className="rounded-full bg-red-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-red-500">P1</span>
                    )}
                  </div>
                  <h2 className="text-xl font-black text-black">{m.country}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-black/55">{m.desc}</p>
                  <p className="mt-5 flex items-center gap-1.5 text-xs font-bold text-black/35 transition-colors group-hover:text-red-500">
                    Mehr erfahren →
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-4xl font-black text-white">Ihr Markt ist dabei?</h2>
          <p className="mt-5 text-base text-white/50">Sprechen Sie mit uns über Ihre internationale Wachstumsstrategie.</p>
          <div className="mt-10 flex justify-center">
            <Link href="/de/contact"
              className="inline-flex h-14 items-center gap-2 rounded-full bg-red-600 px-10 text-sm font-bold text-white transition-opacity hover:opacity-90">
              Gespräch buchen →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
