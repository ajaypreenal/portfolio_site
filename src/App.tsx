import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechBanner from './components/TechBanner';
import About from './components/About';
import Stats from './components/Stats';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Services from './components/Services';
import Process from './components/Process';
import Achievements from './components/Achievements';
import Recognition from './components/Recognition';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';

export default function App() {
  return (
    <div className="min-h-screen bg-[#080808] text-white relative">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Cursor glow */}
      <CursorGlow />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <Hero />
        <TechBanner />
        <div className="section-divider" />
        <Stats />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Skills />
        <div className="section-divider" />
        <Projects />
        <div className="section-divider" />
        <Services />
        <div className="section-divider" />
        <Process />
        <div className="section-divider" />
        <Achievements />
        <div className="section-divider" />
        <Recognition />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
