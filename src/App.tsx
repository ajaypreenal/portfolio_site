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
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import SectionNav from './components/SectionNav';
import Loader from './components/Loader';
import { PageTransitionProvider } from './components/PageTransition';

export default function App() {
  return (
    <PageTransitionProvider>
      <div className="min-h-screen bg-[#080808] text-white relative">
        {/* Page-load intro */}
        <Loader />

        {/* Noise overlay */}
        <div className="noise-overlay" />

        {/* Dynamic custom cursor (desktop only) */}
        <CustomCursor />

        {/* Scroll progress indicator */}
        <ScrollProgress />

        {/* Vertical section-dot rail (large screens) */}
        <SectionNav />

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
    </PageTransitionProvider>
  );
}
