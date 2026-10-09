import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navLinks, footerData } from '../data/navigationData';
import { VisitStudioButton } from './studio/VisitStudioButton';

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

        {/* Right side controls */}
        <div className="flex items-center gap-6 pointer-events-auto">
          <VisitStudioButton />
          
          {/* Custom Angled Hamburger */}
          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="site-navigation"
            data-hamburger="true"
            data-state={isOpen ? "open" : "closed"}
            onClick={() => setIsOpen(!isOpen)}
            className="-m-4 inline-flex items-center justify-center bg-transparent p-4"
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
        </div>
      </header>

      {/* Full-screen Overlay Site Navigation */}
      <div
        id="site-navigation"
        aria-hidden={!isOpen}
        className={`jj-menu-overlay ${
          isOpen
            ? 'opacity-100 pointer-events-auto visible'
            : 'opacity-0 pointer-events-none invisible'
        }`}
      >
        {/* Ambient Center Radial Glow */}
        <div aria-hidden="true" className="jj-menu-ambient-glow" />

        {/* Main Links Container */}
        <nav aria-label="Main navigation" className="jj-menu-list">
          {navLinks.map((item, idx) => {
            const isActive = location.pathname === item.href;
            const indexStr = `0${idx + 1}`;

            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`jj-menu-link-item group ${isActive ? 'active' : ''}`}
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateY(0)' : 'translateY(24px)',
                  transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.05}s`
                }}
              >
                <span className="jj-menu-link-num">{indexStr}</span>
                <span className="jj-menu-link-text">
                  {item.label}
                  {isActive && <span className="jj-menu-active-dot" />}
                </span>
              </Link>
            );
          })}
        </nav>


      </div>
    </>
  );
};
