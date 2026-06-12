import { motion } from 'framer-motion';

const techs = [
  '⬡ PyTorch', '⬡ React', '⬡ LightGBM', '⬡ FastAPI', '⬡ Legal-BERT',
  '⬡ Graph Attention Networks', '⬡ FAISS', '⬡ Node.js', '⬡ Gemini API',
  '⬡ XGBoost', '⬡ MongoDB', '⬡ Hugging Face', '⬡ Docker', '⬡ SHAP',
];

export default function TechBanner() {
  const doubled = [...techs, ...techs];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="py-6 border-y border-[#1a1a1a] overflow-hidden relative"
    >
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />
      <div className="marquee-track">
        {doubled.map((tech, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-6 text-xs font-mono text-[#3a3a3a] whitespace-nowrap tracking-widest uppercase">
            {tech}
            <span className="text-purple-900">·</span>
          </span>
        ))}
      </div>
    </motion.div>
  );
}
