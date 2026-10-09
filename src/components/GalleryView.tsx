import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

const galleryImages = [
  { id: 1, src: '/real image/product-1.jpeg', title: 'Smile Heal The Soul', lot: 'LOT 001', tag: 'FLAGSHIP DROP', spec: '420 GSM LOOPBACK · CARBON MATTE BLACK' },
  { id: 2, src: '/real image/product-2.jpeg', title: 'Small Body Big Energy', lot: 'LOT 002', tag: 'CORE ATELIER', spec: '420 GSM COTTON · OBSIDIAN WASH' },
  { id: 3, src: '/real image/product-3.jpeg', title: 'Chicago Racing Team 98', lot: 'LOT 003', tag: 'RUNWAY SHOWPIECE', spec: '420 GSM FRENCH TERRY · MID-GREY MARL' },
  { id: 4, src: '/real image/product-4.jpeg', title: 'Chains Kurapika Noir', lot: 'LOT 004', tag: 'TONAL NOIR', spec: '450 GSM HEAVYWEIGHT · DEEP PIGMENT' },
  { id: 5, src: '/real image/product-5.jpeg', title: 'Feeling Acid Wash Atelier', lot: 'LOT 005', tag: 'HAND TREATED', spec: '400 GSM COMBED COTTON · CUSTOM ACID' },
  { id: 6, src: '/real image/product-6.jpeg', title: 'Cross Bones Graphic Noir', lot: 'LOT 006', tag: 'LIMITED 50', spec: '420 GSM JERSEY · CARBON DYE' },
  { id: 7, src: '/real image/product-7.jpeg', title: 'Dark Soul Streetwear', lot: 'LOT 007', tag: 'ZERO DISTORTION', spec: '450 GSM HEAVYWEIGHT · BLACK ON BLACK' },
  { id: 8, src: '/real image/product-8.jpeg', title: 'Obsidian Skull Edition', lot: 'LOT 008', tag: 'EMBROIDERED DETAIL', spec: '500 GSM LUXURY · BIO-WASHED CHARCOAL' },
];

const GalleryItem = ({
  image,
  index,
  onClick,
}: {
  image: (typeof galleryImages)[0];
  index: number;
  onClick: () => void;
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: (index % 8) * 0.05, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="relative group rounded-xl overflow-hidden bg-[#0c0c0c] cursor-pointer"
      style={{ aspectRatio: '3/4', boxShadow: '0 20px 50px rgba(0,0,0,0.85)' }}
    >
      {/* Image */}
      <img
        src={image.src}
        alt={image.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />

      {/* No overlays — clean image only */}
    </motion.div>
  );
};

export const GalleryView = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Keyboard nav
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((i) => ((i ?? 0) + 1) % galleryImages.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => ((i ?? 0) - 1 + galleryImages.length) % galleryImages.length);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIndex]);

  const activePiece = lightboxIndex !== null ? galleryImages[lightboxIndex] : null;

  return (
    <section className="relative w-full bg-[#000000] pt-20 pb-16 px-4 sm:px-6 md:px-10 z-40">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <h2 style={{ fontFamily: 'sans-serif', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', color: '#fff', lineHeight: 1 }}>Gallery</h2>
          <p style={{ fontFamily: 'monospace', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.4)', marginTop: '12px' }}>
            420 GSM Heavyweight · Limited Edition Drops · Crafted in Portugal
          </p>
          <div style={{ width: '40px', height: '2px', background: '#fff', margin: '18px auto 0', opacity: 0.25 }} />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          <AnimatePresence>
            {galleryImages.map((img, idx) => (
              <GalleryItem
                key={img.id}
                image={img}
                index={idx}
                onClick={() => setLightboxIndex(idx)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Portal */}
      {createPortal(
        <AnimatePresence>
          {activePiece && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 flex items-center justify-center"
              style={{ zIndex: 999999, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)' }}
              onClick={() => setLightboxIndex(null)}
            >
              {/* Close */}
              <button
                className="absolute top-6 right-8 text-white/50 hover:text-white transition-colors z-50"
                onClick={() => setLightboxIndex(null)}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              {/* Prev */}
              <button
                className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white transition-all z-50"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex! - 1 + galleryImages.length) % galleryImages.length); }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>

              {/* Image */}
              <motion.div
                key={activePiece.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="relative flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={activePiece.src}
                  alt={activePiece.title}
                  style={{
                    maxWidth: '85vw',
                    maxHeight: '78vh',
                    objectFit: 'contain',
                    borderRadius: '14px',
                  }}
                />
                <div className="mt-4 text-center">
                  <p style={{ fontFamily: 'monospace', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)' }}>
                    {activePiece.lot} · {activePiece.tag}
                  </p>
                  <p style={{ fontFamily: 'sans-serif', fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#fff', marginTop: '4px' }}>
                    {activePiece.title}
                  </p>
                </div>
              </motion.div>

              {/* Next */}
              <button
                className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white transition-all z-50"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex! + 1) % galleryImages.length); }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>

              {/* Dot indicators */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {galleryImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{ background: i === lightboxIndex ? '#fff' : 'rgba(255,255,255,0.25)' }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};
