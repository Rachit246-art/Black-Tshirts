import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FinalFooter } from '../components/FinalFooter';
import '../styles/why-choose-us.css';

interface Pillar {
  number: string;
  ref: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  specs: { label: string; value: string }[];
}

const pillars: Pillar[] = [
  {
    number: '01',
    ref: 'STD-420-DEN',
    title: '420 GSM Ultra-Dense Loopback Jersey',
    subtitle: 'Over 2.3x the weight of standard high-street luxury tees',
    description:
      'We rejected conventional 180 GSM cotton jerseys that collapse upon themselves. Our bespoke 420 GSM Egyptian cotton is tightly knit on vintage circular looms, delivering a sculpture-like drape that retains its architectural silhouette in all environments.',
    image: '/real image/product-1.jpeg',
    specs: [
      { label: 'Weight Benchmark', value: '420 GSM Heavyweight' },
      { label: 'Yarn Count', value: '24s Compact Combed' },
      { label: 'Drape Standard', value: 'Permanent Architectural' },
      { label: 'Shrinkage Tolerance', value: '< 1.5% Pre-Shrunk' },
    ],
  },
  {
    number: '02',
    ref: 'STD-280-COL',
    title: 'Zero-Sag 280 GSM Twin-Needle Collar',
    subtitle: 'Twin-needle coverstitch with embedded memory thread',
    description:
      'The collar is the telltale sign of true garment excellence. We engineered a 280 GSM reinforced elastic bound rib with 5-thread twin-needle overlock that guarantees zero neck-sag, waviness, or stretching across 100+ washing machine cycles.',
    image: '/real image/product-2.jpeg',
    specs: [
      { label: 'Collar Rib Density', value: '280 GSM Core Elastic' },
      { label: 'Stitch Standard', value: 'Twin-Needle 5-Thread' },
      { label: 'Wash Memory Test', value: '100+ Cycles Certified' },
      { label: 'Comfort Finish', value: 'Tagless Silk Screen' },
    ],
  },
  {
    number: '03',
    ref: 'STD-PRT-ML',
    title: 'Artisanal Portuguese Circular Loom Milling',
    subtitle: 'Milled exclusively in Porto, Portugal with 100% natural fibers',
    description:
      'Zero synthetic blends. Zero polyester compromises. Every yard of cotton is spun and milled in family-owned heritage textile facilities in Northern Portugal using slow circular looping technology that preserves individual fiber elasticity.',
    image: '/real image/product-3.jpeg',
    specs: [
      { label: 'Origin Mills', value: 'Porto, Portugal' },
      { label: 'Composition', value: '100% Long-Staple Cotton' },
      { label: 'Loom Technology', value: 'Slow Vintage Circular' },
      { label: 'Fiber Integrity', value: 'Grade-5 Zero Pilling' },
    ],
  },
  {
    number: '04',
    ref: 'STD-BOX-DRP',
    title: 'Engineered Drop-Shoulder Box Cut',
    subtitle: 'Calibrated proportions creating an authoritative silhouette',
    description:
      'Tailored with a dropped shoulder seam and a widened chest profile, creating a regal, assertive physical presence. The hem rests precisely at the hip line without ballooning, designed to flatter every body frame.',
    image: '/real image/product-4.jpeg',
    specs: [
      { label: 'Fit Profile', value: 'Engineered Boxy' },
      { label: 'Shoulder Drop', value: 'Calibrated Anatomical' },
      { label: 'Hem Finish', value: 'Reinforced Twin-Needle' },
      { label: 'Post-Wash Drape', value: '100% Retention' },
    ],
  },
  {
    number: '05',
    ref: 'STD-NUM-100',
    title: 'Strictly Numbered Worldwide Runs',
    subtitle: 'Cryptographic batch serialization capped at 100 garments',
    description:
      'Mass production destroys exclusivity. Each seasonal iteration is milled and dyed in strictly serialized editions of 100 units worldwide. Once an archival lot closes, the screens are retired and never re-issued.',
    image: '/real image/product-27.jpeg',
    specs: [
      { label: 'Edition Cap', value: '100 Pieces Worldwide' },
      { label: 'Verification', value: 'Cryptographic Ledger' },
      { label: 'Rarity Tier', value: 'Collector Grade' },
      { label: 'Packaging', value: 'Obsidian Presentation Box' },
    ],
  },
];

