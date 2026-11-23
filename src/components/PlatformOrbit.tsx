"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export type PlatformId = "instagram" | "linkedin" | "youtube" | "facebook";

export const PLATFORM_DATA: Record<
  PlatformId,
  {
    label: string;
    abbr: string;
    color: string;
    x: number;
    y: number;
    bestFor: string;
    when: string;
    notFor: string;
    formats: string[];
  }
> = {
  instagram: {
    label: "Instagram",
    abbr: "IG",
    color: "#E1306C",
    x: 300,
    y: 68,
    bestFor: "Visual storytelling, brand discovery, D2C and lifestyle brands.",
    when:
      "When your product or service has strong visual appeal and your audience uses Instagram for discovery and inspiration.",
    notFor:
      "Complex B2B sales with long decision cycles and senior decision-makers who aren't active on the platform.",
    formats: ["Reels", "Carousels", "Stories", "Static posts", "DMs"],
  },
  linkedin: {
    label: "LinkedIn",
    abbr: "LI",
    color: "#0A66C2",
    x: 494,
    y: 240,
    bestFor: "B2B authority, founder positioning, lead generation, thought leadership.",
    when:
      "When you're selling to businesses, professionals, or decision-makers — founders, directors, C-suite.",
    notFor:
      "Impulse-purchase products and highly visual consumer brands with no professional angle.",
    formats: ["Text posts", "Documents", "Video", "Newsletters", "Lead Gen Forms"],
  },
  youtube: {
    label: "YouTube",
    abbr: "YT",
    color: "#FF0000",
    x: 300,
    y: 412,
    bestFor: "Long-form education, search visibility, brand authority, evergreen content.",
    when:
      "When your audience needs to understand something before buying — complex products, SaaS, professional services.",
    notFor:
      "Brands with no capacity for regular video production or those needing fast results.",
    formats: ["Explainers", "Tutorials", "Case studies", "Shorts", "Webinars"],
  },
  facebook: {
    label: "Facebook",
    abbr: "FB",
    color: "#1877F2",
    x: 106,
    y: 240,
    bestFor: "Community, remarketing, local business, and broader audience reach.",
    when:
      "When you have an existing audience to retarget, you're running local campaigns, or want to build a community.",
    notFor:
      "Brands targeting Gen Z exclusively or trying to drive organic discovery without paid support.",
    formats: ["Groups", "Ads", "Video", "Events", "Marketplace"],
  },
};

// Center of orbit
const CX = 300;
const CY = 240;

// Perpendicular-offset quadratic bezier from platform to center
function curvePath(px: number, py: number): string {
  const mx = (px + CX) / 2;
  const my = (py + CY) / 2;
  const dx = CX - px;
  const dy = CY - py;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len === 0) return `M${px} ${py} L${CX} ${CY}`;
  // Perpendicular offset for a gentle arc
  const nx = -dy / len;
  const ny = dx / len;
  const offset = 28;
  return `M${px} ${py} Q${mx + nx * offset} ${my + ny * offset} ${CX} ${CY}`;
}

interface PlatformOrbitProps {
  selected: PlatformId;
  onSelect: (id: PlatformId) => void;
}

