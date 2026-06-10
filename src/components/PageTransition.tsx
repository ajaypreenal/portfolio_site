import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PageTransition() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleNavigate = (e: Event) => {
      const customEvent = e as CustomEvent;
      const href = customEvent.detail;
      
      if (isActive) return;
      setIsActive(true);

      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'auto' });
      }, 700);

      setTimeout(() => {
        setIsActive(false);
      }, 700);
    };

    window.addEventListener('navigate', handleNavigate);
    return () => window.removeEventListener('navigate', handleNavigate);
  }, [isActive]);

  return (
    <>
      <motion.div
        className="fixed inset-0 bg-[#080808] z-[99997] pointer-events-none"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isActive ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: isActive ? 'bottom' : 'top' }}
      />
      <motion.div
        className="fixed inset-0 bg-purple-900 z-[99998] pointer-events-none"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isActive ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{ transformOrigin: isActive ? 'bottom' : 'top' }}
      />
      <motion.div
        className="fixed inset-0 bg-purple-600 z-[99999] pointer-events-none"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isActive ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        style={{ transformOrigin: isActive ? 'bottom' : 'top' }}
      />
    </>
  );
}
