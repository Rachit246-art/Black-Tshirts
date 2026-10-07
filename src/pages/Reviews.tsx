import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FinalFooter } from '../components/FinalFooter';
import '../styles/reviews.css';

interface Review {
  id: string;
  name: string;
  location: string;
  category: 'ALL' | 'COLLECTOR' | 'STYLIST' | 'TEXTILE' | 'GRAPHIC';
  lot: string;
  pieceTitle: string;
  image: string;
  rating: number;
  date: string;
  headline: string;
  content: string;
  badge: string;
}

const reviewsData: Review[] = [
  {
    id: 'rev-1',
    name: 'Henri de Montmirail',
    location: 'Paris, France',
    category: 'COLLECTOR',
    lot: 'LOT 001',
    pieceTitle: 'Smile Heal The Soul',
    image: '/real image/product-1.jpeg',
    rating: 5,
    date: 'OCT 2026',
    headline: 'The heaviest, most sculptural tee in my collection.',
    content:
      'I own pieces from Rick Owens, Balenciaga, and vintage Helmut Lang. None match the sheer architectural posture of this 420 GSM loopback jersey. The collar stays completely flush against the neck after dozens of wears. An absolute masterpiece.',
    badge: 'VERIFIED PATRON',
  },
  {
    id: 'rev-2',
    name: 'Kenji Takahashi',
    location: 'Tokyo, Japan',
    category: 'TEXTILE',
    lot: 'LOT 002',
    pieceTitle: 'Small Body Big Energy',
    image: '/real image/product-2.jpeg',
    rating: 5,
    date: 'OCT 2026',
    headline: 'Authentic circular loom density. Impossible to counterfeit.',
    content:
      'As a textile archivist in Shibuya, I inspect weave tension meticulously. The yarn count and compact combing on this cotton are phenomenal. It drapes with armor-like authority without feeling stifling. The Portuguese milling is unmistakable.',
    badge: 'TEXTILE ARCHIVIST',
  },
  {
    id: 'rev-3',
    name: 'Julian Sterling',
    location: 'London, United Kingdom',
    category: 'STYLIST',
    lot: 'LOT 003',
    pieceTitle: 'Chicago Racing Team 98',
    image: '/real image/product-3.jpeg',
    rating: 5,
    date: 'SEP 2026',
    headline: 'Commanding silhouette on runway and editorial sets.',
    content:
      'We styled this for London Fashion Week editorial shoots. The drop-shoulder seam break is calculated to perfection. Photographed under intense studio lights, the mineral charcoal wash has an incredible matte depth.',
    badge: 'EDITORIAL STYLIST',
  },
  {
    id: 'rev-4',
    name: 'Matteo Bianchi',
    location: 'Milan, Italy',
    category: 'COLLECTOR',
    lot: 'LOT 004',
    pieceTitle: 'Chains Kurapika Noir',
    image: '/real image/product-4.jpeg',
    rating: 5,
    date: 'SEP 2026',
    headline: 'Water-based discharge printing at haute couture level.',
    content:
      'The print is dyed directly into the fibers rather than stamped on top with cheap rubber ink. You feel zero plastic texture on your chest—just velvety 420 GSM cotton. True luxury manufacturing.',
    badge: 'VERIFIED PATRON',
  },
  {
    id: 'rev-5',
    name: 'Marcus Vance',
    location: 'New York, USA',
    category: 'GRAPHIC',
    lot: 'LOT 005',
    pieceTitle: 'Feeling Acid Wash Atelier',
    image: '/real image/product-5.jpeg',
    rating: 5,
    date: 'AUG 2026',
    headline: 'The collar will outlive every other shirt you own.',
    content:
      'Every expensive tee I have ever purchased ends up with a wavy, bacon-neck collar within three months. This twin-needle 280 GSM collar refuses to budge. It feels like bulletproof tailored armor.',
    badge: 'VERIFIED PATRON',
  },
  {
    id: 'rev-6',
    name: 'Camille Laurent',
    location: 'Lyon, France',
    category: 'STYLIST',
    lot: 'LOT 027',
    pieceTitle: 'Maison Finale Runway Vault',
    image: '/real image/product-27.jpeg',
    rating: 5,
    date: 'AUG 2026',
    headline: 'Arrived in magnetic obsidian box with serialized seal.',
    content:
      'Unboxing this felt like receiving a numbered piece of contemporary art. The certificate of provenance, the sheer heft of the French terry weave, and the serialized atelier stitching make this easily the best luxury acquisition of 2026.',
    badge: 'COLLECTOR FINALE',
  },
];

