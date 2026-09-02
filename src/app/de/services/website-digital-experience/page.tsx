"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;
const up = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const seq = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };

const services = [
  { id: "website-development", title: "Website-Entwicklung", desc: "Schnelle, moderne Websites mit Next.js, React und Tailwind — performance-optimiert, responsive und conversion-fokussiert." },
  { id: "cro", title: "Conversion Rate Optimierung", desc: "A/B-Tests, Heatmap-Analysen und UX-Optimierungen, die aus Besuchern Kunden machen." },
  { id: "landing-pages-funnels", title: "Landingpages & Funnels", desc: "Zielgerichtete Landingpages für jede Kampagne — abgestimmt auf Audience, Message und Angebot." },
];

const techStack = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel", "Webflow", "WordPress", "Shopify"];

const faqs = [
  { q: "Wie lange dauert die Entwicklung einer Website?", a: "Einfachere Websites (5–10 Seiten) sind in 3–6 Wochen fertig. Komplexere Projekte mit individuellen Features brauchen 8–16 Wochen. Wir definieren im Erstgespräch einen realistischen Zeitplan." },
  { q: "Was ist CRO und warum ist es wichtig?", a: "Conversion Rate Optimierung verbessert, wie viele Ihrer Besucher zu Kunden werden. Eine höhere Conversion Rate bedeutet mehr Umsatz aus dem gleichen Traffic — das ist oft effizienter als mehr Werbebudget." },
  { q: "Entwickeln Sie auch E-Commerce-Websites?", a: "Ja. Wir entwickeln E-Commerce-Lösungen mit Shopify, WooCommerce oder Custom-Builds — abgestimmt auf Ihre Anforderungen und Skalierungsziele." },
  { q: "Ist SEO in der Website-Entwicklung inbegriffen?", a: "Ja. Jede Website, die wir entwickeln, ist technisch SEO-ready: saubere URLs, Meta-Tags, Schema Markup, schnelle Ladezeiten und Mobile-Optimierung. Optional integrieren wir auch eine vollständige SEO-Strategie." },
];

export default function DeWebsitePage() {
  const servRef = useRef<HTMLDivElement>(null);
  const servIv = useInView(servRef, { once: true, amount: 0.2 });
  const techRef = useRef<HTMLDivElement>(null);
  const techIv = useInView(techRef, { once: true, amount: 0.3 });
  const faqRef = useRef<HTMLDivElement>(null);
  const faqIv = useInView(faqRef, { once: true, amount: 0.2 });

  return (
    <>
      <section className="overflow-hidden bg-white pb-24 pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate="show">
            <motion.p variants={up} className="mb-4 text-[11px] font-bold uppercase tracking-widest text-black/40">Website & Digital Experience</motion.p>
            <motion.h1 variants={up} className="text-5xl font-black leading-tight tracking-tight text-black sm:text-6xl lg:text-7xl">
              Websites, die<br />
              <span className="text-black/25">konvertieren.</span>
            </motion.h1>
            <motion.p variants={up} className="mt-6 max-w-2xl text-lg leading-relaxed text-black/55">
              Wir bauen digitale Erlebnisse, die nicht nur gut aussehen — sie sind auf Performance, Conversion und Nutzererfahrung optimiert.
            </motion.p>
            <motion.div variants={up} className="mt-10">
              <Link href="/de/contact"
                className="inline-flex h-14 items-center gap-2 rounded-full bg-black px-8 text-sm font-bold text-white transition-colors hover:bg-red-600">
                Projekt anfragen →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-black/[0.02] py-24 sm:py-32" ref={servRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={servIv ? "show" : "hidden"} className="mb-16">
            <motion.p variants={up} className="mb-3 text-[11px] font-bold uppercase tracking-widest text-black/40">Leistungen</motion.p>
            <motion.h2 variants={up} className="text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl">
              Was wir für Sie<br /><span className="text-black/25">bauen.</span>
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {services.map((s, i) => (
              <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} animate={servIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12 }} className="rounded-3xl border border-black/8 bg-white p-8">
                <div className="mb-4 h-1 w-8 rounded-full bg-red-500" />
                <h3 className="text-xl font-bold text-black">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-black/55">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24" ref={techRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={techIv ? "show" : "hidden"} className="mb-10">
            <motion.p variants={up} className="mb-3 text-[11px] font-bold uppercase tracking-widest text-black/40">Tech Stack</motion.p>
            <motion.h2 variants={up} className="text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl">
              Moderne Technologien<br /><span className="text-black/25">für zukunftssichere Ergebnisse.</span>
            </motion.h2>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={techIv ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-3">
            {techStack.map(t => (
              <span key={t} className="rounded-full border border-black/10 bg-black/[0.03] px-5 py-2.5 text-sm font-semibold text-black/60">{t}</span>
            ))}
          </motion.div>
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

      <section className="bg-black py-24">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-4xl font-black text-white">Ihr nächstes Web-Projekt?</h2>
          <p className="mt-5 text-base text-white/50">Lassen Sie uns über Ihre Anforderungen sprechen.</p>
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
