"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;
const up = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const seq = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };

const systemSteps = [
  { id: "01", title: "Entdecken", desc: "Technisches Audit, Keyword-Recherche und Wettbewerbs-Analyse — wir verstehen Ihre Ausgangslage vollständig." },
  { id: "02", title: "Aufbauen", desc: "On-Page-Optimierung, technische Korrekturen, Site-Struktur und interne Verlinkung." },
  { id: "03", title: "Antworten", desc: "Content-Strategie und -Produktion, die Suchabsichten trifft und Google-Vertrauen aufbaut." },
  { id: "04", title: "Etablieren", desc: "Link-Building und digitale PR für Authority und Domain-Stärke." },
  { id: "05", title: "Optimieren", desc: "Kontinuierliche Tests, Aktualisierungen und Verbesserungen auf Basis von Rankings und Traffic-Daten." },
  { id: "06", title: "Messen", desc: "Vollständiges Reporting: Rankings, Traffic, Conversions und Umsatz-Beitrag." },
];

const techItems = [
  "Core Web Vitals", "Crawl-Budget", "Indexierungsprobleme", "Schema Markup",
  "Hreflang & i18n SEO", "Mobile-First", "Canonical Tags", "Redirect-Management", "Seitengeschwindigkeit",
];

const faqs = [
  { q: "Wie lange dauert es, bis SEO Ergebnisse zeigt?", a: "SEO ist eine Investition mit Zinseszinseffekt. Erste sichtbare Verbesserungen sehen wir typischerweise nach 60–90 Tagen. Signifikante Traffic- und Umsatzzuwächse entstehen über 6–12 Monate bei konsistenter Arbeit." },
  { q: "Was unterscheidet Ihren SEO-Ansatz von anderen Agenturen?", a: "Wir bauen SEO-Systeme, nicht Taktik-Listen. Jede Maßnahme ist Teil einer kohärenten Strategie, die auf Ihren Markt, Ihre Zielgruppe und Ihre Geschäftsziele abgestimmt ist." },
  { q: "Übernehmen Sie auch die Content-Produktion?", a: "Ja. Unser Team produziert recherchierten, suchmaschinenoptimierten Content — Blogartikel, Landingpages, Vergleichsseiten — der rankt und konvertiert." },
  { q: "Können Sie für internationale SEO helfen?", a: "Ja. Wir haben Erfahrung mit internationalem SEO, Hreflang-Setups und mehrsprachigen Websites — ideal für Marken, die global wachsen wollen." },
  { q: "Wie berichten Sie über Ergebnisse?", a: "Sie erhalten monatliche Berichte mit Rankings, Traffic, Conversions und dem geschätzten organischen Umsatz-Beitrag. Transparenz ist unser Standard." },
  { q: "Was ist technisches SEO und brauche ich das?", a: "Technisches SEO stellt sicher, dass Google Ihre Website vollständig crawlen, indexieren und verstehen kann. Ohne starke technische Basis limitieren alle anderen SEO-Maßnahmen ihren Effekt. Fast jede Website, die wir auditieren, hat korrigierbare technische Baustellen." },
];

export default function DeSeoPage() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const stepsIv = useInView(stepsRef, { once: true, amount: 0.2 });
  const techRef = useRef<HTMLDivElement>(null);
  const techIv = useInView(techRef, { once: true, amount: 0.3 });
  const faqRef = useRef<HTMLDivElement>(null);
  const faqIv = useInView(faqRef, { once: true, amount: 0.2 });

  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden bg-white pb-24 pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate="show">
            <motion.p variants={up} className="mb-4 text-[11px] font-bold uppercase tracking-widest text-black/40">Suchmaschinenoptimierung</motion.p>
            <motion.h1 variants={up} className="text-5xl font-black leading-tight tracking-tight text-black sm:text-6xl lg:text-7xl">
              Sichtbarkeit,<br />
              <span className="text-black/25">die bleibt.</span>
            </motion.h1>
            <motion.p variants={up} className="mt-6 max-w-2xl text-lg leading-relaxed text-black/55">
              SEO, das nicht nur rankt, sondern konvertiert. Wir bauen organische Sichtbarkeit, die qualifizierte Leads liefert — systematisch, nachhaltig und ohne Black-Hat-Taktiken.
            </motion.p>
            <motion.div variants={up} className="mt-10 flex flex-wrap gap-4">
              <Link href="/de/contact"
                className="inline-flex h-14 items-center gap-2 rounded-full bg-black px-8 text-sm font-bold text-white transition-colors hover:bg-red-600">
                SEO-Audit anfragen →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* System Steps */}
      <section className="bg-black/[0.02] py-24 sm:py-32" ref={stepsRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={stepsIv ? "show" : "hidden"} className="mb-16">
            <motion.p variants={up} className="mb-3 text-[11px] font-bold uppercase tracking-widest text-black/40">Unser System</motion.p>
            <motion.h2 variants={up} className="text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl">
              Sechs Schritte.<br />
              <span className="text-black/25">Ein Wachstumssystem.</span>
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {systemSteps.map((step, i) => (
              <motion.div key={step.id}
                initial={{ opacity: 0, y: 20 }} animate={stepsIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="rounded-3xl border border-black/8 bg-white p-8">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-red-500">{step.id}</p>
                <h3 className="text-xl font-bold text-black">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-black/55">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical SEO */}
      <section className="bg-white py-24" ref={techRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={techIv ? "show" : "hidden"} className="mb-10">
            <motion.p variants={up} className="mb-3 text-[11px] font-bold uppercase tracking-widest text-black/40">Technisches SEO</motion.p>
            <motion.h2 variants={up} className="text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl">
              Starke technische<br />
              <span className="text-black/25">Basis. Immer.</span>
            </motion.h2>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={techIv ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-3">
            {techItems.map(item => (
              <span key={item} className="rounded-full border border-black/10 bg-black/[0.03] px-5 py-2.5 text-sm font-semibold text-black/60">
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-black/[0.02] py-24 sm:py-32" ref={faqRef}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <motion.div variants={seq} initial="hidden" animate={faqIv ? "show" : "hidden"} className="mb-16 text-center">
            <motion.p variants={up} className="mb-3 text-[11px] font-bold uppercase tracking-widest text-black/40">FAQ</motion.p>
            <motion.h2 variants={up} className="text-4xl font-black text-black sm:text-5xl">Häufige SEO-Fragen</motion.h2>
          </motion.div>
          <div className="divide-y divide-black/8 border-y border-black/8">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={faqIv ? { opacity: 1 } : {}} transition={{ delay: i * 0.07 }}
                className="py-6">
                <p className="text-base font-bold text-black">{faq.q}</p>
                <p className="mt-3 text-sm leading-relaxed text-black/55">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-4xl font-black text-white sm:text-5xl">Organisch wachsen?</h2>
          <p className="mt-5 text-base text-white/50">Starten Sie mit einem kostenlosen SEO-Audit — wir zeigen Ihnen, was fehlt und was möglich ist.</p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/de/contact"
              className="inline-flex h-14 items-center gap-2 rounded-full bg-red-600 px-10 text-sm font-bold text-white transition-opacity hover:opacity-90">
              Kostenloses SEO-Audit →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
