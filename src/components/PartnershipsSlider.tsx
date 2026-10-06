import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 0,
    title: "Slide One",
    description: "The signature partnership. Custom game-day cleats, design sessions at headquarters, and a say in where the footwear goes next.",
    image: "/real image/gallery-1.jfif"
  },
  {
    id: 1,
    title: "Slide Two",
    description: "Long-running hydration partner, with massive campaigns, sideline visibility, and a recurring slot in their game-day rotation.",
    image: "/real image/gallery-2.jfif"
  },
  {
    id: 2,
    title: "Slide Three",
    description: "National campaigns — suiting up in the gladiator arena alongside Megan Thee Stallion and crashing tailgates.",
    image: "/real image/gallery-3.jfif"
  },
  {
    id: 3,
    title: "Slide Four",
    description: "Exclusive partnership deals setting the tone for fashion and on-field swagger, elevating the brand completely.",
    image: "/real image/gallery-4.jfif"
  },
  {
    id: 4,
    title: "Slide Five",
    description: "Bringing the heat with exclusive releases and limited edition drops that keep the fans guessing what's next.",
    image: "/real image/gallery-5.jfif"
  }
];

export const PartnershipsSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-advance slides every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#0d0914] flex flex-col justify-center text-[#f4efe6] py-20">
      {/* Background Pebble Texture */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'url(/textures/pebble.webp)',
          backgroundSize: '250px'
        }}
      />

      {/* Giant Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <h2 
          className="font-display text-[clamp(80px,18vw,300px)] uppercase tracking-tight leading-none text-center w-full"
          style={{
            color: '#2a1645',
            opacity: 0.8
          }}
        >
          PARTNERSHIPS
        </h2>
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 flex-1 flex flex-col justify-center pb-20">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-12 lg:gap-8">
          
          {/* Left Column: Dots + Text */}
          <div className="flex items-center gap-6 lg:gap-10 w-full lg:w-1/3 order-2 lg:order-1 relative z-20">
            {/* Pagination Dots */}
            <div className="flex flex-col gap-3">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`w-[4px] rounded-full transition-all duration-300 ${activeSlide === idx ? 'h-10 bg-white' : 'h-2 bg-white/20 hover:bg-white/50'}`}
                />
              ))}
            </div>
            
            {/* Slide Text Content */}
            <div className="flex-1 relative h-[140px] lg:h-[180px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <h3 className="font-display text-3xl md:text-4xl font-bold mb-4 text-white">
                    {slides[activeSlide].title}
                  </h3>
                  <p className="font-body text-sm md:text-base text-[#d4c8b8]/70 leading-relaxed font-medium max-w-sm">
                    {slides[activeSlide].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Center Column: Image */}
          <div className="w-full lg:w-1/3 flex items-center justify-center order-1 lg:order-2 relative z-10 h-[400px] sm:h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute"
              >
                {/* Standard Polaroid styling with correct containment */}
                <div
                  className="relative bg-[#f4efe6] rounded-sm shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9),0_0_20px_rgba(0,0,0,0.5)] flex flex-col"
                  style={{ 
                    padding: '16px 16px 64px 16px',
                    width: 'clamp(280px, 35vw, 450px)',
                    aspectRatio: '4/5' 
                  }}
                >
                  <div className="w-full h-full relative overflow-hidden shadow-inner border border-black/10 bg-[#f4efe6] flex items-center justify-center">
                    <img
                      src={slides[activeSlide].image}
                      alt={slides[activeSlide].title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: View All Button */}
          <div className="w-full lg:w-1/3 flex items-center justify-center lg:justify-end order-3 relative z-20">
            <button className="bg-[#f4efe6] text-[#171220] font-display font-bold uppercase tracking-[0.2em] text-sm px-10 py-5 rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl">
              View All
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Logos Marquee Area */}
      <div className="absolute bottom-0 left-0 w-full border-t border-[#f4efe6]/10 py-6 lg:py-8 z-20 bg-[#0d0914]/80 backdrop-blur-sm">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center opacity-50 font-display font-bold text-sm sm:text-lg md:text-xl tracking-[0.2em] uppercase whitespace-nowrap overflow-hidden">
          <span className="px-4">Oakley</span>
          <span className="px-4">Cane's</span>
          <span className="px-4">Beats</span>
          <span className="px-4">Lowe's</span>
          <span className="px-4">US Bank</span>
          <span className="px-4 hidden sm:block">EA Sports</span>
        </div>
      </div>
    </div>
  );
};
