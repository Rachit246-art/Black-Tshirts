import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const reviews = [
  {
    id: 1,
    initials: 'AM',
    name: 'Arjun Mehta',
    role: 'Google Review',
    rating: 5,
    text: 'Picked up the Chicago Racing 98 drop and honestly wasn\'t prepared for how heavy and premium this felt out of the box. The 420 GSM cotton is an entirely different category of garment. This rivals Supreme at a fraction of the noise.',
    image: '/real image/product-3.jpeg',
  },
  {
    id: 2,
    initials: 'PS',
    name: 'Priya Sharma',
    role: 'Google Review',
    rating: 5,
    text: 'The acid wash pieces from their VINTAGE line are unlike anything I\'ve seen from an Indian brand. You can feel the hand-treatment on the fabric. Every piece genuinely has its own personality. Mine already gets stopped on the street.',
    image: '/real image/product-5.jpeg',
  },
  {
    id: 3,
    initials: 'RS',
    name: 'Rahul Singh',
    role: 'Google Review',
    rating: 5,
    text: 'The attention to typography and print quality on the Skull Edition is insane. Discharge ink on 500 GSM is a completely different experience. The print has zero hand feel. This is a collector-grade piece, full stop.',
    image: '/real image/product-8.jpeg',
  },
  {
    id: 4,
    initials: 'KN',
    name: 'Kabir Nair',
    role: 'Google Review',
    rating: 5,
    text: 'Ordered the Chains Kurapika Noir drop as soon as I saw it. The tonal depth on this piece photographs incredibly. The deep pigment absorbs light in a way mass-market black tees simply don\'t. This is the kind of piece you build outfits around.',
    image: '/real image/product-4.jpeg',
  },
  {
    id: 5,
    initials: 'AV',
    name: 'Ananya Verma',
    role: 'Google Review',
    rating: 5,
    text: 'Wearing theirs for 3 washes now and there is zero pilling, zero colour fade, zero shape distortion. The pre-shrunk circular loomed construction is the real deal. Worth every rupee. This is what premium actually means.',
    image: '/real image/product-1.jpeg',
  },
];

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < count ? '#f5a623' : 'rgba(255,255,255,0.1)'}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ))}
  </div>
);

const ReviewCard = ({ review, active }: { review: typeof reviews[0]; active?: boolean }) => (
  <div
    className="flex flex-col h-full relative overflow-hidden"
    style={{
      background: active ? 'rgba(20,20,20,0.85)' : 'rgba(15,15,15,0.65)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '16px',
      padding: '32px',
      transition: 'all 0.4s ease',
      boxShadow: active ? '0 20px 60px rgba(0,0,0,0.8)' : '0 8px 30px rgba(0,0,0,0.5)',
    }}
  >
    {/* Top row: stars + verified */}
    <div className="flex items-center justify-between mb-4">
      <Stars count={review.rating} />
      <div className="flex items-center gap-1.5">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#4285F4">
          <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
        </svg>
        <span style={{ fontFamily: 'monospace', fontSize: '9px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Verified</span>
      </div>
    </div>

    {/* Product image */}
    <div
      className="overflow-hidden mb-6"
      style={{ borderRadius: '12px', aspectRatio: '4/3', width: '100%' }}
    >
      <img
        src={review.image}
        alt={review.name}
        className="w-full h-full object-cover"
      />
    </div>

    {/* Review text */}
    <p style={{
      fontFamily: 'sans-serif',
      fontSize: '0.875rem',
      color: 'rgba(255,255,255,0.7)',
      lineHeight: 1.85,
      fontStyle: 'italic',
      flex: 1,
      marginBottom: '20px',
    }}>
      "{review.text}"
    </p>

    {/* Reviewer */}
    <div className="flex items-center gap-3 mt-auto">
      <div
        className="flex items-center justify-center shrink-0"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          fontFamily: 'monospace',
          fontSize: '12px',
          fontWeight: 700,
          color: '#fff',
          letterSpacing: '0.05em',
        }}
      >
        {review.initials}
      </div>
      <div>
        <p style={{ fontFamily: 'sans-serif', fontSize: '0.875rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {review.name}
        </p>
        <p style={{ fontFamily: 'monospace', fontSize: '9px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '2px' }}>
          {review.role}
        </p>
      </div>
    </div>
  </div>
);

export const TestimonialSection: React.FC = () => {
  const [page, setPage] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const perPage = 3;
  const totalPages = Math.ceil(reviews.length / perPage);

  const visibleReviews = [
    reviews[page % reviews.length],
    reviews[(page + 1) % reviews.length],
    reviews[(page + 2) % reviews.length],
  ];

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setPage((p) => (p + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const goTo = (i: number) => {
    clearInterval(intervalRef.current);
    setPage(i % reviews.length);
  };

  return (
    <section
      className="relative w-full bg-[#000000] overflow-hidden"
      style={{ padding: 'clamp(80px, 10vw, 130px) clamp(20px, 6vw, 80px)' }}
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-50"
        >
          <source src="/12762291_3840_2160_24fps (1).mp4" type="video/mp4" />
        </video>
        {/* Subtle gradient overlay to ensure text legibility but not block the video completely */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/70" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.6em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.35em' }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            style={{ fontFamily: 'monospace', fontSize: '11px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '14px' }}
          >
            &mdash; VOICES &mdash;
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: 'sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, textTransform: 'uppercase', color: '#fff', lineHeight: 1, letterSpacing: '-0.03em' }}
          >
            What They Say
          </motion.h2>
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {visibleReviews.map((review, i) => (
              <ReviewCard key={`${review.id}-${i}`} review={review} active={i === 1} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Dots + arrows */}
        <div className="mt-10 flex items-center justify-between">
          {/* Dot indicators */}
          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: i === page ? '24px' : '8px',
                  height: '3px',
                  borderRadius: '2px',
                  background: i === page ? '#fff' : 'rgba(255,255,255,0.18)',
                  transition: 'all 0.4s ease',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex gap-3">
            {([-1, 1] as const).map((delta) => (
              <button
                key={delta}
                onClick={() => { clearInterval(intervalRef.current); setPage((p) => (p + delta + reviews.length) % reviews.length); }}
                className="w-11 h-11 flex items-center justify-center rounded-full transition-all"
                style={{ border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.5)'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.15)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.6)'; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {delta === -1 ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
