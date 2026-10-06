import React, { useEffect, useRef, useState } from 'react';

interface IntroVideoProps {
  onComplete: () => void;
}

export const IntroVideo: React.FC<IntroVideoProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure DOM properties are explicitly set for browser autoplay compliance
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    const attemptPlay = () => {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.warn('Autoplay waiting for user gesture:', err);
            setIsPlaying(false);
          });
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('playing', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('timeupdate', handleTimeUpdate);

    if (video.readyState >= 2) {
      attemptPlay();
    } else {
      video.addEventListener('canplay', attemptPlay, { once: true });
      video.addEventListener('loadeddata', attemptPlay, { once: true });
    }

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('playing', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const handleFinish = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 700);
  };

  const handleManualPlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(console.error);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const VIDEO_FILENAME = 'Model_showcasing_black_graphic_t\u2026_20261006170258.mp4';
  const videoSrc = `/video/${encodeURIComponent(VIDEO_FILENAME)}`;

  return (
    <div
      className={`fixed inset-0 z-[95] flex items-center justify-center bg-[#000000] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isExiting ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
      aria-label="Editorial intro video"
      onClick={handleManualPlay}
    >
      {/* Background Video Element with direct source */}
      <video
        ref={videoRef}
        src={videoSrc}
        playsInline
        autoPlay
        muted
        preload="auto"
        onEnded={handleFinish}
        className="w-full h-full object-cover select-none cursor-pointer"
      >
        <source src={videoSrc} type="video/mp4" />
        <source src={`/video/${VIDEO_FILENAME}`} type="video/mp4" />
      </video>

      {/* Cinematic subtle edge vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40"
      />

      {/* Play prompt overlay if browser blocked autoplay */}
      {!isPlaying && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-none">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#ffffff] bg-black/70 flex items-center justify-center text-[#ffffff] text-2xl sm:text-3xl pl-1 shadow-[0_0_30px_rgba(212,162,74,0.5)] animate-pulse">
            ▶
          </div>
          <span className="mt-4 font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#ffffff]">
            Click anywhere to play film
          </span>
        </div>
      )}

      {/* Top Header Information & Controls */}
      <div className="absolute top-6 inset-x-6 sm:inset-x-12 z-20 flex items-center justify-between pointer-events-auto">
        {/* Left: Film Reel Label */}
        <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/90">
          <span className={`w-2 h-2 rounded-full bg-[#ffffff] ${isPlaying ? 'animate-pulse' : ''}`} />
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em]">
            Justin Jefferson · Film
          </span>
        </div>

        {/* Right: Sound Toggle & Skip Action */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleSound}
            className="px-3.5 py-1.5 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/15 text-white/80 hover:text-white font-mono text-[10px] sm:text-xs uppercase tracking-widest transition-all"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? 'Sound Off 🔇' : 'Sound On 🔊'}
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleFinish();
            }}
            className="group px-4 py-1.5 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 backdrop-blur-md border border-white/25 text-[#ffffff] font-mono text-[10px] sm:text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg"
          >
            <span>Skip</span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </button>
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 inset-x-0 z-20 h-1 bg-white/15">
        <div
          className="h-full bg-[#ffffff] transition-all duration-100 ease-linear shadow-[0_0_8px_#ffffff]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