export const WhyChooseUs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'420' | '180'>('420');

  return (
    <div className="relative min-h-screen bg-[#000000] text-[#ffffff] selection:bg-[#ffffff] selection:text-[#000000] overflow-x-clip">
      {/* Ambient Lighting Gradient */}
      <div aria-hidden="true" className="why-ambient-glow" />

      {/* ========================================================================= */}
      {/* 1. HERO HEADER SECTION */}
      {/* ========================================================================= */}
      <section className="relative z-10 pt-36 md:pt-48 pb-20">
        <div className="why-page-container">
          {/* Subtle Watermark Kinetic Marquee */}
          <div aria-hidden="true" className="pointer-events-none absolute -top-4 left-0 right-0 opacity-15 overflow-hidden select-none">
            <div className="flex whitespace-nowrap animate-marquee-left">
              <span className="why-marquee-text pr-12">
                WHY MAISON JJETTAS · ARCHITECTURAL STANDARDS · 420 GSM PURE COTTON · ZERO COMPROMISE ·
              </span>
              <span className="why-marquee-text pr-12">
                WHY MAISON JJETTAS · ARCHITECTURAL STANDARDS · 420 GSM PURE COTTON · ZERO COMPROMISE ·
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center text-center max-w-5xl mx-auto relative z-10">
            {/* Top pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/20 bg-white/[0.04] backdrop-blur-md mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-white/90">
                The Haute Couture Standard // 5 Architectural Pillars
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="why-hero-title"
            >
              THE ATELIER <br />
              <span className="text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.4)]">
                STANDARD.
              </span>
            </motion.h1>

            {/* Sub-paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="why-hero-sub"
            >
              Why 420 GSM matters. Explore the architectural textile engineering, twin-needle collar memory,
              and vintage Porto circular looms that set Maison JJettas fundamentally apart from conventional luxury.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. TELEMETRY STATS GRID */}
      {/* ========================================================================= */}
      <section className="relative z-10 pb-28">
        <div className="why-page-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="why-stat-box"
            >
              <div className="why-stat-number">420</div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/60 block">
                GSM FABRIC DENSITY
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="why-stat-box"
            >
              <div className="why-stat-number">100+</div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/60 block">
                WASH CYCLES ZERO SAG
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="why-stat-box"
            >
              <div className="why-stat-number">0%</div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/60 block">
                SYNTHETIC POLYESTER
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="why-stat-box"
            >
              <div className="why-stat-number">100</div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/60 block">
                PIECES PER DROP MAX
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE 5 ARCHITECTURAL PILLARS (FRAMED SHOWCASE) */}
      {/* ========================================================================= */}
      <section className="relative z-10 pb-36">
        <div className="why-page-container space-y-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-white/50 block mb-3">
              HAUTE COUTURE EXCELLENCE
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
              Five Architectural Pillars
            </h2>
          </div>

          {pillars.map((pillar, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="why-frame-card"
              >
                {/* Architectural Corner Crosshairs */}
                <div className="why-frame-crosshair why-frame-tl" />
                <div className="why-frame-crosshair why-frame-tr" />
                <div className="why-frame-crosshair why-frame-bl" />
                <div className="why-frame-crosshair why-frame-br" />

                <div
                  className={`flex flex-col ${
                    isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
                  } items-stretch`}
                >
                  {/* Image Column (True Vibrant Color, Zero Grayscale) */}
                  <div className="lg:w-1/2 relative min-h-[360px] lg:min-h-[480px] overflow-hidden border-b lg:border-b-0 border-white/10">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      className="why-frame-img"
                      loading="lazy"
                    />

                    {/* Floating Ref Badge */}
                    <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
                      <span className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 font-mono text-xs tracking-widest text-white font-bold">
                        PILLAR {pillar.number}
                      </span>
                      <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md font-mono text-[10px] tracking-widest text-white/80">
                        {pillar.ref}
                      </span>
                    </div>
                  </div>

                  {/* Information & Specs Column */}
                  <div className="lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/50 block mb-2">
                        {pillar.subtitle}
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white mb-6">
                        {pillar.title}
                      </h3>
                      <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-light mb-8">
                        {pillar.description}
                      </p>
                    </div>

                    {/* Specification Table */}
                    <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                      {pillar.specs.map((spec) => (
                        <div key={spec.label} className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 block mb-1">
                            {spec.label}
                          </span>
                          <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-wider">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. INTERACTIVE HEAVYWEIGHT BENCHMARK MATRIX */}
      {/* ========================================================================= */}
      <section className="relative z-10 pb-36 border-t border-white/10 pt-28">
        <div className="why-page-container">
          <div className="why-matrix-box">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.28em] text-white/50 block mb-3">
                  DIRECT SPECIFICATION COMPARISON
                </span>
                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
                  The Heavyweight Benchmark
                </h3>
              </div>

              {/* Toggle Switch */}
              <div className="inline-flex items-center gap-2 p-1.5 rounded-full border border-white/20 bg-white/5">
                <button
                  onClick={() => setActiveTab('420')}
                  className={`px-5 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-all ${
                    activeTab === '420'
                      ? 'bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  Maison JJettas (420 GSM)
                </button>
                <button
                  onClick={() => setActiveTab('180')}
                  className={`px-5 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-all ${
                    activeTab === '180'
                      ? 'bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  High-Street Luxury (180 GSM)
                </button>
              </div>
            </div>

            {/* Comparative Breakdown Table */}
            <div className="space-y-4 font-mono">
              {[
                {
                  metric: 'FABRIC GRAMS / SQ METER',
                  jjettas: '420 GSM Ultra Loopback (Permanent drape)',
                  conventional: '180–220 GSM Standard (Collapses flat)',
                },
                {
                  metric: 'COLLAR RECOVERY LIFE',
                  jjettas: '100+ Wash Cycles (Elastic memory thread)',
                  conventional: '15–20 Wash Cycles (Bacon-neck sag)',
                },
                {
                  metric: 'ORIGIN & LOOM TECHNOLOGY',
                  jjettas: 'Vintage Circular Looms, Porto Portugal',
                  conventional: 'High-speed mass commodity production',
                },
                {
                  metric: 'FIBER PURITY',
                  jjettas: '100% Egyptian Combed Cotton (Zero poly)',
                  conventional: 'Blended with synthetic fibers / stretch poly',
                },
                {
                  metric: 'WORLDWIDE BATCH LIMIT',
                  jjettas: '100 Numbered Pieces / Strict Cap',
                  conventional: 'Mass production in 10,000+ quantities',
                },
              ].map((row) => (
                <div
                  key={row.metric}
                  className="p-5 rounded-xl border border-white/10 bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <span className="text-xs uppercase tracking-widest text-white/50 w-full sm:w-1/3">
                    {row.metric}
                  </span>
                  <div className="w-full sm:w-2/3 flex items-center justify-between text-xs sm:text-sm">
                    {activeTab === '420' ? (
                      <span className="text-white font-bold tracking-wider flex items-center gap-2">
                        <span className="text-emerald-400">✓</span> {row.jjettas}
                      </span>
                    ) : (
                      <span className="text-white/60 tracking-wider flex items-center gap-2">
                        <span className="text-red-400">✕</span> {row.conventional}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <span className="text-sm font-light text-neutral-400">
                Experience the structural weight in person through our 27-piece archive.
              </span>
              <Link
                to="/gallery"
                className="px-8 py-4 bg-white text-black font-mono text-xs uppercase tracking-[0.25em] font-bold hover:bg-neutral-200 transition-colors"
              >
                Explore The Gallery ↗
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FINAL FOOTER */}
      {/* ========================================================================= */}
      <div className="relative z-50">
        <FinalFooter />
      </div>
    </div>
  );
};

export default WhyChooseUs;
