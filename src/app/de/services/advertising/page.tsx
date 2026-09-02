"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;
const up = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const seq = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };

const platforms = [
  { name: "Meta Ads", desc: "Facebook & Instagram — Awareness, Retargeting und Conversion-Kampagnen mit kreativen Formaten." },
  { name: "Google Ads", desc: "Search, Shopping, Performance Max und YouTube — Zielgenaue Kampagnen für jeden Funnel-Schritt." },
  { name: "LinkedIn Ads", desc: "B2B-Demand-Generation mit präzisem Berufstitel- und Unternehmens-Targeting." },
  { name: "YouTube Ads", desc: "Video-Werbung, die informiert und konvertiert — von TrueView bis Bumper Ads." },
  { name: "TikTok Ads", desc: "Native Video-Kampagnen für junge Zielgruppen mit hohem Engagement-Potenzial." },
  { name: "Pinterest & Snapchat", desc: "Visuelle Plattformen für Lifestyle-, Einrichtungs- und Modebrands." },
];

const services = [
  { title: "Kampagnenstrategie & Setup", desc: "Wir definieren die richtige Kampagnenstruktur, Zielgruppen und Budgetverteilung von Anfang an." },
  { title: "Creative Production", desc: "Ad-Creatives, die stoppen, informieren und konvertieren — Text, Bild, Video und Motion-Design." },
  { title: "Audience Research & Targeting", desc: "Präzises Targeting basierend auf Demografie, Verhalten, Lookalikes und Custom Audiences." },
  { title: "Conversion Tracking & Attribution", desc: "Vollständige Attribution-Setups: Pixel, CAPI, Google Tag Manager — wir tracken jeden Umsatz-Euro." },
  { title: "Testing & Optimierung", desc: "Systematische A/B-Tests von Creatives, Audiences und Landing Pages zur kontinuierlichen Verbesserung." },
  { title: "Retargeting & Remarketing", desc: "Mehrstufige Retargeting-Sequenzen, die Besucher abholen, bevor sie zur Konkurrenz gehen." },
];

const faqs = [
  { q: "Welche Werbekanäle sind für mein Unternehmen die richtigen?", a: "Das hängt von Ihrem Produkt, Ihrer Zielgruppe und Ihren Zielen ab. In einem kostenlosen Erstgespräch analysieren wir Ihren Markt und empfehlen die Kanäle mit dem besten ROI-Potenzial für Ihre Situation." },
  { q: "Wie schnell sehen wir erste Ergebnisse?", a: "Erste Datenpunkte sehen wir nach 7–14 Tagen. Stabile, optimierbare Ergebnisse sind nach 30–60 Tagen zu erwarten, je nach Kanal und Budget." },
  { q: "Was ist inbegriffen — nur die Schaltung oder auch die Creatives?", a: "Wir übernehmen beides: Strategie, Targeting und Optimierung sowie die Produktion aller Ad-Creatives. Sie müssen sich um nichts kümmern." },
  { q: "Welches Mindestbudget brauche ich?", a: "Wir empfehlen ein Media-Mindestbudget von ca. 50.000–1.00.000 INR/Monat, um statistisch signifikante Daten zu erhalten. Für globale Märkte passen wir die Empfehlung entsprechend an." },
  { q: "Wie messen Sie Erfolg?", a: "Wir definieren gemeinsam mit Ihnen die relevanten KPIs — ROAS, CPA, CPL, MQL-Rate — und tracken diese transparent in Ihrem Dashboard. Keine Vanity-Metriken." },
];

export default function DeAdvertisingPage() {
  const platformsRef = useRef<HTMLDivElement>(null);
  const platformsIv = useInView(platformsRef, { once: true, amount: 0.2 });
  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesIv = useInView(servicesRef, { once: true, amount: 0.2 });
  const faqRef = useRef<HTMLDivElement>(null);
  const faqIv = useInView(faqRef, { once: true, amount: 0.2 });

  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden bg-black min-h-[80vh] flex items-center">
        <div className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate="show">
            <motion.p variants={up} className="mb-6 text-[11px] font-bold uppercase tracking-[0.25em] text-red-500">Werbung & Performance Advertising</motion.p>
            <motion.h1 variants={up} className="font-black uppercase text-white leading-[0.88] tracking-tight"
              style={{ fontSize: "clamp(48px,9vw,120px)" }}>
              MEHR<br />ALS NUR<br />
              <span className="text-red-500">KLICKS.</span>
            </motion.h1>
            <motion.p variants={up} className="mt-7 max-w-xl text-lg leading-relaxed text-white/50">
              Wir bauen Ihr gesamtes Werbe-Ökosystem — von der Strategie über die Creatives bis zur Conversion-Optimierung. Plattformübergreifend, datengetrieben, skalierbar.
            </motion.p>
            <motion.div variants={up} className="mt-10 flex flex-wrap gap-4">
              <Link href="/de/contact"
                className="inline-flex h-14 items-center gap-2 rounded-full bg-red-600 px-8 text-sm font-bold text-white transition-colors hover:bg-red-700">
                Kampagne starten →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Platforms */}
      <section className="bg-black/[0.02] py-24 sm:py-32" ref={platformsRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={platformsIv ? "show" : "hidden"} className="mb-16">
            <motion.p variants={up} className="mb-3 text-[11px] font-bold uppercase tracking-widest text-black/40">Plattformen</motion.p>
            <motion.h2 variants={up} className="text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl">
              Ihr Publikum ist überall.<br />
              <span className="text-black/25">Wir auch.</span>
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {platforms.map((p, i) => (
              <motion.div key={p.name}
                initial={{ opacity: 0, y: 20 }} animate={platformsIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08 }}
                className="rounded-3xl border border-black/8 bg-white p-8">
                <div className="mb-4 h-1 w-8 rounded-full bg-red-500" />
                <h3 className="text-base font-bold text-black">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/55">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white py-24 sm:py-32" ref={servicesRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={servicesIv ? "show" : "hidden"} className="mb-16">
            <motion.p variants={up} className="mb-3 text-[11px] font-bold uppercase tracking-widest text-black/40">Was wir liefern</motion.p>
            <motion.h2 variants={up} className="text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl">
              Vollständig gemanagt.<br />
              <span className="text-black/25">Von A bis Z.</span>
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-px border-l border-t border-black/8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <motion.div key={s.title}
                initial={{ opacity: 0 }} animate={servicesIv ? { opacity: 1 } : {}}
                transition={{ delay: i * 0.08 }}
                className="border-b border-r border-black/8 bg-white p-8">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-red-500">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="text-base font-bold text-black">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/50">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-black/[0.02] py-24 sm:py-32" ref={faqRef}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <motion.div variants={seq} initial="hidden" animate={faqIv ? "show" : "hidden"} className="mb-16 text-center">
            <motion.p variants={up} className="mb-3 text-[11px] font-bold uppercase tracking-widest text-black/40">FAQ</motion.p>
            <motion.h2 variants={up} className="text-4xl font-black text-black sm:text-5xl">Häufige Fragen</motion.h2>
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
          <h2 className="text-4xl font-black text-white sm:text-5xl">Bereit, Ihr Werbebudget zu maximieren?</h2>
          <p className="mt-5 text-base text-white/50">Buchen Sie eine kostenlose Analyse Ihrer aktuellen Kampagnen — oder starten Sie von Null mit einem System, das funktioniert.</p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/de/contact"
              className="inline-flex h-14 items-center gap-2 rounded-full bg-red-600 px-10 text-sm font-bold text-white transition-opacity hover:opacity-90">
              Jetzt starten →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
