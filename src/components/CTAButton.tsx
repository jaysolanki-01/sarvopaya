"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type CTAButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "inverted" | "outline";
  size?: "sm" | "lg";
  fullWidth?: boolean;
  onClick?: () => void;
};

const overlayVariants = {
  rest: { scaleX: 0 },
  hover: { scaleX: 1 },
};

const arrowVariants = {
  rest: { x: 0 },
  hover: { x: 4 },
};

const labelVariants = {
  primary: {
    rest: { color: "#ffffff" },
    hover: { color: "#ffffff" },
  },
  inverted: {
    rest: { color: "#000000" },
    hover: { color: "#ffffff" },
  },
  outline: {
    rest: { color: "#000000" },
    hover: { color: "#ffffff" },
  },
};

const sizeClasses = {
  sm: "px-5 py-2.5 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function CTAButton({
  href,
  children,
  variant = "primary",
  size = "sm",
  fullWidth = false,
  onClick,
}: CTAButtonProps) {
  const baseBg = variant === "primary" ? "bg-black" : "bg-white";
  const outlineBorder = variant === "outline" ? "border border-black" : "";

  return (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover="hover"
      className={fullWidth ? "block w-full" : "inline-block"}
    >
      <Link
        href={href}
        onClick={onClick}
        className={`relative flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold ${baseBg} ${outlineBorder} ${sizeClasses[size]} ${
          fullWidth ? "w-full" : ""
        }`}
      >
        <motion.span
          aria-hidden="true"
          variants={overlayVariants}
          transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
          className="absolute inset-0 origin-left bg-accent"
        />
        <motion.span
          variants={labelVariants[variant]}
          transition={{ duration: 0.25 }}
          className="relative z-10 flex items-center gap-2"
        >
          {children}
          <motion.span variants={arrowVariants} transition={{ duration: 0.3 }} aria-hidden="true">
            &rarr;
          </motion.span>
        </motion.span>
      </Link>
    </motion.div>
  );
}
