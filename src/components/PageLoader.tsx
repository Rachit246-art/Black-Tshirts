import React, { useEffect, useState } from 'react';

interface PageLoaderProps {
  onComplete?: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    // Smooth progress animation 0 -> 100%
    const startTime = performance.now();
    const duration = 1400; // 1.4 seconds smooth editorial loader

    const update = (time: number) => {
      const elapsed = time - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(rawProgress);

      if (elapsed < duration) {
        requestAnimationFrame(update);
      } else {
        setProgress(100);
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(() => {
            setIsRemoved(true);
            onComplete?.();
          }, 650);
        }, 200);
      }
    };

    requestAnimationFrame(update);
  }, [onComplete]);

  if (isRemoved) return null;

  // The fill height in viewBox coordinates (0 to 43)
  const clipHeight = (progress / 100) * 43;
  const clipY = 43 - clipHeight;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden transition-transform duration-[650ms] ${
        isFinished ? '-translate-y-full ease-in-out' : 'translate-y-0'
      }`}
      style={{
        backgroundColor: '#000000'
      }}
      aria-label="Loading site"
    >
      <div className="relative z-10 flex flex-col items-center">
        {/* Justin Jefferson Monogram Logo with animated bottom-to-top fill */}
        <div className="relative">
          <svg
            viewBox="0 0 37 43"
            xmlns="http://www.w3.org/2000/svg"
            className="h-28 w-auto md:h-36"
            role="img"
            aria-label="Justin Jefferson"
          >
            <defs>
              <clipPath id="home-loader-clip">
                <path d="M27.9271 35.2244L28.9161 42.818L18.486 35.4071L7.90283 42.9264L8.88835 35.3355L18.4858 28.5164L27.9271 35.2244Z" />
                <path d="M15.4903 23.3423L0 34.2789L1.75369 20.6774L7.34806 16.7187L6.74483 23.1164L10.9979 20.1124L13.1327 3.79814L18.5 0L15.4903 23.3423Z" />
                <path d="M23.8673 3.79814L26.0021 20.1124L30.2552 23.1164L29.6519 16.7187L35.2463 20.6774L37 34.2789L21.5097 23.3423L18.5 0L23.8673 3.79814Z" />
              </clipPath>
            </defs>

            {/* Faint base outline */}
            <g fill="#F6F3EF" opacity="0.18">
              <path d="M27.9271 35.2244L28.9161 42.818L18.486 35.4071L7.90283 42.9264L8.88835 35.3355L18.4858 28.5164L27.9271 35.2244Z" />
              <path d="M15.4903 23.3423L0 34.2789L1.75369 20.6774L7.34806 16.7187L6.74483 23.1164L10.9979 20.1124L13.1327 3.79814L18.5 0L15.4903 23.3423Z" />
              <path d="M23.8673 3.79814L26.0021 20.1124L30.2552 23.1164L29.6519 16.7187L35.2463 20.6774L37 34.2789L21.5097 23.3423L18.5 0L23.8673 3.79814Z" />
            </g>

            {/* Filled progress rect clipped to logo */}
            <rect
              x="0"
              y={clipY}
              width="37"
              height={clipHeight}
              fill="#F6F3EF"
              clipPath="url(#home-loader-clip)"
              className="transition-[y,height] duration-75 ease-linear"
            />
          </svg>
        </div>

        {/* Minimal percentage indicator */}
        <div
          className="mt-6 text-xs tabular-nums tracking-widest text-[#F6F3EF]/70 md:text-sm font-mono"
        >
          {progress}%
        </div>
      </div>
    </div>
  );
};
