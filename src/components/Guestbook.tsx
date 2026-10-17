'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';

// ─── 1. Initialize Supabase Client ────────────────────────────────────────────
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Types ────────────────────────────────────────────────────────────────────
export interface GuestbookEntry {
  id: string | number;
  guest_name: string;
  message: string;
  created_at: string;
}

// ─── Style Constants ──────────────────────────────────────────────────────────
const FONT_DISPLAY = "'Cinzel', serif";
const FONT_SERIF   = "'Cormorant Garamond', serif";
const FONT_SANS    = "'EB Garamond', serif";

const GLASS: React.CSSProperties = {
  background: 'rgba(15, 23, 42, 0.65)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(245, 158, 11, 0.22)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
};

const GLASS_INNER: React.CSSProperties = {
  background: 'rgba(15, 23, 42, 0.45)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: '1px solid rgba(245, 158, 11, 0.16)',
};

// ─── Relative Time Formatter ──────────────────────────────────────────────────
function formatRelativeTime(dateString: string): string {
  try {
    const diffMs = Date.now() - new Date(dateString).getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSec < 45) return 'Baru saja';
    if (diffMin < 60) return `${diffMin} menit lalu`;
    if (diffHours < 24) return `${diffHours} jam lalu`;
    if (diffDays < 7) return `${diffDays} hari lalu`;
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return 'Baru saja';
  }
}

