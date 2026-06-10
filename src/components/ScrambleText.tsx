import { useEffect, useRef, useState, type ElementType } from 'react';
import { useInView } from 'react-intersection-observer';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

/**
 * Renders `text` with a one-shot "decode" scramble that plays the first
 * time it scrolls into view: random glyphs resolve into the final string
 * left-to-right. Falls back to plain text for reduced-motion users.
 *
 * Use it as a drop-in for a heading's text content.
 */
export default function ScrambleText({
  text,
  className = '',
  as: Tag = 'span',
  duration = 900,
}: {
  text: string;
  className?: string;
  as?: ElementType;
  duration?: number;
}) {
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [output, setOutput] = useState(reduced ? text : '');
  const ranRef = useRef(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });

  useEffect(() => {
    if (reduced || !inView || ranRef.current) return;
    ranRef.current = true;

    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // How many characters are fully resolved so far.
      const resolved = Math.floor(progress * text.length);

      let out = '';
      for (let i = 0; i < text.length; i++) {
        if (i < resolved || text[i] === ' ') {
          out += text[i];
        } else {
          out += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setOutput(out);

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setOutput(text);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, text, duration]);

  return (
    <Tag ref={ref as never} className={className} aria-label={text}>
      <span aria-hidden>{output || '\u00A0'}</span>
    </Tag>
  );
}
