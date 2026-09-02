"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;
const up = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const seq = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };

const solutions = [
  { title: "Prozess-Automatisierung", desc: "Wiederkehrende manuelle Prozesse — Onboarding, Reporting, Follow-ups, Dateneingabe — vollständig automatisiert." },
  { title: "Tool-Integration & Datenpipelines", desc: "Nahtlose Verbindung aller Business-Tools: CRM, Marketing-Stack, ERP, Kommunikation — kein Datenchaos mehr." },
  { title: "KI-gestützte Entscheidungsunterstützung", desc: "Dashboards und KI-Modelle, die Ihrem Team helfen, schneller und besser fundierte Entscheidungen zu treffen." },
  { title: "Dokumentation & SOPs", desc: "Klare Prozesse und Standard-Operating-Procedures, die skalierbar sind — unabhängig davon, wer sie ausführt." },
];

export default function DeNeedBetterOpsPage() {
  return (
    <>
      <section className="overflow-hidden bg-white pb-24 pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate="show">
            <motion.p variants={up} className="mb-4 text-[11px] font-bold uppercase tracking-widest text-black/40">Lösung: Bessere Betriebsabläufe</motion.p>
            <motion.h1 variants={up} className="text-5xl font-black leading-tight tracking-tight text-black sm:text-6xl lg:text-7xl">
              Weniger manuell.<br />
              <span className="text-black/25">Mehr Wachstum.</span>
            </motion.h1>
            <motion.p variants={up} className="mt-6 max-w-2xl text-lg leading-relaxed text-black/55">
              Ineffiziente Prozesse bremsen Wachstum. Wir analysieren Ihre Workflows, identifizieren Engpässe und implementieren KI-Automatisierungen, die Ihre Operations effizienter und skalierbarer machen.
            </motion.p>
            <motion.div variants={up} className="mt-10">
              <Link href="/de/contact"
                className="inline-flex h-14 items-center gap-2 rounded-full bg-black px-8 text-sm font-bold text-white transition-colors hover:bg-red-600">
                Ops-Audit anfragen →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-black/[0.02] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-black/40">Lösungsansätze</p>
            <h2 className="text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl">
              Wir optimieren,<br /><span className="text-black/25">wo es zählt.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {solutions.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
                className="rounded-3xl border border-black/8 bg-white p-8">
                <div className="mb-4 h-1 w-8 rounded-full bg-red-500" />
                <h3 className="text-xl font-bold text-black">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-black/55">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-24">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-4xl font-black text-white">Effizienter wachsen?</h2>
          <p className="mt-5 text-base text-white/50">Buchen Sie ein kostenloses Erstgespräch — wir zeigen, wo Ihr größtes Optimierungspotenzial liegt.</p>
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
