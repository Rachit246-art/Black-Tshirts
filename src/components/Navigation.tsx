import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navLinks, footerData } from '../data/navigationData';

interface NavigationProps {
  theme?: 'home' | 'dark' | 'light' | 'purple' | 'foundation';
}

export const Navigation: React.FC<NavigationProps> = ({ theme = 'home' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const logoColor = isOpen
    ? '#ffffff'
    : (theme === 'home' || theme === 'foundation' ? '#ffffff' : '#ffffff');

  return (
    <>
      {/* Top Header Bar */}
      <header
        className="pointer-events-none fixed inset-x-0 top-0 flex items-center justify-between px-6 py-5 md:px-12 md:py-7"
        data-nav="true"
        style={{ zIndex: 99999 }}
      >
        <Link
          to="/"
          aria-label="Justin Jefferson — home"
          className="group pointer-events-auto relative block after:absolute after:-inset-3 after:content-['']"
          data-nav-logo="true"
          style={{ color: logoColor }}
        >
          <span className="block origin-center transition-[scale] duration-300 ease-out motion-safe:group-hover:scale-110 motion-safe:group-active:scale-105">
            <svg
              viewBox="0 0 37 43"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Justin Jefferson"
              className="h-10 w-auto md:h-12"
              style={{ fill: '#ffffff' }}
            >
              <path d="M27.9271 35.2244L28.9161 42.818L18.486 35.4071L7.90283 42.9264L8.88835 35.3355L18.4858 28.5164L27.9271 35.2244Z" />
              <path d="M15.4903 23.3423L0 34.2789L1.75369 20.6774L7.34806 16.7187L6.74483 23.1164L10.9979 20.1124L13.1327 3.79814L18.5 0L15.4903 23.3423Z" />
              <path d="M23.8673 3.79814L26.0021 20.1124L30.2552 23.1164L29.6519 16.7187L35.2463 20.6774L37 34.2789L21.5097 23.3423L18.5 0L23.8673 3.79814Z" />
            </svg>
          </span>
        </Link>

        {/* Custom Angled Hamburger */}
        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="site-navigation"
          data-hamburger="true"
          data-state={isOpen ? "open" : "closed"}
          onClick={() => setIsOpen(!isOpen)}
          className="pointer-events-auto -m-4 inline-flex items-center justify-center bg-transparent p-4"
          style={{ color: logoColor }}
        >
          <svg
            viewBox="0 0 30 13"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-hidden="true"
            className="h-3 w-auto md:h-3.5"
            style={{ fill: '#ffffff' }}
          >
            <path
              className={`hamburger-bar hamburger-bar--top transition-transform duration-300 origin-center ${
                isOpen ? 'translate-y-[4.5px] rotate-45' : ''
              }`}
              d="M8.541 0.000 L29.896 0.000 L27.010 4.040 L5.655 4.040 Z"
            />
            <path
              className={`hamburger-bar hamburger-bar--bot transition-transform duration-300 origin-center ${
                isOpen ? '-translate-y-[4.5px] -rotate-45' : ''
              }`}
              d="M2.886 8.888 L24.241 8.888 L21.355 12.928 L0.000 12.928 Z"
            />
          </svg>
        </button>
      </header>

      {/* Full-screen Overlay Site Navigation */}
      <div
        id="site-navigation"
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-[85] isolate flex flex-col justify-between overflow-y-auto overflow-x-hidden transition-[opacity,visibility] duration-500 ${
          isOpen
            ? 'opacity-100 pointer-events-auto visible'
            : 'opacity-0 pointer-events-none invisible'
        }`}
        style={{ backgroundColor: '#000000' }}
      >
        <div
          aria-hidden="true"
          className="jj-menu-grain pointer-events-none absolute inset-0 md:fixed"
          style={{
            backgroundImage: "url('/textures/pebble.webp')",
            backgroundSize: "var(--pebble-tile, 480px) var(--pebble-tile, 480px)",
            mixBlendMode: "overlay",
            opacity: 0.35
          }}
        />

        {/* Ambient glow accent */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.06)_0%,_transparent_70%)] blur-[100px]"
        />

        {/* Header spacer */}
        <div className="h-24 md:h-32 shrink-0" />

        {/* Main Links Container */}
        <div className="jj-menu-layout relative z-10 m-auto flex flex-col items-center justify-center py-8 px-6 w-full max-w-5xl">
          <nav
            aria-label="Main navigation"
            className="jj-menu-links relative m-auto flex shrink-0 flex-col items-center w-full"
          >
            <div className="flex flex-col items-center gap-y-8 md:gap-y-12 lg:gap-y-16">
              {navLinks.map((item, idx) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="group relative flex items-center justify-center text-[clamp(48px,11vw,108px)] font-display font-black uppercase tracking-[-0.03em] leading-none transition-all duration-500 ease-out"
                    style={{
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? 'translateY(0)' : 'translateY(30px)',
                      transitionDelay: `${idx * 0.06}s`
                    }}
                  >
                    <span
                      className={`relative z-10 transition-all duration-300 flex items-center ${
                        isActive
                          ? 'text-white font-black scale-105'
                          : 'text-white/40 group-hover:text-white group-hover:scale-105'
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <span className="inline-block w-3 h-3 md:w-4 md:h-4 ml-4 md:ml-6 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.9)]" />
                      )}
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Overlay Footer credits */}
        <div className="jj-menu-credits relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-8 md:px-16 text-[11px] uppercase tracking-widest text-white/50 font-mono border-t border-white/10">
          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/atassemble/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              An Assemble Project
            </a>
            <span className="opacity-30">/</span>
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <span className="opacity-30">/</span>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>

          <div>
            <a
              href="https://layertwo.design"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Site by LayerTwo
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
