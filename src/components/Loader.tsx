import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Brief page-load intro: the APD mark with a progress line that fills,
 * then the whole panel slides up to reveal the site. Skipped entirely
 * for users who prefer reduced motion.
 */
export default function Loader() {
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [done, setDone] = useState(reduced);

  useEffect(() => {
    if (reduced) return;
    const t = window.setTimeout(() => setDone(true), 1500);
    return () => window.clearTimeout(t);
  }, [reduced]);

  // Lock scroll while the intro is showing.
  useEffect(() => {
    if (done) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10050] flex flex-col items-center justify-center bg-[#080808]"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Logo mark */}
          <motion.div
            className="mb-6 flex items-center gap-2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-purple-700">
              <span className="font-mono text-xs font-bold text-white">&gt;_</span>
            </div>
            <span className="font-mono text-base font-bold tracking-[0.3em] text-[#f5f5f5]">
              APD
            </span>
          </motion.div>

          {/* Progress line */}
          <div className="h-px w-40 overflow-hidden bg-[#1f1f1f]">
            <motion.div
              className="h-full"
              style={{
                background:
                  'linear-gradient(90deg, #7c3aed, #a855f7)',
              }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <motion.span
            className="mt-4 font-mono text-[10px] tracking-[0.3em] text-[#555]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            LOADING PORTFOLIO
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
