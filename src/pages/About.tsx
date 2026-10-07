import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FinalFooter } from '../components/FinalFooter';

// Fabric & Garment Specification Data
interface GarmentFeature {
  id: string;
  part: string;
  title: string;
  subtitle: string;
  description: string;
  specs: { label: string; value: string }[];
  image: string;
}

const garmentFeatures: GarmentFeature[] = [
  {
    id: 'fabric',
    part: '01 / THE TEXTILE',
    title: '420 GSM Heavyweight Loopback Jersey',
    subtitle: 'Custom-Milled Egyptian Long-Staple Cotton',
    description:
      'We rejected conventional lightweight jerseys that collapse upon themselves. Our bespoke 420 GSM cotton is tightly knit on vintage circular looms, delivering a sculpture-like drape that retains its architectural silhouette through hundreds of washes.',
    specs: [
      { label: 'Weight', value: '420 GSM' },
      { label: 'Origin', value: 'Porto, Portugal' },
      { label: 'Yarn Count', value: '24s Compact Combed' },
      { label: 'Shrinkage', value: '< 1.5% Pre-Shrunk' },
    ],
    image: '/real image/gallery-1.jfif',
  },
  {
    id: 'collar',
    part: '02 / THE ARCHITECTURE',
    title: '280 GSM Ribbed Bound Collar',
    subtitle: 'Reinforced 1.25" Twin-Needle Coverstitch',
    description:
      'The neckline makes or breaks a luxury tee. Our bound collar is reinforced with custom elastic core threads, ensuring a flush, flat sit against the neck that never sags, wrinkles, or stretches out of shape.',
    specs: [
      { label: 'Collar Height', value: '3.2 cm (1.25")' },
      { label: 'Construction', value: '5-Thread Coverstitch' },
      { label: 'Recovery Rate', value: '98% Shape Memory' },
      { label: 'Comfort', value: 'Tagless Silk Screen' },
    ],
    image: '/real image/gallery-2.jfif',
  },
  {
    id: 'cut',
    part: '03 / THE SILHOUETTE',
    title: 'Engineered Drop-Shoulder Box Cut',
    subtitle: 'Calibrated Proportions for Everyday Royalty',
    description:
      'Patterned specifically for commanding presence. A dropped shoulder seam transitions into wide-bicep sleeves that terminate just above the elbow, balanced by an intentional boxy torso with a clean horizontal break.',
    specs: [
      { label: 'Fit Profile', value: 'Structured Boxy' },
      { label: 'Shoulder Drop', value: '5.5 cm Balanced' },
      { label: 'Sleeve Cut', value: 'Over-Elbow Pitch' },
      { label: 'Hem Finish', value: 'Blind-Stitched Edge' },
    ],
    image: '/real image/gallery-3.jfif',
  },
  {
    id: 'dye',
    part: '04 / THE FINISH',
    title: 'Carbon-Enzyme Washed Matte Black',
    subtitle: 'Deep Pigment Absorption & Velvet Tactility',
    description:
      'Achieving the ultimate black requires alchemy. Our garments undergo a proprietary carbon-dye bath followed by an organic enzyme wash, removing micro-fuzz while imparting a tactile softness with deep matte midnight tonality.',
    specs: [
      { label: 'Colorway', value: 'Obsidian Matte' },
      { label: 'Wash Process', value: 'Carbon + Bio-Enzyme' },
      { label: 'Colorfastness', value: 'Grade 5 Luxury' },
      { label: 'Texture', value: 'Silken Hand-Feel' },
    ],
    image: '/real image/gallery-10.jfif',
  },
];

// Timeline Milestones
interface TimelineEra {
  year: string;
  title: string;
  category: string;
  quote: string;
  story: string;
  statBadge: string;
  image: string;
}

