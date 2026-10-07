import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FinalFooter } from '../components/FinalFooter';
import { GalleryIntro } from '../components/GalleryIntro';
import '../styles/gallery.css';

// Full 27 Curated Atelier Gallery Pieces
interface GalleryPiece {
  id: string;
  lot: string;
  title: string;
  category: 'ALL' | 'HEAVYWEIGHT' | 'GRAPHIC' | 'VINTAGE' | 'STRUCTURE';
  weight: string;
  wash: string;
  image: string;
  edition: string;
  description: string;
  badge: string;
  specs: { label: string; value: string }[];
}

const allGalleryPieces: GalleryPiece[] = [
  {
    id: 'g-1',
    lot: 'LOT 001',
    title: 'Smile Heal The Soul',
    category: 'HEAVYWEIGHT',
    weight: '420 GSM Loopback',
    wash: 'Carbon Matte Black',
    image: '/real image/product-1.jpeg',
    edition: '100 Pieces Worldwide',
    description: 'Archival discharge print on ultra-dense 420 GSM Egyptian cotton. Engineered for permanent posture.',
    badge: 'FLAGSHIP DROP',
    specs: [
      { label: 'Weight', value: '420 GSM' },
      { label: 'Yarn Count', value: '24s Compact Combed' },
      { label: 'Colorway', value: 'Carbon Obsidian' },
      { label: 'Print Type', value: 'High-Density Discharge' },
    ],
  },
  {
    id: 'g-2',
    lot: 'LOT 002',
    title: 'Small Body Big Energy',
    category: 'STRUCTURE',
    weight: '420 GSM Cotton',
    wash: 'Obsidian Enzyme',
    image: '/real image/product-2.jpeg',
    edition: 'Core Silhouette',
    description: 'Drop-shoulder architectural drape with reinforced twin-needle 280 GSM elastic bound collar.',
    badge: 'CORE ATELIER',
    specs: [
      { label: 'Weight', value: '420 GSM' },
      { label: 'Collar Rib', value: '280 GSM Reinforced' },
      { label: 'Colorway', value: 'Matte Midnight' },
      { label: 'Fit Profile', value: 'Calibrated Boxy' },
    ],
  },
  {
    id: 'g-3',
    lot: 'LOT 003',
    title: 'Chicago Racing Team 98',
    category: 'VINTAGE',
    weight: '450 GSM French Terry',
    wash: 'Bio-Enzyme Mineral',
    image: '/real image/product-3.jpeg',
    edition: 'Collector Series 098',
    description: 'Motorsport heritage graphic with subtle tonal distress wash and vintage velvet hand-feel.',
    badge: 'RUNWAY SHOWPIECE',
    specs: [
      { label: 'Weight', value: '450 GSM' },
      { label: 'Wash Process', value: 'Bio-Enzyme Pumice' },
      { label: 'Colorway', value: 'Charcoal Mineral' },
      { label: 'Recovery', value: '98% Shape Memory' },
    ],
  },
  {
    id: 'g-4',
    lot: 'LOT 004',
    title: 'Chains Kurapika Noir',
    category: 'GRAPHIC',
    weight: '420 GSM Pure Heavy',
    wash: 'Deep Pigment Gothic',
    image: '/real image/product-4.jpeg',
    edition: 'Limited Run 024',
    description: 'Gothic-inspired chest illustration in tonal dark charcoal over velvet matte obsidian jersey.',
    badge: 'TONAL NOIR',
    specs: [
      { label: 'Weight', value: '420 GSM' },
      { label: 'Ink Type', value: 'Water-Based Discharge' },
      { label: 'Colorway', value: 'Obsidian Matte' },
      { label: 'Origin', value: 'Porto, Portugal' },
    ],
  },
  {
    id: 'g-5',
    lot: 'LOT 005',
    title: 'Feeling Acid Wash Atelier',
    category: 'VINTAGE',
    weight: '400 GSM Combed Cotton',
    wash: 'Custom Acid Fog',
    image: '/real image/product-5.jpeg',
    edition: 'Atelier Vault 05',
    description: 'Hand-distressed acid wash giving each piece a unique marbleized charcoal grain.',
    badge: 'HAND TREATED',
    specs: [
      { label: 'Weight', value: '400 GSM' },
      { label: 'Treatment', value: 'Manual Acid Wash' },
      { label: 'Texture', value: 'Silken Hand-Feel' },
      { label: 'Shrinkage', value: '< 1.5% Pre-Shrunk' },
    ],
  },
  {
    id: 'g-6',
    lot: 'LOT 006',
    title: 'Cross Bones Graphic Noir',
    category: 'GRAPHIC',
    weight: '420 GSM Jersey',
    wash: 'Carbon Dye',
    image: '/real image/product-6.jpeg',
    edition: 'Limited Edition 50',
    description: 'High-contrast bone typography screen-printed with archival discharge ink for zero stiffness.',
    badge: 'LIMITED 50',
    specs: [
      { label: 'Weight', value: '420 GSM' },
      { label: 'Print Standard', value: 'Zero Hand-Feel' },
      { label: 'Colorway', value: 'Midnight Obsidian' },
      { label: 'Stitch', value: '5-Thread Overlock' },
    ],
  },
  {
    id: 'g-7',
    lot: 'LOT 007',
    title: 'Dark Soul Streetwear Architecture',
    category: 'STRUCTURE',
    weight: '420 GSM Heavyweight',
    wash: 'Black Matte',
    image: '/real image/product-7.jpeg',
    edition: 'Core Runway',
    description: 'Clean silhouette designed for everyday royalty, featuring zero side-twist seam technology.',
    badge: 'ZERO DISTORTION',
    specs: [
      { label: 'Weight', value: '420 GSM' },
      { label: 'Side Seams', value: 'Seamless Circular Loom' },
      { label: 'Shoulder Drop', value: '5.5 cm Balanced' },
      { label: 'Colorfastness', value: 'Grade 5 Luxury' },
    ],
  },
  {
    id: 'g-8',
    lot: 'LOT 008',
    title: 'Obsidian Skull Heavy Edition',
    category: 'GRAPHIC',
    weight: '440 GSM Luxury',
    wash: 'Bio-Washed Charcoal',
    image: '/real image/product-8.jpeg',
    edition: 'Run 088',
    description: 'Hand-rendered skull artwork across the back shoulders with subtle tonal front embroidery.',
    badge: 'EMBROIDERED DETAIL',
    specs: [
      { label: 'Weight', value: '440 GSM' },
      { label: 'Embroidery', value: 'Tonal Rayon Thread' },
      { label: 'Colorway', value: 'Bio Charcoal' },
      { label: 'Longevity', value: '100+ Washes Tested' },
    ],
  },
  {
    id: 'g-9',
    lot: 'LOT 009',
    title: 'Maison Box Cut Signature',
    category: 'HEAVYWEIGHT',
    weight: '420 GSM Pure Heavy',
    wash: 'Pitch Midnight',
    image: '/real image/product-9.jpeg',
    edition: 'Permanent Atelier',
    description: 'The foundation of the Maison. Zero branding on front, letting the sculptural drape command presence.',
    badge: 'ICONIC SILHOUETTE',
    specs: [
      { label: 'Weight', value: '420 GSM' },
      { label: 'Silhouette', value: 'Sculptural Box Cut' },
      { label: 'Collar Fit', value: 'Flush Sitting 1.25"' },
      { label: 'Hand Feel', value: 'Velvet Tactility' },
    ],
  },
  {
    id: 'g-10',
    lot: 'LOT 010',
    title: 'Ghost In The Machine Edition',
    category: 'GRAPHIC',
    weight: '420 GSM Cotton',
    wash: 'Carbon Wash',
    image: '/real image/product-10.jpeg',
    edition: '75 Pieces Worldwide',
    description: 'Minimalist cyber-gothic technical line art screen printed with zero hand feel.',
    badge: 'TECHNICAL LINE',
    specs: [
      { label: 'Weight', value: '420 GSM' },
      { label: 'Resolution', value: '120 DPI Silkscreen' },
      { label: 'Origin', value: 'Porto, Portugal' },
      { label: 'Edition Count', value: 'Strictly 75' },
    ],
  },
  {
    id: 'g-11',
    lot: 'LOT 011',
    title: 'Heritage Monogram Vintage',
    category: 'VINTAGE',
    weight: '450 GSM French Terry',
    wash: 'Mineral Enzyme',
    image: '/real image/product-11.jpeg',
    edition: 'Archive Drop',
    description: 'Softened with volcanic pumice wash to create instant generational softness and natural character.',
    badge: 'PUMICE WASHED',
    specs: [
      { label: 'Weight', value: '450 GSM' },
      { label: 'Fabric Mill', value: 'Portuguese Looms' },
      { label: 'Wash', value: 'Volcanic Pumice' },
      { label: 'Cut', value: 'Over-Elbow Pitch' },
    ],
  },
  {
    id: 'g-12',
    lot: 'LOT 012',
    title: 'Titanium Edge Oversized',
    category: 'STRUCTURE',
    weight: '420 GSM Jersey',
    wash: 'Obsidian Matte',
    image: '/real image/product-12.jpeg',
    edition: 'Runway Edition',
    description: 'Elongated sleeves terminating just above the elbow with tailored clean cuff hems.',
    badge: 'OVER-ELBOW FIT',
    specs: [
      { label: 'Weight', value: '420 GSM' },
      { label: 'Sleeve Length', value: 'Extended Pitch' },
      { label: 'Hem Edge', value: 'Blind-Stitched' },
      { label: 'Neck Fit', value: 'Anti-Sag Elastic Core' },
    ],
  },
  {
    id: 'g-13',
    lot: 'LOT 013',
    title: 'Velvet Midnight Heavy Jersey',
    category: 'HEAVYWEIGHT',
    weight: '420 GSM Cotton',
    wash: 'Triple Bio-Wash',
    image: '/real image/product-13.jpeg',
    edition: 'Small Batch 60',
    description: 'Proprietary enzyme formulation delivering an ultra-smooth velvety touch on heavyweight cotton.',
    badge: 'VELVET HAND',
    specs: [
      { label: 'Weight', value: '420 GSM' },
      { label: 'Touch', value: 'Silken Hand-Feel' },
      { label: 'Colorway', value: 'Midnight Deep' },
      { label: 'Yarn', value: 'Compact Combed' },
    ],
  },
  {
    id: 'g-14',
    lot: 'LOT 014',
    title: 'Gothic Cross Atelier Piece',
    category: 'GRAPHIC',
    weight: '420 GSM Loopback',
    wash: 'Obsidian Matte',
    image: '/real image/product-14.jpeg',
    edition: '120 Pieces Worldwide',
    description: 'Intricate architectural cross motif rendered in discharge grey across the spine.',
    badge: 'SPINE MOTIF',
    specs: [
      { label: 'Weight', value: '420 GSM' },
      { label: 'Print Location', value: 'Posterior Spine' },
      { label: 'Dye', value: 'Carbon Immersion' },
      { label: 'Standard', value: 'Pre-Shrunk' },
    ],
  },
  {
    id: 'g-15',
    lot: 'LOT 015',
    title: 'Tokyo Underground 99',
    category: 'VINTAGE',
    weight: '440 GSM Luxury',
    wash: 'Acid Marble',
    image: '/real image/product-15.jpeg',
    edition: 'Atelier Archive',
    description: 'Inspired by 90s Shibuya streetwear with hand-treated acid marbling and box cut proportions.',
    badge: 'DISTRESSED',
    specs: [
      { label: 'Weight', value: '440 GSM' },
      { label: 'Wash Style', value: 'Acid Marble Tonal' },
      { label: 'Fit Profile', value: 'Drop Shoulder Boxy' },
      { label: 'Production', value: 'Hand Processed' },
    ],
  },
  {
    id: 'g-16',
    lot: 'LOT 016',
    title: 'Obsidian Panther Tonal',
    category: 'GRAPHIC',
    weight: '420 GSM Pure Heavy',
    wash: 'Pitch Black',
    image: '/real image/product-16.jpeg',
    edition: 'Collector Drop',
    description: 'Tonal black-on-black gloss print with reflective obsidian ink visible only in direct light.',
    badge: 'REFLECTIVE INK',
    specs: [
      { label: 'Weight', value: '420 GSM' },
      { label: 'Special Effect', value: 'Tonal Gloss Sheen' },
      { label: 'Colorway', value: 'Obsidian Tone-on-Tone' },
      { label: 'Collar', value: 'Twin-Needle Rib' },
    ],
  },
  {
    id: 'g-17',
    lot: 'LOT 017',
    title: 'Studio Monolith 420 Cut',
    category: 'STRUCTURE',
    weight: '420 GSM Cotton',
    wash: 'Matte Charcoal',
    image: '/real image/product-17.jpeg',
    edition: 'Permanent Vault',
    description: 'Engineered for clean horizontal fall across the waist without clinging or folding.',
    badge: 'STRUCTURE CUT',
    specs: [
      { label: 'Weight', value: '420 GSM' },
      { label: 'Hem Pitch', value: 'Level Horizontal' },
      { label: 'Sleeve Cut', value: 'Wide-Bicep Termination' },
      { label: 'Origin', value: 'Porto, Portugal' },
    ],
  },
  {
    id: 'g-18',
    lot: 'LOT 018',
    title: 'Raw Hem Cut Noir Edition',
    category: 'VINTAGE',
    weight: '420 GSM French Terry',
    wash: 'Bio-Enzyme Washed',
    image: '/real image/product-18.jpeg',
    edition: 'Limited Run 80',
    description: 'Intentionally reinforced edge with raw-cut aesthetic lookbook treatment.',
    badge: 'RAW EDGE',
    specs: [
      { label: 'Weight', value: '420 GSM' },
      { label: 'Hem Detail', value: 'Reinforced Raw Pitch' },
      { label: 'Colorway', value: 'Washed Obsidian' },
      { label: 'Shrinkage', value: '< 1.5%' },
    ],
  },
  {
    id: 'g-19',
    lot: 'LOT 019',
    title: 'Twin Needle Bound Collar Black',
    category: 'STRUCTURE',
    weight: '420 GSM Jersey',
    wash: 'Carbon Matte',
    image: '/real image/product-19.jpeg',
    edition: 'Core Silhouette',
    description: 'The archetype of structural garment construction. Zero sag guarantee through 100+ wash cycles.',
    badge: 'ARCHETYPE',
    specs: [
      { label: 'Weight', value: '420 GSM' },
      { label: 'Collar', value: '1.25" Twin-Needle Bound' },
      { label: 'Core Yarn', value: 'Elastic Memory Thread' },
      { label: 'Wash Fastness', value: 'Grade 5 Luxury' },
    ],
  },
  {
    id: 'g-20',
    lot: 'LOT 020',
    title: 'Porto Looms Heavyweight Edition',
    category: 'HEAVYWEIGHT',
    weight: '440 GSM Luxury Jersey',
    wash: 'Obsidian Matte',
    image: '/real image/product-20.jpeg',
    edition: 'Batch 020',
    description: 'Milled on circular looms in Northern Portugal using long-staple combed cotton.',
    badge: 'CIRCULAR LOOM',
    specs: [
      { label: 'Weight', value: '440 GSM' },
      { label: 'Mill Region', value: 'Porto, Portugal' },
      { label: 'Density', value: 'Ultra Heavy Compact' },
      { label: 'Longevity', value: 'Multi-Year Durability' },
    ],
  },
  {
    id: 'g-21',
    lot: 'LOT 021',
    title: 'Bespoke Vintage Fade Archive',
    category: 'VINTAGE',
    weight: '420 GSM Cotton',
    wash: 'Sun-Bleached Charcoal',
    image: '/real image/product-21.jpeg',
    edition: 'Special Wash Run',
    description: 'Artisanal washing process simulating decades of gentle wear while preserving high fabric density.',
    badge: 'ARTISANAL WASH',
    specs: [
      { label: 'Weight', value: '420 GSM' },
      { label: 'Hue', value: 'Sun-Bleached Midnight' },
      { label: 'Hand Feel', value: 'Super Soft Velvet' },
      { label: 'Construction', value: '5-Thread Overlock' },
    ],
  },
  {
    id: 'g-22',
    lot: 'LOT 022',
    title: 'Minimalist Box Edition Core',
    category: 'STRUCTURE',
    weight: '420 GSM Jersey',
    wash: 'Pitch Black Matte',
    image: '/real image/product-22.jpeg',
    edition: 'Permanent Series',
    description: 'Clean silhouette designed for everyday royalty, command the room without screaming for attention.',
    badge: 'ESSENTIAL ARMOR',
    specs: [
      { label: 'Weight', value: '420 GSM' },
      { label: 'Silhouette', value: 'Engineered Drop-Shoulder' },
      { label: 'Collar', value: 'Tagless Silk Screen' },
      { label: 'Colorway', value: 'Obsidian Matte' },
    ],
  },
  {
    id: 'g-23',
    lot: 'LOT 023',
    title: 'Black Diamond Screen Graphic',
    category: 'GRAPHIC',
    weight: '420 GSM Heavyweight',
    wash: 'Carbon Wash',
    image: '/real image/product-23.jpeg',
    edition: 'Limited 100',
    description: 'Geometric diamond emblem screen-printed in tonal metallic charcoal on obsidian jersey.',
    badge: 'METALLIC CHARCOAL',
    specs: [
      { label: 'Weight', value: '420 GSM' },
      { label: 'Print Chemistry', value: 'Discharge Metallic' },
      { label: 'Origin', value: 'Porto, Portugal' },
      { label: 'Edition', value: '100 Worldwide' },
    ],
  },
  {
    id: 'g-24',
    lot: 'LOT 024',
    title: 'Infinite Dark Jersey Atelier',
    category: 'HEAVYWEIGHT',
    weight: '450 GSM Loopback',
    wash: 'Deep Pitch Noir',
    image: '/real image/product-24.jpeg',
    edition: 'Run 024',
    description: 'Our heaviest jersey formulation. Incredible structural presence and windproof density.',
    badge: 'MAXIMUM DENSITY',
    specs: [
      { label: 'Weight', value: '450 GSM' },
      { label: 'Fabric Type', value: 'Heavy Loopback' },
      { label: 'Drape Quality', value: 'Sculptural Rigid' },
      { label: 'Recovery', value: '99% Shape Retention' },
    ],
  },
  {
    id: 'g-25',
    lot: 'LOT 025',
    title: 'Archival Signature Monolith',
    category: 'STRUCTURE',
    weight: '420 GSM Cotton',
    wash: 'Obsidian Matte',
    image: '/real image/product-25.jpeg',
    edition: 'Maison Core',
    description: 'Tailored with subtle forward-pitch shoulder seams that enhance athletic posture and frame.',
    badge: 'POSTURE FIT',
    specs: [
      { label: 'Weight', value: '420 GSM' },
      { label: 'Shoulder Seam', value: 'Forward-Pitch Tailored' },
      { label: 'Colorway', value: 'Matte Obsidian' },
      { label: 'Collar', value: 'Elastic Core Thread' },
    ],
  },
  {
    id: 'g-26',
    lot: 'LOT 026',
    title: 'Genesis Obsidian 26 Edition',
    category: 'GRAPHIC',
    weight: '420 GSM Jersey',
    wash: 'Enzyme Mineral',
    image: '/real image/product-26.jpeg',
    edition: 'Special Exhibition',
    description: 'Runway tribute edition featuring serialized archival typography on the lower side seam.',
    badge: 'SERIALIZED NO. 26',
    specs: [
      { label: 'Weight', value: '420 GSM' },
      { label: 'Tagging', value: 'Numbered Atelier Label' },
      { label: 'Wash Process', value: 'Carbon + Bio-Enzyme' },
      { label: 'Origin', value: 'Porto, Portugal' },
    ],
  },
  {
    id: 'g-27',
    lot: 'LOT 027',
    title: 'Maison Finale Runway Vault',
    category: 'HEAVYWEIGHT',
    weight: '450 GSM Bespoke French Terry',
    wash: 'Obsidian Velvet',
    image: '/real image/product-27.jpeg',
    edition: 'Collector Finale',
    description: 'The pinnacle of the Maison catalog. Crafted in strictly numbered runs with commemorative atelier seal.',
    badge: 'RUNWAY FINALE',
    specs: [
      { label: 'Weight', value: '450 GSM' },
      { label: 'Edition Count', value: '1 of 50 Numbered' },
      { label: 'Collar Standard', value: 'Twin-Needle 280 GSM' },
      { label: 'Seal', value: 'Gold Foil Certified' },
    ],
  },
];

