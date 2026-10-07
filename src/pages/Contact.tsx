import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContactIntro } from '../components/ContactIntro';
import { FinalFooter } from '../components/FinalFooter';
import '../styles/contact.css';

interface HubLocation {
  city: string;
  country: string;
  timezone: string;
  offsetHours: number;
  role: string;
  address: string;
  coordinates: string;
}

const hubs: HubLocation[] = [
  {
    city: 'Porto',
    country: 'Portugal',
    timezone: 'WET / GMT+0',
    offsetHours: 0,
    role: 'Circular Weaving & Milling Mills',
    address: 'Rua de Santa Catarina 420, 4000-444 Porto',
    coordinates: '41.1579° N, 8.6291° W',
  },
  {
    city: 'Paris',
    country: 'France',
    timezone: 'CET / GMT+1',
    offsetHours: 1,
    role: 'Haute Couture Private Showroom',
    address: '18 Place Vendôme, 75001 Paris',
    coordinates: '48.8675° N, 2.3294° E',
  },
  {
    city: 'Minneapolis',
    country: 'USA',
    timezone: 'CDT / GMT-5',
    offsetHours: -5,
    role: 'Americas Flagship Vault & Distribution',
    address: '900 Nicollet Mall, Minneapolis, MN 55403',
    coordinates: '44.9759° N, 93.2728° W',
  },
];

