'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';

// ─── Types ────────────────────────────────────────────────────────────────────

type UIState =
  | 'idle'       // camera not yet started
  | 'loading'    // getUserMedia in flight
  | 'live'       // camera running, ready to shoot
  | 'processing' // canvas compositing in progress
  | 'uploading'  // blob → supabase in flight
  | 'success'    // upload complete
  | 'error';     // something went wrong

// ─── Constants ───────────────────────────────────────────────────────────────

const BUCKET = 'dissposcam-bucket';
const FOLDER = 'disposscam-images';
const TABLE  = 'guest_photos';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Apply a subtle film-grain effect to an ImageData in-place. */
function applyGrain(imageData: ImageData, intensity = 22): void {
  const { data } = imageData;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * intensity;
    data[i]     = Math.min(255, Math.max(0, data[i]     + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
    // alpha unchanged
  }
}

/** Warm sepia-tinted colour grade: slightly boost reds, pull blues. */
function applyColourGrade(imageData: ImageData): void {
  const { data } = imageData;
  for (let i = 0; i < data.length; i += 4) {
    data[i]     = Math.min(255, data[i]     * 1.08); // R +8 %
    data[i + 2] = Math.min(255, data[i + 2] * 0.88); // B -12 %
  }
}

/** Fallback gold border and corner ornaments drawn directly on canvas */
function drawFallbackFrame(ctx: CanvasRenderingContext2D, size: number): void {
  ctx.save();
  const outer = Math.round(size * 0.035);
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.75)';
  ctx.lineWidth = Math.max(1, Math.round(size * 0.003));
  ctx.strokeRect(outer, outer, size - outer * 2, size - outer * 2);

  const inner = Math.round(size * 0.048);
  ctx.strokeStyle = 'rgba(217, 119, 6, 0.5)';
  ctx.lineWidth = Math.max(1, Math.round(size * 0.002));
  ctx.strokeRect(inner, inner, size - inner * 2, size - inner * 2);

  // Corner accents
  const len = Math.round(size * 0.06);
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = Math.max(2, Math.round(size * 0.004));
  ctx.beginPath();
  // top-left
  ctx.moveTo(outer, outer + len);
  ctx.lineTo(outer, outer);
  ctx.lineTo(outer + len, outer);
  // top-right
  ctx.moveTo(size - outer - len, outer);
  ctx.lineTo(size - outer, outer);
  ctx.lineTo(size - outer, outer + len);
  // bottom-left
  ctx.moveTo(outer, size - outer - len);
  ctx.lineTo(outer, size - outer);
  ctx.lineTo(outer + len, size - outer);
  // bottom-right
  ctx.moveTo(size - outer - len, size - outer);
  ctx.lineTo(size - outer, size - outer);
  ctx.lineTo(size - outer, size - outer - len);
  ctx.stroke();
  ctx.restore();
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader() {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      {/* Wavy ornament */}
      <svg
        viewBox="0 0 128 18"
        className="w-32 text-amber-700/50"
        fill="none"
        aria-hidden
      >
        <path
          d="M0 9 Q32 2 64 9 Q96 16 128 9"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
        <circle cx="64" cy="9" r="2.5" fill="currentColor" />
        <circle cx="48" cy="9" r="1.5" fill="currentColor" opacity=".55" />
        <circle cx="80" cy="9" r="1.5" fill="currentColor" opacity=".55" />
      </svg>

      <p className="text-[11px] tracking-[0.4em] uppercase text-amber-600/70">
        Tinggalkan Kenangan
      </p>

      <h2
        className="text-3xl sm:text-4xl font-light tracking-wide"
        style={{
          fontFamily: "var(--font-cinzel), serif",
          background:
            'linear-gradient(135deg, #fbbf24 0%, #92400e 50%, #fbbf24 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Disposs Cam
      </h2>

      <p className="text-sm text-slate-400 max-w-[260px] leading-relaxed"
         style={{ fontFamily: "var(--font-cormorant), serif" }}>
        Abadikan momen indah dengan sentuhan kamera analog bergaya Sogan
      </p>

      {/* Ornament divider */}
      <div className="flex items-center gap-3 w-44">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-700/40" />
        <span className="text-amber-600/50 text-xs">✦</span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-700/40" />
      </div>
    </div>
  );
}

/** Camera icon (heroicons outline camera) */
function IconCamera({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.4}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07
           4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012
           2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

/** Spinning loader ring */
function Spinner() {
  return (
    <div className="relative w-14 h-14">
      <svg
        className="w-14 h-14 text-amber-600 animate-spin"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden
      >
        <circle
          cx="24" cy="24" r="20"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity=".18"
        />
        <path
          d="M24 4a20 20 0 0120 20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[10px] tracking-widest text-amber-600/80">
        AR
      </span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DispossCam() {
  const videoRef   = useRef<HTMLVideoElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const streamRef  = useRef<MediaStream | null>(null);
  /** Pre-loaded overlay image so canvas compositing is synchronous. */
  const overlayImg = useRef<HTMLImageElement | null>(null);
  const [frameError,  setFrameError]  = useState(false);

  const [uiState,     setUiState]     = useState<UIState>('idle');
  const [errorMsg,    setErrorMsg]    = useState('');
  const [capturedUrl, setCapturedUrl] = useState<string | null>(null);
  const [flash,       setFlash]       = useState(false);

  // ── Pre-load frame overlay ─────────────────────────────────────────────────
  useEffect(() => {
    const img       = new window.Image();
    img.crossOrigin = 'anonymous';
    img.src         = '/frame-sogan.png';
    img.onload      = () => { overlayImg.current = img; setFrameError(false); };
    img.onerror     = () => { overlayImg.current = null; setFrameError(true); };
  }, []);

  // ── Debug Supabase Storage Connection & Buckets ────────────────────────────
  useEffect(() => {
    async function debugStorageConnection() {
      console.log('%c[DispossCam Storage Debug]', 'color: #f59e0b; font-weight: bold;');
      console.log('Target Bucket:', BUCKET);
      console.log('Testing supabase.storage.listBuckets()...');

      try {
        const { data: buckets, error: bError } = await supabase.storage.listBuckets();
        console.log('[DispossCam Debug] listBuckets() raw response:', {
          data: buckets,
          error: bError,
          status: bError ? (bError as any).status || (bError as any).statusCode : 'OK',
        });

        console.log(`[DispossCam Debug] Testing supabase.storage.from('${BUCKET}').list('${FOLDER}')...`);
        const { data: files, error: fError } = await supabase.storage.from(BUCKET).list(FOLDER, { limit: 5 });
        console.log(`[DispossCam Debug] from('${BUCKET}').list('${FOLDER}') raw response:`, {
          data: files,
          error: fError,
          status: fError ? (fError as any).status || (fError as any).statusCode : 'OK',
        });
      } catch (err) {
        console.error('[DispossCam Debug] Exception during storage diagnostic:', err);
      }
    }

    debugStorageConnection();
  }, []);

  // ── Cleanup stream on unmount ──────────────────────────────────────────────
  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach(t => t.stop());
    };
  }, []);

  // ── Start camera ───────────────────────────────────────────────────────────
  const startCamera = useCallback(async () => {
    setUiState('loading');
    setErrorMsg('');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode : { ideal: 'environment' },
          width      : { ideal: 1280 },
          height     : { ideal: 1280 },
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setUiState('live');
    } catch (err) {
      console.error('[DispossCam] getUserMedia error:', err);
      setErrorMsg(
        'Gagal mengakses kamera. Pastikan izin kamera sudah diberikan.',
      );
      setUiState('error');
    }
  }, []);

  // ── Stop stream ────────────────────────────────────────────────────────────
  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
  }, []);

  // ── Capture → composite → upload ──────────────────────────────────────────
  const handleCapture = useCallback(async () => {
    const video  = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || uiState !== 'live') return;

    // Flash effect
    setFlash(true);
    setTimeout(() => setFlash(false), 280);

    setUiState('processing');

    // Square crop from centre
    const size = Math.min(video.videoWidth, video.videoHeight);
    canvas.width  = size;
    canvas.height = size;

    const ctx = canvas.getContext('2d');
    if (!ctx) { setUiState('error'); setErrorMsg('Canvas context unavailable.'); return; }

    // 1. Draw video frame (centre-cropped square)
    const sx = (video.videoWidth  - size) / 2;
    const sy = (video.videoHeight - size) / 2;
    ctx.drawImage(video, sx, sy, size, size, 0, 0, size, size);

    // 2. Colour grade
    const imgData = ctx.getImageData(0, 0, size, size);
    applyColourGrade(imgData);
    applyGrain(imgData);
    ctx.putImageData(imgData, 0, 0);

    // 3. Frame overlay
    if (overlayImg.current && overlayImg.current.complete && overlayImg.current.naturalWidth > 0) {
      try {
        ctx.drawImage(overlayImg.current, 0, 0, size, size);
      } catch {
        drawFallbackFrame(ctx, size);
      }
    } else {
      drawFallbackFrame(ctx, size);
    }

    stopStream();

    // 4. Export as JPEG blob
    canvas.toBlob(async (blob) => {
      if (!blob) {
        setErrorMsg('Gagal memproses foto. Silakan coba lagi.');
        setUiState('error');
        return;
      }

      setUiState('uploading');

      const fileName = `guest_${Date.now()}.jpg`;
      const filePath = `${FOLDER}/${fileName}`;

      try {
        console.log(`[DispossCam Debug] Uploading ${blob.size} bytes to '${BUCKET}/${filePath}'...`);

        // 5. Upload to Supabase Storage inside 'disposscam-images' folder
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from(BUCKET)
          .upload(filePath, blob, {
            contentType : 'image/jpeg',
            upsert      : false,
          });

        console.log('[DispossCam Debug] Upload raw result:', { data: uploadData, error: uploadError });

        if (uploadError) throw uploadError;

        // 6. Retrieve public URL
        const { data: urlData } = supabase.storage
          .from(BUCKET)
          .getPublicUrl(filePath);

        const publicUrl = urlData.publicUrl;

        // 7. Insert record into guest_photos table (supports image_url or photo_url)
        let { error: insertError } = await supabase
          .from(TABLE)
          .insert({
            image_url  : publicUrl,
            created_at : new Date().toISOString(),
          });

        if (insertError && insertError.message?.includes('image_url')) {
          const { error: fallbackError } = await supabase
            .from(TABLE)
            .insert({
              photo_url  : publicUrl,
              created_at : new Date().toISOString(),
            });
          insertError = fallbackError;
        }

        if (insertError) throw insertError;

        setCapturedUrl(publicUrl);
        setUiState('success');
      } catch (err: unknown) {
        // Robust stringify handling standard non-enumerable properties on Error objects
        let errorStringified = '';
        try {
          if (err && typeof err === 'object') {
            errorStringified = JSON.stringify(err, Object.getOwnPropertyNames(err), 2);
            if (errorStringified === '{}' || errorStringified === '{\n}') {
              errorStringified = JSON.stringify(err, null, 2);
            }
          } else {
            errorStringified = String(err);
          }
        } catch {
          errorStringified = String(err);
        }

        console.error('[DispossCam] raw error:', errorStringified);
        console.error('[DispossCam] err.message:', (err as any)?.message);
        console.error('[DispossCam] err.name:', (err as any)?.name);
        console.error('[DispossCam] err.error_description:', (err as any)?.error_description);
        console.error('[DispossCam] error properties:', {
          status: (err as any)?.status || (err as any)?.statusCode,
          code: (err as any)?.code,
          details: (err as any)?.details,
          hint: (err as any)?.hint,
        });

        const displayMsg =
          (err as any)?.message ||
          (err as any)?.error_description ||
          (err as any)?.error ||
          (errorStringified && errorStringified !== '{}'
            ? errorStringified
            : 'Gagal mengunggah foto. Coba lagi.');

        setErrorMsg(displayMsg);
        setUiState('error');
      }
    }, 'image/jpeg', 0.92);
  }, [uiState, stopStream]);

  // ── Reset ──────────────────────────────────────────────────────────────────
  const handleRetake = useCallback(() => {
    stopStream();
    setCapturedUrl(null);
    setErrorMsg('');
    setUiState('idle');
  }, [stopStream]);

  // ─────────────────────────────────────────────────────────────────────────
  // Derived booleans
  const isLive       = uiState === 'live';
  const isIdle       = uiState === 'idle';
  const isError      = uiState === 'error';
  const isSuccess    = uiState === 'success';
  const isBusy       = uiState === 'loading' || uiState === 'processing' || uiState === 'uploading';

  // ── Label for busy states ──────────────────────────────────────────────────
  const busyLabel =
    uiState === 'loading'    ? 'Membuka kamera...'     :
    uiState === 'processing' ? 'Memproses foto...'     :
    uiState === 'uploading'  ? 'Menyimpan kenangan...' : '';

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <section className="w-full py-20 px-4 flex flex-col items-center gap-10 relative overflow-hidden">

      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[480px] h-48 rounded-full pointer-events-none"
        style={{
          background : 'radial-gradient(ellipse, rgba(180,83,9,0.08) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <SectionHeader />

      {/* ── Camera body (Polaroid style) ── */}
      <motion.div
        className="w-full max-w-sm"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        {/* Outer card */}
        <div
          className="rounded-2xl p-3 pb-14 relative"
          style={{
            background  : 'rgba(15,23,42,0.65)',
            backdropFilter: 'blur(18px)',
            border      : '1px solid rgba(245,158,11,0.15)',
          }}
        >
          {/* Film header strip */}
          <div className="flex justify-between items-center px-1 mb-2">
            <span className="text-[10px] tracking-widest text-amber-800/50 uppercase">
              Anchored Realm
            </span>
            <span className="text-[10px] tracking-widest text-amber-800/50 uppercase">
              AR — 2027
            </span>
          </div>

          {/* ── Viewfinder ── */}
          <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-950">

            {/* Flash overlay */}
            <AnimatePresence>
              {flash && (
                <motion.div
                  key="flash"
                  className="absolute inset-0 bg-white z-50"
                  initial={{ opacity: 0.85 }}
                  animate={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28 }}
                />
              )}
            </AnimatePresence>

            {/* Live video */}
            <video
              ref={videoRef}
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover"
              style={{ display: isLive ? 'block' : 'none' }}
            />

            {/* Frame overlay (while live) */}
            {isLive && (
              <div className="absolute inset-0 pointer-events-none z-10">
                {!frameError ? (
                  <Image
                    src="/frame-sogan.png"
                    alt="Frame Sogan"
                    fill
                    className="object-cover"
                    priority
                    onError={() => setFrameError(true)}
                  />
                ) : (
                  <div className="absolute inset-2 border-2 border-amber-500/60 rounded-xl pointer-events-none">
                    <div className="absolute inset-1.5 border border-amber-600/35 rounded-lg pointer-events-none" />
                  </div>
                )}
              </div>
            )}

            {/* Captured photo */}
            <AnimatePresence>
              {isSuccess && capturedUrl && (
                <motion.img
                  key="captured"
                  src={capturedUrl}
                  alt="Foto berhasil diambil"
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </AnimatePresence>

            {/* Idle / Error states */}
            <AnimatePresence>
              {(isIdle || isError) && (
                <motion.div
                  key="idle-panel"
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="p-4 rounded-full"
                    style={{
                      background : 'rgba(15,23,42,0.7)',
                      border     : '1px solid rgba(180,83,9,0.3)',
                      animation  : 'disposs-float 5s ease-in-out infinite',
                    }}
                  >
                    <IconCamera className="w-10 h-10 text-amber-700/60" />
                  </div>

                  {isError ? (
                    <p className="text-xs text-red-400/80 text-center max-w-[200px] leading-relaxed px-3">
                      {errorMsg}
                    </p>
                  ) : (
                    <p className="text-xs text-amber-800/50 tracking-wide">
                      Ketuk untuk membuka kamera
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Busy overlay */}
            <AnimatePresence>
              {isBusy && (
                <motion.div
                  key="busy-panel"
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-20"
                  style={{ background: 'rgba(2,6,23,0.75)', backdropFilter: 'blur(6px)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <Spinner />
                  <p className="text-xs tracking-[0.22em] uppercase text-amber-600/80">
                    {busyLabel}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Live viewfinder corner marks */}
            {isLive && (
              <>
                {[
                  'top-2    left-2  border-t-2 border-l-2 rounded-tl',
                  'top-2    right-2 border-t-2 border-r-2 rounded-tr',
                  'bottom-2 left-2  border-b-2 border-l-2 rounded-bl',
                  'bottom-2 right-2 border-b-2 border-r-2 rounded-br',
                ].map((cls) => (
                  <div
                    key={cls}
                    className={`absolute w-5 h-5 border-amber-500/50 z-20 ${cls}`}
                  />
                ))}
              </>
            )}
          </div>

          {/* Polaroid caption strip */}
          <div className="absolute bottom-0 inset-x-0 h-14 flex items-center justify-center">
            <p className="text-[10px] tracking-[0.28em] text-amber-900/40 uppercase">
              {isSuccess ? '✦  Tersimpan  ✦' : 'Anchored Realm  ·  AR Wedding 2027'}
            </p>
          </div>
        </div>

        {/* ── Control buttons (below polaroid) ── */}
        <div className="mt-6 flex justify-center">
          <AnimatePresence mode="wait">

            {/* IDLE: open camera */}
            {isIdle && (
              <motion.button
                key="btn-open"
                onClick={startCamera}
                className="px-8 py-3 rounded-full text-sm tracking-[0.22em] uppercase text-amber-500 transition-colors duration-300"
                style={{ border: '1px solid rgba(217,119,6,0.45)' }}
                whileHover={{ scale: 1.04, backgroundColor: 'rgba(245,158,11,0.08)' }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                Buka Kamera
              </motion.button>
            )}

            {/* LIVE: shutter button */}
            {isLive && (
              <motion.button
                key="btn-shutter"
                onClick={handleCapture}
                aria-label="Ambil foto"
                className="relative w-16 h-16 rounded-full flex items-center justify-center group"
                style={{ border: '2px solid rgba(217,119,6,0.55)', background: 'rgba(15,23,42,0.8)' }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.88 }}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ type: 'spring', stiffness: 280, damping: 18 }}
              >
                <span
                  className="w-11 h-11 rounded-full bg-amber-500 group-hover:bg-amber-400 transition-colors duration-200"
                  style={{ boxShadow: '0 0 18px rgba(217,119,6,0.5)' }}
                />
              </motion.button>
            )}

            {/* ERROR: retry */}
            {isError && (
              <motion.button
                key="btn-retry"
                onClick={handleRetake}
                className="px-8 py-3 rounded-full text-sm tracking-[0.22em] uppercase text-red-400 transition-colors duration-300"
                style={{ border: '1px solid rgba(239,68,68,0.35)' }}
                whileHover={{ scale: 1.04, backgroundColor: 'rgba(239,68,68,0.07)' }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                Coba Lagi
              </motion.button>
            )}

            {/* SUCCESS: download + retake */}
            {isSuccess && (
              <motion.div
                key="btn-success-group"
                className="flex gap-3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <a
                  href={capturedUrl ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full text-sm tracking-widest uppercase text-amber-400 flex items-center gap-2 transition-colors duration-200"
                  style={{ border: '1px solid rgba(217,119,6,0.45)', background: 'rgba(180,83,9,0.1)' }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0
                         0l-4-4m4 4V4" />
                  </svg>
                  Simpan
                </a>

                <button
                  onClick={handleRetake}
                  className="px-5 py-2.5 rounded-full text-sm tracking-widest uppercase text-slate-400 transition-colors duration-200"
                  style={{ border: '1px solid rgba(71,85,105,0.5)' }}
                >
                  Foto Lagi
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Success toast */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              className="mt-4 flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{
                background  : 'rgba(15,23,42,0.6)',
                border      : '1px solid rgba(180,83,9,0.25)',
                backdropFilter: 'blur(12px)',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <svg className="w-5 h-5 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-xs text-amber-400/80 leading-snug">
                Kenangan berhasil diabadikan &amp; tersimpan di album kami ✨
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Hidden compositing canvas */}
      <canvas ref={canvasRef} className="hidden" aria-hidden />

      {/* Float keyframe (injected via style tag to avoid Tailwind purge) */}
      <style>{`
        @keyframes disposs-float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-7px); }
        }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
