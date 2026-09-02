"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;
const up = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const seq = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };

const levers = [
  { title: "Conversion-Rate-Optimierung", desc: "Mehr aus dem Traffic holen, den Sie bereits haben — durch optimierte Landing Pages, Funnels und Nutzererfahrung." },
  { title: "Retargeting & Remarketing", desc: "Interessenten, die gegangen sind, zurückholen — mit der richtigen Botschaft zum richtigen Zeitpunkt." },
  { title: "Sales-Enablement-Content", desc: "Fallstudien, ROI-Rechner und Vergleichsseiten, die Verkaufsgespräche unterstützen und Einwände entkräften." },
  { title: "E-Mail & Nurturing-Flows", desc: "Automatisierte Sequenzen, die Leads durch den Entscheidungsprozess führen — bis sie bereit sind zu kaufen." },
];

export default function DeNeedMoreSalesPage() {
  return (
    <>
      <section className="overflow-hidden bg-white pb-24 pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate="show">
            <motion.p variants={up} className="mb-4 text-[11px] font-bold uppercase tracking-widest text-black/40">Lösung: Mehr Umsatz</motion.p>
            <motion.h1 variants={up} className="text-5xl font-black leading-tight tracking-tight text-black sm:text-6xl lg:text-7xl">
              Mehr aus Ihrer<br />
              <span className="text-black/25">Pipeline machen.</span>
            </motion.h1>
            <motion.p variants={up} className="mt-6 max-w-2xl text-lg leading-relaxed text-black/55">
              Sie haben Traffic, Sie haben Leads — aber die Conversion-Rate ist zu niedrig. Wir optimieren Ihren gesamten Sales-Funnel, um mehr aus der bestehenden Pipeline zu holen.
            </motion.p>
            <motion.div variants={up} className="mt-10">
              <Link href="/de/contact"
                className="inline-flex h-14 items-center gap-2 rounded-full bg-black px-8 text-sm font-bold text-white transition-colors hover:bg-red-600">
                Funnel-Analyse anfragen →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-black/[0.02] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-black/40">Die Hebel</p>
            <h2 className="text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl">
              Vier Wege zu<br /><span className="text-black/25">mehr Abschlüssen.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {levers.map((l, i) => (
              <motion.div key={l.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
                className="rounded-3xl border border-black/8 bg-white p-8">
                <div className="mb-4 h-1 w-8 rounded-full bg-red-500" />
                <h3 className="text-xl font-bold text-black">{l.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-black/55">{l.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-24">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-4xl font-black text-white">Mehr Abschlüsse ab heute?</h2>
          <p className="mt-5 text-base text-white/50">Buchen Sie ein kostenloses Erstgespräch und erfahren Sie, wo Ihr Funnel Umsatz verliert.</p>
          <div className="mt-10 flex justify-center">
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
