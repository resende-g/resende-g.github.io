import { Backdrop } from './components/Backdrop';
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
      <Backdrop />
      <a className="skip-link" href="#main">
        {t.nav.skipToContent}
      </a>
      <Header />
      <main id="main" className="container page">
        <Hero />
        <ImpactSection />
        <div className="dashboard">
          <div className="dashboard__aside">
            <Projects />
            <Organizations />
          </div>
          <Curriculum />
          <Papers />
        </div>
      </main>
      <Footer />
    </>
  );
}
