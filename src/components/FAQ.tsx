"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

const faqs = [
  {
    question: "What services does Sarvopaya offer?",
    answer:
      "We help ambitious brands with lead generation and growth marketing, website and digital experience design, AI and automation, and growth consulting everything you need to grow predictably, under one roof.",
  },
  {
    question: "How soon can we get started?",
    answer:
      "Most engagements kick off within a week of our first call. We'll get back to you within one business day of reaching out, and scope a plan tailored to where you are right now.",
  },
  {
    question: "Do you work with startups or only established brands?",
    answer:
      "Both. We've partnered with solo founders shipping their first MVP campaign as well as growth-stage brands scaling revenue predictably our approach adapts to your stage, not the other way around.",
  },
  {
    question: "How do you measure success?",
    answer:
      "Clear priorities and real numbers, no fluff. We agree on the metrics that matter for your business up front pipeline, conversion, revenue and report against them consistently.",
  },
  {
    question: "What does working with Sarvopaya actually look like?",
    answer:
      "No jargon, no vague retainers just a straight conversation about where you are, where you want to be, and how we get you there, followed by focused execution from a team that thinks like operators.",
  },
];

function PlusIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10">
      <motion.span
        animate={{ rotate: open ? 45 : 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="relative flex h-8 w-8 items-center justify-center"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={open ? "text-accent" : "text-black"}
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </motion.span>
    </span>
  );
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full bg-white py-14 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-3xl"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-black/60"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            FAQ
          </motion.span>

          <motion.h2
            variants={item}
            className="mt-6 text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl lg:text-5xl"
          >
            Questions? We&rsquo;ve got{" "}
            <span className="text-accent">clear answers</span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 divide-y divide-black/10 border-t border-black/10"
        >
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            return (
              <motion.div key={faq.question} variants={item}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-heading text-lg font-medium text-black sm:text-xl">
                    {faq.question}
                  </span>
                  <PlusIcon open={open} />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 text-base leading-7 text-black/60">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
