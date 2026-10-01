"use client";

import { useState, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import FinalCTA from "@/components/FinalCTA";
import { blogPosts } from "@/lib/blogPosts";

const EASE = [0.16, 1, 0.3, 1] as const;

const up = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const seq = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export default function BlogsPage() {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const heroRef = useRef<HTMLDivElement>(null);
  const heroIv = useInView(heroRef, { once: true, amount: 0.3 });

  // Extract unique categories
  const categories = useMemo(() => {
    const tags = new Set<string>();
    blogPosts.forEach((p) => tags.add(p.tag));
    return ["All", ...Array.from(tags)];
  }, []);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = selectedTag === "All" || post.tag === selectedTag;
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tag.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedTag, searchQuery]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Sarvopaya Growth & Marketing Blogs",
    description: "In-depth guides, playbooks and strategic insights on AI automation, performance marketing, SEO, and business growth from Sarvopaya.",
    url: "https://www.sarvopaya.com/resource/blogs",
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      url: `https://www.sarvopaya.com/resource/blogs/${post.slug}`,
      author: {
        "@type": "Person",
        name: post.author,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white pb-16 pt-32 sm:pb-20 sm:pt-36" ref={heroRef}>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 select-none font-black uppercase leading-none text-black/[0.03]"
          style={{ fontSize: "clamp(80px,16vw,220px)" }}
        >
          BLOGS
        </span>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={heroIv ? "show" : "hidden"}>
            {/* Subpage Navigation Switcher */}
            <motion.div variants={up} className="mb-6 flex flex-wrap items-center gap-2">
              <Link
                href="/resources"
                className="rounded-full border border-black/10 px-4 py-1.5 text-xs font-semibold text-black/60 transition-colors hover:border-black/30 hover:text-black"
              >
                Case Studies & Work
              </Link>
              <span className="rounded-full bg-black px-4 py-1.5 text-xs font-bold text-white shadow-sm">
                Blogs & Insights
              </span>
              <Link
                href="/resources/founders-pov"
                className="rounded-full border border-black/10 px-4 py-1.5 text-xs font-semibold text-black/60 transition-colors hover:border-black/30 hover:text-black"
              >
                Founder&apos;s POVs
              </Link>
            </motion.div>

            <motion.h1
              variants={up}
              className="font-heading text-4xl font-black leading-[1.08] tracking-tight text-black sm:text-5xl lg:text-6xl"
            >
              Growth Playbooks, Guides &{" "}
              <span className="text-[var(--accent)]">Marketing Insights</span>
            </motion.h1>

            <motion.p
              variants={up}
              className="mt-6 max-w-2xl text-base leading-relaxed text-black/60 sm:text-lg"
            >
              Actionable breakdowns of what actually scales modern brands. Performance marketing systems,
              AI workflow automation, SEO engineering, and real lessons from the trenches.
            </motion.p>

            {/* Filter and Search Bar */}
            <motion.div
              variants={up}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedTag(cat)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                      selectedTag === cat
                        ? "bg-black text-white shadow-sm"
                        : "border border-black/10 text-black/60 hover:border-black/25 hover:text-black"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-black/10 bg-black/[0.02] px-4 py-2.5 pl-9 text-xs text-black placeholder:text-black/35 outline-none transition-colors focus:border-black/30 focus:bg-white"
                />
                <svg
                  className="pointer-events-none absolute left-3 top-3 h-3.5 w-3.5 text-black/35"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── ARTICLES GRID ── */}
      <section className="bg-white pb-32 pt-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-black/15 bg-black/[0.015] p-12 text-center">
              <p className="font-heading text-lg font-bold text-black">No articles match your query</p>
              <p className="mt-2 text-sm text-black/50">Try selecting a different category or clearing the search bar.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedTag("All");
                  setSearchQuery("");
                }}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-black px-5 py-2 text-xs font-bold text-white hover:bg-[var(--accent)] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
              {filteredPosts.map((post, i) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
                  className="group flex flex-col justify-between rounded-3xl border border-black/8 bg-white p-7 sm:p-9 transition-all duration-300 hover:border-black/15 hover:shadow-xl"
                >
                  <div>
                    {/* Top tags and read time */}
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                        {post.tag}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-black/40">
                        <span>{post.date}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="mt-5 font-heading text-xl font-bold leading-snug text-black transition-colors duration-200 group-hover:text-[var(--accent)] sm:text-2xl">
                      <Link href={`/resource/blogs/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="mt-4 text-sm leading-relaxed text-black/60">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Author and Action footer */}
                  <div className="mt-8 flex items-center justify-between border-t border-black/6 pt-5">
                    <div className="flex items-center gap-3">
                      <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-black/10">
                        <Image
                          src="/images/jay-solanki.png"
                          alt={post.author}
                          fill
                          sizes="32px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-black">{post.author}</p>
                        <p className="text-[10px] text-black/40">Founder, Sarvopaya</p>
                      </div>
                    </div>

                    <Link
                      href={`/resource/blogs/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-black/40 transition-colors duration-200 group-hover:text-[var(--accent)]"
                    >
                      Read Guide
                      <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {/* More coming banner */}
          <div className="mt-16 rounded-3xl border border-black/8 bg-black/[0.02] p-8 text-center sm:p-10">
            <h3 className="font-heading text-xl font-bold text-black sm:text-2xl">
              Looking for tailored growth advice for your brand?
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-black/60">
              We analyze your funnel, paid ads, SEO, and operational bottlenecks on a 30-minute discovery call.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-black px-7 text-xs font-bold text-white transition-colors hover:bg-[var(--accent)]"
              >
                Book a Growth Strategy Call →
              </Link>
              <Link
                href="/resources/founders-pov"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-black/10 bg-white px-7 text-xs font-bold text-black transition-colors hover:border-black/30"
              >
                Read Founder&apos;s POVs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
