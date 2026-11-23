"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const CX = 160;
const CY = 160;
const R_OUTER = 148;
const R_DASHED = 132;
const R_MID = 112;
const R_INNER = 82;
const R_CENTER = 54;
const R_DOT = 95;

function circumference(r: number) {
  return 2 * Math.PI * r;
}

// Tick mark positions at 12/3/6/9 o'clock
const TICKS = [0, 90, 180, 270].map((deg) => {
  const rad = (deg - 90) * (Math.PI / 180);
  return {
    x1: CX + (R_INNER + 4) * Math.cos(rad),
    y1: CY + (R_INNER + 4) * Math.sin(rad),
    x2: CX + (R_MID - 4) * Math.cos(rad),
    y2: CY + (R_MID - 4) * Math.sin(rad),
  };
});

export function BrandStamp() {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const el = svgRef.current;
      if (!el || typeof window === "undefined") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const outerRing = el.querySelector<SVGCircleElement>(".bs-outer");
      const midRing = el.querySelector<SVGCircleElement>(".bs-mid");
      const innerRing = el.querySelector<SVGCircleElement>(".bs-inner");
      const dashedRing = el.querySelector<SVGCircleElement>(".bs-dashed");
      const centerG = el.querySelector<SVGGElement>(".bs-center");
      const textEl = el.querySelector<SVGTextElement>(".bs-text");
      const dots = el.querySelectorAll<SVGCircleElement>(".bs-dot");
      const ticks = el.querySelectorAll<SVGLineElement>(".bs-tick");
      const crossLines = el.querySelectorAll<SVGLineElement>(".bs-cross");

      // Set initial draw state for rings
      if (outerRing) {
        const len = circumference(R_OUTER);
        gsap.set(outerRing, { strokeDasharray: len, strokeDashoffset: len });
      }
      if (midRing) {
        const len = circumference(R_MID);
        gsap.set(midRing, { strokeDasharray: len, strokeDashoffset: len });
      }
      if (innerRing) {
        const len = circumference(R_INNER);
        gsap.set(innerRing, { strokeDasharray: len, strokeDashoffset: len });
      }

      // Hide everything initially
      gsap.set([textEl, dots, ticks, crossLines], { opacity: 0 });
      gsap.set(dashedRing, { opacity: 0 });
      if (centerG) {
        gsap.set(centerG, { opacity: 0, scale: 0, transformOrigin: `${CX}px ${CY}px` });
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });

      // Draw outer ring
      tl.to(outerRing, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }, 0)
        // Dashed ring fade in after outer draws
        .to(dashedRing, { opacity: 0.2, duration: 0.6, ease: "power2.out" }, 0.6)
        // Draw mid ring
        .to(midRing, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" }, 0.4)
        // Draw inner ring
        .to(innerRing, { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" }, 0.7)
        // Tick marks
        .to(ticks, { opacity: 0.5, duration: 0.4, stagger: 0.08, ease: "power2.out" }, 0.9)
        // Cross lines (crosshair)
        .to(crossLines, { opacity: 0.15, duration: 0.4, stagger: 0.06, ease: "power2.out" }, 1.0)
        // Center node — elastic spring in
        .to(
          centerG,
          { opacity: 1, scale: 1, duration: 0.9, ease: "elastic.out(1, 0.5)" },
          1.0,
        )
        // Circular text
        .to(textEl, { opacity: 0.4, duration: 0.7, ease: "power2.out" }, 1.2)
        // Compass dots stagger
        .to(dots, { opacity: 1, duration: 0.35, stagger: 0.1, ease: "back.out(2)" }, 1.3);

      // Continuous slow rotation on dashed ring
      if (dashedRing) {
        gsap.to(dashedRing, {
          rotation: 360,
          duration: 24,
          repeat: -1,
          ease: "none",
          transformOrigin: `${CX}px ${CY}px`,
        });
      }
    },
    { scope: svgRef },
  );

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 320 320"
      className="h-auto w-full select-none"
      aria-hidden="true"
    >
      <defs>
        {/* Path for circular text */}
        <path
          id="bs-text-ring"
          d={`M${CX},${CY} m-${R_DASHED},0 a${R_DASHED},${R_DASHED} 0 1,1 ${R_DASHED * 2},0 a${R_DASHED},${R_DASHED} 0 1,1 -${R_DASHED * 2},0`}
        />
      </defs>

      {/* Outer solid ring — drawn via strokeDashoffset */}
      <circle
        className="bs-outer"
        cx={CX}
        cy={CY}
        r={R_OUTER}
        fill="none"
        stroke="black"
        strokeWidth="1.5"
      />

      {/* Slowly rotating dashed ring */}
      <circle
        className="bs-dashed"
        cx={CX}
        cy={CY}
        r={R_DASHED}
        fill="none"
        stroke="black"
        strokeWidth="0.8"
        strokeDasharray="2 9"
      />

      {/* Mid ring */}
      <circle
        className="bs-mid"
        cx={CX}
        cy={CY}
        r={R_MID}
        fill="none"
        stroke="black"
        strokeWidth="0.7"
        strokeOpacity="0.45"
      />

      {/* Inner ring — accent */}
      <circle
        className="bs-inner"
        cx={CX}
        cy={CY}
        r={R_INNER}
        fill="none"
        stroke="#ed2830"
        strokeWidth="1.2"
        strokeOpacity="0.7"
      />

      {/* Compass tick marks at 12/3/6/9 */}
      {TICKS.map((t, i) => (
        <line
          key={i}
          className="bs-tick"
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          stroke="#ed2830"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ))}

      {/* Crosshair lines inside inner ring */}
      <line className="bs-cross" x1={CX} y1={CY - R_INNER + 10} x2={CX} y2={CY - R_CENTER - 6} stroke="black" strokeWidth="0.6" />
      <line className="bs-cross" x1={CX} y1={CY + R_CENTER + 6} x2={CX} y2={CY + R_INNER - 10} stroke="black" strokeWidth="0.6" />
      <line className="bs-cross" x1={CX - R_INNER + 10} y1={CY} x2={CX - R_CENTER - 6} y2={CY} stroke="black" strokeWidth="0.6" />
      <line className="bs-cross" x1={CX + R_CENTER + 6} y1={CY} x2={CX + R_INNER - 10} y2={CY} stroke="black" strokeWidth="0.6" />

      {/* Circular text path */}
      <text className="bs-text" fill="black" fontSize="8" fontFamily="inherit" fontWeight="700" letterSpacing="2.8">
        <textPath href="#bs-text-ring" startOffset="2%">
          BRAND IDENTITY · STRATEGY · VISUAL SYSTEM · POSITIONING ·
        </textPath>
      </text>

      {/* Compass dots at N/E/S/W on the dot ring */}
      {[0, 90, 180, 270].map((deg, i) => {
        const rad = (deg - 90) * (Math.PI / 180);
        return (
          <circle
            key={i}
            className="bs-dot"
            cx={CX + R_DOT * Math.cos(rad)}
            cy={CY + R_DOT * Math.sin(rad)}
            r="3"
            fill="#ed2830"
          />
        );
      })}

      {/* Center node */}
      <g className="bs-center">
        <circle cx={CX} cy={CY} r={R_CENTER} fill="black" />
        <circle cx={CX} cy={CY} r={R_CENTER} fill="none" stroke="#ed2830" strokeWidth="1" strokeOpacity="0.4" />
        {/* Monogram */}
        <text
          x={CX}
          y={CY - 5}
          textAnchor="middle"
          fill="white"
          fontSize="20"
          fontFamily="inherit"
          fontWeight="900"
          letterSpacing="-0.5"
        >
          B·D
        </text>
        <text
          x={CX}
          y={CY + 14}
          textAnchor="middle"
          fill="white"
          fontSize="6"
          fontFamily="inherit"
          fontWeight="700"
          letterSpacing="2.5"
          fillOpacity="0.45"
        >
          BRANDING
        </text>
      </g>
    </svg>
  );
}
