import React from 'react';

const polaroids = [
  { id: 1, src: '/real image/gallery-1.jfif', rot: -4 },
  { id: 2, src: '/real image/gallery-2.jfif', rot: 3 },
  { id: 3, src: '/real image/gallery-3.jfif', rot: -2 },
  { id: 4, src: '/real image/gallery-4.jfif', rot: 5 },
  { id: 5, src: '/real image/gallery-5.jfif', rot: -5 },
  { id: 6, src: '/real image/gallery-6.jfif', rot: 2 },
  { id: 7, src: '/real image/gallery-7.jfif', rot: -3 },
  { id: 8, src: '/real image/gallery-10.jfif', rot: 4 },
];

export const OriginalFooter = () => {
  return (
    <footer className="relative w-full overflow-hidden bg-[#0d0914] text-[#ffffff] flex flex-col justify-between z-50 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]" style={{ minHeight: '100vh' }}>
      
      {/* Background Soft Texture */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at center, #1a102a 0%, #0a0710 80%)'
        }}
      />

      {/* Top Polaroid Marquee (Infinite Auto-Scroll) */}
      <div className="relative w-full overflow-hidden py-16 z-10 flex">
        <div className="animate-marquee-left flex gap-4 md:gap-8 px-4">
          {[...polaroids, ...polaroids].map((p, idx) => (
            <div
              key={`${p.id}-${idx}`}
              className="relative bg-[#ffffff] p-2 pb-8 sm:p-3 sm:pb-12 rounded-sm shadow-[0_20px_40px_rgba(0,0,0,0.9)] flex-shrink-0 transition-transform duration-500 hover:-translate-y-6 hover:scale-110 hover:z-20 cursor-pointer border border-[#000000]"
              style={{ 
                width: 'clamp(140px, 16vw, 220px)', 
                aspectRatio: '3/4',
                transform: `rotate(${p.rot}deg)` 
              }}
            >
              <div className="w-full h-full relative overflow-hidden bg-[#ffffff] shadow-inner border border-black/20">
                <img src={p.src} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-20 w-full max-w-[1600px] mx-auto flex flex-col justify-center items-center text-center py-12 px-6">
        
        {/* Center: Hero Heading */}
        <div className="flex flex-col items-center justify-center w-full">
          <div className="mb-2">
            <h3 
              className="font-display tracking-widest drop-shadow-2xl"
              style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', color: '#ffffff', filter: 'drop-shadow(0 0 20px rgba(212,162,74,0.5))' }}
            >
              PREMIUM APPAREL
            </h3>
          </div>
          <h2 
            className="font-display uppercase tracking-tighter leading-[0.9] text-white max-w-5xl mx-auto drop-shadow-[0_15px_30px_rgba(0,0,0,1)]"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
          >
            RULES WERE MADE<br/>TO BE BROKEN
          </h2>
          
          <div className="mt-16 relative group">
            <div className="absolute inset-0 bg-[#ffffff] rounded-full blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-300" />
            <button 
              className="relative font-display font-bold uppercase tracking-[0.2em] text-sm md:text-base px-14 py-6 rounded-full hover:scale-105 transition-all duration-300 shadow-2xl"
              style={{ backgroundColor: '#ffffff', color: '#0a0710' }}
            >
              Shop Collection
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Logos Marquee Area */}
      <div className="w-full border-t border-white/5 py-8 relative z-40 bg-[#0a0710] mt-auto">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex flex-wrap justify-center sm:justify-between items-center opacity-90 text-[#ffffff] font-display font-bold text-xs md:text-sm tracking-[0.2em] uppercase gap-6 md:gap-8">
          <span>High on the north</span>
          <span className="text-[#ffffff]">Exclusive</span>
          <span>Premium</span>
          <span className="text-[#ffffff]">Limited Edition</span>
          <span>Streetwear</span>
        </div>
      </div>

    </footer>
  );
};
