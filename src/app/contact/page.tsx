"use client";

import { useState, useRef, type FormEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const overlayVariants = {
  rest: { scaleX: 0 },
  hover: { scaleX: 1 },
};

const arrowVariants = {
  rest: { x: 0 },
  hover: { x: 3 },
};

const fieldClass =
  "w-full rounded-2xl border border-black/10 bg-black/[0.02] px-5 py-4 text-base text-black placeholder:text-black/35 outline-none transition-colors duration-300 focus:border-accent focus:bg-white";

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Sarvopaya",
  url: "https://sarvopaya.com/contact",
  mainEntity: {
    "@type": "Organization",
    name: "Sarvopaya",
    email: "jay.sarvopaya@gmail.com",
    telephone: "+91-92655-03415",
    address: {
      "@type": "PostalAddress",
      streetAddress: "C-1102, PNTC, Times Of India Press Road, Vejalpur",
      addressLocality: "Ahmedabad",
      postalCode: "380015",
      addressCountry: "IN",
    },
  },
};

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const SERVICES = [
  "Performance Marketing",
  "Advertising",
  "SEO",
  "Social Media Marketing",
  "Website Development",
  "AI & Automation",
  "Growth Consulting",
  "Other",
];

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const fd = new FormData(event.currentTarget);
    const payload = {
      name:    fd.get("name") as string,
      email:   fd.get("email") as string,
      phone:   fd.get("phone") as string,
      service: fd.get("service") as string,
      note:    fd.get("note") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg((data as { error?: string }).error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      formRef.current?.reset();
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <section className="relative w-full overflow-hidden bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-10 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-28">
        {/* Left form */}
        <div className="relative flex flex-col justify-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-black/60"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Get In Touch
            </motion.span>

            <motion.h1 variants={fadeUp} className="mt-6 max-w-xl text-black">
              <span className="block font-body text-xl font-normal text-black/40 sm:text-2xl">
                We&rsquo;d love to hear from you
              </span>
              <span className="mt-1 block text-4xl font-medium leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
                Let&rsquo;s talk{" "}
                <span className="font-body font-bold italic text-accent">
                  growth
                </span>
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-lg text-base leading-7 text-black/60 sm:text-lg"
            >
              Sarvopaya is a creative media, technology and AI company built
              for ambitious brands. Tell us where you are and where you want
              to be  we&rsquo;ll get back to you within one business day.
            </motion.p>

            <motion.form
              ref={formRef}
              variants={fadeUp}
              onSubmit={handleSubmit}
              className="mt-10 flex flex-col gap-4"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Name*"
                  className={fieldClass}
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email*"
                  className={fieldClass}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Phone Number*"
                  className={fieldClass}
                />
                <select
                  name="service"
                  className={`${fieldClass} cursor-pointer`}
                  defaultValue=""
                >
                  <option value="" disabled>Service Interested In</option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <textarea
                  name="note"
                  rows={4}
                  placeholder="Note tell us about your business or goals"
                  className={`${fieldClass} resize-none pr-20`}
                />
                <motion.div
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                  className="absolute bottom-4 right-4"
                >
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    aria-label="Send message"
                    className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-black disabled:opacity-60"
                  >
                    <motion.span
                      aria-hidden="true"
                      variants={overlayVariants}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="absolute inset-0 origin-left bg-accent"
                    />
                    <motion.span
                      variants={arrowVariants}
                      transition={{ duration: 0.3 }}
                      className="relative z-10 text-white"
                    >
                      {status === "loading" ? (
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" strokeOpacity=".25" />
                          <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                        </svg>
                      ) : (
                        <ArrowIcon />
                      )}
                    </motion.span>
                  </button>
                </motion.div>
              </div>

              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm font-medium text-accent"
                >
                  Thanks we&rsquo;ll be in touch shortly.
                </motion.p>
              )}

              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm font-medium text-red-600"
                >
                  {errorMsg}
                </motion.p>
              )}
            </motion.form>

            <motion.div
              variants={fadeUp}
              className="mt-14 divide-y divide-black/10 border-t border-black/10"
            >
              <div className="flex flex-col gap-1.5 py-5 sm:flex-row sm:items-baseline sm:gap-6">
                <p className="shrink-0 text-xs font-semibold uppercase tracking-widest text-black/40 sm:w-44">
                  Email
                </p>
                <a
                  href="mailto:jay.sarvopaya@gmail.com"
                  className="break-words text-base font-semibold text-black transition-colors duration-300 hover:text-accent sm:text-lg"
                >
                  jay.sarvopaya@gmail.com
                </a>
              </div>
              <div className="flex flex-col gap-1.5 py-5 sm:flex-row sm:items-baseline sm:gap-6">
                <p className="shrink-0 text-xs font-semibold uppercase tracking-widest text-black/40 sm:w-44">
                  Phone
                </p>
                <a
                  href="tel:+919265503415"
                  className="break-words text-base font-semibold text-black transition-colors duration-300 hover:text-accent sm:text-lg"
                >
                  +91 92655 03415
                </a>
              </div>
              <div className="flex flex-col gap-1.5 py-5 sm:flex-row sm:items-baseline sm:gap-6">
                <p className="shrink-0 text-xs font-semibold uppercase tracking-widest text-black/40 sm:w-44">
                  India
                </p>
                <p className="max-w-sm text-base font-semibold leading-6 text-black sm:text-lg">
                  C-1102, PNTC, Times Of India Press Road, Vejalpur,
                  Ahmedabad - 380015
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right dummy image panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative flex min-h-[360px] items-center justify-center overflow-hidden rounded-[2.5rem] bg-black p-10 shadow-xl shadow-black/5 sm:min-h-[480px] lg:min-h-full"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-10 -right-8 select-none whitespace-nowrap text-[140px] font-bold uppercase leading-none text-transparent sm:text-[200px]"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.06)" }}
          >
            UPAYA
          </span>

          <div
            aria-hidden="true"
            className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-16 -right-10 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
          />

          <div className="relative flex flex-col items-center gap-6 text-center">
            <div className="relative flex h-56 w-56 items-center justify-center sm:h-64 sm:w-64">
              <motion.svg
                viewBox="0 0 200 200"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                className="h-full w-full"
              >
                <defs>
                  <path
                    id="contactBadgeCircle"
                    fill="none"
                    d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0"
                  />
                </defs>
                <text
                  className="fill-white/50 uppercase"
                  fontSize="12.5"
                  fontWeight={600}
                  letterSpacing="3"
                >
                  <textPath href="#contactBadgeCircle" startOffset="0%">
                    Sarvopaya &bull; Let&rsquo;s Connect &bull; Sarvopaya &bull;
                    Let&rsquo;s Connect &bull;
                  </textPath>
                </text>
              </motion.svg>

              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/images/Main_icon.png"
                  alt="Sarvopaya"
                  width={500}
                  height={500}
                  className="h-24 w-24 drop-shadow-lg sm:h-28 sm:w-28"
                />
              </div>
            </div>

          
          </div>
        </motion.div>
      </div>
    </section>
  );
}
