import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  useReducedMotion,
} from 'framer-motion';

/**
 * A faint, translucent figure that free-falls down the centre of the page as
 * you scroll. He is deliberately low-contrast — barely-there atmosphere rather
 * than a focal point. Scroll progress drives a slow descent plus a gentle
 * tumble and drift, and his opacity lifts a little only while you're actively
 * scrolling, so he fades back almost to nothing when the page is still.
 *
 * Purely ambient: pointer-events are off and the whole effect is skipped for
 * reduced-motion users.
 */
export default function FallingBoy() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Smooth the raw scroll so the descent glides instead of snapping.
  const p = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 20,
    restDelta: 0.0005,
  });

  // Fall from near the top of the viewport to near the bottom.
  const y = useTransform(p, [0, 1], ['6vh', '78vh']);

  // A slow tumble over the length of the page.
  const rotate = useTransform(p, [0, 1], [-8, 348]);

  // Very gentle side drift so he doesn't fall like a plumb line.
  const x = useTransform(p, [0, 0.3, 0.6, 1], [0, 16, -14, 8]);

  // Stay almost invisible at rest; firm up a touch while scrolling.
  const velocity = useVelocity(p);
  const rawOpacity = useTransform(velocity, (v) =>
    Math.min(0.1 + Math.abs(v) * 7, 0.26)
  );
  const opacity = useSpring(rawOpacity, { stiffness: 140, damping: 28 });

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x, y, opacity }}
      className="pointer-events-none fixed left-1/2 top-0 z-20 hidden -translate-x-1/2 sm:block"
    >
      <motion.div
        style={{ rotate }}
        className="origin-center will-change-transform w-[84px] sm:w-[112px] lg:w-[132px]"
      >
        <BoyFigure />
      </motion.div>
    </motion.div>
  );
}

function BoyFigure() {
  return (
    <svg
      viewBox="0 0 100 132"
      width="100%"
      height="auto"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 0 16px rgba(124,58,237,0.35))' }}
    >
      <defs>
        <linearGradient id="boyHoodie" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c9b0ff" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="boyPants" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a4170" />
          <stop offset="1" stopColor="#2c2547" />
        </linearGradient>
      </defs>

      {/* Arms reaching up into the rush of air */}
      <g
        stroke="url(#boyHoodie)"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M42 48 L17 21" />
        <path d="M58 48 L83 21" />
      </g>

      {/* Legs spread for balance */}
      <g
        stroke="url(#boyPants)"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M44 82 L27 116" />
        <path d="M56 82 L73 116" />
      </g>

      {/* Shoes */}
      <g>
        <ellipse cx="25" cy="118" rx="8" ry="5" fill="#e9e9ef" transform="rotate(-28 25 118)" />
        <ellipse cx="75" cy="118" rx="8" ry="5" fill="#e9e9ef" transform="rotate(28 75 118)" />
      </g>

      {/* Hands */}
      <circle cx="16" cy="20" r="5.5" fill="#f3d4b6" />
      <circle cx="84" cy="20" r="5.5" fill="#f3d4b6" />

      {/* Hoodie torso */}
      <rect x="37" y="42" width="26" height="42" rx="12" fill="url(#boyHoodie)" />
      <path d="M50 46 L50 78" stroke="#5b21b6" strokeWidth="1.6" strokeLinecap="round" />

      {/* Neck */}
      <rect x="45" y="34" width="10" height="9" rx="3" fill="#eec4a0" />

      {/* Head */}
      <circle cx="50" cy="26" r="12.5" fill="#f3d4b6" />

      {/* Hair */}
      <path
        d="M37.6 30 A12.5 12.5 0 0 1 62.4 30 Q60 24.5 54 25.8 Q51 22 47 25.2 Q42 24.2 37.6 30 Z"
        fill="#322a48"
      />

      {/* Face */}
      <circle cx="45.5" cy="29.5" r="1.6" fill="#322a48" />
      <circle cx="54.5" cy="29.5" r="1.6" fill="#322a48" />
      <path d="M46.5 34 q3.5 2.5 7 0" stroke="#a9784f" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}
