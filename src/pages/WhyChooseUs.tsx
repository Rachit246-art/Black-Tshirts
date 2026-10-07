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
    <div className="relative min-h-screen bg-[#000000] text-[#ffffff] selection:bg-[#ffffff] selection:text-[#000000] overflow-x-hidden">
      {/* Ambient Lighting Gradient */}
      <div aria-hidden="true" className="why-ambient-glow" />

      {/* ========================================================================= */}
      {/* 1. HERO HEADER SECTION */}
      {/* ========================================================================= */}
      <section className="why-hero-section">
        {/* Subtle Watermark Kinetic Marquee */}
        <div aria-hidden="true" className="why-marquee-wrapper">
          <div className="why-marquee-track">
            <span className="why-marquee-text">
              WHY MAISON JJETTAS · ARCHITECTURAL STANDARDS · 420 GSM PURE COTTON · ZERO COMPROMISE ·
            </span>
            <span className="why-marquee-text">
              WHY MAISON JJETTAS · ARCHITECTURAL STANDARDS · 420 GSM PURE COTTON · ZERO COMPROMISE ·
            </span>
          </div>
        </div>

        <div className="why-page-container">
          <div style={{ maxWidth: '880px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
            {/* Top pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="why-hero-badge"
            >
              <span className="why-hero-badge-dot" />
              <span>The Haute Couture Standard // 5 Architectural Pillars</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="why-hero-title"
            >
              THE ATELIER <br />
              <span style={{ color: '#ffffff', textShadow: '0 0 50px rgba(255,255,255,0.4)' }}>
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
      <section className="why-stats-section">
        <div className="why-page-container">
          <div className="why-stats-grid">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="why-stat-box"
            >
              <div className="why-stat-number">420</div>
              <span className="why-stat-label">GSM Fabric Density</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="why-stat-box"
            >
              <div className="why-stat-number">100+</div>
              <span className="why-stat-label">Wash Cycles Zero Sag</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="why-stat-box"
            >
              <div className="why-stat-number">0%</div>
              <span className="why-stat-label">Synthetic Polyester</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="why-stat-box"
            >
              <div className="why-stat-number">100</div>
              <span className="why-stat-label">Pieces Per Drop Max</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE 5 ARCHITECTURAL PILLARS (FRAMED SHOWCASE) */}
      {/* ========================================================================= */}
      <section className="why-pillars-section">
        <div className="why-page-container">
          <div className="why-section-header">
            <span className="why-section-eyebrow">Haute Couture Excellence</span>
            <h2 className="why-section-title">Five Architectural Pillars</h2>
          </div>

          <div className="why-pillars-list">
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

                  <div className={`why-frame-inner ${isReversed ? 'reversed' : ''}`}>
                    {/* Image Column (True Vibrant Color, Zero Grayscale) */}
                    <div className="why-frame-img-col">
                      <img
                        src={pillar.image}
                        alt={pillar.title}
                        className="why-frame-img"
                        loading="lazy"
                      />

                      {/* Floating Ref Badge */}
                      <div className="why-frame-tag-badge">
                        <span className="why-pillar-pill">PILLAR {pillar.number}</span>
                        <span className="why-ref-pill">{pillar.ref}</span>
                      </div>
                    </div>

                    {/* Information & Specs Column */}
                    <div className="why-frame-info-col">
                      <div>
                        <span className="why-pillar-subtitle">{pillar.subtitle}</span>
                        <h3 className="why-pillar-title">{pillar.title}</h3>
                        <p className="why-pillar-desc">{pillar.description}</p>
                      </div>

                      {/* Specification Table */}
                      <div className="why-specs-grid">
                        {pillar.specs.map((spec) => (
                          <div key={spec.label} className="why-spec-item">
                            <span className="why-spec-item-label">{spec.label}</span>
                            <span className="why-spec-item-val">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. INTERACTIVE HEAVYWEIGHT BENCHMARK MATRIX */}
      {/* ========================================================================= */}
      <section className="why-matrix-section">
        <div className="why-page-container">
          <div className="why-matrix-box">
            <div className="why-matrix-header">
              <div>
                <span className="why-section-eyebrow">Direct Specification Comparison</span>
                <h3 className="why-matrix-title">The Heavyweight Benchmark</h3>
              </div>

              {/* Toggle Switch */}
              <div className="why-matrix-tabs">
                <button
                  type="button"
                  onClick={() => setActiveTab('420')}
                  className={`why-matrix-tab-btn ${activeTab === '420' ? 'active' : ''}`}
                >
                  Maison JJettas (420 GSM)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('180')}
                  className={`why-matrix-tab-btn ${activeTab === '180' ? 'active' : ''}`}
                >
                  High-Street Luxury (180 GSM)
                </button>
              </div>
            </div>

            {/* Comparative Breakdown Table */}
            <div className="why-matrix-table">
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
                <div key={row.metric} className="why-matrix-row">
                  <span className="why-matrix-metric">{row.metric}</span>
                  <div className="why-matrix-val">
                    {activeTab === '420' ? (
                      <span style={{ color: '#ffffff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#34d399' }}>✓</span> {row.jjettas}
                      </span>
                    ) : (
                      <span style={{ color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#f87171' }}>✕</span> {row.conventional}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="why-matrix-footer">
              <span style={{ fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.6)' }}>
                Experience the structural weight in person through our 27-piece archive.
              </span>
              <Link to="/gallery" className="why-cta-btn">
                Explore The Gallery ↗
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FINAL FOOTER */}
      {/* ========================================================================= */}
      <div style={{ position: 'relative', zIndex: 50 }}>
        <FinalFooter />
      </div>
    </div>
  );
};

export default WhyChooseUs;
