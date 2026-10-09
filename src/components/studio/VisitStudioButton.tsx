import React from 'react';
import { useNavigate } from 'react-router-dom';

export const VisitStudioButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <button 
      onClick={() => navigate('/studio')}
      className="group relative flex items-center justify-center px-6 py-2.5 transition-transform duration-300 hover:scale-[1.03] pointer-events-auto shadow-2xl"
      style={{
        // Cyberpunk angled cuts on top-left and bottom-right
        clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)'
      }}
    >
      {/* Guaranteed Red Background */}
      <div 
        className="absolute inset-0 z-0 transition-colors duration-300 group-hover:bg-white" 
        style={{ backgroundColor: '#e50000' }} 
      />
      
      {/* Subtle tech stripes that appear on hover */}
      <div 
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" 
        style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, #000 2px, #000 4px)' }} 
      />

      {/* Button Content */}
      <div className="relative z-10 flex items-center gap-3">
        {/* Tech-style pulsing square */}
        <span className="w-1.5 h-1.5 bg-white group-hover:bg-[#e50000] transition-colors animate-pulse" />
        
        <span className="font-mono uppercase tracking-[0.25em] text-[10px] font-bold mt-0.5 text-white group-hover:text-[#e50000] transition-colors">
          Visit Our Studio
        </span>
        
        {/* Animated Chevron */}
        <svg 
          className="w-3 h-3 text-white group-hover:text-[#e50000] transform group-hover:translate-x-1 transition-all duration-300" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth="3"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
};
