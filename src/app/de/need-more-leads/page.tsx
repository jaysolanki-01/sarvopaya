"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;
const up = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const seq = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };

const GREEN = "#22c55e";
const AI = "#60a5fa";
const RED = "#ed2830";

const layers = [
  { id: "01", title: "ANZIEHEN", sub: "Die richtigen Besucher gewinnen.", tags: ["Google", "Meta", "LinkedIn", "SEO", "Content"], col: AI },
  { id: "02", title: "BEOBACHTEN", sub: "Verstehen, was sie tun.", tags: ["Seiten", "Klicks", "Sessions", "Rückkehren"], col: "rgba(255,255,255,0.5)" },
  { id: "03", title: "INTERPRETIEREN", sub: "KI verbindet die Signale.", tags: ["Verhalten", "Absicht", "ICP", "Kontext"], col: "#f59e0b" },
  { id: "04", title: "VORHERSAGEN", sub: "Chancen finden.", tags: ["Intent-Score", "Kaufphase", "Priorität"], col: GREEN },
  { id: "05", title: "HANDELN", sub: "Sofort das Richtige tun.", tags: ["Sales-Alert", "Retargeting", "WhatsApp", "E-Mail", "CRM"], col: RED },
];

const faqs = [
  { q: "Was versteht man unter KI-gestützter Lead Intelligence?", a: "Sarvopaya AI analysiert das Verhalten von Website-Besuchern in Echtzeit — besuchte Seiten, Verweildauer, Rückkehrbesuche, Content-Konsum — und berechnet einen Intent-Score. Besucher mit hoher Kaufabsicht werden automatisch identifiziert und priorisiert, damit Ihr Vertrieb zur richtigen Zeit agiert." },
  { q: "Wie unterscheidet sich das von herkömmlichem Lead-Scoring?", a: "Herkömmliches Lead-Scoring bewertet meist nur Formular-Einsendungen. Unser System wertet das Verhalten aller Besucher aus — auch die, die noch kein Formular ausgefüllt haben — und liefert so einen um ein Vielfaches größeren Datensatz an Kaufsignalen." },
  { q: "Für welche Unternehmenstypen ist das geeignet?", a: "Das System eignet sich für D2C-Marken, B2B-Unternehmen, Dienstleister und High-Ticket-Anbieter — überall dort, wo Kaufentscheidungen mehrere Touch-Points erfordern und jeder Lead zählt." },
  { q: "Wie schnell sehe ich erste Ergebnisse?", a: "In der Regel identifizieren wir in den ersten 14 Tagen die ersten High-Intent-Besucher. Mit wachsendem Datensatz wird die Präzision des Intent-Scores laufend besser." },
  { q: "Was kostet der Einstieg?", a: "Starten Sie mit einem kostenlosen Erstgespräch. Wir zeigen Ihnen anhand Ihrer eigenen Website-Daten, welche Signale bereits vorliegen und welches Potenzial schlummert." },
];

export default function DeNeedMoreLeadsPage() {
  const layersRef = useRef<HTMLDivElement>(null);
  const layersIv = useInView(layersRef, { once: true, amount: 0.2 });
  const faqRef = useRef<HTMLDivElement>(null);
  const faqIv = useInView(faqRef, { once: true, amount: 0.2 });

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ background: "#050505" }}>
        <div className="absolute inset-0" aria-hidden
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate="show">
            <motion.p variants={up} className="mb-6 text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: AI }}>
              KI-GESTÜTZTE LEAD INTELLIGENCE
            </motion.p>
            <motion.h1 variants={up} className="font-black uppercase text-white leading-[0.88] tracking-tight"
              style={{ fontSize: "clamp(56px,10vw,140px)" }}>
              MEHR<br />LEADS<br />
              <span style={{ color: RED }}>JETZT.</span>
            </motion.h1>
            <motion.p variants={up} className="mt-7 max-w-lg text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
              Starten Sie damit, die Käufer zu finden, die schon auf Ihrer Website sind.
            </motion.p>
            <motion.p variants={up} className="mt-4 max-w-md text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.3)" }}>
              Ihre Website hat heute Besucher mit hoher Kaufabsicht. Sarvopaya AI liest die Verhaltenssignale, identifiziert, wer kurz vor dem Kauf steht, und löst die richtige Aktion aus — bevor diese Besucher verschwinden.
            </motion.p>
            <motion.div variants={up} className="mt-10 flex flex-wrap gap-3">
              <Link href="/de/contact"
                className="inline-flex h-14 items-center gap-2 rounded-full px-8 text-sm font-bold text-white transition-colors"
                style={{ background: RED }}>
                MEINE LEADS FINDEN →
              </Link>
              <Link href="/need-more-leads"
                className="inline-flex h-14 items-center gap-2 rounded-full border border-white/20 px-8 text-sm font-bold text-white/70 transition-colors hover:text-white">
                Englische Version ansehen
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5-Layer Architecture */}
      <section ref={layersRef} className="py-24 sm:py-32" style={{ background: "#050505" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={layersIv ? "show" : "hidden"} className="mb-12">
            <motion.h2 variants={up} className="text-4xl font-bold uppercase text-white sm:text-5xl">
              FÜNF SCHRITTE.<br />
              <span style={{ color: "rgba(255,255,255,0.2)" }}>EIN SYSTEM.</span>
            </motion.h2>
          </motion.div>
          <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            {layers.map((l, i) => (
              <motion.div key={l.id}
                initial={{ opacity: 0 }} animate={layersIv ? { opacity: 1 } : {}}
                transition={{ delay: 0.1 + i * 0.12 }}
                className="flex items-start gap-8 py-7">
                <span className="w-8 shrink-0 text-2xl font-black tabular-nums mt-0.5" style={{ color: `${l.col}30` }}>{l.id}</span>
                <div className="w-36 shrink-0">
                  <p className="text-sm font-black uppercase tracking-tight" style={{ color: l.col }}>{l.title}</p>
                  <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>{l.sub}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {l.tags.map(tag => (
                    <span key={tag} className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                      style={{ background: `${l.col}08`, border: `1px solid ${l.col}18`, color: l.col }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section ref={faqRef} className="py-24 sm:py-32" style={{ background: "#0c0c0c" }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <motion.div variants={seq} initial="hidden" animate={faqIv ? "show" : "hidden"} className="mb-16 text-center">
            <motion.h2 variants={up} className="text-4xl font-black uppercase text-white">FAQ</motion.h2>
          </motion.div>
          <div className="space-y-0 divide-y" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            {faqs.map((faq, i) => (
              <motion.div key={i}
                initial={{ opacity: 0 }} animate={faqIv ? { opacity: 1 } : {}} transition={{ delay: i * 0.08 }}
                className="py-6">
                <p className="font-bold text-white">{faq.q}</p>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24" style={{ background: "#050505" }}>
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="font-black uppercase text-white" style={{ fontSize: "clamp(48px,8vw,96px)", lineHeight: 0.88, color: "#f59e0b" }}>
            UMSATZ<br />IST DAS ZIEL.
          </p>
          <p className="mt-8 text-base text-white/50">Nicht Leads. Nicht Klicks. Nicht Follower. Umsatz.</p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/de/contact"
              className="inline-flex h-14 items-center gap-2 rounded-full px-10 text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: RED }}>
              Jetzt Gespräch starten →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
