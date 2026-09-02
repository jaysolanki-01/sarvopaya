"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;
const up = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const seq = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };

const useCases = [
  { title: "Lead-Nurturing-Automatisierung", desc: "Automatisierte E-Mail- und WhatsApp-Sequenzen, die Leads zur richtigen Zeit mit der richtigen Message ansprechen — ohne manuelle Eingriffe." },
  { title: "CRM & Daten-Integration", desc: "Nahtlose Verbindung zwischen Ihrer Website, Ihrem CRM, Ihren Marketing-Tools und Ihrem Vertriebsteam — alles in Echtzeit synchronisiert." },
  { title: "Reporting-Automatisierung", desc: "Automatisierte Dashboards und Berichte, die Ihr Team täglich mit relevanten Metriken versorgen — keine manuellen Tabellen mehr." },
  { title: "KI-gestützte Lead Intelligence", desc: "Verhaltensbasierte Intent-Scoring-Systeme, die Ihrem Vertrieb mitteilen, wen er wann kontaktieren soll." },
  { title: "Workflow-Automatisierung", desc: "Interne Prozesse — Onboarding, Auftragsabwicklung, Kommunikation — systematisch automatisiert mit n8n, Make und Zapier." },
  { title: "KI-Chatbots & Assistenten", desc: "Intelligente Chatbots für Lead-Qualifizierung, Support und First-Line-Kommunikation — 24/7 verfügbar." },
];

const faqs = [
  { q: "Brauche ich technisches Know-how, um KI-Automatisierung einzusetzen?", a: "Nein. Wir übernehmen die gesamte technische Implementierung — von der Strategie über den Aufbau bis zur Übergabe. Sie bekommen ein funktionierendes System mit klarer Dokumentation." },
  { q: "Welche Tools nutzen Sie für Automatisierungen?", a: "Wir arbeiten mit n8n, Make (Integromat), Zapier, OpenAI-APIs, HubSpot, und proprietären KI-Modellen — je nach Anforderung und Budget." },
  { q: "Wie schnell ist eine Automatisierung implementiert?", a: "Einfache Workflows sind in 1–2 Wochen live. Komplexere Systeme mit CRM-Integration, KI-Logik und Multi-Step-Pipelines brauchen 4–8 Wochen." },
  { q: "Wie viel Budget spare ich durch Automatisierung?", a: "Das hängt von Ihren aktuellen Prozessen ab. In der Praxis sehen wir typischerweise eine Zeitersparnis von 10–40 Stunden/Monat pro automatisiertem Workflow — realisierbar als Kosteneinsparung oder als freigesetzte Kapazität für wachstumsrelevante Aufgaben." },
];

export default function DeAIAutomationPage() {
  const ucRef = useRef<HTMLDivElement>(null);
  const ucIv = useInView(ucRef, { once: true, amount: 0.2 });
  const faqRef = useRef<HTMLDivElement>(null);
  const faqIv = useInView(faqRef, { once: true, amount: 0.2 });

  return (
    <>
      <section className="relative overflow-hidden pb-24 pt-32" style={{ background: "#050505" }}>
        <div className="absolute inset-0" aria-hidden
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate="show">
            <motion.p variants={up} className="mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-blue-400">KI & Automatisierung</motion.p>
            <motion.h1 variants={up} className="font-black uppercase text-white leading-[0.88] tracking-tight"
              style={{ fontSize: "clamp(48px,9vw,120px)" }}>
              SKALIEREN<br />OHNE<br />
              <span className="text-blue-400">MEHR PERSONAL.</span>
            </motion.h1>
            <motion.p variants={up} className="mt-7 max-w-xl text-lg leading-relaxed text-white/50">
              KI-Workflows, automatisiertes Lead-Nurturing und intelligente Betriebssysteme — wir implementieren Automatisierung, die sofort wirkt.
            </motion.p>
            <motion.div variants={up} className="mt-10 flex flex-wrap gap-4">
              <Link href="/de/contact"
                className="inline-flex h-14 items-center gap-2 rounded-full bg-blue-600 px-8 text-sm font-bold text-white transition-colors hover:bg-blue-700">
                KI-Potenzial entdecken →
              </Link>
              <Link href="https://eajjy.com/" target="_blank" rel="noopener noreferrer"
                className="inline-flex h-14 items-center gap-2 rounded-full border border-white/20 px-8 text-sm font-bold text-white/70 transition-colors hover:text-white">
                EAJJY AI Platform →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32" ref={ucRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={ucIv ? "show" : "hidden"} className="mb-16">
            <motion.p variants={up} className="mb-3 text-[11px] font-bold uppercase tracking-widest text-black/40">Was wir automatisieren</motion.p>
            <motion.h2 variants={up} className="text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl">
              Weniger Manuelles.<br /><span className="text-black/25">Mehr Wachstum.</span>
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((uc, i) => (
              <motion.div key={uc.title} initial={{ opacity: 0, y: 20 }} animate={ucIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08 }} className="rounded-3xl border border-black/8 bg-black/[0.02] p-8">
                <div className="mb-4 h-1 w-8 rounded-full bg-blue-500" />
                <h3 className="text-base font-bold text-black">{uc.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/55">{uc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black/[0.02] py-24 sm:py-32" ref={faqRef}>
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

      <section className="py-24" style={{ background: "#050505" }}>
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-4xl font-black text-white">Bereit für KI-Automatisierung?</h2>
          <p className="mt-5 text-base text-white/50">Starten Sie mit einem kostenlosen Automatisierungs-Audit — wir zeigen, welche Prozesse zuerst automatisiert werden sollten.</p>
          <div className="mt-10 flex justify-center">
            <Link href="/de/contact"
              className="inline-flex h-14 items-center gap-2 rounded-full bg-blue-600 px-10 text-sm font-bold text-white transition-opacity hover:opacity-90">
              Audit anfragen →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
