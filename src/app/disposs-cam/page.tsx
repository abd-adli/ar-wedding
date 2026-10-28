import type { Metadata } from 'next';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DispossCamLoader from '@/components/DispossCamLoader';
import GuestPhotoGallery from '@/components/GuestPhotoGallery';

export const metadata: Metadata = {
  title: 'Disposs Cam — Adli & Rima Wedding',
  description: 'Abadikan momen istimewa Anda di pernikahan Adli & Rima dengan kamera analog bergaya Sogan.',
};

export default function DispossCamPage() {
  return (
    <main className="min-h-screen bg-[#0f172a] text-amber-500 overflow-x-hidden flex flex-col items-center">
      {/* Sticky Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full flex items-center justify-between px-4 sm:px-8 h-14 bg-slate-950/90 border-b border-amber-500/15">
        <Link
          href="/"
          className="flex items-center gap-2 text-amber-300 hover:text-amber-200 transition-colors text-xs tracking-widest uppercase font-medium"
          style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          <span>Kembali</span>
        </Link>

        {/* A&R Monogram Logo — neatly integrated inside navigation bar, will never overlap content */}
        <div className="flex items-center justify-center pointer-events-none">
          <Image
            src="/logo-ar-gold.webp"
            alt="A&R Logo"
            width={34}
            height={34}
            quality={75}
            className="w-8 sm:w-9 h-auto opacity-80"
          />
        </div>

        {/* Right Label */}
        <span
          className="text-[11px] tracking-widest text-amber-500/70 uppercase hidden sm:inline-block font-mono"
        >
          AR · 2027
        </span>
        <div className="w-12 sm:hidden" />
      </header>

      {/* Main Content: Camera + Guest Photo Gallery */}
      <div className="w-full flex flex-col items-center pt-2 sm:pt-4">
        {/* Camera Section */}
        <Suspense
          fallback={
            <div className="min-h-[420px] flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-400 rounded-full animate-spin" />
            </div>
          }
        >
          <DispossCamLoader />
        </Suspense>

        {/* Sogan Ornament Divider */}
        <div className="w-full max-w-xs flex items-center justify-center gap-4 my-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/40" />
          <span className="text-amber-500/70 text-xs">✦</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/40" />
        </div>

        {/* Guest Photo Gallery Section */}
        <GuestPhotoGallery />
      </div>

      {/* Page Footer */}
      <footer className="w-full py-10 px-4 border-t border-amber-500/10 text-center flex flex-col items-center gap-2 mt-12 bg-slate-950/50">
        <Image
          src="/logo-ar-gold.webp"
          alt="A&R"
          width={36}
          height={36}
          quality={75}
          className="w-8 h-auto opacity-50"
        />
        <p className="text-xs text-amber-400 font-serif" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
          Adli &amp; Rima — 16 Januari 2027
        </p>
        <p className="text-[10px] text-slate-500 font-mono">
          Anchored Realm · Wedding Invitation &amp; Live Gallery
        </p>
      </footer>
    </main>
  );
}
