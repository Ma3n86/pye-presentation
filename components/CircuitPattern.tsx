"use client";

import { motion } from "framer-motion";

type Props = {
  className?: string;
  variant?: "left" | "right" | "scattered";
  opacity?: number;
};

/**
 * Decorative cyan circuit lines inspired by the PYE Project logo
 * (Pyeparticles.png). SVG-only — no stock imagery.
 */
export default function CircuitPattern({
  className = "",
  variant = "right",
  opacity = 0.45,
}: Props) {
  const paths =
    variant === "left"
      ? LEFT_PATHS
      : variant === "scattered"
        ? SCATTERED_PATHS
        : RIGHT_PATHS;

  return (
    <svg
      aria-hidden
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid meet"
      className={`pointer-events-none absolute select-none ${className}`}
      style={{ opacity }}
    >
      <g stroke="#4EC3E0" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {paths.map((p, i) => (
          <motion.path
            key={i}
            d={p.d}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ amount: 0.3, once: true }}
            transition={{ duration: 1.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
        {paths.map((p, i) =>
          p.dot ? (
            <motion.circle
              key={`c${i}`}
              cx={p.dot[0]}
              cy={p.dot[1]}
              r="9"
              strokeWidth="2.5"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ amount: 0.3, once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
              style={{ transformOrigin: `${p.dot[0]}px ${p.dot[1]}px` }}
            />
          ) : null
        )}
      </g>
    </svg>
  );
}

const RIGHT_PATHS = [
  { d: "M 380 40 L 280 40 L 250 70 L 180 70", dot: [380, 40] as const },
  { d: "M 380 110 L 220 110", dot: [380, 110] as const },
  { d: "M 380 180 L 300 180 L 270 210 L 200 210", dot: [380, 180] as const },
  { d: "M 380 250 L 320 250 L 290 220", dot: [380, 250] as const },
];

const LEFT_PATHS = [
  { d: "M 20 40 L 120 40 L 150 70 L 220 70", dot: [20, 40] as const },
  { d: "M 20 110 L 180 110", dot: [20, 110] as const },
  { d: "M 20 180 L 100 180 L 130 210 L 200 210", dot: [20, 180] as const },
  { d: "M 20 250 L 80 250 L 110 220", dot: [20, 250] as const },
];

const SCATTERED_PATHS = [
  { d: "M 40 60 L 140 60 L 170 90", dot: [40, 60] as const },
  { d: "M 360 100 L 260 100 L 230 130", dot: [360, 100] as const },
  { d: "M 60 220 L 160 220 L 190 190", dot: [60, 220] as const },
  { d: "M 340 240 L 240 240", dot: [340, 240] as const },
];
