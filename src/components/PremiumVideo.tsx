import React, { useRef, useEffect } from 'react';

export const PremiumVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section 
      className="relative w-full overflow-hidden flex items-center justify-center bg-black"
      style={{ minHeight: '100vh' }}
    >
      <video
        ref={videoRef}
        src="/video.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-contain z-10"
      />

      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center">
        <h2 
          className="font-display uppercase font-black text-white mix-blend-overlay"
          style={{ 
            fontSize: 'clamp(3rem, 10vw, 10rem)', 
            letterSpacing: '0.1em',
            textShadow: '0 10px 40px rgba(0,0,0,0.8)' 
          }}
        >
          THE VISION
        </h2>
      </div>
    </section>
  );
};
