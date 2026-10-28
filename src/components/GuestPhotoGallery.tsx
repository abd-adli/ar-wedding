'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';

export interface GuestPhotoItem {
  id: string | number;
  image_url?: string;
  photo_url?: string;
  created_at: string;
}

const FONT_DISPLAY = 'var(--font-cinzel), serif';
const FONT_SERIF   = 'var(--font-cormorant), serif';
const FONT_SANS    = 'var(--font-eb-garamond), serif';

function formatRelativeTime(dateString: string): string {
  try {
    const diffMs = Date.now() - new Date(dateString).getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSec < 45) return 'Baru saja';
    if (diffMin < 60) return `${diffMin}m lalu`;
    if (diffHours < 24) return `${diffHours}j lalu`;
    if (diffDays < 7) return `${diffDays} hari lalu`;
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
    });
  } catch {
    return 'Baru saja';
  }
}

export default function GuestPhotoGallery() {
  const [photos, setPhotos] = useState<GuestPhotoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<GuestPhotoItem | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPhotos = useCallback(async () => {
    try {
      setRefreshing(true);
      const { data, error } = await supabase
        .from('guest_photos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Fetch guest_photos error:', error.message);
      } else if (data) {
        // Filter out items without valid image URLs
        const validPhotos = (data as GuestPhotoItem[]).filter(
          (p) => Boolean(p.image_url || p.photo_url)
        );
        setPhotos(validPhotos);
      }
    } catch (err) {
      console.warn('Fetch guest_photos exception:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchPhotos();

    // Realtime subscription to live updates
    const channel = supabase
      .channel('realtime_guest_photos')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'guest_photos' },
        (payload) => {
          const newPhoto = payload.new as GuestPhotoItem;
          if (newPhoto && (newPhoto.image_url || newPhoto.photo_url)) {
            setPhotos((prev) => {
              if (prev.some((p) => p.id === newPhoto.id)) return prev;
              return [newPhoto, ...prev];
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchPhotos]);

  return (
    <section className="w-full py-12 px-4 max-w-5xl mx-auto flex flex-col items-center">
      {/* Header Section */}
      <div className="flex flex-col items-center gap-2.5 text-center mb-8">
        <div className="flex items-center gap-2.5 w-32 sm:w-40 mb-1">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/50" />
          <span className="text-amber-500/80 text-[10px]">✦</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/50" />
        </div>

        <p
          className="text-[10px] sm:text-xs tracking-[0.45em] uppercase text-amber-400 font-semibold select-none"
          style={{ fontFamily: FONT_SANS }}
        >
          Momen Bersama Tamu
        </p>

        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200"
          style={{ fontFamily: FONT_DISPLAY }}
        >
          Galeri Kenangan Tamu
        </h2>

        <p
          className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed"
          style={{ fontFamily: FONT_SERIF }}
        >
          Koleksi foto spontan dan hangat yang diabadikan langsung oleh para tamu di hari bahagia Adli &amp; Rima
        </p>

        <div className="flex items-center gap-3 mt-2">
          <span className="text-[11px] tracking-widest text-amber-300/80 px-3 py-1 rounded-full border border-amber-500/30 bg-slate-900/60 font-mono">
            {photos.length} Foto Terabadikan
          </span>
          <button
            type="button"
            onClick={fetchPhotos}
            disabled={refreshing}
            aria-label="Refresh galeri foto"
            className="p-1.5 rounded-full border border-amber-500/30 text-amber-400 hover:text-amber-200 hover:border-amber-400 bg-slate-900/60 transition-colors disabled:opacity-50 cursor-pointer"
            title="Muat ulang foto"
          >
            <svg
              className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      {loading && photos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-400 rounded-full animate-spin" />
          <p className="text-xs text-amber-500/70 tracking-widest" style={{ fontFamily: FONT_SANS }}>
            Memuat galeri kenangan…
          </p>
        </div>
      ) : photos.length === 0 ? (
        <div className="w-full max-w-md p-8 rounded-2xl border border-amber-500/20 bg-slate-900/60 text-center flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-base text-amber-300 font-medium" style={{ fontFamily: FONT_DISPLAY }}>
            Belum Ada Foto Kenangan
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed" style={{ fontFamily: FONT_SERIF }}>
            Jadilah yang pertama mengabadikan momen berharga ini dengan tombol kamera di atas!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 w-full">
          {photos.map((item, idx) => {
            const src = item.image_url || item.photo_url || '';
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.4) }}
                onClick={() => setSelectedPhoto(item)}
                className="group relative rounded-xl overflow-hidden border border-amber-500/20 bg-slate-900/80 p-2 flex flex-col cursor-pointer transition-all duration-300 hover:border-amber-400/60 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1 transform-gpu"
                style={{ willChange: 'transform, opacity' }}
              >
                {/* Photo frame */}
                <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-slate-950 flex items-center justify-center">
                  <img
                    src={src}
                    alt="Foto Tamu Undangan"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-2">
                    <span className="text-[10px] uppercase tracking-widest text-amber-200 font-medium">
                      Perbesar
                    </span>
                  </div>
                </div>

                {/* Footer caption in card */}
                <div className="flex items-center justify-between pt-2 px-1 text-[10px] text-amber-500/70 font-mono">
                  <span className="truncate max-w-[100px]">Anchored Realm</span>
                  <span className="shrink-0">{formatRelativeTime(item.created_at)}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xs select-none"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full rounded-2xl bg-slate-950 border border-amber-500/40 p-3 sm:p-4 shadow-2xl flex flex-col items-center"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Tutup preview"
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-300 flex items-center justify-center hover:bg-amber-950 transition-colors z-10 cursor-pointer"
              >
                ✕
              </button>

              {/* High-res Image */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-black flex items-center justify-center border border-amber-500/20">
                <img
                  src={selectedPhoto.image_url || selectedPhoto.photo_url || ''}
                  alt="Foto Kenangan"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Details & Actions */}
              <div className="w-full flex items-center justify-between pt-3 px-1 text-xs text-amber-300">
                <div className="flex flex-col">
                  <span className="font-semibold text-amber-200" style={{ fontFamily: FONT_DISPLAY }}>
                    Kenangan Tamu
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date(selectedPhoto.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>

                <a
                  href={selectedPhoto.image_url || selectedPhoto.photo_url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 rounded-full text-[11px] tracking-wider uppercase text-amber-200 border border-amber-500/60 bg-amber-950/60 hover:bg-amber-900/80 transition-colors flex items-center gap-1.5 font-medium"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Buka Asli
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
