import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePageTransition } from './PageTransition';

/**
 * A vertical dot rail pinned to the right edge on large screens. Each dot
 * maps to a section; the active dot (the section currently in view) grows
 * and labels itself on hover. Clicking a dot routes through the existing
 * page-transition curtain so behaviour stays consistent with the navbar.
 *
 * Hidden on small screens and for coarse pointers where it would crowd the
 * layout. The active-section tracking uses a single IntersectionObserver,
 * so there are no scroll listeners doing per-frame work.
 */

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'services', label: 'Services' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

export default function SectionNav() {
  const [active, setActive] = useState('hero');
  const { navigate } = usePageTransition();

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);

    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the most-visible intersecting section.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        // A band across the vertical middle of the viewport.
        rootMargin: '-45% 0px -45% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex"
    >
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            type="button"
            aria-label={`Go to ${s.label}`}
            aria-current={isActive ? 'true' : undefined}
            onClick={() => navigate(`#${s.id}`)}
            className="group flex items-center gap-3"
          >
            {/* Label, revealed on hover or when active */}
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                isActive
                  ? 'text-purple-300 opacity-100'
                  : 'text-[#666] opacity-0 group-hover:opacity-100'
              }`}
            >
              {s.label}
            </span>

            {/* Dot */}
            <span className="relative flex h-3 w-3 items-center justify-center">
              <motion.span
                className="block rounded-full"
                animate={{
                  width: isActive ? 10 : 6,
                  height: isActive ? 10 : 6,
                  backgroundColor: isActive
                    ? 'rgba(168,85,247,1)'
                    : 'rgba(120,120,120,0.5)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              />
              {isActive && (
                <motion.span
                  layoutId="section-dot-ring"
                  className="absolute inset-0 rounded-full border border-purple-400/60"
                  transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                />
              )}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
