import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { PageLoader } from './components/PageLoader';
import { IntroVideo } from './components/IntroVideo';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Gallery } from './pages/Gallery';
import { Studio } from './pages/Studio';
import { StudioProduct } from './pages/StudioProduct';
import { WhyChooseUs } from './pages/WhyChooseUs';
import { Reviews } from './pages/Reviews';
import { Contact } from './pages/Contact';
import { ArticleDetail } from './pages/ArticleDetail';

// Scroll to top helper on route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Route wrapper with page-specific theme detection
const AppContent: React.FC = () => {
  const location = useLocation();
  // Flow: PageLoader (0-100%) -> IntroVideo (t-shirt-video.mp4) -> Hero section
  const [introStep, setIntroStep] = useState<'loader' | 'video' | 'ready'>('loader');

  useEffect(() => {
    document.body.setAttribute('data-theme', 'home');
  }, []);

  return (
    <>
      <ScrollToTop />
      
      {/* Background authentic graphic layers (Only base and screen pebble, NO global leather) */}
      <div aria-hidden="true" className="bg-layers">
        <div className="bg-layers__base" />
        <div className="bg-layers__texture bg-layers__texture--screen" />
        <div className="bg-layers__light" />
      </div>

      {/* Step 1: Preload page */}
      {introStep === 'loader' && (
        <PageLoader onComplete={() => setIntroStep('ready')} />
      )}

      {/* Navigation (visible once video begins or completes) */}
      {introStep !== 'loader' && <Navigation theme="home" />}

      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/studio/:id" element={<StudioProduct />} />
          <Route path="/why-choose-us" element={<WhyChooseUs />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
