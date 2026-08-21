"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import CTAButton from "@/components/CTAButton";
import FinalCTA from "@/components/FinalCTA";
import Testimonials from "@/components/Testimonials";
import {
  FunnelIcon,
  CartIcon,
  StarIcon,
  GlobeIcon,
  GearIcon,
  SearchIcon,
} from "@/components/icons";
import type { ComponentType } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

type IndustryShowcase = {
  industry: string;
  title: string;
  description: string;
  image: string;
};

const industryPortfolio: IndustryShowcase[] = [
  {
    industry: "Kitchen Equipment",
    title: "Commercial Kitchen Equipment — B2B Catalog & Export Site",
    description:
      "A product-catalog website built for a commercial kitchenware manufacturer to showcase their range to distributors and capture bulk export inquiries.",
    image:
      "https://images.unsplash.com/photo-1556909114-44e3e70034e2?auto=format&fit=crop&w=1600&q=80",
  },
  {
    industry: "Carpet & Rug",
    title: "Handwoven Carpets — Export Storefront & Lookbook",
    description:
      "A visual-first storefront for a carpet exporter, built to present craftsmanship at scale and turn international buyers into qualified inquiries.",
    image:
      "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=1600&q=80",
  },
  {
    industry: "Jewellery",
    title: "Fine Jewellery — D2C Storefront & Local SEO",
    description:
      "A conversion-focused ecommerce experience for a jewellery brand, paired with local SEO to drive footfall and online orders in equal measure.",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1600&q=80",
  },
];

type UseCase = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

const useCases: UseCase[] = [
  {
    icon: FunnelIcon,
    title: "Generate More Leads",
    description:
      "Capture high-intent visitors with funnels built to fill your pipeline with qualified prospects.",
  },
  {
    icon: CartIcon,
    title: "Increase Online Sales",
    description:
      "Turn browsers into buyers with conversion-focused storefronts, offers, and checkout flows.",
  },
  {
    icon: StarIcon,
    title: "Improve Brand Credibility",
    description:
      "Present a polished, trustworthy presence that reassures customers before they reach out.",
  },
  {
    icon: GlobeIcon,
    title: "Build Export Presence",
    description:
      "Reach international buyers with multi-language, multi-currency experiences built for trade.",
  },
  {
    icon: GearIcon,
    title: "Automate Business Process",
    description:
      "Cut manual busywork with AI-driven workflows that keep operations running smoothly.",
  },
  {
    icon: SearchIcon,
    title: "Rank Higher on Google",
    description:
      "Climb search rankings with technical SEO and content built to win clicks and citations.",
  },
];

type HelpCard = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  gradient: string;
  points: string[];
};

const helpCards: HelpCard[] = [
  {
    icon: CartIcon,
    title: "B2C Business",
    subtitle:
      "Everything a consumer-facing brand needs to sell more: fast ecommerce experiences, local visibility, and social-first marketing that turns browsers into loyal customers.",
    gradient: "from-black to-neutral-800",
    points: [
      "Ecommerce Website",
      "Local SEO",
      "Social Media Marketing",
      "Google Ads",
      "WhatsApp Integration",
    ],
  },
  {
    icon: FunnelIcon,
    title: "B2B Business",
    subtitle:
      "Corporate-grade websites and pipeline systems built for longer sales cycles — generate qualified leads and keep your CRM working for you, not against you.",
    gradient: "from-accent to-red-800",
    points: [
      "Corporate Website",
      "Lead Generation",
      "CRM Integration",
      "LinkedIn Marketing",
      "Marketing Automation",
    ],
  },
  {
    icon: GlobeIcon,
    title: "Export Business",
    subtitle:
      "Reach international buyers with multi-language, multi-currency experiences and the inquiry infrastructure global trade actually runs on.",
    gradient: "from-neutral-800 to-black",
    points: [
      "International SEO",
      "Product Catalog",
      "Multi-language Website",
      "Export Inquiry Forms",
      "Multi-Currency Support",
    ],
  },
];

