'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// ─── Target date ──────────────────────────────────────────────────────────────

/** January 16, 2027 at 08:00 WIB (UTC+7) */
const TARGET = new Date('2027-01-16T08:00:00+07:00');

// ─── Types ────────────────────────────────────────────────────────────────────

interface TimeLeft {
  days   : number;
  hours  : number;
  minutes: number;
  seconds: number;
  total  : number; // ms remaining
}

// ─── Utility ──────────────────────────────────────────────────────────────────

function calcTimeLeft(): TimeLeft {
  const total = Math.max(0, TARGET.getTime() - Date.now());
  return {
    total,
    days   : Math.floor(total / 86_400_000),
    hours  : Math.floor((total % 86_400_000) / 3_600_000),
    minutes: Math.floor((total % 3_600_000)  / 60_000),
    seconds: Math.floor((total % 60_000)     / 1_000),
  };
}

// ─── Flip-digit card ──────────────────────────────────────────────────────────

/**
 * Renders a two-digit number as a pair of glass-morphism cards.
 * The `flipKey` prop drives a brief CSS flip animation whenever the value
 * changes (works without any additional animation library dependency).
 */
function DigitCard({
  value,
  label,
}: {
  value   : number;
  label   : string;
}) {
  const formatted = String(value).padStart(2, '0');
  const prevRef   = useRef(formatted);
  const changed   = prevRef.current !== formatted;

  useEffect(() => {
    prevRef.current = formatted;
  });

  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-2.5">
      {/* Card pair */}
      <div className="flex gap-1 sm:gap-1.5 relative justify-center">
        {/* Ambient glow */}
        <div
          className="absolute inset-0 rounded-xl scale-105 blur-sm sm:blur-md pointer-events-none"
          style={{ background: 'rgba(180,83,9,0.22)' }}
          aria-hidden
        />

        {formatted.split('').map((digit, i) => (
          <motion.div
            key={`${label}-${i}`}
            className="relative flex items-center justify-center rounded-lg sm:rounded-xl overflow-hidden shadow-lg"
            style={{
              width      : 'clamp(2.05rem, 9.8vw, 3.8rem)',
              height     : 'clamp(2.9rem, 13.5vw, 5.2rem)',
              background : 'rgba(15,23,42,0.78)',
              border     : '1px solid rgba(245,158,11,0.25)',
              backdropFilter: 'blur(10px)',
            }}
            // Animate only when value actually changed
            animate={changed ? { scale: [1, 1.06, 1] } : {}}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {/* Top shine */}
            <div
              className="absolute top-0 inset-x-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.45), transparent)' }}
              aria-hidden
            />
            {/* Fold line */}
            <div
              className="absolute inset-x-1 sm:inset-x-2 top-1/2 h-px"
              style={{ background: 'rgba(180,83,9,0.2)' }}
              aria-hidden
            />

            <span
              className="relative z-10 font-light tabular-nums select-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]"
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize  : 'clamp(1.4rem, 6.2vw, 2.6rem)',
                background: 'linear-gradient(175deg, #fef3c7 0%, #fbbf24 45%, #b45309 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor : 'transparent',
                backgroundClip      : 'text',
              }}
            >
              {digit}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Label */}
      <span
        className="text-[10px] xs:text-[11px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.28em] uppercase text-amber-400 font-semibold drop-shadow-sm mt-0.5"
        style={{ fontFamily: "'EB Garamond', serif" }}
      >
        {label}
      </span>
    </div>
  );
}

