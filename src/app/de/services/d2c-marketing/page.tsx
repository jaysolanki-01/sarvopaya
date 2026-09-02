"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;
const up = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const seq = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };

const funnelStages = [
  { stage: "AWARENESS", title: "Sichtbarkeit aufbauen", desc: "Zielgruppengerechte Awareness-Kampagnen auf Meta, Google und Social — Ihre Marke dort, wo Ihre Kunden sind." },
  { stage: "ACQUISITION", title: "Käufer gewinnen", desc: "Conversion-optimierte Kampagnen, die aus Interessenten zahlende Kunden machen — mit dem richtigen Angebot zur richtigen Zeit." },
  { stage: "RETENTION", title: "Kunden halten", desc: "E-Mail-Flows, Retargeting und Loyalty-Programme, die den Customer Lifetime Value maximieren." },
  { stage: "SCALING", title: "Profitabel skalieren", desc: "Systematische Skalierung durch Audience Expansion, Creative Refreshes und Kanal-Diversifikation." },
];

const faqs = [
  { q: "Was ist D2C Marketing und warum ist es anders?", a: "D2C (Direct-to-Consumer) Marketing bedeutet, direkt an den Endkunden zu verkaufen — ohne Zwischenhändler. Das gibt Ihnen volle Kontrolle über Preis, Erlebnis und Kundendaten. Wir entwickeln Full-Funnel-Strategien, die genau auf dieses Modell zugeschnitten sind." },
  { q: "Wie senken Sie meinen Customer Acquisition Cost (CAC)?", a: "Durch präziseres Targeting, bessere Creatives, optimierte Landing Pages und kontinuierliches A/B-Testing. Wir identifizieren, welche Kanäle und Creatives für Sie den niedrigsten CAC liefern, und skalieren diese systematisch." },
  { q: "Welche Rolle spielt Creative Strategy?", a: "Creatives sind das wichtigste Hebel in D2C-Kampagnen. Wir entwickeln eine Creative-Strategie, die Ihre USPs klar kommuniziert, Ihre Zielgruppe anspricht und auf Conversion ausgelegt ist — und testen kontinuierlich neue Varianten." },
  { q: "Übernehmen Sie auch E-Commerce-Plattform-Arbeit?", a: "Unser Fokus liegt auf Marketing, Strategie und Creatives. Bei Bedarf empfehlen wir vertrauenswürdige Partner für Shopify-Entwicklung oder E-Commerce-Setup." },
  { q: "Wie schnell kann ich mit ersten Ergebnissen rechnen?", a: "Mit einem soliden Startbudget sehen die meisten D2C-Marken erste signifikante Ergebnisse nach 30–60 Tagen. Vollständige Optimierungszyklen brauchen 90 Tage." },
];

export default function DeD2CPage() {
  const funnelRef = useRef<HTMLDivElement>(null);
  const funnelIv = useInView(funnelRef, { once: true, amount: 0.2 });
  const faqRef = useRef<HTMLDivElement>(null);
  const faqIv = useInView(faqRef, { once: true, amount: 0.2 });

  return (
    <>
      <section className="overflow-hidden bg-white pb-24 pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate="show">
            <motion.p variants={up} className="mb-4 text-[11px] font-bold uppercase tracking-widest text-black/40">D2C Marketing</motion.p>
            <motion.h1 variants={up} className="text-5xl font-black leading-tight tracking-tight text-black sm:text-6xl lg:text-7xl">
              Direkt zum Kunden.<br />
              <span className="text-black/25">Ohne Umwege.</span>
            </motion.h1>
            <motion.p variants={up} className="mt-6 max-w-2xl text-lg leading-relaxed text-black/55">
              Full-Funnel D2C Marketing — von der ersten Impression bis zum treuen Wiederholungskäufer. Sarvopaya baut D2C-Wachstum, das profitabel skaliert.
            </motion.p>
            <motion.div variants={up} className="mt-10">
              <Link href="/de/contact"
                className="inline-flex h-14 items-center gap-2 rounded-full bg-black px-8 text-sm font-bold text-white transition-colors hover:bg-red-600">
                D2C-Strategie anfragen →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-black/[0.02] py-24 sm:py-32" ref={funnelRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={funnelIv ? "show" : "hidden"} className="mb-16">
            <motion.p variants={up} className="mb-3 text-[11px] font-bold uppercase tracking-widest text-black/40">Full-Funnel-Ansatz</motion.p>
            <motion.h2 variants={up} className="text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl">
              Vier Stufen.<br />
              <span className="text-black/25">Eine Wachstumsmaschine.</span>
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {funnelStages.map((s, i) => (
              <motion.div key={s.stage} initial={{ opacity: 0, y: 20 }} animate={funnelIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }} className="rounded-3xl border border-black/8 bg-white p-8">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-red-500">{s.stage}</p>
                <h3 className="text-xl font-bold text-black">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-black/55">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32" ref={faqRef}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <motion.div variants={seq} initial="hidden" animate={faqIv ? "show" : "hidden"} className="mb-16 text-center">
            <motion.h2 variants={up} className="text-4xl font-black text-black sm:text-5xl">Häufige Fragen zu D2C</motion.h2>
          </motion.div>
          <div className="divide-y divide-black/8 border-y border-black/8">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={faqIv ? { opacity: 1 } : {}} transition={{ delay: i * 0.07 }} className="py-6">
                <p className="text-base font-bold text-black">{faq.q}</p>
                <p className="mt-3 text-sm leading-relaxed text-black/55">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-24">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-4xl font-black text-white">D2C profitabel skalieren?</h2>
          <p className="mt-5 text-base text-white/50">Sprechen Sie mit uns über Ihre Marke, Ihre Ziele und Ihr aktuelles Setup.</p>
          <div className="mt-10 flex justify-center">
            <Link href="/de/contact"
              className="inline-flex h-14 items-center gap-2 rounded-full bg-red-600 px-10 text-sm font-bold text-white transition-opacity hover:opacity-90">
              Jetzt anfragen →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
