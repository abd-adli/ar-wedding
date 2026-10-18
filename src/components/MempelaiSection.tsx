'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Great_Vibes } from 'next/font/google';

const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

// Instagram SVG Icon
function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export default function MempelaiSection() {
  return (
    <section className="relative w-full py-16 sm:py-24 px-4 flex flex-col items-center bg-[#0B1528] text-white overflow-hidden">
      {/* Background ambient gold glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none rounded-full blur-3xl opacity-10"
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.5) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* ── 1. JUDUL SECTION ── */}
      <motion.div
        className="flex flex-col items-center text-center max-w-xl mb-16 relative z-10"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <span className="text-xs uppercase tracking-[0.4em] text-amber-500/80 mb-2 font-serif">
          The Happy Couple
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-widest text-amber-400 font-bold mb-4 drop-shadow-sm">
          GROOM &amp; BRIDE
        </h2>

        {/* Small golden accent divider */}
        <div className="flex items-center gap-3 w-40 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/50" />
          <span className="text-amber-500/70 text-xs">✦</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/50" />
        </div>

        {/* Greeting text */}
        <p className="text-sm sm:text-base text-slate-300 font-serif leading-relaxed px-4">
          Assalamualaikum Warahmatullaahi Wabarakaatuh.
        </p>
        <p className="text-xs sm:text-sm text-slate-400 font-serif leading-relaxed mt-2 px-2 max-w-lg">
          Dengan memohon rahmat dan ridho Allah Swt, kami bermaksud mengundang
          Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:
        </p>
      </motion.div>

      {/* ── VERTICAL LAYOUT (Groom -> Divider -> Bride) ── */}
      <div className="w-full max-w-xl flex flex-col items-center gap-14 relative z-10">
        
        {/* ── 2. PROFIL MEMPELAI PRIA (ADLI) ── */}
        <motion.div
          className="flex flex-col items-center text-center w-full"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Frame Foto Portrait */}
          <div className="relative group mb-6">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-amber-500/30 to-amber-700/10 blur-sm opacity-75 group-hover:opacity-100 transition duration-500 pointer-events-none" />
            <div className="relative w-48 h-64 sm:w-56 sm:h-72 rounded-2xl overflow-hidden border border-amber-500/50 shadow-xl bg-slate-900/60 backdrop-blur-sm">
              <Image
                src="/groom.webp"
                alt="Foto Abdul Qodir Adli"
                fill
                sizes="(max-width: 640px) 192px, 224px"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* Elegant corner accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-amber-400/80 rounded-tl pointer-events-none" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-amber-400/80 rounded-tr pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-amber-400/80 rounded-bl pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-amber-400/80 rounded-br pointer-events-none" />
          </div>

          {/* Nama Lengkap */}
          <h3
            className={`text-4xl sm:text-5xl text-amber-400 mb-2 drop-shadow-[0_2px_15px_rgba(245,158,11,0.25)] ${greatVibes.className}`}
          >
            Abdul Qodir Adli S.si
          </h3>

          {/* Orang Tua */}
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400 font-serif mb-1">
            Putra dari
          </p>
          <p className="text-sm sm:text-base text-slate-200 font-serif font-medium tracking-wide mb-5">
            Bapak Much Taryo &amp; Ibu Karmini
          </p>

          {/* Tombol Instagram */}
          <motion.a
            href="https://www.instagram.com/abd.adli_/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-amber-500/40 bg-slate-900/40 hover:bg-amber-500/10 hover:border-amber-400 text-amber-300 text-xs tracking-wider transition-all duration-300 shadow-md backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <InstagramIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>@abd.adli_</span>
          </motion.a>
        </motion.div>

        {/* ── 3. DIVIDER: SIMBOL "&" ELEGAN BESAR ── */}
        <motion.div
          className="flex items-center justify-center gap-4 w-full my-2"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="h-px flex-1 max-w-[80px] sm:max-w-[120px] bg-gradient-to-r from-transparent via-amber-500/40 to-amber-500/70" />
          <span
            className={`text-5xl sm:text-6xl text-amber-400/90 font-serif leading-none select-none ${greatVibes.className} drop-shadow-[0_2px_10px_rgba(245,158,11,0.3)]`}
          >
            &amp;
          </span>
          <div className="h-px flex-1 max-w-[80px] sm:max-w-[120px] bg-gradient-to-l from-transparent via-amber-500/40 to-amber-500/70" />
        </motion.div>

        {/* ── 4. PROFIL MEMPELAI WANITA (RIMA) ── */}
        <motion.div
          className="flex flex-col items-center text-center w-full"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Frame Foto Portrait */}
          <div className="relative group mb-6">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-amber-500/30 to-amber-700/10 blur-sm opacity-75 group-hover:opacity-100 transition duration-500 pointer-events-none" />
            <div className="relative w-48 h-64 sm:w-56 sm:h-72 rounded-2xl overflow-hidden border border-amber-500/50 shadow-xl bg-slate-900/60 backdrop-blur-sm">
              <Image
                src="/bride.webp"
                alt="Foto Rima Sugiarto"
                fill
                sizes="(max-width: 640px) 192px, 224px"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* Elegant corner accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-amber-400/80 rounded-tl pointer-events-none" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-amber-400/80 rounded-tr pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-amber-400/80 rounded-bl pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-amber-400/80 rounded-br pointer-events-none" />
          </div>

          {/* Nama Lengkap */}
          <h3
            className={`text-4xl sm:text-5xl text-amber-400 mb-2 drop-shadow-[0_2px_15px_rgba(245,158,11,0.25)] ${greatVibes.className}`}
          >
            Rima Sugiarto S.Farm
          </h3>

          {/* Orang Tua */}
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400 font-serif mb-1">
            Putri dari
          </p>
          <p className="text-sm sm:text-base text-slate-200 font-serif font-medium tracking-wide mb-5">
            Bapak Bambang Sugiarto &amp; Ibu Sri Marminah
          </p>

          {/* Tombol Instagram */}
          <motion.a
            href="https://www.instagram.com/rsp_1104/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-amber-500/40 bg-slate-900/40 hover:bg-amber-500/10 hover:border-amber-400 text-amber-300 text-xs tracking-wider transition-all duration-300 shadow-md backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <InstagramIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>@rsp_1104</span>
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
