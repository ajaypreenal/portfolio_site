import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const WIV = { once: true, amount: 0.1 };

// Backend that persists enquiries to MongoDB. Override with VITE_API_URL if
// the server runs on a different host/port.
const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';

type Status = 'idle' | 'sending' | 'success' | 'error';

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

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;

    setStatus('sending');
    setFeedback('');

    try {
      const res = await fetch(`${API_BASE}/api/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type: 'enquiry' }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || 'Could not send your message.');
      }

      setStatus('success');
      setFeedback("Thanks! Your enquiry has been received — I'll be in touch soon.");
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => {
        setStatus('idle');
        setFeedback('');
      }, 5000);
    } catch (err) {
      setStatus('error');
      const offline =
        err instanceof TypeError; // fetch network failure (server not running)
      setFeedback(
        offline
          ? 'Could not reach the server. Make sure the backend is running (see server/README), then try again.'
          : err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      );
    }
  };

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      {/* Big glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-[0.05] blur-3xl pointer-events-none"
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
          <span className="section-label">// Contact</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={WIV}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-4"
        >
          Let's Build Something{' '}
          <span className="glow-text">Intelligent</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={WIV}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="text-[#666] text-base max-w-xl mb-16"
        >
          I'm open to internships, AI/ML projects, full-stack development opportunities, research collaborations, and hackathon teams.
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left – contact details */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={WIV}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="space-y-5 mb-10"
            >
              <a
                href="mailto:ajaypreenaldsouza@gmail.com"
                className="flex items-center gap-4 p-5 card group hover:border-purple-900/50 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-purple-900/20 border border-purple-800/30 flex items-center justify-center flex-shrink-0">
                  <Mail size={16} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-xs font-mono text-[#555] mb-1">EMAIL</p>
                  <p className="text-white text-sm group-hover:text-purple-300 transition-colors">ajaypreenaldsouza@gmail.com</p>
                </div>
                <ExternalLink size={14} className="text-[#444] group-hover:text-purple-400 transition-colors ml-auto" />
              </a>

              <a
                href="tel:+917022157406"
                className="flex items-center gap-4 p-5 card group hover:border-purple-900/50 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center flex-shrink-0">
                  <Phone size={16} className="text-[#666]" />
                </div>
                <div>
                  <p className="text-xs font-mono text-[#555] mb-1">PHONE</p>
                  <p className="text-white text-sm group-hover:text-purple-300 transition-colors">+91 70221 57406</p>
                </div>
                <ExternalLink size={14} className="text-[#444] group-hover:text-purple-400 transition-colors ml-auto" />
              </a>

              <div className="flex items-center gap-4 p-5 card">
                <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-[#666]" />
                </div>
                <div>
                  <p className="text-xs font-mono text-[#555] mb-1">LOCATION</p>
                  <p className="text-white text-sm">Udupi, Karnataka, India</p>
                </div>
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={WIV}
              transition={{ duration: 0.65, delay: 0.3 }}
            >
              <p className="text-xs font-mono text-[#555] uppercase tracking-widest mb-4">Connect</p>
              <div className="flex gap-3">
                <a
                  href="https://www.linkedin.com/in/ajay-preenal-dsouza/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 card hover:border-purple-900/50 text-[#666] hover:text-purple-400 transition-all text-sm"
                >
                  <LinkedinIcon />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/ajaypreenal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 card hover:border-purple-900/50 text-[#666] hover:text-purple-400 transition-all text-sm"
                >
                  <GithubIcon />
                  GitHub
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right – contact form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={WIV}
            transition={{ duration: 0.65, delay: 0.25 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#555] mb-2 uppercase tracking-widest">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full bg-[#111] border border-[#1f1f1f] rounded-xl px-4 py-3 text-white text-sm placeholder-[#444] focus:outline-none focus:border-purple-800/60 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#555] mb-2 uppercase tracking-widest">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full bg-[#111] border border-[#1f1f1f] rounded-xl px-4 py-3 text-white text-sm placeholder-[#444] focus:outline-none focus:border-purple-800/60 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#555] mb-2 uppercase tracking-widest">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="What's this about?"
                  className="w-full bg-[#111] border border-[#1f1f1f] rounded-xl px-4 py-3 text-white text-sm placeholder-[#444] focus:outline-none focus:border-purple-800/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#555] mb-2 uppercase tracking-widest">Message</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full bg-[#111] border border-[#1f1f1f] rounded-xl px-4 py-3 text-white text-sm placeholder-[#444] focus:outline-none focus:border-purple-800/60 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span>
                  {status === 'sending'
                    ? 'Sending...'
                    : status === 'success'
                    ? 'Sent'
                    : 'Send Message'}
                </span>
                <Send size={15} />
              </button>

              {feedback && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-sm ${
                    status === 'error' ? 'text-red-400' : 'text-purple-300'
                  }`}
                  role="status"
                >
                  {feedback}
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
