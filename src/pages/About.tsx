import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FinalFooter } from '../components/FinalFooter';
import '../styles/about.css';

// Fabric & Garment Specification Data
interface GarmentFeature {
  id: string;
  part: string;
  title: string;
  subtitle: string;
  description: string;
  specs: { label: string; value: string; percent: number }[];
  image: string;
  coordinates: string;
  refCode: string;
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
      { label: 'Density Weight', value: '420 GSM', percent: 96 },
      { label: 'Origin Mills', value: 'Porto, Portugal', percent: 100 },
      { label: 'Yarn Count', value: '24s Compact Combed', percent: 92 },
      { label: 'Shrinkage Rate', value: '< 1.5% Pre-Shrunk', percent: 98 },
    ],
    image: '/real image/product-1.jpeg',
    coordinates: '41.1579° N, 8.6291° W',
    refCode: 'FAB-420-PRT',
  },
  {
    id: 'collar',
    part: '02 / THE ARCHITECTURE',
    title: '280 GSM Ribbed Bound Collar',
    subtitle: 'Reinforced 1.25" Twin-Needle Coverstitch',
    description:
      'The neckline makes or breaks a luxury tee. Our bound collar is reinforced with custom elastic core threads, ensuring a flush, flat sit against the neck that never sags, wrinkles, or stretches out of shape.',
    specs: [
      { label: 'Collar Height', value: '3.2 cm (1.25")', percent: 90 },
      { label: 'Construction', value: '5-Thread Coverstitch', percent: 95 },
      { label: 'Recovery Rate', value: '98% Shape Memory', percent: 98 },
      { label: 'Comfort Finish', value: 'Tagless Silk Screen', percent: 100 },
    ],
    image: '/real image/product-2.jpeg',
    coordinates: '41.1620° N, 8.6310° W',
    refCode: 'COL-280-STC',
  },
  {
    id: 'cut',
    part: '03 / THE SILHOUETTE',
    title: 'Engineered Drop-Shoulder Box Cut',
    subtitle: 'Calibrated Proportions for Everyday Royalty',
    description:
      'Patterned specifically for commanding presence. A dropped shoulder seam transitions into wide-bicep sleeves that terminate just above the elbow, balanced by an intentional boxy torso with a clean horizontal break.',
    specs: [
      { label: 'Fit Profile', value: 'Structured Boxy', percent: 94 },
      { label: 'Shoulder Drop', value: '5.5 cm Balanced', percent: 88 },
      { label: 'Sleeve Cut', value: 'Over-Elbow Pitch', percent: 92 },
      { label: 'Hem Edge', value: 'Blind-Stitched Edge', percent: 96 },
    ],
    image: '/real image/product-3.jpeg',
    coordinates: '41.1590° N, 8.6250° W',
    refCode: 'SIL-BOX-DRP',
  },
  {
    id: 'dye',
    part: '04 / THE FINISH',
    title: 'Carbon-Enzyme Washed Matte Black',
    subtitle: 'Deep Pigment Absorption & Velvet Tactility',
    description:
      'Achieving the ultimate black requires alchemy. Our garments undergo a proprietary carbon-dye bath followed by an organic enzyme wash, removing micro-fuzz while imparting a tactile softness with deep matte midnight tonality.',
    specs: [
      { label: 'Colorway', value: 'Obsidian Matte', percent: 100 },
      { label: 'Wash Process', value: 'Carbon + Bio-Enzyme', percent: 95 },
      { label: 'Colorfastness', value: 'Grade 5 Luxury', percent: 99 },
      { label: 'Hand Feel', value: 'Velvet Tactility', percent: 96 },
    ],
    image: '/real image/product-4.jpeg',
    coordinates: '41.1610° N, 8.6280° W',
    refCode: 'DYE-MATTE-OBS',
  },
];

// Curated Visual Archive Items (Chapter 04)
interface VaultItem {
  id: string;
  title: string;
  subtitle: string;
  edition: string;
  weight: string;
  image: string;
  tag: string;
  details: string;
}

