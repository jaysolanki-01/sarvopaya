"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { InstagramPost } from "@/lib/instagram";

gsap.registerPlugin(ScrollTrigger);

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function PostCard({ post }: { post: InstagramPost }) {
  const imgSrc =
    post.media_type === "VIDEO" ? post.thumbnail_url ?? post.media_url : post.media_url;
  const caption = post.caption
    ? post.caption.length > 100
      ? post.caption.slice(0, 97) + "…"
      : post.caption
    : null;

  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="ig-card group relative block flex-none overflow-hidden rounded-xl bg-black/5"
      style={{ width: "clamp(200px, 24vw, 280px)", aspectRatio: "1" }}
      aria-label={caption ?? "Instagram post"}
    >
      {/* Image */}
      {imgSrc && (
        <img
          src={imgSrc}
          alt={caption ?? ""}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      )}

      {/* Video badge */}
      {post.media_type === "VIDEO" && (
        <span className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white backdrop-blur-sm">
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {caption && (
          <p className="mb-2 text-xs leading-relaxed text-white/90 line-clamp-3">{caption}</p>
        )}
        <div className="flex items-center gap-1.5 text-white/70">
          <InstagramIcon />
          <span className="text-[10px] font-semibold uppercase tracking-widest">View post</span>
        </div>
      </div>
    </a>
  );
}

interface InstagramStripProps {
  posts: InstagramPost[];
  handle?: string;
}

export function InstagramStrip({ posts, handle = "sarvopaya" }: InstagramStripProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const header = section.querySelector(".ig-header");
      const cards = section.querySelectorAll<HTMLElement>(".ig-card");

      gsap.set([header, ...cards], { opacity: 0, y: 32 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 85%", once: true },
      });

      tl.to(header, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0).to(
        cards,
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: "power2.out" },
        0.15,
      );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="py-16 md:py-24">
      {/* Header */}
      <div className="ig-header mx-auto mb-10 flex max-w-7xl flex-col items-start gap-1 px-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="mb-1 inline-block text-[10px] font-bold uppercase tracking-widest text-black/40">
            Social
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
            Follow us on Instagram
          </h2>
        </div>
        <a
          href={`https://www.instagram.com/${handle}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-semibold text-black/50 transition-colors hover:text-black"
        >
          <InstagramIcon />
          @{handle}
        </a>
      </div>

      {/* Scrollable strip */}
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent" />

        <div
          className="flex gap-4 overflow-x-auto px-6 pb-2 scrollbar-hide"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {/* Left spacer so first card clears the left edge fade */}
          <div className="flex-none" style={{ width: "max(0px, calc((100vw - 1280px)/2))" }} />
          {posts.map((post) => (
            <div key={post.id} style={{ scrollSnapAlign: "start" }}>
              <PostCard post={post} />
            </div>
          ))}
          {/* Right spacer */}
          <div className="flex-none" style={{ width: "max(0px, calc((100vw - 1280px)/2))" }} />
        </div>
      </div>
    </section>
  );
}