export const Gallery: React.FC = () => {
  // Particle assembly intro overlay state
  const [showIntro, setShowIntro] = useState<boolean>(true);

  // View mode switcher: 'masonry' | 'runway' | 'vault'
  const [viewMode, setViewMode] = useState<'masonry' | 'runway' | 'vault'>('masonry');

  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'HEAVYWEIGHT' | 'GRAPHIC' | 'VINTAGE' | 'STRUCTURE'>('ALL');

  // 3D Vault Deck Active Index
  const [vaultActiveIndex, setVaultActiveIndex] = useState(0);

  // Fullscreen Inspection Lightbox Piece
  const [lightboxPiece, setLightboxPiece] = useState<GalleryPiece | null>(null);

  // Filtered pieces
  const filteredPieces = selectedCategory === 'ALL'
    ? allGalleryPieces
    : allGalleryPieces.filter((p) => p.category === selectedCategory);

  // Runway horizontal filmstrip scroll ref
  const filmstripRef = useRef<HTMLDivElement>(null);

  // Reading progress
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Lightbox keyboard shortcuts
  useEffect(() => {
    if (!lightboxPiece) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxPiece(null);
      } else if (e.key === 'ArrowRight') {
        const curIdx = allGalleryPieces.findIndex((p) => p.id === lightboxPiece.id);
        const nextIdx = (curIdx + 1) % allGalleryPieces.length;
        setLightboxPiece(allGalleryPieces[nextIdx]);
      } else if (e.key === 'ArrowLeft') {
        const curIdx = allGalleryPieces.findIndex((p) => p.id === lightboxPiece.id);
        const prevIdx = (curIdx - 1 + allGalleryPieces.length) % allGalleryPieces.length;
        setLightboxPiece(allGalleryPieces[prevIdx]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxPiece]);

  // Filmstrip horizontal scroll helpers
  const scrollFilmstrip = (direction: 'left' | 'right') => {
    if (filmstripRef.current) {
      const offset = direction === 'left' ? -480 : 480;
      filmstripRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // 3D Vault Deck Controls
  const nextVaultCard = () => {
    setVaultActiveIndex((prev) => (prev + 1) % filteredPieces.length);
  };

  const prevVaultCard = () => {
    setVaultActiveIndex((prev) => (prev - 1 + filteredPieces.length) % filteredPieces.length);
  };

  return (
    <div className="relative min-h-screen bg-[#000000] text-[#ffffff] selection:bg-[#ffffff] selection:text-[#000000] overflow-x-clip">
      {/* 0. INTRO PARTICLE TEXT ASSEMBLY OVERLAY */}
      <AnimatePresence>
        {showIntro && <GalleryIntro onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1, y: showIntro ? 20 : 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* 1. TOP SCROLL PROGRESS BAR */}
        <motion.div className="about-scroll-progress" style={{ scaleX: smoothProgress }} />

      {/* Pure Deep Obsidian Background - All dotted grain textures completely eliminated */}

      {/* Ambient Lighting Gradient */}
      <div aria-hidden="true" className="gallery-ambient-glow" />

      {/* ========================================================================= */}
      {/* 1. GALLERY HERO SECTION (EXPANSIVE & CENTERED) */}
      {/* ========================================================================= */}
      <section className="relative z-10 pt-36 md:pt-48 pb-16">
        <div className="gallery-page-container">
          {/* Subtle Watermark Kinetic Marquee */}
          <div aria-hidden="true" className="pointer-events-none absolute -top-4 left-0 right-0 opacity-15 overflow-hidden select-none">
            <div className="flex whitespace-nowrap animate-marquee-left">
              <span className="gallery-marquee-text pr-12">
                THE RUNWAY GALLERY · 27 BESPOKE PIECES · 420 GSM COTTON · ARCHITECTURAL LUXURY ·
              </span>
              <span className="gallery-marquee-text pr-12">
                THE RUNWAY GALLERY · 27 BESPOKE PIECES · 420 GSM COTTON · ARCHITECTURAL LUXURY ·
              </span>
            </div>
          </div>

          {/* Centered Grand Hero Header */}
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 relative z-10">
            {/* Top pill badge + Replay Intro */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/90">
                  Maison JJettas · Complete Visual Exhibition
                </span>
              </motion.div>

              <button
                onClick={() => setShowIntro(true)}
                className="gallery-replay-btn"
                title="Replay Archival Particle Text Assembly"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>REPLAY INTRO</span>
              </button>
            </div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-[-0.03em] leading-[0.9] mb-8"
            >
              THE RUNWAY <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-white/40">
                ARCHIVE.
              </span>
            </motion.h1>

            {/* Sub-paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.2 }}
              className="font-body text-base sm:text-lg md:text-xl text-white/70 max-w-2xl font-light leading-relaxed mb-8"
            >
              Every release is cut, stitched, and dyed in strictly calibrated small-batch drops. Explore all 27 physical silhouettes defining our modern uniform.
            </motion.p>

            {/* Key Standards Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-white/60"
            >
              <span className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02]">
                27 EXHIBITED LOTS
              </span>
              <span className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02]">
                420 GSM HEAVYWEIGHT
              </span>
              <span className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02]">
                PORTO CIRCULAR LOOMS
              </span>
            </motion.div>
          </div>

          {/* Interactive Navigation & Controls Bar (Centered and Balanced) */}
          <div className="pt-10 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Category Filter Pills Bar */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {(['ALL', 'HEAVYWEIGHT', 'GRAPHIC', 'VINTAGE', 'STRUCTURE'] as const).map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setVaultActiveIndex(0);
                    }}
                    className={`gallery-filter-pill-btn ${isSelected ? 'active' : ''}`}
                  >
                    {cat === 'ALL' ? 'ALL WORKS (27)' : cat}
                  </button>
                );
              })}
            </div>

            {/* Viewing Perspective Mode Switcher */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setViewMode('masonry')}
                className={`gallery-mode-toggle ${viewMode === 'masonry' ? 'active' : ''}`}
                aria-label="Lookbook Grid Mode"
              >
                <span>:::</span> LOOKBOOK
              </button>
              <button
                onClick={() => setViewMode('runway')}
                className={`gallery-mode-toggle ${viewMode === 'runway' ? 'active' : ''}`}
                aria-label="Kinetic Runway Slider Mode"
              >
                <span>◄►</span> RUNWAY
              </button>
              <button
                onClick={() => setViewMode('vault')}
                className={`gallery-mode-toggle ${viewMode === 'vault' ? 'active' : ''}`}
                aria-label="3D Inspection Deck Mode"
              >
                <span>▲</span> 3D DECK
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. MAIN PRESENTATION (3 POWERFUL PERSPECTIVES) */}
      {/* ========================================================================= */}
      <section className="relative z-10 pb-36">
        <div className="gallery-page-container">
          {/* =======================================================================
              PERSPECTIVE A: CLEAN EDITORIAL LOOKBOOK GRID (UNBLOCKED, HIGH IMPACT)
             ======================================================================= */}
          {viewMode === 'masonry' && (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="gallery-clean-grid"
            >
              <AnimatePresence mode="popLayout">
                {filteredPieces.map((piece, idx) => (
                  <motion.div
                    layout
                    key={piece.id}
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{
                      duration: 0.6,
                      delay: (idx % 8) * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onClick={() => setLightboxPiece(piece)}
                    className="gallery-clean-card group"
                  >
                    {/* T-Shirt Image (Clean, unobstructed focus) */}
                    <img
                      src={piece.image}
                      alt={piece.title}
                      className="gallery-clean-img"
                      loading="lazy"
                    />

                    {/* Top Floating Badges */}
                    <div className="gallery-card-badge-top">
                      <span className="gallery-tag-pill">{piece.lot}</span>
                      <span className="gallery-tag-pill opacity-90">{piece.badge}</span>
                    </div>

                    {/* Clean Sliding Bottom Drawer */}
                    <div className="gallery-card-bottom-drawer">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-white/50 block mb-1">
                        {piece.weight} · {piece.wash}
                      </span>
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-white group-hover:text-neutral-200 transition-colors">
                          {piece.title}
                        </h3>
                        <span className="font-mono text-[10px] text-white/90 bg-white/10 px-2.5 py-1 rounded shrink-0 border border-white/20">
                          INSPECT ↗
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* =======================================================================
              PERSPECTIVE B: KINETIC RUNWAY FILMSTRIP (HORIZONTAL GLIDE TRACK)
             ======================================================================= */}
          {viewMode === 'runway' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Runway Controls */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <span className="font-mono text-xs uppercase tracking-widest text-white/60">
                  ← DRAG TRACK OR CLICK ARROWS TO GLIDE RUNWAY →
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => scrollFilmstrip('left')}
                    className="w-12 h-12 rounded-full border border-white/20 bg-black/60 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                    aria-label="Scroll left"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => scrollFilmstrip('right')}
                    className="w-12 h-12 rounded-full border border-white/20 bg-black/60 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                    aria-label="Scroll right"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Horizontal Scroll Track */}
              <div ref={filmstripRef} className="gallery-runway-outer">
                <div className="gallery-runway-flex">
                  {filteredPieces.map((piece) => (
                    <div
                      key={piece.id}
                      onClick={() => setLightboxPiece(piece)}
                      className="gallery-runway-card group"
                    >
                      <img
                        src={piece.image}
                        alt={piece.title}
                        className="gallery-clean-img"
                        loading="lazy"
                      />

                      <div className="gallery-card-badge-top">
                        <span className="gallery-tag-pill">{piece.lot}</span>
                        <span className="gallery-tag-pill">{piece.badge}</span>
                      </div>

                      <div className="gallery-card-bottom-drawer">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-white/50 block mb-0.5">
                          {piece.weight}
                        </span>
                        <h4 className="font-display text-base sm:text-lg font-bold uppercase tracking-tight text-white mb-2">
                          {piece.title}
                        </h4>
                        <span className="font-mono text-[10px] text-white/70 block">
                          Click to inspect garment details ↗
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* =======================================================================
              PERSPECTIVE C: 3D INTERACTIVE FOCUS STAGE DECK
             ======================================================================= */}
          {viewMode === 'vault' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative py-12"
            >
              {/* 3D Viewport */}
              <div className="gallery-3d-viewport">
                {filteredPieces.map((piece, index) => {
                  const total = filteredPieces.length;
                  let posClass = 'hidden-right';

                  if (index === vaultActiveIndex) {
                    posClass = 'active';
                  } else if (index === (vaultActiveIndex - 1 + total) % total) {
                    posClass = 'prev';
                  } else if (index === (vaultActiveIndex + 1) % total) {
                    posClass = 'next';
                  } else if (index < vaultActiveIndex) {
                    posClass = 'hidden-left';
                  }

                  return (
                    <div
                      key={piece.id}
                      onClick={() => {
                        if (posClass === 'active') {
                          setLightboxPiece(piece);
                        } else if (posClass === 'prev') {
                          prevVaultCard();
                        } else if (posClass === 'next') {
                          nextVaultCard();
                        }
                      }}
                      className={`gallery-3d-card-item ${posClass}`}
                    >
                      <img
                        src={piece.image}
                        alt={piece.title}
                        className="w-full h-full object-cover filter contrast-110"
                      />

                      {posClass === 'active' && <div className="gallery-laser-scan" />}

                      {/* Top Badges */}
                      <div className="gallery-card-badge-top">
                        <span className="gallery-tag-pill">{piece.lot}</span>
                        <span className="gallery-tag-pill">{piece.badge}</span>
                      </div>

                      {/* Bottom Info Bar */}
                      <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/85 to-transparent">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 block mb-1">
                          {piece.weight} · {piece.wash}
                        </span>
                        <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-white mb-2">
                          {piece.title}
                        </h3>
                        <p className="font-body text-xs text-white/70 line-clamp-2 mb-4">
                          {piece.description}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setLightboxPiece(piece);
                          }}
                          className="w-full py-3 bg-white text-black font-mono text-[10px] uppercase tracking-widest font-bold text-center hover:bg-neutral-200 transition-colors"
                        >
                          Inspect Specifications ↗
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 3D Navigation Arrows */}
              <div className="mt-8 flex items-center justify-center gap-6">
                <button
                  onClick={prevVaultCard}
                  className="w-12 h-12 rounded-full border border-white/20 bg-black flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                  aria-label="Previous 3D piece"
                >
                  ←
                </button>
                <div className="font-mono text-xs uppercase tracking-widest text-white/70">
                  [ {vaultActiveIndex + 1} / {filteredPieces.length} ]
                </div>
                <button
                  onClick={nextVaultCard}
                  className="w-12 h-12 rounded-full border border-white/20 bg-black flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                  aria-label="Next 3D piece"
                >
                  →
                </button>
              </div>
            </motion.div>
          )}

          {/* Exhibition Counter Footnote */}
          <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-white/50">
            <div>
              [ EXHIBITING {filteredPieces.length} OF {allGalleryPieces.length} REGISTERED ATELIER WORKS ]
            </div>
            <div className="flex items-center gap-6">
              <Link to="/about" className="hover:text-white transition-colors underline underline-offset-4">
                ← Read Brand Philosophy
              </Link>
              <Link to="/" className="hover:text-white transition-colors underline underline-offset-4">
                Shop Collection →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. FULLSCREEN EDITORIAL LIGHTBOX SUITE */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {lightboxPiece && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxPiece(null)}
            className="gallery-modal-overlay"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 25 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="gallery-modal-box"
            >
              {/* Left Column: Contained Full T-Shirt Display */}
              <div className="gallery-modal-img-col">
                <img
                  src={lightboxPiece.image}
                  alt={lightboxPiece.title}
                  className="gallery-modal-img"
                />
                <div className="absolute top-4 left-4 bg-black/85 backdrop-blur-md px-3 py-1 rounded text-[10px] font-mono uppercase tracking-widest text-white border border-white/20">
                  {lightboxPiece.lot} · {lightboxPiece.badge}
                </div>
                <div className="gallery-laser-scan" />
              </div>

              {/* Right Column: Garment Specs & Action */}
              <div className="gallery-modal-info-col">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs uppercase tracking-widest text-white/50">
                      ATELIER SPECIFICATION ARCHIVE
                    </span>
                    <button
                      onClick={() => setLightboxPiece(null)}
                      className="gallery-modal-close-btn"
                      aria-label="Close Inspection Modal"
                    >
                      ✕
                    </button>
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-2">
                    {lightboxPiece.title}
                  </h3>
                  <p className="font-mono text-xs text-white/60 mb-6">
                    {lightboxPiece.weight} · {lightboxPiece.wash}
                  </p>

                  <p className="font-body text-sm text-white/70 leading-relaxed font-light mb-8">
                    {lightboxPiece.description}
                  </p>

                  <div className="space-y-3 pt-6 border-t border-white/10 font-mono text-xs">
                    {lightboxPiece.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex justify-between text-white/60">
                        <span>{spec.label}</span>
                        <span className="text-white font-bold">{spec.value}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-white/60">
                      <span>Availability</span>
                      <span className="text-white font-bold">{lightboxPiece.edition}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                  <Link
                    to="/"
                    onClick={() => setLightboxPiece(null)}
                    className="flex-1 py-4 bg-white text-black font-mono text-xs uppercase tracking-[0.2em] font-bold text-center hover:bg-neutral-200 transition-colors"
                  >
                    Shop This Piece →
                  </Link>
                  <button
                    onClick={() => setLightboxPiece(null)}
                    className="px-6 py-4 border border-white/20 text-white font-mono text-xs uppercase tracking-widest hover:border-white transition-colors"
                  >
                    Close (Esc)
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

        {/* ========================================================================= */}
        {/* 4. FINAL FOOTER */}
        {/* ========================================================================= */}
        <div className="relative z-50">
          <FinalFooter />
        </div>
      </motion.div>
    </div>
  );
};

export default Gallery;
