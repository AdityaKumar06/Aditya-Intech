import { Suspense, lazy, useEffect } from 'react';
import Lenis from 'lenis';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import SectionDivider from './components/SectionDivider';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Services from './components/Sections/Services';
import Skills from './components/Sections/Skills';
import Experience from './components/Sections/Experience';
import Projects from './components/Sections/Projects';
import Contact from './components/Sections/Contact';

const Scene = lazy(() => import('./components/Canvas/Scene'));

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <main className="relative min-h-screen text-slate-100 selection:bg-primary/30 selection:text-primary">
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        <Navbar />
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col">
          <Hero />
          <SectionDivider type="about" />
          <About />
          <SectionDivider type="skills" />
          <Skills />
          <SectionDivider type="services" />
          <Services />
          <SectionDivider type="experience" />
          <Experience />
          <SectionDivider type="projects" />
          <Projects />
          <SectionDivider type="contact" />
          <Contact />
        </div>
      </main>
    </>
  );
}

export default App;