export default function IndustriesPage() {
  const [activeHelp, setActiveHelp] = useState<number | null>(0);

  return (
    <>
      {/* Section 1 — Hero */}
      <section className="relative flex min-h-[calc(100dvh-4rem)] w-full items-center overflow-hidden bg-white">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 select-none whitespace-nowrap text-[160px] font-bold uppercase leading-none text-transparent sm:-top-16 sm:text-[240px] lg:-top-20 lg:text-[320px]"
          style={{ WebkitTextStroke: "1px rgba(0,0,0,0.06)" }}
        >
          GROWTH
        </span>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-black/60"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Kitchen Equipment
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-black sm:text-6xl lg:text-7xl"
          >
            We Build Digital Solutions for{" "}
            <span className="text-accent">
              niche
            </span>{" "}
            Businesses
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-black/60 sm:text-xl"
          >
            Helping B2B, B2C, and Export businesses generate more leads,
            increase sales, and build a stronger online presence.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <div className="w-full sm:w-auto">
              <CTAButton href="#portfolio" variant="outline" size="lg" fullWidth>
                View Portfolio
              </CTAButton>
            </div>
            <div className="w-full sm:w-auto">
              <CTAButton href="/contact" variant="primary" size="lg" fullWidth>
                Book Free Consultation
              </CTAButton>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Section 2 — Portfolio + Use Cases */}
      <section id="portfolio" className="w-full scroll-mt-20 bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-10">
            {/* Left — Portfolio */}
            <div>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={container}
              >
                <motion.span
                  variants={item}
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-black/60"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Portfolio
                </motion.span>

                <motion.h2
                  variants={item}
                  className="mt-6 text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl"
                >
                  Our Portfolio
                </motion.h2>

                <motion.p variants={item} className="mt-4 max-w-md text-base leading-7 text-black/60">
                  A look at work built specifically for kitchen equipment, carpet
                  &amp; rug, and jewellery businesses like yours.
                </motion.p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                variants={container}
                className="mt-6 flex flex-col gap-5"
              >
                {industryPortfolio.map((entry) => (
                  <motion.div
                    key={entry.industry}
                    variants={item}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-xl shadow-black/5 transition-shadow duration-300 hover:shadow-2xl sm:flex-row"
                  >
                    <div className="relative h-48 w-full shrink-0 overflow-hidden bg-black sm:h-auto sm:w-2/5">
                      <Image
                        src={entry.image}
                        alt={entry.title}
                        fill
                        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 40vw, 90vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                        {entry.industry}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
                      <h3 className="font-heading text-lg font-bold text-black transition-colors duration-300 group-hover:text-accent">
                        {entry.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-black/60">
                        {entry.description}
                      </p>
                      <Link
                        href="/contact"
                        className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-black transition-colors duration-300 group-hover:text-accent"
                      >
                        View Project
                        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                          &rarr;
                        </span>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right — Use Cases */}
            <div>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={container}
              >
                <motion.span
                  variants={item}
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-black/60"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Use Cases
                </motion.span>

                <motion.h2
                  variants={item}
                  className="mt-6 text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl"
                >
                  How Businesses Use Our Services
                </motion.h2>

                <motion.p variants={item} className="mt-4 max-w-md text-base leading-7 text-black/60">
                  Six outcomes we get hired for most, whatever stage your
                  business is at today.
                </motion.p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                variants={container}
                className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
              >
                {useCases.map((useCase, i) => (
                  <motion.div
                    key={useCase.title}
                    variants={item}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="group relative flex flex-col overflow-hidden rounded-2xl bg-black/[0.03] p-6 transition-colors duration-500 hover:bg-black"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-2 -top-5 font-heading text-[5.5rem] font-bold leading-none text-black/5 transition-colors duration-500 group-hover:text-white/10"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white text-accent shadow-sm shadow-black/5 transition-colors duration-500 group-hover:bg-accent group-hover:text-white">
                      <useCase.icon className="h-6 w-6" />
                    </span>
                    <h3 className="relative mt-5 font-heading text-base font-bold text-black transition-colors duration-500 group-hover:text-white">
                      {useCase.title}
                    </h3>
                    <p className="relative mt-2 text-sm leading-6 text-black/60 transition-colors duration-500 group-hover:text-white/70">
                      {useCase.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — How We Can Help */}
      <section className="w-full bg-white pt-10 pb-10 sm:pt-12 sm:pb-12">
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
              How We Can Help
            </motion.span>

            <motion.h2
              variants={item}
              className="mt-6 text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl lg:text-5xl"
            >
              Built Around Your <span className="text-accent">Business Model</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE }}
            onMouseLeave={() => setActiveHelp(null)}
            className="mt-10 border-t border-dashed border-black/20"
          >
            {helpCards.map((card, index) => {
              const isActive = activeHelp === index;

              return (
                <div
                  key={card.title}
                  onMouseEnter={() => setActiveHelp(index)}
                  onClick={() => setActiveHelp(index)}
                  className="cursor-pointer border-b border-dashed border-black/20 py-6 transition-colors"
                >
                  <div className="flex items-center gap-3 sm:gap-8">
                    <span className="w-8 shrink-0 font-heading text-sm font-bold text-black/30 sm:w-16 sm:text-lg">
                      ({String(index + 1).padStart(2, "0")})
                    </span>

                    <motion.div
                      layout
                      transition={{ duration: 0.5, ease: EASE }}
                      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${card.gradient} ${
                        isActive ? "h-16 w-24 sm:h-40 sm:w-64" : "h-10 w-16 sm:h-16 sm:w-24"
                      }`}
                    >
                      <card.icon
                        className={`text-white/25 transition-all duration-500 ${
                          isActive ? "h-14 w-14 sm:h-16 sm:w-16" : "h-7 w-7"
                        }`}
                      />
                    </motion.div>

                    <h3
                      className={`font-heading font-bold uppercase tracking-tight transition-all duration-500 ${
                        isActive
                          ? "text-lg text-black sm:text-4xl lg:text-5xl"
                          : "text-base text-black/40 sm:text-2xl"
                      }`}
                    >
                      {card.title}
                    </h3>
                  </div>

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
                      className="mt-6 pl-10 sm:pl-[6.5rem]"
                    >
                      <p className="text-base text-black/60 sm:text-lg">{card.subtitle}</p>
                      <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {card.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-black sm:text-sm"
                          >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-accent text-white">
                              &#8599;
                            </span>
                            {point}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6">
                        <CTAButton href="/contact" variant="primary" size="sm">
                          Learn More
                        </CTAButton>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Section 4 — Client Reviews */}
      <div className="-mt-10 sm:-mt-14">
        <Testimonials />
      </div>

      {/* Section 5 — Final CTA */}
      <FinalCTA />
    </>
  );
}
