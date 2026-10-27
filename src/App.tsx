import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ImpactSection } from './components/impact/ImpactSection';
import { Curriculum } from './components/sections/Curriculum';
import { Projects } from './components/sections/Projects';
import { Research } from './components/sections/Research';
import { useI18n } from './i18n';

export function App() {
  const { t } = useI18n();
  return (
    <>
      <a className="skip-link" href="#main">
        {t.nav.skipToContent}
      </a>
      <Header />
      <main id="main" className="container page">
        <Hero />
        <Curriculum />
        <Projects />
        <Research />
        <ImpactSection />
      </main>
      <Footer />
    </>
  );
}
