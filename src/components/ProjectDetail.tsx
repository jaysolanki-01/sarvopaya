"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import CTAButton from "@/components/CTAButton";
import type { Project } from "@/lib/projects";

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <>
      {/* Title */}
      <section className="w-full bg-white pb-4 pt-14 sm:pt-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <p className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-black/60">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {project.category}
            </p>

            <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-black sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-black/60">
              {project.summary}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Banner image */}
      <section className="w-full bg-white pt-10 sm:pt-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative aspect-[21/9] overflow-hidden rounded-3xl shadow-xl shadow-black/10"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(min-width: 1024px) 1152px, 100vw"
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
            {/* Sidebar stacks on top of the article on mobile, sticks in place on scroll from lg up */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="flex flex-col gap-10 border-b border-black/10 pb-8 lg:border-b-0 lg:pb-0">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-black">
                    Services
                  </h2>
                  <ul className="mt-4 flex flex-col gap-3">
                    {project.services.map((service) => (
                      <li key={service} className="text-base text-black/60">
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-bold text-black">
                    Industry
                  </h2>
                  <ul className="mt-4 flex flex-col gap-3">
                    <li className="text-base text-black/60">{project.industry}</li>
                  </ul>
                </div>
              </div>
            </aside>

            {/* Article */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="text-lg font-semibold leading-8 text-black"
              >
                {project.intro}
              </motion.p>

              <div className="mt-10 flex flex-col gap-10">
                {project.sections.map((section, i) => (
                  <motion.div
                    key={section.heading}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
                  >
                    <h3 className="font-heading text-xl font-bold text-black sm:text-2xl">
                      {section.heading}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-black/60 sm:text-lg">
                      {section.body}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-14 rounded-3xl border border-black/10 bg-black/[0.02] p-8 sm:p-10">
                <h3 className="font-heading text-2xl font-bold text-black sm:text-3xl">
                  Want results like this?
                </h3>
                <p className="mt-3 max-w-lg text-black/60">
                  Let&rsquo;s talk about what growth looks like for your
                  business.
                </p>
                <div className="mt-6">
                  <CTAButton href="/contact" variant="primary" size="lg">
                    Start Your Project
                  </CTAButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
