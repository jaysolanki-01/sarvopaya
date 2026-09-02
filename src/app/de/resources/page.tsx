"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;
const up = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const seq = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };

const articles = [
  {
    cat: "Performance Marketing",
    title: "Warum der ROAS allein keine Entscheidung ist",
    desc: "Ein tiefer Einblick in die Metriken, die wirklich zählen — und warum 3× ROAS in einem schlecht skalierten Account Geld verbrennt.",
    href: "/resources",
    date: "2026",
  },
  {
    cat: "KI & Automatisierung",
    title: "KI-Automatisierung für Marketing-Teams",
    desc: "Wie führende Wachstumsmarken KI einsetzen, um Follow-up, Reporting und Betriebsabläufe zu automatisieren — ohne Entwickler.",
    href: "/resources",
    date: "2026",
  },
  {
    cat: "SEO",
    title: "Technical SEO Checkliste 2026",
    desc: "Die vollständige Checkliste für technisches SEO: Core Web Vitals, Indexierung, Crawl-Budget und mehr — aktualisiert für 2026.",
    href: "/resources",
    date: "2026",
  },
  {
    cat: "Founder's POV",
    title: "Warum die meisten Agenturen scheitern",
    desc: "Ungefilterte Perspektive auf Agenturmodelle, Incentive-Strukturen und warum echte Partnerschaft seltener ist als Sie denken.",
    href: "/resources/founders-pov",
    date: "2026",
  },
];

export default function DeResourcesPage() {
  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden bg-white pb-16 pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate="show">
            <motion.p variants={up} className="mb-4 text-[11px] font-bold uppercase tracking-widest text-black/40">Ressourcen</motion.p>
            <motion.h1 variants={up} className="text-5xl font-black leading-tight tracking-tight text-black sm:text-6xl">
              Wissen, das<br />
              <span className="text-black/25">Wachstum bringt.</span>
            </motion.h1>
            <motion.p variants={up} className="mt-6 max-w-xl text-lg leading-relaxed text-black/55">
              Guides, Playbooks und Einblicke vom Sarvopaya-Team — praxisnah, datenbasiert und ohne Marketingsprech.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Articles */}
      <section className="bg-black/[0.02] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-[11px] font-bold uppercase tracking-widest text-black/40">
              Alle Artikel auch auf Englisch verfügbar unter{" "}
              <Link href="/resources" className="text-red-500 hover:underline">/resources</Link>
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {articles.map((a, i) => (
              <motion.article key={a.title}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
                className="rounded-3xl border border-black/8 bg-white p-8">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-red-500">{a.cat}</p>
                <h2 className="text-xl font-black text-black">{a.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-black/55">{a.desc}</p>
                <Link href={a.href} className="mt-5 flex items-center gap-1.5 text-xs font-bold text-black/35 hover:text-red-500 transition-colors">
                  Vollständigen Artikel lesen →
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-4xl font-black text-white">Mehr Insights?</h2>
          <p className="mt-5 text-base text-white/50">Alle neuen Artikel erscheinen zuerst auf unserer englischen Ressourcenseite. Alternativ: buchen Sie ein Gespräch und wir teilen unsere aktuellsten Erkenntnisse direkt mit Ihnen.</p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/de/contact"
              className="inline-flex h-14 items-center gap-2 rounded-full bg-red-600 px-10 text-sm font-bold text-white transition-opacity hover:opacity-90">
              Gespräch buchen →
            </Link>
            <Link href="/resources"
              className="inline-flex h-14 items-center gap-2 rounded-full border border-white/15 px-10 text-sm font-bold text-white transition-colors hover:border-white/30">
              Alle Artikel (EN)
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
