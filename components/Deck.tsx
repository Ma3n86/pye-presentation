"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Slide from "./Slide";
import Counter from "./Counter";
import BrandLogo from "./BrandLogo";
import CircuitPattern from "./CircuitPattern";

const slides = [
  { id: "cover", label: "الغلاف" },
  { id: "vision", label: "الرؤية" },
  { id: "gap", label: "الفجوة" },
  { id: "idea", label: "فكرة المشروع" },
  { id: "stages", label: "مراحل المشروع" },
  { id: "timeline", label: "المسار" },
  { id: "universities", label: "الجامعات" },
  { id: "readiness", label: "الورشات التحضيرية لسوق العمل" },
  { id: "tech", label: "التدريب التقني" },
  { id: "partnerships", label: "الشراكات" },
  { id: "impact", label: "الأثر" },
  { id: "closing", label: "الختام" },
];

export default function Deck() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const total = slides.length;

  useEffect(() => {
    const goTo = (i: number) => {
      const el = document.getElementById(slides[i]?.id ?? "");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    };
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        goTo(Math.min(active + 1, total - 1));
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        goTo(Math.max(active - 1, 0));
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(total - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, total]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const idx = slides.findIndex((s) => s.id === visible.target.id);
          if (idx !== -1) setActive(idx);
        }
      },
      { threshold: [0.4, 0.6, 0.8] }
    );
    slides.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const progress = useMemo(() => ((active + 1) / total) * 100, [active, total]);

  return (
    <main ref={scrollerRef} className="slide-scroll no-scrollbar relative h-screen overflow-y-scroll bg-white">
      {/* Progress bar */}
      <motion.div
        className="fixed left-0 top-0 z-50 h-[3px] bg-pye-leaf"
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Side navigation dots */}
      <nav
        aria-label="Slide navigation"
        className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 md:flex"
      >
        {slides.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-label={s.label}
            className="group relative flex items-center gap-3"
          >
            <span
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                i === active
                  ? "scale-125 bg-pye-forest"
                  : "bg-pye-ink/25 group-hover:bg-pye-forest/70"
              }`}
            />
            <span
              className={`pointer-events-none whitespace-nowrap rounded-md bg-white px-2 py-1 text-xs font-medium shadow-sm transition-opacity duration-200 ${
                i === active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              {s.label}
            </span>
          </a>
        ))}
      </nav>

      <CoverSlide idx={1} total={total} />
      <VisionSlide idx={2} total={total} />
      <GapSlide idx={3} total={total} />
      <IdeaSlide idx={4} total={total} />
      <StagesSlide idx={5} total={total} />
      <TimelineSlide idx={6} total={total} />
      <UniversitiesSlide idx={7} total={total} />
      <ReadinessSlide idx={8} total={total} />
      <TechSlide idx={9} total={total} />
      <PartnershipsSlide idx={10} total={total} />
      <ImpactSlide idx={11} total={total} />
      <ClosingSlide idx={12} total={total} />
    </main>
  );
}

/* =========================================================================
   COVER — vertical banner style with the particles PYE logo
   ========================================================================= */
