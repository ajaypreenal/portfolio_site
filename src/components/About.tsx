import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Award } from 'lucide-react';

const WIV = { once: true, amount: 0.1 };

export default function About() {
  return (
    <section id="about" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.03] blur-3xl"
          style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={WIV}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="section-label">// About Me</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - text */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={WIV}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
            >
              Building Intelligent{' '}
              <span className="glow-text">Systems</span>{' '}
              That Matter
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={WIV}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="text-[#777] text-base lg:text-lg leading-relaxed mb-6"
            >
              I'm a Computer Science Engineering student passionate about building AI-powered systems
              and production-ready web applications. I enjoy solving real-world problems using machine
              learning, deep learning, NLP, graph neural networks, RAG pipelines, and full-stack technologies.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={WIV}
              transition={{ duration: 0.65, delay: 0.3 }}
              className="text-[#666] text-base leading-relaxed mb-8"
            >
              I focus on turning complex ideas into usable, scalable, and impactful software. My approach
              bridges the gap between cutting-edge research and real-world deployment — from Legal AI and
              bioinformatics to aviation intelligence and healthcare platforms.
            </motion.p>

            {/* Quick tags */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={WIV}
              transition={{ duration: 0.65, delay: 0.4 }}
              className="flex flex-wrap gap-2"
            >
              {['AI/ML Engineering', 'Full Stack Dev', 'NLP', 'Graph Neural Networks', 'RAG Pipelines', 'Research'].map((tag) => (
                <span key={tag} className="skill-tag">{tag}</span>
              ))}
            </motion.div>
          </div>

          {/* Right - education */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={WIV}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-sm font-mono text-[#555] uppercase tracking-widest mb-6 flex items-center gap-2"
            >
              <GraduationCap size={14} className="text-purple-500" />
              Education
            </motion.h3>

            <div className="space-y-5">
              {/* SJEC */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={WIV}
                transition={{ duration: 0.65, delay: 0.25 }}
                className="card p-6 gradient-border group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-900/30 border border-purple-800/40 flex items-center justify-center flex-shrink-0 mt-1">
                    <BookOpen size={16} className="text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
                      <h4 className="font-semibold text-white text-base">St. Joseph Engineering College</h4>
                      <span className="font-mono text-xs text-purple-400 bg-purple-900/20 border border-purple-800/30 rounded-full px-3 py-1">
                        Aug 2023 – May 2027
                      </span>
                    </div>
                    <p className="text-sm text-[#aaa] mb-2">B.E. in Computer Science & Engineering — Mangaluru</p>
                    <div className="flex items-center gap-2">
                      <Award size={12} className="text-purple-400" />
                      <span className="font-mono text-sm text-purple-300">CGPA: 8.82 / 10</span>
                      <span className="text-xs text-[#555]">(up to 5th semester)</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Don Bosco */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={WIV}
                transition={{ duration: 0.65, delay: 0.35 }}
                className="card p-6 gradient-border group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center flex-shrink-0 mt-1">
                    <BookOpen size={16} className="text-[#666]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
                      <h4 className="font-semibold text-white text-base">Don Bosco English Medium School</h4>
                      <span className="font-mono text-xs text-[#555] bg-[#111] border border-[#1f1f1f] rounded-full px-3 py-1">
                        Udupi
                      </span>
                    </div>
                    <p className="text-sm text-[#aaa] mb-3">Higher Secondary Certificate – Science</p>
                    <div className="flex items-center gap-6">
                      <div>
                        <span className="text-xs text-[#555] block">Class XII</span>
                        <span className="font-mono text-sm text-[#aaa]">74.6%</span>
                      </div>
                      <div className="w-px h-8 bg-[#1f1f1f]" />
                      <div>
                        <span className="text-xs text-[#555] block">Class X</span>
                        <span className="font-mono text-sm text-[#aaa]">74.8%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
