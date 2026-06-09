import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const WIV = { once: true, amount: 0.1 };

const recognitions = [
  {
    text: 'Recognized for leadership and community service through the Best NSS Student Award — demonstrating consistent commitment to social impact and volunteer-driven initiatives.',
    tag: 'Community Leadership',
    color: '#7c3aed',
  },
  {
    text: 'Selected among top teams in national-level hackathons and competitive programming events including Prothon 2023, Hack to Future 2.0, Code Sprint, and VIT Gravitas Fest.',
    tag: 'Competitive Excellence',
    color: '#06b6d4',
  },
  {
    text: 'Built applied AI systems across legal technology, bioinformatics, aviation intelligence, and healthcare — solving domain-specific problems with production-grade ML engineering.',
    tag: 'Applied AI Impact',
    color: '#10b981',
  },
];

export default function Recognition() {
  return (
    <section className="py-28 border-y border-[#1a1a1a] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, #7c3aed, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={WIV}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="section-label">// Recognition & Impact</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={WIV}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-16"
        >
          Impact That{' '}
          <span className="glow-text">Speaks for Itself</span>
        </motion.h2>

        <div className="grid lg:grid-cols-3 gap-6">
          {recognitions.map((rec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={WIV}
              transition={{ duration: 0.65, delay: i * 0.12 }}
              className="relative"
            >
              <div className="card p-8 h-full flex flex-col group">
                {/* Quote icon */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-6"
                  style={{ background: `${rec.color}15`, border: `1px solid ${rec.color}30` }}
                >
                  <Quote size={16} style={{ color: rec.color }} />
                </div>

                {/* Text */}
                <p className="text-[#888] text-sm leading-relaxed flex-1 mb-6 group-hover:text-[#aaa] transition-colors">
                  "{rec.text}"
                </p>

                {/* Tag */}
                <div
                  className="text-xs font-mono px-3 py-1.5 rounded-full inline-block self-start border"
                  style={{
                    color: rec.color,
                    background: `${rec.color}10`,
                    borderColor: `${rec.color}30`,
                  }}
                >
                  {rec.tag}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
