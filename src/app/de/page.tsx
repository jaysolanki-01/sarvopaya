"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;
const up = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const seq = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };

export default function DeHomePage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsIv = useInView(statsRef, { once: true, amount: 0.3 });
  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesIv = useInView(servicesRef, { once: true, amount: 0.2 });
  const whyRef = useRef<HTMLDivElement>(null);
  const whyIv = useInView(whyRef, { once: true, amount: 0.2 });

  const services = [
    { num: "01", title: "Performance Marketing", desc: "Zielgenaue Kampagnen auf Google, Meta, LinkedIn und mehr — skalierbar und ROI-messbar.", href: "/de/services/advertising" },
    { num: "02", title: "Suchmaschinenoptimierung", desc: "Organische Sichtbarkeit aufbauen, die langfristig qualifizierte Leads liefert.", href: "/de/services/seo" },
    { num: "03", title: "Social-Media-Marketing", desc: "Community-Aufbau, Kreativkampagnen und datengetriebenes Wachstum über alle Kanäle.", href: "/de/services/social-media-marketing" },
    { num: "04", title: "KI & Automatisierung", desc: "Workflows automatisieren, Follow-ups beschleunigen und Ops-Prozesse ohne mehr Personal skalieren.", href: "/de/services/ai-automation" },
    { num: "05", title: "Web & Digital Experience", desc: "Conversion-optimierte Websites, Landingpages und Funnels, die Besucher zu Kunden machen.", href: "/de/services/website-digital-experience" },
    { num: "06", title: "Wachstumsberatung", desc: "GTM-Strategie, Digitaler Audit und laufende Beratung für nachhaltiges Marktwachstum.", href: "/de/services/growth-consulting" },
  ];

  const stats = [
    { value: "50+", label: "Marken betreut" },
    { value: "3-in-1", label: "Kreativität · Technologie · KI" },
    { value: "100%", label: "ROI-fokussiert" },
    { value: "8+", label: "Dienstleistungen" },
  ];

  const whyPoints = [
    { title: "KI trifft auf Marketingstrategie", body: "Wir verbinden künstliche Intelligenz mit bewährter Marketingstrategie — keine blinden Experimente, sondern präzises Wachstum auf Basis von Daten." },
    { title: "Drei Disziplinen. Ein Team.", body: "Kreativmedien, Technologie und KI unter einem Dach. Kein Ping-Pong zwischen Agenturen — alles aus einer Hand, vollständig aufeinander abgestimmt." },
    { title: "Messbare Ergebnisse", body: "Wir tracken jede Kampagne bis zum Umsatz. Keine Eitelkeitskennzahlen — nur Metriken, die für Ihr Geschäft wirklich zählen." },
    { title: "Global aufgestellt, lokal durchdacht", body: "Von Indien aus betreuen wir Kunden in USA, UK, VAE, Saudi-Arabien, Australien, Kanada, Singapur und Deutschland." },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-black min-h-[90vh] flex items-center">
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate="show">
            <motion.p variants={up} className="mb-6 text-[11px] font-bold uppercase tracking-[0.25em] text-red-500">
              KI-Automatisierung & Wachstumsmarketing
            </motion.p>
            <motion.h1 variants={up} className="font-black uppercase text-white leading-[0.88] tracking-tight"
              style={{ fontSize: "clamp(56px,10vw,140px)" }}>
              WACHSTUM<br />
              <span className="text-red-500">DURCH KI.</span>
            </motion.h1>
            <motion.p variants={up} className="mt-8 max-w-xl text-lg leading-relaxed text-white/50">
              Sarvopaya ist Ihre Agentur für KI-Automatisierung und Performance-Marketing. Wir helfen Unternehmen dabei, durch intelligente Workflows, zielgenaues Marketing und conversion-optimierte Websites messbar zu wachsen.
            </motion.p>
            <motion.div variants={up} className="mt-10 flex flex-wrap gap-4">
              <Link href="/de/contact"
                className="inline-flex h-14 items-center gap-2 rounded-full bg-red-600 px-8 text-sm font-bold text-white transition-colors hover:bg-red-700">
                Kostenlose Beratung buchen →
              </Link>
              <Link href="/de/work"
                className="inline-flex h-14 items-center gap-2 rounded-full border border-white/20 px-8 text-sm font-bold text-white/70 transition-colors hover:border-white/40 hover:text-white">
                Unsere Arbeit ansehen
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-black border-t border-white/10 py-16" ref={statsRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 16 }} animate={statsIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
                className="text-center">
                <p className="text-4xl font-black text-white">{s.value}</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/35">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white py-24 sm:py-32" ref={servicesRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={servicesIv ? "show" : "hidden"} className="mb-16">
            <motion.p variants={up} className="mb-3 text-[11px] font-bold uppercase tracking-widest text-black/40">Unsere Leistungen</motion.p>
            <motion.h2 variants={up} className="text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl">
              Was wir für Sie tun.<br />
              <span className="text-black/25">Alles, was Ihr Wachstum braucht.</span>
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-px border-l border-t border-black/8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((svc, i) => (
              <motion.div key={svc.num}
                initial={{ opacity: 0 }} animate={servicesIv ? { opacity: 1 } : {}}
                transition={{ delay: i * 0.08 }}
                className="border-b border-r border-black/8 bg-white p-8 transition-colors hover:bg-black/[0.02]">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-red-500">{svc.num}</p>
                <h3 className="text-base font-bold text-black">{svc.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/50">{svc.desc}</p>
                <Link href={svc.href} className="mt-5 flex items-center gap-1.5 text-xs font-bold text-black/35 transition-colors hover:text-red-500">
                  Mehr erfahren →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Sarvopaya */}
      <section className="bg-black/[0.02] py-24 sm:py-32" ref={whyRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={whyIv ? "show" : "hidden"} className="mb-16">
            <motion.p variants={up} className="mb-3 text-[11px] font-bold uppercase tracking-widest text-black/40">Warum Sarvopaya</motion.p>
            <motion.h2 variants={up} className="text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl">
              Die Agentur, die<br />
              <span className="text-black/25">wirklich liefert.</span>
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {whyPoints.map((w, i) => (
              <motion.div key={w.title}
                initial={{ opacity: 0, y: 20 }} animate={whyIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
                className="rounded-3xl border border-black/8 bg-white p-8">
                <div className="mb-5 h-1 w-10 rounded-full bg-red-500" />
                <h3 className="text-xl font-bold text-black">{w.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-black/55">{w.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-white/30">Jetzt starten</p>
          <h2 className="text-4xl font-black text-white sm:text-5xl">
            Bereit für echtes Wachstum?
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/50">
            Buchen Sie ein kostenloses 30-minütiges Strategiegespräch. Wir analysieren Ihren aktuellen digitalen Auftritt und zeigen Ihnen konkret, was den größten Hebel hat.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/de/contact"
              className="inline-flex h-14 items-center gap-2 rounded-full bg-red-600 px-10 text-sm font-bold text-white transition-opacity hover:opacity-90">
              Kostenlose Beratung →
            </Link>
            <Link href="/de/services"
              className="inline-flex h-14 items-center gap-2 rounded-full border border-white/15 px-10 text-sm font-bold text-white transition-colors hover:border-white/30">
              Alle Leistungen
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
