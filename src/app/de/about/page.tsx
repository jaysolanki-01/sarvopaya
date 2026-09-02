"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;
const up = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const seq = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };

const pillars = [
  { title: "Kreativmedien", body: "Storytelling, das konvertiert. Kampagnen, die in Erinnerung bleiben. Wir produzieren Inhalte mit einer Wirkung, die über Klicks hinausgeht." },
  { title: "Technologie", body: "Conversion-optimierte Websites, Funnels und digitale Erlebnisse, die auf Leistung ausgelegt sind — nicht nur auf Ästhetik." },
  { title: "KI & Automatisierung", body: "Von KI-gestützten Lead-Intelligence-Systemen bis zu automatisierten Betriebsabläufen — wir skalieren Ihre Kapazitäten ohne mehr Personal." },
];

const values = [
  { title: "Erst Daten, dann Meinungen", body: "Jede Entscheidung wird durch Daten gestützt. Intuition hilft beim Start, aber Zahlen führen uns ans Ziel." },
  { title: "Ergebnisse, keine Berichte", body: "Wir liefern Wachstum, kein Deck-Theater. Unsere Kunden messen uns am Umsatz, nicht an der Follower-Zahl." },
  { title: "Langfristige Partnerschaften", body: "Wir bauen echte Beziehungen auf — keine einmaligen Projekte. Ihr Erfolg ist unser Referenz." },
  { title: "Transparenz immer", body: "Keine schwarzen Boxen. Sie sehen genau, was wir tun, warum wir es tun und was es bringt." },
  { title: "Kontinuierliche Verbesserung", body: "Wir testen, lernen, iterieren. Was heute funktioniert, wird morgen noch besser." },
  { title: "Globale Perspektive", body: "Von Indien aus denken wir global. Wir bringen internationale Best Practices in jede Kampagne." },
];

const stats = [
  { value: "50+", label: "Marken betreut" },
  { value: "8+", label: "Dienstleistungen" },
  { value: "7", label: "Internationale Märkte" },
  { value: "100%", label: "ROI-fokussiert" },
];

export default function DeAboutPage() {
  const pillarsRef = useRef<HTMLDivElement>(null);
  const pillarsIv = useInView(pillarsRef, { once: true, amount: 0.2 });
  const valuesRef = useRef<HTMLDivElement>(null);
  const valuesIv = useInView(valuesRef, { once: true, amount: 0.2 });
  const statsRef = useRef<HTMLDivElement>(null);
  const statsIv = useInView(statsRef, { once: true, amount: 0.3 });

  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden bg-white pb-24 pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate="show">
            <motion.p variants={up} className="mb-4 text-[11px] font-bold uppercase tracking-widest text-black/40">Über uns</motion.p>
            <motion.h1 variants={up} className="text-5xl font-black leading-tight tracking-tight text-black sm:text-6xl lg:text-7xl">
              Drei Disziplinen.<br />
              <span className="text-black/25">Eine Mission.</span>
            </motion.h1>
            <motion.p variants={up} className="mt-6 max-w-2xl text-lg leading-relaxed text-black/55">
              Sarvopaya ist eine Full-Service-Agentur, die Kreativmedien, Technologie und KI-Automatisierung vereint. Wir helfen Unternehmen weltweit dabei, nachhaltiges Wachstum zu erzielen — messbar, skalierbar und ohne Kompromisse.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-black py-16" ref={statsRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 12 }} animate={statsIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
                className="text-center">
                <p className="text-4xl font-black text-white">{s.value}</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/35">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-black/[0.02] py-24 sm:py-32" ref={pillarsRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={pillarsIv ? "show" : "hidden"} className="mb-16">
            <motion.p variants={up} className="mb-3 text-[11px] font-bold uppercase tracking-widest text-black/40">Was uns definiert</motion.p>
            <motion.h2 variants={up} className="text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl">
              Unsere drei Säulen.
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {pillars.map((p, i) => (
              <motion.div key={p.title}
                initial={{ opacity: 0, y: 20 }} animate={pillarsIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.6, ease: EASE }}
                className="rounded-3xl border border-black/8 bg-white p-8">
                <div className="mb-5 h-1 w-10 rounded-full bg-red-500" />
                <h3 className="text-xl font-bold text-black">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-black/55">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-24 sm:py-32" ref={valuesRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={valuesIv ? "show" : "hidden"} className="mb-16">
            <motion.p variants={up} className="mb-3 text-[11px] font-bold uppercase tracking-widest text-black/40">Unsere Werte</motion.p>
            <motion.h2 variants={up} className="text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl">
              Woran wir glauben.
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <motion.div key={v.title}
                initial={{ opacity: 0, y: 16 }} animate={valuesIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08 }}
                className="border-b border-black/8 py-6 sm:border-b-0 sm:border-l sm:pl-8">
                <h3 className="text-base font-bold text-black">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/55">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-4xl font-black text-white sm:text-5xl">Zusammenarbeiten?</h2>
          <p className="mt-5 text-base leading-relaxed text-white/50">
            Buchen Sie ein unverbindliches Erstgespräch. Wir zeigen Ihnen konkret, wie Sarvopaya Ihrem Unternehmen helfen kann zu wachsen.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/de/contact"
              className="inline-flex h-14 items-center gap-2 rounded-full bg-red-600 px-10 text-sm font-bold text-white transition-opacity hover:opacity-90">
              Jetzt Gespräch buchen →
            </Link>
            <Link href="/de/work"
              className="inline-flex h-14 items-center gap-2 rounded-full border border-white/15 px-10 text-sm font-bold text-white transition-colors hover:border-white/30">
              Unsere Arbeit ansehen
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
