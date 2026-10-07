import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface GalleryIntroProps {
  onComplete: () => void;
}

interface TextPiece {
  sx: number; // Source X in offscreen canvas
  sy: number; // Source Y in offscreen canvas
  sw: number; // Width
  sh: number; // Height
  tx: number; // Target X on screen
  ty: number; // Target Y on screen
  startX: number; // Scattered Start X
  startY: number; // Scattered Start Y
  startRot: number; // Scattered Start Rotation (radians)
  startScale: number; // Scattered Start Scale
  delay: number; // Staggered start delay (0 - 0.4s)
  duration: number; // Duration of flight
}

export const GalleryIntro: React.FC<GalleryIntroProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameIdRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const isTransitioningOutRef = useRef<boolean>(false);

  const [phase, setPhase] = useState<'assembling' | 'combined' | 'exiting'>('assembling');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let pieces: TextPiece[] = [];
    let offscreenCanvas: HTMLCanvasElement | null = null;
    let textWidth = 0;
    let textHeight = 0;
    let textX = 0;
    let textY = 0;

    const createTextPieces = () => {
      // Create high-res offscreen canvas for rendering the pure sentence
      offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = width;
      offscreenCanvas.height = height;
      const offCtx = offscreenCanvas.getContext('2d', { willReadFrequently: true });
      if (!offCtx) return;

      offCtx.clearRect(0, 0, width, height);

      // Sentence to combine:
      const sentence = 'WELCOME TO THE MAISON JJETTAS GALLERY ARCHIVE';

      // Responsive font size
      const fontSize = Math.min(Math.max(width * 0.038, 20), 44);
      offCtx.font = `800 ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif`;
      offCtx.fillStyle = '#ffffff';
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';

      // Measure text
      const metrics = offCtx.measureText(sentence);
      textWidth = metrics.width + 40;
      textHeight = fontSize * 1.8;

      textX = width / 2;
      textY = height / 2;

      // Draw the complete sentence onto offscreen canvas
      offCtx.fillText(sentence, textX, textY);

      // Analyze bounding box and slice into small pieces
      const boxLeft = Math.max(0, Math.floor(textX - textWidth / 2));
      const boxTop = Math.max(0, Math.floor(textY - textHeight / 2));
      const boxW = Math.min(width - boxLeft, Math.ceil(textWidth));
      const boxH = Math.min(height - boxTop, Math.ceil(textHeight));

      const imgData = offCtx.getImageData(boxLeft, boxTop, boxW, boxH);
      const data = imgData.data;

      // Slice grid: e.g. piece size roughly 14px x 14px
      const pieceW = Math.max(12, Math.floor(fontSize * 0.42));
      const pieceH = Math.max(12, Math.floor(fontSize * 0.45));

      const generatedPieces: TextPiece[] = [];

      for (let y = 0; y < boxH; y += pieceH) {
        for (let x = 0; x < boxW; x += pieceW) {
          const sw = Math.min(pieceW, boxW - x);
          const sh = Math.min(pieceH, boxH - y);

          // Check if this piece actually contains text pixels (alpha > 50)
          let hasContent = false;
          for (let py = 0; py < sh; py += 2) {
            for (let px = 0; px < sw; px += 2) {
              const pIdx = ((y + py) * boxW + (x + px)) * 4;
              if (data[pIdx + 3] > 60) {
                hasContent = true;
                break;
              }
            }
            if (hasContent) break;
          }

          if (hasContent) {
            const actualSourceX = boxLeft + x;
            const actualSourceY = boxTop + y;

            // Start position: scattered all across the screen (small pieces coming from everywhere)
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.max(width, height) * (0.35 + Math.random() * 0.65);
            const startX = width / 2 + Math.cos(angle) * dist;
            const startY = height / 2 + Math.sin(angle) * dist;

            generatedPieces.push({
              sx: actualSourceX,
              sy: actualSourceY,
              sw,
              sh,
              tx: actualSourceX,
              ty: actualSourceY,
              startX,
              startY,
              startRot: (Math.random() - 0.5) * Math.PI * 2.5,
              startScale: 0.2 + Math.random() * 0.35,
              delay: Math.random() * 0.35, // organic staggered launch
              duration: 1.8 + Math.random() * 0.4,
            });
          }
        }
      }

      pieces = generatedPieces;
    };

    createTextPieces();
    startTimeRef.current = performance.now();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createTextPieces();
      startTimeRef.current = performance.now();
    };
    window.addEventListener('resize', handleResize);

    // Easing function: smooth quartic ease out
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTimeRef.current) / 1000; // in seconds

      // PURE SOLID BLACK BACKGROUND — NO NOISE, NO STATIC
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // Phase timing:
      // 0s to 2.2s: Small pieces coming and assembling
      // 2.2s to 3.5s: Combined text holds, sheen wave passes
      // 3.5s onwards: Transition into gallery

      if (elapsed >= 2.2 && elapsed < 3.5) {
        if (phase !== 'combined') setPhase('combined');
      } else if (elapsed >= 3.5) {
        if (!isTransitioningOutRef.current) {
          isTransitioningOutRef.current = true;
          setPhase('exiting');
          setTimeout(() => {
            onComplete();
          }, 600);
        }
      }

      if (elapsed < 2.3) {
        // DRAW FLYING PIECES ASSEMBLING INTO THE SENTENCE
        for (let i = 0; i < pieces.length; i++) {
          const p = pieces[i];
          const localElapsed = Math.max(0, elapsed - p.delay);
          const rawProgress = Math.min(localElapsed / p.duration, 1);
          const progress = easeOutQuart(rawProgress);

          const curX = p.startX + (p.tx - p.startX) * progress;
          const curY = p.startY + (p.ty - p.startY) * progress;
          const curRot = p.startRot * (1 - progress);
          const curScale = p.startScale + (1.0 - p.startScale) * progress;
          const curAlpha = Math.min(1, 0.15 + progress * 0.85);

          ctx.save();
          ctx.globalAlpha = curAlpha;
          ctx.translate(curX + p.sw / 2, curY + p.sh / 2);
          if (curRot !== 0) ctx.rotate(curRot);
          if (curScale !== 1) ctx.scale(curScale, curScale);

          if (offscreenCanvas) {
            ctx.drawImage(
              offscreenCanvas,
              p.sx,
              p.sy,
              p.sw,
              p.sh,
              -p.sw / 2,
              -p.sh / 2,
              p.sw,
              p.sh
            );
          }
          ctx.restore();
        }
      } else {
        // ONCE COMBINED: DRAW THE PERFECT UNIFIED CRISP SENTENCE
        if (offscreenCanvas) {
          ctx.save();
          ctx.globalAlpha = phase === 'exiting' ? 0.3 : 1;
          ctx.drawImage(offscreenCanvas, 0, 0);
          ctx.restore();

          // Subtle luxury light sheen sweeping across the combined sentence
          if (elapsed >= 2.3 && elapsed <= 3.3) {
            const sheenProgress = (elapsed - 2.3) / 1.0;
            const sheenX = textX - textWidth / 2 + sheenProgress * (textWidth + 200) - 100;

            const grad = ctx.createLinearGradient(sheenX - 60, 0, sheenX + 60, 0);
            grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
            grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.45)');
            grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.save();
            ctx.fillStyle = grad;
            ctx.globalCompositeOperation = 'lighter';
            ctx.fillRect(sheenX - 60, textY - textHeight, 120, textHeight * 2);
            ctx.restore();
          }
        }
      }

      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [onComplete]);

  const handleSkip = () => {
    if (isTransitioningOutRef.current) return;
    isTransitioningOutRef.current = true;
    setPhase('exiting');
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'exiting' ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[999] bg-[#000000] flex flex-col justify-between select-none overflow-hidden"
    >
      {/* 1. MINIMALIST TOP BAR */}
      <header className="relative z-20 flex items-center justify-between px-6 md:px-12 pt-8">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-[11px] font-mono tracking-[0.28em] uppercase text-white/70">
            MAISON JJETTAS // ARCHIVE
          </span>
        </div>

        <button
          onClick={handleSkip}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black text-white text-[11px] font-mono tracking-[0.2em] uppercase transition-all duration-300"
        >
          <span>ENTER GALLERY</span>
          <span>↗</span>
        </button>
      </header>

      {/* 2. PURE BLACK CANVAS STAGE (NO NOISE / NO GRAIN) */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block bg-[#000000]" />
      </div>

      {/* 3. MINIMALIST BOTTOM STATUS */}
      <footer className="relative z-20 px-6 md:px-12 pb-8 flex items-center justify-between">
        <span className="text-[10px] md:text-[11px] font-mono tracking-[0.25em] uppercase text-white/50">
          {phase === 'assembling'
            ? 'ASSEMBLING ARCHIVAL STATEMENT...'
            : phase === 'combined'
            ? 'STATEMENT COMBINED · REVEALING GALLERY'
            : 'ENTERING GALLERY...'}
        </span>

        <span className="text-[10px] md:text-[11px] font-mono tracking-[0.25em] uppercase text-white/40">
          27 ARTIFACTS LOADED
        </span>
      </footer>
    </motion.div>
  );
};
