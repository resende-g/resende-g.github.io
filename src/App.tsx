import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Contact } from './components/sections/Contact';
import { Education } from './components/sections/Education';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Research } from './components/sections/Research';
import { Skills } from './components/sections/Skills';
import { useI18n } from './i18n';

export function App() {
  const { t } = useI18n();
  return (
    <>
      <div className="backdrop" aria-hidden="true" />
      <a className="skip-link" href="#main">
        {t.nav.skipToContent}
      </a>
      <Header />
      <main id="main" className="main">
        <Hero />
        <Experience />
        <Projects />
        <Education />
        <Research />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
