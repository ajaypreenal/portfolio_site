import { motion } from 'framer-motion';
import { Trophy, Star, Users, Award } from 'lucide-react';
import Parallax from './Parallax';

const WIV = { once: true, amount: 0.05 };

const achievements = [
  {
    icon: Star,
    title: 'AICUF President',
    subtitle: '2026–27',
    description: 'Elected President of the All India Catholic University Federation for the academic year 2026–27.',
    type: 'leadership',
    color: '#7c3aed',
  },
  {
    icon: Users,
    title: 'NSS Vice President',
    subtitle: '2025–26',
    description: 'Serving as Vice President of the National Service Scheme unit at SJEC for 2025–26.',
    type: 'leadership',
    color: '#06b6d4',
  },
  {
    icon: Award,
    title: 'Best NSS Student Award',
    subtitle: 'Recognition',
    description: 'Recognized for outstanding leadership and community service contributions through the NSS program.',
    type: 'award',
    color: '#f59e0b',
  },
  {
    icon: Trophy,
    title: '2nd Place – AeroDominator',
    subtitle: 'Gravitas Fest, VIT Vellore',
    description: 'Secured 2nd place at the national-level AeroDominator competition held at Gravitas Fest, VIT Vellore.',
    type: 'hackathon',
    color: '#10b981',
  },
  {
    icon: Trophy,
    title: 'Top 50 Teams',
    subtitle: 'Prothon 2023',
    description: 'Selected among the Top 50 teams in Prothon 2023, a competitive national-level programming contest.',
    type: 'hackathon',
    color: '#7c3aed',
  },
  {
    icon: Trophy,
    title: 'Top 25 Teams',
    subtitle: 'Hack to Future 2.0',
    description: 'Reached the Top 25 teams in Hack to Future 2.0 hackathon, competing among hundreds of participants.',
    type: 'hackathon',
    color: '#ef4444',
  },
  {
    icon: Trophy,
    title: 'Top 100 Teams',
    subtitle: 'Code Sprint – Aloysius Deemed University',
    description: 'Placed in the Top 100 teams at Code Sprint hosted by Aloysius Deemed University, Mangaluru.',
    type: 'hackathon',
    color: '#06b6d4',
  },
  {
    icon: Star,
    title: '1st Place – Class PBL Exhibition',
    subtitle: 'Class-Level',
    description: 'Secured 1st place at the Class-Level Project-Based Learning Exhibition for innovative project work.',
    type: 'award',
    color: '#f59e0b',
  },
  {
    icon: Star,
    title: '2nd Place – Department PBL Exhibition',
    subtitle: 'Department-Level',
    description: 'Won 2nd place at the Department-Level PBL Exhibition with an applied AI/engineering project.',
    type: 'award',
    color: '#a855f7',
  },
  {
    icon: Users,
    title: 'Accommodation & Logistics Lead',
    subtitle: 'Hack to Future',
    description: 'Led accommodation and logistics for 200+ participants in the Hack to Future hackathon event.',
    type: 'leadership',
    color: '#10b981',
  },
];

const typeConfig = {
  leadership: { label: 'Leadership', bg: 'rgba(124, 58, 237, 0.08)', border: 'rgba(124, 58, 237, 0.25)', text: 'text-purple-400' },
  award: { label: 'Award', bg: 'rgba(245, 158, 11, 0.08)', border: 'rgba(245, 158, 11, 0.25)', text: 'text-amber-400' },
  hackathon: { label: 'Hackathon', bg: 'rgba(16, 185, 129, 0.08)', border: 'rgba(16, 185, 129, 0.25)', text: 'text-emerald-400' },
};

export default function Achievements() {
  return (
    <section id="achievements" className="py-28 relative overflow-hidden">
      <Parallax speed={140} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.03] blur-3xl"
          style={{ background: 'radial-gradient(circle, #f59e0b, transparent)' }}
        />
      </Parallax>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={WIV}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="section-label">// Achievements</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={WIV}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-white leading-tight"
          >
            Leadership &{' '}
            <span className="glow-text">Recognition</span>
          </motion.h2>
        </div>

        {/* Achievement cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((item, i) => {
            const Icon = item.icon;
            const config = typeConfig[item.type as keyof typeof typeConfig];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={WIV}
                transition={{ duration: 0.55, delay: Math.min(i * 0.07, 0.5) }}
                className="achievement-card"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                  >
                    <Icon size={15} style={{ color: item.color }} />
                  </div>
                  <span
                    className={`text-xs font-mono px-2 py-0.5 rounded-full border ${config.text}`}
                    style={{ background: config.bg, borderColor: config.border }}
                  >
                    {config.label}
                  </span>
                </div>

                <h3 className="font-bold text-white text-sm mb-1">{item.title}</h3>
                <p className="text-xs font-mono text-[#555] mb-3">{item.subtitle}</p>
                <p className="text-xs text-[#666] leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
