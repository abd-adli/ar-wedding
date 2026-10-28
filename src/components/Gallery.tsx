'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GalleryItem {
  id     : number | string;
  src    : string;
  alt    : string;
  caption: string;
  span   : 'normal' | 'tall' | 'wide';
}

// ─── Default Curated Placeholders ─────────────────────────────────────────────

const DEFAULT_ITEMS: GalleryItem[] = [
  { id: 'def-1',  src: '/prewed-1.webp', alt: 'Rima & Adli — Tepian Senja',      caption: 'Berdua di Tepian Senja',    span: 'tall'   },
  { id: 'def-2',  src: '/prewed-2.webp', alt: 'Rima & Adli — Kebun Teh',         caption: 'Di Antara Hijau Abadi',     span: 'normal' },
  { id: 'def-3',  src: '/prewed-3.webp', alt: 'Rima & Adli — Detail Batik',      caption: 'Warisan Nusantara',          span: 'normal' },
  { id: 'def-4',  src: '/prewed-4.webp', alt: 'Rima & Adli — Candi',             caption: 'Dua Jiwa, Satu Candi',      span: 'wide'   },
  { id: 'def-5',  src: '/prewed-5.webp', alt: 'Rima & Adli — Sawah',             caption: 'Di Lembah Padi',            span: 'normal' },
  { id: 'def-6',  src: '/prewed-6.webp', alt: 'Rima & Adli — Indoor',            caption: 'Senyum Pertama',            span: 'tall'   },
  { id: 'def-7',  src: '/prewed-7.webp', alt: 'Rima & Adli — Outdoor',           caption: 'Perjalanan Dimulai',        span: 'normal' },
  { id: 'def-8',  src: '/prewed-8.webp', alt: 'Rima & Adli — Close-up',          caption: 'Cinta Dalam Detail',        span: 'wide'   },
  { id: 'def-9',  src: '/prewed-9.webp', alt: 'Rima & Adli — Golden Hour',       caption: 'Cahaya Sore yang Abadi',    span: 'normal' },
  { id: 'def-10', src: '/prewed-10.webp', alt: 'Rima & Adli — Formal Portrait',   caption: 'Potret Pengantin Sogan',    span: 'normal' },
];

const PLACEHOLDER_GRADIENTS = [
  'from-slate-900 via-amber-950/40 to-slate-800',
  'from-amber-950/60 via-slate-900 to-slate-800',
  'from-slate-800 via-slate-900 to-amber-950/30',
  'from-amber-900/30 via-slate-900 to-slate-900',
];

const SPAN_CLASSES: Record<GalleryItem['span'], string> = {
  normal : '',
  tall   : 'row-span-2',
  wide   : 'col-span-2',
};

// ─── Parang-inspired SVG motif ────────────────────────────────────────────────

function SoganMotif({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" aria-hidden>
      <path
        d="M40 8 C56 24, 72 42, 40 72 C8 42, 24 24, 40 8 Z"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity=".6"
      />
      <path
        d="M40 18 C53 31, 64 44, 40 64 C16 44, 27 31, 40 18 Z"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeDasharray="3 2.5"
        opacity=".4"
      />
      <circle cx="40" cy="40" r="4" fill="currentColor" opacity=".35" />
      <circle cx="40" cy="22" r="2" fill="currentColor" opacity=".25" />
    </svg>
  );
}

// ─── Single gallery card ──────────────────────────────────────────────────────

