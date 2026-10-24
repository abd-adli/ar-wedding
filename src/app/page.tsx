'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import FloatingMusicButton from '@/components/FloatingMusicButton';

// ─── Dynamic imports for heavy below-the-fold components ──────────────────────
const MempelaiSection = dynamic(() => import('@/components/MempelaiSection'), {
  ssr: false,
  loading: () => <div className="min-h-[500px]" />,
});
const Countdown = dynamic(() => import('@/components/Countdown'), {
  ssr: false,
  loading: () => <div className="min-h-[600px]" />,
});
const LoveStory = dynamic(() => import('@/components/LoveStory'), {
  ssr: false,
  loading: () => <div className="min-h-[500px]" />,
});
const Gallery = dynamic(() => import('@/components/Gallery'), {
  ssr: false,
  loading: () => <div className="min-h-[500px]" />,
});
const DispossCam = dynamic(() => import('@/components/DispossCam'), {
  ssr: false,
  loading: () => <div className="min-h-[350px]" />,
});
const DigitalGift = dynamic(() => import('@/components/DigitalGift'), {
  ssr: false,
  loading: () => <div className="min-h-[400px]" />,
});
const Guestbook = dynamic(() => import('@/components/Guestbook'), {
  ssr: false,
  loading: () => <div className="min-h-[400px]" />,
});

// ─── Fonts ────────────────────────────────────────────────────────────────────
const FONT_DISPLAY = "var(--font-cinzel), serif";
const FONT_SERIF   = "var(--font-cormorant), serif";
const FONT_JAWA    = "var(--font-jawapalsu), serif";

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