export function PlatformOrbit({ selected, onSelect }: PlatformOrbitProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const el = svgRef.current;
      if (!el) return;

      // Initial hidden state
      gsap.set(el.querySelectorAll(".pn-g"), { opacity: 0, y: 12 });
      gsap.set(el.querySelectorAll(".cc-path"), { opacity: 0 });
      gsap.set(el.querySelector(".cn-g"), { opacity: 0, scale: 0, transformOrigin: `${CX}px ${CY}px` });

      ScrollTrigger.create({
        trigger: el,
        start: "top 78%",
        once: true,
        onEnter: () => {
          // Center node entrance
          gsap.to(el.querySelector(".cn-g"), {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "elastic.out(1,0.5)",
          });
          // Connection paths
          gsap.to(el.querySelectorAll(".cc-path"), {
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            delay: 0.4,
            ease: "power2.out",
          });
          // Platform nodes
          gsap.to(el.querySelectorAll(".pn-g"), {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.11,
            delay: 0.55,
            ease: "power2.out",
          });
        },
      });

      // Center breathing pulse
      const pulse = el.querySelector(".cn-pulse");
      if (pulse) {
        gsap.set(pulse, { transformOrigin: `${CX}px ${CY}px` });
        gsap.to(pulse, {
          scale: 1.45,
          opacity: 0,
          duration: 2,
          repeat: -1,
          ease: "power1.out",
        });
      }
    },
    { scope: svgRef }
  );

  const platforms = Object.entries(PLATFORM_DATA) as [PlatformId, (typeof PLATFORM_DATA)[PlatformId]][];

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 600 480"
      className="w-full h-auto select-none"
      aria-label="Platform orbit — click a platform to see its strategy"
    >
      {/* Defs: bezier path shapes for animateMotion */}
      <defs>
        {platforms.map(([id, p]) => (
          <path key={id} id={`op-${id}`} d={curvePath(p.x, p.y)} />
        ))}
      </defs>

      {/* Orbit guide rings */}
      <circle
        cx={CX}
        cy={CY}
        r="195"
        fill="none"
        stroke="rgba(255,255,255,0.04)"
        strokeWidth="1"
        strokeDasharray="5 10"
      />
      <circle
        cx={CX}
        cy={CY}
        r="140"
        fill="none"
        stroke="rgba(255,255,255,0.025)"
        strokeWidth="1"
      />

      {/* Connection curves (static, highlighted when selected) */}
      {platforms.map(([id, p]) => (
        <path
          key={id}
          className="cc-path"
          d={curvePath(p.x, p.y)}
          fill="none"
          stroke={selected === id ? p.color : "rgba(255,255,255,0.1)"}
          strokeWidth={selected === id ? 1.5 : 0.75}
          style={{ transition: "stroke 0.35s ease, stroke-width 0.35s ease" }}
        />
      ))}

      {/* Animated signal dots — SMIL animateMotion along bezier paths */}
      {platforms.map(([id, p], i) => (
        <circle
          key={`dot-${id}`}
          r={selected === id ? 5.5 : 3.5}
          fill={p.color}
          opacity={selected === id ? 0.9 : 0.35}
          style={{ transition: "opacity 0.35s, r 0.35s" }}
        >
          <animateMotion
            dur={`${2.2 + i * 0.45}s`}
            repeatCount="indefinite"
            begin={`${i * 0.55}s`}
          >
            <mpath href={`#op-${id}`} />
          </animateMotion>
        </circle>
      ))}

      {/* Center "Your Brand" node */}
      <g className="cn-g">
        {/* Breathing pulse ring */}
        <circle
          className="cn-pulse"
          cx={CX}
          cy={CY}
          r="46"
          fill="none"
          stroke="#ed2830"
          strokeWidth="1"
          strokeOpacity="0.35"
        />
        {/* Node body */}
        <circle cx={CX} cy={CY} r="46" fill="#0d0d0d" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
        {/* Accent ring */}
        <circle cx={CX} cy={CY} r="46" fill="none" stroke="#ed2830" strokeWidth="1" strokeOpacity="0.4" />
        <text
          x={CX}
          y={CY - 6}
          textAnchor="middle"
          fill="white"
          fontSize="9"
          fontFamily="inherit"
          fontWeight="700"
          letterSpacing="1.5"
        >
          YOUR
        </text>
        <text
          x={CX}
          y={CY + 9}
          textAnchor="middle"
          fill="white"
          fontSize="9"
          fontFamily="inherit"
          fontWeight="700"
          letterSpacing="1.5"
        >
          BRAND
        </text>
      </g>

      {/* Platform nodes */}
      {platforms.map(([id, p]) => {
        const isSel = selected === id;
        // Label position: above node if at top, below if at bottom
        const labelY = p.y < CY ? p.y - 50 : p.y + 54;

        return (
          <g
            key={id}
            className="pn-g"
            onClick={() => onSelect(id)}
            role="button"
            aria-label={`Select ${p.label}`}
            aria-pressed={isSel}
            style={{ cursor: "pointer" }}
          >
            {/* Selection glow ring */}
            {isSel && (
              <circle cx={p.x} cy={p.y} r="48" fill="none" stroke={p.color} strokeWidth="1" strokeOpacity="0.3" />
            )}
            {/* Node background */}
            <circle
              cx={p.x}
              cy={p.y}
              r="38"
              fill={isSel ? `${p.color}1a` : "#111"}
              stroke={isSel ? p.color : "rgba(255,255,255,0.14)"}
              strokeWidth={isSel ? 2 : 1}
              style={{ transition: "fill 0.35s, stroke 0.35s, stroke-width 0.35s" }}
            />
            {/* Platform abbreviation */}
            <text
              x={p.x}
              y={p.y + 5}
              textAnchor="middle"
              fill="white"
              fontSize="13"
              fontFamily="inherit"
              fontWeight="800"
            >
              {p.abbr}
            </text>
            {/* Platform name label */}
            <text
              x={p.x}
              y={labelY}
              textAnchor="middle"
              fill={isSel ? "white" : "rgba(255,255,255,0.45)"}
              fontSize="10"
              fontFamily="inherit"
              fontWeight={isSel ? "600" : "400"}
              style={{ transition: "fill 0.35s, font-weight 0.35s" }}
            >
              {p.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
