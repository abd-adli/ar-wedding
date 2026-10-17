'use client';

import { motion } from 'framer-motion';

const FONT_SERIF = "'EB Garamond', 'Cormorant Garamond', Georgia, serif";
const FONT_DISPLAY = "'Cinzel', 'Playfair Display', serif";

export default function LoveStory() {
  return (
    <section className="relative w-full flex flex-col items-center py-6 sm:py-10 px-4 sm:px-6">
      <motion.div
        className="w-full max-w-2xl mx-auto flex flex-col items-center text-center gap-3.5 px-6 sm:px-12 py-7 sm:py-9 rounded-2xl relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.7) 0%, rgba(30, 15, 5, 0.6) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.45), inset 0 0 20px rgba(245, 158, 11, 0.05)',
          backdropFilter: 'blur(8px)',
        }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {/* Subtle decorative motif */}
        <div className="flex items-center gap-3 w-36">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/50" />
          <span className="text-amber-500/70 text-xs">❦</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/50" />
        </div>

        {/* Section Subtitle */}
        <p
          className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-amber-500/80 font-medium"
          style={{ fontFamily: FONT_SERIF }}
        >
          Love Story
        </p>

        {/* Section Heading: Cerita Kita */}
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide"
          style={{
            fontFamily: FONT_DISPLAY,
            background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 50%, #fbbf24 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 2px 10px rgba(0,0,0,0.4)',
          }}
        >
          Cerita Kita
        </h2>

        {/* Story Text */}
        <p
          className="text-sm sm:text-base md:text-lg text-amber-100/90 leading-relaxed sm:leading-loose font-normal italic max-w-xl px-2 sm:px-6 my-1.5 text-center"
          style={{
            fontFamily: FONT_SERIF,
            textShadow: '0 1px 4px rgba(0,0,0,0.85)',
          }}
        >
          &ldquo;Tema Anchored Realm adalah cerminan perjalanan kami. Setelah mengarungi berbagai gelombang keraguan dan badai ujian, hati ini pada akhirnya menemukan pelabuhan terakhirnya. Sebuah ikatan tempat kami menambatkan jangkar (Anchored) rasa percaya, untuk membangun dunia (Realm) kami bersama. Membuktikan bahwa sekuat apapun ombak menerpa, jangkar ini tak akan goyah. Karena dari semua perjalanan panjang, Rima adalah satu-satunya tempat Adli berlabuh untuk selamanya.&rdquo;
        </p>

        {/* Bottom Filigree / Divider */}
        <div className="flex items-center gap-2 mt-1">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
          <div className="w-8 sm:w-12 h-px bg-amber-500/40" />
          <div className="w-2.5 h-2.5 rotate-45 border border-amber-500/60 bg-amber-950/60" />
          <div className="w-8 sm:w-12 h-px bg-amber-500/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
        </div>
      </motion.div>
    </section>
  );
}
