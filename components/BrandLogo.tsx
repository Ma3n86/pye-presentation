"use client";

import Image from "next/image";

type LogoType = "loyac-ar" | "loyac-en" | "pye" | "pye-particles" | "fakhoury";
type LogoSize = "sm" | "md" | "lg" | "xl";

type Props = {
  type: LogoType;
  size?: LogoSize;
  className?: string;
  priority?: boolean;
};

// Intrinsic dimensions read from the PNG assets — never crop or distort
const ASSETS: Record<LogoType, { src: string; w: number; h: number; alt: string }> = {
  "loyac-en": {
    src: "/brand/loyaceng.png",
    w: 735,
    h: 220,
    alt: "LOYAC",
  },
  "loyac-ar": {
    src: "/brand/loyacar.png",
    w: 735,
    h: 220,
    alt: "لوياك",
  },
  pye: {
    src: "/brand/pyealone.png",
    w: 485,
    h: 235,
    alt: "PYE Project — Pathways to Youth Employment",
  },
  "pye-particles": {
    src: "/brand/Pyeparticles.png",
    w: 1024,
    h: 466,
    alt: "PYE Project — Pathways to Youth Employment",
  },
  fakhoury: {
    src: "/brand/fakhori.png",
    w: 799,
    h: 610,
    alt: "Tawfiq & Nimat Fakhouri Initiative — مبادرة توفيق و نعمت فاخوري",
  },
};

// Display heights per size (in px). Width is derived from aspect ratio so the
// logo is never stretched or cropped.
const HEIGHTS: Record<LogoSize, { className: string; px: number }> = {
  sm: { className: "h-8 md:h-10", px: 40 },
  md: { className: "h-12 md:h-14", px: 56 },
  lg: { className: "h-20 md:h-28", px: 112 },
  xl: { className: "h-32 md:h-48 lg:h-56", px: 224 },
};

export default function BrandLogo({ type, size = "md", className = "", priority = false }: Props) {
  const asset = ASSETS[type];
  const height = HEIGHTS[size];
  const aspect = asset.w / asset.h;
  const renderWidth = Math.round(height.px * aspect);

  return (
    <span
      className={`inline-block ${height.className} ${className}`}
      style={{ aspectRatio: `${asset.w} / ${asset.h}` }}
    >
      <Image
        src={asset.src}
        alt={asset.alt}
        width={renderWidth}
        height={height.px}
        priority={priority}
        sizes="(max-width: 768px) 60vw, 40vw"
        className="h-full w-auto object-contain"
        draggable={false}
      />
    </span>
  );
}
