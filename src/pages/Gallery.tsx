import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FinalFooter } from '../components/FinalFooter';
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
  aspect: 'tall' | 'square' | 'hero';
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
    aspect: 'tall',
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
    aspect: 'square',
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
    aspect: 'hero',
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
    aspect: 'tall',
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
    aspect: 'square',
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
    aspect: 'tall',
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
    aspect: 'hero',
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
    aspect: 'square',
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
    aspect: 'tall',
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
    aspect: 'square',
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
    aspect: 'hero',
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
    aspect: 'tall',
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
    aspect: 'square',
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
    aspect: 'tall',
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
    aspect: 'hero',
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
    aspect: 'tall',
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
    aspect: 'square',
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
    aspect: 'tall',
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
    aspect: 'hero',
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
    aspect: 'tall',
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
    aspect: 'square',
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
    aspect: 'tall',
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
    aspect: 'hero',
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
    aspect: 'tall',
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
    aspect: 'square',
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
    aspect: 'tall',
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
    aspect: 'hero',
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
      const offset = direction === 'left' ? -460 : 460;
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
      {/* 1. TOP SCROLL PROGRESS BAR */}
      <motion.div className="about-scroll-progress" style={{ scaleX: smoothProgress }} />

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
        className="pointer-events-none fixed top-[-15%] left-1/2 -translate-x-1/2 w-[1100px] h-[750px] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.06)_0%,_transparent_70%)] blur-[130px] z-0"
      />

      {/* ========================================================================= */}
      {/* 1. GALLERY HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative z-10 pt-32 md:pt-44 pb-16 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/80">
                Maison JJettas · Visual Archive
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-[-0.03em] leading-[0.92]"
            >
              THE RUNWAY <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-white/40">
                GALLERY.
              </span>
            </motion.h1>
          </div>

          {/* Exhibition Meta Counter & Quick Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-start md:items-end gap-3 text-left md:text-right"
          >
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/50">
              Curated Catalog 2026/27
            </span>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              27 PIECES EXHIBITED
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-white/60">
              <Link to="/about" className="hover:text-white underline underline-offset-4 transition-colors">
                ← About The Brand
              </Link>
              <span>/</span>
              <Link to="/" className="hover:text-white underline underline-offset-4 transition-colors">
                Shop Collection →
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Layout Mode Perspective Switcher Toolbar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          {/* Left: 3 Perspective Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] text-white/50 uppercase tracking-widest mr-2">
              Viewing Mode:
            </span>
            <button
              onClick={() => setViewMode('masonry')}
              className={`gallery-mode-pill ${viewMode === 'masonry' ? 'active' : ''}`}
            >
              <span>:::</span> MASONRY LOOKBOOK
            </button>
            <button
              onClick={() => setViewMode('runway')}
              className={`gallery-mode-pill ${viewMode === 'runway' ? 'active' : ''}`}
            >
              <span>◄►</span> KINETIC RUNWAY
            </button>
            <button
              onClick={() => setViewMode('vault')}
              className={`gallery-mode-pill ${viewMode === 'vault' ? 'active' : ''}`}
            >
              <span>▲</span> 3D INSPECTION DECK
            </button>
          </div>

          {/* Right: Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {(['ALL', 'HEAVYWEIGHT', 'GRAPHIC', 'VINTAGE', 'STRUCTURE'] as const).map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setVaultActiveIndex(0);
                  }}
                  className={`gallery-filter-chip ${isSelected ? 'active' : ''}`}
                >
                  {cat === 'ALL' ? 'ALL (27)' : cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. GALLERY PRESENTATION (3 REVOLUTIONARY MODES) */}
      {/* ========================================================================= */}
      <section className="relative z-10 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto pb-32">
        {/* =======================================================================
            MODE A: ASYMMETRIC HAUTE LOOKBOOK (MASONRY)
           ======================================================================= */}
        {viewMode === 'masonry' && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="lookbook-grid"
          >
            <AnimatePresence mode="popLayout">
              {filteredPieces.map((piece, idx) => {
                const isHero = piece.aspect === 'hero';
                return (
                  <motion.div
                    layout
                    key={piece.id}
                    initial={{ opacity: 0, scale: 0.92, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{
                      duration: 0.5,
                      delay: (idx % 8) * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onClick={() => setLightboxPiece(piece)}
                    className={`lookbook-card ${isHero ? 'lookbook-span-2 lookbook-card-hero' : `lookbook-card-${piece.aspect}`}`}
                  >
                    <img
                      src={piece.image}
                      alt={piece.title}
                      className="lookbook-image"
                      loading="lazy"
                    />

                    {/* Top Corner Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                      <span className="bg-black/80 backdrop-blur-md px-2.5 py-1 rounded text-[9px] font-mono uppercase tracking-widest text-white border border-white/20">
                        {piece.lot}
                      </span>
                      <span className="bg-white/10 backdrop-blur-md px-2.5 py-1 rounded text-[9px] font-mono uppercase tracking-widest text-white/90 border border-white/15">
                        {piece.badge}
                      </span>
                    </div>

                    {/* Sliding Bottom Drawer */}
                    <div className="lookbook-drawer">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="font-mono text-[9px] uppercase tracking-widest text-white/50 block mb-1">
                            {piece.weight} · {piece.wash}
                          </span>
                          <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-white">
                            {piece.title}
                          </h3>
                        </div>
                        <span className="font-mono text-[10px] text-white/90 bg-white/10 px-2.5 py-1 rounded shrink-0 border border-white/20">
                          INSPECT ↗
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* =======================================================================
            MODE B: KINETIC FILMSTRIP RUNWAY (DRAG HORIZONTAL TRACK)
           ======================================================================= */}
        {viewMode === 'runway' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Left/Right Smooth Navigation Controls */}
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-white/50">
                ← DRAG TRACK OR USE CONTROLS TO EXPLORE →
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => scrollFilmstrip('left')}
                  className="w-11 h-11 rounded-full border border-white/20 bg-black/60 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                  aria-label="Scroll runway left"
                >
                  ←
                </button>
                <button
                  onClick={() => scrollFilmstrip('right')}
                  className="w-11 h-11 rounded-full border border-white/20 bg-black/60 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                  aria-label="Scroll runway right"
                >
                  →
                </button>
              </div>
            </div>

            {/* Horizontal Filmstrip Container */}
            <div ref={filmstripRef} className="runway-track-wrap">
              <div className="runway-strip">
                {filteredPieces.map((piece) => (
                  <div
                    key={piece.id}
                    onClick={() => setLightboxPiece(piece)}
                    className="runway-item-box aspect-[3/4] relative group cursor-pointer"
                  >
                    <img
                      src={piece.image}
                      alt={piece.title}
                      className="lookbook-image"
                      loading="lazy"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                      <span className="bg-black/80 backdrop-blur-md px-2.5 py-1 rounded text-[9px] font-mono uppercase tracking-widest text-white border border-white/20">
                        {piece.lot}
                      </span>
                      <span className="bg-white/10 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-mono uppercase tracking-widest text-white/90">
                        {piece.badge}
                      </span>
                    </div>

                    {/* Bottom Drawer */}
                    <div className="lookbook-drawer">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-white/50 block mb-0.5">
                        {piece.weight}
                      </span>
                      <h4 className="font-display text-base sm:text-lg font-bold uppercase tracking-tight text-white mb-2">
                        {piece.title}
                      </h4>
                      <span className="font-mono text-[10px] text-white/70 block">
                        Click to inspect piece details →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* =======================================================================
            MODE C: 3D INTERACTIVE FOCUS STAGE DECK
           ======================================================================= */}
        {viewMode === 'vault' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative py-12"
          >
            {/* 3D Carousel Stage */}
            <div className="gallery-3d-stage relative min-h-[580px] sm:min-h-[660px] flex items-center justify-center overflow-hidden">
              {filteredPieces.map((piece, index) => {
                const total = filteredPieces.length;
                let positionState = 'hidden-right';

                if (index === vaultActiveIndex) {
                  positionState = 'active';
                } else if (index === (vaultActiveIndex - 1 + total) % total) {
                  positionState = 'prev';
                } else if (index === (vaultActiveIndex + 1) % total) {
                  positionState = 'next';
                } else if (index < vaultActiveIndex) {
                  positionState = 'hidden-left';
                }

                return (
                  <div
                    key={piece.id}
                    onClick={() => {
                      if (positionState === 'active') {
                        setLightboxPiece(piece);
                      } else if (positionState === 'prev') {
                        prevVaultCard();
                      } else if (positionState === 'next') {
                        nextVaultCard();
                      }
                    }}
                    className={`gallery-3d-card ${positionState} absolute w-[300px] sm:w-[420px] aspect-[3/4] rounded-2xl overflow-hidden border border-white/20 bg-neutral-950 cursor-pointer`}
                  >
                    <img
                      src={piece.image}
                      alt={piece.title}
                      className="w-full h-full object-cover filter contrast-110"
                    />

                    {positionState === 'active' && <div className="gallery-scan-laser" />}

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                      <span className="bg-black/85 backdrop-blur-md px-3 py-1 rounded text-[10px] font-mono uppercase tracking-widest text-white border border-white/20">
                        {piece.lot}
                      </span>
                      <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded text-[10px] font-mono uppercase tracking-widest text-white/90 border border-white/15">
                        {piece.badge}
                      </span>
                    </div>

                    {/* Bottom Metadata Panel */}
                    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
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

            {/* 3D Deck Bottom Navigation Bar */}
            <div className="mt-8 flex items-center justify-center gap-6">
              <button
                onClick={prevVaultCard}
                className="w-12 h-12 rounded-full border border-white/20 bg-black flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                aria-label="Previous 3D card"
              >
                ←
              </button>
              <div className="font-mono text-xs uppercase tracking-widest text-white/60">
                [ {vaultActiveIndex + 1} / {filteredPieces.length} ]
              </div>
              <button
                onClick={nextVaultCard}
                className="w-12 h-12 rounded-full border border-white/20 bg-black flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                aria-label="Next 3D card"
              >
                →
              </button>
            </div>
          </motion.div>
        )}

        {/* Global Catalog Footer Bar */}
        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-white/50">
          <div className="flex items-center gap-4">
            <span>PORTO MILLING SPECIFICATION</span>
            <span className="text-white font-bold">420 GSM COMPACT COMBER</span>
          </div>
          <div>
            SHOWING {filteredPieces.length} OF {allGalleryPieces.length} REGISTERED ATELIER WORKS
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
            className="gallery-lightbox-modal"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 25 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="gallery-lightbox-shell"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Modal Visual Image */}
                <div className="relative aspect-[3/4] bg-neutral-900 overflow-hidden">
                  <img
                    src={lightboxPiece.image}
                    alt={lightboxPiece.title}
                    className="w-full h-full object-cover filter contrast-110"
                  />
                  <div className="absolute top-4 left-4 bg-black/85 backdrop-blur-md px-3 py-1 rounded text-[10px] font-mono uppercase tracking-widest text-white border border-white/20">
                    {lightboxPiece.lot} · {lightboxPiece.badge}
                  </div>
                  <div className="gallery-scan-laser" />
                </div>

                {/* Modal Details & Specs */}
                <div className="p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs uppercase tracking-widest text-white/50">
                        ATELIER SPECIFICATION ARCHIVE
                      </span>
                      <button
                        onClick={() => setLightboxPiece(null)}
                        className="text-white/50 hover:text-white font-mono text-lg transition-colors p-1"
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
    </div>
  );
};

export default Gallery;
