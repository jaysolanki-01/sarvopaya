"use client";

import { useEffect, useState } from "react";
import { getCalApi } from "@calcom/embed-react";

export default function BookMeeting() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 1200);
    (async () => {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="fixed right-0 top-1/2 z-50 -translate-y-1/2 transition-transform duration-700 ease-out"
      style={{ transform: `translateY(-50%) translateX(${mounted ? "0%" : "100%"})` }}
    >
      <button
        type="button"
        data-cal-namespace="30min"
        data-cal-link="jaysolanki/30min"
        data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
        aria-label="Book a 30-minute meeting"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex items-center overflow-hidden rounded-l-2xl border border-r-0 border-black/10 bg-white shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ed2830]/40"
        style={{ transition: "box-shadow 0.2s" }}
      >
        {/* Icon block */}
        <div
          className="flex h-[60px] shrink-0 items-center justify-center rounded-l-2xl bg-[#ed2830] transition-all duration-300"
          style={{ width: hovered ? 56 : 52 }}
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-white" aria-hidden="true">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Text panel — expands on hover */}
        <div
          className="flex flex-col justify-center overflow-hidden transition-all duration-300 ease-out"
          style={{
            maxWidth: hovered ? 160 : 0,
            opacity: hovered ? 1 : 0,
            paddingLeft: hovered ? 14 : 0,
            paddingRight: hovered ? 18 : 0,
          }}
        >
          <span className="whitespace-nowrap text-[13px] font-bold text-black">Book a Meeting</span>
          <span className="whitespace-nowrap text-[11px] text-black/45">30 min · Free</span>
        </div>
      </button>
    </div>
  );
}