function CoverSlide({ idx, total }: { idx: number; total: number }) {
  return (
    <Slide
      id="cover"
      index={idx}
      total={total}
      variant="white"
      showHeader={false}
      decoration={
        <CircuitPattern
          className="left-1/4 bottom-12 h-[36vh] w-[30vw]"
          variant="scattered"
          opacity={0.4}
        />
      }
    >
      {/* Top-aligned branded header — official partner lockup */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-end justify-between gap-6 px-6 py-5 md:px-10 md:py-6">
        <div className="flex items-end gap-5">
          <BrandLogo type="loyac-en" size="sm" priority />
          <span className="h-6 w-px bg-pye-ink/15" />
          <BrandLogo type="loyac-ar" size="sm" priority />
          <span className="h-6 w-px bg-pye-ink/15" />
          <BrandLogo type="fakhoury" size="md" priority />
        </div>
        <span className="text-[11px] uppercase tracking-[0.3em] text-pye-ink/50 tabular">
          July 2024 · Guidebook V.1
        </span>
      </header>

      {/* Dot grid behind hero */}
      <div className="dot-grid absolute inset-0 opacity-60" />

      {/* Soft brand color washes */}
      <div className="pointer-events-none absolute -right-32 -top-24 h-[28rem] w-[28rem] rounded-full bg-pye-mint/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-[26rem] w-[26rem] rounded-full bg-pye-sky/30 blur-3xl" />

      <div className="relative z-10 grid items-center gap-10 md:grid-cols-[1.1fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-pye-sky/40 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-pye-forest backdrop-blur"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-pye-leaf" />
            Pathways to Youth Employment
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl font-black leading-[1.05] text-pye-forest md:text-7xl lg:text-[5.5rem]"
          >
            مسارات توظيف الشباب
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 max-w-xl text-2xl font-light leading-relaxed text-pye-ink/80 md:text-3xl"
          >
            جاهزية الشباب لسوق العمل
          </motion.p>

        </div>

        {/* PYE particles logo as hero focal point */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center md:justify-end"
        >
          <BrandLogo type="pye-particles" size="xl" priority />
        </motion.div>
      </div>
    </Slide>
  );
}

/* =========================================================================
   VISION
   ========================================================================= */
function VisionSlide({ idx, total }: { idx: number; total: number }) {
  return (
    <Slide
      id="vision"
      index={idx}
      total={total}
      variant="white"
      eyebrow="01 — الرؤية"
      decoration={
        <CircuitPattern
          className="left-[8%] bottom-16 h-[46vh] w-[36vw]"
          variant="left"
          opacity={0.42}
        />
      }
    >
      <h2 className="text-4xl font-black leading-tight text-pye-forest md:text-6xl">
        من التعلم إلى الفرصة
      </h2>
      <p className="mt-8 max-w-3xl text-2xl font-light leading-relaxed text-pye-ink/85 md:text-3xl">
        كيف نحوّل المعرفة الأكاديمية
        <br />
        إلى <span className="font-bold text-pye-forest">جاهزية حقيقية</span> لسوق العمل؟
      </p>
      <div className="mt-12 inline-flex h-1 w-32 bg-pye-leaf" />
    </Slide>
  );
}

/* =========================================================================
   GAP — Youth vs. Companies
   ========================================================================= */
function GapSlide({ idx, total }: { idx: number; total: number }) {
  const youth = [
    "الجاهزية المهنية",
    "فهم متطلبات السوق",
    "بناء الهوية المهنية",
    "اكتساب الخبرة العملية",
  ];
  const companies = [
    "التكيّف السريع",
    "التعلّم السريع",
    "العمل ضمن فرق",
    "الجاهزية لبيئة العمل",
  ];
  return (
    <Slide
      id="gap"
      index={idx}
      total={total}
      variant="paper"
      eyebrow="02 — الفجوة"
      decoration={
        <CircuitPattern
          className="left-1/4 top-1/3 h-[46vh] w-[50vw]"
          variant="scattered"
          opacity={0.32}
        />
      }
    >
      <h2 className="mb-12 text-4xl font-black text-pye-forest md:text-5xl">
        ما يحتاجه الطرفان
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        <GapColumn title="الشباب" subtitle="ما يحتاجونه" items={youth} accent="leaf" />
        <GapColumn title="الشركات" subtitle="ما تبحث عنه" items={companies} accent="forest" />
      </div>
    </Slide>
  );
}

function GapColumn({
  title,
  subtitle,
  items,
  accent,
}: {
  title: string;
  subtitle: string;
  items: string[];
  accent: "leaf" | "forest";
}) {
  const ring = accent === "leaf" ? "border-pye-leaf" : "border-pye-forest";
  const badge = accent === "leaf" ? "bg-pye-leaf" : "bg-pye-forest";
  return (
    <div className={`rounded-3xl border-2 ${ring} bg-white p-8 md:p-10`}>
      <div className="mb-3 flex items-center gap-3">
        <span className={`inline-block h-2 w-8 rounded-full ${badge}`} />
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-pye-ink/60">
          {subtitle}
        </span>
      </div>
      <h3 className="mb-8 text-3xl font-black text-pye-forest md:text-4xl">{title}</h3>
      <ul className="space-y-4">
        {items.map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.5, once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex items-center gap-4 text-lg text-pye-ink md:text-xl"
          >
            <span className={`inline-block h-2.5 w-2.5 rounded-full ${badge}`} />
            {item}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/* =========================================================================
   IDEA
   ========================================================================= */
function IdeaSlide({ idx, total }: { idx: number; total: number }) {
  return (
    <Slide
      id="idea"
      index={idx}
      total={total}
      variant="white"
      eyebrow="03 — الفكرة"
      decoration={
        <CircuitPattern
          className="left-[6%] top-1/4 h-[50vh] w-[38vw]"
          variant="left"
          opacity={0.45}
        />
      }
    >
      <h2 className="text-4xl font-black text-pye-forest md:text-6xl">فكرة المشروع</h2>
      <p className="mt-8 max-w-4xl text-2xl font-light leading-relaxed text-pye-ink/85 md:text-3xl">
        مشروع <span className="font-bold text-pye-forest">مسارات توظيف الشباب</span> هو مسار يساعد الشباب على الوصول إلى مستوى من الجاهزية، يمكّنهم من إضافة <span className="font-bold text-pye-leaf">قيمة حقيقية</span> داخل بيئة العمل من اليوم الأول.
      </p>
    </Slide>
  );
}

/* =========================================================================
   STAGES — circular cards with cyan outline + green labels
   ========================================================================= */
function StagesSlide({ idx, total }: { idx: number; total: number }) {
  const stages = [
    { en: "Registration", ar: "التسجيل" },
    { en: "Interview", ar: "المقابلة" },
    { en: "Soft Skills Training", ar: "المهارات الشخصية" },
    { en: "Technical Training", ar: "التدريب التقني" },
    { en: "Internship", ar: "التدريب العملي" },
    { en: "Graduation", ar: "التخرّج" },
  ];
  return (
    <Slide
      id="stages"
      index={idx}
      total={total}
      variant="paper"
      eyebrow="04 — مراحل المشروع"
      decoration={
        <CircuitPattern
          className="right-[6%] top-1/4 h-[40vh] w-[30vw]"
          variant="right"
          opacity={0.36}
        />
      }
    >
      <h2 className="text-4xl font-black text-pye-forest md:text-5xl">مراحل المشروع</h2>
      <p className="mt-3 max-w-2xl text-lg text-pye-ink/70">
        رحلة متكاملة تنقل المشارك من التسجيل حتى التخرج والانتقال إلى سوق العمل.
      </p>

      <div className="mt-12 grid gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
        {stages.map((s, i) => (
          <motion.div
            key={s.en}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ amount: 0.4, once: true }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center"
          >
            <div className="relative">
              <div className="flex h-28 w-28 items-center justify-center rounded-full border-[3px] border-pye-sky bg-white shadow-sm">
                <span className="text-3xl font-black text-pye-forest tabular">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              {/* connector line on desktop */}
              {i < stages.length - 1 && (
                <span className="absolute right-full top-1/2 hidden h-px w-6 -translate-y-1/2 bg-pye-sky/60 lg:block" />
              )}
            </div>
            <div className="mt-4 font-bold text-pye-forest">{s.ar}</div>
            <div className="text-xs uppercase tracking-[0.2em] text-pye-ink/55">{s.en}</div>
          </motion.div>
        ))}
      </div>
    </Slide>
  );
}

/* =========================================================================
   TIMELINE — horizontal presentation timeline, reference style
   ========================================================================= */
function TimelineSlide({ idx, total }: { idx: number; total: number }) {
  const cohorts = [
    {
      name: "Cohort 1",
      count: "364",
      stages: [
        { label: "Soft skills training" },
        { label: "Technical training" },
        { label: "Internship" },
        { label: "Employment" },
      ],
    },
    {
      name: "Cohort 2",
      count: "369",
      stages: [
        { label: "Soft skills training" },
        { label: "Technical training" },
        { label: "Internship" },
        { label: "Employment" },
      ],
    },
    {
      name: "Cohort 3",
      count: "590",
      stages: [
        { label: "Soft skills training" },
        { label: "Technical training" },
        { label: "Internship" },
        { label: "Employment" },
        { label: "Closing ceremony" },
      ],
    },
  ];

  return (
    <Slide
      id="timeline"
      index={idx}
      total={total}
      variant="white"
      eyebrow="05 — المسار الزمني"
      decoration={
        <CircuitPattern
          className="left-[8%] bottom-16 h-[38vh] w-[32vw]"
          variant="scattered"
          opacity={0.18}
        />
      }
    >
      {/* Title row — mirrors the reference */}
      <div dir="ltr" className="mb-14 flex items-start justify-between gap-4">
        <h2 className="text-4xl font-black leading-tight text-pye-forest md:text-6xl">
          Timeline Review
        </h2>
        <BrandLogo type="fakhoury" size="md" />
      </div>

      {/* Timeline — horizontally scrollable on narrow screens */}
      <div dir="ltr" className="-mx-2 overflow-x-auto px-2 pb-4">
        <div className="relative min-w-[640px]">

          {/* ── Cohort label row ─────────────────────────────────────── */}
          <div className="mb-5 flex">
            {cohorts.map((c, ci) => (
              <div
                key={c.name}
                style={{ flex: c.stages.length }}
                className={`${ci > 0 ? "border-l-2 border-pye-forest/30 pl-3" : ""}`}
              >
                <span className="text-sm font-bold tracking-wide text-pye-forest md:text-base">
                  {c.name}
                </span>
                <span className="ml-2 tabular text-[10px] text-pye-ink/45">
                  {c.count} مستفيد
                </span>
              </div>
            ))}
          </div>

          {/* ── Timeline line + dots ──────────────────────────────────── */}
          <div className="relative">
            {/* Single continuous horizontal line */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-[10px] z-0 h-px bg-pye-sky/55"
            />

            <div className="flex">
              {cohorts.map((c, ci) => (
                <div
                  key={c.name}
                  style={{ flex: c.stages.length }}
                  className={`flex ${ci > 0 ? "border-l-2 border-pye-forest/25" : ""}`}
                >
                  {c.stages.map((s, si) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ amount: 0.5, once: true }}
                      transition={{
                        duration: 0.4,
                        delay: (ci * 4 + si) * 0.055,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="flex flex-1 flex-col items-center"
                    >
                      {/* Milestone dot */}
                      <div className="relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-pye-forest bg-white shadow-sm">
                        <div className="h-2 w-2 rounded-full bg-pye-leaf" />
                      </div>

                      {/* Stage label */}
                      <p className="mt-4 max-w-[72px] text-center text-[9px] font-medium leading-snug text-pye-ink/70 md:text-[11px]">
                        {s.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}

/* =========================================================================
   UNIVERSITIES — light, with bar chart
   ========================================================================= */
function UniversitiesSlide({ idx, total }: { idx: number; total: number }) {
  const unis = [
    { name: "الجامعة الأردنية", count: 217 },
    { name: "الجامعة الهاشمية", count: 242 },
    { name: "جامعة الأميرة سمية", count: 98 },
    { name: "الجامعة الألمانية", count: 68 },
    { name: "جامعة اليرموك", count: 78 },
    { name: "جامعة الشرق الأوسط", count: 33 },
    { name: "جامعة الحسين التقنية", count: 10 },
  ];
  return (
    <Slide
      id="universities"
      index={idx}
      total={total}
      variant="white"
      eyebrow="06 — الجامعات"
      decoration={
        <CircuitPattern
          className="left-1/4 bottom-12 h-[34vh] w-[40vw]"
          variant="scattered"
          opacity={0.3}
        />
      }
    >
      <div className="grid items-start gap-12 md:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 className="text-4xl font-black text-pye-forest md:text-5xl">
            الجامعات الشريكة
          </h2>
          <div className="mt-10 space-y-7">
            <Metric label="جامعات تم استقطابها" value={7} />
            <Metric label="المتقدمون" value={1323} />
            <Metric label="العدد النهائي المقبول" value={475} accent />
          </div>
        </div>

        <div className="rounded-3xl border border-pye-fog bg-white p-8 shadow-sm">
          <h3 className="mb-6 text-lg font-bold text-pye-forest">
            التوزيع على الجامعات
          </h3>
          <div className="space-y-4">
            {unis.map((u, i) => {
              const max = Math.max(...unis.map((x) => x.count));
              return (
                <div key={u.name}>
                  <div className="mb-1 flex items-baseline justify-between text-sm">
                    <span className="font-medium text-pye-ink">{u.name}</span>
                    <Counter value={u.count} className="font-bold text-pye-forest" />
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-pye-fog/70">
                    <motion.div
                      className="h-full rounded-full bg-pye-leaf"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(u.count / max) * 100}%` }}
                      viewport={{ amount: 0.5, once: true }}
                      transition={{ duration: 1.2, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Slide>
  );
}

function Metric({
  label,
  value,
  suffix,
  accent,
}: {
  label: string;
  value: number;
  suffix?: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div className="text-xs font-bold uppercase tracking-[0.3em] text-pye-ink/55">
        {label}
      </div>
      <div className={`mt-1 text-5xl font-black md:text-6xl ${accent ? "text-pye-forest" : "text-pye-ink"}`}>
        <Counter value={value} suffix={suffix} />
      </div>
    </div>
  );
}

/* =========================================================================
   READINESS
   ========================================================================= */
function ReadinessSlide({ idx, total }: { idx: number; total: number }) {
  return (
    <Slide
      id="readiness"
      index={idx}
      total={total}
      variant="paper"
      eyebrow="07 — الورشات التحضيرية لسوق العمل"
      decoration={
        <CircuitPattern
          className="left-1/4 top-1/3 h-[44vh] w-[50vw]"
          variant="scattered"
          opacity={0.32}
        />
      }
    >
      <h2 className="text-4xl font-black text-pye-forest md:text-6xl">
        الورشات التحضيرية لسوق العمل
      </h2>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <StatCard value={6} label="مدربين" />
        <StatCard value={7} label="ورشات" />
        <StatCard value={97} label="مشاركًا" />
      </div>
    </Slide>
  );
}

function StatCard({ value, label, suffix }: { value: number; label: string; suffix?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.4, once: true }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl border border-pye-fog bg-white p-8 shadow-sm"
    >
      <div className="text-7xl font-black text-pye-forest md:text-8xl">
        <Counter value={value} suffix={suffix} />
      </div>
      <div className="mt-3 text-lg text-pye-ink/75">{label}</div>
      <span className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-pye-leaf to-pye-sky" />
    </motion.div>
  );
}

/* =========================================================================
   TECH TRACKS — light cards with icons
   ========================================================================= */
function TechSlide({ idx, total }: { idx: number; total: number }) {
  const tracks = [
    {
      name: "CCNA / Networking",
      ar: "الشبكات",
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="10" width="4" height="4" rx="1" />
          <rect x="10" y="2" width="4" height="4" rx="1" />
          <rect x="18" y="10" width="4" height="4" rx="1" />
          <rect x="10" y="18" width="4" height="4" rx="1" />
          <line x1="6" y1="12" x2="10" y2="12" />
          <line x1="14" y1="12" x2="18" y2="12" />
          <line x1="12" y1="6" x2="12" y2="10" />
          <line x1="12" y1="14" x2="12" y2="18" />
        </svg>
      ),
    },
    {
      name: "Quality Assurance",
      ar: "ضمان الجودة",
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
    {
      name: "Data Analysis",
      ar: "تحليل البيانات",
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
          <line x1="2" y1="20" x2="22" y2="20" />
        </svg>
      ),
    },
    {
      name: "Data Science",
      ar: "علم البيانات",
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
        </svg>
      ),
    },
    {
      name: "Full Stack Development",
      ar: "تطوير الويب الكامل",
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
    {
      name: "Cybersecurity",
      ar: "الأمن السيبراني",
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
    },
  ];

  return (
    <Slide
      id="tech"
      index={idx}
      total={total}
      variant="white"
      eyebrow="08 — التدريب التقني"
      decoration={
        <CircuitPattern
          className="left-[8%] bottom-16 h-[42vh] w-[34vw]"
          variant="left"
          opacity={0.42}
        />
      }
    >
      <h2 className="text-4xl font-black text-pye-forest md:text-6xl">
        المسارات التدريبية التقنية
      </h2>
      <p className="mt-3 text-lg text-pye-ink/70">
        Technical Training Tracks — تدريب عملي متخصص يُجهّز المشاركين لسوق العمل
      </p>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {tracks.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.4, once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group relative overflow-hidden rounded-2xl border border-pye-fog bg-white p-6 shadow-sm"
          >
            <div className="mb-3 text-pye-sky">{t.icon}</div>
            <div className="text-xs font-bold uppercase tracking-[0.3em] text-pye-sky">
              Training Track
            </div>
            <div className="mt-1 text-xl font-bold text-pye-forest md:text-2xl">{t.name}</div>
            <div className="mt-0.5 text-sm text-pye-ink/55">{t.ar}</div>
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-pye-leaf"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ amount: 0.4, once: true }}
              transition={{ duration: 0.9, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>
        ))}
      </div>
    </Slide>
  );
}

/* =========================================================================
   PARTNERSHIPS
   ========================================================================= */
function PartnershipsSlide({ idx, total }: { idx: number; total: number }) {
  return (
    <Slide
      id="partnerships"
      index={idx}
      total={total}
      variant="paper"
      eyebrow="09 — التدريب العملي والشراكات"
      decoration={
        <CircuitPattern
          className="right-[8%] top-1/4 h-[40vh] w-[32vw]"
          variant="right"
          opacity={0.34}
        />
      }
    >
      <h2 className="text-4xl font-black text-pye-forest md:text-5xl">
        التدريب العملي والشراكات
      </h2>
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <BigStat value={18} label="شركة شريكة" />
        <BigStat value={128} label="فرصة تدريب عملي" />
        <BigStat value={82} label="أكملوا جميع المراحل" />
        <BigStat value={75} suffix="%" label="نسبة التوظيف" highlight />
      </div>
      <p className="mt-8 max-w-3xl rounded-2xl border border-pye-sky/30 bg-pye-sky/5 px-6 py-4 text-base leading-relaxed text-pye-ink/75">
        سيتم تنفيذ ودعم المسارات التدريبية بإشراف شركات تكنولوجيا المعلومات والشركاء من القطاع التقني.
        <span className="mt-1 block text-sm text-pye-ink/50">
          The training tracks will be supervised and supported by IT companies and industry partners.
        </span>
      </p>
    </Slide>
  );
}

function BigStat({
  value,
  label,
  suffix,
  highlight,
}: {
  value: number;
  label: string;
  suffix?: string;
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.4, once: true }}
      transition={{ duration: 0.6 }}
      className={`relative overflow-hidden rounded-3xl p-8 ${
        highlight
          ? "bg-pye-forest text-white shadow-lg"
          : "border border-pye-fog bg-white text-pye-ink shadow-sm"
      }`}
    >
      <div className={`text-6xl font-black md:text-7xl ${highlight ? "" : "text-pye-forest"}`}>
        <Counter value={value} suffix={suffix} />
      </div>
      <div className={`mt-3 text-base ${highlight ? "text-pye-pale" : "text-pye-ink/70"}`}>
        {label}
      </div>
      {!highlight && (
        <span className="absolute bottom-0 left-0 h-1 w-12 bg-pye-leaf" />
      )}
    </motion.div>
  );
}

/* =========================================================================
   IMPACT
   ========================================================================= */
function ImpactSlide({ idx, total }: { idx: number; total: number }) {
  const items = [
    "جاهزية مهنية أكبر",
    "فهم أوضح لسوق العمل",
    "تجربة عمل حقيقية",
    "ثقة أكبر بالنفس",
    "انتقال أقرب للتوظيف",
  ];
  return (
    <Slide
      id="impact"
      index={idx}
      total={total}
      variant="white"
      eyebrow="10 — الأثر"
      decoration={
        <CircuitPattern
          className="left-1/4 top-1/3 h-[44vh] w-[50vw]"
          variant="scattered"
          opacity={0.3}
        />
      }
    >
      <h2 className="text-4xl font-black text-pye-forest md:text-6xl">
        الأثر الحقيقي للمشروع
      </h2>
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.4, once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="group relative overflow-hidden rounded-2xl border border-pye-fog bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="text-xs tabular text-pye-sky">0{i + 1}</div>
            <div className="mt-2 text-xl font-bold text-pye-forest md:text-2xl">{item}</div>
            <div className="absolute bottom-0 right-0 h-1 w-12 bg-pye-leaf transition-all duration-500 group-hover:w-full" />
          </motion.div>
        ))}
      </div>
    </Slide>
  );
}

/* =========================================================================
   CLOSING — formal branded sign-off
   ========================================================================= */
function ClosingSlide({ idx, total }: { idx: number; total: number }) {
  return (
    <Slide
      id="closing"
      index={idx}
      total={total}
      variant="white"
      showHeader={false}
      decoration={
        <CircuitPattern
          className="left-[10%] bottom-16 h-[48vh] w-[38vw]"
          variant="scattered"
          opacity={0.42}
        />
      }
    >

      {/* Top branded header (mirrors cover) */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-end justify-between gap-6 px-6 py-5 md:px-10 md:py-6">
        <div className="flex items-end gap-5">
          <BrandLogo type="loyac-en" size="sm" />
          <span className="h-6 w-px bg-pye-ink/15" />
          <BrandLogo type="loyac-ar" size="sm" />
          <span className="h-6 w-px bg-pye-ink/15" />
          <BrandLogo type="fakhoury" size="md" />
        </div>
        <BrandLogo type="pye" size="sm" />
      </header>

      <div className="relative z-10 flex flex-col items-start gap-10">
        <BrandLogo type="pye-particles" size="lg" />

        <div>
          <h2 className="text-5xl font-black text-pye-forest md:text-7xl">شكرًا</h2>
          <p className="mt-6 max-w-2xl text-2xl font-light text-pye-ink/80 md:text-3xl">
            من التعلم إلى الفرصة — رحلة جاهزية الشباب.
          </p>
        </div>

        <div className="grid w-full max-w-3xl gap-6 rounded-2xl border border-pye-fog bg-white p-8 shadow-sm md:grid-cols-3">
          <ContactBlock label="Email" value="info@loyac" />
          <ContactBlock label="Phone" value="+962 6 4636001" ltr />
          <ContactBlock label="Web" value="loyacjordan.org" ltr />
        </div>

        <div className="w-full max-w-3xl">
          <h3 className="mb-2 text-2xl font-bold text-pye-forest">
            شكراً لشركائنا والداعمين
          </h3>
          <p className="mb-5 text-sm text-pye-ink/65">
            We extend our appreciation to the companies and partners supporting the PYE Project and contributing to youth employment pathways.
          </p>
          <div className="overflow-hidden rounded-2xl border border-pye-fog bg-white p-6 shadow-sm">
            <img
              src="/brand/companies.jpg"
              alt="Sponsoring and supporting companies of the PYE Project — شركات داعمة لمشروع مسارات توظيف الشباب"
              className="mx-auto block max-h-[35vh] max-w-full object-contain"
            />
          </div>
        </div>
      </div>
    </Slide>
  );
}

function ContactBlock({ label, value, ltr }: { label: string; value: string; ltr?: boolean }) {
  return (
    <div>
      <div className="text-xs font-bold uppercase tracking-[0.3em] text-pye-sky">
        {label}
      </div>
      <div className="mt-1 font-medium tabular text-pye-ink" dir={ltr ? "ltr" : undefined}>
        {value}
      </div>
    </div>
  );
}
