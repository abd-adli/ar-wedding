'use client';

import { motion, type Variants } from 'framer-motion';

// ─── Fonts (matching project globals) ─────────────────────────────────────────
const FONT_DISPLAY = "var(--font-cinzel), serif";
const FONT_SERIF   = "var(--font-cormorant), serif";

// ─── Adab Items ───────────────────────────────────────────────────────────────
const ADAB_ITEMS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        {/* Shirt / robe silhouette */}
        <path d="M20 7l-2-4H6L4 7" />
        <path d="M4 7v13a1 1 0 001 1h14a1 1 0 001-1V7" />
        <path d="M4 7h16" />
        <path d="M12 3v5" />
        <path d="M9 3l3 5 3-5" />
      </svg>
    ),
    title: "Berpakaian Sopan & Menutup Aurat",
    desc: "Mohon berkenan mengenakan busana yang rapi, sopan, dan menutup aurat.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        {/* Prayer / hands + crescent */}
        <path d="M12 2a7 7 0 100 14A7 7 0 0012 2z" />
        <path d="M12 6v4l3 2" />
        <path d="M5 20c0-2.21 3.134-4 7-4s7 1.79 7 4" />
      </svg>
    ),
    title: "Sholat Tepat Waktu",
    desc: "Tetap utamakan ibadah dan menunaikan sholat pada waktunya.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        {/* Heart with hands / dua */}
        <path d="M12 21C12 21 4 13.5 4 8.5a4.5 4.5 0 019-0.9 4.5 4.5 0 019 .9C22 13.5 12 21 12 21z" />
        <path d="M8 17l-1.5 2.5" />
        <path d="M16 17l1.5 2.5" />
      </svg>
    ),
    title: "Mendoakan Pengantin",
    desc: "Mohon iringi kehadiran dengan doa keberkahan untuk kedua mempelai.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        {/* Bowl / dining etiquette */}
        <path d="M3 11c0-4.418 4.03-8 9-8s9 3.582 9 8" />
        <path d="M3 11h18" />
        <path d="M5 11v5a7 7 0 0014 0v-5" />
        <path d="M12 3v3" />
      </svg>
    ),
    title: "Perhatikan Adab Makan & Minum",
    desc: "Menikmati hidangan dengan duduk, menggunakan tangan kanan, dan tidak berlebihan.",
  },
];

// ─── Animation variants ────────────────────────────────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function AdabWalimah() {
  return (
    <section className="relative w-full py-16 px-4 flex flex-col items-center gap-10 overflow-hidden">

      {/* Ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(180,83,9,0.07) 0%, transparent 70%)',
        }}
      />

      {/* ── Section Header ── */}
      <motion.div
        className="flex flex-col items-center gap-3 text-center"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        {/* Wavy ornament */}
        <svg viewBox="0 0 128 18" className="w-28 text-amber-700/50" fill="none" aria-hidden="true">
          <path
            d="M0 9 Q32 2 64 9 Q96 16 128 9"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          <circle cx="64" cy="9" r="2.5" fill="currentColor" />
          <circle cx="48" cy="9" r="1.5" fill="currentColor" opacity=".5" />
          <circle cx="80" cy="9" r="1.5" fill="currentColor" opacity=".5" />
        </svg>

        <p className="text-[11px] tracking-[0.4em] uppercase text-amber-600/70" style={{ fontFamily: FONT_SERIF }}>
          Tata Krama Tamu
        </p>

        <h2
          className="text-2xl sm:text-3xl font-light tracking-wide"
          style={{
            fontFamily: FONT_DISPLAY,
            background: 'linear-gradient(135deg, #fbbf24 0%, #92400e 50%, #fbbf24 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Adab Menghadiri Walimah
        </h2>

        <p
          className="text-sm text-slate-400 max-w-[280px] leading-relaxed"
          style={{ fontFamily: FONT_SERIF }}
        >
          Semoga kehadiran Bapak/Ibu/Saudara/i membawa berkah bagi kedua mempelai
        </p>

        {/* Gold divider */}
        <div className="flex items-center gap-3 w-44">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-700/40" />
          <span className="text-amber-600/50 text-xs">✦</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-700/40" />
        </div>
      </motion.div>

      {/* ── 2 × 2 Grid ── */}
      <motion.div
        className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-sm sm:max-w-md"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {ADAB_ITEMS.map((item) => (
          <motion.div
            key={item.title}
            variants={itemVariants}
            className="relative flex flex-col items-center gap-3 p-4 rounded-2xl text-center"
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              border: '1px solid rgba(245, 158, 11, 0.16)',
            }}
          >
            {/* Corner accents */}
            <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-amber-500/35 rounded-tl pointer-events-none" />
            <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-amber-500/35 rounded-tr pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-amber-500/35 rounded-bl pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-amber-500/35 rounded-br pointer-events-none" />

            {/* Icon badge */}
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-amber-400"
              style={{
                background: 'rgba(180, 83, 9, 0.12)',
                border: '1px solid rgba(245, 158, 11, 0.22)',
              }}
            >
              {item.icon}
            </div>

            {/* Text */}
            <div className="flex flex-col gap-1">
              <h3
                className="text-[11px] sm:text-xs font-semibold text-amber-300 leading-snug tracking-wide"
                style={{ fontFamily: FONT_DISPLAY }}
              >
                {item.title}
              </h3>
              <p
                className="text-[10px] sm:text-[11px] text-slate-400 leading-relaxed"
                style={{ fontFamily: FONT_SERIF }}
              >
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
}
