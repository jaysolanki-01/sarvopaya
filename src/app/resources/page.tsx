"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import CTAButton from "@/components/CTAButton";
import FinalCTA from "@/components/FinalCTA";
import ProjectCard from "@/components/ProjectCard";
import { categories, projects } from "@/lib/projects";

const EASE = [0.16, 1, 0.3, 1] as const;

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const marqueeItems = ["All Work", ...categories.map((c) => c.label)];

const resourcesSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Sarvopaya Case Studies & Work",
  url: "https://sarvopaya.com/resources",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://sarvopaya.com/resources/${project.slug}`,
      name: project.title,
    })),
  },
};

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(resourcesSchema) }}
      />
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-white">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 select-none whitespace-nowrap text-[160px] font-bold uppercase leading-none text-transparent sm:-top-16 sm:text-[240px] lg:-top-20 lg:text-[320px]"
          style={{ WebkitTextStroke: "1px rgba(0,0,0,0.06)" }}
        >
          WORK
        </span>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-28"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-black/60"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Our Work
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-black sm:text-6xl lg:text-7xl"
          >
            Our Work That Drives{" "}
            <span className="text-accent">Real Business Growth</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-black/60 sm:text-xl"
          >
            Explore websites, AI automation, SEO, and custom software
            projects we&rsquo;ve delivered for startups, SMEs, and
            D2C.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <div className="w-full sm:w-auto">
              <CTAButton href="#projects" variant="outline" size="lg" fullWidth>
                View Projects
              </CTAButton>
            </div>
            <div className="w-full sm:w-auto">
              <CTAButton href="/contact" variant="primary" size="lg" fullWidth>
                Start Your Project
              </CTAButton>
            </div>
          </motion.div>
        </motion.div>
      </section>

  
      {/* Filters + Grid */}
      <section id="projects" className="w-full scroll-mt-20 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-wrap justify-center gap-3"
          >
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                activeCategory === "all"
                  ? "bg-black text-white"
                  : "border border-black/10 text-black/60 hover:border-black/30 hover:text-black"
              }`}
            >
              All Projects
            </button>
            {categories.map((category) => (
              <button
                key={category.label}
                type="button"
                onClick={() => setActiveCategory(category.label)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                  activeCategory === category.label
                    ? "bg-black text-white"
                    : "border border-black/10 text-black/60 hover:border-black/30 hover:text-black"
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>

          <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <p className="mt-14 text-center text-black/50">
              No projects in this category yet check back soon.
            </p>
          )}
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
