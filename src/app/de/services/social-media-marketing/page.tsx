"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;
const up = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const seq = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };

const channels = [
  { name: "Instagram", desc: "Visual Storytelling, Reels, Stories und Shopping-Integration für D2C- und Lifestyle-Marken." },
  { name: "LinkedIn", desc: "Thought-Leadership-Content, Unternehmensseite und organische Reichweite für B2B-Unternehmen." },
  { name: "Facebook", desc: "Community-Building, Event-Marketing und breite Awareness-Kampagnen." },
  { name: "YouTube", desc: "Langform-Content, Tutorials und Brand-Dokumentationen für tiefes Engagement." },
  { name: "X / Twitter", desc: "Echtzeit-Kommunikation, Branchenkonversationen und Thought Leadership." },
  { name: "Pinterest", desc: "Entdeckungsgetriebener Traffic für Einrichtung, Mode, Food und Lifestyle." },
];

const deliverables = [
  { title: "Content-Strategie", desc: "Monatliche Content-Pläne abgestimmt auf Ihre Ziele, Ihre Audience und den Plattform-Algorithmus." },
  { title: "Content-Produktion", desc: "Kreative Inhalte — Text, Design, Reels, Carousel und Story-Formate — vollständig von uns produziert." },
  { title: "Community Management", desc: "Kommentare, DMs und Erwähnungen zeitnah und markenstimmig beantwortet." },
  { title: "Influencer & Creator", desc: "Identifikation und Koordination von Micro- und Macro-Influencern für authentische Reichweite." },
  { title: "Analytics & Reporting", desc: "Monatliche Auswertungen: Reichweite, Engagement, Follower-Qualität und Umsatz-Attribution." },
  { title: "Paid Social Integration", desc: "Nahtlose Verbindung von organischem Content mit bezahlten Kampagnen für maximale Wirkung." },
];

const faqs = [
  { q: "Wie viele Posts pro Monat sind inbegriffen?", a: "Je nach Paket und Plattform planen wir typischerweise 12–20 Posts pro Monat — mit einem Mix aus Feed-Posts, Stories und Reels. Wir passen das an Ihre Ziele und Ihre Audience an." },
  { q: "Erstellen Sie auch Video-Content?", a: "Ja. Wir produzieren Reels, Short-Videos und Story-Sequenzen. Für aufwändigere Produktionen arbeiten wir mit Ihrem Team oder unserem Creator-Netzwerk zusammen." },
  { q: "Wie messen Sie Erfolg im Social Media?", a: "Wir fokussieren auf Metriken, die Geschäftsrelevanz haben: Reichweite, Engagement Rate, Link-Klicks, Leads und, wo möglich, direkte Umsatz-Attribution. Follower-Zahlen allein sind kein Erfolgskriterium." },
  { q: "Können Sie Social Media für mehrere Märkte/Sprachen verwalten?", a: "Ja. Wir haben Erfahrung mit mehrsprachigem Social-Media-Management und können auf verschiedene Märkte zugeschnittene Inhalte produzieren." },
];

export default function DeSocialMediaPage() {
  const channelsRef = useRef<HTMLDivElement>(null);
  const channelsIv = useInView(channelsRef, { once: true, amount: 0.2 });
  const delivRef = useRef<HTMLDivElement>(null);
  const delivIv = useInView(delivRef, { once: true, amount: 0.2 });
  const faqRef = useRef<HTMLDivElement>(null);
  const faqIv = useInView(faqRef, { once: true, amount: 0.2 });

  return (
    <>
      <section className="overflow-hidden bg-white pb-24 pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate="show">
            <motion.p variants={up} className="mb-4 text-[11px] font-bold uppercase tracking-widest text-black/40">Social-Media-Marketing</motion.p>
            <motion.h1 variants={up} className="text-5xl font-black leading-tight tracking-tight text-black sm:text-6xl lg:text-7xl">
              Follower zu<br />
              <span className="text-black/25">Kunden machen.</span>
            </motion.h1>
            <motion.p variants={up} className="mt-6 max-w-2xl text-lg leading-relaxed text-black/55">
              Strategisches Social-Media-Marketing, das Ihre Marke aufbaut, Ihre Community wachsen lässt und messbaren Umsatz generiert — nicht nur Likes.
            </motion.p>
            <motion.div variants={up} className="mt-10">
              <Link href="/de/contact"
                className="inline-flex h-14 items-center gap-2 rounded-full bg-black px-8 text-sm font-bold text-white transition-colors hover:bg-red-600">
                Social-Strategie anfragen →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-black/[0.02] py-24 sm:py-32" ref={channelsRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={channelsIv ? "show" : "hidden"} className="mb-16">
            <motion.p variants={up} className="mb-3 text-[11px] font-bold uppercase tracking-widest text-black/40">Kanäle</motion.p>
            <motion.h2 variants={up} className="text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl">
              Wo Ihre Zielgruppe<br /><span className="text-black/25">ist, sind wir.</span>
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {channels.map((c, i) => (
              <motion.div key={c.name} initial={{ opacity: 0, y: 20 }} animate={channelsIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08 }} className="rounded-3xl border border-black/8 bg-white p-8">
                <div className="mb-4 h-1 w-8 rounded-full bg-red-500" />
                <h3 className="text-base font-bold text-black">{c.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/55">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32" ref={delivRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={delivIv ? "show" : "hidden"} className="mb-16">
            <motion.p variants={up} className="mb-3 text-[11px] font-bold uppercase tracking-widest text-black/40">Leistungsumfang</motion.p>
            <motion.h2 variants={up} className="text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl">
              Vollständig gemanagt.<br /><span className="text-black/25">Vollständig Ihrer Marke.</span>
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-px border-l border-t border-black/8 sm:grid-cols-2 lg:grid-cols-3">
            {deliverables.map((d, i) => (
              <motion.div key={d.title} initial={{ opacity: 0 }} animate={delivIv ? { opacity: 1 } : {}}
                transition={{ delay: i * 0.08 }} className="border-b border-r border-black/8 bg-white p-8">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-red-500">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="text-base font-bold text-black">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/50">{d.desc}</p>
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
              <motion.div key={i} initial={{ opacity: 0 }} animate={faqIv ? { opacity: 1 } : {}} transition={{ delay: i * 0.07 }}
                className="py-6">
                <p className="text-base font-bold text-black">{faq.q}</p>
                <p className="mt-3 text-sm leading-relaxed text-black/55">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-24">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-4xl font-black text-white">Social Media, das wächst.</h2>
          <p className="mt-5 text-base text-white/50">Starten Sie mit einer kostenlosen Analyse Ihrer aktuellen Social-Media-Präsenz.</p>
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
