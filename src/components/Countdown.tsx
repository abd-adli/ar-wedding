'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// ─── Target date: January 16, 2027 at 08:00 WIB (UTC+7) ────────────────────────
const TARGET = new Date('2027-01-16T08:00:00+07:00');

interface TimeLeft {
  days   : number;
  hours  : number;
  minutes: number;
  seconds: number;
  total  : number;
}

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

export default function Countdown() {
  const [time, setTime] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTime(calcTimeLeft());
    setMounted(true);
    const id = setInterval(() => setTime(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const handleSaveCalendar = () => {
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      'Pernikahan Adli & Rima'
    )}&dates=20270116T010000Z/20270116T060000Z&details=${encodeURIComponent(
      'Pernikahan Adli & Rima (Tema: Anchored Realm). Pukul 08:00 - 13:00 WIB di Vator Pacific Atrium.'
    )}&location=${encodeURIComponent('Vator Pacific Atrium')}`;

    window.open(googleCalendarUrl, '_blank', 'noopener,noreferrer');
  };

  const isOver = mounted && time !== null && time.total === 0;

  return (
    <div className="w-full flex flex-col items-center gap-8 sm:gap-12 my-2">
      
      {/* ══════════════════════════════════════════════════════════════════
          SECTION 1: DEDICATED COUNTDOWN (Top Block)
          ══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full pt-4 sm:pt-6 pb-64 sm:pb-80 px-4 flex flex-col items-center justify-start overflow-hidden min-h-[640px] sm:min-h-[720px] rounded-3xl sm:rounded-[2.5rem] border border-amber-500/30 shadow-2xl"
      >
        {/* Optimized background Image, lazy loaded and anchored to bottom */}
        <Image
          src="/countdown-bg.webp"
          alt="Wedding Countdown Background"
          fill
          sizes="(max-width: 768px) 100vw, 896px"
          quality={75}
          className="object-cover object-bottom pointer-events-none"
        />

        {/* Smooth top-to-bottom gradient: dark contrast at top for text/cards, fading to transparent at bottom for faces */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(11,21,40,0.88) 0%, rgba(11,21,40,0.68) 38%, rgba(11,21,40,0.18) 68%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        {/* Section 1 Content - Shifted to Top */}
        <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center text-center gap-3 sm:gap-4.5">
          
          {/* Heading Block */}
          <motion.div
            className="flex flex-col items-center gap-1 sm:gap-1.5 transform-gpu"
            style={{ willChange: 'transform, opacity' }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            {/* A&R Monogram Logo */}
            <Image
              src="/logo-ar-gold.webp"
              alt="A&R Logo"
              width={48}
              height={48}
              quality={75}
              className="w-10 sm:w-12 h-auto mb-1 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
            />

            {/* Sogan vector filigree */}
            <div className="flex items-center gap-2.5 w-36 sm:w-44 mb-0.5">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-400/60" />
              <span className="text-amber-400/80 text-[10px]">✦</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-400/60" />
            </div>

            <span
              className="text-[10px] sm:text-xs tracking-[0.38em] uppercase text-amber-300 font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
              style={{ fontFamily: "var(--font-eb-garamond), serif" }}
            >
              Counting The Days
            </span>

            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]"
              style={{
                fontFamily: "var(--font-cinzel), serif",
                background:
                  'linear-gradient(135deg, #ffffff 0%, #fef3c7 40%, #fbbf24 85%, #d97706 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor : 'transparent',
                backgroundClip      : 'text',
              }}
            >
              MENUJU HARI BAHAGIA
            </h2>

            <p
              className="text-xs sm:text-sm text-amber-100/90 font-light tracking-widest drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Sabtu, 16 Januari 2027
            </p>
            <p
              className="text-[10px] sm:text-xs text-amber-400/75 font-light tracking-[0.2em] drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] -mt-0.5"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              8 Sya&#x02BC;ban 1448 H
            </p>
          </motion.div>

          {/* 4 Separate Rounded White Boxes */}
          {!mounted ? (
            <div className="grid grid-cols-4 gap-2 sm:gap-3.5 w-full max-w-sm sm:max-w-md mx-auto opacity-0 pointer-events-none">
              {['Hari', 'Jam', 'Menit', 'Detik'].map((label) => (
                <div key={label} className="h-20 sm:h-24 rounded-xl sm:rounded-2xl bg-white" />
              ))}
            </div>
          ) : isOver ? (
            <motion.div
              className="text-center py-4 transform-gpu"
              style={{ willChange: 'transform, opacity' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <p
                className="text-2xl sm:text-4xl font-light"
                style={{
                  fontFamily: "var(--font-cinzel), serif",
                  background: 'linear-gradient(90deg, #fef3c7 0%, #fbbf24 50%, #fef3c7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor : 'transparent',
                  backgroundClip      : 'text',
                }}
              >
                Hari Ini! 🎊
              </p>
              <p className="mt-1 text-amber-200/90 text-xs sm:text-sm" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                Selamat hari pernikahan yang penuh berkah
              </p>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-4 gap-2 sm:gap-3.5 w-full max-w-sm sm:max-w-md mx-auto transform-gpu"
              style={{ willChange: 'transform, opacity' }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.65, delay: 0.1 }}
            >
              {[
                { label: 'Hari',  value: time!.days },
                { label: 'Jam',   value: time!.hours },
                { label: 'Menit', value: time!.minutes },
                { label: 'Detik', value: time!.seconds },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  className="flex flex-col items-center justify-center py-2.5 sm:py-3.5 px-1 sm:px-2 rounded-xl sm:rounded-2xl shadow-xl transition-all duration-300 relative overflow-hidden group transform-gpu"
                  style={{
                    willChange: 'transform',
                    backgroundColor: 'rgba(255, 255, 255, 0.96)',
                    border: '1.5px solid rgba(245, 158, 11, 0.35)',
                    boxShadow:
                      '0 8px 24px rgba(0, 0, 0, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.9)',
                  }}
                  whileHover={{ y: -3, scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400/20 via-amber-400/50 to-amber-400/20" />
                  <span
                    className="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-stone-900 tabular-nums select-none leading-none drop-shadow-xs"
                    style={{ fontFamily: "var(--font-cinzel), serif" }}
                  >
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span
                    className="text-[9px] sm:text-[11px] tracking-[0.2em] uppercase text-stone-600 font-semibold mt-1 sm:mt-1.5 select-none"
                    style={{ fontFamily: "var(--font-eb-garamond), serif" }}
                  >
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Button: SIMPAN TANGGAL (Placed directly beneath the countdown cards) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-0.5 transform-gpu"
            style={{ willChange: 'transform, opacity' }}
          >
            <motion.button
              onClick={handleSaveCalendar}
              type="button"
              className="inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-full text-[11px] sm:text-xs tracking-[0.22em] uppercase font-semibold text-amber-200 border border-amber-500/60 bg-slate-900/90 hover:bg-amber-950/80 hover:border-amber-400 transition-all duration-300 shadow-xl cursor-pointer group transform-gpu"
              style={{ willChange: 'transform' }}
              whileHover={{ scale: 1.04, boxShadow: '0 6px 24px rgba(245, 158, 11, 0.45)' }}
              whileTap={{ scale: 0.96 }}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform duration-200 fill-none stroke-current stroke-2"
                aria-hidden="true"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>SIMPAN TANGGAL</span>
              <span className="text-amber-400/80 text-[10px] font-light">✦</span>
            </motion.button>
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 2: THE NEW VENUE & TIME BLOCK (Directly Below)
          ══════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-14 sm:py-20 px-6 sm:px-10 flex flex-col items-center justify-center text-center overflow-hidden rounded-3xl sm:rounded-[2.5rem] border border-amber-500/35 shadow-2xl bg-[#0B1528]">
        
        {/* Subtle Ambient Gold Radial Glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: 'radial-gradient(circle at 50% 25%, rgba(245,158,11,0.3) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        {/* Javanese Sogan Corner Filigrees */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber-400/60 rounded-tl pointer-events-none" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-amber-400/60 rounded-tr pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-amber-400/60 rounded-bl pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber-400/60 rounded-br pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center text-center gap-3 sm:gap-4">
          
          {/* 1. Large, Prominent Golden Javanese Gunungan Anchor Motif */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-1 transform-gpu"
            style={{ willChange: 'transform, opacity' }}
          >
            <Image
              src="/gunungan.webp"
              alt="Gunungan Wayang"
              width={176}
              height={176}
              sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, 176px"
              quality={75}
              className="w-28 sm:w-36 md:w-44 h-auto object-contain filter drop-shadow-[0_0_25px_rgba(245,158,11,0.35)]"
            />
          </motion.div>

          {/* 2. "RESEPSI PERNIKAHAN" */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col items-center transform-gpu"
            style={{ willChange: 'transform, opacity' }}
          >
            <h3
              className="text-2xl sm:text-3xl md:text-4xl font-light tracking-[0.25em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
              style={{ fontFamily: "var(--font-cinzel), serif" }}
            >
              RESEPSI PERNIKAHAN
            </h3>

            {/* Sogan divider */}
            <div className="flex items-center justify-center gap-3 w-44 my-2.5">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/50" />
              <span className="text-amber-400/80 text-xs">✦</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/50" />
            </div>
          </motion.div>

          {/* 3. Date & Time */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col items-center gap-1.5 transform-gpu"
            style={{ willChange: 'transform, opacity' }}
          >
            <p
              className="text-base sm:text-lg text-amber-200/95 font-medium tracking-widest drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Sabtu, 16 Januari 2027
            </p>
            <p
              className="text-[11px] sm:text-xs text-amber-400/70 font-light tracking-[0.18em] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] -mt-0.5"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              8 Sya&#x02BC;ban 1448 H
            </p>

            <div className="flex items-center gap-2 text-sm sm:text-base text-amber-300 font-light tracking-wider drop-shadow-sm">
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 text-amber-400 fill-none stroke-current stroke-2 shrink-0"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span style={{ fontFamily: "var(--font-eb-garamond), serif" }}>
                Pukul 08:00 - 13:00 WIB
              </span>
            </div>
          </motion.div>

          {/* 4. Large Prominent Venue Name */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col items-center mt-2 transform-gpu"
            style={{ willChange: 'transform, opacity' }}
          >
            <h4
              className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wider text-amber-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
              style={{ fontFamily: "var(--font-cinzel), serif" }}
            >
              VATOR PACIFIC ATRIUM
            </h4>

            {/* 5. Full Address */}
            <p
              className="text-xs sm:text-sm text-slate-300/90 leading-relaxed max-w-md mx-auto font-light mt-1.5 px-2"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Jl. Raya Karadenan No.7, RT.003/RW.10, Karadenan, Kec. Cibinong, Kabupaten Bogor, Jawa Barat 16913
            </p>
          </motion.div>

          {/* 6. "BUKA GOOGLE MAPS" Button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-3 transform-gpu"
            style={{ willChange: 'transform, opacity' }}
          >
            <motion.a
              href="https://maps.app.goo.gl/KKswPLoSwHeVbgDT8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-xs sm:text-sm tracking-[0.22em] uppercase font-semibold text-amber-200 border border-amber-500/60 bg-gradient-to-r from-amber-950/90 via-slate-900/95 to-amber-950/90 hover:from-amber-900/80 hover:to-amber-900/80 hover:border-amber-400 transition-all duration-300 shadow-xl group transform-gpu"
              style={{ willChange: 'transform' }}
              whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(245, 158, 11, 0.45)' }}
              whileTap={{ scale: 0.96 }}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform duration-200 fill-none stroke-current stroke-2 shrink-0"
                aria-hidden="true"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>BUKA GOOGLE MAPS</span>
              <span className="text-amber-400/80 text-xs">↗</span>
            </motion.a>
          </motion.div>

        </div>
      </section>

    </div>
  );
}