export const Reviews: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'COLLECTOR' | 'STYLIST' | 'TEXTILE' | 'GRAPHIC'>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalRating, setModalRating] = useState(5);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalForm, setModalForm] = useState({
    name: '',
    location: '',
    lot: 'LOT 001',
    headline: '',
    review: '',
  });

  const filteredReviews = selectedFilter === 'ALL'
    ? reviewsData
    : reviewsData.filter((r) => r.category === selectedFilter);

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalSuccess(true);
    setTimeout(() => {
      setModalSuccess(false);
      setIsModalOpen(false);
      setModalForm({ name: '', location: '', lot: 'LOT 001', headline: '', review: '' });
    }, 2000);
  };

  return (
    <div className="relative min-h-screen bg-[#000000] text-[#ffffff] selection:bg-[#ffffff] selection:text-[#000000] overflow-x-clip">
      {/* Ambient Lighting Gradient */}
      <div aria-hidden="true" className="reviews-ambient-glow" />

      {/* ========================================================================= */}
      {/* 1. HERO HEADER SECTION */}
      {/* ========================================================================= */}
      <section className="relative z-10 pt-36 md:pt-48 pb-16">
        <div className="reviews-page-container">
          {/* Subtle Watermark Kinetic Marquee */}
          <div aria-hidden="true" className="pointer-events-none absolute -top-4 left-0 right-0 opacity-15 overflow-hidden select-none">
            <div className="flex whitespace-nowrap animate-marquee-left">
              <span className="reviews-marquee-text pr-12">
                PATRON COMMISSIONS · VERIFIED CLIENT ARCHIVE · 5.0 RATED WORLDWIDE · 340+ COMMISSIONS DELIVERED ·
              </span>
              <span className="reviews-marquee-text pr-12">
                PATRON COMMISSIONS · VERIFIED CLIENT ARCHIVE · 5.0 RATED WORLDWIDE · 340+ COMMISSIONS DELIVERED ·
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center text-center max-w-5xl mx-auto relative z-10">
            {/* 5-Star Rating Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="reviews-star-pill"
            >
              <span className="text-yellow-400">★★★★★</span>
              <span>5.0 / 5.0 · 340+ VERIFIED PATRONS WORLDWIDE</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="reviews-hero-title"
            >
              PATRON <br />
              <span className="text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.4)]">
                ARCHIVE.
              </span>
            </motion.h1>

            {/* Sub-paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="reviews-hero-sub"
            >
              Unfiltered appraisals, tactile feedback, and verified critiques from discerning collectors
              and runway stylists across Paris, Tokyo, London, and New York.
            </motion.p>

            {/* Submit Appraisal Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-3.5 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black font-mono text-xs uppercase tracking-widest text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                Log Your Patron Appraisal ↗
              </button>
            </motion.div>
          </div>

          {/* Interactive Filter Pills */}
          <div className="pt-16 mt-12 border-t border-white/10 flex flex-wrap items-center justify-center gap-3">
            {[
              { id: 'ALL', label: 'ALL CRITIQUES (06)' },
              { id: 'COLLECTOR', label: 'COLLECTORS & VIP' },
              { id: 'STYLIST', label: 'RUNWAY STYLISTS' },
              { id: 'TEXTILE', label: 'TEXTILE ARCHIVISTS' },
              { id: 'GRAPHIC', label: 'GRAPHIC EDITIONS' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as any)}
                className={`reviews-filter-btn ${selectedFilter === tab.id ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. FRAMED REVIEWS GRID */}
      {/* ========================================================================= */}
      <section className="relative z-10 pb-36">
        <div className="reviews-page-container">
          <motion.div layout className="reviews-grid">
            <AnimatePresence mode="popLayout">
              {filteredReviews.map((review, idx) => (
                <motion.div
                  layout
                  key={review.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  className="reviews-card group"
                >
                  {/* Architectural Corner Crosshairs */}
                  <div className="reviews-frame-tl" />
                  <div className="reviews-frame-tr" />
                  <div className="reviews-frame-bl" />
                  <div className="reviews-frame-br" />

                  {/* Header: Patron Details & Garment Thumbnail */}
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-yellow-400 text-sm">★★★★★</span>
                          <span className="font-mono text-[10px] text-white/50 tracking-wider">
                            {review.date}
                          </span>
                        </div>
                        <h4 className="font-display text-xl font-bold uppercase tracking-tight text-white">
                          {review.name}
                        </h4>
                        <span className="font-mono text-xs text-white/50 block">
                          {review.location}
                        </span>
                      </div>

                      {/* Associated Piece Frame Thumbnail (Natural Vibrant Color) */}
                      <div className="reviews-thumb-frame" title={review.pieceTitle}>
                        <img
                          src={review.image}
                          alt={review.pieceTitle}
                          className="reviews-thumb-img"
                        />
                      </div>
                    </div>

                    {/* Verified Lot Tag */}
                    <div className="flex items-center gap-2 mb-6">
                      <span className="px-2.5 py-1 rounded bg-white/10 font-mono text-[10px] uppercase tracking-wider text-emerald-400 font-bold border border-emerald-500/20">
                        ✓ {review.badge}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">
                        {review.lot} // {review.pieceTitle}
                      </span>
                    </div>

                    {/* Headline */}
                    <h5 className="font-display text-lg font-bold text-white mb-4 leading-snug">
                      "{review.headline}"
                    </h5>

                    {/* Content */}
                    <p className="text-neutral-400 text-sm leading-relaxed font-light">
                      {review.content}
                    </p>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40 uppercase tracking-widest">
                    <span>AUTHENTICATED LEDGER</span>
                    <span>100% VERIFIED</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MODAL FOR SUBMITTING PATRON REVIEW */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#09090c] border border-white/20 rounded-2xl p-8 sm:p-10 max-w-xl w-full relative shadow-[0_30px_90px_rgba(0,0,0,0.98)]"
            >
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 block mb-1">
                    PATRON DISPATCH
                  </span>
                  <h3 className="text-2xl font-bold uppercase tracking-tight text-white">
                    Submit Garment Critique
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {modalSuccess ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-2xl">
                    ✓
                  </div>
                  <h4 className="text-xl font-bold uppercase text-white mb-2">
                    Appraisal Submitted
                  </h4>
                  <p className="text-white/60 text-xs font-mono">
                    Thank you. Your critique will be authenticated against the Porto batch ledger.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleModalSubmit} className="space-y-4">
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-white/60 mb-2">
                      Your Rating
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setModalRating(star)}
                          className={`text-2xl transition-transform ${
                            star <= modalRating ? 'text-yellow-400 scale-110' : 'text-neutral-700'
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-wider text-white/60 mb-1">
                        Patron Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={modalForm.name}
                        onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                        placeholder="e.g. Laurent V."
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white outline-none focus:border-white"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-wider text-white/60 mb-1">
                        City / Country *
                      </label>
                      <input
                        type="text"
                        required
                        value={modalForm.location}
                        onChange={(e) => setModalForm({ ...modalForm, location: e.target.value })}
                        placeholder="e.g. Paris, France"
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white outline-none focus:border-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-white/60 mb-1">
                      Critique Headline *
                    </label>
                    <input
                      type="text"
                      required
                      value={modalForm.headline}
                      onChange={(e) => setModalForm({ ...modalForm, headline: e.target.value })}
                      placeholder="e.g. The most substantial t-shirt ever made."
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-white/60 mb-1">
                      Tactile Feedback &amp; Fit Analysis *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={modalForm.review}
                      onChange={(e) => setModalForm({ ...modalForm, review: e.target.value })}
                      placeholder="Share your experience regarding the 420 GSM drape, neckline recovery, and fabric density..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white outline-none focus:border-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-neutral-200 transition-colors"
                  >
                    Submit Verified Appraisal ↗
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 4. FINAL FOOTER */}
      {/* ========================================================================= */}
      <div className="relative z-50">
        <FinalFooter />
      </div>
    </div>
  );
};

export default Reviews;
