import React from 'react';
import { motion, Variants } from 'framer-motion';

const getRandomStart = (distance: number) => {
  const angle = Math.random() * Math.PI * 2;
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;
  const rotate = (Math.random() - 0.5) * 180;
  return { x, y, rotate };
};

export const PremiumContact: React.FC = () => {
  const pieces = Array.from({ length: 15 }).map(() => getRandomStart(600));

  const assembleVariants = (index: number): Variants => ({
    hidden: { 
      opacity: 0, 
      x: pieces[index].x, 
      y: pieces[index].y, 
      rotate: pieces[index].rotate,
      scale: 0.8,
      filter: 'blur(10px)'
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0, 
      rotate: 0, 
      scale: 1,
      filter: 'blur(0px)',
      transition: { 
        type: "spring" as const, 
        stiffness: 50, 
        damping: 25, 
        mass: 1,
        delay: index * 0.05 
      } 
    }
  });

  return (
    <section 
      className="relative w-full min-h-screen py-32 z-30 overflow-hidden"
      style={{ backgroundColor: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '100px 20px' }}
    >
      {/* Background ambient light */}
      <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
        <div style={{ width: '40vw', height: '40vw', borderRadius: '50%', backgroundColor: '#ffffff', filter: 'blur(150px)', opacity: 0.15 }} />
      </div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 w-full"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '800px', margin: '0 auto' }}
      >
        
        {/* Typography Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '60px' }}>
          <motion.div variants={assembleVariants(0)} style={{ marginBottom: '20px' }}>
            <span className="font-mono uppercase tracking-widest" style={{ color: '#ffffff', fontSize: '12px', letterSpacing: '0.4em' }}>
              Let's Build Something
            </span>
          </motion.div>
          
          <motion.h2 
            variants={assembleVariants(1)} 
            className="font-display font-black uppercase tracking-tighter"
            style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 0.9, color: '#ffffff', marginBottom: '10px' }}
          >
            CONTACT
          </motion.h2>
          <motion.h2 
            variants={assembleVariants(2)} 
            className="font-display font-black uppercase tracking-tighter"
            style={{
              fontSize: 'clamp(3rem, 6vw, 5rem)', 
              lineHeight: 0.9,
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)'
            }}
          >
            THE STUDIO
          </motion.h2>

          <motion.p 
            variants={assembleVariants(3)} 
            className="font-body font-medium"
            style={{ color: 'rgba(255,255,255,0.5)', marginTop: '30px', maxWidth: '400px', fontSize: '15px', lineHeight: 1.6 }}
          >
            Inquiries regarding orders, wholesale partnerships, and creative collaborations.
          </motion.p>
        </div>

        {/* Elegant Centered Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', width: '100%', maxWidth: '500px', position: 'relative' }}>
          
          <motion.div variants={assembleVariants(4)} className="w-full relative group">
            <input 
              type="text" 
              placeholder="FULL NAME" 
              className="w-full bg-transparent text-white font-mono transition-colors uppercase peer"
              style={{ fontSize: '13px', padding: '15px 0', borderBottom: '1px solid rgba(255,255,255,0.15)', letterSpacing: '0.1em', outline: 'none', boxShadow: 'none' }}
            />
            <div className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 ease-out peer-focus:w-full" style={{ backgroundColor: '#ffffff' }} />
          </motion.div>

          <motion.div variants={assembleVariants(5)} className="w-full relative group">
            <input 
              type="email" 
              placeholder="EMAIL ADDRESS" 
              className="w-full bg-transparent text-white font-mono transition-colors uppercase peer"
              style={{ fontSize: '13px', padding: '15px 0', borderBottom: '1px solid rgba(255,255,255,0.15)', letterSpacing: '0.1em', outline: 'none', boxShadow: 'none' }}
            />
            <div className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 ease-out peer-focus:w-full" style={{ backgroundColor: '#ffffff' }} />
          </motion.div>

          <motion.div variants={assembleVariants(6)} className="w-full relative group">
            <select 
              className="w-full bg-transparent font-mono transition-colors uppercase appearance-none cursor-pointer peer"
              style={{ fontSize: '13px', padding: '15px 0', borderBottom: '1px solid rgba(255,255,255,0.15)', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.8)', outline: 'none', boxShadow: 'none' }}
            >
              <option value="" disabled selected style={{ backgroundColor: '#000000', color: '#ffffff' }}>SELECT INQUIRY</option>
              <option value="order" style={{ backgroundColor: '#000000', color: '#ffffff' }}>Order Question</option>
              <option value="wholesale" style={{ backgroundColor: '#000000', color: '#ffffff' }}>Wholesale</option>
              <option value="collab" style={{ backgroundColor: '#000000', color: '#ffffff' }}>Collaboration</option>
              <option value="other" style={{ backgroundColor: '#000000', color: '#ffffff' }}>Other</option>
            </select>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px' }}>▼</div>
            <div className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 ease-out peer-focus:w-full" style={{ backgroundColor: '#ffffff' }} />
          </motion.div>

          <motion.div variants={assembleVariants(7)} className="w-full relative group">
            <textarea 
              placeholder="YOUR MESSAGE" 
              rows={3}
              className="w-full bg-transparent text-white font-mono transition-colors uppercase resize-none peer"
              style={{ fontSize: '13px', padding: '15px 0', borderBottom: '1px solid rgba(255,255,255,0.15)', letterSpacing: '0.1em', outline: 'none', boxShadow: 'none' }}
            />
            <div className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 ease-out peer-focus:w-full" style={{ backgroundColor: '#ffffff' }} />
          </motion.div>

          <motion.button 
            variants={assembleVariants(8)}
            className="w-full mt-6 group relative flex items-center justify-center overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ backgroundColor: '#ffffff', padding: '20px 0', borderRadius: '2px' }}
          >
            <span className="relative z-10 font-mono font-bold uppercase" style={{ fontSize: '11px', letterSpacing: '0.3em', color: '#000000' }}>
              Send Transmission
            </span>
            <div className="absolute inset-0 z-0 h-full w-full translate-y-[100%] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0" style={{ backgroundColor: '#ffffff' }} />
          </motion.button>
          
          <motion.div variants={assembleVariants(9)} className="flex items-center justify-center gap-6 mt-10">
            <a href="mailto:studio@premium.com" className="font-mono hover:text-white uppercase transition-colors" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', letterSpacing: '0.2em' }}>
              studio@premium.com
            </a>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)' }} />
            <a href="tel:+1234567890" className="font-mono hover:text-white uppercase transition-colors" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', letterSpacing: '0.2em' }}>
              +1 234 567 890
            </a>
          </motion.div>
          
        </div>
      </motion.div>
    </section>
  );
};
