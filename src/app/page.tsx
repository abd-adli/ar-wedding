'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Great_Vibes } from 'next/font/google';

import MempelaiSection     from '@/components/MempelaiSection';
import FloatingMusicButton from '@/components/FloatingMusicButton';

// ─── Dynamic imports for heavy below-the-fold components ──────────────────────
const Countdown = dynamic(() => import('@/components/Countdown'), {
  loading: () => <div className="min-h-[600px]" />,
});
const LoveStory = dynamic(() => import('@/components/LoveStory'), {
  loading: () => <div className="min-h-[500px]" />,
});
const Gallery = dynamic(() => import('@/components/Gallery'), {
  loading: () => <div className="min-h-[500px]" />,
});
const DispossCam = dynamic(() => import('@/components/DispossCam'), {
  ssr: false,
  loading: () => <div className="min-h-[350px]" />,
});
const DigitalGift = dynamic(() => import('@/components/DigitalGift'), {
  loading: () => <div className="min-h-[400px]" />,
});
const Guestbook = dynamic(() => import('@/components/Guestbook'), {
  ssr: false,
  loading: () => <div className="min-h-[400px]" />,
});

// ─── Fonts ────────────────────────────────────────────────────────────────────
const greatVibes = Great_Vibes({
  weight   : '400',
  subsets  : ['latin'],
  display  : 'swap',
  variable : '--font-great-vibes',
});

const FONT_DISPLAY = "var(--font-cinzel), serif";
const FONT_SERIF   = "var(--font-cormorant), serif";

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

// ─── Guest Name Parser & Reader ───────────────────────────────────────────────
function parseGuestName(raw: string | null | undefined): string {
  if (!raw) return 'Tamu Undangan';
  try {
    const normalized = raw.replace(/\+/g, ' ').trim();
    const decoded = decodeURIComponent(normalized).trim();
    return decoded || 'Tamu Undangan';
  } catch {
    return raw.replace(/\+/g, ' ').trim() || 'Tamu Undangan';
  }
}

