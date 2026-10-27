import { BustBackdrop } from './components/BustBackdrop';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ImpactSection } from './components/impact/ImpactSection';
import { Curriculum } from './components/sections/Curriculum';
import { Organizations } from './components/sections/Organizations';
import { Papers } from './components/sections/Papers';
import { Projects } from './components/sections/Projects';
import { useI18n } from './i18n';

export function App() {
  const { t } = useI18n();
  return (
    <>
      <BustBackdrop />
      <a className="skip-link" href="#main">
        {t.nav.skipToContent}
      </a>
      <Header />
      <main id="main" className="container page">
        <Hero />
        <ImpactSection />
        <Curriculum />
        <div className="dashboard">
          <Projects />
          <Papers />
        </div>
        <Organizations />
      </main>
      <Footer />
    </>
  );
}
