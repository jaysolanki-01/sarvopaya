"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

export default function BookMeeting() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <div className="fixed right-0 top-1/2 z-50 -translate-y-1/2">
      <button
        type="button"
        data-cal-namespace="30min"
        data-cal-link="jaysolanki/30min"
        data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
        className="flex flex-col items-center gap-1.5 rounded-l-2xl px-3 py-5 text-white shadow-xl transition-all duration-200 hover:px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        style={{ background: "#ed2830", writingMode: "vertical-rl" }}
        aria-label="Book a 30-minute meeting"
      >
        {/* Calendar icon */}
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4 shrink-0"
          style={{ writingMode: "horizontal-tb" }}
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clipRule="evenodd"
          />
        </svg>
        <span
          className="text-[11px] font-bold uppercase tracking-[0.15em]"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          Book a Meeting
        </span>
      </button>
    </div>
  );
}
