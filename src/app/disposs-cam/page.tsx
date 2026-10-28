import type { Metadata } from 'next';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DispossCamLoader from '@/components/DispossCamLoader';

export const metadata: Metadata = {
  title: 'Disposs Cam — Adli & Rima Wedding',
  description: 'Abadikan momen istimewa Anda di pernikahan Adli & Rima dengan kamera analog bergaya Sogan.',
};

export default function DispossCamPage() {
  return (
    <main className="min-h-screen bg-[#0f172a] text-amber-500 overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-amber-500/10">
        <Link
          href="/"
          className="flex items-center gap-2 text-amber-400/80 hover:text-amber-300 transition-colors text-xs tracking-widest uppercase"
          style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Kembali
        </Link>

        {/* A&R Logo — centred, does NOT overlap title */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Image
            src="/logo-ar-gold.webp"
            alt="A&R"
            width={36}
            height={36}
            quality={75}
            className="w-9 h-auto opacity-70"
          />
        </div>

        {/* Right spacer to balance the back button */}
        <div className="w-16" />
      </header>

      {/* Page Title */}
      <div className="flex flex-col items-center gap-1 pt-10 pb-2 text-center px-4">
        <p className="text-[10px] tracking-[0.45em] uppercase text-amber-500/70"
           style={{ fontFamily: 'var(--font-eb-garamond), serif' }}>
          Abadikan Kenangan
        </p>
        <h1
          className="text-3xl sm:text-4xl font-light tracking-wide"
          style={{
            fontFamily: 'var(--font-cinzel), serif',
            background: 'linear-gradient(135deg, #fbbf24 0%, #92400e 50%, #fbbf24 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Disposs Cam
        </h1>
        <div className="flex items-center gap-3 w-40 mt-2">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-700/40" />
          <span className="text-amber-600/50 text-xs">✦</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-700/40" />
        </div>
      </div>

      {/* DispossCam Component */}
      <Suspense fallback={
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-400 rounded-full animate-spin" />
        </div>
      }>
        <DispossCamLoader />
      </Suspense>
    </main>
  );
}
