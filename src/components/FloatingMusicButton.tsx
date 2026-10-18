'use client';

import { motion } from 'framer-motion';

interface FloatingMusicButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
  isOpened: boolean;
}

export default function FloatingMusicButton({
  isPlaying,
  onToggle,
  isOpened,
}: FloatingMusicButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-label={isPlaying ? 'Jeda Musik (Cundamani)' : 'Putar Musik (Cundamani)'}
      title={isPlaying ? 'Jeda Musik' : 'Putar Musik (Cundamani)'}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 p-1.5 rounded-full cursor-pointer focus:outline-none select-none transition-shadow duration-300 group transform-gpu"
      style={{
        willChange: 'transform, opacity',
        backgroundColor: 'rgba(15, 23, 42, 0.96)',
        border: '1.5px solid rgba(245, 158, 11, 0.55)',
        boxShadow: isPlaying
          ? '0 6px 25px rgba(0, 0, 0, 0.6), 0 0 18px rgba(245, 158, 11, 0.4)'
          : '0 4px 18px rgba(0, 0, 0, 0.5)',
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={isOpened ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
    >
      {/* Vinyl record container */}
      <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center">
        {/* Spinning Vinyl Disc - Pure Tailwind animate-[spin_3s_linear_infinite] CSS animation */}
        <div
          className={`w-full h-full rounded-full flex items-center justify-center relative overflow-hidden shadow-inner transform-gpu ${
            isPlaying ? 'animate-[spin_3s_linear_infinite]' : ''
          }`}
          style={{
            background: 'radial-gradient(circle, #292524 0%, #1c1917 38%, #0c0a09 72%, #1c1917 100%)',
          }}
        >
          {/* Concentric Vinyl Grooves */}
          <div className="absolute inset-1 rounded-full border border-amber-500/15 pointer-events-none" />
          <div className="absolute inset-2 rounded-full border border-amber-500/10 pointer-events-none" />
          <div className="absolute inset-3 rounded-full border border-amber-500/15 pointer-events-none" />

          {/* Center Gold Vinyl Label */}
          <div
            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center relative z-10"
            style={{
              background: 'linear-gradient(135deg, #fbbf24 0%, #b45309 100%)',
              boxShadow: '0 0 6px rgba(245, 158, 11, 0.4)',
            }}
          >
            {/* Spindle hole */}
            <div className="w-1.5 h-1.5 rounded-full bg-slate-900 shadow-inner" />
          </div>
        </div>

        {/* Center Music Note / Play Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          {!isPlaying ? (
            <div className="w-5 h-5 rounded-full bg-black/80 flex items-center justify-center text-amber-300">
              <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current ml-0.5" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          ) : (
            <div className="text-amber-100 text-[10px] sm:text-xs font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
              ♫
            </div>
          )}
        </div>

        {/* Mini Active/Paused Status Badge */}
        <div
          className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border border-slate-900 flex items-center justify-center text-[7px] font-bold text-white shadow-sm transition-colors duration-300 ${
            isPlaying ? 'bg-emerald-500' : 'bg-amber-600'
          }`}
        >
          {isPlaying ? '♪' : '✕'}
        </div>
      </div>
    </motion.button>
  );
}
