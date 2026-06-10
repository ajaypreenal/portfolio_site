import { motion } from 'framer-motion';
import { Brain, Code2, Database, BarChart3 } from 'lucide-react';
import Parallax from './Parallax';

const WIV = { once: true, amount: 0.05 };

const services = [
  {
    icon: Brain,
    title: 'AI/ML Application Development',
    description:
      'Building intelligent applications powered by machine learning, deep learning, NLP, and predictive analytics. From model training to production deployment.',
    tags: ['PyTorch', 'scikit-learn', 'Transformers', 'YOLO'],
    color: 'purple',
    gradient: 'from-purple-600 to-violet-700',
    glow: 'rgba(124, 58, 237, 0.15)',
  },
  {
    icon: Code2,
    title: 'Full Stack Web Development',
    description:
      'Creating scalable web applications with React, Node.js, Express, FastAPI, MongoDB, Firebase, and REST APIs. Clean architecture, secure, and performant.',
    tags: ['React', 'Node.js', 'FastAPI', 'MongoDB'],
    color: 'cyan',
    gradient: 'from-cyan-600 to-blue-700',
    glow: 'rgba(6, 182, 212, 0.12)',
  },
  {
    icon: Database,
    title: 'RAG & NLP Systems',
    description:
      'Designing document intelligence systems with embeddings, vector search (FAISS), transformers, and LLM-powered summarization and Q&A pipelines.',
    tags: ['FAISS', 'Gemini', 'Legal-BERT', 'RAG'],
    color: 'fuchsia',
    gradient: 'from-fuchsia-600 to-purple-700',
    glow: 'rgba(217, 70, 239, 0.12)',
  },
  {
    icon: BarChart3,
    title: 'Data-Driven Dashboards',
    description:
      'Developing dashboards for predictions, analytics, model explainability (SHAP), and decision support systems built for real operational use.',
    tags: ['SHAP', 'Optuna', 'Matplotlib', 'React'],
    color: 'amber',
    gradient: 'from-amber-500 to-orange-600',
    glow: 'rgba(245, 158, 11, 0.12)',
  },
];

const iconBgMap: Record<string, string> = {
  purple: 'from-purple-600 to-violet-700',
  cyan: 'from-cyan-600 to-blue-700',
  fuchsia: 'from-fuchsia-600 to-purple-700',
  amber: 'from-amber-500 to-orange-600',
};

export default function Services() {
  return (
    <section id="services" className="py-28 relative overflow-hidden">
      <Parallax speed={140} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-0 bottom-0 w-[500px] h-[500px] opacity-[0.03] blur-3xl"
          style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }}
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
          <span className="section-label">// Services</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={WIV}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-white leading-tight"
          >
            AI & Full Stack{' '}
            <span className="glow-text">Development Services</span>
          </motion.h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={WIV}
                transition={{ duration: 0.65, delay: i * 0.1 }}
                className="card p-8 group hover:border-[#2a2a2a]"
                style={{ '--glow': service.glow } as React.CSSProperties}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${iconBgMap[service.color]} flex items-center justify-center mb-6 group-hover:shadow-lg transition-all duration-300`}
                  style={{ boxShadow: `0 0 0 0 ${service.glow}` }}
                >
                  <Icon size={22} className="text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-white transition-colors">
                  {service.title}
                </h3>
                <p className="text-[#666] text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-[#1a1a1a]">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2.5 py-1 rounded border border-[#1f1f1f] text-[#555]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
