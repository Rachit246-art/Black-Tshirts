import React from 'react';

export const PremiumLookbook: React.FC = () => {
  // Using valid local images from the "real image" folder
  const images = [
    { id: 1, src: '/real image/product-1.jpeg', alt: 'Premium Lookbook Piece 1', colSpan: 'md:col-span-8', rowSpan: 'md:row-span-2', aspect: 'aspect-[16/10]' },
    { id: 2, src: '/real image/product-2.jpeg', alt: 'Premium Lookbook Piece 2', colSpan: 'md:col-span-4', rowSpan: 'md:row-span-1', aspect: 'aspect-[4/5]' },
    { id: 3, src: '/real image/product-3.jpeg', alt: 'Premium Lookbook Piece 3', colSpan: 'md:col-span-4', rowSpan: 'md:row-span-1', aspect: 'aspect-square' },
    { id: 4, src: '/real image/product-4.jpeg', alt: 'Premium Lookbook Piece 4', colSpan: 'md:col-span-4', rowSpan: 'md:row-span-1', aspect: 'aspect-[4/5]' },
    { id: 5, src: '/real image/product-5.jpeg', alt: 'Premium Lookbook Piece 5', colSpan: 'md:col-span-8', rowSpan: 'md:row-span-1', aspect: 'aspect-[21/9]' },
  ];

  return (
    <section className="relative w-full bg-[#000000] py-32 border-t border-[#ffffff]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Premium Minimal Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <div className="text-[#ffffff] font-mono text-xs tracking-[0.3em] uppercase mb-6 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffffff]"></span>
              Curated Selection
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold uppercase tracking-tighter text-[#ffffff] leading-[0.9]">
              The <br /> Archive
            </h2>
          </div>
          <div className="max-w-xs">
            <p className="text-[#ffffff]/50 font-body text-sm leading-relaxed">
              Explore the raw essence of our previous collections. Unfiltered, unedited, and authentic to the streetwear roots.
            </p>
          </div>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 lg:gap-8 auto-rows-min">
          {images.map((img) => (
            <div 
              key={img.id} 
              className={`relative overflow-hidden bg-[#ffffff] rounded-sm group cursor-pointer ${img.colSpan} ${img.rowSpan}`}
            >
              <div className={`relative w-full ${img.aspect} md:h-full md:aspect-auto`}>
                <img 
                  src={img.src} 
                  alt={img.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 filter brightness-[0.85] group-hover:brightness-110"
                  loading="lazy"
                />
                
                {/* Subtle dark vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-1000" />
                
                {/* Decorative plus icon on hover */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 bg-black/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-50 transition-all duration-700 ease-out">
                  <div className="w-4 h-[1px] bg-white absolute" />
                  <div className="w-[1px] h-4 bg-white absolute" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};
