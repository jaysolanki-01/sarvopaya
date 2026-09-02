"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;
const up = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const seq = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };

const offerings = [
  { id: "gtm", title: "Go-to-Market Strategie", desc: "Wir entwickeln Ihren GTM-Plan: Zielmarkt-Definition, Positioning, Channel-Mix, Messaging und Launch-Roadmap — ready to execute." },
  { id: "digital-audit", title: "Digitaler Audit", desc: "360°-Analyse Ihres gesamten digitalen Auftritts: Website, SEO, Ads, Social, CRM, Tracking — mit priorisierten Handlungsempfehlungen." },
  { id: "growth-strategy", title: "Wachstumsstrategie", desc: "Datenbasierte Wachstumsplanung: Welche Hebel haben die größte Wirkung? Wo ist das ungenutzter Potenzial? Wo wird Budget verschwendet?" },
  { id: "ongoing-advisory", title: "Laufende Beratung", desc: "Als strategischer Partner begleiten wir Sie kontinuierlich: monatliche Reviews, Entscheidungsunterstützung und Zugang zu unserem Experten-Netzwerk." },
];

const faqs = [
  { q: "Für welche Unternehmensphase ist Wachstumsberatung geeignet?", a: "Unser Beratungsangebot ist für Unternehmen in jeder Phase relevant — ob Startup in der Frühphase, Scale-up mit erstem Produkt-Markt-Fit oder etabliertes Unternehmen, das stagniert. Wir passen den Ansatz an Ihre spezifische Situation an." },
  { q: "Was ist ein digitaler Audit?", a: "Ein digitaler Audit ist eine systematische Analyse aller digitalen Touchpoints Ihres Unternehmens: Website-Performance, SEO-Status, Ad-Kampagnen, Social-Media-Präsenz, Tracking-Setup, CRM-Nutzung und Conversion-Flows. Das Ergebnis ist ein priorisierter Maßnahmenplan." },
  { q: "Wie läuft eine Go-to-Market-Beratung ab?", a: "In 4–8 Wochen erarbeiten wir gemeinsam Ihren GTM-Plan: Markt- und Wettbewerbsanalyse, Zielgruppen-Definition, Positioning, Channel-Strategie und Launch-Planung — mit klaren Verantwortlichkeiten und Meilensteinen." },
  { q: "Bieten Sie auch laufende strategische Begleitung an?", a: "Ja. Im Rahmen unseres Ongoing-Advisory-Modells fungieren wir als externer Wachstumspartner — monatliche Sessions, Entscheidungsbegleitung, Review der Marketing-Performance und Zugang zu unserem Netzwerk." },
];

export default function DeGrowthConsultingPage() {
  const offRef = useRef<HTMLDivElement>(null);
  const offIv = useInView(offRef, { once: true, amount: 0.2 });
  const faqRef = useRef<HTMLDivElement>(null);
  const faqIv = useInView(faqRef, { once: true, amount: 0.2 });

  return (
    <>
      <section className="overflow-hidden bg-white pb-24 pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate="show">
            <motion.p variants={up} className="mb-4 text-[11px] font-bold uppercase tracking-widest text-black/40">Wachstumsberatung</motion.p>
            <motion.h1 variants={up} className="text-5xl font-black leading-tight tracking-tight text-black sm:text-6xl lg:text-7xl">
              Strategie, die<br />
              <span className="text-black/25">umgesetzt wird.</span>
            </motion.h1>
            <motion.p variants={up} className="mt-6 max-w-2xl text-lg leading-relaxed text-black/55">
              Wachstumsberatung ohne Buzzwords. Wir erarbeiten gemeinsam mit Ihnen eine Strategie, die auf Ihren Markt passt — und setzen sie um.
            </motion.p>
            <motion.div variants={up} className="mt-10">
              <Link href="/de/contact"
                className="inline-flex h-14 items-center gap-2 rounded-full bg-black px-8 text-sm font-bold text-white transition-colors hover:bg-red-600">
                Beratung anfragen →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-black/[0.02] py-24 sm:py-32" ref={offRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={offIv ? "show" : "hidden"} className="mb-16">
            <motion.p variants={up} className="mb-3 text-[11px] font-bold uppercase tracking-widest text-black/40">Leistungsangebot</motion.p>
            <motion.h2 variants={up} className="text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl">
              Vier Bereiche.<br /><span className="text-black/25">Ein Partner.</span>
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {offerings.map((o, i) => (
              <motion.div key={o.id} initial={{ opacity: 0, y: 20 }} animate={offIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }} className="rounded-3xl border border-black/8 bg-white p-8">
                <div className="mb-4 h-1 w-8 rounded-full bg-red-500" />
                <h3 className="text-xl font-bold text-black">{o.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-black/55">{o.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32" ref={faqRef}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <motion.div variants={seq} initial="hidden" animate={faqIv ? "show" : "hidden"} className="mb-16 text-center">
            <motion.h2 variants={up} className="text-4xl font-black text-black sm:text-5xl">Häufige Fragen</motion.h2>
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
          <h2 className="text-4xl font-black text-white">Strategisch wachsen?</h2>
          <p className="mt-5 text-base text-white/50">Starten Sie mit einem kostenlosen Erstgespräch — kein Pitch, nur ehrliche Einschätzung.</p>
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
