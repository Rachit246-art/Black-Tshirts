import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FinalFooter } from '../components/FinalFooter';
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
              animate={{ opacity: 1, y: 0 }}
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
              animate={{ opacity: 1, y: 0 }}
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
              animate={{ opacity: 1, y: 0 }}
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
              {/* 1. SIZING & ANATOMICAL FIT GUIDE (INTERACTIVE) */}
              <div className="contact-panel-card">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/60">
                    ANATOMICAL FIT SPECIFICATIONS
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-emerald-400 font-bold">
                    SIZE &amp; DRAPE GUIDE
                  </span>
                </div>

                {/* Tab Switcher */}
                <div className="flex flex-wrap gap-2 mb-5">
                  <button
                    type="button"
                    onClick={() => setSelectedFit('boxy')}
                    className={`contact-fit-tab ${selectedFit === 'boxy' ? 'active' : ''}`}
                  >
                    420 GSM BOXY
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedFit('tailored')}
                    className={`contact-fit-tab ${selectedFit === 'tailored' ? 'active' : ''}`}
                  >
                    TAILORED CUT
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedFit('vintage')}
                    className={`contact-fit-tab ${selectedFit === 'vintage' ? 'active' : ''}`}
                  >
                    VINTAGE WASH
                  </button>
                </div>

                {/* Active Profile Specs */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display text-xl font-bold text-white uppercase tracking-tight">
                      {FIT_PROFILES[selectedFit].name}
                    </h4>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 font-mono tracking-widest uppercase">
                      {FIT_PROFILES[selectedFit].tag}
                    </span>
                  </div>

                  {/* 4 Measurement Chips */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div className="contact-spec-chip text-center">
                      <span className="block text-[10px] font-mono text-white/40 uppercase tracking-widest">CHEST</span>
                      <span className="block text-sm font-bold text-white mt-1">{FIT_PROFILES[selectedFit].chest}</span>
                    </div>
                    <div className="contact-spec-chip text-center">
                      <span className="block text-[10px] font-mono text-white/40 uppercase tracking-widest">LENGTH</span>
                      <span className="block text-sm font-bold text-white mt-1">{FIT_PROFILES[selectedFit].length}</span>
                    </div>
                    <div className="contact-spec-chip text-center">
                      <span className="block text-[10px] font-mono text-white/40 uppercase tracking-widest">SHOULDER</span>
                      <span className="block text-sm font-bold text-white mt-1">{FIT_PROFILES[selectedFit].shoulder}</span>
                    </div>
                    <div className="contact-spec-chip text-center">
                      <span className="block text-[10px] font-mono text-white/40 uppercase tracking-widest">WEIGHT</span>
                      <span className="block text-sm font-bold text-white mt-1">{FIT_PROFILES[selectedFit].weight.split(' ')[0]} {FIT_PROFILES[selectedFit].weight.split(' ')[1]}</span>
                    </div>
                  </div>

                  <p className="text-xs text-white/70 font-light leading-relaxed">
                    {FIT_PROFILES[selectedFit].silhouette}
                  </p>

                  <div className="p-3 bg-white/5 rounded-lg border border-white/10 flex items-start gap-2.5 text-xs text-white/80">
                    <span className="text-emerald-400 font-bold font-mono">ADVICE:</span>
                    <span>{FIT_PROFILES[selectedFit].recommendation}</span>
                  </div>
                </div>
              </div>

              {/* 2. ORDER DISPATCH & LIVE TRACKING LOOKUP */}
              <div className="contact-panel-card">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/60">
                    ARCHIVAL DISPATCH &amp; TRACKING
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-white/50">
                    DHL 24H EXPRESS
                  </span>
                </div>

                <p className="text-xs text-white/60 mb-4 font-light">
                  Query live fulfillment status for your physical order, bespoke commission, or vault reservation:
                </p>

                <form onSubmit={handleTrackSubmit} className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                    placeholder="e.g. JJ-84019 or email address"
                    className="contact-track-input flex-1"
                  />
                  <button type="submit" className="contact-track-btn">
                    TRACK
                  </button>
                </form>

                {trackingStatus ? (
                  <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-300 font-mono text-xs tracking-wider mb-4 animate-fade-in">
                    {trackingStatus}
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-xs font-mono text-white/50 p-2.5 bg-white/5 rounded-lg mb-4">
                    <span>GLOBAL FULFILLMENT:</span>
                    <span className="text-white/80 font-bold">100% ORDERS DISPATCHED WITHIN 24H</span>
                  </div>
                )}

                {/* Regional Timeline Grid */}
                <div className="grid grid-cols-3 gap-2 text-center pt-3 border-t border-white/10 font-mono">
                  <div className="p-2 bg-white/5 rounded">
                    <span className="block text-[10px] text-white/40 uppercase">USA &amp; CAN</span>
                    <span className="block text-xs font-bold text-white mt-0.5">2–3 DAYS</span>
                  </div>
                  <div className="p-2 bg-white/5 rounded">
                    <span className="block text-[10px] text-white/40 uppercase">EUROPE &amp; UK</span>
                    <span className="block text-xs font-bold text-white mt-0.5">2–4 DAYS</span>
                  </div>
                  <div className="p-2 bg-white/5 rounded">
                    <span className="block text-[10px] text-white/40 uppercase">WORLDWIDE</span>
                    <span className="block text-xs font-bold text-white mt-0.5">3–5 DAYS</span>
                  </div>
                </div>
              </div>

              {/* 3. PITCH-BLACK TEXTILE CARE & LONGEVITY */}
              <div className="contact-panel-card">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/60">
                    PITCH-BLACK TEXTILE CARE
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-white/50">
                    100+ WEAR PROTOCOL
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="contact-care-item">
                    <span className="block text-[11px] font-mono font-bold text-white uppercase tracking-wider mb-1">
                      30°C COLD WASH ONLY
                    </span>
                    <p className="text-[11px] text-white/60 font-light leading-relaxed">
                      Protects deep pitch-black reactive dye and preserves the dense 420 GSM combed yarn fibers.
                    </p>
                  </div>

                  <div className="contact-care-item">
                    <span className="block text-[11px] font-mono font-bold text-white uppercase tracking-wider mb-1">
                      HANG DRY INSIDE OUT
                    </span>
                    <p className="text-[11px] text-white/60 font-light leading-relaxed">
                      Prevents thermal shrinkage and maintains original drop-shoulder silhouette contours.
                    </p>
                  </div>

                  <div className="contact-care-item">
                    <span className="block text-[11px] font-mono font-bold text-white uppercase tracking-wider mb-1">
                      ZERO BLEACH / AGGRESSION
                    </span>
                    <p className="text-[11px] text-white/60 font-light leading-relaxed">
                      Shields high-density graphic discharge prints and serialized archival seam labels.
                    </p>
                  </div>

                  <div className="contact-care-item">
                    <span className="block text-[11px] font-mono font-bold text-white uppercase tracking-wider mb-1">
                      REVERSE LOW STEAM
                    </span>
                    <p className="text-[11px] text-white/60 font-light leading-relaxed">
                      Refreshes the reinforced 32mm collar rib tension with zero direct iron friction.
                    </p>
                  </div>
                </div>
              </div>

              {/* 4. DIRECT CLIENT CONCIERGE & GUARANTEES */}
              <div className="contact-desk-card">
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/60">
                    DIRECT CLIENT CHANNELS
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div className="space-y-4 text-xs font-mono">
                  <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
                    <span className="text-white/60 uppercase">Senior Concierge</span>
                    <a href="mailto:concierge@jjettas.com" className="text-white font-bold hover:underline tracking-wider">
                      concierge@jjettas.com ↗
                    </a>
                  </div>
                  <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
                    <span className="text-white/60 uppercase">Direct WhatsApp Desk</span>
                    <a href="https://wa.me/16128005538" target="_blank" rel="noreferrer" className="text-white font-bold hover:underline tracking-wider">
                      +1 (612) 800-JJET ↗
                    </a>
                  </div>
                  <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
                    <span className="text-white/60 uppercase">Response Guarantee</span>
                    <span className="text-emerald-400 font-bold">&lt; 2 Hours Average Response</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 uppercase">Exchange Policy</span>
                    <span className="text-white font-bold">14-Day Complimentary Size Swap</span>
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
    </div>
  );
};

export default Contact;
