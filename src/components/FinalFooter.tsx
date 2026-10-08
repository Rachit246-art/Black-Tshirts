import React from 'react';
import { motion } from 'framer-motion';

export const FinalFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    { title: 'Home', href: '/' },
    { title: 'About', href: '/about' },
    { title: 'Gallery', href: '/gallery' },
    { title: 'Reviews', href: '/reviews' },
    { title: 'Contact', href: '/contact' },
  ];

  const socials = [
    { title: 'Instagram', href: '#' },
    { title: 'Twitter / X', href: '#' },
    { title: 'Discord', href: '#' },
    { title: 'Spotify', href: '#' },
  ];

  const legal = [
    { title: 'Privacy Policy', href: '#' },
    { title: 'Terms of Service', href: '#' },
    { title: 'Shipping & Returns', href: '#' },
  ];

  const marqueeText = " // PREMIUM STREETWEAR // A MODERN LIFE // NO COMPROMISES";

  return (
    <footer style={{ 
      backgroundColor: '#030204', 
      color: '#ffffff', 
      paddingTop: '120px',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      position: 'relative',
      overflow: 'hidden',
      zIndex: 50
    }}>
      
      {/* Top Grid Section */}
      <div style={{ 
        maxWidth: '1600px', 
        margin: '0 auto', 
        padding: '0 40px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: '60px',
        marginBottom: '40px'
      }}>
        
        {/* Left: Branding & Newsletter */}
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <div>
            <h2 style={{ 
              fontFamily: 'Impact, sans-serif', 
              fontSize: 'clamp(2rem, 4vw, 3rem)', 
              textTransform: 'uppercase', 
              letterSpacing: '-0.02em',
              margin: 0,
              lineHeight: 1
            }}>
              PREMIUM
            </h2>
            <h2 style={{ 
              fontFamily: 'Impact, sans-serif', 
              fontSize: 'clamp(2rem, 4vw, 3rem)', 
              textTransform: 'uppercase', 
              letterSpacing: '-0.02em',
              margin: 0,
              lineHeight: 1,
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.5)'
            }}>
              STUDIOS
            </h2>
          </div>

          <div style={{ maxWidth: '300px' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '15px' }}>
              Join the inner circle.
            </p>
            <div style={{ position: 'relative', display: 'flex' }}>
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS"
                style={{
                  width: '100%',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.2)',
                  padding: '10px 0',
                  color: '#ffffff',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  outline: 'none',
                  boxShadow: 'none'
                }}
              />
              <button style={{
                position: 'absolute',
                right: 0,
                bottom: '10px',
                background: 'none',
                border: 'none',
                color: '#ffffff',
                fontFamily: 'monospace',
                fontSize: '12px',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Right: Link Columns */}
        <div className="flex-1 lg:flex-[2] flex flex-wrap gap-x-8 gap-y-12 md:gap-x-16 lg:gap-x-[12%] justify-between md:justify-start">
          
          {/* Quick Links */}
          <div className="flex flex-col gap-5 w-[45%] md:w-auto">
            <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '10px' }}>
              Quick Links
            </span>
            {links.map((link, i) => (
              <a key={i} href={link.href} style={{ 
                fontFamily: 'sans-serif', 
                fontSize: '14px', 
                color: 'rgba(255,255,255,0.7)', 
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                transition: 'color 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'}
              onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              >
                {link.title}
              </a>
            ))}
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-5 w-[45%] md:w-auto">
            <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '10px' }}>
              Connect
            </span>
            {socials.map((link, i) => (
              <a key={i} href={link.href} style={{ 
                fontFamily: 'sans-serif', 
                fontSize: '14px', 
                color: 'rgba(255,255,255,0.7)', 
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                transition: 'color 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'}
              onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              >
                {link.title}
              </a>
            ))}
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-5 w-[45%] md:w-auto">
            <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '10px' }}>
              Information
            </span>
            {legal.map((link, i) => (
              <a key={i} href={link.href} style={{ 
                fontFamily: 'sans-serif', 
                fontSize: '14px', 
                color: 'rgba(255,255,255,0.7)', 
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                transition: 'color 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'}
              onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              >
                {link.title}
              </a>
            ))}
          </div>

        </div>
      </div>

      {/* Infinite Marquee */}
      <div style={{ 
        width: '100%', 
        borderTop: '1px solid rgba(255,255,255,0.1)', 
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '20px 0',
        display: 'flex',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        backgroundColor: '#000000'
      }}>
        <motion.div
          animate={{ x: [0, -1035] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
          style={{ display: 'flex' }}
        >
          {/* Repeat text multiple times to ensure seamless infinite loop */}
          {[...Array(6)].map((_, i) => (
            <span key={i} style={{ 
              fontFamily: 'Impact, sans-serif', 
              fontSize: '40px', 
              color: 'rgba(255,255,255,0.1)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              paddingRight: '20px'
            }}>
              {marqueeText}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Very Bottom Copyright */}
      <div style={{ 
        maxWidth: '1600px', 
        margin: '0 auto', 
        padding: '30px 40px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px'
      }}>
        <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          © {currentYear} PREMIUM STUDIOS. ALL RIGHTS RESERVED.
        </span>
        <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          DESIGNED IN THE VOID
        </span>
      </div>

    </footer>
  );
};