interface FAQItem {
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  {
    q: 'What is the certified care protocol for 420 GSM heavyweight cotton?',
    a: 'Turn garment inside out. Cold machine wash below 30°C (85°F) with gentle eco-friendly detergent. Never tumble dry — reshape flat on a clean surface. The pre-shrunk combed fibers retain their permanent structure and velvety hand-feel across 100+ cycles.',
  },
  {
    q: 'How does private bespoke fitting and tailoring operate?',
    a: 'Private consultations are arranged via our Porto and Paris ateliers. We take 14 anatomical measurements to adjust drop-shoulder drape, rib collar tension, and torso break points for custom runs.',
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

export const Contact: React.FC = () => {
  const [showIntro, setShowIntro] = useState<boolean>(true);

  // Form State
  const [inquiryType, setInquiryType] = useState<string>('BESPOKE TAILORING');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    lotNumber: 'GENERAL INQUIRY',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'transmitting' | 'confirmed'>('idle');
  const [ticketRef, setTicketRef] = useState<string>('');

  // Open FAQ accordion index
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(0);

  // Live World Clocks
  const [timeUtc, setTimeUtc] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeUtc(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCityTime = (offsetHours: number) => {
    const d = new Date(timeUtc.getTime() + offsetHours * 3600000);
    return d.toTimeString().split(' ')[0];
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setFormStatus('transmitting');

    setTimeout(() => {
      const generatedTicket = `MJ-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketRef(generatedTicket);
      setFormStatus('confirmed');
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-[#000000] text-[#ffffff] selection:bg-[#ffffff] selection:text-[#000000] overflow-x-clip">
      {/* 0. INTRO PIECES ASSEMBLY OVERLAY */}
      <AnimatePresence>
        {showIntro && <ContactIntro onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      {/* Main Page Content with smooth entrance reveal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1, y: showIntro ? 20 : 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Ambient Subtle Lighting */}
        <div aria-hidden="true" className="contact-ambient-glow" />

        {/* ========================================================================= */}
        {/* 1. HERO HEADER SECTION */}
        {/* ========================================================================= */}
        <section className="relative z-10 pt-36 md:pt-48 pb-16">
          <div className="contact-page-container">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 relative z-10">
              {/* Top pill badge + Replay Intro */}
              <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/90">
                    Live Atelier Channel · <span className="text-white/60">Response &lt; 2h</span>
                  </span>
                </motion.div>

                <button
                  onClick={() => setShowIntro(true)}
                  className="contact-replay-btn"
                  title="Replay Archival Concierge Transmission Intro"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span>REPLAY INTRO</span>
                </button>
              </div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-[-0.03em] leading-[0.9] mb-8"
              >
                DIRECT ATELIER <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-white/40">
                  CONCIERGE.
                </span>
              </motion.h1>

              {/* Sub-paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-neutral-400 text-sm md:text-base lg:text-lg max-w-2xl leading-relaxed font-light mb-10"
              >
                Direct correspondence for private fittings, bespoke textile engineering, wholesale inquiries,
                and serial authentication.
              </motion.p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. MAIN INTERACTIVE FORM & ATELIER DETAILS */}
        {/* ========================================================================= */}
        <section className="relative z-10 pb-28">
          <div className="contact-page-container">
            <div className="contact-grid-layout">
              {/* LEFT COLUMN: BESPOKE INQUIRY FORM */}
              <div className="contact-card">
                <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 block mb-1">
                      DISPATCH FORM // DIRECT PIPELINE
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-white">
                      Initiate Private Inquiry
                    </h3>
                  </div>
                  <span className="font-mono text-xs px-3 py-1 rounded bg-white/10 text-white/80">
                    256-BIT ENCRYPTED
                  </span>
                </div>

                {formStatus === 'confirmed' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-emerald-500/40 bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-2xl">
                      ✓
                    </div>
                    <h4 className="text-2xl font-bold uppercase tracking-tight mb-2">
                      Transmission Received
                    </h4>
                    <p className="text-white/60 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                      Your inquiry has been logged in the Porto master ledger. Our senior atelier concierge will review
                      and respond via encrypted dispatch within 2 business hours.
                    </p>
                    <div className="inline-block p-4 rounded bg-white/5 border border-white/10 font-mono text-xs text-white/80 mb-8">
                      <span className="text-white/50 block mb-1">REFERENCE TICKET</span>
                      <span className="text-white font-bold tracking-widest text-sm">{ticketRef}</span>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          setFormStatus('idle');
                          setFormData({ name: '', email: '', location: '', lotNumber: 'GENERAL INQUIRY', message: '' });
                        }}
                        className="px-6 py-3 rounded-full border border-white/20 hover:border-white text-xs font-mono tracking-widest uppercase transition-colors"
                      >
                        Submit Another Inquiry ↺
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Topic selector */}
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 mb-3">
                        Select Inquiry Nature
                      </label>
                      <div className="flex flex-wrap gap-2">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 mb-2">
                          Client Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g. Alexander Vance"
                          className="contact-input-field"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 mb-2">
                          Email Address *
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 mb-2">
                          City / Country
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

                      <div>
                        <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 mb-2">
                          Associated Piece / Lot
                        </label>
                        <select
                          name="lotNumber"
                          value={formData.lotNumber}
                          onChange={handleInputChange}
                          className="contact-input-field bg-neutral-900"
                        >
                          <option value="GENERAL INQUIRY">General Inquiry (No Lot)</option>
                          <option value="LOT 001">Lot 001 — Smile Heal The Soul</option>
                          <option value="LOT 002">Lot 002 — Small Body Big Energy</option>
                          <option value="LOT 003">Lot 003 — Chicago Racing Team</option>
                          <option value="LOT 004">Lot 004 — Chains Kurapika</option>
                          <option value="LOT 027">Lot 027 — Maison Finale Runway</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 mb-2">
                        Inquiry Details / Sizing Specifications
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Detail your request, tailored specifications, or bespoke consultation preferences..."
                        className="contact-input-field resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formStatus === 'transmitting'}
                      className="contact-submit-btn"
                    >
                      {formStatus === 'transmitting' ? (
                        <span>TRANSMITTING INQUIRY...</span>
                      ) : (
                        <>
                          <span>DISPATCH INQUIRY</span>
                          <span>↗</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* RIGHT COLUMN: GLOBAL HUBS & DIRECT DESKS */}
              <div className="space-y-6">
                {/* Global World Clocks Hubs */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">
                      ATELIER GLOBAL HUBS
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400">
                      LIVE CLOCKS
                    </span>
                  </div>

                  {hubs.map((hub) => (
                    <div key={hub.city} className="contact-hub-card">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-lg font-bold uppercase tracking-tight text-white flex items-center gap-2">
                            {hub.city}, {hub.country}
                          </h4>
                          <span className="text-xs text-white/50 font-mono">{hub.role}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-mono text-sm font-bold text-white tracking-widest block">
                            {formatCityTime(hub.offsetHours)}
                          </span>
                          <span className="font-mono text-[10px] text-white/40 uppercase">{hub.timezone}</span>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
                        <span>{hub.address}</span>
                        <span className="hidden sm:inline">{hub.coordinates}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Direct VIP Lines */}
                <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 block mb-4">
                    DIRECT DESK CHANNELS
                  </span>
                  <div className="space-y-4 text-xs font-mono">
                    <div className="flex items-center justify-between pb-3 border-b border-white/5">
                      <span className="text-white/60 uppercase">Senior Concierge</span>
                      <a href="mailto:concierge@jjettas.com" className="text-white font-bold hover:underline">
                        concierge@jjettas.com ↗
                      </a>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-white/5">
                      <span className="text-white/60 uppercase">Runway &amp; Press</span>
                      <a href="mailto:press@jjettas.com" className="text-white font-bold hover:underline">
                        press@jjettas.com ↗
                      </a>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 uppercase">Private Fitting Suite</span>
                      <span className="text-white font-bold">By Appointment Only</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. ATELIER CONCIERGE FAQ ACCORDION */}
        {/* ========================================================================= */}
        <section className="relative z-10 pb-28 border-t border-white/10 pt-20">
          <div className="contact-page-container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/50 block mb-2">
                  FREQUENT CORRESPONDENCE
                </span>
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
                  Atelier Protocols &amp; FAQ
                </h3>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isOpen = openFAQIndex === idx;
                  return (
                    <div key={idx} className="contact-faq-item">
                      <button
                        onClick={() => setOpenFAQIndex(isOpen ? null : idx)}
                        className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                      >
                        <span className="font-bold text-sm md:text-base text-white tracking-tight">
                          {faq.q}
                        </span>
                        <span className="text-white/60 font-mono text-lg transition-transform duration-300">
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="px-5 pb-5 text-xs md:text-sm text-neutral-400 leading-relaxed font-light">
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
