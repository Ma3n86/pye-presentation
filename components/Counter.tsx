"use client";

import { useInView, motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

export default function Counter({ value, suffix = "", duration = 1.4, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.6, once: true });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (latest) => Math.round(latest).toLocaleString("en-US"));

  useEffect(() => {
    if (inView) {
      const controls = animate(mv, value, { duration, ease: [0.22, 1, 0.36, 1] });
      return () => controls.stop();
    }
  }, [inView, mv, value, duration]);

  return (
    <span ref={ref} className={`tabular ${className}`}>
      <motion.span>{rounded}</motion.span>
      {suffix && <span>{suffix}</span>}
    </span>
  );
}