function GalleryCard({
  item,
  index,
  onSelect,
}: {
  item    : GalleryItem;
  index   : number;
  onSelect: (item: GalleryItem) => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(item.src);
  const hasImage = Boolean(imgSrc && imgSrc.length > 0);

  return (
    <motion.article
      onClick={() => hasImage && onSelect({ ...item, src: imgSrc })}
      className={`
        relative group overflow-hidden rounded-2xl transform-gpu
        ${hasImage ? 'cursor-pointer' : 'cursor-default'}
        ${SPAN_CLASSES[item.span]}
      `}
      style={{
        willChange   : 'transform, opacity',
        background   : 'rgba(15,23,42,0.85)',
        border       : '1px solid rgba(245,158,11,0.12)',
        minHeight    : '10rem',
      }}
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px', amount: 0.1 }}
      transition={{ duration: 0.55, delay: index * 0.05, ease: 'easeOut' }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
    >
      {/* ── Real image ── */}
      {hasImage && (
        <Image
          src={imgSrc}
          alt={item.alt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
          quality={75}
          onLoad={() => setLoaded(true)}
          onError={() => {
            if (imgSrc.endsWith('.webp')) {
              setImgSrc(imgSrc.replace(/\.webp$/, '.jpg'));
            } else if (imgSrc.endsWith('.jpg')) {
              setImgSrc(imgSrc.replace(/\.jpg$/, '.JPG'));
            } else if (imgSrc.endsWith('.JPG')) {
              setImgSrc(imgSrc.replace(/\.JPG$/, '.jpg'));
            }
          }}
          className={`
            object-cover transition-transform duration-700 group-hover:scale-105
            ${loaded ? 'opacity-100' : 'opacity-0'}
          `}
        />
      )}

      {/* ── Placeholder (shown while image loading or when no src) ── */}
      {(!hasImage || !loaded) && (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${
            PLACEHOLDER_GRADIENTS[(typeof item.id === 'number' ? item.id : index) % PLACEHOLDER_GRADIENTS.length]
          } flex items-center justify-center`}
        >
          <SoganMotif className="w-14 h-14 text-amber-700/40 group-hover:scale-110 transition-transform duration-700" />

          {/* Corner filigree */}
          {[
            'top-2    left-2  border-t border-l',
            'top-2    right-2 border-t border-r',
            'bottom-2 left-2  border-b border-l',
            'bottom-2 right-2 border-b border-r',
          ].map(cls => (
            <div
              key={cls}
              className={`absolute w-4 h-4 border-amber-800/30 ${cls}`}
            />
          ))}

          <span
            className="absolute bottom-2 inset-x-0 text-center text-[9px] tracking-[0.32em] uppercase text-amber-800/35"
            style={{ fontFamily: "'EB Garamond', serif" }}
          >
            {hasImage ? 'Memuat...' : 'Segera'}
          </span>
        </div>
      )}

      {/* ── Hover caption overlay ── */}
      <div
        className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(to top, rgba(2,6,23,0.85) 0%, transparent 60%)' }}
      >
        <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <p
            className="text-amber-100/90 text-xs sm:text-sm font-light leading-relaxed drop-shadow"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {item.caption}
          </p>
          {hasImage && (
            <span className="text-[10px] tracking-widest uppercase text-amber-400/70 mt-0.5 inline-block">
              Perbesar ↗
            </span>
          )}
        </div>
      </div>

      {/* Border glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(245,158,11,0.25)' }}
        aria-hidden
      />
    </motion.article>
  );
}

// ─── Lightbox Modal ───────────────────────────────────────────────────────────

function Lightbox({
  item,
  onClose,
}: {
  item   : GalleryItem;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 transform-gpu"
      style={{ willChange: 'opacity' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-4xl max-h-[90vh] flex flex-col items-center transform-gpu"
        style={{ willChange: 'transform, opacity' }}
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Tutup preview"
          className="absolute -top-11 right-0 text-amber-300/80 hover:text-amber-200 text-sm tracking-widest uppercase flex items-center gap-1.5 transition-colors"
        >
          <span>Tutup</span>
          <span className="text-xl">×</span>
        </button>

        <div className="relative rounded-2xl overflow-hidden border border-amber-500/25 shadow-2xl bg-slate-950 w-[88vw] max-w-2xl h-[65vh] sm:h-[75vh]">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 768px) 88vw, 672px"
            quality={75}
            className="object-contain"
          />
        </div>

        {item.caption && (
          <p
            className="mt-3 text-center text-sm sm:text-base text-amber-200/90 font-light tracking-wide px-4"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            {item.caption}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

function Header() {
  return (
    <motion.div
      className="flex flex-col items-center gap-3 text-center transform-gpu"
      style={{ willChange: 'transform, opacity' }}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7 }}
    >
      <svg viewBox="0 0 128 18" className="w-32 text-amber-700/50" fill="none" aria-hidden>
        <path d="M0 9 Q32 2 64 9 Q96 16 128 9" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" />
        <circle cx="64" cy="9" r="2.5" fill="currentColor" />
        <circle cx="48" cy="9" r="1.5" fill="currentColor" opacity=".55" />
        <circle cx="80" cy="9" r="1.5" fill="currentColor" opacity=".55" />
      </svg>

      <p
        className="text-[11px] tracking-[0.42em] uppercase text-amber-600/65"
        style={{ fontFamily: "var(--font-eb-garamond), serif" }}
      >
        Dokumentasi Pre-Wedding
      </p>

      <h2
        className="text-3xl sm:text-4xl font-light"
        style={{
          fontFamily: "var(--font-cinzel), serif",
          background: 'linear-gradient(135deg, #fbbf24 0%, #92400e 50%, #fbbf24 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor : 'transparent',
          backgroundClip      : 'text',
        }}
      >
        Galeri Pra-Nikah
      </h2>

      <p
        className="text-sm text-slate-400 max-w-[280px] leading-relaxed"
        style={{ fontFamily: "var(--font-cormorant), serif" }}
      >
        Setiap gambar menyimpan sepotong cerita dari perjalanan kami menuju altar
      </p>

      <div className="flex items-center gap-3 w-44">
        <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(180,83,9,0.45))' }} />
        <span className="text-amber-600/50 text-xs">✦</span>
        <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, rgba(180,83,9,0.45))' }} />
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  return (
    <section className="w-full py-20 px-4 sm:px-6 flex flex-col items-center gap-10 relative overflow-hidden">

      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div style={{
          position: 'absolute', top: '10%', right: '-4rem',
          width: '18rem', height: '18rem', borderRadius: '9999px',
          background: 'radial-gradient(circle, rgba(120,53,15,0.07), transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', left: '-4rem',
          width: '18rem', height: '18rem', borderRadius: '9999px',
          background: 'radial-gradient(circle, rgba(120,53,15,0.07), transparent 70%)',
        }} />
      </div>

      <Header />

      {/* ─── Masonry-style CSS Grid ─────────────────────────────────────────── */}
      <div
        className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 relative z-10"
        style={{ gridAutoRows: 'clamp(140px, 20vw, 180px)' }}
      >
        {DEFAULT_ITEMS.map((item, idx) => (
          <GalleryCard
            key={item.id}
            item={item}
            index={idx}
            onSelect={setSelectedPhoto}
          />
        ))}
      </div>

      {/* ─── Lightbox Modal for Photo Preview ───────────────────────────────── */}
      <AnimatePresence>
        {selectedPhoto && (
          <Lightbox
            item={selectedPhoto}
            onClose={() => setSelectedPhoto(null)}
          />
        )}
      </AnimatePresence>

      {/* ─── Closing Quote ──────────────────────────────────────────────────── */}
      <motion.blockquote
        className="text-center max-w-sm relative z-10 mt-4 transform-gpu"
        style={{ willChange: 'transform, opacity' }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, delay: 0.25 }}
      >
        <p
          className="text-sm text-slate-500 italic leading-relaxed"
          style={{ fontFamily: "var(--font-cormorant), serif" }}
        >
          &ldquo;Seperti batik Sogan yang tumbuh dari akar bumi Jawa,
          cinta kami terpatri dalam setiap lembar kehidupan.&rdquo;
        </p>
        <footer
          className="mt-3 text-[11px] tracking-[0.32em] uppercase text-amber-800/45"
          style={{ fontFamily: "var(--font-eb-garamond), serif" }}
        >
          — Rima &amp; Adli
        </footer>
      </motion.blockquote>
    </section>
  );
}
