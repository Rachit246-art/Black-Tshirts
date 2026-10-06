import React, { useRef, useState, useEffect } from 'react';
import { homeData } from '../data/homeData';

export const Home: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cardsRevealed, setCardsRevealed] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);
  const stageTrackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
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
      className="relative w-full bg-[#d3c8ba] text-[#171220] selection:bg-[#171220] selection:text-[#f4efe6]"
      style={{ overflowX: 'clip' }}
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
                <span className="font-display text-[22vw] leading-none tracking-[-0.03em] uppercase text-[#171220] pr-12">
                  JUSTIN JEFFERSON · JUSTIN JEFFERSON ·
                </span>
              </div>
              <div className="animate-marquee-right flex whitespace-nowrap -mt-[5vw]">
                <span className="font-display text-[22vw] leading-none tracking-[-0.03em] uppercase text-[#171220] pr-12">
                  #18 VIKINGS · ALL-PRO · #18 VIKINGS ·
                </span>
              </div>
            </div>

            {/* Central Portrait Cutout */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center items-end h-[68vh] sm:h-[72vh]">
              <img
                src="/3d-hero/hero-portrait-mobile.webp"
                alt="Justin Jefferson"
                className="h-full w-auto max-w-none object-contain drop-shadow-2xl"
              />
            </div>

            {/* Top Header Label */}
            <div className="relative z-20 max-w-7xl mx-auto w-full flex items-center justify-between">
              <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#171220]/70 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4f2bab]" />
                From St. Rose to Minneapolis
              </div>
              <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#171220]/70">
                Minnesota Vikings #18
              </div>
            </div>

            {/* Middle / Bottom Editorial Statements flanking the cutout */}
            <div className="relative z-20 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-end mt-auto pt-48 pb-4">
              {/* Left Column: Peach Bowl Preview Card & Statement */}
              <div className="md:col-span-4 flex flex-col gap-6">
                <div className="p-4 sm:p-5 rounded-sm bg-[#171220]/90 text-[#f4efe6] backdrop-blur-md max-w-xs shadow-2xl border border-[#171220]/20">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#d4a24a] block mb-1">
                    Moment 01 · 2019 Peach Bowl
                  </span>
                  <div className="font-display text-xl uppercase tracking-tight">
                    The Peach Bowl
                  </div>
                  <div className="font-numono text-xs text-[#d4a24a] mt-1">
                    14 REC · 227 YDS · 4 TD
                  </div>
                </div>

                <p className="font-body text-xs sm:text-sm text-[#171220]/80 leading-relaxed max-w-xs font-medium">
                  Every move Justin makes carries intention, style, and a story you don't see on the field.
                </p>
              </div>

              {/* Center spacer for cutout */}
              <div className="hidden md:block md:col-span-4" />

              {/* Right Column: Unusually spaced character typography & Statement */}
              <div className="md:col-span-4 flex flex-col items-start md:items-end text-left md:text-right">
                <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#171220]/80 leading-loose max-w-xs">
                  F r o m &nbsp; a &nbsp; S t . &nbsp; R o s e , &nbsp; L o u i s i a n a &nbsp; t o &nbsp; t h e &nbsp; M e t &nbsp; G a l a &nbsp; r u n w a y .
                </div>
                <div className="mt-4 text-xs font-mono text-[#171220]/60 uppercase tracking-widest">
                  Scroll to explore ↓
                </div>
              </div>
            </div>
          </section>

          {/* 2. SIGNATURE MOMENTS SECTION (RISES UP OVER HERO ACCORDING TO SCROLL) */}
          <div
            className="absolute inset-0 w-full h-full z-20 flex flex-col justify-center bg-[#0b0a0f] text-[#f4efe6] overflow-hidden shadow-[0_-30px_90px_rgba(0,0,0,0.95)]"
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

            {/* Giant Purple Display Watermark: SIGNATURE MOMENTS */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-10 sm:top-14 z-0 flex justify-center overflow-hidden opacity-30 select-none"
            >
              <h2 className="font-display text-[14vw] sm:text-[12vw] leading-none uppercase tracking-[-0.03em] text-[#563b80]">
                Signature Moments
              </h2>
            </div>

            {/* Top Control Bar: Collection Label & Navigation Arrows */}
            <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-12 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#d4a24a] animate-pulse" />
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#d4a24a]">
                  Signature Moments · 05 Collectibles
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollRail('left')}
                  className="w-8 h-8 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                  aria-label="Scroll left"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => scrollRail('right')}
                  className="w-8 h-8 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
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
              className="relative z-10 w-full overflow-x-auto no-scrollbar pt-2 pb-6 px-4 sm:px-8 md:px-12 cursor-grab active:cursor-grabbing select-none"
            >
              <div className="flex items-center gap-4 sm:gap-6 md:gap-7 min-w-max mx-auto justify-start sm:justify-center">
                {homeData.signatureMoments.map((moment, idx) => {
                  const baseOffset = cardOffsetsPx[idx];
                  const delayMs = idx * 160;
                  return (
                    <div
                      key={moment._id}
                      className="shrink-0 flex flex-col items-center group cursor-pointer"
                      style={{
                        width: '210px',
                        flexShrink: 0,
                        transform: cardsRevealed
                          ? `translateY(${baseOffset}px) scale(1)`
                          : `translateY(${baseOffset + 180}px) scale(0.90)`,
                        opacity: cardsRevealed ? 1 : 0,
                        transition: cardsRevealed
                          ? `transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, opacity 0.75s ease-out ${delayMs}ms`
                          : 'transform 0.35s ease-out, opacity 0.35s ease-out',
                        willChange: 'transform, opacity'
                      }}
                    >
                      {/* 3D Gold Collectible Card Box - Exact 210px x 308px (Zero Cutting) */}
                      <div
                        className="relative rounded-xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.85)] border-[2px] border-[#d4a24a] bg-[#0b0a0f] transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-2 group-hover:shadow-[0_20px_45px_rgba(212,162,74,0.4)]"
                        style={{
                          width: '210px',
                          height: '308px',
                          position: 'relative'
                        }}
                      >
                        <img
                          src={moment.image}
                          alt={moment.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            display: 'block'
                          }}
                          className="pointer-events-none select-none"
                          loading="lazy"
                        />

                        {/* Corner Badge */}
                        {moment.badge && (
                          <div className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-[#d4a24a]/50 text-[8px] font-mono uppercase tracking-wider text-[#d4a24a]">
                            {moment.badge}
                          </div>
                        )}

                        {/* Holographic Foil Reflection */}
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 opacity-60 group-hover:opacity-90 bg-gradient-to-tr from-transparent via-white/20 to-transparent mix-blend-screen transition-opacity duration-300"
                        />
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20"
                        />
                      </div>

                      {/* Card Title & Stat Labels below */}
                      <div className="mt-3 text-center w-full px-1" style={{ maxWidth: '210px' }}>
                        <h3 className="font-display text-xs sm:text-sm uppercase tracking-wider text-[#f4efe6] group-hover:text-[#d4a24a] transition-colors truncate">
                          {moment.title}
                        </h3>
                        <p className="font-numono text-[10px] sm:text-[11px] text-[#d4a24a] tracking-widest mt-0.5">
                          {moment.stat}
                        </p>
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
              className="absolute bottom-6 right-6 z-30 flex items-center gap-2 px-3 py-2 rounded-full bg-[#171220]/90 border border-white/10 hover:border-[#d4a24a]/50 backdrop-blur-md shadow-lg pointer-events-auto transition-colors cursor-pointer"
              title="Toggle audio mood"
            >
              <div className="flex items-end gap-[3px] h-3.5">
                <span className={`w-[2px] h-3 bg-white/80 ${isAudioPlaying ? 'animate-pulse' : ''}`} />
                <span className={`w-[2px] h-2 bg-white/80 ${isAudioPlaying ? 'animate-pulse' : ''}`} style={{ animationDelay: '0.2s' }} />
                <span className={`w-[2px] h-3.5 bg-white/80 ${isAudioPlaying ? 'animate-pulse' : ''}`} style={{ animationDelay: '0.4s' }} />
                <span className={`w-[2px] h-1.5 bg-white/80 ${isAudioPlaying ? 'animate-pulse' : ''}`} style={{ animationDelay: '0.1s' }} />
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#f4efe6]/70 hidden sm:inline">
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
              backgroundColor: '#1a0e30',
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
              style={{ color: 'rgba(212, 200, 184, 0.5)' }} // #d4c8b8 with 50% opacity
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
                color: '#d4c8b8', 
                fontSize: 'clamp(42px, 8vw, 120px)',
                fontWeight: 800,
                WebkitFontSmoothing: 'antialiased'
              }}
            >
              <span className="block">
                I WANT PEOPLE TO
              </span>
              <span className="block">
                REMEMBER ME FOR
              </span>
              <span className="block">
                MORE THAN FOOTBALL
              </span>
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
                    width: 'clamp(240px, 28vw, 380px)',
                    willChange: 'transform',
                    // Only show when it starts rising
                    opacity: riseVal < 100 ? 1 : 0
                  }}
                >
                  <div
                    className="relative bg-[#f0e4d4] p-[6px] sm:p-2 shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
                    style={{ aspectRatio: '3/4' }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              );
            })}

            {/* Editorial Subtitle */}
            <div 
              className="relative z-10 mt-10 sm:mt-14 max-w-xl mx-auto font-body text-xs sm:text-sm md:text-base leading-relaxed font-medium tracking-wide"
              style={{ color: 'rgba(212, 200, 184, 0.6)' }}
            >
              <p>More than routes, more than records, more than the game itself.</p>
              <p className="mt-0.5">Writing a story that outlasts every snap, every season, every era.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
