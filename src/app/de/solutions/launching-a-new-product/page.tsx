"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;
const up = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const seq = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };

const gtmPhases = [
  { phase: "01", title: "Markt & Wettbewerb", desc: "Zielmarktanalyse, Wettbewerbs-Mapping und ICP-Definition — wer sind Ihre idealen ersten Kunden?" },
  { phase: "02", title: "Positioning & Messaging", desc: "Klare Positionierung, Alleinstellungsmerkmale und ein Messaging-Framework, das resoniert." },
  { phase: "03", title: "Launch-Kampagne", desc: "Multi-Channel-Launch: Ads, PR, Content, E-Mail, Social — koordiniert und auf Traktion ausgerichtet." },
  { phase: "04", title: "Traction & Iteration", desc: "Schnelle Lernzyklen nach dem Launch: Was funktioniert? Was skalieren wir? Was verändern wir?" },
];

export default function DeLaunchingProductPage() {
  return (
    <>
      <section className="overflow-hidden bg-white pb-24 pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate="show">
            <motion.p variants={up} className="mb-4 text-[11px] font-bold uppercase tracking-widest text-black/40">Lösung: Produkt-Launch</motion.p>
            <motion.h1 variants={up} className="text-5xl font-black leading-tight tracking-tight text-black sm:text-6xl lg:text-7xl">
              Zum Markt gehen.<br />
              <span className="text-black/25">Mit einem Plan.</span>
            </motion.h1>
            <motion.p variants={up} className="mt-6 max-w-2xl text-lg leading-relaxed text-black/55">
              Ein neues Produkt zu launchen ist eine der risikoreichsten und lohnendsten Phasen eines Unternehmens. Wir bauen Ihren GTM-Plan und setzen ihn mit Ihnen um — für einen Launch, der Traktion erzeugt.
            </motion.p>
            <motion.div variants={up} className="mt-10">
              <Link href="/de/contact"
                className="inline-flex h-14 items-center gap-2 rounded-full bg-black px-8 text-sm font-bold text-white transition-colors hover:bg-red-600">
                GTM-Beratung anfragen →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-black/[0.02] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-black/40">Launch-Phasen</p>
            <h2 className="text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl">
              Vier Phasen zum<br /><span className="text-black/25">erfolgreichen Launch.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {gtmPhases.map((p, i) => (
              <motion.div key={p.phase} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
                className="rounded-3xl border border-black/8 bg-white p-8">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-red-500">Phase {p.phase}</p>
                <h3 className="text-xl font-bold text-black">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-black/55">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-24">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-4xl font-black text-white">Produkt-Launch planen?</h2>
          <p className="mt-5 text-base text-white/50">Buchen Sie ein kostenloses Erstgespräch — wir analysieren Ihr Produkt und skizzieren gemeinsam den optimalen GTM-Ansatz.</p>
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
