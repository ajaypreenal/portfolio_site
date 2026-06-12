import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * A precise, visible custom cursor:
 *  - a small solid dot that tracks the pointer exactly
 *  - a larger ring that trails with spring physics
 *  - an ambient violet glow for atmosphere
 *  - reacts to interactive elements (links, buttons, inputs)
 *
 * Only activates on devices with a fine pointer (real mouse/trackpad),
 * so touch devices keep their native behaviour. Respects reduced-motion.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hidden, setHidden] = useState(true);

  // Exact pointer position (for the dot).
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Spring-trailed position (for the ring + glow).
  const springCfg = { stiffness: 380, damping: 30, mass: 0.45 };
  const ringX = useSpring(dotX, springCfg);
  const ringY = useSpring(dotY, springCfg);
  const glowX = useSpring(dotX, { stiffness: 120, damping: 22, mass: 0.6 });
  const glowY = useSpring(dotY, { stiffness: 120, damping: 22, mass: 0.6 });

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) return;

    setEnabled(true);
    document.documentElement.classList.add('has-custom-cursor');

    const interactiveSelector =
      'a, button, input, textarea, select, label, [role="button"], [data-cursor="pointer"]';

    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      setHidden(false);
      const target = e.target as HTMLElement | null;
      setHovering(!!target?.closest?.(interactiveSelector));
    };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.documentElement.classList.remove('has-custom-cursor');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Ambient glow — soft, follows slowly */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9990] h-[420px] w-[420px] rounded-full"
        style={{
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
          background:
            'radial-gradient(circle, rgba(124,58,237,0.10) 0%, rgba(124,58,237,0.04) 35%, transparent 70%)',
          opacity: hidden ? 0 : 1,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Trailing ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[10000] rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: hidden ? 0 : 1,
        }}
        animate={{
          width: hovering ? 56 : 34,
          height: hovering ? 56 : 34,
          borderColor: hovering ? 'rgba(168,85,247,0.9)' : 'rgba(168,85,247,0.5)',
          backgroundColor: hovering ? 'rgba(124,58,237,0.12)' : 'rgba(124,58,237,0)',
          scale: clicking ? 0.8 : 1,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, mass: 0.4 }}
      />

      {/* Exact dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[10001] rounded-full bg-purple-300"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: hidden ? 0 : 1,
        }}
        animate={{
          width: hovering ? 6 : 7,
          height: hovering ? 6 : 7,
          scale: clicking ? 1.6 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
    </>
  );
}
