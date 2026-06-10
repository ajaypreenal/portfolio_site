import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal } from 'lucide-react';
import { usePageTransition } from './PageTransition';
import Magnetic from './Magnetic';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { navigate } = usePageTransition();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    navigate(href);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#080808]/90 backdrop-blur-xl border-b border-[#1f1f1f]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNav('#hero'); }}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-purple-900/40 transition-shadow duration-300">
              <Terminal size={14} className="text-white" />
            </div>
            <span className="font-mono text-sm text-[#f5f5f5] tracking-widest font-bold">APD</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <Magnetic key={link.href} strength={10}>
                <motion.a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                  className="nav-link underline-anim font-medium"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  {link.label}
                </motion.a>
              </Magnetic>
            ))}
          </div>

          {/* Desktop CTA */}
          <Magnetic strength={14} className="hidden md:block">
            <motion.button
              type="button"
              onClick={() => handleNav('#contact')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="btn-primary text-sm"
            >
              <span>Hire Me</span>
            </motion.button>
          </Magnetic>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-[#999] hover:text-white transition-colors p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#080808]/97 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            <div className="flex items-center gap-2 absolute top-5 left-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center">
                <Terminal size={14} className="text-white" />
              </div>
              <span className="font-mono text-sm text-[#f5f5f5] tracking-widest font-bold">APD</span>
            </div>
            <button
              className="absolute top-5 right-6 text-[#999] hover:text-white transition-colors p-2"
              onClick={() => setMobileOpen(false)}
            >
              <X size={20} />
            </button>
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                className="text-3xl font-bold text-[#f5f5f5] hover:text-purple-400 transition-colors"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.button
              type="button"
              onClick={() => handleNav('#contact')}
              className="btn-primary text-sm mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span>Hire Me</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
