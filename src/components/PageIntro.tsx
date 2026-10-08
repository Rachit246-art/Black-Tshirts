import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export interface PageIntroProps {
  sentence: string;
  categoryLabel?: string;
  enterButtonText?: string;
  statusText?: string;
  subMeta?: string;
  onComplete: () => void;
}

interface TextPiece {
  sx: number;
  sy: number;
  sw: number;
  sh: number;
  tx: number;
  ty: number;
  startX: number;
  startY: number;
  startRot: number;
  startScale: number;
  delay: number;
  duration: number;
}

export const PageIntro: React.FC<PageIntroProps> = ({
  sentence,
  categoryLabel = 'MAISON JJETTAS // ATELIER',
  enterButtonText = 'ENTER PAGE',
  statusText = 'ASSEMBLING ARCHIVAL STATEMENT...',
  subMeta = 'AUTHENTICATED SYSTEM',
  onComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameIdRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const isTransitioningOutRef = useRef<boolean>(false);

  const [phase, setPhase] = useState<'assembling' | 'combined' | 'exiting'>('assembling');

  useEffect(() => {
    let isActive = true;
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
      offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = width;
      offscreenCanvas.height = height;
      const offCtx = offscreenCanvas.getContext('2d', { willReadFrequently: true });
      if (!offCtx) return;

      offCtx.clearRect(0, 0, width, height);

      // Responsive font size calibrated for full sentences
      const charCount = sentence.length;
      let calculatedFontSize = Math.floor((width * 0.82) / (charCount * 0.58));
      const fontSize = Math.min(Math.max(calculatedFontSize, 15), 42);

      offCtx.font = `900 ${fontSize}px "beachwood-variable", "Helvetica Neue", Arial, sans-serif`;
      offCtx.fillStyle = '#737373';
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';

      const metrics = offCtx.measureText(sentence);
      textWidth = metrics.width + 40;
      textHeight = fontSize * 1.8;

      textX = width / 2;
      textY = height / 2;

      offCtx.fillText(sentence, textX, textY);

      const boxLeft = Math.max(0, Math.floor(textX - textWidth / 2));
      const boxTop = Math.max(0, Math.floor(textY - textHeight / 2));
      const boxW = Math.min(width - boxLeft, Math.ceil(textWidth));
      const boxH = Math.min(height - boxTop, Math.ceil(textHeight));

      const imgData = offCtx.getImageData(boxLeft, boxTop, boxW, boxH);
      const data = imgData.data;

      const pieceW = Math.max(12, Math.floor(fontSize * 0.42));
      const pieceH = Math.max(12, Math.floor(fontSize * 0.45));

      const generatedPieces: TextPiece[] = [];

      for (let y = 0; y < boxH; y += pieceH) {
        for (let x = 0; x < boxW; x += pieceW) {
          const sw = Math.min(pieceW, boxW - x);
          const sh = Math.min(pieceH, boxH - y);

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
              delay: Math.random() * 0.35,
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

    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTimeRef.current) / 1000;

      // Pure solid black background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // Animation timings:
      // 0s to 2.2s: Assembly flight
      // 2.2s to 3.5s: Hold combined text with sweeping sheen
      // 3.5s onwards: Smooth exit
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
        if (offscreenCanvas) {
          ctx.save();
          ctx.globalAlpha = phase === 'exiting' ? 0.3 : 1;
          ctx.drawImage(offscreenCanvas, 0, 0);
          ctx.restore();

          // Luxury light sheen sweeping across assembled text
          if (elapsed >= 2.3 && elapsed <= 3.3) {
            const sheenProgress = (elapsed - 2.3) / 1.0;
            const sheenX = textX - textWidth / 2 + sheenProgress * (textWidth + 200) - 100;

            const grad = ctx.createLinearGradient(sheenX - 60, 0, sheenX + 60, 0);
            grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
            grad.addColorStop(0.5, 'rgba(255, 255, 255, 1)');
            grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.save();
            ctx.globalCompositeOperation = 'source-atop';
            ctx.fillStyle = grad;
            ctx.fillRect(sheenX - 60, textY - textHeight, 120, textHeight * 2);
            ctx.restore();
          }
        }
      }

      if (isActive) {
        animFrameIdRef.current = requestAnimationFrame(animate);
      }
    };

    if (isActive) {
      animFrameIdRef.current = requestAnimationFrame(animate);
    }

    return () => {
      isActive = false;
      cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      className="page-intro-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        backgroundColor: '#000000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        userSelect: 'none',
        overflow: 'hidden',
      }}
    >
      {/* 1. Top Header */}
      <header className="page-intro-header">
        <div className="page-intro-badge-wrap">
          <span className="page-intro-pulse-dot" />
          <span className="page-intro-badge-label">
            {categoryLabel}
          </span>
        </div>

        <button
          type="button"
          onClick={handleSkip}
          className="page-intro-skip-btn"
        >
          <span>{enterButtonText}</span>
          <span>↗</span>
        </button>
      </header>

      {/* 2. Pure Black Canvas Stage */}
      <div className="page-intro-canvas-container">
        <canvas ref={canvasRef} className="page-intro-canvas" />
      </div>

      {/* 3. Bottom Status Bar */}
      <footer className="page-intro-footer">
        <span className="page-intro-status-text">
          {phase === 'assembling'
            ? statusText
            : phase === 'combined'
            ? 'STATEMENT COMBINED · REVEALING ATELIER'
            : 'ENTERING ATELIER...'}
        </span>

        <span className="page-intro-meta-text">
          {subMeta}
        </span>
      </footer>
    </motion.div>
  );
};
