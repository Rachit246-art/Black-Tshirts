import React, { useRef, useState, useEffect } from 'react';
import { homeData } from '../data/homeData';
import { GalleryView } from '../components/GalleryView';
import { FinalFooter } from '../components/FinalFooter';
import { PremiumAccordion } from '../components/PremiumAccordion';
import { PremiumVideo } from '../components/PremiumVideo';
import { PremiumContact } from '../components/PremiumContact';

const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

export const Home: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cardsRevealed, setCardsRevealed] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);
  const stageTrackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  
  // Custom JS-driven pinning for Gallery -> Video overlap
  const galleryAnchorRef = useRef<HTMLDivElement>(null);
  const [galleryTranslateY, setGalleryTranslateY] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  // Staggered vertical base offsets matching authentic reference (Screenshot 2)
  const cardOffsetsPx = [-16, 22, -18, 18, -10];

  // Scroll listener to calculate progress through the combined stage track (60fps requestAnimationFrame)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // 1. Hero / Signature / Quote Track Logic
          if (stageTrackRef.current) {
            const rect = stageTrackRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const totalDistance = rect.height - windowHeight;
            if (totalDistance > 0) {
              const currentScroll = -rect.top;
              const p = Math.max(0, Math.min(1, currentScroll / totalDistance));
              setScrollProgress(p);
              if (p > 0.05) {
                setCardsRevealed(true);
              } else if (p <= 0.01) {
                setCardsRevealed(false);
              }
            }
          }

          // 2. JS-Driven Pinning for Gallery -> Video Overlap
          if (galleryAnchorRef.current) {
            const rect = galleryAnchorRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            // When the NATURAL bottom of the gallery scrolls above the bottom of the screen,
            // we calculate the overlap to translate the inner gallery down, pinning it visually.
            const overlap = windowHeight - rect.bottom;
            // Cap the overlap at windowHeight (the exact height of the PremiumVideo)
            // so it stops pinning and scrolls away naturally once the video covers it.
            if (overlap > 0) {
              setGalleryTranslateY(Math.min(overlap, windowHeight));
            } else {
              setGalleryTranslateY(0);
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Adjusting for a very tall track (1000vh total, 900vh scrollable)
  // Section 2 (Moments) rise calculation: Moments section rises over Hero between scroll progress 0.0 and 0.08
  const momentsRiseProgress = Math.max(0, Math.min(1, scrollProgress / 0.08));
  const easedMomentsRise = momentsRiseProgress * momentsRiseProgress * (3 - 2 * momentsRiseProgress);
  const momentsTranslateY = (1 - easedMomentsRise) * 100; // in %

  // Section 3 (Quote) rise calculation: Quote section rises over Moments between scroll progress 0.15 and 0.23
  const quoteRiseProgress = Math.max(0, Math.min(1, (scrollProgress - 0.15) / 0.08));
  const easedQuoteRise = quoteRiseProgress * quoteRiseProgress * (3 - 2 * quoteRiseProgress);
  const quoteTranslateY = (1 - easedQuoteRise) * 100; // in %

  // 5 Images rising calculations (scroll progress 0.25 to 1.0)
  // Each image gets a slow interval of 0.15
  const getPhotoRise = (index: number) => {
    const start = 0.25 + index * 0.15;
    const progress = Math.max(0, Math.min(1, (scrollProgress - start) / 0.15));
    const eased = progress * progress * (3 - 2 * progress);
    return (1 - eased) * 100; // Starts at 100% (bottom), ends at 0% (center)
  };

  const imagesToShow = [
    { title: "Gallery 1", image: "/real image/gallery-1.jfif" },
    { title: "Gallery 2", image: "/real image/gallery-2.jfif" },
    { title: "Gallery 3", image: "/real image/gallery-3.jfif" },
    { title: "Gallery 4", image: "/real image/gallery-4.jfif" },
    { title: "Gallery 5", image: "/real image/gallery-5.jfif" }
  ];

  // Drag-to-scroll interaction for the horizontal trading cards rail
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!railRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - railRef.current.offsetLeft);
    setScrollLeftState(railRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !railRef.current) return;
    e.preventDefault();
    const x = e.pageX - railRef.current.offsetLeft;
    const walk = (x - startX) * 1.4;
    railRef.current.scrollLeft = scrollLeftState - walk;
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const scrollRail = (direction: 'left' | 'right') => {
    if (!railRef.current) return;
    const offset = direction === 'left' ? -360 : 360;
    railRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <div
      className="relative w-full bg-[#000000] text-[#ffffff] selection:bg-[#ffffff] selection:text-[#000000]"
    >
      {/* =========================================================================
          COMBINED 3-TIER PINNED STAGE:
          1. Hero (stationary base)
          2. Signature Moments (glides up over Hero on scroll)
          3. Quote: "I Want People To Remember Me For More Than Football" (glides up over Moments on scroll)
          4. 5 Images scroll up one by one
          Total scroll track: 1000vh
          ========================================================================= */}
      <div
        ref={stageTrackRef}
        className="relative w-full"
        style={{ height: '1000vh' }}
      >
        <div className="sticky top-0 h-screen min-h-[100svh] w-full overflow-hidden">
          {/* 1. HERO SECTION (STATIONARY UNDERNEATH) */}
          <section
            className="absolute inset-0 w-full h-full pt-28 pb-16 px-6 md:px-12 flex flex-col justify-between overflow-hidden z-10 pointer-events-auto"
            style={{
              transform: `scale(${1 - easedMomentsRise * 0.06})`,
              opacity: Math.max(0.15, 1 - easedMomentsRise * 0.85),
              transformOrigin: 'center bottom',
              willChange: 'transform, opacity'
            }}
          >
            {/* Giant Blurred Background Watermarks: JUSTIN / JEFFERSON */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 flex flex-col justify-center opacity-30 select-none overflow-hidden">
              <div className="animate-marquee-left flex whitespace-nowrap">
                <span className="font-display text-[22vw] leading-none tracking-[-0.03em] uppercase text-[#ffffff] pr-12">
                  PREMIUM PRINTED APPAREL · PREMIUM PRINTED APPAREL ·
                </span>
              </div>
              <div className="animate-marquee-right flex whitespace-nowrap -mt-[5vw]">
                <span className="font-display text-[22vw] leading-none tracking-[-0.03em] uppercase text-[#ffffff] pr-12">
                  OVERSIZED TEES · STREETWEAR · OVERSIZED TEES ·
                </span>
              </div>
            </div>

            {/* Central Portrait Cutout */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center items-end h-[80vh] sm:h-[85vh]">
              <img
                src="/Herosection.png"
                alt="Justin Jefferson"
                className="h-full w-auto max-w-none object-contain drop-shadow-2xl scale-[1.32] origin-bottom"
              />
            </div>

            {/* Top Header Label */}
            <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-0 mt-4 md:mt-0">
              <div className="text-[10px] md:text-[11px] font-mono uppercase tracking-[0.2em] md:tracking-[0.25em] text-[#ffffff]/70 flex items-center gap-2 text-center md:text-left justify-center md:justify-start">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#ffffff]" />
                From Studio To The Streets
              </div>
              <div className="text-[10px] md:text-[11px] font-mono uppercase tracking-[0.2em] md:tracking-[0.25em] text-[#ffffff]/70 text-center md:text-right">
                Crafted For Comfort
              </div>
            </div>

            {/* All Middle/Bottom flanking text removed per user requests for a cleaner hero image display */}
            <div className="relative z-20 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-end mt-auto pt-10 md:pt-48 pb-8 md:pb-4 pointer-events-none">
              {/* Empty container to preserve bottom spacing */}
            </div>
          </section>

          {/* 2. SIGNATURE MOMENTS SECTION (RISES UP OVER HERO ACCORDING TO SCROLL) */}
          <div
            className="absolute inset-0 w-full h-full z-20 flex flex-col justify-center bg-[#000000] text-[#ffffff] overflow-hidden shadow-[0_-30px_90px_rgba(0,0,0,0.95)]"
            style={{
              transform: `translate3d(0, ${momentsTranslateY}%, 0) scale(${1 - easedQuoteRise * 0.05})`,
              opacity: Math.max(0.15, 1 - easedQuoteRise * 0.85),
              clipPath: 'polygon(0 3.5vw, 100% 0, 100% 100%, 0 100%)',
              WebkitClipPath: 'polygon(0 3.5vw, 100% 0, 100% 100%, 0 100%)',
              willChange: 'transform, opacity'
            }}
          >
            {/* Subtle Grass Texture */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-15 mix-blend-multiply"
              style={{
                backgroundImage: 'url(/textures/grass.webp)',
                backgroundRepeat: 'repeat',
                backgroundSize: '180px'
              }}
            />

            {/* Stadium Light Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-45 mix-blend-soft-light"
              style={{
                backgroundImage: 'url(/textures/light-03.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />

            {/* Giant Purple Display Watermark: SIGNATURE PRODUCTS */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden opacity-30 select-none"
            >
              <h2 className="font-display font-bold text-[35vw] sm:text-[28vw] leading-none uppercase tracking-[-0.03em] text-[#333333] drop-shadow-2xl whitespace-nowrap">
                Signature Products
              </h2>
            </div>

            {/* Top Control Bar: Collection Label & Navigation Arrows */}
            <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-12 mb-12 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#ffffff] animate-pulse shadow-[0_0_10px_#ffffff]" />
                <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#ffffff]">
                  Signature Products · 09 Pieces
                </span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => scrollRail('left')}
                  className="w-12 h-12 rounded-full border-2 border-white/30 bg-white/10 hover:bg-white/30 flex items-center justify-center text-white/90 hover:text-white transition-all cursor-pointer backdrop-blur-md"
                  aria-label="Scroll left"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => scrollRail('right')}
                  className="w-12 h-12 rounded-full border-2 border-white/30 bg-white/10 hover:bg-white/30 flex items-center justify-center text-white/90 hover:text-white transition-all cursor-pointer backdrop-blur-md"
                  aria-label="Scroll right"
                >
                  →
                </button>
              </div>
            </div>

            {/* Horizontal Staggered Trading Cards Rail - Cards animate in one by one automatically on scroll */}
            <div
              ref={railRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={stopDragging}
              onMouseLeave={stopDragging}
              className="relative z-10 w-full overflow-x-auto no-scrollbar pt-12 pb-24 px-4 sm:px-8 md:px-12 cursor-grab active:cursor-grabbing select-none"
            >
              <div className="flex items-center gap-8 sm:gap-10 md:gap-12 min-w-max mx-auto justify-start sm:justify-center">
                {homeData.signatureMoments.map((moment, idx) => {
                  const baseOffset = (idx % 2 === 0 ? 20 : -20); // slight alternating vertical offset
                  const delayMs = idx * 120;
                  const flyInRotation = idx % 2 === 0 ? 30 : -30;
                  
                  return (
                    <div
                      key={moment._id}
                      className="shrink-0 flex flex-col items-center group cursor-pointer relative"
                      style={{
                        width: '280px',
                        flexShrink: 0,
                        transform: cardsRevealed
                          ? `translateY(${baseOffset}px) scale(1) rotate(0deg)`
                          : `translateY(${baseOffset + 800}px) scale(0.3) rotate(${flyInRotation}deg)`,
                        opacity: cardsRevealed ? 1 : 0,
                        transition: cardsRevealed
                          ? `transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.1) ${delayMs}ms, opacity 0.8s ease-out ${delayMs}ms`
                          : 'transform 0.4s ease-in, opacity 0.4s ease-in',
                        willChange: 'transform, opacity'
                      }}
                    >
                      {/* Premium Polaroid Frame */}
                      <div
                        className="relative bg-[#111111] p-3 pb-12 sm:p-4 sm:pb-16 rounded-sm shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-8 group-hover:rotate-2 z-10 group-hover:z-30 group-hover:shadow-[0_40px_80px_rgba(0,0,0,1)]"
                        style={{
                          width: '280px',
                          height: '380px'
                        }}
                      >
                        {/* Inner Image Container */}
                        <div className="w-full h-full relative overflow-hidden bg-[#000000] shadow-inner border border-white/10">
                          <img
                            src={moment.image}
                            alt={moment.title}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              display: 'block'
                            }}
                            className="pointer-events-none select-none transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>

                        {/* Corner Badge */}
                        {moment.badge && (
                          <div className="absolute top-2 left-2 z-20 px-3 py-1 bg-black text-white text-[9px] font-display font-bold uppercase tracking-widest shadow-md">
                            {moment.badge}
                          </div>
                        )}
                      </div>

                      {/* Card Title & Stat Labels below */}
                      <div className="mt-6 text-center w-full px-2" style={{ maxWidth: '300px' }}>
                        <h3 
                          className="font-display text-base sm:text-lg uppercase font-bold tracking-widest group-hover:scale-110 transition-all duration-300 truncate drop-shadow-md"
                          style={{ color: '#ffffff' }}
                        >
                          {moment.title}
                        </h3>
                        <div 
                          className="mt-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] transition-opacity"
                          style={{ color: '#ffffff', opacity: 0.9 }}
                        >
                          {moment.stat}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Audio Visualizer Pill Button in Bottom Right */}
            <button
              type="button"
              onClick={() => setIsAudioPlaying(!isAudioPlaying)}
              className="absolute bottom-6 right-6 z-30 flex items-center gap-2 px-3 py-2 rounded-full bg-[#ffffff]/90 border border-white/10 hover:border-[#ffffff]/50 backdrop-blur-md shadow-lg pointer-events-auto transition-colors cursor-pointer"
              title="Toggle audio mood"
            >
              <div className="flex items-end gap-[3px] h-3.5">
                <span className={`w-[2px] h-3 bg-white/80 ${isAudioPlaying ? 'animate-pulse' : ''}`} />
                <span className={`w-[2px] h-2 bg-white/80 ${isAudioPlaying ? 'animate-pulse' : ''}`} style={{ animationDelay: '0.2s' }} />
                <span className={`w-[2px] h-3.5 bg-white/80 ${isAudioPlaying ? 'animate-pulse' : ''}`} style={{ animationDelay: '0.4s' }} />
                <span className={`w-[2px] h-1.5 bg-white/80 ${isAudioPlaying ? 'animate-pulse' : ''}`} style={{ animationDelay: '0.1s' }} />
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#ffffff]/70 hidden sm:inline">
                {isAudioPlaying ? 'Sound On' : 'Muted'}
              </span>
            </button>
          </div>

          {/* 3. QUOTE SECTION (SLIDES UP OVER SIGNATURE MOMENTS ACCORDING TO SCROLL) */}
          <div
            className="absolute inset-0 w-full h-full z-30 flex flex-col items-center justify-center px-6 md:px-12 text-center overflow-hidden shadow-[0_-30px_90px_rgba(0,0,0,0.95)]"
            style={{
              transform: `translate3d(0, ${quoteTranslateY}%, 0)`,
              clipPath: 'polygon(0 3.5vw, 100% 0, 100% 100%, 0 100%)',
              WebkitClipPath: 'polygon(0 3.5vw, 100% 0, 100% 100%, 0 100%)',
              backgroundColor: '#000000',
              pointerEvents: quoteRiseProgress > 0.05 ? 'auto' : 'none',
              willChange: 'transform'
            }}
          >
            {/* Ambient Purple Radial Glow matching screenshot vignette */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background: 'radial-gradient(ellipse at 50% 45%, rgba(94, 53, 153, 0.35) 0%, rgba(26, 14, 48, 0.1) 55%, transparent 100%)'
              }}
            />

            {/* Quotation Marks Glyph */}
            <div
              aria-hidden="true"
              className="relative z-10 flex items-center justify-center gap-1 mb-6 sm:mb-8 select-none"
              style={{ color: 'rgba(255, 255, 255, 0.5)' }} // #ffffff with 50% opacity
            >
              <span className="font-display text-5xl sm:text-7xl md:text-8xl leading-none tracking-[0.15em] font-normal">
                {'\u201C\u201C'}
              </span>
              <span className="font-display text-5xl sm:text-7xl md:text-8xl leading-none tracking-[0.15em] font-normal ml-3">
                {'\u201D\u201D'}
              </span>
            </div>

            {/* Giant Central Display Typography */}
            <h2 
              className="relative z-10 font-display leading-[0.88] uppercase tracking-[-0.02em] max-w-6xl mx-auto select-none"
              style={{ 
                color: '#ffffff', 
                fontSize: 'clamp(32px, 7vw, 100px)',
                fontWeight: 800,
                WebkitFontSmoothing: 'antialiased'
              }}
            >
              {[
                "WE WANT PEOPLE TO",
                "REMEMBER OUR BRAND FOR",
                "MORE THAN JUST CLOTHES"
              ].map((line, lineIdx) => {
                const words = line.split(' ');
                return (
                  <span key={lineIdx} className="flex justify-center flex-wrap">
                    {words.map((word, wordIdx) => {
                      const globalIdx = lineIdx * 100 + wordIdx;
                      // Words fly in and assemble as easedQuoteRise goes from 0 to 1
                      const scatter = Math.max(0, 1 - easedQuoteRise * 1.5);
                      const randX = (pseudoRandom(globalIdx) - 0.5) * 1200; 
                      const randY = (pseudoRandom(globalIdx + 10) - 0.5) * 1200; 
                      const randRot = (pseudoRandom(globalIdx + 20) - 0.5) * 500; 

                      return (
                        <span 
                          key={wordIdx}
                          className="inline-block mb-1 sm:mb-2"
                          style={{
                            margin: '0 0.15em',
                            transform: `translate3d(${randX * scatter}px, ${randY * scatter}px, 0) rotate(${randRot * scatter}deg) scale(${1 - scatter * 0.4})`,
                            opacity: 1 - scatter * 0.9,
                            willChange: 'transform, opacity'
                          }}
                        >
                          {word}
                        </span>
                      );
                    })}
                  </span>
                );
              })}
            </h2>

            {/* Base photo removed - only animated images will show on scroll */}

            {/* 5 Animated Images coming from the bottom one by one */}
            {imagesToShow.map((item, idx) => {
              const riseVal = getPhotoRise(idx);
              // Alternate rotations for stacking effect: 3deg, -2deg, 4deg, -3deg, 1deg
              const rotations = [3, -2, 4, -3, 1];
              const rot = rotations[idx % rotations.length];
              return (
                <div
                  key={idx}
                  className="absolute z-30 pointer-events-none select-none"
                  style={{
                    top: '50%',
                    left: '50%',
                    // Starts at bottom (translateY + 100vh) and moves up to center
                    transform: `translate(-50%, calc(-50% + ${riseVal}vh)) rotate(${rot}deg)`,
                    width: 'clamp(300px, 35vw, 500px)',
                    willChange: 'transform',
                    // Only show when it starts rising
                    opacity: riseVal < 100 ? 1 : 0
                  }}
                >
                  <div
                    className="relative bg-[#111111] rounded-sm shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),0_0_20px_rgba(0,0,0,0.4)] flex flex-col"
                    style={{ 
                      padding: '16px 16px 64px 16px',
                      aspectRatio: '3/4' 
                    }}
                  >
                    <div className="w-full h-full relative overflow-hidden shadow-inner border border-white/10 bg-[#000000] flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Editorial Subtitle */}
            <div 
              className="relative z-10 mt-10 sm:mt-14 max-w-2xl mx-auto font-body text-xs sm:text-sm md:text-base leading-relaxed font-medium tracking-wide"
              style={{ color: 'rgba(255, 255, 255, 0.6)' }}
            >
              <p style={{ opacity: Math.max(0, Math.min(1, easedQuoteRise * 2 - 0.5)), transform: `translateY(${Math.max(0, 20 - easedQuoteRise * 40)}px)` }}>
                More than fabric, more than threads, more than the design itself.
              </p>
              <p className="mt-0.5" style={{ opacity: Math.max(0, Math.min(1, easedQuoteRise * 2 - 0.7)), transform: `translateY(${Math.max(0, 20 - easedQuoteRise * 40)}px)` }}>
                Writing a story that outlasts every trend, every season, every era.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* 4 & 4.5. JS-DRIVEN OVERLAPPING GALLERY & VIDEO SECTION */}
      <div className="relative w-full bg-[#000000]">
        
        {/* ANCHOR: Tracks natural scroll position of the gallery independently of the video */}
        <div ref={galleryAnchorRef} className="w-full z-10">
          {/* CONTENT: Translates down to stay pinned */}
          <div style={{ transform: `translateY(${galleryTranslateY}px)`, willChange: 'transform' }}>
            <GalleryView />
          </div>
        </div>

        {/* Video glides up naturally over the pinned gallery */}
        <div className="relative z-20 shadow-[0_-40px_100px_rgba(0,0,0,1)] bg-black">
          <PremiumVideo />
        </div>
        
      </div>

      {/* 6. PREMIUM CONTACT US */}
      <PremiumContact />

      {/* 7. FINAL PREMIUM FOOTER */}
      <FinalFooter />
    </div>
  );
};
