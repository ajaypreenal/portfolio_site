import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const stats = [
  { value: 8.82, suffix: '', label: 'CGPA Achieved', decimals: 2 },
  { value: 4, suffix: '+', label: 'Major Projects', decimals: 0 },
  { value: 0.95, suffix: '', label: 'ROC-AUC Score', decimals: 2 },
  { value: 200, suffix: '+', label: 'Hackathon Participants Managed', decimals: 0 },
];

function AnimatedCounter({ value, suffix, decimals }: { value: number; suffix: string; decimals: number }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (inView && !hasStarted.current) {
      hasStarted.current = true;
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(current);
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <span ref={ref} className="stat-number text-5xl lg:text-6xl font-bold font-mono">
      {count.toFixed(decimals)}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-20 border-y border-[#1f1f1f] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/5 via-transparent to-purple-900/5 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl border border-[#111] hover:border-[#1f1f1f] transition-all duration-300 group"
            >
              <div className="mb-3 group-hover:scale-105 transition-transform duration-300">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
              </div>
              <p className="text-[#444] text-xs font-mono tracking-wide uppercase">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
