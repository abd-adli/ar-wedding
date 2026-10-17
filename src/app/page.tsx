'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Great_Vibes } from 'next/font/google';

import Countdown           from '@/components/Countdown';
import LoveStory           from '@/components/LoveStory';
import Gallery             from '@/components/Gallery';
import DispossCam          from '@/components/DispossCam';
import DigitalGift         from '@/components/DigitalGift';
import Guestbook           from '@/components/Guestbook';
import MempelaiSection     from '@/components/MempelaiSection';
import FloatingMusicButton from '@/components/FloatingMusicButton';

// ─── Fonts ────────────────────────────────────────────────────────────────────
const greatVibes = Great_Vibes({
  weight   : '400',
  subsets  : ['latin'],
  display  : 'swap',
  variable : '--font-great-vibes',
});

const FONT_DISPLAY = "'Cinzel', serif";
const FONT_SERIF   = "'Cormorant Garamond', serif";

// ─── Decorative Divider ───────────────────────────────────────────────────────
function OrnamentDivider() {
  return (
    <div className="flex items-center justify-center gap-4 w-full max-w-xs mx-auto">
      <div
        className="h-px flex-1"
        style={{ background: 'linear-gradient(to right, transparent, rgba(245,158,11,0.4))' }}
      />
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-amber-600/50 shrink-0" fill="currentColor">
        <path d="M12 2L13.5 9H20L14.5 13.5L17 21L12 17L7 21L9.5 13.5L4 9H10.5Z" />
      </svg>
      <div
        className="h-px flex-1"
        style={{ background: 'linear-gradient(to left, transparent, rgba(245,158,11,0.4))' }}
      />
    </div>
  );
}

// ─── Guest Name Reader ────────────────────────────────────────────────────────
function GuestNameReader({ onName }: { onName: (name: string) => void }) {
  const searchParams = useSearchParams();
  useEffect(() => {
    const to = searchParams.get('to') ?? searchParams.get('guest') ?? '';
    if (to) onName(decodeURIComponent(to));
  }, [searchParams, onName]);
  return null;
}

