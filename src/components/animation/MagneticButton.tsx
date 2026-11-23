"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface MagneticButtonProps {
  children: ReactNode;
  /** Magnetic pull strength (0–1) */
  strength?: number;
  /** Animate only the inner element (not the wrapper) — useful for icon buttons */
  innerOnly?: boolean;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export function MagneticButton({
  children,
  strength = 0.4,
  innerOnly = false,
  className,
  as: Tag = "div",
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      // Disable on touch devices
      if (!window.matchMedia("(pointer: fine)").matches) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const handleMove = (e: globalThis.MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * strength;
        const dy = (e.clientY - cy) * strength;

        const target = innerOnly ? innerRef.current ?? el : el;
        gsap.to(target, { x: dx, y: dy, duration: 0.6, ease: "power2.out" });
      };

      const handleLeave = () => {
        const target = innerOnly ? innerRef.current ?? el : el;
        gsap.to(target, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
      };

      el.addEventListener("mousemove", handleMove);
      el.addEventListener("mouseleave", handleLeave);

      return () => {
        el.removeEventListener("mousemove", handleMove);
        el.removeEventListener("mouseleave", handleLeave);
      };
    },
    { scope: ref, dependencies: [strength, innerOnly] }
  );

  const Component = Tag as React.ElementType;
  return (
    <Component ref={ref} className={className}>
      {innerOnly ? (
        <span ref={innerRef} style={{ display: "inline-block" }}>
          {children}
        </span>
      ) : (
        children
      )}
    </Component>
  );
}
