"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { InstagramIcon } from "@/components/icons";
import type { InstagramPost } from "@/lib/instagram";

gsap.registerPlugin(ScrollTrigger);

function formatPostDate(timestamp: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(timestamp));
  } catch {
    return "";
  }
}

function PostCard({ post }: { post: InstagramPost }) {
  const imgSrc =
    post.media_type === "VIDEO"
      ? post.thumbnail_url ?? post.media_url
      : post.media_url;
  const caption = post.caption
    ? post.caption.length > 115
      ? post.caption.slice(0, 112) + "…"
      : post.caption
    : null;
  const formattedDate = formatPostDate(post.timestamp);

  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="ig-card group relative block flex-none overflow-hidden rounded-2xl border border-black/10 bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      style={{ width: "clamp(240px, 26vw, 320px)", aspectRatio: "4 / 5" }}
      aria-label={caption ?? "View Instagram post"}
    >
      {imgSrc && (
        // External Instagram CDN URLs rotate dynamically across fbcdn/cdninstagram hosts
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imgSrc}
          alt={caption ?? "Instagram post from Sarvopaya"}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      )}

      {/* Media Type Indicator */}
      {post.media_type === "VIDEO" && (
        <span
          aria-label="Reel or video"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-sm"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-3.5 w-3.5 translate-x-0.5"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      )}

      {post.media_type === "CAROUSEL_ALBUM" && (
        <span
          aria-label="Carousel post"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-sm"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-3.5 w-3.5"
            aria-hidden="true"
          >
            <rect x="4" y="4" width="12" height="12" rx="2" />
            <path d="M8 20h10a2 2 0 0 0 2-2V8" />
          </svg>
        </span>
      )}

      {/* Hover Editorial Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        {formattedDate && (
          <p className="mb-1.5 text-[11px] font-medium text-white/65">
            {formattedDate}
          </p>
        )}
        {caption && (
          <p className="mb-3 line-clamp-3 text-xs leading-relaxed text-white/95">
            {caption}
          </p>
        )}
        <div className="flex items-center gap-2 text-xs font-semibold text-white">
          <InstagramIcon className="h-3.5 w-3.5 text-accent" />
          <span>View on Instagram</span>
          <span aria-hidden="true">&rarr;</span>
        </div>
      </div>
    </a>
  );
}

export interface InstagramStripProps {
  posts: InstagramPost[];
  handle?: string;
  kicker?: string;
  heading?: string;
  subheading?: string;
  sectionId?: string;
}

export function InstagramStrip({
  posts,
  handle = "sarvopaya",
  kicker = "Social",
  heading = "Follow us on Instagram",
  subheading = "Daily D2C growth breakdowns, ad creative teardowns, and behind-the-scenes playbooks.",
  sectionId,
}: InstagramStripProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const header = section.querySelector(".ig-header");
      const cards = section.querySelectorAll<HTMLElement>(".ig-card");
      const targets = [header, ...Array.from(cards)].filter(Boolean);
      if (!targets.length) return;

      gsap.set(targets, { opacity: 0, y: 24 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 85%", once: true },
      });

      if (header) {
        tl.to(header, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }, 0);
      }
      if (cards.length) {
        tl.to(
          cards,
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power2.out" },
          0.12,
        );
      }
    },
    { scope: sectionRef, dependencies: [posts.length] },
  );

  const scrollByCard = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * 340, behavior: "smooth" });
  };

  const profileUrl = `https://www.instagram.com/${handle}/`;

  return (
    <section
      id={sectionId}
      ref={sectionRef}
      className="w-full border-b border-black/10 bg-white py-20 sm:py-24"
    >
      {/* Header */}
      <div className="ig-header mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-accent">{kicker}</p>
            <h2
              className="mt-2 font-heading text-3xl font-bold tracking-tight text-black sm:text-4xl"
              style={{ textWrap: "balance" }}
            >
              {heading}
            </h2>
            {subheading && (
              <p className="mt-3 text-sm leading-relaxed text-black/65 sm:text-base">
                {subheading}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            {posts.length > 0 && (
              <div className="hidden items-center gap-2 sm:flex">
                <button
                  type="button"
                  onClick={() => scrollByCard(-1)}
                  aria-label="Scroll Instagram posts left"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-black transition-colors hover:border-black hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span aria-hidden="true">&larr;</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollByCard(1)}
                  aria-label="Scroll Instagram posts right"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-black transition-colors hover:border-black hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            )}

            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:border-black hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <InstagramIcon className="h-4 w-4" />
              <span>@{handle}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Live Posts Strip OR Direct Channel Card */}
      {posts.length > 0 ? (
        <div className="relative mt-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent"
          />

          <div
            ref={scrollerRef}
            className="flex gap-5 overflow-x-auto px-4 pb-3 sm:px-6 scrollbar-hide"
            style={{ scrollSnapType: "x mandatory" }}
          >
            <div
              className="flex-none"
              style={{ width: "max(0px, calc((100vw - 1280px) / 2))" }}
            />
            {posts.map((post) => (
              <div key={post.id} style={{ scrollSnapAlign: "start" }}>
                <PostCard post={post} />
              </div>
            ))}
            <div
              className="flex-none"
              style={{ width: "max(0px, calc((100vw - 1280px) / 2))" }}
            />
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="ig-card flex flex-col items-start justify-between gap-8 rounded-2xl border border-black/10 bg-neutral-50 p-7 sm:p-10 lg:flex-row lg:items-center">
            <div className="flex items-start gap-4 sm:items-center">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-black text-white">
                <InstagramIcon className="h-6 w-6" />
              </div>
              <div>
                <p className="font-heading text-xl font-bold text-black">
                  @{handle}
                </p>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-black/65">
                  Watch short-form D2C unit economics breakdowns, Meta &amp;
                  Google ad creative audits, CRO teardowns, and founder notes
                  directly on Instagram.
                </p>
              </div>
            </div>

            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <InstagramIcon className="h-4 w-4" />
              <span>Open @{handle} on Instagram</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
