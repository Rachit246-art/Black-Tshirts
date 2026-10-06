import React, { useState } from 'react';

const collections = [
  {
    id: '01',
    title: 'TOKYO NIGHTS',
    subtitle: 'The Anime Edit',
    image: '/real image/gallery-1.jfif',
  },
  {
    id: '02',
    title: 'VINTAGE WASH',
    subtitle: 'Acid & Stone',
    image: '/real image/gallery-6.jfif',
  },
  {
    id: '03',
    title: 'HEAVYWEIGHT',
    subtitle: '400GSM Premium',
    image: '/real image/gallery-4.jfif',
  },
  {
    id: '04',
    title: 'LIMITED DROP',
    subtitle: 'Exclusive Run',
    image: '/real image/gallery-7.jfif',
  }
];

export const PremiumAccordion: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number>(0);

  return (
    <section 
      className="relative w-full flex flex-col py-0 md:py-16 px-0 md:px-8"
      style={{ minHeight: '100vh', backgroundColor: '#07050a' }}
    >
      {/* Optional Top Thin Border for Separation */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-white/5" />
      
      <div className="flex-1 w-full max-w-[1800px] mx-auto flex overflow-hidden rounded-none md:rounded-2xl border border-white/5 shadow-2xl bg-[#0d0914]">
        {collections.map((item, idx) => {
          const isHovered = hoveredIdx === idx;
          // For mobile, we might just stack them or keep the flex row but allow touch.
          // Tailwind flex layout handles this elegantly.
          return (
            <div
              key={item.id}
              className="relative h-full transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer group border-r border-white/5 last:border-r-0"
              style={{ flex: isHovered ? '4' : '1' }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onTouchStart={() => setHoveredIdx(idx)}
            >
              {/* Dark Panel Background */}
              <div className="absolute inset-0 bg-[#110c1a] transition-colors duration-800" />

              {/* Inset Premium Image Container */}
              <div 
                className="absolute inset-0 flex items-center justify-center p-8 md:p-16 transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{ 
                  opacity: isHovered ? 1 : 0.2,
                  transform: isHovered ? 'scale(1)' : 'scale(0.85)',
                  filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)'
                }}
              >
                <div className="relative w-full h-full max-h-[70vh] flex items-center justify-center">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                  />
                </div>
              </div>

              {/* Bottom Gradient for Text Readability */}
              <div className="absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-[#0a0710] to-transparent opacity-90 pointer-events-none" />

              {/* Content Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 flex flex-col justify-end transition-all duration-[800ms] min-w-[200px]">
                <div className="flex items-center gap-4 mb-4">
                  <span className={`font-mono text-sm tracking-widest transition-colors duration-500 ${isHovered ? 'text-[#d4a24a]' : 'text-white/30'}`}>
                    {item.id}
                  </span>
                  <div className={`h-[1px] bg-[#d4a24a] transition-all duration-[800ms] ${isHovered ? 'w-12' : 'w-0'}`} />
                </div>
                
                {/* Title */}
                <h3 
                  className={`font-display uppercase leading-[0.85] tracking-tighter text-white transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] origin-bottom-left whitespace-nowrap`}
                  style={{
                    transform: isHovered ? 'scale(1) translateY(0) rotate(0deg)' : 'scale(0.5) translateY(-40px) rotate(-90deg)',
                    opacity: isHovered ? 1 : 0.5,
                    textShadow: isHovered ? '0 10px 30px rgba(0,0,0,0.8)' : 'none'
                  }}
                >
                  <span className="text-3xl md:text-5xl lg:text-7xl block">{item.title}</span>
                </h3>
                
                {/* Subtitle */}
                <div 
                  className={`mt-4 font-mono text-xs md:text-sm tracking-widest text-[#f4efe6]/80 uppercase overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] whitespace-nowrap`}
                  style={{
                    maxHeight: isHovered ? '50px' : '0px',
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translateY(0)' : 'translateY(10px)'
                  }}
                >
                  {item.subtitle}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
