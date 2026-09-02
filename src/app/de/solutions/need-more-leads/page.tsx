"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;
const up = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const seq = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };

const channels = [
  { title: "SEO & Content", desc: "Organische Sichtbarkeit, die kontinuierlich qualifizierte Besucher anzieht — ohne laufende Anzeigenkosten." },
  { title: "Performance Ads", desc: "Bezahlte Kampagnen auf Google, Meta und LinkedIn, die genau die Zielgruppe ansprechen, die kaufbereit ist." },
  { title: "KI Lead Intelligence", desc: "Identifizierung von Hochabsichts-Besuchern, die Ihre Website bereits besuchen — bevor sie verschwinden." },
  { title: "Conversion-Optimierung", desc: "Landing Pages und Funnels, die Besucher in qualifizierte Leads verwandeln." },
];

export default function DeNeedMoreLeadsSolutionPage() {
  return (
    <>
      <section className="overflow-hidden bg-white pb-24 pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate="show">
            <motion.p variants={up} className="mb-4 text-[11px] font-bold uppercase tracking-widest text-black/40">Lösung: Mehr Leads</motion.p>
            <motion.h1 variants={up} className="text-5xl font-black leading-tight tracking-tight text-black sm:text-6xl lg:text-7xl">
              Konsistenter Strom<br />
              <span className="text-black/25">qualifizierter Leads.</span>
            </motion.h1>
            <motion.p variants={up} className="mt-6 max-w-2xl text-lg leading-relaxed text-black/55">
              Kein Raten. Kein Gießkannenprinzip. Wir bauen ein Lead-Generierungs-System, das die richtigen Interessenten anzieht, qualifiziert und konvertiert — systematisch und skalierbar.
            </motion.p>
            <motion.div variants={up} className="mt-10 flex flex-wrap gap-4">
              <Link href="/de/contact"
                className="inline-flex h-14 items-center gap-2 rounded-full bg-black px-8 text-sm font-bold text-white transition-colors hover:bg-red-600">
                Strategie anfragen →
              </Link>
              <Link href="/de/need-more-leads"
                className="inline-flex h-14 items-center gap-2 rounded-full border border-black/15 px-8 text-sm font-bold text-black/60 transition-colors hover:border-black/30">
                KI Lead Intelligence ansehen
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-black/[0.02] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-black/40">Unsere Kanäle</p>
            <h2 className="text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl">
              Leads aus allen<br /><span className="text-black/25">relevanten Quellen.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {channels.map((c, i) => (
              <motion.div key={c.title}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
                className="rounded-3xl border border-black/8 bg-white p-8">
                <div className="mb-4 h-1 w-8 rounded-full bg-red-500" />
                <h3 className="text-xl font-bold text-black">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-black/55">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-24">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-4xl font-black text-white">Mehr qualifizierte Leads?</h2>
          <p className="mt-5 text-base text-white/50">Starten Sie mit einem kostenlosen Erstgespräch — wir analysieren Ihre aktuelle Situation und zeigen konkret, was möglich ist.</p>
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
