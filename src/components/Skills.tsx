import { motion } from 'framer-motion';
import Parallax from './Parallax';

const WIV = { once: true, amount: 0.05 };

const skillGroups = [
  {
    label: 'Languages',
    color: 'purple',
    skills: ['C', 'Python', 'Java', 'JavaScript', 'SQL', 'HTML', 'CSS'],
  },
  {
    label: 'Frontend',
    color: 'cyan',
    skills: ['React', 'HTML', 'CSS', 'JavaScript', 'Flutter'],
  },
  {
    label: 'Backend',
    color: 'emerald',
    skills: ['Node.js', 'Express.js', 'FastAPI', 'Flask', 'REST APIs'],
  },
  {
    label: 'AI / ML',
    color: 'violet',
    skills: ['PyTorch', 'scikit-learn', 'NumPy', 'Pandas', 'Matplotlib', 'Hugging Face Transformers', 'FAISS', 'LightGBM', 'CatBoost', 'XGBoost'],
  },
  {
    label: 'AI Domains',
    color: 'fuchsia',
    skills: ['NLP', 'Legal-BERT', 'Graph Attention Networks', 'Protein Language Models', 'RAG Pipelines', 'YOLO'],
  },
  {
    label: 'Databases & Cloud',
    color: 'blue',
    skills: ['MongoDB Atlas', 'Firebase Firestore', 'MySQL', 'Google Cloud Platform'],
  },
  {
    label: 'Tools',
    color: 'orange',
    skills: ['Git', 'Docker', 'Nginx', 'Jupyter Notebook', 'WebXR', 'ARCore', 'ARKit', 'VS Code'],
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string }> = {
  purple: { bg: 'rgba(124, 58, 237, 0.1)', border: 'rgba(124, 58, 237, 0.25)', text: '#c4b5fd' },
  cyan: { bg: 'rgba(6, 182, 212, 0.08)', border: 'rgba(6, 182, 212, 0.2)', text: '#67e8f9' },
  emerald: { bg: 'rgba(52, 211, 153, 0.08)', border: 'rgba(52, 211, 153, 0.2)', text: '#6ee7b7' },
  violet: { bg: 'rgba(139, 92, 246, 0.1)', border: 'rgba(139, 92, 246, 0.25)', text: '#c4b5fd' },
  fuchsia: { bg: 'rgba(217, 70, 239, 0.08)', border: 'rgba(217, 70, 239, 0.2)', text: '#f0abfc' },
  blue: { bg: 'rgba(59, 130, 246, 0.08)', border: 'rgba(59, 130, 246, 0.2)', text: '#93c5fd' },
  orange: { bg: 'rgba(251, 146, 60, 0.08)', border: 'rgba(251, 146, 60, 0.2)', text: '#fdba74' },
};

const dotColorMap: Record<string, string> = {
  purple: 'bg-purple-500',
  cyan: 'bg-cyan-500',
  emerald: 'bg-emerald-500',
  violet: 'bg-violet-500',
  fuchsia: 'bg-fuchsia-500',
  blue: 'bg-blue-500',
  orange: 'bg-orange-500',
};

export default function Skills() {
  return (
    <section id="skills" className="py-28 relative overflow-hidden">
      {/* Background */}
      <Parallax speed={140} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-[0.03] blur-3xl"
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
          <span className="section-label">// Skills</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={WIV}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-white leading-tight max-w-xl"
          >
            Tech Stack &{' '}
            <span className="glow-text">Expertise</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={WIV}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="text-[#666] text-sm max-w-xs"
          >
            A curated toolkit spanning AI research, full-stack development, and cloud infrastructure.
          </motion.p>
        </div>

        {/* Skill groups grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={WIV}
              transition={{ duration: 0.55, delay: gi * 0.07 }}
              className="card p-6 group hover:border-[#2a2a2a] transition-all duration-300"
            >
              {/* Group header */}
              <div className="flex items-center gap-2 mb-5">
                <span className={`w-2 h-2 rounded-full ${dotColorMap[group.color]}`} />
                <h3 className="font-mono text-xs text-[#555] uppercase tracking-widest">{group.label}</h3>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-block rounded-md px-3 py-1.5 text-xs font-mono transition-all duration-200 cursor-default select-none hover:-translate-y-0.5"
                    style={{
                      background: colorMap[group.color].bg,
                      border: `1px solid ${colorMap[group.color].border}`,
                      color: colorMap[group.color].text,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Marquee of all skills */}
        <div className="mt-16 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />
          <div className="marquee-track">
            {[...skillGroups.flatMap(g => g.skills), ...skillGroups.flatMap(g => g.skills)].map((skill, i) => (
              <span key={i} className="inline-flex items-center gap-3 px-5 py-2 mx-2 border border-[#1f1f1f] rounded-full text-xs font-mono text-[#555] whitespace-nowrap">
                <span className="w-1 h-1 rounded-full bg-purple-600" />
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