// ─── Cover Page ───────────────────────────────────────────────────────────────
function CoverPage({
  guestName,
  onOpen,
  onPlayAudio,
}: {
  guestName   : string;
  onOpen      : () => void;
  onPlayAudio : () => void;
}) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Select the <audio> element directly from DOM and trigger .play() inside user click gesture
    const audio = (document.getElementById('bg-music') as HTMLAudioElement) || document.querySelector('audio');
    if (audio) {
      audio.muted = false;
      audio.volume = 0.3;
      try {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              if (onPlayAudio) onPlayAudio();
            })
            .catch((err) => {
              console.warn('Autoplay check:', err);
              if (onPlayAudio) onPlayAudio();
            });
        }
      } catch (err) {
        console.warn('Audio play error:', err);
        if (onPlayAudio) onPlayAudio();
      }
    } else if (onPlayAudio) {
      onPlayAudio();
    }

    // Smoothly allow the Gunungan 2.8s split animation to open gracefully before unmounting cover
    setTimeout(() => {
      onOpen();
    }, 1800);
  };

  return (
    <motion.div
      exit={{
        opacity   : 0,
        transition: { duration: 1.0, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
      }}
      className="fixed inset-0 z-50 flex flex-col justify-center items-center origin-center bg-[#0B1528] overflow-hidden py-8 px-4"
      style={{
        background: 'radial-gradient(ellipse at center, #11203d 0%, #0B1528 75%)',
      }}
    >
      {/* ── RESTORED TOP LOGO (Very top center of the cover page) ── */}
      <motion.div
        className="absolute top-6 sm:top-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={isOpening ? { opacity: 0, y: -15 } : { opacity: 1, y: 0 }}
        transition={{ duration: isOpening ? 0.6 : 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.img
          src="/logo-ar-gold.png"
          alt="A&R Logo"
          className="w-20 sm:w-24 md:w-28 h-auto drop-shadow-[0_0_20px_rgba(245,158,11,0.45)]"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* ── 1. GUNUNGAN FULL ASSET (Clearly visible 0.48 opacity background, Splits gracefully over 2.8s) ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden">
        <div className="relative w-[85vw] sm:w-[70vw] md:w-[52vw] max-w-[440px] h-[72vh] max-h-[580px] flex items-center justify-center">
          {/* Left Half of Gunungan */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              clipPath: 'polygon(0% 0%, calc(50% + 0.5px) 0%, calc(50% + 0.5px) 100%, 0% 100%)',
              WebkitClipPath: 'polygon(0% 0%, calc(50% + 0.5px) 0%, calc(50% + 0.5px) 100%, 0% 100%)',
            }}
            initial={{ x: 0, opacity: 0.48 }}
            animate={
              isOpening
                ? { x: '-110vw', opacity: 0 }
                : { x: 0, opacity: 0.48 }
            }
            transition={{ duration: 2.8, ease: [0.25, 1, 0.35, 1] }}
          >
            <img
              src="/gunungan.png"
              alt="Gunungan Wayang"
              className="w-full h-full object-contain filter drop-shadow-[0_0_25px_rgba(245,158,11,0.25)]"
            />
          </motion.div>

          {/* Right Half of Gunungan */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              clipPath: 'polygon(calc(50% - 0.5px) 0%, 100% 0%, 100% 100%, calc(50% - 0.5px) 100%)',
              WebkitClipPath: 'polygon(calc(50% - 0.5px) 0%, 100% 0%, 100% 100%, calc(50% - 0.5px) 100%)',
            }}
            initial={{ x: 0, opacity: 0.48 }}
            animate={
              isOpening
                ? { x: '110vw', opacity: 0 }
                : { x: 0, opacity: 0.48 }
            }
            transition={{ duration: 2.8, ease: [0.25, 1, 0.35, 1] }}
          >
            <img
              src="/gunungan.png"
              alt="Gunungan Wayang"
              className="w-full h-full object-contain filter drop-shadow-[0_0_25px_rgba(245,158,11,0.25)]"
            />
          </motion.div>
        </div>
      </div>

      {/* ── 2. COVER CONTENT (The Wedding Of, Adli & Rima, Sharper Defined Guest Card, Buka Undangan) ── */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center px-4 sm:px-6 text-center my-auto max-w-lg w-full pt-16 sm:pt-20 overflow-visible"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={isOpening ? { scale: 0.94, opacity: 0, y: -12 } : { scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: isOpening ? 0.6 : 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* 'THE WEDDING OF' */}
        <p
          className="text-xs sm:text-sm tracking-[0.45em] uppercase text-amber-400/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
          style={{ fontFamily: FONT_SERIF, textShadow: '0 1px 3px #000, 0 2px 6px rgba(0,0,0,0.9)' }}
        >
          The Wedding Of
        </p>

        {/* 'Adli & Rima' with extra horizontal padding & overflow-visible to prevent swash clipping */}
        <div className="w-full flex justify-center overflow-visible my-1">
          <h1
            className={`text-5xl sm:text-6xl md:text-7xl leading-[1.2] px-6 sm:px-8 py-2 overflow-visible inline-block select-none ${greatVibes.className}`}
            style={{
              background: 'linear-gradient(160deg, #fef3c7 0%, #fbbf24 35%, #d97706 65%, #92400e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor : 'transparent',
              backgroundClip      : 'text',
              overflow            : 'visible',
              filter              : 'drop-shadow(0 1px 2px #000) drop-shadow(0 0 3px #000) drop-shadow(0 4px 16px rgba(0,0,0,0.95))',
            }}
          >
            Adli &amp; Rima
          </h1>
        </div>

        {/* Visible Wedding Date: 16 Januari 2027 */}
        <p
          className="text-xs sm:text-sm tracking-[0.35em] uppercase text-amber-300 font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] my-1"
          style={{ fontFamily: FONT_SERIF, textShadow: '0 1px 3px #000, 0 2px 6px rgba(0,0,0,0.95)' }}
        >
          16 Januari 2027
        </p>

        {/* Reception Time, Venue & Maps Link (Sogan Minimal Vector Aesthetic) */}
        <div className="flex flex-col items-center gap-1.5 my-2 z-20">
          <div
            className="flex items-center gap-2 text-xs sm:text-sm text-amber-200/90 font-light tracking-widest drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
            style={{ fontFamily: FONT_SERIF }}
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-amber-400/80 fill-none stroke-current stroke-2" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>08:00 - 13:00 WIB</span>
          </div>

          <div
            className="flex items-center gap-2 text-sm sm:text-base text-amber-300 font-medium tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
            style={{ fontFamily: FONT_DISPLAY }}
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-amber-400 fill-none stroke-current stroke-2 shrink-0" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>Vator Pacific Atrium</span>
          </div>

          {/* Stylish 'Buka di Google Maps' Button */}
          <motion.a
            href="https://maps.app.goo.gl/KKswPLoSwHeVbgDT8"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] sm:text-xs tracking-[0.22em] uppercase font-medium text-amber-300 border border-amber-500/40 bg-slate-900/60 hover:bg-amber-950/40 hover:border-amber-400 transition-all duration-300 shadow-md backdrop-blur-xs group"
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

        {/* Ornamental Divider */}
        <div className="flex items-center gap-3 w-40 my-2">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/40" />
          <svg viewBox="0 0 20 20" className="w-2.5 h-2.5 text-amber-500/70 shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]" fill="currentColor">
            <path d="M10 1l1.5 6H18l-5.5 4 2 7L10 14l-4.5 4 2-7L2 7h6.5z" />
          </svg>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/40" />
        </div>

        {/* Guest Name Section (Glassmorphic semi-transparent box, Gunungan visible through while text remains crisp) */}
        <div
          className="flex flex-col items-center gap-1.5 px-6 py-3.5 mt-5 mb-4 rounded-2xl border text-center max-w-xs w-full shadow-xl"
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
            borderColor: 'rgba(245, 158, 11, 0.45)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 16px rgba(245, 158, 11, 0.06)',
          }}
        >
          <p
            className="text-[10px] sm:text-[11px] tracking-[0.28em] text-amber-200 uppercase font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,1)]"
            style={{ fontFamily: FONT_SERIF, textShadow: '0 1px 3px #000, 0 2px 6px rgba(0,0,0,0.95)' }}
          >
            Kepada Yth. Bapak/Ibu/Saudara/i
          </p>
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent my-0.5" />
          <p
            className="text-base sm:text-lg text-amber-300 font-semibold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,1)]"
            style={{ fontFamily: FONT_DISPLAY, textShadow: '0 1px 3px #000, 0 2px 8px rgba(0,0,0,0.95)' }}
          >
            {guestName && guestName.trim() ? guestName : 'Tamu Undangan'}
          </p>
        </div>

        {/* 'BUKA UNDANGAN' Button */}
        <motion.button
          onClick={handleOpen}
          className="mt-1 px-8 py-3 rounded-full text-xs tracking-[0.3em] uppercase transition-all duration-300 relative overflow-hidden group cursor-pointer shadow-lg"
          style={{
            fontFamily: FONT_SERIF,
            background: 'linear-gradient(135deg, rgba(180, 83, 9, 0.85) 0%, rgba(120, 53, 15, 0.95) 100%)',
            border    : '1px solid rgba(245, 158, 11, 0.6)',
            color     : '#fef3c7',
            boxShadow : '0 4px 25px rgba(217, 119, 6, 0.35), 0 0 15px rgba(0,0,0,0.8)',
            textShadow: '0 1px 2px rgba(0,0,0,0.8)',
          }}
          whileHover={{ scale: 1.05, boxShadow: '0 6px 30px rgba(245, 158, 11, 0.5)' }}
          whileTap  ={{ scale: 0.96 }}
        >
          <span
            className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(254, 243, 199, 0.25), transparent)' }}
            aria-hidden
          />
          <span className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-amber-300 fill-current" aria-hidden="true">
              <path d="M19 4H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-7 4.5L5 8V6l7 4.5L19 6v2z" />
            </svg>
            Buka Undangan
          </span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────
