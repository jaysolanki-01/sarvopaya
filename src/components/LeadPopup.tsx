"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "sarvopaya_lead_popup_shown";

export default function LeadPopup() {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }

    const timer = setTimeout(() => {
      setVisible(true);
      try { localStorage.setItem(STORAGE_KEY, "1"); } catch { /* ignore */ }
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  function close() { setVisible(false); }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name:    fd.get("name") as string,
          email:   fd.get("email") as string,
          phone:   fd.get("phone") as string,
          service: "Popup Lead",
          note:    "Submitted via 15-second popup",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg((data as { error?: string }).error ?? "Something went wrong.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  const fieldClass =
    "w-full rounded-xl border border-black/10 bg-black/[0.03] px-4 py-3 text-sm text-black placeholder:text-black/35 outline-none transition-colors focus:border-black/30 focus:bg-white";

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
            onClick={close}
          />

          {/* Modal */}
          <motion.div
            key="popup"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 bottom-0 z-[91] mx-auto mb-6 max-w-md rounded-3xl bg-white p-7 shadow-2xl sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2"
          >
            {/* Close button */}
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-black/40 hover:bg-black/[0.05] hover:text-black transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>

            {status === "success" ? (
              <div className="flex flex-col items-center py-6 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
                  <svg className="h-7 w-7 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black">You&apos;re on the list!</h3>
                <p className="mt-2 text-sm text-black/55">We&apos;ll be in touch within one business day.</p>
                <button
                  onClick={close}
                  className="mt-6 rounded-xl bg-black px-6 py-2.5 text-sm font-semibold text-white hover:bg-black/80 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="mb-5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-black/[0.05] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black/50">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Free Consultation
                  </span>
                  <h2 className="mt-3 text-2xl font-bold leading-tight text-black">
                    Ready to grow faster?
                  </h2>
                  <p className="mt-1.5 text-sm text-black/55">
                    Drop your details and we&apos;ll reach out with a free growth audit.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                    className={fieldClass}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    required
                    className={fieldClass}
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number (optional)"
                    className={fieldClass}
                  />

                  {errorMsg && (
                    <p className="text-xs text-red-500">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="mt-1 w-full rounded-xl bg-black py-3 text-sm font-bold text-white transition-colors hover:bg-black/80 disabled:opacity-60"
                  >
                    {status === "loading" ? "Sending…" : "Get My Free Audit →"}
                  </button>

                  <p className="text-center text-[10px] text-black/35">
                    No spam. We reply within 1 business day.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
