import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

export const Globe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 1000,
      height: 1000,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [1, 1, 1],
      glowColor: [0.1, 0.1, 0.1],
      markers: [
        { location: [48.8566, 2.3522], size: 0.05 }, // Paris
        { location: [35.6762, 139.6503], size: 0.05 }, // Tokyo
        { location: [51.5074, -0.1278], size: 0.05 }, // London
        { location: [40.7128, -74.006], size: 0.05 }, // New York
        { location: [41.1579, -8.6291], size: 0.1 }, // Porto
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.005;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 600,
        aspectRatio: 1,
        margin: 'auto',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab',
          contain: 'layout paint size',
          opacity: 1,
          transition: 'opacity 1s ease',
        }}
      />
      
      {/* Decorative Overlay for the Globe */}
      <div className="absolute inset-0 pointer-events-none rounded-full" style={{ boxShadow: 'inset 0 0 50px rgba(0,0,0,0.9)' }} />
    </div>
  );
};
