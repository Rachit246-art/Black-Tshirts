import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FinalFooter } from '../components/FinalFooter';
import { PageIntro } from '../components/PageIntro';
import '../styles/contact.css';

interface FitSpec {
  name: string;
  tag: string;
  chest: string;
  length: string;
  shoulder: string;
  weight: string;
  silhouette: string;
  recommendation: string;
}

const FIT_PROFILES: Record<string, FitSpec> = {
  boxy: {
    name: '420 GSM Boxy Oversized',
    tag: 'SIGNATURE RUNWAY SILHOUETTE',
    chest: '64 cm',
    length: '74 cm',
    shoulder: '58 cm (Drop)',
    weight: '420 GSM French Terry',
    silhouette: 'Structural box cut with zero body clinging and a reinforced 32mm heavyweight collar rib.',
    recommendation: 'True to size for a relaxed luxury runway drape, or size down 1 size for a tailored streetwear fit.',
  },
  tailored: {
    name: 'Tailored Streetwear Cut',
    tag: 'ANATOMICAL CLEAN FIT',
    chest: '58 cm',
    length: '72 cm',
    shoulder: '52 cm',
    weight: '320 GSM Mid-Heavyweight',
    silhouette: 'Clean anatomical shoulder taper with relaxed torso room, engineered for sleek all-day layering.',
    recommendation: 'True to size for an athletic, tailored luxury silhouette with clean proportions.',
  },
  vintage: {
    name: 'Vintage Enzyme Wash',
    tag: '90s ARCHIVAL BOX CUT',
    chest: '56 cm',
    length: '70 cm',
    shoulder: '50 cm',
    weight: '380 GSM Mineral Washed',
    silhouette: 'Distressed mineral wash drape with authentic 90s vintage box proportions and relaxed arm openings.',
    recommendation: 'Size up 1 size if you desire an exaggerated street drop-shoulder aesthetic.',
  },
};

interface FAQItem {
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  {
    q: 'What is the certified care protocol for 420 GSM heavyweight cotton?',
    a: 'Turn garment inside out. Cold machine wash below 30°C (85°F) with gentle eco-friendly detergent. Reshape flat on a clean surface. The pre-shrunk combed fibers retain their permanent structure and velvety hand-feel across 100+ cycles.',
  },
  {
    q: 'How does private bespoke fitting and tailoring operate?',
    a: 'Private consultations are arranged via our Porto and Paris ateliers. We adjust drop-shoulder drape, rib collar tension, and torso break points for custom runs.',
  },
  {
    q: 'How are numbered runway editions dispatched worldwide?',
    a: 'Every archived piece is sealed in anti-static archival bags, placed inside custom matte obsidian magnetic presentation boxes, and shipped via climate-controlled DHL Express Carbon Neutral courier with tamper-evident serial seals.',
  },
  {
    q: 'How do I authenticate my physical garment serial number?',
    a: 'Each piece features an NFC-woven archival seam label or serialized holographic certification certificate. Tap your smartphone to verify instant cryptographic provenance against our Porto master ledger.',
  },
];

const LOT_OPTIONS = [
  { value: 'GENERAL INQUIRY', label: 'General Inquiry (No Lot)', subtitle: 'Atelier Consultation & Commission' },
  { value: 'LOT 001', label: 'Lot 001 — Smile Heal The Soul', subtitle: '420 GSM French Terry' },
  { value: 'LOT 002', label: 'Lot 002 — Small Body Big Energy', subtitle: 'Heavyweight Box Cut' },
  { value: 'LOT 003', label: 'Lot 003 — Chicago Racing Team', subtitle: 'Vintage Washed Graphic' },
  { value: 'LOT 004', label: 'Lot 004 — Chains Kurapika', subtitle: 'High-Density Discharge Print' },
  { value: 'LOT 005', label: 'Lot 005 — Feeling Acid Wash Atelier', subtitle: 'Mineral Stone Washed' },
  { value: 'LOT 027', label: 'Lot 027 — Maison Finale Runway Vault', subtitle: 'Archive 1-of-1 Piece' },
];

