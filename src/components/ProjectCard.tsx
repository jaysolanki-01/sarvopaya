"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";

const EASE = [0.16, 1, 0.3, 1] as const;

const dimOverlay = {
  rest: { opacity: 0 },
  hover: { opacity: 1 },
};

const overlayReveal = {
  rest: { opacity: 0, y: 16 },
  hover: { opacity: 1, y: 0 },
};

const pillSweep = {
  rest: { scaleX: 0 },
  hover: { scaleX: 1 },
};

const arrowVariants = {
  rest: { x: 0 },
  hover: { x: 4 },
};

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: EASE }}
    >
      <motion.div initial="rest" animate="rest" whileHover="hover" className="group">
        <Link href={`/resources/${project.slug}`} className="block">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-black">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <span className="absolute left-4 top-4 z-10 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
              {project.industry}
            </span>

            <motion.div
              aria-hidden="true"
              variants={dimOverlay}
              transition={{ duration: 0.35, ease: EASE }}
              className="absolute inset-0 z-10 bg-black/70"
            />

            <motion.div
              variants={overlayReveal}
              transition={{ duration: 0.35, ease: EASE }}
              className="absolute inset-0 z-20 flex items-center justify-center"
            >
              <span className="relative flex items-center gap-2 overflow-hidden rounded-full bg-black px-6 py-3 text-sm font-semibold text-white">
                <motion.span
                  aria-hidden="true"
                  variants={pillSweep}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="absolute inset-0 origin-left bg-accent"
                />
                <span className="relative z-10 flex items-center gap-2">
                  View Case Study
                  <motion.span variants={arrowVariants} transition={{ duration: 0.3 }} aria-hidden="true">
                    &rarr;
                  </motion.span>
                </span>
              </span>
            </motion.div>
          </div>

          <div className="mt-5">
            <h3 className="font-heading text-xl font-bold text-black transition-colors duration-300 group-hover:text-accent">
              {project.title}
            </h3>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
