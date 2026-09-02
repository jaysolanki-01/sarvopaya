"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;
const up = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const seq = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };

const services = [
  "Performance Marketing",
  "Werbung (Advertising)",
  "Suchmaschinenoptimierung (SEO)",
  "Social-Media-Marketing",
  "Website-Entwicklung",
  "KI & Automatisierung",
  "Wachstumsberatung",
  "Sonstiges",
];

export default function DeContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", company: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputCls = "w-full rounded-2xl border border-black/10 bg-black/[0.02] px-4 py-3.5 text-sm text-black placeholder-black/30 transition-colors focus:border-black/25 focus:outline-none";

  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden bg-white pb-16 pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate="show">
            <motion.p variants={up} className="mb-4 text-[11px] font-bold uppercase tracking-widest text-black/40">Kontakt</motion.p>
            <motion.h1 variants={up} className="text-5xl font-black leading-tight tracking-tight text-black sm:text-6xl">
              Starten Sie Ihr Wachstum.<br />
              <span className="text-black/25">Wir hören zu.</span>
            </motion.h1>
            <motion.p variants={up} className="mt-6 max-w-xl text-lg leading-relaxed text-black/55">
              Buchen Sie eine kostenlose 30-minütige Beratung. Wir analysieren Ihren aktuellen digitalen Auftritt und zeigen Ihnen, was den größten Unterschied macht.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="bg-black/[0.02] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Form */}
            <div>
              {status === "success" ? (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  className="rounded-3xl border border-black/8 bg-white p-10 text-center">
                  <div className="mb-4 text-4xl">✓</div>
                  <h2 className="text-2xl font-black text-black">Nachricht erhalten!</h2>
                  <p className="mt-3 text-base text-black/55">Wir melden uns innerhalb von 24 Stunden bei Ihnen. Bis dann!</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-black/40">Name *</label>
                      <input required type="text" placeholder="Ihr vollständiger Name" className={inputCls}
                        value={formState.name} onChange={e => setFormState(s => ({ ...s, name: e.target.value }))} />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-black/40">E-Mail *</label>
                      <input required type="email" placeholder="ihre@email.de" className={inputCls}
                        value={formState.email} onChange={e => setFormState(s => ({ ...s, email: e.target.value }))} />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-black/40">Unternehmen</label>
                    <input type="text" placeholder="Ihr Unternehmensname" className={inputCls}
                      value={formState.company} onChange={e => setFormState(s => ({ ...s, company: e.target.value }))} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-black/40">Gewünschte Leistung</label>
                    <select className={inputCls} value={formState.service}
                      onChange={e => setFormState(s => ({ ...s, service: e.target.value }))}>
                      <option value="">Bitte wählen…</option>
                      {services.map(svc => <option key={svc} value={svc}>{svc}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-black/40">Ihre Nachricht *</label>
                    <textarea required rows={5} placeholder="Beschreiben Sie kurz Ihr Projekt oder Ihre Ziele…" className={`${inputCls} resize-none`}
                      value={formState.message} onChange={e => setFormState(s => ({ ...s, message: e.target.value }))} />
                  </div>
                  {status === "error" && (
                    <p className="text-sm text-red-500">Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt.</p>
                  )}
                  <button type="submit" disabled={status === "submitting"}
                    className="w-full rounded-full bg-red-600 py-4 text-sm font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-90 disabled:opacity-60">
                    {status === "submitting" ? "Wird gesendet…" : "Nachricht senden →"}
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="space-y-8">
              <div>
                <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-black/40">Direkter Kontakt</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-black/40">E-Mail</p>
                    <a href="mailto:jay.sarvopaya@gmail.com" className="mt-1 text-base font-semibold text-black hover:text-red-500 transition-colors">
                      jay.sarvopaya@gmail.com
                    </a>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-black/40">Telefon / WhatsApp</p>
                    <a href="https://wa.me/919265503415" className="mt-1 text-base font-semibold text-black hover:text-red-500 transition-colors">
                      +91 92655 03415
                    </a>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-black/40">Standort</p>
                    <p className="mt-1 text-base font-semibold text-black">PNTC, Ahmedabad, Indien</p>
                    <p className="text-sm text-black/50">Kunden weltweit betreut</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-black/8 bg-white p-8">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-black/40">Was Sie erwartet</p>
                <ul className="space-y-3">
                  {[
                    "30-minütiges Erstgespräch ohne Verpflichtung",
                    "Analyse Ihres aktuellen digitalen Auftritts",
                    "Konkrete Empfehlungen mit sofortigem Mehrwert",
                    "Kein Hard-Selling — ehrliches Feedback",
                  ].map(item => (
                    <li key={item} className="flex items-start gap-3 text-sm text-black/65">
                      <span className="mt-0.5 shrink-0 text-red-500">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