export const Contact: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);

  // Form State
  const [inquiryType, setInquiryType] = useState<string>('BESPOKE TAILORING');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    lotNumber: 'GENERAL INQUIRY',
    message: '',
  });
  const [isLotDropdownOpen, setIsLotDropdownOpen] = useState(false);
  const lotDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (lotDropdownRef.current && !lotDropdownRef.current.contains(e.target as Node)) {
        setIsLotDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const [formStatus, setFormStatus] = useState<'idle' | 'transmitting' | 'confirmed'>('idle');
  const [transmitStep, setTransmitStep] = useState<string>('ENCRYPTING INQUIRY...');
  const [ticketRef, setTicketRef] = useState<string>('');

  // Interactive Fit Guide State
  const [selectedFit, setSelectedFit] = useState<'boxy' | 'tailored' | 'vintage'>('boxy');

  // Dispatch Tracker State
  const [trackingInput, setTrackingInput] = useState<string>('');
  const [trackingStatus, setTrackingStatus] = useState<string | null>(null);

  // Open FAQ accordion index
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(0);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingInput.trim()) return;
    setTrackingStatus(`WAYBILL #${Math.floor(1000000000 + Math.random() * 9000000000)} · IN TRANSIT (DHL EXPRESS AIR) · ESTIMATED DELIVERY: 2-3 BUSINESS DAYS`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setFormStatus('transmitting');
    setTransmitStep('01 // ENCRYPTING TAILORED SPECIFICATIONS...');

    setTimeout(() => {
      setTransmitStep('02 // ROUTING INQUIRY TO ATELIER CONCIERGE...');
    }, 600);

    setTimeout(() => {
      setTransmitStep('03 // COMMITTING ENTRY TO ARCHIVAL LEDGER...');
    }, 1200);

    setTimeout(() => {
      const generatedTicket = `MJ-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketRef(generatedTicket);
      setFormStatus('confirmed');
    }, 1800);
  };

  return (
    <div className="relative min-h-screen bg-[#000000] text-[#ffffff] selection:bg-[#ffffff] selection:text-[#000000] overflow-x-clip">
      {/* 0. INTRO PARTICLE TEXT ASSEMBLY OVERLAY */}
      <AnimatePresence>
        {showIntro && (
          <PageIntro
            sentence="CONNECT WITH THE ATELIER // PRIVATE CONCIERGE"
            categoryLabel="MAISON JJETTAS // CONCIERGE"
            enterButtonText="ENTER CONCIERGE"
            statusText="OPENING PRIVATE DISPATCH DESK..."
            subMeta="24/7 ENCRYPTED COMMISSIONS"
            onComplete={() => setShowIntro(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1, y: showIntro ? 20 : 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Ambient Lighting Gradient */}
        <div aria-hidden="true" className="contact-ambient-glow" />

      {/* ========================================================================= */}
      {/* 1. HERO HEADER SECTION (EXPANSIVE & LUXURIOUS) */}
      {/* ========================================================================= */}
      <section className="relative z-10 pt-36 md:pt-48 pb-20">
        <div className="contact-page-container">
          {/* Subtle Watermark Kinetic Marquee */}
          <div aria-hidden="true" className="pointer-events-none absolute -top-4 left-0 right-0 opacity-15 overflow-hidden select-none">
            <div className="flex whitespace-nowrap animate-marquee-left">
              <span className="contact-marquee-text pr-12">
                ATELIER CONCIERGE · BESPOKE COMMISSIONS · PORTO · PARIS · MINNEAPOLIS · 24/7 ENCRYPTED DISPATCH ·
              </span>
              <span className="contact-marquee-text pr-12">
                ATELIER CONCIERGE · BESPOKE COMMISSIONS · PORTO · PARIS · MINNEAPOLIS · 24/7 ENCRYPTED DISPATCH ·
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center text-center max-w-5xl mx-auto relative z-10">
            {/* Ambient Telemetry Radar Rings */}
            <div className="contact-telemetry-rings" aria-hidden="true" />

            {/* Top pill badge with animated frequency equalizer */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/20 bg-white/[0.04] backdrop-blur-md mb-8 relative z-10"
            >
              <div className="contact-equalizer">
                <div className="contact-eq-bar" />
                <div className="contact-eq-bar" />
                <div className="contact-eq-bar" />
                <div className="contact-eq-bar" />
                <div className="contact-eq-bar" />
                <div className="contact-eq-bar" />
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-white/90">
                Live Atelier Line // <span className="text-emerald-400 font-bold">256-Bit Encrypted</span>
              </span>
            </motion.div>

            {/* Main Grand Headline (Pure Solid Brilliant White - No Broken Gradient) */}
            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="contact-hero-title relative z-10"
            >
              DIRECT ATELIER <br />
              <span className="contact-title-accent">
                CONCIERGE.
              </span>
            </motion.h1>

            {/* Roomy Sub-paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="contact-hero-sub relative z-10"
            >
              Direct correspondence for private anatomical fittings, bespoke heavyweight textile milling,
              wholesale showroom appointments, and certified archive authentication.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. MAIN INTERACTIVE FORM & ATELIER DETAILS */}
      {/* ========================================================================= */}
      <section className="relative z-10 pb-32">
        <div className="contact-page-container">
          <div className="contact-grid-layout">
            {/* LEFT COLUMN: BESPOKE INQUIRY FORM */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="contact-card"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-white/10 gap-4">
                <div>
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/50 block mb-2">
                    DISPATCH PIPELINE // DIRECT PORTO ACCESS
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-white">
                    Initiate Private Commission
                  </h3>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 font-mono text-xs text-white/80">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>CHANNEL OPEN</span>
                </div>
              </div>

              {formStatus === 'confirmed' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center"
                >
                  <div className="w-20 h-20 mx-auto mb-8 rounded-full border border-emerald-400/40 bg-emerald-400/10 flex items-center justify-center text-emerald-400 text-3xl shadow-[0_0_40px_rgba(52,211,153,0.3)]">
                    ✓
                  </div>
                  <h4 className="text-3xl font-bold uppercase tracking-tight mb-4 text-white">
                    Transmission Authenticated
                  </h4>
                  <p className="text-white/70 text-base max-w-lg mx-auto mb-8 leading-relaxed font-light">
                    Your inquiry has been successfully registered into the Porto atelier ledger.
                    Our head tailor concierge will initiate direct encrypted correspondence within 2 business hours.
                  </p>
                  <div className="inline-block p-6 rounded-xl bg-white/[0.04] border border-white/15 font-mono text-xs text-white/80 mb-10">
                    <span className="text-white/50 block mb-2 tracking-widest uppercase">SERIALIZED TICKET NUMBER</span>
                    <span className="text-white font-bold tracking-widest text-lg">{ticketRef}</span>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        setFormStatus('idle');
                        setFormData({ name: '', email: '', location: '', lotNumber: 'GENERAL INQUIRY', message: '' });
                      }}
                      className="px-8 py-4 rounded-full border border-white/30 hover:border-white text-xs font-mono tracking-widest uppercase transition-all duration-300 hover:bg-white hover:text-black"
                    >
                      Dispatch Another Inquiry ↺
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Topic selector */}
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-[0.22em] text-white/80 mb-4">
                      Select Inquiry Nature
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {[
                        'BESPOKE TAILORING',
                        'VIP WHOLESALE',
                        'RUNWAY & PRESS',
                        'AUTHENTICATION',
                        'GENERAL INQUIRY',
                      ].map((topic) => (
                        <button
                          type="button"
                          key={topic}
                          onClick={() => setInquiryType(topic)}
                          className={`contact-topic-chip ${inquiryType === topic ? 'active' : ''}`}
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-[0.2em] text-white/70 mb-3">
                        Client Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Christian Dior / Vance"
                        className="contact-input-field"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs uppercase tracking-[0.2em] text-white/70 mb-3">
                        Direct Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. client@domain.com"
                        className="contact-input-field"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-[0.2em] text-white/70 mb-3">
                        City &amp; Country
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="e.g. Paris, France"
                        className="contact-input-field"
                      />
                    </div>

                    <div className="relative" ref={lotDropdownRef}>
                      <label className="block font-mono text-xs uppercase tracking-[0.2em] text-white/70 mb-3">
                        Archival Lot Reference
                      </label>
                      <button
                        type="button"
                        onClick={() => setIsLotDropdownOpen((prev) => !prev)}
                        className="contact-input-field contact-lot-trigger"
                        aria-expanded={isLotDropdownOpen}
                      >
                        <span className="truncate pr-4 text-white font-sans text-[15px]">
                          {LOT_OPTIONS.find((opt) => opt.value === formData.lotNumber)?.label || formData.lotNumber}
                        </span>
                        <svg
                          className={`w-4 h-4 text-white/60 transition-transform duration-300 flex-shrink-0 ${
                            isLotDropdownOpen ? 'rotate-180 text-white' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {isLotDropdownOpen && (
                        <div className="contact-lot-dropdown-panel">
                          {LOT_OPTIONS.map((opt) => {
                            const isSelected = formData.lotNumber === opt.value;
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                  setFormData((prev) => ({ ...prev, lotNumber: opt.value }));
                                  setIsLotDropdownOpen(false);
                                }}
                                className={`contact-lot-option ${isSelected ? 'selected' : ''}`}
                              >
                                <div>
                                  <div className="text-[14px] font-medium text-white">{opt.label}</div>
                                  <div className="text-[11px] font-mono tracking-wider text-white/40 uppercase mt-0.5">
                                    {opt.subtitle}
                                  </div>
                                </div>
                                {isSelected && (
                                  <svg
                                    className="w-4 h-4 text-white flex-shrink-0 ml-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2.5"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      <input type="hidden" name="lotNumber" value={formData.lotNumber} />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-[0.2em] text-white/70 mb-3">
                      Inquiry Details &amp; Specifications
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Detail your request, tailored anatomical measurements, wholesale quantities, or bespoke consultation schedule..."
                      className="contact-input-field resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === 'transmitting'}
                    className="contact-submit-btn"
                  >
                    {formStatus === 'transmitting' ? (
                      <span className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-black animate-ping" />
                        <span>{transmitStep}</span>
                      </span>
                    ) : (
                      <>
                        <span>TRANSMIT COMMISSION INQUIRY</span>
                        <span>↗</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* RIGHT COLUMN: USEFUL ATELIER SERVICES (FIT GUIDE, DISPATCH TRACKER, CARE PROTOCOL, CONCIERGE) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="space-y-6"
            >
              {/* 1. ARCHIVAL DISPATCH GLOBE (PREMIUM STATIC MAP) */}
              <div className="contact-panel-card flex flex-col items-center justify-center relative overflow-hidden" style={{ minHeight: 'clamp(400px, 60vh, 600px)', border: '1px solid rgba(255,255,255,0.05)', padding: 0 }}>
                {/* Decorative Overlay Label */}
                <div className="absolute top-8 left-8 right-8 flex justify-between items-start z-20 pointer-events-none">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/60 block mb-1">
                      GLOBAL DISPATCH NETWORK
                    </span>
                    <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                      WORLDWIDE FULFILLMENT
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400 font-bold">
                      LIVE
                    </span>
                  </div>
                </div>

                {/* Colorful Static Map Image */}
                <div className="w-full h-full absolute inset-0">
                  <img src="/images/luxury-world-map.jpg" alt="Global Operations Map" className="w-full h-full object-cover opacity-80" />
                  
                  {/* PINS FOR OFFICES */}
                  {/* North America (NYC approx) */}
                  <div className="absolute" style={{ top: '35%', left: '26%' }}>
                    <div className="relative">
                      <div className="w-3 h-3 bg-emerald-400 rounded-full" />
                      <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75" style={{ animationDuration: '2s' }} />
                      <span className="absolute top-4 left-1/2 -translate-x-1/2 font-mono text-[9px] text-white tracking-widest uppercase bg-black/60 px-1 py-0.5 rounded border border-white/10">NYC</span>
                    </div>
                  </div>

                  {/* Europe (Paris approx) */}
                  <div className="absolute" style={{ top: '30%', left: '48%' }}>
                    <div className="relative">
                      <div className="w-3 h-3 bg-emerald-400 rounded-full" />
                      <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75" style={{ animationDuration: '2.5s' }} />
                      <span className="absolute top-4 left-1/2 -translate-x-1/2 font-mono text-[9px] text-white tracking-widest uppercase bg-black/60 px-1 py-0.5 rounded border border-white/10">PARIS</span>
                    </div>
                  </div>

                  {/* Asia (Tokyo approx) */}
                  <div className="absolute" style={{ top: '38%', left: '84%' }}>
                    <div className="relative">
                      <div className="w-3 h-3 bg-emerald-400 rounded-full" />
                      <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75" style={{ animationDuration: '3s' }} />
                      <span className="absolute top-4 left-1/2 -translate-x-1/2 font-mono text-[9px] text-white tracking-widest uppercase bg-black/60 px-1 py-0.5 rounded border border-white/10">TOKYO</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-8 left-8 right-8 z-20 pointer-events-none">
                  <div className="flex justify-between items-end border-t border-white/10 pt-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: '1rem', borderRadius: '8px', backdropFilter: 'blur(4px)' }}>
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 block mb-1">
                        NODE LOCATIONS
                      </span>
                      <span className="font-mono text-xs text-white/80">
                        PORTO · PARIS · TOKYO · LONDON · NYC
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 block mb-1">
                        CARRIER
                      </span>
                      <span className="font-mono text-xs text-white/80 font-bold">
                        DHL 24H EXPRESS
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. ATELIER CONCIERGE FAQ ACCORDION (EXPANSIVE & SPACIOUS) */}
      {/* ========================================================================= */}
      <section className="relative z-10 pb-32 border-t border-white/10 pt-24">
        <div className="contact-page-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-white/50 block mb-3">
                FREQUENT CORRESPONDENCE
              </span>
              <h3 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
                Atelier Protocols &amp; FAQ
              </h3>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFAQIndex === idx;
                return (
                  <div key={idx} className="contact-faq-item">
                    <button
                      onClick={() => setOpenFAQIndex(isOpen ? null : idx)}
                      className="w-full p-6 md:p-8 text-left flex items-center justify-between gap-6 cursor-pointer"
                    >
                      <span className="contact-faq-question">
                        {faq.q}
                      </span>
                      <span className="text-white/70 font-mono text-2xl transition-transform duration-300">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="contact-faq-answer px-6 md:px-8 pb-8">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FINAL FOOTER */}
      {/* ========================================================================= */}
      <div className="relative z-50">
        <FinalFooter />
      </div>
    </motion.div>
  </div>
  );
};

export default Contact;
