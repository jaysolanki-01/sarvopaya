"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;
const up = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const seq = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };

const industries = [
  { title: "Küchen- und Haushaltsgeräte", desc: "Mehr Sichtbarkeit und direkter Verkauf für Marken in einem hart umkämpften Markt — D2C, E-Commerce und Exportstrategien." },
  { title: "Teppiche & Heimtextilien", desc: "Performance-Marketing und Designkampagnen, die Handwerkskunst mit digitalen Kanälen verbinden." },
  { title: "Schmuck & Luxusgüter", desc: "Premium-Positionierung, Social-Commerce und internationale Reichweite für Schmuckmarken." },
];

const useCases = [
  { type: "D2C", title: "Direkt an den Endkunden", body: "Wir helfen D2C-Marken dabei, ihre Customer Acquisition Costs zu senken und den Lifetime Value zu steigern — durch Creative Strategy, Performance Ads und Retention-Marketing." },
  { type: "B2B", title: "Unternehmen als Kunden gewinnen", body: "Lead-Generation-Systeme, LinkedIn-Strategien und Content-Funnels, die B2B-Entscheider ansprechen und in qualifizierte Leads verwandeln." },
  { type: "EXPORT", title: "International skalieren", body: "Von Indien in die Welt: Wir unterstützen Exporteure bei digitaler Sichtbarkeit, internationalem SEO und zielmarktgerechtem Marketing." },
];

const sectors = [
  "Küchen- & Haushaltsgeräte", "Teppiche & Heimtextilien", "Schmuck & Luxusgüter",
  "Bildung & EdTech", "B2B-Technologie", "SaaS & Software", "E-Commerce", "Gesundheit & Wellness",
  "Bauen & Immobilien", "Food & Beverage", "Fashion & Lifestyle", "Professional Services",
];

export default function DeIndustriesPage() {
  const indRef = useRef<HTMLDivElement>(null);
  const indIv = useInView(indRef, { once: true, amount: 0.2 });
  const ucRef = useRef<HTMLDivElement>(null);
  const ucIv = useInView(ucRef, { once: true, amount: 0.2 });
  const secRef = useRef<HTMLDivElement>(null);
  const secIv = useInView(secRef, { once: true, amount: 0.3 });

  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden bg-white pb-24 pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate="show">
            <motion.p variants={up} className="mb-4 text-[11px] font-bold uppercase tracking-widest text-black/40">Branchen</motion.p>
            <motion.h1 variants={up} className="text-5xl font-black leading-tight tracking-tight text-black sm:text-6xl lg:text-7xl">
              Wir kennen<br />
              <span className="text-black/25">Ihre Branche.</span>
            </motion.h1>
            <motion.p variants={up} className="mt-6 max-w-2xl text-lg leading-relaxed text-black/55">
              Sarvopaya bringt branchenspezifisches Wissen mit — kein Einheitsbrei, sondern Strategien, die auf die Realität Ihres Marktes zugeschnitten sind.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Industries */}
      <section className="bg-black/[0.02] py-24 sm:py-32" ref={indRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={indIv ? "show" : "hidden"} className="mb-16">
            <motion.p variants={up} className="mb-3 text-[11px] font-bold uppercase tracking-widest text-black/40">Schwerpunkte</motion.p>
            <motion.h2 variants={up} className="text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl">
              Besondere Expertise<br />
              <span className="text-black/25">in diesen Bereichen.</span>
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {industries.map((ind, i) => (
              <motion.div key={ind.title}
                initial={{ opacity: 0, y: 20 }} animate={indIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.6, ease: EASE }}
                className="rounded-3xl border border-black/8 bg-white p-8">
                <div className="mb-5 h-1 w-10 rounded-full bg-red-500" />
                <h3 className="text-xl font-bold text-black">{ind.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-black/55">{ind.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-white py-24 sm:py-32" ref={ucRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={ucIv ? "show" : "hidden"} className="mb-16">
            <motion.p variants={up} className="mb-3 text-[11px] font-bold uppercase tracking-widest text-black/40">Anwendungsfälle</motion.p>
            <motion.h2 variants={up} className="text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl">
              Für welches Modell<br />
              <span className="text-black/25">arbeiten Sie?</span>
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {useCases.map((uc, i) => (
              <motion.div key={uc.type}
                initial={{ opacity: 0, y: 20 }} animate={ucIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="rounded-3xl border border-black/8 bg-black p-8 text-white">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-red-400">{uc.type}</p>
                <h3 className="text-xl font-bold">{uc.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{uc.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Sectors */}
      <section className="bg-black/[0.02] py-24" ref={secRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={secIv ? "show" : "hidden"}>
            <motion.p variants={up} className="mb-3 text-[11px] font-bold uppercase tracking-widest text-black/40">Alle Sektoren</motion.p>
            <motion.h2 variants={up} className="mb-10 text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl">
              Weitere Branchen,<br />
              <span className="text-black/25">die wir bedienen.</span>
            </motion.h2>
            <motion.div variants={up} className="flex flex-wrap gap-3">
              {sectors.map(s => (
                <span key={s} className="rounded-full border border-black/10 bg-black/[0.03] px-5 py-2.5 text-sm font-semibold text-black/60">
                  {s}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-4xl font-black text-white">Ihre Branche ist dabei?</h2>
          <p className="mt-5 text-base text-white/50">Sprechen Sie mit uns — wir finden gemeinsam die richtige Wachstumsstrategie.</p>
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
