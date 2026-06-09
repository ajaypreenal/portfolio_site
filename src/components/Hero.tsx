import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Mail, Phone, MapPin } from 'lucide-react';

const roles = ['AI/ML Engineer', 'Full Stack Developer', 'Deep Learning Enthusiast', 'Problem Solver'];

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = roles[roleIndex];

    if (!deleting && displayed.length < current.length) {
      timeoutRef.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70);
    } else if (!deleting && displayed.length === current.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeoutRef.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayed, deleting, roleIndex]);

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(168,85,247,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Purple blob */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.04] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }}
        animate={{ scale: [1, 1.1, 1], x: [0, 20, 0], y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-16">

        {/* Top badge */}
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center gap-2 bg-[#111] border border-[#1f1f1f] rounded-full px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs text-[#999] tracking-widest">AVAILABLE FOR OPPORTUNITIES</span>
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-4"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight leading-[1.0] text-white">
            Hey, I'm
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32 }}
          className="mb-2"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight leading-[1.0]">
            <span className="glow-text">Ajay Preenal</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.44 }}
          className="mb-8"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight leading-[1.0] text-white">
            Dsouza
          </h1>
        </motion.div>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8 h-12 flex items-center"
        >
          <span className="font-mono text-xl sm:text-2xl lg:text-3xl text-purple-400 font-medium">
            {displayed}
            <span className="cursor-blink">|</span>
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.72 }}
          className="text-[#777] text-base sm:text-lg lg:text-xl max-w-2xl leading-relaxed mb-10"
        >
          I build intelligent, scalable, and user-focused applications by combining{' '}
          <span className="text-[#aaa]">machine learning</span>,{' '}
          <span className="text-[#aaa]">full-stack engineering</span>, and clean product design. My work spans{' '}
          <span className="text-purple-400">Legal AI</span>, protein interaction prediction, flight delay forecasting, and real-time social-impact platforms.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.84 }}
          className="flex flex-wrap gap-4 mb-14"
        >
          <button onClick={() => handleScroll('#projects')} className="btn-primary">
            <span>View Projects</span>
          </button>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="btn-secondary flex items-center gap-2"
          >
            <ArrowDown size={16} />
            Download Resume
          </a>
          <button onClick={() => handleScroll('#contact')} className="btn-secondary">
            Contact Me
          </button>
        </motion.div>

        {/* Contact info row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.96 }}
          className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-6 border-t border-[#1f1f1f]"
        >
          <a
            href="mailto:ajaypreenaldsouza@gmail.com"
            className="flex items-center gap-2 text-sm text-[#666] hover:text-purple-400 transition-colors group"
          >
            <Mail size={14} className="group-hover:text-purple-400 transition-colors" />
            ajaypreenaldsouza@gmail.com
          </a>
          <a
            href="tel:+917022157406"
            className="flex items-center gap-2 text-sm text-[#666] hover:text-purple-400 transition-colors group"
          >
            <Phone size={14} className="group-hover:text-purple-400 transition-colors" />
            +91 70221 57406
          </a>
          <span className="flex items-center gap-2 text-sm text-[#666]">
            <MapPin size={14} />
            Udupi, Karnataka, India
          </span>
          <div className="flex items-center gap-3 sm:ml-auto">
            <a
              href="https://linkedin.com/in/ajaypreenaldsouza"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg border border-[#1f1f1f] flex items-center justify-center text-[#666] hover:text-purple-400 hover:border-purple-900/50 transition-all"
            >
              <LinkedinIcon />
            </a>
            <a
              href="https://github.com/ajaypreenaldsouza"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg border border-[#1f1f1f] flex items-center justify-center text-[#666] hover:text-purple-400 hover:border-purple-900/50 transition-all"
            >
              <GithubIcon />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Floating code block decoration */}
      <motion.div
        className="hidden xl:block absolute right-8 top-1/2 -translate-y-1/2"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-6 font-mono text-xs w-72 shadow-2xl"
        >
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#1a1a1a]">
            <span className="w-3 h-3 rounded-full bg-[#ff5f5f]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbe2e]" />
            <span className="w-3 h-3 rounded-full bg-[#2aca44]" />
            <span className="text-[#333] ml-2">model.py</span>
          </div>
          <div className="space-y-1 text-[11px] leading-relaxed">
            <div><span className="text-purple-400">import</span> <span className="text-[#aaa]">torch</span></div>
            <div><span className="text-purple-400">from</span> <span className="text-[#aaa]">transformers</span> <span className="text-purple-400">import</span> <span className="text-cyan-400">AutoModel</span></div>
            <div className="mt-2" />
            <div><span className="text-blue-400">class</span> <span className="text-emerald-400">LegalBERT</span><span className="text-[#aaa]">(nn.Module):</span></div>
            <div className="pl-4"><span className="text-purple-400">def</span> <span className="text-yellow-400">__init__</span><span className="text-[#aaa]">(self):</span></div>
            <div className="pl-8"><span className="text-purple-400">super</span><span className="text-[#aaa]">().</span><span className="text-yellow-400">__init__</span><span className="text-[#aaa]">()</span></div>
            <div className="pl-8"><span className="text-[#aaa]">self.bert = </span><span className="text-cyan-400">AutoModel</span></div>
            <div className="pl-8 text-[#444]"># Fine-tuned on CUAD</div>
            <div className="mt-2" />
            <div><span className="text-[#555]"># F1: 0.91 | ROC-AUC: 0.9523</span></div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="font-mono text-xs text-[#444] tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-purple-500 to-transparent"
        />
      </motion.div>
    </section>
  );
}
