import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { PageLoader } from './components/PageLoader';
import { IntroVideo } from './components/IntroVideo';
import { Home } from './pages/Home';

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
      <Navigation theme="home" />

      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
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
