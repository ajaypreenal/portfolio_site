import { motion } from 'framer-motion';
import { Search, Cpu, Rocket } from 'lucide-react';

const WIV = { once: true, amount: 0.1 };

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Research & Architect',
    description:
      'I first understand the problem, users, data, and technical constraints before choosing the right architecture. Every great system starts with deep clarity on what it needs to solve.',
    detail: 'Problem analysis · Data exploration · Architecture design · Constraint mapping',
    color: '#7c3aed',
  },
  {
    number: '02',
    icon: Cpu,
    title: 'Build & Train',
    description:
      'I develop clean interfaces, robust APIs, and ML pipelines with maintainable code and strong evaluation metrics. Code quality and reproducibility are non-negotiable.',
    detail: 'Model training · API development · Frontend building · Testing & evaluation',
    color: '#06b6d4',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Deploy & Improve',
    description:
      'I focus on deployment, performance, usability, monitoring, and iteration based on feedback. Software is never done — it only gets more refined.',
    detail: 'Docker · CI/CD · Performance tuning · User feedback · Monitoring',
    color: '#10b981',
  },
];

export default function Process() {
  return (
    <section id="process" className="py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={WIV}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="section-label">// Process</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={WIV}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-white leading-tight"
          >
            My Development{' '}
            <span className="glow-text">Work Process</span>
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[calc(16.67%-12px)] right-[calc(16.67%-12px)] h-px bg-gradient-to-r from-transparent via-[#2a2a2a] to-transparent" />

          <div className="grid lg:grid-cols-3 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={WIV}
                  transition={{ duration: 0.65, delay: i * 0.15 }}
                  className="relative"
                >
                  {/* Step indicator */}
                  <div className="flex items-center gap-4 mb-8">
                    <div
                      className="relative w-12 h-12 rounded-full flex items-center justify-center border flex-shrink-0 z-10"
                      style={{
                        background: `${step.color}15`,
                        borderColor: `${step.color}40`,
                        boxShadow: `0 0 20px ${step.color}20`,
                      }}
                    >
                      <Icon size={20} style={{ color: step.color }} />
                    </div>
                    <span
                      className="font-mono text-5xl font-bold opacity-10 leading-none"
                      style={{ color: step.color }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-[#666] text-sm leading-relaxed mb-5">{step.description}</p>

                  {/* Detail tags */}
                  <div className="border-t border-[#1a1a1a] pt-4">
                    <p className="font-mono text-xs text-[#444] leading-relaxed">{step.detail}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
