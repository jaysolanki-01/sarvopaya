"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins at module level — safe in "use client" files because
// module code only runs in the browser, never during SSR.
gsap.registerPlugin(ScrollTrigger);

export function GSAPInit() {
  useEffect(() => {
    gsap.defaults({ ease: "power2.out" });

    ScrollTrigger.config({
      ignoreMobileResize: true,
      // Prevents jumpiness from dynamic viewport height changes on mobile
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    });

    // Normalize scroll only when Lenis is NOT present (Lenis handles its own normalization)
    ScrollTrigger.normalizeScroll(false);
  }, []);

  return null;
}