export default function Home() {
  const [isOpened,  setIsOpened]  = useState(false);
  const [guestName, setGuestName] = useState('Tamu Undangan');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Set default audio volume to 30% (0.3) on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, []);

  // Auto-play music on invitation entry (triggered by Buka Undangan user click)
  const handlePlayMusic = () => {
    const audio = audioRef.current || (document.getElementById('bg-music') as HTMLAudioElement) || document.querySelector('audio');
    if (audio) {
      audio.muted = false;
      audio.volume = 0.3;
      try {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((err) => {
              console.warn('Audio playback info:', err);
            });
        }
      } catch (err) {
        console.warn('Audio play error:', err);
      }
    }
  };

  // Toggle play/pause for the floating music controller
  const toggleMusic = () => {
    const audio = audioRef.current || (document.getElementById('bg-music') as HTMLAudioElement) || document.querySelector('audio');
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.muted = false;
      audio.volume = 0.3;
      try {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((err) => {
              console.warn('Audio toggle playback info:', err);
            });
        }
      } catch (err) {
        console.warn('Audio toggle error:', err);
      }
    }
  };

  // Prevent background scrolling while the cover is active
  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpened]);

  return (
    <main className="bg-[#0f172a] text-amber-500 overflow-x-hidden min-h-screen relative">

      {/* Background Audio - Cundamani (Looping) */}
      <audio
        id="bg-music"
        ref={audioRef}
        src="/cundamani.mp3"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadedMetadata={(e) => {
          e.currentTarget.volume = 0.3;
        }}
      >
        <source src="/cundamani.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating Music Controller (Spinning Vinyl Record) */}
      <FloatingMusicButton
        isPlaying={isPlaying}
        onToggle={toggleMusic}
        isOpened={isOpened}
      />

      {/* Read ?to= or ?guest= query parameter */}
      <Suspense fallback={null}>
        <GuestNameReader onName={setGuestName} />
      </Suspense>

      {/* ── STICKY HEADER (Fixed Top Logo with localized radial blur behind logo only) ── */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-center pointer-events-none pt-2 sm:pt-2.5"
        initial={{ opacity: 0, y: -25 }}
        animate={isOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: -25 }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="relative pointer-events-auto cursor-pointer flex items-center justify-center px-6 sm:px-8 py-2 sm:py-2.5 rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(11, 21, 40, 0.88) 0%, rgba(11, 21, 40, 0.6) 45%, transparent 75%)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img
            src="/logo-ar-gold.png"
            alt="A&R Logo"
            className="w-11 sm:w-13 md:w-15 h-auto drop-shadow-[0_2px_12px_rgba(245,158,11,0.5)]"
          />
        </div>
      </motion.header>

      {/* ── Opening Cover ── */}
      <AnimatePresence>
        {!isOpened && (
          <CoverPage
            key="cover"
            guestName={guestName}
            onOpen={() => setIsOpened(true)}
            onPlayAudio={handlePlayMusic}
          />
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════════
          1. SECTION HERO (Tinggi min-h-screen, relatif)
          ════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-24 sm:py-32">

        {/* ── 1. RUMAH JOGLO SEBAGAI BACKGROUND (Prominen di belakang 'Adli & Rima', Skala pas di z-0) ── */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[125%] sm:w-[110%] md:w-[95%] max-w-4xl md:max-w-5xl z-0 pointer-events-none flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={isOpened ? { opacity: 0.22, scale: 1 } : { opacity: 0, scale: 0.92 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/joglo-bg.png"
            alt=""
            className="w-full h-auto object-contain"
          />
        </motion.div>

        {/* ── 2. ANIMASI LAMPU GANTUNG (Centered at top-0, gently overlaps with sticky logo) ── */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none flex flex-col items-center"
          initial={{ opacity: 0, y: -30 }}
          animate={isOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 1.2, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src="/lampu-gantung.png"
            alt="Lampu Gantung"
            className="w-28 sm:w-32 md:w-36 drop-shadow-md mx-auto block"
            animate={{
              rotate: [-2, 2, -2],
              opacity: [0.25, 0.45, 0.25],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: 'top center' }}
          />
        </motion.div>

        {/* ── 3. 4 SUDUT ORNAMEN BUNGA (Top & Bottom, Staggered Entrance + Gentle Sway) ── */}

        {/* Bunga Kiri Atas (ornamen-kiri-atas.png - Diperbesar signifikan untuk frame sudut atas) */}
        <motion.div
          className="absolute -top-1 -left-1 sm:top-0 sm:left-0 z-10 pointer-events-none w-40 sm:w-52 md:w-64 lg:w-72 xl:w-80"
          initial={{ opacity: 0, scale: 0.88, x: -30, y: -30 }}
          animate={isOpened ? { opacity: 1, scale: 1, x: 0, y: 0 } : { opacity: 0, scale: 0.88, x: -30, y: -30 }}
          transition={{ duration: 1.3, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src="/ornamen-kiri-atas.png"
            alt=""
            className="w-full h-auto object-contain"
            animate={{ rotate: [-2.5, 2.5, -2.5] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top left' }}
          />
        </motion.div>

        {/* Bunga Kanan Atas (ornamen-kanan-atas.png - Diperbesar signifikan untuk frame sudut atas) */}
        <motion.div
          className="absolute -top-1 -right-1 sm:top-0 sm:right-0 z-10 pointer-events-none w-40 sm:w-52 md:w-64 lg:w-72 xl:w-80"
          initial={{ opacity: 0, scale: 0.88, x: 30, y: -30 }}
          animate={isOpened ? { opacity: 1, scale: 1, x: 0, y: 0 } : { opacity: 0, scale: 0.88, x: 30, y: -30 }}
          transition={{ duration: 1.3, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src="/ornamen-kanan-atas.png"
            alt=""
            className="w-full h-auto object-contain"
            animate={{ rotate: [2.5, -2.5, 2.5] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top right' }}
          />
        </motion.div>

        {/* Bunga Kiri Bawah (ornamen-kiri-bawah.png - Skala pas, membingkai sudut dengan gap jelas di tengah tanpa bersentuhan) */}
        <motion.div
          className="absolute bottom-8 sm:bottom-12 md:bottom-16 lg:bottom-20 left-0 z-10 pointer-events-none w-[44%] sm:w-[42%] md:w-[40%] lg:w-[38%] max-w-[300px] sm:max-w-[380px] md:max-w-[460px] lg:max-w-[520px]"
          initial={{ opacity: 0, y: 50, scale: 0.92 }}
          animate={isOpened ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.92 }}
          transition={{ duration: 1.4, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src="/ornamen-kiri-bawah.png"
            alt=""
            className="w-full h-auto object-contain object-bottom"
            animate={{ rotate: [-2.5, 2.5, -2.5] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: 'bottom center' }}
          />
        </motion.div>

        {/* Bunga Kanan Bawah (ornamen-kanan-bawah.png - Skala pas, membingkai sudut dengan gap jelas di tengah tanpa bersentuhan) */}
        <motion.div
          className="absolute bottom-8 sm:bottom-12 md:bottom-16 lg:bottom-20 right-0 z-10 pointer-events-none w-[44%] sm:w-[42%] md:w-[40%] lg:w-[38%] max-w-[300px] sm:max-w-[380px] md:max-w-[460px] lg:max-w-[520px]"
          initial={{ opacity: 0, y: 50, scale: 0.92 }}
          animate={isOpened ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.92 }}
          transition={{ duration: 1.4, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src="/ornamen-kanan-bawah.png"
            alt=""
            className="w-full h-auto object-contain object-bottom"
            animate={{ rotate: [2.5, -2.5, 2.5] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: 'bottom center' }}
          />
        </motion.div>

        {/* ── 4. LAYER KONTEN TEKS (Paling Depan / Z-Index Tertinggi: relative z-30, Staggered Fluid Entrance) ── */}
        <div className="relative z-30 text-center flex flex-col items-center gap-4 max-w-2xl mx-auto">
          {/* Teks Pembuka */}
          <motion.p
            className="text-xs sm:text-sm tracking-[0.38em] uppercase text-amber-400/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
            style={{ fontFamily: FONT_SERIF, textShadow: '0 1px 2px #000, 0 2px 8px rgba(0,0,0,0.95)' }}
            initial={{ opacity: 0, y: 18 }}
            animate={isOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Dengan Rahmat Allah SWT
          </motion.p>

          {/* Mempelai Pria */}
          <motion.div
            className="flex flex-col items-center gap-1"
            initial={{ opacity: 0, y: 20 }}
            animate={isOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.9, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-[10px] tracking-[0.35em] uppercase text-amber-500/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
              style={{ fontFamily: FONT_SERIF, textShadow: '0 1px 2px #000, 0 1px 4px rgba(0,0,0,0.9)' }}
            >
              Mempelai Pria
            </p>
            <p
              className="text-base sm:text-lg text-amber-300 font-light tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
              style={{ fontFamily: FONT_DISPLAY, textShadow: '0 1px 2px #000, 0 2px 8px rgba(0,0,0,0.95), 0 0 14px rgba(0,0,0,0.85)' }}
            >
              Abdul Qodir Adli S.si
            </p>
            <p
              className="text-xs sm:text-sm text-slate-300/90 italic leading-snug text-center max-w-[260px] drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]"
              style={{ fontFamily: FONT_SERIF, textShadow: '0 1px 2px #000, 0 1px 6px rgba(0,0,0,0.9)' }}
            >
              Putra dari Bapak Much Taryo<br />
              &amp; Ibu Karmini
            </p>
          </motion.div>

          {/* Nama Mempelai (Kaligrafi Besar - Great Vibes dengan Dark Outline Tebal) */}
          <div className="w-full flex justify-center overflow-visible my-1">
            <motion.h1
              className={`text-6xl sm:text-7xl md:text-8xl leading-[1.2] px-6 sm:px-8 py-2 overflow-visible inline-block select-none ${greatVibes.className}`}
              style={{
                background: 'linear-gradient(160deg, #fef3c7 0%, #fbbf24 35%, #d97706 65%, #92400e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor : 'transparent',
                backgroundClip      : 'text',
                overflow            : 'visible',
                filter              : 'drop-shadow(0 1px 2px rgba(0,0,0,1)) drop-shadow(0 0 2px #000) drop-shadow(0 2px 8px rgba(0,0,0,0.95)) drop-shadow(0 0 20px rgba(0,0,0,0.9))',
              }}
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={isOpened ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 15 }}
              transition={{ duration: 1.1, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            >
              Adli &amp; Rima
            </motion.h1>
          </div>

          {/* Ornamen Pemisah */}
          <motion.div
            className="flex items-center gap-3 w-56 my-1"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isOpened ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.8, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/50" />
            <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 text-amber-500/80 shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]" fill="currentColor">
              <path d="M10 1l1.5 6H18l-5.5 4 2 7L10 14l-4.5 4 2-7L2 7h6.5z" />
            </svg>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/50" />
          </motion.div>

          {/* Mempelai Wanita */}
          <motion.div
            className="flex flex-col items-center gap-1"
            initial={{ opacity: 0, y: 20 }}
            animate={isOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.9, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-[10px] tracking-[0.35em] uppercase text-amber-500/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
              style={{ fontFamily: FONT_SERIF, textShadow: '0 1px 2px #000, 0 1px 4px rgba(0,0,0,0.9)' }}
            >
              Mempelai Wanita
            </p>
            <p
              className="text-base sm:text-lg text-amber-300 font-light tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
              style={{ fontFamily: FONT_DISPLAY, textShadow: '0 1px 2px #000, 0 2px 8px rgba(0,0,0,0.95), 0 0 14px rgba(0,0,0,0.85)' }}
            >
              Rima Sugiarto S.Farm
            </p>
            <p
              className="text-xs sm:text-sm text-slate-300/90 italic leading-snug text-center max-w-[260px] drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]"
              style={{ fontFamily: FONT_SERIF, textShadow: '0 1px 2px #000, 0 1px 6px rgba(0,0,0,0.9)' }}
            >
              Putri dari Bapak BambangSugiarto<br />
              &amp; Ibu Sri Marminah
            </p>
          </motion.div>

          {/* Ayat Suci QS Ar-Rum 21 */}
          <motion.div
            className="flex flex-col items-center gap-1.5 pt-3"
            initial={{ opacity: 0, y: 15 }}
            animate={isOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.9, delay: 1.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-xs sm:text-sm text-slate-300/85 italic leading-relaxed text-center max-w-sm drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]"
              style={{ fontFamily: FONT_SERIF, textShadow: '0 1px 2px #000, 0 2px 8px rgba(0,0,0,0.95)' }}
            >
              &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
              untukmu pasangan hidup dari jenismu sendiri, supaya kamu cenderung
              dan merasa tenteram kepadanya.&rdquo;
            </p>
            <p
              className="text-[10px] tracking-[0.28em] text-amber-500/80 uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
              style={{ fontFamily: FONT_SERIF, textShadow: '0 1px 2px #000, 0 1px 4px rgba(0,0,0,0.9)' }}
            >
              — QS. Ar-Rum: 21
            </p>
          </motion.div>
        </div>

      </section>

      {/* ════════════════════════════════════════════════════════════════
          KONTEN TENGAH: PROFIL MEMPELAI, ACARA/COUNTDOWN, GALERI, CAMERA
          ════════════════════════════════════════════════════════════════ */}

      {/* Profil Mempelai (Groom & Bride) */}
      <MempelaiSection />

      <div className="w-full py-6 px-8 flex justify-center">
        <OrnamentDivider />
      </div>

      {/* Countdown (Waktu & Acara) */}
      <section className="relative w-full flex flex-col items-center px-0.5 sm:px-4 overflow-hidden">
        <motion.div
          className="w-full max-w-4xl flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Countdown />
        </motion.div>
      </section>

      <div className="w-full py-6 px-8 flex justify-center">
        <OrnamentDivider />
      </div>

      {/* Love Story (Cerita Kita) */}
      <LoveStory />

      <div className="w-full py-6 px-8 flex justify-center">
        <OrnamentDivider />
      </div>

      {/* Gallery Prewedding */}
      <section className="relative w-full flex flex-col items-center px-4">
        <motion.div
          className="w-full max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Gallery />
        </motion.div>
      </section>

      <div className="w-full py-6 px-8 flex justify-center">
        <OrnamentDivider />
      </div>

      {/* DispossCam (Kamera Tamu) */}
      <section className="relative w-full flex flex-col items-center px-4">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <DispossCam />
        </motion.div>
      </section>

      {/* Amplop Digital / Digital Gift */}
      <DigitalGift />

      <div className="w-full py-6 px-8 flex justify-center">
        <OrnamentDivider />
      </div>

      {/* ════════════════════════════════════════════════════════════════
          2. SECTION BUKU TAMU / GUESTBOOK & UCAPAN
          ════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full flex flex-col items-center py-16 px-4">
        <motion.div
          className="w-full max-w-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Guestbook />
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          FOOTER
          ════════════════════════════════════════════════════════════════ */}
      <footer
        className="w-full flex flex-col items-center gap-4 py-16 px-4 border-t border-amber-500/10 text-center"
      >
        <img
          src="/logo-ar-gold.png"
          alt="A&R"
          className="w-12 h-auto opacity-50"
        />
        <div className="text-center">
          <p
            className="text-amber-500/80 tracking-[0.25em]"
            style={{ fontFamily: FONT_DISPLAY, fontSize: '0.95rem' }}
          >
            Adli &amp; Rima
          </p>
          <p
            className="text-[10px] text-slate-500 mt-1 tracking-[0.22em]"
            style={{ fontFamily: FONT_SERIF }}
          >
            16 · I · MMXXVII
          </p>
        </div>
        <p className="text-xs text-slate-600" style={{ fontFamily: FONT_SERIF }}>
          Dibuat dengan ❤️ — Anchored Realm
        </p>
      </footer>

    </main>
  );
}