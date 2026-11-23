"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface MarqueeStripProps {
  children: ReactNode;
  /** Speed in pixels per second */
  speed?: number;
  /** Reverse direction */
  reverse?: boolean;
  /** Pause on hover */
  pauseOnHover?: boolean;
  gap?: number;
  className?: string;
  itemClassName?: string;
}

export function MarqueeStrip({
  children,
  speed = 60,
  reverse = false,
  pauseOnHover = true,
  gap = 32,
  className,
  itemClassName,
}: MarqueeStripProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Duplicate content for seamless loop
      const clone = track.children[0];
      if (!clone) return;

      const totalWidth = (clone as HTMLElement).offsetWidth + gap;
      const direction = reverse ? totalWidth : -totalWidth;
      const duration = totalWidth / speed;

      tweenRef.current = gsap.to(track, {
        x: direction,
        duration,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (x) => {
            const val = parseFloat(x);
            const mod = val % totalWidth;
            return `${mod === 0 ? 0 : mod}px`;
          },
        },
      });

      if (pauseOnHover) {
        const pause = () => tweenRef.current?.pause();
        const resume = () => tweenRef.current?.resume();
        track.parentElement?.addEventListener("mouseenter", pause);
        track.parentElement?.addEventListener("mouseleave", resume);

        return () => {
          track.parentElement?.removeEventListener("mouseenter", pause);
          track.parentElement?.removeEventListener("mouseleave", resume);
        };
      }
    },
    { scope: trackRef, dependencies: [speed, reverse] }
  );

  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <div
        ref={trackRef}
        style={{ display: "flex", gap, willChange: "transform", width: "max-content" }}
      >
        {/* Render twice so the loop is seamless */}
        <div className={`flex shrink-0 ${itemClassName ?? ""}`} style={{ gap }}>
          {children}
        </div>
        <div className={`flex shrink-0 ${itemClassName ?? ""}`} aria-hidden style={{ gap }}>
          {children}
        </div>
      </div>
    </div>
  );
}
