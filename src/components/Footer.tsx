import React from 'react';
import { Link } from 'react-router-dom';
import { navLinks, footerData } from '../data/navigationData';

export const Footer: React.FC = () => {
  return (
    <footer
      className="relative z-20 w-full overflow-hidden bg-[#ffffff] text-[#ffffff] px-6 pt-24 pb-12 md:px-16 md:pt-36 md:pb-16"
      style={{
        backgroundColor: 'var(--color-ink-deep)'
      }}
    >
      {/* Leather Background Texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-45 texture-leather"
      />

      {/* Subtle Gradient Shadow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#ffffff]/50 to-[#000000]"
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-16 md:gap-24">
        {/* Top Section: Giant Editorial Monogram & Statement */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-[#ffffff]/10">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#ffffff] mb-4">
              Justin Jefferson · #18
            </div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-8xl tracking-tight leading-[0.95] text-[#ffffff]">
              Writing History
            </h2>
          </div>

          <div className="max-w-md text-sm md:text-base text-[#ffffff]/60 leading-relaxed font-body">
            Minnesota Vikings wide receiver. Rewriting the record books while shaping modern sports culture on and off the field.
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 font-mono text-xs uppercase tracking-wider">
          {/* Main Navigation */}
          <div className="flex flex-col gap-4">
            <span className="text-[#ffffff]/40 font-semibold tracking-widest text-[10px]">
              Navigation
            </span>
            <div className="flex flex-col gap-2.5">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-[#ffffff]/80 hover:text-[#ffffff] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-4">
            <span className="text-[#ffffff]/40 font-semibold tracking-widest text-[10px]">
              Socials
            </span>
            <div className="flex flex-col gap-2.5">
              {footerData.socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#ffffff]/80 hover:text-[#ffffff] transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Inquiries */}
          <div className="flex flex-col gap-4">
            <span className="text-[#ffffff]/40 font-semibold tracking-widest text-[10px]">
              Inquiries
            </span>
            <div className="flex flex-col gap-2.5 text-[#ffffff]/70 normal-case">
              <div>
                <span className="text-[10px] uppercase font-mono text-[#ffffff]/40 block">Partnerships</span>
                <a href="mailto:partnerships@jjettas.com" className="hover:text-[#ffffff] transition-colors">
                  partnerships@jjettas.com
                </a>
              </div>
              <div className="pt-2">
                <span className="text-[10px] uppercase font-mono text-[#ffffff]/40 block">Press & Media</span>
                <a href="mailto:media@jjettas.com" className="hover:text-[#ffffff] transition-colors">
                  media@jjettas.com
                </a>
              </div>
              <div className="pt-2">
                <span className="text-[10px] uppercase font-mono text-[#ffffff]/40 block">Appearances</span>
                <a href="mailto:booking@jjettas.com" className="hover:text-[#ffffff] transition-colors">
                  booking@jjettas.com
                </a>
              </div>
            </div>
          </div>

          {/* Foundation */}
          <div className="flex flex-col gap-4">
            <span className="text-[#ffffff]/40 font-semibold tracking-widest text-[10px]">
              Community
            </span>
            <p className="normal-case text-xs text-[#ffffff]/70 leading-relaxed">
              The JJets Foundation delivers meaningful youth impact through athletics, mentorship, and emergency family relief.
            </p>
            <Link
              to="/foundation"
              className="mt-2 inline-flex items-center gap-2 text-[#ffffff] hover:underline text-[11px]"
            >
              Learn More →
            </Link>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 border-t border-[#ffffff]/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-[11px] font-mono text-[#ffffff]/50">
          <div className="flex flex-wrap items-center gap-6">
            <span>© {new Date().getFullYear()} Justin Jefferson. All rights reserved.</span>
            <a
              href="https://www.instagram.com/atassemble/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#ffffff] transition-colors"
            >
              An Assemble Project
            </a>
            <Link to="/privacy" className="hover:text-[#ffffff] transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-[#ffffff] transition-colors">
              Terms
            </Link>
          </div>

          <div>
            <a
              href="https://layertwo.design"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#ffffff] transition-colors"
            >
              Site by LayerTwo
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
