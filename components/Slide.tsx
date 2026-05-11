"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import BrandLogo from "./BrandLogo";

type Variant = "paper" | "white" | "fog" | "leaf";

type Props = {
  id: string;
  index: number;
  total: number;
  variant?: Variant;
  eyebrow?: string;
  showHeader?: boolean;
  decoration?: ReactNode;
  children: ReactNode;
};

const variants: Record<Variant, string> = {
  paper: "bg-pye-paper text-pye-ink",
  white: "bg-white text-pye-ink",
  fog: "bg-pye-fog/40 text-pye-ink",
  leaf: "bg-pye-forest text-white",
};

export default function Slide({
  id,
  index,
  total,
  variant = "white",
  eyebrow,
  showHeader = true,
  decoration,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });

  const isDark = variant === "leaf";

  return (
    <section
      id={id}
      ref={ref}
      className={`slide-section relative isolate flex min-h-screen w-full snap-start items-stretch overflow-hidden ${variants[variant]}`}
    >
      {/* Background decoration layer — sits behind all content */}
      {decoration && (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          {decoration}
        </div>
      )}
      {/* Branded header — Fakhori left · PYE center · LOYAC right */}
      {showHeader && (
        <header
          className={`pointer-events-none absolute inset-x-0 top-0 z-20 grid grid-cols-3 items-center px-6 py-4 md:px-10 md:py-5 ${
            isDark ? "[filter:invert(1)_hue-rotate(180deg)]" : ""
          }`}
        >
          <BrandLogo type="fakhoury" size="hdr" />
          <div className="flex justify-center">
            <BrandLogo type="pye" size="sm" />
          </div>
          <div className="flex justify-end">
            <BrandLogo type="loyac-en" size="sm" />
          </div>
        </header>
      )}

      {/* Footer slide counter */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-center justify-between px-6 py-5 text-[11px] uppercase tracking-[0.3em] md:px-10 ${
          isDark ? "text-white/70" : "text-pye-ink/50"
        }`}
      >
        <span>Pathways to Youth Employment</span>
        <span className="tabular">
          {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-center px-6 pt-36 pb-24 md:px-10 md:pt-44 md:pb-28"
      >
        {eyebrow && (
          <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.35em] text-pye-forest">
            <span className="inline-block h-px w-10 bg-pye-forest" />
            {eyebrow}
          </div>
        )}
        {children}
      </motion.div>
    </section>
  );
}
