'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FONT_DISPLAY = "var(--font-cinzel), serif";
const FONT_SERIF   = "var(--font-cormorant), serif";

interface BankAccount {
  id: string;
  bankName: string;
  bankBadge: string;
  accountNumber: string;
  accountHolder: string;
  colorAccent: string;
  badgeBg: string;
}

const BANK_ACCOUNTS: BankAccount[] = [
  {
    id: 'bca',
    bankName: 'Bank BCA',
    bankBadge: 'BCA',
    accountNumber: '7402232806',
    accountHolder: 'Abdul Qodir Adli',
    colorAccent: 'rgba(59, 130, 246, 0.4)',
    badgeBg: 'bg-blue-600/30 text-blue-300 border-blue-400/40',
  },
  {
    id: 'bni',
    bankName: 'Bank BNI',
    bankBadge: 'BNI',
    accountNumber: '1794912663',
    accountHolder: 'Rima Sugiarto',
    colorAccent: 'rgba(249, 115, 22, 0.4)',
    badgeBg: 'bg-orange-600/30 text-orange-300 border-orange-400/40',
  },
  {
    id: 'mandiri',
    bankName: 'Bank Mandiri',
    bankBadge: 'MANDIRI',
    accountNumber: '1670010244571',
    accountHolder: 'Abdul Qodir Adli',
    colorAccent: 'rgba(234, 179, 8, 0.4)',
    badgeBg: 'bg-amber-600/30 text-amber-300 border-amber-400/40',
  },
];

export default function DigitalGift() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, num: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(num);
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId(null);
      }, 2500);
    }
  };

  return (
    <section className="relative w-full flex flex-col items-center py-16 px-4">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.15) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center">
        {/* Subtitle / Header Badge */}
        <motion.p
          className="text-xs sm:text-sm tracking-[0.38em] uppercase text-amber-500/80 mb-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
          style={{ fontFamily: FONT_SERIF }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          Tanda Kasih
        </motion.p>

        {/* Title */}
        <motion.h2
          className="text-3xl sm:text-4xl text-amber-300 font-normal tracking-wider mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
          style={{ fontFamily: FONT_DISPLAY }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Amplop Digital
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-xs sm:text-sm text-slate-300/85 italic leading-relaxed max-w-lg mb-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
          style={{ fontFamily: FONT_SERIF }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Doa restu Anda merupakan karunia terindah bagi kami. Namun jika memberi adalah ungkapan kasih Anda, kado digital dapat disalurkan melalui rekening berikut:
        </motion.p>

        {/* Bank Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {BANK_ACCOUNTS.map((bank, index) => {
            const isCopied = copiedId === bank.id;
            return (
              <motion.div
                key={bank.id}
                className="relative flex flex-col justify-between p-6 rounded-2xl border backdrop-blur-md overflow-hidden text-left shadow-xl group transition-all duration-300"
                style={{
                  background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.85) 100%)',
                  borderColor: 'rgba(245, 158, 11, 0.25)',
                  boxShadow: `0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 20px ${bank.colorAccent}`,
                }}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: 0.15 * index }}
                whileHover={{ y: -4, borderColor: 'rgba(245, 158, 11, 0.5)' }}
              >
                {/* Metallic Card Chip Accent */}
                <div className="flex items-center justify-between w-full mb-6">
                  {/* EMV Chip Visual */}
                  <div className="w-10 h-7 rounded-md border border-amber-400/40 bg-gradient-to-br from-amber-200/30 via-amber-400/20 to-amber-600/30 flex items-center justify-center p-1 shadow-inner">
                    <div className="w-full h-full border border-amber-400/30 rounded-[3px] grid grid-cols-2 gap-0.5 opacity-60">
                      <div className="border-r border-b border-amber-400/30" />
                      <div className="border-b border-amber-400/30" />
                      <div className="border-r border-amber-400/30" />
                      <div />
                    </div>
                  </div>

                  {/* Bank Badge */}
                  <span
                    className={`px-3 py-1 text-xs font-bold tracking-widest rounded-full border ${bank.badgeBg}`}
                    style={{ fontFamily: FONT_DISPLAY }}
                  >
                    {bank.bankBadge}
                  </span>
                </div>

                {/* Account Details */}
                <div className="flex flex-col gap-1 mb-6">
                  <span className="text-[10px] tracking-[0.25em] text-slate-400 uppercase" style={{ fontFamily: FONT_SERIF }}>
                    Nomor Rekening
                  </span>
                  <span className="text-xl sm:text-2xl font-mono text-amber-200 tracking-wider font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                    {bank.accountNumber}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-300/90 font-medium tracking-wide mt-1" style={{ fontFamily: FONT_DISPLAY }}>
                    a.n. {bank.accountHolder}
                  </span>
                </div>

                {/* Copy Button */}
                <button
                  type="button"
                  onClick={() => handleCopy(bank.id, bank.accountNumber)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    isCopied
                      ? 'bg-emerald-600/80 text-emerald-100 border border-emerald-400'
                      : 'bg-amber-600/20 hover:bg-amber-600/35 text-amber-300 border border-amber-500/40 hover:border-amber-400'
                  }`}
                  style={{ fontFamily: FONT_SERIF }}
                >
                  <AnimatePresence mode="wait">
                    {isCopied ? (
                      <motion.span
                        key="copied"
                        className="flex items-center gap-1.5"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <svg className="w-4 h-4 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Tersalin!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        className="flex items-center gap-1.5"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Salin No. Rekening
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
