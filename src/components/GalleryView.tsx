import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const galleryImages = [
  { id: 1, src: '/real image/product-1.jpeg', title: 'Smile Heal The Soul', lot: 'LOT 001', tag: 'FLAGSHIP DROP', spec: '420 GSM LOOPBACK - CARBON MATTE BLACK', category: 'graphic' },
  { id: 2, src: '/real image/product-2.jpeg', title: 'Small Body Big Energy', lot: 'LOT 002', tag: 'CORE ATELIER', spec: '420 GSM COTTON - OBSIDIAN WASH', category: 'graphic' },
  { id: 3, src: '/real image/product-3.jpeg', title: 'Chicago Racing Team 98', lot: 'LOT 003', tag: 'RUNWAY SHOWPIECE', spec: '420 GSM FRENCH TERRY - MID-GREY MARL', category: 'heavyweight' },
  { id: 4, src: '/real image/product-4.jpeg', title: 'Chains Kurapika Noir', lot: 'LOT 004', tag: 'TONAL NOIR', spec: '450 GSM HEAVYWEIGHT - DEEP PIGMENT', category: 'structure' },
  { id: 5, src: '/real image/product-5.jpeg', title: 'Feeling Acid Wash', lot: 'LOT 005', tag: 'HAND TREATED', spec: '400 GSM COMBED COTTON - CUSTOM ACID', category: 'vintage' },
  { id: 6, src: '/real image/product-1.jpeg', title: 'Cross Bones Graphic Noir', lot: 'LOT 006', tag: 'LIMITED 50', spec: '420 GSM JERSEY - CARBON DYE', category: 'graphic' },
  { id: 7, src: '/real image/product-2.jpeg', title: 'Dark Soul Streetwear', lot: 'LOT 007', tag: 'ZERO DISTORTION', spec: '450 GSM HEAVYWEIGHT - BLACK ON BLACK', category: 'heavyweight' },
  { id: 8, src: '/real image/product-3.jpeg', title: 'Obsidian Skull Edition', lot: 'LOT 008', tag: 'EMBROIDERED DETAIL', spec: '500 GSM LUXURY - BIO-WASHED CHARCOAL', category: 'structure' },
];

const FilterPill = ({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`px-4 py-1.5 rounded-full text-[9px] sm:text-[10px] font-mono tracking-widest uppercase transition-all duration-300 border ${
      isActive 
        ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
        : 'bg-transparent text-white/50 border-white/10 hover:border-white/30 hover:text-white'
    }`}
  >
    {label}
  </button>
);

const GalleryItem = ({ image, index }: { image: any; index: number }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative group rounded-lg overflow-hidden bg-[#0c0c0c] border border-white/5 cursor-pointer shadow-2xl"
    >
      {/* Image Container with precise aspect ratio */}
      <div className="relative w-full bg-[#000000]" style={{ aspectRatio: '4/5' }}>
        <img
          src={image.src}
          alt={image.title}
          className="absolute inset-0 w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-700 ease-[0.16,1,0.3,1]"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
};

export const GalleryView = () => {
  const [filter, setFilter] = useState('ALL WORKS');
  const [subFilter, setSubFilter] = useState('lookbook');

  const filters = [
    { id: 'ALL WORKS', label: `ALL WORKS (${galleryImages.length})` },
    { id: 'heavyweight', label: 'HEAVYWEIGHT' },
    { id: 'graphic', label: 'GRAPHIC' },
    { id: 'vintage', label: 'VINTAGE' },
    { id: 'structure', label: 'STRUCTURE' }
  ];

  const subFilters = [
    { id: 'lookbook', label: '::: LOOKBOOK' },
    { id: 'runway', label: '— RUNWAY' },
    { id: '3ddeck', label: '▲ 3D DECK' }
  ];

  const filteredImages = filter === 'ALL WORKS' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  return (
    <section className="relative w-full min-h-screen bg-[#000000] py-24 px-4 sm:px-6 md:px-12 z-40 font-sans">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header / Filter Section */}
        <div className="flex flex-col items-center justify-center mb-16 space-y-4">
          <h2 className="font-display text-2xl md:text-3xl text-white uppercase tracking-[0.2em] mb-4 text-center">
            The Collection
          </h2>
          
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl">
            {filters.map(f => (
              <FilterPill 
                key={f.id} 
                label={f.label} 
                isActive={filter === f.id} 
                onClick={() => setFilter(f.id)} 
              />
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            {subFilters.map(sf => (
              <button 
                key={sf.id}
                onClick={() => setSubFilter(sf.id)}
                className={`px-5 py-2 rounded-full text-[10px] sm:text-[11px] font-mono tracking-widest uppercase transition-all duration-300 border ${
                  subFilter === sf.id ? 'bg-[#1a1a1a] text-white border-white/20 shadow-lg' : 'bg-transparent text-white/40 border-transparent hover:text-white/80'
                }`}
              >
                {sf.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Grid based on SubFilter */}
        <div className={
          subFilter === 'runway' 
            ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto" 
            : subFilter === '3ddeck'
            ? "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 max-w-[1600px] mx-auto"
            : "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4"
        }>
          <AnimatePresence>
            {filteredImages.map((img, idx) => (
              <GalleryItem key={img.id} image={img} index={idx} />
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