/** Blinking colon separator */
function Colon() {
  return (
    <div className="flex items-center justify-center pb-5 xs:pb-6 sm:pb-8 md:pb-10 shrink-0">
      <motion.span
        className="text-base xs:text-lg sm:text-2xl md:text-3xl text-amber-500/70 font-light select-none px-0.5"
        animate={{ opacity: [1, 0.2, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        :
      </motion.span>
    </div>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────

function Header() {
  return (
    <motion.div
      className="flex flex-col items-center gap-3 text-center"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      {/* Wavy ornament */}
      <svg viewBox="0 0 128 18" className="w-32 text-amber-700/50" fill="none" aria-hidden>
        <path d="M0 9 Q32 2 64 9 Q96 16 128 9" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" />
        <circle cx="64" cy="9" r="2.5" fill="currentColor" />
        <circle cx="48" cy="9" r="1.5" fill="currentColor" opacity=".55" />
        <circle cx="80" cy="9" r="1.5" fill="currentColor" opacity=".55" />
      </svg>

      <p
        className="text-[11px] tracking-[0.42em] uppercase text-amber-600/65"
        style={{ fontFamily: "'EB Garamond', serif" }}
      >
        Menuju Hari Bahagia
      </p>

      <h2
        className="text-3xl sm:text-4xl font-light"
        style={{
          fontFamily: "'Cinzel', serif",
          background: 'linear-gradient(135deg, #fbbf24 0%, #92400e 50%, #fbbf24 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor : 'transparent',
          backgroundClip      : 'text',
        }}
      >
        16 Januari 2027
      </h2>

      {/* Reception Time & Location Details */}
      <div className="flex flex-col items-center gap-1.5 my-1">
        <div
          className="flex items-center gap-2 text-xs sm:text-sm text-amber-200/90 font-light tracking-widest"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-amber-400 fill-none stroke-currentColor stroke-2" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>08:00 - 13:00 WIB</span>
        </div>

        <div
          className="flex items-center gap-2 text-sm sm:text-base text-amber-300 font-medium tracking-wider"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-amber-400 fill-none stroke-currentColor stroke-2 shrink-0" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>Vator Pacific Atrium</span>
        </div>

        {/* Stylish Google Maps redirection button */}
        <motion.a
          href="https://maps.app.goo.gl/KKswPLoSwHeVbgDT8"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1.5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] sm:text-xs tracking-[0.2em] uppercase font-medium text-amber-300 border border-amber-500/40 bg-slate-900/60 hover:bg-amber-950/40 hover:border-amber-400 transition-all duration-300 shadow-md backdrop-blur-xs group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg viewBox="0 0 24 24" className="w-3 h-3 text-amber-400 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="3 11 22 2 13 21 11 13 3 11" />
          </svg>
          <span>Buka di Google Maps</span>
          <span className="text-amber-400/70 text-[10px]">↗</span>
        </motion.a>
      </div>

      {/* Ornament divider */}
      <div className="flex items-center gap-3 w-44">
        <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(180,83,9,0.45))' }} />
        <span className="text-amber-600/50 text-xs">✦</span>
        <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, rgba(180,83,9,0.45))' }} />
      </div>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Countdown() {
  const [time,    setTime]    = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  // Hydration-safe mount
  useEffect(() => {
    setTime(calcTimeLeft());
    setMounted(true);

    const id = setInterval(() => setTime(calcTimeLeft()), 1_000);
    return () => clearInterval(id);
  }, []);

  const isOver = mounted && time !== null && time.total === 0;

  return (
    <section className="w-full py-8 sm:py-16 px-1 sm:px-4 flex flex-col items-center gap-6 sm:gap-10 relative overflow-hidden">

      {/* Radial ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(120,53,15,0.07) 0%, transparent 70%)',
        }}
      />

      <Header />

      {/* ── Timer ── */}
      {!mounted ? (
        // SSR skeleton — invisible but reserves space to prevent layout shift
        <div className="flex items-start justify-center gap-1 xs:gap-2 sm:gap-4 md:gap-6 w-[94vw] sm:w-full max-w-2xl mx-auto px-0.5 sm:px-4 opacity-0 pointer-events-none" aria-hidden>
          <DigitCard value={0} label="Hari" />
          <Colon />
          <DigitCard value={0} label="Jam" />
          <Colon />
          <DigitCard value={0} label="Menit" />
          <Colon />
          <DigitCard value={0} label="Detik" />
        </div>
      ) : isOver ? (
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <p
            className="text-3xl sm:text-6xl font-light"
            style={{
              fontFamily: "'Cinzel', serif",
              background: 'linear-gradient(90deg, #b45309 0%, #f59e0b 50%, #b45309 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor : 'transparent',
              backgroundClip      : 'text',
              animation           : 'countdown-shimmer 3s linear infinite',
            }}
          >
            Hari Ini! 🎊
          </p>
          <p
            className="mt-3 text-amber-400/75 text-base sm:text-lg"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Selamat hari pernikahan yang penuh berkah
          </p>
        </motion.div>
      ) : (
        <motion.div
          className="flex items-start justify-center gap-1 xs:gap-2 sm:gap-4 md:gap-6 w-[94vw] sm:w-full max-w-2xl mx-auto px-0.5 sm:px-4"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
        >
          <DigitCard value={time!.days}    label="Hari"  />
          <Colon />
          <DigitCard value={time!.hours}   label="Jam"   />
          <Colon />
          <DigitCard value={time!.minutes} label="Menit" />
          <Colon />
          <DigitCard value={time!.seconds} label="Detik" />
        </motion.div>
      )}

      {/* Footer ornament */}
      <motion.p
        className="text-[11px] tracking-[0.35em] uppercase text-amber-800/40"
        style={{ fontFamily: "'EB Garamond', serif" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        Adli &amp; Rima
      </motion.p>

      {/* Shimmer keyframe */}
      <style>{`
        @keyframes countdown-shimmer {
          from { background-position: 0    center; }
          to   { background-position: 200% center; }
        }
      `}</style>
    </section>
  );
}
