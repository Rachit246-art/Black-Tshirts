import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: 'What GSM weight are your t-shirts?',
    a: 'All our pieces are crafted from 400–450 GSM heavyweight cotton, sourced from circular looms in Porto, Portugal. This gives each garment exceptional structure and a substantial hand-feel unlike anything on the mass market.',
  },
  {
    q: 'Are your drops limited edition?',
    a: 'Yes — every release is cut in strictly numbered small-batch quantities ranging from 50 to 120 pieces worldwide. Once a lot is sold, it is archived permanently. No reprints, no restocks.',
  },
  {
    q: 'How do I choose my size?',
    a: 'Our silhouettes are designed with an intentional oversized drop-shoulder fit. If you prefer a cleaner look, size down one. All measurements are available on each individual product page.',
  },
  {
    q: 'What is your return / exchange policy?',
    a: 'We accept exchanges within 7 days of delivery for manufacturing defects or incorrect items. Due to the limited nature of our drops, we do not accept returns based on change of mind. All pieces are quality-checked before dispatch.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes — we ship to 40+ countries worldwide. International orders typically arrive within 10–18 business days. Tracking is provided for all shipments.',
  },
  {
    q: 'How should I wash my piece to maintain quality?',
    a: 'Cold machine wash inside-out, no tumble dry. Hang dry flat to maintain garment structure and prevent shrinkage. Do not iron directly over printed areas.',
  },
];

const FaqItem = ({ faq, index, isOpen, onToggle }: { faq: typeof faqs[0]; index: number; isOpen: boolean; onToggle: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="border-b border-white/10"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-6 py-6 text-left group"
      >
        <span className="flex items-center gap-4">
          <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', minWidth: '40px' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span style={{ fontFamily: 'sans-serif', fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', fontWeight: 600, color: '#fff', lineHeight: 1.3 }}>
            {faq.q}
          </span>
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ flexShrink: 0, width: '28px', height: '28px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '18px', fontWeight: 300 }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ fontFamily: 'sans-serif', fontSize: '0.95rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, paddingBottom: '24px', paddingLeft: '52px', paddingRight: '40px' }}>
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#000000] overflow-hidden"
      style={{ padding: 'clamp(80px, 10vw, 140px) clamp(20px, 6vw, 80px)' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{ top: '20%', left: '50%', transform: 'translateX(-50%)', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Heading */}
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.6em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.35em' }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            style={{ fontFamily: 'monospace', fontSize: '11px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '14px' }}
          >
            — ANSWERS —
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: 'sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, textTransform: 'uppercase', color: '#fff', lineHeight: 1, letterSpacing: '-0.03em' }}
          >
            Frequently Asked
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontFamily: 'monospace', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', marginTop: '12px' }}
          >
            Everything you need to know about our pieces
          </motion.p>
        </div>

        {/* FAQ list */}
        <div>
          {faqs.map((faq, i) => (
            <FaqItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