const timelineEras: TimelineEra[] = [
  {
    year: '2019',
    title: 'The Bayou Crucible',
    category: 'LSU TIGERS & NATIONAL CROWN',
    quote: 'Before you can conquer the world, you must conquer your craft.',
    story:
      'In Baton Rouge, Louisiana, the world first witnessed the undeniable spark. 111 receptions, 18 touchdowns, and an undefeated national championship season that rewrote college football history forever.',
    statBadge: '111 REC · 18 TD · CFP CHAMPION',
    image: 'https://cdn.sanity.io/images/zil8k06j/production/6fa7c7fd07fdbf07119a115343881c3a9913963f-1067x1600.webp',
  },
  {
    year: '2020',
    title: 'The Arrival & The Rookie Mark',
    category: 'MINNESOTA VIKINGS · FIRST ROUND',
    quote: 'They said rookie wideouts need time to adapt. I decided not to wait.',
    story:
      'Drafted 22nd overall, Justin entered the NFL and promptly dismantled the modern rookie receiving record with 1,400 yards, proving instant mastery at the highest echelon.',
    statBadge: '1,400 YDS · ALL-PRO ROOKIE',
    image: 'https://cdn.sanity.io/images/zil8k06j/production/d3e033e240d85dddfbced35e0dab1491bad7be84-1200x1500.webp',
  },
  {
    year: '2022',
    title: 'King of the Gridiron',
    category: 'OFFENSIVE PLAYER OF THE YEAR',
    quote: 'Pressure isn’t something that happens to you. It’s what you generate.',
    story:
      'A transcendent campaign leading the league with 128 catches and 1,809 yards. The historic 4th-and-18 one-handed catch in Buffalo was immortalized in NFL folklore as one of the greatest plays ever executed.',
    statBadge: '1,809 YDS · AP OPOY · 1ST TEAM ALL-PRO',
    image: 'https://cdn.sanity.io/images/zil8k06j/production/ac5710872c7f703f0a4f7d887ad30a6dd280fcdd-1200x1600.webp',
  },
  {
    year: '2023',
    title: 'The 99 Club & Runway Ascendance',
    category: 'CULTURE · GAMING · COUTURE',
    quote: 'True style is carrying yourself like the only version that will ever exist.',
    story:
      'Inducted into the elusive Madden 99 Club. Outside the stadium, Justin emerged as a global style titan, making front-row appearances at Paris Fashion Week and fronting luxury editorial campaigns worldwide.',
    statBadge: 'MADDEN 99 · MET GALA · PARIS FASHION',
    image: 'https://cdn.sanity.io/images/zil8k06j/production/a7106dbd9a605ac4276242c2fbe4cc2d282e583f-1600x1066.webp',
  },
  {
    year: '2024-26',
    title: 'Maison Black-Tshirts Genesis',
    category: 'THE ATELIER & ARCHIVE',
    quote: 'A blank t-shirt is the most honest garment in the world. It cannot hide.',
    story:
      'Translating uncompromising athletic discipline into physical garments. Black-Tshirts was born not as merchandise, but as an independent luxury atelier celebrating weight, posture, and eternal confidence.',
    statBadge: 'BESPOKE 420 GSM · LIMITED MAISON',
    image: '/real image/gallery-7.jfif',
  },
];

// Lookbook Items
interface LookbookItem {
  id: string;
  title: string;
  category: string;
  weight: string;
  edition: string;
  image: string;
  notes: string;
}

const lookbookItems: LookbookItem[] = [
  {
    id: 'lb-1',
    title: 'The Vintage Duck Oversized',
    category: 'Core Edition',
    weight: '420 GSM Jersey',
    edition: 'Limited Run of 100',
    image: '/real image/gallery-1.jfif',
    notes: 'Engineered drape with custom distressed chest art and brushed vintage finish.',
  },
  {
    id: 'lb-2',
    title: 'Goosebumps Noir Cut',
    category: 'Archive Series',
    weight: '400 GSM Heavy Cotton',
    edition: 'Permanent Vault',
    image: '/real image/gallery-2.jfif',
    notes: 'Rich chocolate undertones under pure carbon black wash. Relaxed box fit.',
  },
  {
    id: 'lb-3',
    title: 'Reality Mask Statement Tee',
    category: 'Art Capsule',
    weight: '440 GSM Loopback',
    edition: 'Edition of 150',
    image: '/real image/gallery-3.jfif',
    notes: 'High-density puff ink with tactile relief. Pre-washed for heirloom softness.',
  },
  {
    id: 'lb-4',
    title: 'Outside Studio Off-White',
    category: 'Monochrome Shift',
    weight: '380 GSM Summer Knit',
    edition: 'Season Capsule',
    image: '/real image/gallery-4.jfif',
    notes: 'Breathable combed cotton offering architectural posture in natural bone tone.',
  },
  {
    id: 'lb-5',
    title: 'Pain Anime Graphic Noir',
    category: 'Pop Culture Atelier',
    weight: '420 GSM Heavyweight',
    edition: 'Limited Restock',
    image: '/real image/gallery-5.jfif',
    notes: 'Intricate oversized back-print with micro-gradient halftones and blind hem.',
  },
  {
    id: 'lb-6',
    title: 'Vintage Car Heritage Edition',
    category: 'Collector Line',
    weight: '450 GSM French Terry',
    edition: 'Archival 75 Pieces',
    image: '/real image/gallery-7.jfif',
    notes: 'Hand-finished faded edges mimicking decades of natural sunlight exposure.',
  },
];

