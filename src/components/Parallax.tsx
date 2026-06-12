import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * Scroll-driven parallax wrapper. As the element travels through the
 * viewport, its content shifts on the Y axis (and can fade), creating a
 * sense of depth between layers.
 *
 * `speed` is the total vertical travel in px across the full scroll pass:
 *   - positive  -> moves up as you scroll down (recedes, "background")
 *   - negative  -> moves down as you scroll down (leads, "foreground")
 *
 * Skipped entirely for reduced-motion users (renders a plain wrapper),
 * so nothing shifts for people who opt out.
 */
export default function Parallax({
  children,
  speed = 60,
  fade = false,
  className = '',
}: {
  children: ReactNode;
  speed?: number;
  fade?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Travel from +speed/2 (entering) to -speed/2 (leaving).
  const rawY = useTransform(scrollYProgress, [0, 1], [speed / 2, -speed / 2]);
  const y = useSpring(rawY, { stiffness: 90, damping: 30, restDelta: 0.001 });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    fade ? [0.4, 1, 1, 0.4] : [1, 1, 1, 1]
  );

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  );
}