// ─── Cover Page (GPU-Safe Split Gunungan + Fade-Out) ──────────────────────────
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

    // 2. Unmount Cover setelah animasi split + fade selesai (1400ms)
    setTimeout(() => {
      onOpen();
    }, 1400);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center bg-[#0B1528] overflow-hidden select-none"
      style={{
        opacity: isOpening ? 0 : 1,
        transition: 'opacity 1.2s ease-in-out',
        willChange: 'opacity',
      }}
    >
      {/* Subtle Sogan Corner Accents */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber-500/30 rounded-tl pointer-events-none z-0" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-amber-500/30 rounded-tr pointer-events-none z-0" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-amber-500/30 rounded-bl pointer-events-none z-0" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber-500/30 rounded-br pointer-events-none z-0" />

      {/* ── COVER CONTENT ── */}
      <div className="relative w-full h-full max-w-lg mx-auto overflow-hidden">

        {/* 1. THE LOGO (PINNED TO TOP-8) — fades up on open */}
        <div
          className="absolute top-8 left-1/2 z-30 flex flex-col items-center"
          style={{
            transform: isOpening
              ? 'translateX(-50%) translateY(-20px)'
              : 'translateX(-50%) translateY(0)',
            opacity: isOpening ? 0 : 1,
            transition: 'transform 0.8s ease-in-out, opacity 0.8s ease-in-out',
            willChange: 'transform, opacity',
          }}
        >
          <div className="w-14 sm:w-16 md:w-20">
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

        {/* 2. GUNUNGAN MEMBELAH — Kiri slide ke kiri, Kanan slide ke kanan */}
        {/* Container yang menampung kedua belahan */}
        <div
          className="absolute top-[60%] left-1/2 w-[420px] min-w-[380px] max-w-[95%] h-[520px] sm:h-[580px] md:h-[620px] z-0 pointer-events-none"
          style={{
            transform: 'translateX(-50%) translateY(-50%) scale(1.1)',
          }}
        >
          {/* Belahan KIRI — clip kiri 50%, slide ke translateX(-110%) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              clipPath: 'inset(0 50% 0 0)',
              transform: isOpening ? 'translateX(-110%)' : 'translateX(0)',
              opacity: isOpening ? 0.3 : 0.9,
              transition: 'transform 1.1s cubic-bezier(0.4, 0, 0.2, 1), opacity 1s ease-in-out',
              willChange: 'transform, opacity',
            }}
          >
            <img
              src="/gunungan.webp"
              alt="Gunungan Kiri"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Belahan KANAN — clip kanan 50%, slide ke translateX(110%) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              clipPath: 'inset(0 0 0 50%)',
              transform: isOpening ? 'translateX(110%)' : 'translateX(0)',
              opacity: isOpening ? 0.3 : 0.9,
              transition: 'transform 1.1s cubic-bezier(0.4, 0, 0.2, 1), opacity 1s ease-in-out',
              willChange: 'transform, opacity',
            }}
          >
            <img
              src="/gunungan.webp"
              alt="Gunungan Kanan"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* 3. THE MAIN CONTENT (NAMES + GUEST BOX + BUTTON) — slides down + fades */}
        <div
          className="absolute bottom-8 left-1/2 w-full flex flex-col items-center gap-3 z-20 px-4"
          style={{
            transform: isOpening
              ? 'translateX(-50%) translateY(30px)'
              : 'translateX(-50%) translateY(0)',
            opacity: isOpening ? 0 : 1,
            transition: 'transform 0.9s ease-in-out, opacity 0.8s ease-in-out',
            willChange: 'transform, opacity',
          }}
        >
          {/* Contrast gradient behind text group (STATIC — not animated, iOS safe) */}
          <div className="absolute -inset-x-4 -top-6 -bottom-2 bg-gradient-to-t from-black/75 via-black/40 to-transparent pointer-events-none -z-10 rounded-2xl" />

          {/* 'THE WEDDING OF' dengan Radial Glow Gelap */}
          <div className="relative inline-block mt-4 mb-1">
            {/* Glow backing (STATIC element, blur is safe here — not animated) */}
            <div className="absolute inset-0 bg-black/60 blur-md rounded-full -m-2 z-0" />
            <p
              className="relative z-10 text-center text-xs sm:text-sm tracking-[0.45em] uppercase text-amber-300 font-bold"
              style={{
                fontFamily: FONT_SERIF,
                textShadow: '1px 1px 2px black, -1px -1px 2px black, 1px -1px 2px black, -1px 1px 2px black',
              }}
            >
              THE WEDDING OF
            </p>
          </div>

          {/* Couple Name (Aksara Jawa / Jawa Palsu) dengan outline kuli */}
          <div className="w-full flex justify-center text-center items-center m-0 p-0">
            <h1
              className="text-5xl sm:text-6xl md:text-7xl text-amber-400 font-normal select-none"
              style={{
                fontFamily: FONT_JAWA,
                textShadow: '3px 3px 8px rgba(0,0,0,0.9), -1px -1px 3px black, 1px -1px 3px black, -1px 1px 3px black, 1px 1px 3px black',
              }}
            >
              Adli &amp; Rima
            </h1>
          </div>

          {/* Tanggal Masehi & Hijriah */}
          <div className="flex flex-col items-center gap-0.5 mt-0.5 mb-0.5">
            {/* Garis emas tipis */}
            <div className="flex items-center gap-2 w-full max-w-[240px]">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/50" />
              <span className="text-amber-500/70 text-[9px]">✦</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/50" />
            </div>
            {/* Tanggal Masehi */}
            <p
              className="text-[11px] sm:text-xs tracking-[0.3em] text-amber-300 font-medium select-none"
              style={{
                fontFamily: FONT_SERIF,
                textShadow: '1px 1px 3px rgba(0,0,0,0.9)',
              }}
            >
              16 · JANUARI · 2027
            </p>
            {/* Tanggal Hijriah */}
            <p
              className="text-[10px] sm:text-[11px] tracking-[0.2em] text-amber-400/70 select-none"
              style={{
                fontFamily: FONT_SERIF,
                textShadow: '1px 1px 3px rgba(0,0,0,0.9)',
              }}
            >
              8 Sya&#x02BC;ban 1448 H
            </p>
          </div>
          <div className="guest-box bg-slate-950/40 backdrop-blur-sm border border-amber-500/40 rounded-2xl relative z-20 flex flex-col items-center gap-1 py-2 px-4 text-center w-[85%] max-w-[260px]">
            {/* Sogan Corner Filigrees */}
            <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-amber-400/70 rounded-tl pointer-events-none" />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-amber-400/70 rounded-tr pointer-events-none" />
            <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-amber-400/70 rounded-bl pointer-events-none" />
            <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-amber-400/70 rounded-br pointer-events-none" />

            <p
              className="text-[9px] sm:text-[10px] tracking-[0.25em] text-amber-200 uppercase font-medium"
              style={{ fontFamily: FONT_SERIF }}
            >
              KEPADA YTH. BAPAK/IBU/SAUDARA/I
            </p>
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent my-0.5" />
            <p
              className="text-sm sm:text-base text-amber-300 font-semibold tracking-wide truncate max-w-[220px]"
              style={{ fontFamily: FONT_DISPLAY }}
            >
              {guestName && guestName.trim() ? guestName : 'Tamu Undangan'}
            </p>
          </div>

          {/* Sleek, Slim 'BUKA UNDANGAN' Button */}
          <div className="relative z-20 w-full flex justify-center pt-0.5">
            <button
              type="button"
              onClick={handleOpen}
              className="px-6 py-2 rounded-full text-xs sm:text-sm tracking-[0.25em] uppercase transition-all duration-300 relative overflow-hidden group cursor-pointer flex items-center gap-2 hover:scale-105 active:scale-95"
              style={{
                fontFamily: FONT_SERIF,
                background: 'linear-gradient(135deg, rgba(180, 83, 9, 0.95) 0%, rgba(120, 53, 15, 1) 100%)',
                border: '1px solid rgba(245, 158, 11, 0.65)',
                color: '#fef3c7',
              }}
            >
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

  // Handle browser visibility change (pause music when minimized/hidden, resume when active)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (audioRef.current) audioRef.current.pause();
      } else {
        if (isPlaying && audioRef.current) {
          audioRef.current.play().catch((e) => console.log(e));
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isPlaying]);

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
              console.warn('Audio toggle prevented:', err);
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

      {/* ── STICKY HEADER (CSS Murni) ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-center pointer-events-none pt-2 transition-all duration-700 ease-in-out ${
          isOpened ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
        }`}
      >
        <div
          className="relative pointer-events-auto cursor-pointer flex items-center justify-center px-6 py-2 rounded-full bg-slate-900/40"
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
          ISI UNDANGAN (Murni HTML & Tailwind - Zero Framer Motion)
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

        {/* 1. RUMAH JOGLO SEBAGAI BACKGROUND (Statis) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[125%] sm:w-[110%] md:w-[95%] max-w-4xl md:max-w-5xl z-0 pointer-events-none flex items-center justify-center opacity-20">
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
        </div>

        {/* 2. LAMPU GANTUNG (Animasi Pendulum — GPU-Safe, transform-origin: top) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none flex flex-col items-center">
          <div className="w-20 sm:w-24 md:w-28 mx-auto block opacity-50 animate-pendulum">
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

        {/* 3. 4 SUDUT ORNAMEN BUNGA (Breathing Sway — GPU-Safe, transform only) */}

        {/* Bunga Kiri Atas — origin: top left */}
        <div
          className="absolute top-0 left-0 z-10 pointer-events-none w-48 sm:w-60 md:w-72 lg:w-84 animate-flora"
          style={{ transformOrigin: 'top left' }}
        >
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

        {/* Bunga Kanan Atas — origin: top right */}
        <div
          className="absolute top-0 right-0 z-10 pointer-events-none w-48 sm:w-60 md:w-72 lg:w-84 animate-flora-alt"
          style={{ transformOrigin: 'top right' }}
        >
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

        {/* Bunga Kiri Bawah — origin: bottom left */}
        <div
          className="absolute bottom-0 left-0 z-10 pointer-events-none w-52 sm:w-64 md:w-80 lg:w-92 animate-flora-slow"
          style={{ transformOrigin: 'bottom left' }}
        >
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

        {/* Bunga Kanan Bawah — origin: bottom right */}
        <div
          className="absolute bottom-0 right-0 z-10 pointer-events-none w-52 sm:w-64 md:w-80 lg:w-92 animate-flora-alt-slow"
          style={{ transformOrigin: 'bottom right' }}
        >
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

        {/* 4. LAYER KONTEN TEKS (HTML Standar) */}
        <div className="relative z-30 text-center flex flex-col items-center justify-between flex-1 w-full max-w-2xl mx-auto px-4 py-8 sm:py-12 my-auto min-h-[68vh] sm:min-h-[75vh]">
          
          {/* Top Block: Sogan Filigree & The Wedding Celebration Of */}
          <div className="flex flex-col items-center pt-2 sm:pt-4">
            <div className="flex items-center gap-2.5 w-32 sm:w-40 mb-2.5">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-400/60" />
              <span className="text-amber-400/80 text-[10px]">✦</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-400/60" />
            </div>

            <p
              className="text-[10px] sm:text-xs tracking-[0.45em] uppercase text-amber-300 font-semibold select-none [text-shadow:_0_4px_10px_black]"
              style={{ fontFamily: "var(--font-eb-garamond), serif" }}
            >
              The Wedding Celebration Of
            </p>
          </div>

          {/* Center Block: Couple Name (Aksara Jawa / Jawa Palsu) with [text-shadow:_0_4px_10px_black] */}
          <div className="my-8 sm:my-12 md:my-16 flex flex-col items-center">
            <h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal text-amber-400 [text-shadow:_0_4px_10px_black] text-center select-none"
              style={{ fontFamily: FONT_JAWA }}
            >
              Adli &amp; Rima
            </h1>

            {/* Calligraphic Flourish Swash Beneath Name */}
            <div className="flex items-center justify-center mt-2 w-full max-w-xs sm:max-w-md pointer-events-none opacity-85">
              <svg viewBox="0 0 300 28" className="w-full h-auto text-amber-400" fill="none">
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

          {/* Bottom Block: Warm Invitation Text & Dated Separator */}
          <div className="flex flex-col items-center gap-5 sm:gap-6 pb-4 sm:pb-8">
            <p
              className="text-xs sm:text-sm md:text-base text-slate-200/90 font-light leading-relaxed max-w-md sm:max-w-lg mx-auto px-4 [text-shadow:_0_4px_10px_black]"
              style={{ fontFamily: FONT_SERIF }}
            >
              Dengan penuh rasa syukur, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri dan memberikan doa restu pada hari bahagia kami.
            </p>

            <div className="flex items-center justify-center gap-3 w-full max-w-xs mx-auto">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/50 to-amber-500/80" />
              <span
                className="text-xs sm:text-sm tracking-[0.35em] text-amber-300 font-medium select-none [text-shadow:_0_4px_10px_black]"
                style={{ fontFamily: FONT_DISPLAY }}
              >
                — 16.01.2027 —
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-amber-500/50 to-amber-500/80" />
            </div>
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
        <div className="w-full max-w-4xl flex justify-center">
          <Countdown />
        </div>
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
        <div className="w-full max-w-5xl">
          <Gallery />
        </div>
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
        <div className="w-full max-w-lg">
          <Guestbook />
        </div>
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
            className="text-3xl sm:text-4xl text-amber-400 [text-shadow:_0_4px_10px_black]"
            style={{ fontFamily: FONT_JAWA }}
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