export const About: React.FC = () => {
  // Active feature tab state
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const activeFeature = garmentFeatures[activeFeatureIndex];

  // Active timeline state
  const [activeEraIndex, setActiveEraIndex] = useState(2); // Default to 2022
  const activeEra = timelineEras[activeEraIndex];

  // Lightbox state
  const [selectedLookbook, setSelectedLookbook] = useState<LookbookItem | null>(null);

  // Philosophy quote index
  const [philosophyTab, setPhilosophyTab] = useState(0);
  const philosophyQuotes = [
    {
      title: 'THE OBSESSION',
      quote:
        '“The exact same obsession required to run an undefendable route at full sprint is what we poured into every single millimeter of this t-shirt.”',
      author: 'Justin Jefferson',
      role: 'Founder & Visionary',
    },
    {
      title: 'THE UNIFORM',
      quote:
        '“A black t-shirt is the ultimate weapon of modern luxury. When you strip away loud logos and neon distractions, all that remains is posture, presence, and undeniable confidence.”',
      author: 'Studio JJettas',
      role: 'Atelier Philosophy',
    },
    {
      title: 'THE ENDURANCE',
      quote:
        '“Fast fashion is designed to be forgotten. We build garments that feel better at wear number 100 than they did on day one. Heavy. Structured. Eternal.”',
      author: 'Garment Engineering',
      role: 'Technical Direction',
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#000000] text-[#ffffff] selection:bg-[#ffffff] selection:text-[#000000] overflow-x-hidden">
      {/* Background Subtle Grain Texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-25"
        style={{
          backgroundImage: "url('/textures/pebble.webp')",
          backgroundSize: '480px 480px',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Ambient Lighting Gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.06)_0%,_transparent_70%)] blur-[120px] z-0"
      />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative z-10 pt-36 md:pt-48 pb-20 md:pb-28 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Hero Typography */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Top pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md w-fit mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/80">
                Maison JJettas · About The Brand
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-[-0.03em] leading-[0.92] mb-8"
            >
              BEYOND <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">
                THE GAME.
              </span>
              <br />
              BEYOND TIME.
            </motion.h1>

            {/* Sub-paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-body text-base sm:text-lg md:text-xl text-white/70 max-w-xl leading-relaxed font-light mb-10"
            >
              Founded by Justin Jefferson, <strong className="text-white font-medium">Black-Tshirts</strong> is the
              collision of generational gridiron mastery and haute streetwear couture. We craft the definitive heavyweight
              uniform for the uncompromising modern individual.
            </motion.p>

            {/* Action Badges / CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 sm:gap-6"
            >
              <Link
                to="/"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-black font-mono text-xs uppercase tracking-[0.2em] font-bold rounded-none overflow-hidden transition-all duration-300 hover:bg-neutral-200"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Explore Archives
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>

              <a
                href="#manifesto"
                className="inline-flex items-center gap-2 px-6 py-4 border border-white/20 text-white/80 font-mono text-xs uppercase tracking-[0.2em] hover:text-white hover:border-white transition-colors duration-300"
              >
                Read Manifesto ↓
              </a>
            </motion.div>
          </div>

          {/* Right Column: Interactive 3D Hero Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-[420px] group">
              {/* Outer Glow Halo */}
              <div className="absolute -inset-4 bg-gradient-to-b from-white/15 to-transparent rounded-2xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none" />

              {/* Main Image Frame */}
              <div className="relative rounded-xl overflow-hidden border border-white/20 bg-neutral-900 shadow-[0_30px_100px_rgba(0,0,0,0.8)] aspect-[4/5]">
                <img
                  src="https://cdn.sanity.io/images/zil8k06j/production/d3e033e240d85dddfbced35e0dab1491bad7be84-1200x1500.webp"
                  alt="Justin Jefferson Noir Editorial"
                  className="w-full h-full object-cover object-center filter grayscale contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Corner Accents */}
                <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-white/80 pointer-events-none" />
                <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-white/80 pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-white/80 pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-white/80 pointer-events-none" />

                {/* Subtle Image Bottom Vignette */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />

                {/* Floating Badge on Image */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs font-mono tracking-widest text-white/90">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/50 uppercase">Creative Director</span>
                    <span className="font-bold text-sm tracking-normal font-display">JUSTIN JEFFERSON</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-white/50 uppercase">Atelier No.</span>
                    <span className="font-bold text-sm block">018 / 024</span>
                  </div>
                </div>
              </div>

              {/* Floating Spec Tag 1 */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -left-6 bg-black/90 border border-white/20 backdrop-blur-md px-4 py-2.5 rounded-lg shadow-2xl hidden sm:flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <div className="font-mono text-[10px] uppercase tracking-widest">
                  <span className="text-white/50 block">Fabric Grade</span>
                  <span className="text-white font-bold">420 GSM PURE HEAVY</span>
                </div>
              </motion.div>

              {/* Floating Spec Tag 2 */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-6 -right-6 bg-black/90 border border-white/20 backdrop-blur-md px-4 py-2.5 rounded-lg shadow-2xl hidden sm:flex items-center gap-3"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                <div className="font-mono text-[10px] uppercase tracking-widest">
                  <span className="text-white/50 block">Certified Fit</span>
                  <span className="text-white font-bold">DROP-SHOULDER BOX</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. STATS BANNER / METRICS OF MASTERY */}
      {/* ========================================================================= */}
      <section className="relative z-10 border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center md:text-left">
            <div className="border-l-0 md:border-l border-white/10 pl-0 md:pl-6 first:border-l-0">
              <span className="font-mono text-[11px] text-white/50 uppercase tracking-widest block mb-2">
                NFL Career Reception Record
              </span>
              <div className="font-display text-4xl sm:text-5xl font-extrabold text-white">592+</div>
              <span className="text-xs text-white/60 font-body mt-1 block">Catches in historic time</span>
            </div>

            <div className="border-l-0 md:border-l border-white/10 pl-0 md:pl-6">
              <span className="font-mono text-[11px] text-white/50 uppercase tracking-widest block mb-2">
                All-Time Receiving Yards
              </span>
              <div className="font-display text-4xl sm:text-5xl font-extrabold text-white">8,659+</div>
              <span className="text-xs text-white/60 font-body mt-1 block">Fastest receiver to 5k & 8k</span>
            </div>

            <div className="border-l-0 md:border-l border-white/10 pl-0 md:pl-6">
              <span className="font-mono text-[11px] text-white/50 uppercase tracking-widest block mb-2">
                Garment Fabric Benchmark
              </span>
              <div className="font-display text-4xl sm:text-5xl font-extrabold text-white">420<span className="text-2xl text-white/50 font-mono">GSM</span></div>
              <span className="text-xs text-white/60 font-body mt-1 block">Custom engineered drape</span>
            </div>

            <div className="border-l-0 md:border-l border-white/10 pl-0 md:pl-6">
              <span className="font-mono text-[11px] text-white/50 uppercase tracking-widest block mb-2">
                Digital & Gaming Honor
              </span>
              <div className="font-display text-4xl sm:text-5xl font-extrabold text-white">99<span className="text-2xl text-white/50 font-mono">OVR</span></div>
              <span className="text-xs text-white/60 font-body mt-1 block">Consecutive Madden 99 Club</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MANIFESTO & PHILOSOPHY */}
      {/* ========================================================================= */}
      <section id="manifesto" className="relative z-10 py-24 md:py-36 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/50 mb-4 block">
            The Philosophy · Maison Vision
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tight max-w-4xl leading-[1.05]">
            “WE DO NOT MAKE MERCHANDISE. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-500">
              WE FORGE MODERN ARMOR.”
            </span>
          </h2>
          <div className="w-16 h-[2px] bg-white mt-8 mb-6" />
        </div>

        {/* Interactive Philosophy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {philosophyQuotes.map((item, idx) => {
            const isSelected = philosophyTab === idx;
            return (
              <motion.div
                key={idx}
                onClick={() => setPhilosophyTab(idx)}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className={`relative p-8 md:p-10 rounded-xl cursor-pointer transition-all duration-500 border ${
                  isSelected
                    ? 'border-white bg-white/[0.06] shadow-[0_15px_50px_rgba(255,255,255,0.08)]'
                    : 'border-white/10 bg-neutral-950/60 hover:border-white/30 hover:bg-white/[0.02]'
                }`}
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-xs uppercase tracking-widest text-white/50">
                    {`PILLAR 0${idx + 1}`}
                  </span>
                  <span
                    className={`font-mono text-xs uppercase tracking-widest px-2.5 py-1 rounded border ${
                      isSelected
                        ? 'border-white text-white bg-white/10'
                        : 'border-white/10 text-white/40'
                    }`}
                  >
                    {item.title}
                  </span>
                </div>

                <p className="font-body text-base md:text-lg text-white/90 leading-relaxed font-light mb-8 italic">
                  {item.quote}
                </p>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="font-display text-sm uppercase font-bold text-white block">
                      {item.author}
                    </span>
                    <span className="font-mono text-[11px] text-white/50 tracking-wider">
                      {item.role}
                    </span>
                  </div>
                  <span className="text-white/40 font-mono text-sm">
                    {isSelected ? '●' : '○'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. THE CRAFTSMANSHIP LAB / INTERACTIVE ANATOMY */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-24 md:py-32 bg-neutral-950/80 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/50 block mb-3">
                Fabric Lab & Construction
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight">
                THE ANATOMY OF A <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/30">
                  BLACK T-SHIRT.
                </span>
              </h2>
            </div>
            <p className="font-body text-sm sm:text-base text-white/60 max-w-md font-light leading-relaxed">
              Every curve, seam, and grain of thread is calculated with the precision of an NFL all-pro route. Select an
              element to inspect our bespoke engineering.
            </p>
          </div>

          {/* Interactive Inspection Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Tabs Selector */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {garmentFeatures.map((feat, idx) => {
                const isActive = activeFeatureIndex === idx;
                return (
                  <button
                    key={feat.id}
                    onClick={() => setActiveFeatureIndex(idx)}
                    type="button"
                    className={`text-left p-5 md:p-6 rounded-lg transition-all duration-300 border flex flex-col gap-1.5 relative overflow-hidden ${
                      isActive
                        ? 'border-white bg-white/[0.08] text-white shadow-xl'
                        : 'border-white/10 bg-black/40 text-white/60 hover:text-white hover:border-white/30'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeBar"
                        className="absolute left-0 top-0 bottom-0 w-1.5 bg-white"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                      {feat.part}
                    </span>
                    <span className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-white">
                      {feat.title}
                    </span>
                    <span className="font-body text-xs text-white/60">
                      {feat.subtitle}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Interactive Detail Viewer */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-black/80 border border-white/20 rounded-xl p-6 md:p-10 relative overflow-hidden shadow-2xl"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    {/* Visual Preview */}
                    <div className="md:col-span-5 relative aspect-square rounded-lg overflow-hidden border border-white/15 bg-neutral-900 group">
                      <img
                        src={activeFeature.image}
                        alt={activeFeature.title}
                        className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-widest text-white border border-white/20">
                        INSPECTION 0{activeFeatureIndex + 1}
                      </div>
                    </div>

                    {/* Explanatory Specs */}
                    <div className="md:col-span-7 flex flex-col justify-between">
                      <div>
                        <span className="font-mono text-xs uppercase tracking-widest text-white/50 block mb-2">
                          {activeFeature.part}
                        </span>
                        <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white mb-2">
                          {activeFeature.title}
                        </h3>
                        <p className="font-body text-sm text-white/70 leading-relaxed font-light mb-6">
                          {activeFeature.description}
                        </p>
                      </div>

                      {/* Technical Specs Table */}
                      <div className="grid grid-cols-2 gap-3 pt-6 border-t border-white/15">
                        {activeFeature.specs.map((spec, sIdx) => (
                          <div key={sIdx} className="bg-white/[0.03] p-3 rounded border border-white/10">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-white/40 block">
                              {spec.label}
                            </span>
                            <span className="font-mono text-xs font-bold text-white mt-0.5 block">
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. THE GENESIS TIMELINE / MILESTONES OF GLORY */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-24 md:py-36 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/50 mb-3 block">
            Historic Timeline · 2019 — 2026
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight">
            THE CHRONICLES OF EXCELLENCE
          </h2>
          <p className="font-body text-white/60 text-sm sm:text-base max-w-xl mx-auto font-light mt-4">
            How a three-star recruit out of St. Rose, Louisiana conquered the NFL, entered fashion royalty, and established
            the Black-Tshirts Maison.
          </p>
        </div>

        {/* Timeline Year Selectors */}
        <div className="flex items-center justify-start md:justify-center overflow-x-auto gap-3 pb-6 mb-12 no-scrollbar">
          {timelineEras.map((era, index) => {
            const isEraActive = activeEraIndex === index;
            return (
              <button
                key={era.year}
                type="button"
                onClick={() => setActiveEraIndex(index)}
                className={`relative px-6 py-3 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-300 shrink-0 border ${
                  isEraActive
                    ? 'border-white bg-white text-black font-bold shadow-lg scale-105'
                    : 'border-white/15 text-white/60 bg-white/[0.02] hover:border-white/40 hover:text-white'
                }`}
              >
                {era.year}
              </button>
            );
          })}
        </div>

        {/* Active Milestone Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeEra.year}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="bg-neutral-950 border border-white/20 rounded-2xl p-8 md:p-14 relative overflow-hidden shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Details */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="font-mono text-xs px-3 py-1 bg-white/10 rounded-full text-white tracking-widest uppercase border border-white/20">
                      {activeEra.year} ERA
                    </span>
                    <span className="font-mono text-xs tracking-widest uppercase text-white/50">
                      {activeEra.category}
                    </span>
                  </div>

                  <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-6">
                    {activeEra.title}
                  </h3>

                  <blockquote className="font-body text-lg md:text-xl italic text-white/90 border-l-2 border-white pl-4 mb-6 leading-relaxed font-light">
                    {activeEra.quote}
                  </blockquote>

                  <p className="font-body text-base text-white/70 leading-relaxed font-light mb-8">
                    {activeEra.story}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">
                    Badge Certification:
                  </span>
                  <span className="font-mono text-xs font-bold text-white bg-white/10 px-3.5 py-1.5 rounded border border-white/20">
                    {activeEra.statBadge}
                  </span>
                </div>
              </div>

              {/* Right Portrait */}
              <div className="lg:col-span-5 relative aspect-[4/5] rounded-xl overflow-hidden border border-white/20 bg-neutral-900 shadow-2xl">
                <img
                  src={activeEra.image}
                  alt={activeEra.title}
                  className="w-full h-full object-cover filter grayscale contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 font-mono text-[11px] text-white/80 tracking-widest uppercase flex justify-between items-center">
                  <span>HISTORIC ARCHIVE</span>
                  <span>RECORD ENTRY</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ========================================================================= */}
      {/* 6. LOOKBOOK / EDITORIAL GALLERY WITH LIGHTBOX MODAL */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-24 md:py-36 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/50 block mb-3">
                Lookbook Archive · Drops & Garments
              </span>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight">
                THE PHYSICAL MANIFESTATION.
              </h2>
            </div>
            <p className="font-body text-sm sm:text-base text-white/60 max-w-sm font-light">
              Click any archival silhouette to view technical tailoring notes and release specifications.
            </p>
          </div>

          {/* Lookbook Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {lookbookItems.map((item) => (
              <motion.div
                key={item.id}
                onClick={() => setSelectedLookbook(item)}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="group relative cursor-pointer rounded-xl overflow-hidden border border-white/15 bg-neutral-950 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover filter grayscale contrast-110 group-hover:scale-105 group-hover:filter-none transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded text-[10px] font-mono uppercase tracking-widest text-white border border-white/20">
                    {item.category}
                  </div>

                  {/* Hover Inspect Icon */}
                  <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>

                {/* Card Meta Content */}
                <div className="p-6 flex flex-col justify-between flex-grow bg-neutral-950 border-t border-white/10">
                  <div>
                    <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white group-hover:text-neutral-200 transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-body text-xs text-white/60 font-light mt-1.5 line-clamp-2">
                      {item.notes}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-white/50">
                    <span>{item.weight}</span>
                    <span className="text-white/80 font-bold">{item.edition}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. LIGHTBOX MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedLookbook && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLookbook(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-xl"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 bg-neutral-950 border border-white/30 rounded-2xl max-w-4xl w-full overflow-hidden shadow-[0_25px_100px_rgba(0,0,0,1)] max-h-[90vh] flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedLookbook(null)}
                aria-label="Close dialog"
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors duration-200 border border-white/20"
              >
                ✕
              </button>

              {/* Modal Image */}
              <div className="md:w-1/2 relative bg-neutral-900 aspect-[3/4] md:aspect-auto">
                <img
                  src={selectedLookbook.image}
                  alt={selectedLookbook.title}
                  className="w-full h-full object-cover filter grayscale contrast-115"
                />
                <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-widest text-white/80 bg-black/60 px-2 py-1 rounded backdrop-blur">
                  MAISON SPEC ID: {selectedLookbook.id}
                </div>
              </div>

              {/* Modal Details */}
              <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-between overflow-y-auto">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-white/50 block mb-2">
                    {selectedLookbook.category}
                  </span>
                  <h3 className="font-display text-3xl font-black uppercase tracking-tight text-white mb-4">
                    {selectedLookbook.title}
                  </h3>
                  <p className="font-body text-sm text-white/80 leading-relaxed font-light mb-6">
                    {selectedLookbook.notes}
                  </p>

                  <div className="space-y-3 py-6 border-y border-white/10 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-white/50 uppercase">Fabric Density</span>
                      <span className="text-white font-bold">{selectedLookbook.weight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50 uppercase">Batch Run</span>
                      <span className="text-white font-bold">{selectedLookbook.edition}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50 uppercase">Construction</span>
                      <span className="text-white font-bold">5-Thread Twin Coverstitch</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50 uppercase">Finishing</span>
                      <span className="text-white font-bold">Enzyme Wash · Pre-Shrunk</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-4">
                  <Link
                    to="/"
                    onClick={() => setSelectedLookbook(null)}
                    className="flex-1 py-3.5 bg-white text-black font-mono text-xs uppercase tracking-widest font-bold text-center hover:bg-neutral-200 transition-colors"
                  >
                    View Drops
                  </Link>
                  <Link
                    to="/inquiries"
                    onClick={() => setSelectedLookbook(null)}
                    className="py-3.5 px-6 border border-white/20 text-white font-mono text-xs uppercase tracking-widest hover:border-white transition-colors"
                  >
                    Inquire
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 8. STATEMENT CALL TO ACTION */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-28 md:py-40 bg-gradient-to-b from-black via-neutral-950 to-[#030204] border-t border-white/10 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/50 block mb-6">
            The Invitation
          </span>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.95] mb-8">
            OWN THE UNIFORM. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-white/40">
              COMMAND THE ROOM.
            </span>
          </h2>
          <p className="font-body text-base sm:text-lg text-white/70 max-w-xl mx-auto font-light leading-relaxed mb-10">
            Join the inner circle for unannounced capsule drops, private atelier previews, and limited release notifications.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-mono text-xs uppercase tracking-[0.2em] font-bold hover:bg-neutral-200 transition-all duration-300"
            >
              Shop Current Drop
              <span>→</span>
            </Link>
            <Link
              to="/inquiries"
              className="inline-flex items-center px-8 py-4 border border-white/20 text-white font-mono text-xs uppercase tracking-[0.2em] hover:border-white transition-colors duration-300"
            >
              Studio Contact
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. FINAL FOOTER */}
      {/* ========================================================================= */}
      <FinalFooter />
    </div>
  );
};

export default About;
