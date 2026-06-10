import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * A thin gradient bar pinned to the very top of the viewport that fills
 * left-to-right as the page scrolls. Spring-smoothed so it feels fluid
 * rather than jumpy.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-[9997] h-[3px] origin-left"
      style={{
        scaleX,
        background:
          'linear-gradient(90deg, #7c3aed, #a855f7, #06b6d4)',
        boxShadow: '0 0 12px rgba(124, 58, 237, 0.6)',
      }}
    />
  );
}
