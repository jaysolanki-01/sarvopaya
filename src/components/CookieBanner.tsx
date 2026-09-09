"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const STORAGE_KEY = "sarvopaya_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      /* storage blocked */
    }
  }, []);

  function accept() { save("accepted"); }
  function decline() { save("declined"); }

  function save(choice: string) {
    try { localStorage.setItem(STORAGE_KEY, choice); } catch { /* ignore */ }
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-banner"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 z-[80] mx-auto max-w-2xl rounded-2xl border border-black/[0.08] bg-white px-5 py-4 shadow-xl sm:bottom-6 sm:left-6 sm:right-auto sm:px-6 sm:py-5"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            {/* Icon + text */}
            <div className="flex items-start gap-3 flex-1">
              <span className="mt-0.5 text-lg select-none" aria-hidden>🍪</span>
              <p className="text-sm leading-relaxed text-black/65">
                We use cookies to improve your experience and analyse site traffic.
                By clicking{" "}
                <span className="font-semibold text-black">Accept</span>, you
                agree to our{" "}
                <Link
                  href="/privacy-policy"
                  className="underline underline-offset-2 hover:text-black transition-colors"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={decline}
                className="rounded-xl border border-black/10 px-4 py-2 text-xs font-semibold text-black/55 hover:border-black/25 hover:text-black transition-colors"
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="rounded-xl bg-black px-4 py-2 text-xs font-bold text-white hover:bg-black/80 transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