const visualArchive: VaultItem[] = [
  {
    id: 'va-1',
    title: 'Smile Heal The Soul',
    subtitle: 'Heavyweight Loopback Edition',
    edition: '100 Pieces Worldwide',
    weight: '420 GSM Jersey',
    image: '/real image/product-1.jpeg',
    tag: 'ARCHIVAL NO. 01',
    details: 'Custom back-panel screen with high-density archival discharge pigment on 420 GSM cotton.',
  },
  {
    id: 'va-2',
    title: 'Small Body Big Energy',
    subtitle: 'Architectural Drop-Shoulder',
    edition: 'Core Silhouette',
    weight: '420 GSM Cotton',
    image: '/real image/product-2.jpeg',
    tag: 'ATELIER CUT',
    details: 'Signature drop shoulder with reinforced twin-needle neck ribbing and zero side distortion.',
  },
  {
    id: 'va-3',
    title: 'Chicago Racing Team 98',
    subtitle: 'Motorsport Bio-Enzyme Edition',
    edition: 'Collector Series',
    weight: '450 GSM French Terry',
    image: '/real image/product-3.jpeg',
    tag: 'HERITAGE LINE',
    details: 'Vintage wash treatment with micro-cracked typography and washed charcoal mineral tone.',
  },
  {
    id: 'va-4',
    title: 'Chains Kurapika Noir',
    subtitle: 'Deep Pigment Gothic Wash',
    edition: 'Limited Run 024',
    weight: '420 GSM Pure Heavy',
    image: '/real image/product-4.jpeg',
    tag: 'OBSIDIAN TONAL',
    details: 'Carbon enzyme dyed with tonal matte chest illustration across velvet matte jersey.',
  },
];

// Brand Standards
const brandBenchmarks = [
  {
    label: 'Fabric Weight',
    value: '420',
    unit: 'GSM',
    subtext: 'Bespoke heavyweight density',
  },
  {
    label: 'Milling Provenance',
    value: 'PORTO',
    unit: 'PRT',
    subtext: 'Heritage circular loom mills',
  },
  {
    label: 'Pre-Wash Standard',
    value: '< 1.5%',
    unit: '',
    subtext: 'Zero dimensional distortion',
  },
  {
    label: 'Garment Longevity',
    value: '100+',
    unit: 'WASHES',
    subtext: 'Engineered shape retention',
  },
];

// Navigation Chapters for Floating HUD
const hudChapters = [
  { id: 'hero', num: '01', label: 'Origin' },
  { id: 'philosophy', num: '02', label: 'Manifesto' },
  { id: 'craft', num: '03', label: 'The Anatomy' },
  { id: 'archive', num: '04', label: 'Vault' },
  { id: 'invitation', num: '05', label: 'Statement' },
];

