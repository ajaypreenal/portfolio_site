import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronRight, Zap } from 'lucide-react';

const WIV = { once: true, amount: 0.05 };

const projects = [
  {
    id: 1,
    name: 'LegalEase',
    subtitle: 'AI Smart Contract Analyzer',
    stack: ['Legal-BERT', 'Gemini', 'FAISS', 'RAG', 'MERN Stack'],
    color: '#7c3aed',
    colorLight: 'rgba(124, 58, 237, 0.08)',
    borderColor: 'rgba(124, 58, 237, 0.25)',
    tag: 'Legal AI',
    description:
      'An AI-powered smart contract analyzer that identifies risky legal clauses, retrieves relevant contract context using FAISS, and provides Gemini-powered summaries and Q&A for non-technical legal users.',
    highlights: [
      'Fine-tuned Legal-BERT on CUAD benchmark dataset',
      'Classified 41 risk-clause categories with F1 score of 0.91',
      'Multi-document upload with clause highlighting and risk scoring',
      'RAG pipeline with FAISS for contract context retrieval',
    ],
    metric: { label: 'F1 Score', value: '0.91' },
  },
  {
    id: 2,
    name: 'TransGraph-PPI',
    subtitle: 'Protein Interaction Prediction Framework',
    stack: ['PyTorch', 'GAT', 'XGBoost', 'FastAPI', 'React'],
    color: '#06b6d4',
    colorLight: 'rgba(6, 182, 212, 0.06)',
    borderColor: 'rgba(6, 182, 212, 0.2)',
    tag: 'Bioinformatics',
    description:
      'A hybrid deep learning framework for protein–protein interaction prediction using Graph Attention Networks and ESM protein language model embeddings.',
    highlights: [
      'Achieved ROC-AUC of 0.9523 on benchmark datasets',
      'Fused graph-level and sequence-level protein features',
      'FastAPI inference backend for real-time predictions',
      'React interface for interactive PPI network visualization',
    ],
    metric: { label: 'ROC-AUC', value: '0.9523' },
  },
  {
    id: 3,
    name: 'AI On-Time Performance',
    subtitle: 'Flight Delay Prediction System',
    stack: ['LightGBM', 'CatBoost', 'XGBoost', 'Optuna', 'SHAP', 'METAR API'],
    color: '#f59e0b',
    colorLight: 'rgba(245, 158, 11, 0.06)',
    borderColor: 'rgba(245, 158, 11, 0.2)',
    tag: 'Aviation AI',
    description:
      'A flight delay prediction system that uses ensemble machine learning and live weather data to predict departure delays 90 minutes before takeoff.',
    highlights: [
      'LightGBM + CatBoost ensemble stacking architecture',
      'Integrated real-time METAR weather data feed',
      'SHAP-based feature explainability for transparency',
      'Dispatcher dashboard for proactive decision support',
    ],
    metric: { label: 'Prediction Window', value: '90 min' },
  },
  {
    id: 4,
    name: 'LifeLink',
    subtitle: 'Blood Donation Platform',
    stack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Firebase'],
    color: '#ef4444',
    colorLight: 'rgba(239, 68, 68, 0.06)',
    borderColor: 'rgba(239, 68, 68, 0.2)',
    tag: 'Healthcare',
    description:
      'A full-stack blood donation platform connecting donors and recipients through location-based matching and real-time availability tracking.',
    highlights: [
      'Full MERN stack with clean, accessible UI',
      'Firebase Firestore for real-time donor availability',
      'JWT-secured authentication and user management',
      'REST APIs for donor and blood request management',
    ],
    metric: { label: 'Stack', value: 'MERN' },
  },
];

export default function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <section id="projects" className="py-28 relative overflow-hidden">
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[300px] opacity-[0.04] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #7c3aed, transparent)' }}
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
          <span className="section-label">// Explore Work</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={WIV}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-white leading-tight max-w-2xl"
          >
            A Showcase of My{' '}
            <span className="glow-text">Latest Projects</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={WIV}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="text-[#666] text-sm max-w-xs"
          >
            Production-grade systems spanning AI research, bioinformatics, aviation, and healthcare.
          </motion.p>
        </div>

        {/* Projects grid */}
        <div className="grid lg:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={WIV}
              transition={{ duration: 0.65, delay: i * 0.1 }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer group"
              style={{
                background: hoveredId === project.id ? project.colorLight : '#111111',
                borderColor: hoveredId === project.id ? project.borderColor : '#1f1f1f',
              }}
              onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
            >
              {/* Top colored line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-300"
                style={{
                  background: `linear-gradient(90deg, ${project.color}, transparent)`,
                  opacity: hoveredId === project.id ? 1 : 0,
                }}
              />

              <div className="p-8">
                {/* Header row */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="text-xs font-mono px-3 py-1 rounded-full border"
                        style={{
                          color: project.color,
                          borderColor: project.borderColor,
                          background: project.colorLight,
                        }}
                      >
                        {project.tag}
                      </span>
                      {/* Metric badge */}
                      <span className="text-xs font-mono text-[#555] border border-[#1f1f1f] rounded-full px-3 py-1">
                        {project.metric.label}: <span className="text-[#999]">{project.metric.value}</span>
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-white transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-[#666]">{project.subtitle}</p>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedId === project.id ? 90 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-[#444] group-hover:text-[#777] transition-colors mt-1 flex-shrink-0"
                  >
                    <ChevronRight size={18} />
                  </motion.div>
                </div>

                {/* Description */}
                <p className="text-[#666] text-sm leading-relaxed mb-5">{project.description}</p>

                {/* Expandable highlights */}
                <AnimatePresence>
                  {expandedId === project.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-[#1f1f1f] pt-5 mb-5">
                        <h4 className="text-xs font-mono text-[#555] uppercase tracking-widest mb-3">Highlights</h4>
                        <ul className="space-y-2">
                          {project.highlights.map((h, hi) => (
                            <li key={hi} className="flex items-start gap-2 text-sm text-[#777]">
                              <Zap size={12} className="mt-1 flex-shrink-0" style={{ color: project.color }} />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2.5 py-1 rounded border border-[#1f1f1f] text-[#555] hover:text-[#999] transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={WIV}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mt-12"
        >
          <a
            href="https://github.com/ajaypreenaldsouza"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center gap-2 group"
          >
            View All on GitHub
            <ExternalLink size={14} className="group-hover:text-purple-400 transition-colors" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