function GuestNameReader({ onName }: { onName: (name: string) => void }) {
  const searchParams = useSearchParams();
  useEffect(() => {
    const rawTo = searchParams.get('to') ?? searchParams.get('guest');
    onName(parseGuestName(rawTo));
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

    // 1. Beri jeda 400ms: Jangan jalankan pemutaran musik dan animasi Cover secara serentak
    setTimeout(() => {
      try {
        if (onPlayAudio) {
          onPlayAudio();
        }
      } catch (err) {
        console.warn('Audio playback error on open:', err);
      }
    }, 400);

    // 2. Cover menghilang secara mulus (cukup ubah opacity 0 & pointer-events none)
    setTimeout(() => {
      onOpen();
    }, 800);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center bg-[#0B1528] overflow-hidden select-none transition-opacity duration-700 ease-out transform-gpu ${
        isOpening ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
      style={{
        background: 'radial-gradient(ellipse at center, #11203d 0%, #0B1528 75%)',
        willChange: 'opacity',
      }}
    >
      {/* Subtle Sogan Corner Accents */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber-500/30 rounded-tl pointer-events-none z-0" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-amber-500/30 rounded-tr pointer-events-none z-0" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-amber-500/30 rounded-bl pointer-events-none z-0" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber-500/30 rounded-br pointer-events-none z-0" />

      {/* ── COVER CONTENT (Absolute Positioning Structure - Zero Flexbox Clashes) ── */}
      <div className="relative w-full h-full max-w-lg mx-auto overflow-hidden pointer-events-auto">
        {/* 1. THE LOGO (PINNED TO TOP-8) */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center">
          <div className="w-14 sm:w-16 md:w-20 drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]">
            <Image
              src="/logo-ar-gold.webp"
              alt="A&R Logo"
              width={80}
              height={80}
              priority
              quality={75}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* 2. THE GUNUNGAN (MASSIVE BACKGROUND PUSHED DOWN TO TOP-[60%]) */}
        <div
          className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[420px] min-w-[380px] max-w-[95%] scale-110 sm:scale-120 z-0 pointer-events-none flex items-center justify-center overflow-visible opacity-90 h-[520px] sm:h-[580px] md:h-[620px]"
        >
          <Image
            src="/gunungan.webp"
            alt="Gunungan Wayang"
            width={480}
            height={600}
            priority
            quality={75}
            className="w-full h-full object-contain filter drop-shadow-[0_0_35px_rgba(245,158,11,0.5)]"
          />
        </div>

        {/* 3. THE MAIN CONTENT (NAMES + SLIM GUEST BOX + BUTTON) - BOTTOM-8 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full flex flex-col items-center gap-3 z-20 px-4">
          {/* 'THE WEDDING OF' in small gold serif */}
          <p
            className="text-center text-xs sm:text-sm tracking-[0.45em] uppercase text-amber-400/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] select-none m-0 p-0"
            style={{ fontFamily: FONT_SERIF, textShadow: '0 1px 3px #000, 0 2px 6px rgba(0,0,0,0.9)' }}
          >
            The Wedding Of
          </p>

          {/* 'Adli & Rima' in grand, expressive gold calligraphy */}
          <div className="w-full flex justify-center text-center items-center pl-3 sm:pl-4 m-0 p-0">
            <h1
              className={`text-5xl sm:text-6xl md:text-7xl font-normal leading-[1.15] select-none text-center w-full m-0 p-0 text-amber-300 drop-shadow-[0_4px_16px_rgba(245,158,11,0.6)] ${greatVibes.className}`}
              style={{
                textShadow: '0 2px 8px rgba(0,0,0,1), 0 4px 16px rgba(245,158,11,0.4)',
              }}
            >
              <span>A</span>dli &amp; <span>R</span>ima
            </h1>
          </div>

          {/* Sleek, Slim Guest Box - STATIC and ISOLATED */}
          <div
            className="guest-box bg-[#0a1128]/85 border border-amber-500/40 rounded-2xl relative z-20 flex flex-col items-center gap-1 py-2 px-4 shadow-xl text-center w-[85%] max-w-[260px]"
            style={{
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2), inset 0 0 16px rgba(245, 158, 11, 0.1)',
            }}
          >
            {/* Sogan Corner Filigrees */}
            <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-amber-400/70 rounded-tl pointer-events-none" />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-amber-400/70 rounded-tr pointer-events-none" />
            <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-amber-400/70 rounded-bl pointer-events-none" />
            <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-amber-400/70 rounded-br pointer-events-none" />

            <p
              className="text-[9px] sm:text-[10px] tracking-[0.25em] text-amber-200 uppercase font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,1)]"
              style={{ fontFamily: FONT_SERIF, textShadow: '0 1px 3px #000, 0 2px 6px rgba(0,0,0,0.95)' }}
            >
              KEPADA YTH. BAPAK/IBU/SAUDARA/I
            </p>
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent my-0.5" />
            <p
              className="text-sm sm:text-base text-amber-300 font-semibold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,1)] truncate max-w-[220px]"
              style={{ fontFamily: FONT_DISPLAY, textShadow: '0 1px 3px #000, 0 2px 8px rgba(0,0,0,0.95)' }}
            >
              {guestName && guestName.trim() ? guestName : 'Tamu Undangan'}
            </p>
          </div>

          {/* Sleek, Slim 'BUKA UNDANGAN' Button */}
          <div className="relative z-20 w-full flex justify-center pt-0.5">
            <button
              type="button"
              onClick={handleOpen}
              className="px-6 py-2 rounded-full text-xs sm:text-sm tracking-[0.25em] uppercase transition-all duration-300 relative overflow-hidden group cursor-pointer shadow-lg flex items-center gap-2 hover:scale-105 active:scale-95"
              style={{
                fontFamily: FONT_SERIF,
                background: 'linear-gradient(135deg, rgba(180, 83, 9, 0.9) 0%, rgba(120, 53, 15, 0.95) 100%)',
                border    : '1px solid rgba(245, 158, 11, 0.65)',
                color     : '#fef3c7',
                boxShadow : '0 4px 20px rgba(217, 119, 6, 0.35), 0 0 12px rgba(0,0,0,0.8)',
                textShadow: '0 1px 2px rgba(0,0,0,0.8)',
              }}
            >
              <span
                className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(254, 243, 199, 0.25), transparent)' }}
                aria-hidden
              />
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-amber-300 fill-current" aria-hidden="true">
                <path d="M19 4H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-7 4.5L5 8V6l7 4.5L19 6v2z" />
              </svg>
              <span>BUKA UNDANGAN</span>
              <span className="text-amber-400/80 text-xs font-light">✦</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────
export default function Home() {
  const [isOpened,  setIsOpened]  = useState(false);
  const [guestName, setGuestName] = useState('Tamu Undangan');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Set default audio volume to 30% (0.3) on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, []);

  // Auto-play music on invitation entry (triggered by Buka Undangan user click)
  const handlePlayMusic = () => {
    try {
      if (audioRef.current) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((err) => {
              console.warn('Audio autoplay prevented by browser/iOS policy:', err);
            });
        }
      }
    } catch (err) {
      console.warn('Audio play exception:', err);
    }
  };

  // Toggle play/pause for the floating music controller
  const toggleMusic = () => {
    try {
      if (!audioRef.current) return;
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((err) => {
              console.warn('Audio playback prevented:', err);
            });
        }
      }
    } catch (err) {
      console.warn('Audio toggle exception:', err);
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

      {/* ── STICKY HEADER ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-center pointer-events-none pt-2 transition-all duration-700 ease-in-out ${
          isOpened ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
        }`}
      >
        <div
          className="relative pointer-events-auto cursor-pointer flex items-center justify-center px-6 py-2 rounded-full bg-slate-900/40 backdrop-blur-none"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Image
            src="/logo-ar-gold.webp"
            alt="A&R Logo"
            width={60}
            height={60}
            quality={75}
            className="w-11 sm:w-13 md:w-15 h-auto drop-shadow-[0_2px_10px_rgba(245,158,11,0.5)]"
          />
        </div>
      </header>

      {/* ── Opening Cover ── */}
      {!isOpened && (
        <CoverPage
          guestName={guestName}
          onOpen={() => setIsOpened(true)}
          onPlayAudio={handlePlayMusic}
        />
      )}

      {/* ════════════════════════════════════════════════════════════════
          ISI UNDANGAN
          ════════════════════════════════════════════════════════════════ */}

      {/* ── 1. SECTION HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden px-4 pt-12 sm:pt-16 pb-12 sm:pb-16 text-center bg-[#0B1528]">
        {/* Subtle Ambient Gold Radial Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 40%, rgba(245,158,11,0.11) 0%, transparent 68%)',
          }}
          aria-hidden="true"
        />

        {/* 1. RUMAH JOGLO SEBAGAI BACKGROUND */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[125%] sm:w-[110%] md:w-[95%] max-w-4xl md:max-w-5xl z-0 pointer-events-none flex items-center justify-center transform-gpu"
          style={{ willChange: 'transform, opacity' }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isOpened ? { opacity: 0.22, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
        >
          <Image
            src="/joglo-bg.webp"
            alt="Joglo Outline"
            width={1024}
            height={600}
            priority
            quality={75}
            sizes="(max-width: 768px) 100vw, 95vw"
            className="w-full h-auto object-contain"
          />
        </motion.div>

        {/* 2. ANIMASI LAMPU GANTUNG (CSS Wiggle Murni) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none flex flex-col items-center">
          <div className="w-20 sm:w-24 md:w-28 drop-shadow-md mx-auto block opacity-50 origin-top animate-[wiggle_4s_ease-in-out_infinite]">
            <Image
              src="/lampu-gantung.webp"
              alt="Lampu Gantung"
              width={112}
              height={200}
              priority
              quality={75}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* 3. 4 SUDUT ORNAMEN BUNGA (CSS Wiggle Murni, Bebas Framer Motion) */}

        {/* Bunga Kiri Atas */}
        <div className="absolute top-0 left-0 z-10 pointer-events-none w-48 sm:w-60 md:w-72 lg:w-84">
          <div className="origin-top-left animate-[wiggle_4s_ease-in-out_infinite]">
            <Image
              src="/ornamen-kiri-atas.webp"
              alt=""
              width={280}
              height={156}
              priority
              quality={75}
              sizes="(max-width: 640px) 192px, (max-width: 768px) 240px, 300px"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Bunga Kanan Atas */}
        <div className="absolute top-0 right-0 z-10 pointer-events-none w-48 sm:w-60 md:w-72 lg:w-84">
          <div className="origin-top-right animate-[wiggle_4s_ease-in-out_infinite]">
            <Image
              src="/ornamen-kanan-atas.webp"
              alt=""
              width={280}
              height={156}
              priority
              quality={75}
              sizes="(max-width: 640px) 192px, (max-width: 768px) 240px, 300px"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Bunga Kiri Bawah */}
        <div className="absolute bottom-0 left-0 z-10 pointer-events-none w-52 sm:w-64 md:w-80 lg:w-92">
          <div className="origin-bottom-left animate-[wiggle_4s_ease-in-out_infinite]">
            <Image
              src="/ornamen-kiri-bawah.webp"
              alt=""
              width={300}
              height={167}
              priority
              quality={75}
              sizes="(max-width: 640px) 208px, (max-width: 768px) 256px, 320px"
              className="w-full h-auto object-contain object-bottom"
            />
          </div>
        </div>

        {/* Bunga Kanan Bawah */}
        <div className="absolute bottom-0 right-0 z-10 pointer-events-none w-52 sm:w-64 md:w-80 lg:w-92">
          <div className="origin-bottom-right animate-[wiggle_4s_ease-in-out_infinite]">
            <Image
              src="/ornamen-kanan-bawah.webp"
              alt=""
              width={300}
              height={167}
              priority
              quality={75}
              sizes="(max-width: 640px) 208px, (max-width: 768px) 256px, 320px"
              className="w-full h-auto object-contain object-bottom"
            />
          </div>
        </div>

        {/* 4. LAYER KONTEN TEKS */}
        <div className="relative z-30 text-center flex flex-col items-center justify-between flex-1 w-full max-w-2xl mx-auto px-4 py-8 sm:py-12 my-auto min-h-[68vh] sm:min-h-[75vh]">
          
          {/* Top Block: Sogan Filigree & The Wedding Celebration Of */}
          <div className="flex flex-col items-center pt-2 sm:pt-4">
            <motion.div
              className="flex items-center gap-2.5 w-32 sm:w-40 mb-2.5 transform-gpu"
              style={{ willChange: 'transform, opacity' }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isOpened ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            >
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-400/60" />
              <span className="text-amber-400/80 text-[10px]">✦</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-400/60" />
            </motion.div>

            <motion.p
              className="text-[10px] sm:text-xs tracking-[0.45em] uppercase text-amber-300 font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] select-none transform-gpu"
              style={{ fontFamily: "var(--font-eb-garamond), serif", willChange: 'transform, opacity' }}
              initial={{ opacity: 0, y: 12 }}
              animate={isOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
            >
              The Wedding Celebration Of
            </motion.p>
          </div>

          {/* Center Block: Grand Calligraphic 'Adli & Rima' with safe text rendering */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
            style={{ willChange: 'transform, opacity' }}
            className="my-8 sm:my-12 md:my-16 overflow-visible relative flex flex-col items-center transform-gpu"
          >
            <div className="flex flex-col items-center">
              <h1
                className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal leading-[1.18] px-6 sm:px-10 py-2 select-none ${greatVibes.className} text-center relative z-10 overflow-visible text-amber-300`}
                style={{
                  textShadow: '0 2px 12px rgba(0,0,0,0.95), 0 0 20px rgba(245,158,11,0.4)',
                }}
              >
                <span>A</span>dli <span className="text-amber-400 font-light">&amp;</span> <span>R</span>ima
              </h1>

              {/* Calligraphic Flourish Swash Beneath Name */}
              <div className="flex items-center justify-center -mt-2 sm:-mt-3 w-full max-w-xs sm:max-w-md pointer-events-none opacity-85">
                <svg viewBox="0 0 300 28" className="w-full h-auto text-amber-400 drop-shadow-[0_2px_6px_rgba(245,158,11,0.35)]" fill="none">
                  <path
                    d="M15 14 C 55 14, 70 4, 110 14 C 130 19, 140 22, 150 14 C 160 6, 170 9, 190 14 C 230 22, 245 14, 285 14"
                    stroke="url(#swashGoldHero)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <circle cx="150" cy="15" r="2" fill="#fef3c7" />
                  <defs>
                    <linearGradient id="swashGoldHero" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
                      <stop offset="25%" stopColor="#fbbf24" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                      <stop offset="75%" stopColor="#fbbf24" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Bottom Block: Warm Invitation Text & Dated Separator */}
          <div className="flex flex-col items-center gap-5 sm:gap-6 pb-4 sm:pb-8">
            <motion.p
              className="text-xs sm:text-sm md:text-base text-slate-200/90 font-light leading-relaxed max-w-md sm:max-w-lg mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] px-4 transform-gpu"
              style={{ fontFamily: FONT_SERIF, willChange: 'transform, opacity' }}
              initial={{ opacity: 0, y: 15 }}
              animate={isOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
            >
              Dengan penuh rasa syukur, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri dan memberikan doa restu pada hari bahagia kami.
            </motion.p>

            <motion.div
              className="flex items-center justify-center gap-3 w-full max-w-xs mx-auto transform-gpu"
              style={{ willChange: 'transform, opacity' }}
              initial={{ opacity: 0, y: 15 }}
              animate={isOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.6, delay: 0.55, ease: 'easeOut' }}
            >
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/50 to-amber-500/80" />
              <span
                className="text-xs sm:text-sm tracking-[0.35em] text-amber-300 font-medium select-none drop-shadow-sm"
                style={{ fontFamily: FONT_DISPLAY }}
              >
                — 16.01.2027 —
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-amber-500/50 to-amber-500/80" />
            </motion.div>
          </div>

        </div>

      </section>

      {/* ── KONTEN TENGAH ── */}

      {/* Profil Mempelai (Groom & Bride) */}
      <MempelaiSection />

      <div className="w-full py-6 px-8 flex justify-center">
        <OrnamentDivider />
      </div>

      {/* Countdown (Waktu & Acara) */}
      <section className="relative w-full flex flex-col items-center px-0.5 sm:px-4 overflow-hidden">
        <motion.div
          className="w-full max-w-4xl flex justify-center transform-gpu"
          style={{ willChange: 'transform, opacity' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
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
          className="w-full max-w-5xl transform-gpu"
          style={{ willChange: 'transform, opacity' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Gallery />
        </motion.div>
      </section>

      <div className="w-full py-6 px-8 flex justify-center">
        <OrnamentDivider />
      </div>

      {/* DispossCam (Kamera Tamu - LAZY LOADED) */}
      <section className="relative w-full flex flex-col items-center px-4 py-8">
        {!isCameraOpen ? (
          <div className="flex flex-col items-center text-center gap-4 max-w-sm w-full p-6 rounded-2xl bg-slate-900/70 border border-amber-500/20 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl text-amber-400 tracking-wide" style={{ fontFamily: FONT_DISPLAY }}>Disposs Cam</h3>
              <p className="text-xs text-slate-400 font-serif mt-1">Abadikan momen istimewa Anda dengan sentuhan kamera analog</p>
            </div>
            <button
              type="button"
              onClick={() => setIsCameraOpen(true)}
              className="px-6 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] font-serif bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-amber-100 transition-all shadow-lg mt-2 cursor-pointer border border-amber-500/40 active:scale-95"
            >
              Buka Kamera
            </button>
          </div>
        ) : (
          <div className="w-full max-w-md flex flex-col items-center relative">
            <button
              type="button"
              onClick={() => setIsCameraOpen(false)}
              className="mb-4 px-4 py-1.5 rounded-full text-xs font-serif text-slate-400 border border-slate-700 hover:text-white hover:border-slate-500 transition-colors cursor-pointer"
            >
              ✕ Tutup Kamera
            </button>
            <DispossCam />
          </div>
        )}
      </section>

      {/* Amplop Digital / Digital Gift */}
      <DigitalGift />

      <div className="w-full py-6 px-8 flex justify-center">
        <OrnamentDivider />
      </div>

      {/* Buku Tamu / Guestbook & Ucapan */}
      <section className="relative w-full flex flex-col items-center py-16 px-4">
        <motion.div
          className="w-full max-w-lg transform-gpu"
          style={{ willChange: 'transform, opacity' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Guestbook />
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        className="w-full flex flex-col items-center gap-4 py-16 px-4 border-t border-amber-500/10 text-center"
      >
        <Image
          src="/logo-ar-gold.webp"
          alt="A&R"
          width={48}
          height={48}
          quality={75}
          className="w-12 h-auto opacity-50"
        />
        <div className="text-center">
          <p
            className="text-amber-500/80 tracking-[0.25em]"
            style={{ fontFamily: FONT_DISPLAY, fontSize: '0.95rem' }}
          >
            <span>A</span>dli &amp; <span>R</span>ima
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