export const About: React.FC = () => {
  // Active feature tab state in Chapter 03
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const activeFeature = garmentFeatures[activeFeatureIndex];

  // Active philosophy quote index in Chapter 02
  const [philosophyTab, setPhilosophyTab] = useState(0);
  const philosophyQuotes = [
    {
      title: 'THE OBSESSION',
      quote:
        '“The exact same obsession required to execute an undefendable route at full sprint is what we poured into every single millimeter of this t-shirt.”',
      author: 'Justin Jefferson',
      role: 'Founder & Creative Director',
    },
    {
      title: 'THE UNIFORM',
      quote:
        '“A black t-shirt is the ultimate weapon of modern luxury. When you strip away loud logos and neon distractions, all that remains is posture, presence, and undeniable confidence.”',
      author: 'Studio JJettas',
      role: 'Atelier Philosophy',
    },
    {
      title: 'THE LONGEVITY',
      quote:
        '“Fast fashion is built to be discarded. We build garments that feel and drape better at wear number 100 than they did on day one. Heavy. Structured. Permanent.”',
      author: 'Garment Engineering',
      role: 'Technical Direction',
    },
  ];

  // Archival Lightbox Inspection Modal State
  const [selectedVaultItem, setSelectedVaultItem] = useState<VaultItem | null>(null);

  // Active section spy for Floating HUD
  const [activeChapter, setActiveChapter] = useState('hero');

  // Section Refs for Scroll Parallax
  const heroRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const craftRef = useRef<HTMLDivElement>(null);
  const archiveRef = useRef<HTMLDivElement>(null);
  const invitationRef = useRef<HTMLDivElement>(null);

  // Top Page Scroll Progress
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Section-specific scroll tracking
  const { scrollYProgress: philProgress } = useScroll({
    target: philosophyRef,
    offset: ['start end', 'end start'],
  });

  const { scrollYProgress: craftProgress } = useScroll({
    target: craftRef,
    offset: ['start end', 'end start'],
  });

  const { scrollYProgress: archiveProgress } = useScroll({
    target: archiveRef,
    offset: ['start end', 'end start'],
  });

  const { scrollYProgress: inviteProgress } = useScroll({
    target: invitationRef,
    offset: ['start end', 'end start'],
  });

  // Parallax Transforms
  const heroMarqueeX = useTransform(scrollYProgress, [0, 0.25], ['0%', '-25%']);
  const heroTextY = useTransform(scrollYProgress, [0, 0.25], [0, 45]);
  const heroImageY = useTransform(scrollYProgress, [0, 0.25], [0, -35]);
  const heroImageScale = useTransform(scrollYProgress, [0, 0.25], [1, 1.05]);

  const philImageY = useTransform(philProgress, [0, 1], [-30, 30]);
  const craftImageY = useTransform(craftProgress, [0, 1], [30, -30]);

  // Dual-speed alternating parallax for Archive grid columns
  const archiveColYOdd = useTransform(archiveProgress, [0, 1], [35, -35]);
  const archiveColYEven = useTransform(archiveProgress, [0, 1], [-25, 25]);

  const inviteScale = useTransform(inviteProgress, [0.2, 0.8], [0.96, 1.02]);

  // ScrollSpy listener for floating HUD
  useEffect(() => {
    const sectionIds = ['hero', 'philosophy', 'craft', 'archive', 'invitation'];
    const handleScroll = () => {
      const scrollCenter = window.scrollY + window.innerHeight * 0.4;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollCenter >= top && scrollCenter < top + height) {
            setActiveChapter(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToChapter = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#000000] text-[#ffffff] selection:bg-[#ffffff] selection:text-[#000000] overflow-x-clip">
      {/* 1. TOP SCROLL PROGRESS BAR */}
      <motion.div className="about-scroll-progress" style={{ scaleX: smoothProgress }} />

      {/* 2. FLOATING MINIMALIST CHAPTER HUD (DESKTOP) */}
      <nav className="about-hud" aria-label="Page Sections Navigation">
        {hudChapters.map((ch) => {
          const isActive = activeChapter === ch.id;
          return (
            <button
              key={ch.id}
              onClick={() => scrollToChapter(ch.id)}
              className={`about-hud-item ${isActive ? 'active' : ''}`}
              title={ch.label}
              aria-label={`Jump to Chapter ${ch.num}: ${ch.label}`}
            >
              <span className="about-hud-dot" />
              <span className="about-hud-label">
                {ch.num} · {ch.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Subtle Background Grain Texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-25"
        style={{
          backgroundImage: "url('/textures/pebble.webp')",
          backgroundSize: '480px 480px',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Ambient Lighting Gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.06)_0%,_transparent_70%)] blur-[120px] z-0"
      />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION (CHAPTER 01 · ORIGIN & CREATIVE DIRECTION) */}
      {/* ========================================================================= */}
      <section
        id="hero"
        ref={heroRef}
        className="relative z-10 pt-32 md:pt-44 pb-20 md:pb-28 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto overflow-hidden"
      >
        {/* Scroll-Driven Horizontal Kinetic Watermark Marquee */}
        <div aria-hidden="true" className="pointer-events-none absolute -top-8 left-0 right-0 opacity-15 overflow-hidden select-none">
          <motion.div style={{ x: heroMarqueeX }} className="flex whitespace-nowrap">
            <span className="about-marquee-text pr-12">
              BLACK-TSHIRTS · MAISON JJETTAS · ARCHITECTURAL STREETWEAR · 420 GSM · HEAVYWEIGHT BESPOKE ·
            </span>
            <span className="about-marquee-text pr-12">
              BLACK-TSHIRTS · MAISON JJETTAS · ARCHITECTURAL STREETWEAR · 420 GSM · HEAVYWEIGHT BESPOKE ·
            </span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          {/* Left Column: Hero Typography with Parallax Drift */}
          <motion.div style={{ y: heroTextY }} className="lg:col-span-7 flex flex-col justify-center">
            {/* Top pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md w-fit mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/80">
                Maison JJettas · Creative Direction
              </span>
            </motion.div>

            {/* Main Headline with Smooth Kinetic Split */}
            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
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
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-body text-base sm:text-lg md:text-xl text-white/70 max-w-xl leading-relaxed font-light mb-10"
            >
              Founded by Justin Jefferson, <strong className="text-white font-medium">Black-Tshirts</strong> is the
              collision of generational discipline and luxury streetwear architecture. We craft the definitive heavyweight
              uniform for the modern individual who commands the room in silence.
            </motion.p>

            {/* Action Badges / CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 sm:gap-6"
            >
              <Link
                to="/"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-black font-mono text-xs uppercase tracking-[0.2em] font-bold rounded-none overflow-hidden transition-all duration-300 hover:bg-neutral-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Explore The Collection
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>

              <button
                onClick={() => scrollToChapter('philosophy')}
                className="inline-flex items-center gap-2 px-6 py-4 border border-white/20 text-white/80 font-mono text-xs uppercase tracking-[0.2em] hover:text-white hover:border-white transition-colors duration-300 bg-transparent cursor-pointer"
              >
                The Philosophy ↓
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column: Editorial Hero Dual-Image Composition with Parallax Lift */}
          <motion.div
            style={{ y: heroImageY, scale: heroImageScale }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-[420px] group">
              {/* Outer Glow Halo */}
              <div className="absolute -inset-4 bg-gradient-to-b from-white/15 to-transparent rounded-2xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none" />

              {/* Main Editorial Image Frame */}
              <div className="relative rounded-xl overflow-hidden border border-white/20 bg-neutral-900 shadow-[0_30px_100px_rgba(0,0,0,0.8)] aspect-[4/5] about-shimmer-border">
                <img
                  src="https://cdn.sanity.io/images/zil8k06j/production/d3e033e240d85dddfbced35e0dab1491bad7be84-1200x1500.webp"
                  alt="Justin Jefferson Noir Editorial"
                  className="w-full h-full object-cover object-center filter grayscale contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Corner Crosshairs */}
                <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t-2 border-l-2 border-white/80 pointer-events-none" />
                <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t-2 border-r-2 border-white/80 pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b-2 border-l-2 border-white/80 pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b-2 border-r-2 border-white/80 pointer-events-none" />

                {/* Subtle Image Bottom Vignette */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />

                {/* Floating Badge on Image */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs font-mono tracking-widest text-white/90">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/50 uppercase">Creative Director</span>
                    <span className="font-bold text-sm tracking-normal font-display">JUSTIN JEFFERSON</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-white/50 uppercase">Atelier Line</span>
                    <span className="font-bold text-sm block">ORIGIN 001</span>
                  </div>
                </div>
              </div>

              {/* Secondary Floating Image Inset with Soft Hover Lift */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-8 -left-8 w-36 sm:w-44 aspect-[3/4] rounded-lg overflow-hidden border border-white/30 shadow-2xl hidden sm:block bg-black group-hover:scale-105 transition-transform duration-500"
              >
                <img
                  src="https://cdn.sanity.io/images/zil8k06j/production/6fa7c7fd07fdbf07119a115343881c3a9913963f-1067x1600.webp"
                  alt="Justin Jefferson Atelier Detail"
                  className="w-full h-full object-cover filter grayscale contrast-125"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur px-2 py-1 rounded text-[9px] font-mono uppercase text-white/80 text-center border border-white/10">
                  STUDIO ARCHIVE
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Standards Metrics Bar with Staggered Viewport Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center md:text-left"
        >
          {brandBenchmarks.map((b, i) => (
            <div
              key={b.label}
              className={`${i === 0 ? 'border-l-0 pl-0' : 'border-l-0 md:border-l border-white/10 pl-0 md:pl-6'}`}
            >
              <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest block mb-1">
                {b.label}
              </span>
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                {b.value}
                {b.unit && <span className="text-lg text-white/50 font-mono ml-1">{b.unit}</span>}
              </div>
              <span className="text-xs text-white/60 font-body mt-0.5 block">{b.subtext}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 2. PHILOSOPHY & MANIFESTO (CHAPTER 02 · OVERLAPPING LAYER 1) */}
      {/* ========================================================================= */}
      <section
        id="philosophy"
        ref={philosophyRef}
        className="about-layer about-layer-1 px-6 md:px-12 lg:px-20 text-white"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header with Staggered Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center mb-16 md:mb-20"
          >
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/50 mb-4 block">
              Chapter 02 · Maison Vision
            </span>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight max-w-4xl leading-[1.05]">
              “WE DO NOT MAKE MERCHANDISE. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-500">
                WE FORGE MODERN ARMOR.”
              </span>
            </h2>
            <div className="w-16 h-[2px] bg-white mt-8 mb-6" />
          </motion.div>

          {/* Interactive Philosophy Cards Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: 3 Interactive Philosophy Pillar Cards */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              {philosophyQuotes.map((item, idx) => {
                const isSelected = philosophyTab === idx;
                return (
                  <motion.div
                    key={idx}
                    onClick={() => setPhilosophyTab(idx)}
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.3 }}
                    className={`relative p-6 sm:p-8 rounded-xl cursor-pointer transition-all duration-500 border ${
                      isSelected
                        ? 'border-white bg-white/[0.08] shadow-[0_15px_50px_rgba(255,255,255,0.08)] about-shimmer-border'
                        : 'border-white/10 bg-neutral-950/60 hover:border-white/30 hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs uppercase tracking-widest text-white/50">
                        {`PILLAR 0${idx + 1}`}
                      </span>
                      <span
                        className={`font-mono text-xs uppercase tracking-widest px-2.5 py-1 rounded border transition-colors ${
                          isSelected ? 'border-white text-white bg-white/10' : 'border-white/10 text-white/40'
                        }`}
                      >
                        {item.title}
                      </span>
                    </div>

                    <p className="font-body text-base sm:text-lg text-white/90 leading-relaxed font-light mb-6 italic">
                      {item.quote}
                    </p>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <span className="font-display text-sm uppercase font-bold text-white block">
                          {item.author}
                        </span>
                        <span className="font-mono text-[10px] text-white/50 tracking-wider">
                          {item.role}
                        </span>
                      </div>
                      <span className="text-white/60 font-mono text-xs flex items-center gap-1.5">
                        {isSelected ? (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            ACTIVE
                          </>
                        ) : (
                          '○ SELECT'
                        )}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right: Large Editorial Visual Showcase with Scroll Parallax */}
            <motion.div
              style={{ y: philImageY }}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.85 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/20 aspect-[4/5] shadow-2xl bg-neutral-900 group">
                <img
                  src="https://cdn.sanity.io/images/zil8k06j/production/6fa7c7fd07fdbf07119a115343881c3a9913963f-1067x1600.webp"
                  alt="Justin Jefferson Philosophy Editorial"
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-6 rounded-xl bg-black/80 backdrop-blur-md border border-white/20">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/60 block mb-1">
                    ATELIER MANIFESTO
                  </span>
                  <p className="font-display text-lg uppercase font-bold text-white">
                    “STRUCTURE OVER DISTRACTION.”
                  </p>
                  <span className="text-xs text-white/60 font-body block mt-1">
                    Justin Jefferson · Founder
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE CRAFTSMANSHIP LAB (CHAPTER 03 · OVERLAPPING LAYER 2) */}
      {/* ========================================================================= */}
      <section
        id="craft"
        ref={craftRef}
        className="about-layer about-layer-2 px-6 md:px-12 lg:px-20 text-white"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.85 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/50 block mb-3">
                Chapter 03 · Bespoke Engineering
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight">
                THE ANATOMY OF A <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/30">
                  BLACK T-SHIRT.
                </span>
              </h2>
            </div>
            <p className="font-body text-sm sm:text-base text-white/60 max-w-md font-light leading-relaxed">
              Every curve, seam, and grain of thread is calculated with relentless precision. Select an
              element to inspect our bespoke engineering.
            </p>
          </motion.div>

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
                    className={`text-left p-5 md:p-6 rounded-lg transition-all duration-300 border flex flex-col gap-1.5 relative overflow-hidden cursor-pointer ${
                      isActive
                        ? 'border-white bg-white/[0.08] text-white shadow-xl'
                        : 'border-white/10 bg-black/40 text-white/60 hover:text-white hover:border-white/30'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeFeatureBar"
                        className="absolute left-0 top-0 bottom-0 w-1.5 bg-white shadow-[0_0_12px_#ffffff]"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
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

            {/* Right Interactive Detail Viewer with Animated Viewfinder & Specs */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature.id}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-black/90 border border-white/20 rounded-xl p-6 md:p-10 relative overflow-hidden shadow-2xl about-shimmer-border"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    {/* Visual Preview with High-Tech Laser Scanline */}
                    <motion.div
                      style={{ y: craftImageY }}
                      className="md:col-span-5 relative aspect-square rounded-lg overflow-hidden border border-white/15 bg-neutral-900 group"
                    >
                      <img
                        src={activeFeature.image}
                        alt={activeFeature.title}
                        className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-110 transition-transform duration-700 ease-out"
                      />

                      {/* Animated Inspection Scanline */}
                      <div className="about-scanline" />

                      {/* Viewfinder Overlay Coordinates */}
                      <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-widest text-white border border-white/20">
                        INSPECTION 0{activeFeatureIndex + 1}
                      </div>

                      <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-mono text-white/70 border border-white/15">
                        {activeFeature.refCode}
                      </div>
                    </motion.div>

                    {/* Explanatory Specs & Quality Bar Meters */}
                    <div className="md:col-span-7 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-xs uppercase tracking-widest text-white/50">
                            {activeFeature.part}
                          </span>
                          <span className="font-mono text-[10px] text-white/40">
                            {activeFeature.coordinates}
                          </span>
                        </div>
                        <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white mb-2">
                          {activeFeature.title}
                        </h3>
                        <p className="font-body text-sm text-white/70 leading-relaxed font-light mb-6">
                          {activeFeature.description}
                        </p>
                      </div>

                      {/* Technical Specs Table with Animated Gauge Bars */}
                      <div className="grid grid-cols-2 gap-3 pt-6 border-t border-white/15">
                        {activeFeature.specs.map((spec, sIdx) => (
                          <div key={sIdx} className="bg-white/[0.03] p-3 rounded border border-white/10">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-white/40 block">
                              {spec.label}
                            </span>
                            <span className="font-mono text-xs font-bold text-white mt-0.5 block">
                              {spec.value}
                            </span>
                            {/* Animated Metric Fill Bar */}
                            <div className="spec-meter-bar">
                              <motion.div
                                className="spec-meter-fill"
                                initial={{ width: 0 }}
                                animate={{ width: `${spec.percent}%` }}
                                transition={{ duration: 0.8, delay: sIdx * 0.1 }}
                              />
                            </div>
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
      {/* 4. VISUAL ATELIER ARCHIVE (CHAPTER 04 · OVERLAPPING LAYER 3) */}
      {/* ========================================================================= */}
      <section
        id="archive"
        ref={archiveRef}
        className="about-layer about-layer-3 px-6 md:px-12 lg:px-20 text-white"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.85 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/50 block mb-3">
                Chapter 04 · Physical Manifestation
              </span>
              <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight">
                THE ATELIER VAULT.
              </h2>
            </div>
            <p className="font-body text-sm sm:text-base text-white/60 max-w-md font-light leading-relaxed">
              Every release is cut, stitched, and dyed in strictly calibrated small-batch drops. Explore the tactile
              silhouettes defining our uniform.
            </p>
          </motion.div>

          {/* 4-Card Editorial Visual Grid with Alternating Parallax Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visualArchive.map((item, index) => {
              const isOdd = index % 2 === 1;
              return (
                <motion.div
                  key={item.id}
                  style={{ y: isOdd ? archiveColYOdd : archiveColYEven }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.7, delay: index * 0.12 }}
                  whileHover={{ y: -10 }}
                  onClick={() => setSelectedVaultItem(item)}
                  className="group relative rounded-xl overflow-hidden border border-white/15 bg-neutral-950 flex flex-col cursor-pointer transition-all duration-500 shadow-xl hover:border-white/40 hover:shadow-[0_20px_50px_rgba(255,255,255,0.06)]"
                >
                  {/* Image Frame */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover filter grayscale contrast-110 group-hover:scale-108 group-hover:filter-none transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-transparent transition-colors duration-300" />

                    {/* Top Archival Tag */}
                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded text-[9px] font-mono uppercase tracking-widest text-white border border-white/20">
                      {item.tag}
                    </div>

                    {/* Quick Inspect Hover Overlay Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                      <span className="px-4 py-2 bg-white text-black font-mono text-[10px] uppercase tracking-widest font-bold shadow-lg">
                        Inspect Piece ↗
                      </span>
                    </div>
                  </div>

                  {/* Bottom Meta */}
                  <div className="p-5 flex flex-col justify-between flex-grow bg-neutral-950 border-t border-white/10">
                    <div>
                      <h3 className="font-display text-lg font-bold uppercase tracking-tight text-white group-hover:text-neutral-200 transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-body text-xs text-white/60 font-light mt-1">
                        {item.subtitle}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-white/50">
                      <span>{item.weight}</span>
                      <span className="text-white/80 font-bold">{item.edition}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. INVITATION & CALL TO ACTION (CHAPTER 05 · OVERLAPPING LAYER 4) */}
      {/* ========================================================================= */}
      <section
        id="invitation"
        ref={invitationRef}
        className="about-layer about-layer-4 text-center px-6 relative overflow-hidden"
      >
        {/* Subtle Ambient Radial Backlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(circle,_rgba(255,255,255,0.08)_0%,_transparent_70%)] blur-[90px]"
        />

        <motion.div style={{ scale: inviteScale }} className="max-w-4xl mx-auto relative z-10">
          {/* Animated Circular Atelier Crest */}
          <div className="flex justify-center mb-6">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full about-rotating-seal text-white/40 fill-current"
              >
                <path
                  id="circlePath"
                  d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                  fill="none"
                />
                <text className="font-mono text-[9px] uppercase tracking-[0.25em] fill-white/60">
                  <textPath href="#circlePath" startOffset="0%">
                    MAISON JJETTAS · ARCHITECTURAL LUXURY · EST 2024 ·
                  </textPath>
                </text>
              </svg>
              <span className="absolute font-display font-black text-sm text-white">JJ</span>
            </div>
          </div>

          <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/50 block mb-6">
            Chapter 05 · The Invitation
          </span>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.95] mb-8">
            OWN THE UNIFORM. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-white/40">
              COMMAND THE ROOM.
            </span>
          </h2>
          <p className="font-body text-base sm:text-lg text-white/70 max-w-xl mx-auto font-light leading-relaxed mb-10">
            Engineered in limited batch editions. Each garment is crafted with architectural permanence and delivered worldwide.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-mono text-xs uppercase tracking-[0.25em] font-bold hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)]"
            >
              <span>Shop Current Drop</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </Link>

            <Link
              to="/gallery"
              className="inline-flex items-center gap-3 px-8 py-5 border border-white/30 text-white font-mono text-xs uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-black transition-all duration-300"
            >
              <span>Explore Gallery Page</span>
              <span>↗</span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 6. EDITORIAL LIGHTBOX MODAL (FOR ARCHIVAL ITEM INSPECTION) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedVaultItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVaultItem(null)}
            className="about-lightbox-backdrop"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="about-lightbox-card"
            >
              {/* Left Column: Contained Full T-Shirt Display */}
              <div className="about-modal-img-col">
                <img
                  src={selectedVaultItem.image}
                  alt={selectedVaultItem.title}
                  className="about-modal-img"
                />
                <div className="absolute top-4 left-4 bg-black/85 backdrop-blur-md px-3 py-1 rounded text-[10px] font-mono uppercase tracking-widest text-white border border-white/20">
                  {selectedVaultItem.tag}
                </div>
              </div>

              {/* Right Column: Garment Specs & Action */}
              <div className="about-modal-info-col">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs uppercase tracking-widest text-white/50">
                      ATELIER SPECIFICATION
                    </span>
                    <button
                      onClick={() => setSelectedVaultItem(null)}
                      className="w-8 h-8 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-colors p-1"
                      aria-label="Close Inspection Modal"
                    >
                      ✕
                    </button>
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-2">
                    {selectedVaultItem.title}
                  </h3>
                  <p className="font-mono text-xs text-white/60 mb-6">
                    {selectedVaultItem.subtitle}
                  </p>

                  <p className="font-body text-sm text-white/70 leading-relaxed font-light mb-8">
                    {selectedVaultItem.details}
                  </p>

                  <div className="space-y-3 pt-6 border-t border-white/10 font-mono text-xs">
                    <div className="flex justify-between text-white/60">
                      <span>Fabric Composition</span>
                      <span className="text-white font-bold">{selectedVaultItem.weight}</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>Availability</span>
                      <span className="text-white font-bold">{selectedVaultItem.edition}</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>Stitching Standard</span>
                      <span className="text-white font-bold">5-Thread Overlock</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                  <Link
                    to="/"
                    onClick={() => setSelectedVaultItem(null)}
                    className="flex-1 py-4 bg-white text-black font-mono text-xs uppercase tracking-[0.2em] font-bold text-center hover:bg-neutral-200 transition-colors"
                  >
                    View in Shop →
                  </Link>
                  <button
                    onClick={() => setSelectedVaultItem(null)}
                    className="px-6 py-4 border border-white/20 text-white font-mono text-xs uppercase tracking-widest hover:border-white transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 7. FINAL FOOTER */}
      {/* ========================================================================= */}
      <div className="relative z-50">
        <FinalFooter />
      </div>
    </div>
  );
};

export default About;