// ─── Main Guestbook Component ─────────────────────────────────────────────────
export default function Guestbook() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // ─── 4. Select Function: Fetch Messages ordered by created_at DESC ──────────
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('wedding_guestbook')
        .select('id, guest_name, message, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Fetch wedding_guestbook error:', error.message);
      } else if (data) {
        setMessages(data);
      }
    } catch (err) {
      console.warn('Fetch wedding_guestbook exception:', err);
    } finally {
      setLoading(false);
    }
  };

  // Pre-fill name from ?to= or ?guest= query parameter and fetch initial messages
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const guestParam = params.get('to') ?? params.get('guest');
      if (guestParam) {
        setName(decodeURIComponent(guestParam));
      }
    }

    // Initial select
    fetchMessages();

    // ─── 5. Realtime subscription: Updates dynamically when new row inserted ──
    const channel = supabase
      .channel('realtime_wedding_guestbook')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'wedding_guestbook' },
        (payload) => {
          const newEntry = payload.new as GuestbookEntry;
          if (newEntry && newEntry.guest_name) {
            setMessages((prev) => {
              // Avoid duplicate if already prepended optimistically
              if (prev.some((m) => m.id === newEntry.id || (m.guest_name === newEntry.guest_name && m.message === newEntry.message))) {
                return prev.map((m) =>
                  m.guest_name === newEntry.guest_name && m.message === newEntry.message ? newEntry : m
                );
              }
              return [newEntry, ...prev];
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // ─── 3. Insert Function: Save new submission to wedding_guestbook ───────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMsg('Silakan masukkan nama Anda.');
      return;
    }
    if (!message.trim()) {
      setErrorMsg('Silakan tuliskan ucapan atau doa restu Anda.');
      return;
    }

    setErrorMsg('');
    setSubmitting(true);

    const tempId = `temp-${Date.now()}`;
    const newEntry: GuestbookEntry = {
      id: tempId,
      guest_name: name.trim(),
      message: message.trim(),
      created_at: new Date().toISOString(),
    };

    // ─── 5. Dynamic Update: Immediate local state update (optimistic UI) ──────
    setMessages((prev) => [newEntry, ...prev]);
    setMessage('');
    setShowSuccessToast(true);

    setTimeout(() => {
      setShowSuccessToast(false);
    }, 4500);

    // Save to Supabase wedding_guestbook table
    try {
      const { data, error } = await supabase
        .from('wedding_guestbook')
        .insert([
          {
            guest_name: newEntry.guest_name,
            message: newEntry.message,
          },
        ])
        .select();

      if (error) {
        console.error('Insert to wedding_guestbook failed:', error.message);
      } else if (data && data[0]) {
        // Swap optimistic temporary entry with confirmed record from Supabase
        setMessages((prev) =>
          prev.map((m) => (m.id === tempId ? (data[0] as GuestbookEntry) : m))
        );
      }
      // Re-fetch to guarantee absolute synchronization
      fetchMessages();
    } catch (err) {
      console.error('Insert exception:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const focusStyle = (field: string): React.CSSProperties => ({
    ...GLASS_INNER,
    color: 'rgba(241, 245, 249, 0.95)',
    fontFamily: FONT_SERIF,
    fontSize: '1rem',
    outline: 'none',
    borderColor: focusedField === field ? 'rgba(245, 158, 11, 0.65)' : 'rgba(245, 158, 11, 0.2)',
    boxShadow: focusedField === field ? '0 0 0 3px rgba(180, 83, 9, 0.2)' : 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  });

  return (
    <section className="w-full py-12 px-4 flex flex-col items-center gap-10 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(120, 53, 15, 0.08) 0%, transparent 70%)',
        }}
      />

      {/* ── Header ── */}
      <div className="flex flex-col items-center gap-2.5 text-center">
        <svg viewBox="0 0 128 18" className="w-32 text-amber-500/50" fill="none" aria-hidden>
          <path d="M0 9 Q32 2 64 9 Q96 16 128 9" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" />
          <circle cx="64" cy="9" r="2.5" fill="currentColor" />
          <circle cx="48" cy="9" r="1.5" fill="currentColor" opacity=".55" />
          <circle cx="80" cy="9" r="1.5" fill="currentColor" opacity=".55" />
        </svg>

        <p className="text-[11px] tracking-[0.42em] uppercase text-amber-500/80 font-medium" style={{ fontFamily: FONT_SANS }}>
          Ucapan &amp; Doa Restu
        </p>

        <h2
          className="text-3xl sm:text-4xl font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
          style={{
            fontFamily: FONT_DISPLAY,
            background: 'linear-gradient(135deg, #fef3c7 0%, #fbbf24 40%, #d97706 70%, #92400e 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Buku Tamu
        </h2>

        <p className="text-sm text-slate-300/90 max-w-[280px] leading-relaxed italic" style={{ fontFamily: FONT_SERIF }}>
          Untaian doa dan harapan terbaik Anda adalah berkah terindah bagi kami.
        </p>

        <div className="flex items-center gap-3 w-40 my-1">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/40" />
          <span className="text-amber-500/50 text-xs">✦</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/40" />
        </div>
      </div>

      {/* ── 2. Form UI (Name input, Message textarea, Submit button) ── */}
      <motion.div
        className="w-full max-w-lg rounded-2xl relative overflow-hidden shadow-2xl"
        style={GLASS}
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

        <div className="p-6 sm:p-8">
          {/* Success Toast */}
          <AnimatePresence>
            {showSuccessToast && (
              <motion.div
                className="mb-5 p-3.5 rounded-xl border flex items-center gap-3 shadow-lg"
                style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  borderColor: 'rgba(52, 211, 153, 0.45)',
                  backdropFilter: 'blur(8px)',
                }}
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-xs font-medium text-emerald-200" style={{ fontFamily: FONT_SANS }}>
                  Ucapan &amp; doa restu Anda telah berhasil dikirimkan!
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4.5">
            {/* Name Input */}
            <div>
              <label className="block text-xs tracking-[0.25em] uppercase text-amber-500/85 mb-2 font-medium" style={{ fontFamily: FONT_SANS }}>
                Nama Anda
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                placeholder="Masukkan nama lengkap Anda"
                className="w-full px-4 py-3 rounded-xl placeholder-slate-500 text-sm"
                style={focusStyle('name')}
                required
              />
            </div>

            {/* Message Textarea */}
            <div>
              <label className="block text-xs tracking-[0.25em] uppercase text-amber-500/85 mb-2 font-medium" style={{ fontFamily: FONT_SANS }}>
                Ucapan &amp; Doa Restu
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                placeholder="Tuliskan ucapan dan doa tulus untuk Adli & Rima…"
                rows={3}
                className="w-full px-4 py-3 rounded-xl placeholder-slate-500 resize-none leading-relaxed text-sm"
                style={focusStyle('message')}
                required
              />
            </div>

            {/* Error Message */}
            {errorMsg && (
              <p className="text-xs text-red-400 px-1 font-medium" style={{ fontFamily: FONT_SANS }}>
                {errorMsg}
              </p>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={submitting}
              className="mt-2 w-full py-3.5 rounded-xl text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold overflow-hidden shadow-lg cursor-pointer transition-all duration-300 relative group"
              style={{
                fontFamily: FONT_SANS,
                background: 'linear-gradient(135deg, rgba(180, 83, 9, 0.88) 0%, rgba(120, 53, 15, 0.95) 100%)',
                border: '1px solid rgba(245, 158, 11, 0.55)',
                color: '#fef3c7',
                boxShadow: '0 4px 20px rgba(217, 119, 6, 0.3)',
              }}
              whileHover={{ scale: 1.02, boxShadow: '0 6px 25px rgba(245, 158, 11, 0.45)' }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center gap-2">
                {submitting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin text-amber-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <circle cx="12" cy="12" r="10" strokeOpacity=".2" />
                      <path d="M12 2a10 10 0 0110 10" strokeLinecap="round" />
                    </svg>
                    Mengirimkan…
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 7.5 7.5 0 0112 17.25h-2.625c-.621 0-1.125.504-1.125 1.125v3.375" />
                    </svg>
                    Kirim Ucapan &amp; Doa
                  </>
                )}
              </span>
            </motion.button>
          </form>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      </motion.div>

      {/* ── 4. Messages Feed List (Ordered by created_at DESC) ── */}
      <div className="w-full max-w-lg flex flex-col gap-3.5">
        <div className="flex items-center justify-between px-2 pt-2">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 text-base">💌</span>
            <h3 className="text-base sm:text-lg text-amber-300 font-medium tracking-wide" style={{ fontFamily: FONT_DISPLAY }}>
              Daftar Ucapan &amp; Doa
            </h3>
          </div>
          <span className="text-xs text-amber-500/70 font-mono">
            {messages.length} Ucapan
          </span>
        </div>

        <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-1">
          {loading && messages.length === 0 ? (
            <div className="flex justify-center items-center py-10">
              <div className="w-6 h-6 border-2 border-amber-500/30 border-t-amber-400 rounded-full animate-spin" />
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-8 px-4 rounded-xl border border-amber-500/15" style={GLASS_INNER}>
              <p className="text-sm text-slate-400 italic" style={{ fontFamily: FONT_SERIF }}>
                Belum ada ucapan. Jadilah yang pertama memberikan doa restu untuk Adli &amp; Rima!
              </p>
            </div>
          ) : (
            messages.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.03 }}
                className="p-4 rounded-xl border flex flex-col gap-2 relative overflow-hidden"
                style={GLASS_INNER}
              >
                <div className="flex items-center justify-between gap-2 border-b border-amber-500/10 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-600/40 to-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-300 text-xs font-semibold">
                      {item.guest_name ? item.guest_name.charAt(0).toUpperCase() : 'G'}
                    </div>
                    <span className="text-sm font-semibold text-amber-200 tracking-wide" style={{ fontFamily: FONT_DISPLAY }}>
                      {item.guest_name}
                    </span>
                  </div>
                  <span className="text-[11px] text-amber-500/60 shrink-0 font-light" style={{ fontFamily: FONT_SANS }}>
                    {formatRelativeTime(item.created_at)}
                  </span>
                </div>

                <p className="text-sm text-slate-200/90 leading-relaxed font-light italic pl-1" style={{ fontFamily: FONT_SERIF }}>
                  &ldquo;{item.message}&rdquo;
                </p>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
