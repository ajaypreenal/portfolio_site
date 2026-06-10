import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TransitionCtx {
  /** Animate a covering curtain, jump to the target section, then reveal. */
  navigate: (href: string) => void;
}

const Ctx = createContext<TransitionCtx>({ navigate: () => {} });

// eslint-disable-next-line react-refresh/only-export-components
export const usePageTransition = () => useContext(Ctx);

const COLUMNS = 6;

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(false);
  const busy = useRef(false);

  const scrollToTarget = (href: string) => {
    if (href === '#hero' || href === '#top') {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' });
  };

  const navigate = useCallback((href: string) => {
    if (busy.current) return;

    // Reduced motion: skip the curtain, just smooth-scroll.
    if (prefersReducedMotion()) {
      const el = href === '#hero' ? null : document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    busy.current = true;
    setActive(true);

    // Once the curtain has covered the screen, jump instantly (unseen),
    // then trigger the reveal.
    window.setTimeout(() => {
      scrollToTarget(href);
      window.setTimeout(() => {
        setActive(false);
        window.setTimeout(() => {
          busy.current = false;
        }, 650);
      }, 90);
    }, 560);
  }, []);

  return (
    <Ctx.Provider value={{ navigate }}>
      {children}

      <AnimatePresence>
        {active && (
          <motion.div
            key="curtain"
            className="fixed inset-0 z-[9998] flex"
            initial="hidden"
            animate="cover"
            exit="reveal"
            variants={{
              cover: { transition: { staggerChildren: 0.05, delayChildren: 0 } },
              reveal: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
            }}
          >
            {Array.from({ length: COLUMNS }).map((_, i) => (
              <motion.div
                key={i}
                className="relative h-full flex-1"
                style={{
                  background:
                    'linear-gradient(180deg, #0b0b0b 0%, #0e0a16 60%, #0b0b0b 100%)',
                  borderRight:
                    i < COLUMNS - 1 ? '1px solid rgba(124,58,237,0.10)' : 'none',
                }}
                variants={{
                  hidden: { scaleY: 0, transformOrigin: 'top' },
                  cover: {
                    scaleY: 1,
                    transformOrigin: 'top',
                    transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] },
                  },
                  reveal: {
                    scaleY: 0,
                    transformOrigin: 'bottom',
                    transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] },
                  },
                }}
              >
                {/* Accent line riding the leading edge of each column */}
                <motion.span
                  className="absolute inset-x-0 bottom-0 block h-px"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(168,85,247,0.8), transparent)',
                  }}
                />
              </motion.div>
            ))}

            {/* Centre mark while covered */}
            <motion.div
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.18, duration: 0.2 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              <span className="font-mono text-xs tracking-[0.4em] text-purple-400/80">
                APD
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
