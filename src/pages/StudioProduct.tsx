import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { allGalleryPieces } from './Studio';
import '../styles/gallery.css';

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
  </svg>
);

const ChevronUp = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 15l-6-6-6 6" />
  </svg>
);

export const StudioProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const piece = allGalleryPieces.find((p) => p.id === id);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState('01');
  const [openAccordion, setOpenAccordion] = useState<string | null>('details');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Cart State
  const [cartItems, setCartItems] = useState<{ id: string, title: string, size: string, image: string, price: number }[]>(() => {
    const saved = localStorage.getItem('studio_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showSizeAlert, setShowSizeAlert] = useState(false);

  // Wishlist State
  const [wishlistItems, setWishlistItems] = useState<{ id: string, title: string, image: string, price: number }[]>(() => {
    const saved = localStorage.getItem('studio_wishlist');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  });
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('studio_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('studio_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowRight') setCurrentImageIndex(prev => (prev + 1) % (piece?.images?.length || 5));
      if (e.key === 'ArrowLeft') setCurrentImageIndex(prev => (prev - 1 + (piece?.images?.length || 5)) % (piece?.images?.length || 5));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, piece]);

  const toggleWishlist = () => {
    if (!piece) return;
    const exists = wishlistItems.some(item => item.id === piece.id);
    if (exists) {
      setWishlistItems(prev => prev.filter(item => item.id !== piece.id));
    } else {
      setWishlistItems(prev => [...prev, {
        id: piece.id,
        title: piece.title,
        image: piece.image,
        price: 999
      }]);
    }
  };

  const isWishlisted = piece ? wishlistItems.some(item => item.id === piece.id) : false;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowSizeAlert(true);
      setTimeout(() => setShowSizeAlert(false), 3000);
      return;
    }
    setCartItems(prev => [...prev, {
      id: piece.id,
      title: piece.title,
      size: selectedSize,
      image: piece.image,
      price: 999
    }]);
    setIsCartOpen(true);
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!piece) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white font-sans uppercase tracking-widest gap-6">
        <div>Product Not Found</div>
        <button onClick={() => navigate('/studio')} className="border border-white/20 px-6 py-2 hover:bg-white hover:text-black transition-colors">
          Return to Studio
        </button>
      </div>
    );
  }

  const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  
  // Create an array of 5 images. If the piece doesn't have custom images, duplicate the main image.
  const displayImages = piece.images && piece.images.length >= 5 
    ? piece.images 
    : [piece.image, piece.image, piece.image, piece.image, piece.image];

  // Find similar products
  const similarProducts = allGalleryPieces
    .filter(p => p.id !== piece.id && p.category === piece.category)
    .slice(0, 4);

  if (similarProducts.length < 4) {
    const additional = allGalleryPieces
      .filter(p => p.id !== piece.id && !similarProducts.find(s => s.id === p.id))
      .slice(0, 4 - similarProducts.length);
    similarProducts.push(...additional);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-20 overflow-x-hidden font-sans selection:bg-red-600 selection:text-white">
      
      <div className="studio-product-layout">
        
        {/* LEFT COLUMN - IMAGE SLIDER */}
        <div className="studio-product-col" style={{ gap: '1rem' }}>
          
          {/* Top Header / Breadcrumb */}
          <div className="flex items-center text-xs tracking-wider text-white/50 font-medium mb-6 mt-2">
            <button onClick={() => navigate('/')} className="hover:text-white transition-colors duration-300">HOME</button>
            <span className="mx-3 text-white/20">/</span>
            <button onClick={() => navigate('/studio')} className="hover:text-white transition-colors duration-300">STUDIO</button>
            <span className="mx-3 text-white/20">/</span>
            <span className="text-white">{piece.title}</span>
          </div>

          {/* Main Large Image */}
          <div 
            className="relative w-full aspect-[4/5] bg-[#08080a] overflow-hidden rounded-2xl border border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.5)] group cursor-pointer"
            onClick={() => setIsLightboxOpen(true)}
            title="Click to view full screen"
          >
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 z-10 pointer-events-none flex items-center justify-center">
               <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 text-white px-4 py-2 rounded-full font-bold tracking-widest text-xs flex items-center gap-2 backdrop-blur-sm border border-white/20">
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                 EXPAND
               </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={displayImages[currentImageIndex]}
                alt={`${piece.title} - View ${currentImageIndex + 1}`}
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
            </AnimatePresence>
            
            <div className="absolute top-4 left-4 z-20">
              <div className="bg-black px-4 py-2 text-[10px] font-mono uppercase tracking-widest text-white font-bold border border-white/20 rounded-sm shadow-xl">
                LOT {piece.lot} · {piece.badge}
              </div>
            </div>
            
            <div className="gallery-laser-scan z-20" />
          </div>

          {/* Thumbnails Row */}
          <div className="flex flex-row gap-3 overflow-x-auto pb-2 scrollbar-hide" style={{ marginTop: '1.5rem' }}>
            {displayImages.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`relative w-20 h-24 shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  currentImageIndex === idx 
                    ? 'border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-[1.05]' 
                    : 'border-white/10 hover:border-white/50'
                }`}
              >
                <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

        </div>

        {/* RIGHT COLUMN - PREMIUM E-COMMERCE INFO */}
        <div className="studio-product-col">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="studio-product-sticky"
          >
            {/* Invisible spacer to perfectly align the title with the top of the image */}
            <div className="flex items-center text-xs mb-6 mt-2 invisible select-none" aria-hidden="true">
              <span>Spacer</span>
            </div>

            {/* Title & Price */}
            <div className="mb-10">
              <h1 className="text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white mb-6 leading-none font-sans">
                {piece.title}
              </h1>
              <div className="flex flex-col" style={{ gap: '0.5rem' }}>
                <div className="text-2xl font-bold tracking-tight text-white">₹ 999</div>
                <div className="text-xs text-white/50 font-medium" style={{ marginTop: '0.25rem' }}>Price incl. of all taxes</div>
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-10">
              <div className="flex justify-between items-end mb-4">
                <span className="text-sm font-semibold text-white/90">Select Size</span>
                <button className="text-xs font-semibold text-white/50 hover:text-white uppercase tracking-wider transition-colors border-b border-transparent hover:border-white pb-0.5">
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`h-14 rounded-md flex items-center justify-center text-sm font-bold transition-all duration-300 border ${
                      selectedSize === s 
                        ? 'border-white bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                        : 'border-white/15 text-white/60 hover:border-white/50 hover:text-white bg-[#111]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions: Add to Cart & Wishlist */}
            <div className="flex flex-row items-stretch gap-3 mb-10 w-full">
              
              {/* Premium Add to Cart */}
              <button 
                onClick={handleAddToCart}
                className="flex-1 relative group overflow-hidden bg-white text-black rounded-md h-12 flex items-center justify-center font-bold uppercase tracking-widest text-xs sm:text-sm transition-all shadow-[0_4px_14px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.2)] hover:scale-[1.02]"
              >
                <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
                  Add To Cart
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-red-600 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[0.16,1,0.3,1] z-0" />
              </button>

              {/* Wishlist Icon */}
              <button 
                onClick={toggleWishlist}
                className="w-12 h-12 shrink-0 rounded-md border flex items-center justify-center transition-all duration-300"
                style={isWishlisted ? {
                  borderColor: '#dc2626',
                  color: '#dc2626',
                  backgroundColor: 'rgba(220,38,38,0.1)'
                } : {
                  borderColor: 'rgba(255,255,255,0.2)',
                  color: '#fff',
                  backgroundColor: '#111'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Delivery Details Container */}
            <div className="mb-10 border border-white/10 rounded-xl bg-[#0f0f0f] p-5 shadow-inner w-full">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/80 mb-4 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                Delivery Details
              </h4>
              <div className="flex mb-4 gap-3">
                <input 
                  type="text" 
                  placeholder="Enter Pincode" 
                  className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-3 text-sm outline-none focus:border-white/50 transition-colors text-white placeholder-white/30"
                />
                <button className="px-4 text-xs font-bold uppercase tracking-widest text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors">
                  Check
                </button>
              </div>
              <p className="text-xs text-white/40 leading-relaxed">
                Free standard shipping on all archive orders. Eligible for returns within 30 days.
              </p>
            </div>

            {/* Accordions */}
            <div className="border-t border-white/10">
              
              {/* Product Details */}
              <div className="border-b border-white/10">
                <button 
                  onClick={() => toggleAccordion('details')}
                  className="w-full py-5 flex justify-between items-center group outline-none"
                >
                  <span className="text-sm font-bold uppercase tracking-wide text-white/80 group-hover:text-white transition-colors">
                    Product Details
                  </span>
                  <span className="text-white/50 group-hover:text-white transition-colors">
                    {openAccordion === 'details' ? <ChevronUp /> : <ChevronDown />}
                  </span>
                </button>
                <AnimatePresence>
                  {openAccordion === 'details' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 text-sm text-white/70 space-y-5 leading-relaxed">
                        <div>
                          <strong className="block text-white mb-1">Material & Care:</strong>
                          <p>{piece.weight}</p>
                          <p>{piece.wash}</p>
                        </div>
                        <div>
                          <strong className="block text-white mb-1">Country of Origin:</strong>
                          <p>India (and proud)</p>
                        </div>
                        <div>
                          <strong className="block text-white mb-1">Manufactured & Sold By:</strong>
                          <p>Antigravity Studios Pvt. Ltd.</p>
                          <p>Tech Park Phase 1, Neo-Tokyo Division</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Product Description */}
              <div className="border-b border-white/10">
                <button 
                  onClick={() => toggleAccordion('description')}
                  className="w-full py-5 flex justify-between items-center group outline-none"
                >
                  <span className="text-sm font-bold uppercase tracking-wide text-white/80 group-hover:text-white transition-colors">
                    Product Description
                  </span>
                  <span className="text-white/50 group-hover:text-white transition-colors">
                    {openAccordion === 'description' ? <ChevronUp /> : <ChevronDown />}
                  </span>
                </button>
                <AnimatePresence>
                  {openAccordion === 'description' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 text-sm text-white/70 leading-relaxed">
                        {piece.description}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Atelier's Details */}
              <div className="border-b border-white/10">
                <button 
                  onClick={() => toggleAccordion('artist')}
                  className="w-full py-5 flex justify-between items-center group outline-none"
                >
                  <span className="text-sm font-bold uppercase tracking-wide text-white/80 group-hover:text-white transition-colors">
                    Atelier's Details
                  </span>
                  <span className="text-white/50 group-hover:text-white transition-colors">
                    {openAccordion === 'artist' ? <ChevronUp /> : <ChevronDown />}
                  </span>
                </button>
                <AnimatePresence>
                  {openAccordion === 'artist' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 space-y-3">
                        {piece.specs.map(s => (
                          <div key={s.label} className="flex justify-between items-center text-sm">
                            <span className="text-white/60">{s.label}</span>
                            <span className="text-white font-medium">{s.value}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* SIMILAR PRODUCTS SECTION */}
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 mt-24 md:mt-32 border-t border-white/10 pt-16">
        <h2 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-white mb-10 text-center">
          You May Also Like
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {similarProducts.map((p) => (
            <div key={p.id} className="group cursor-pointer flex flex-col" onClick={() => navigate(`/studio/${p.id}`)}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-[#08080a] mb-4 border border-white/10 group-hover:border-white/30 transition-colors">
                <img src={p.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-[1.03]" alt={p.title} />
              </div>
              <div className="flex flex-col gap-1 px-1">
                <span className="text-[10px] text-white/50 font-mono uppercase tracking-widest">{p.category}</span>
                <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wide truncate">{p.title}</span>
                <span className="text-xs text-white/70">₹ 999</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Wishlist Button */}
      <button 
        onClick={() => setIsWishlistOpen(true)}
        className="fixed z-50 bg-white text-black rounded-full transition-transform duration-300 flex items-center justify-center group"
        style={{ 
          bottom: '2rem', 
          left: '2rem', 
          width: '4rem', 
          height: '4rem',
          boxShadow: '0 10px 40px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,255,0.1)'
        }}
        aria-label="View Wishlist"
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-all">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        {/* Wishlist Badge */}
        {wishlistItems.length > 0 && (
          <div 
            className="absolute font-bold flex items-center justify-center rounded-full"
            style={{ 
              top: '-4px', 
              right: '-4px', 
              width: '24px', 
              height: '24px', 
              fontSize: '11px',
              backgroundColor: '#dc2626',
              color: '#ffffff',
              border: '2px solid #0a0a0a'
            }}
          >
            {wishlistItems.length}
          </div>
        )}
      </button>

      {/* Floating Cart Button */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className="fixed z-50 bg-white text-black rounded-full transition-transform duration-300 flex items-center justify-center group"
        style={{ 
          bottom: '2rem', 
          right: '2rem', 
          width: '4rem', 
          height: '4rem',
          boxShadow: '0 10px 40px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,255,0.1)'
        }}
        aria-label="View Cart"
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
        {/* Cart Item Badge */}
        {cartItems.length > 0 && (
          <div 
            className="absolute font-bold flex items-center justify-center rounded-full"
            style={{ 
              top: '-4px', 
              right: '-4px', 
              width: '24px', 
              height: '24px', 
              fontSize: '11px',
              backgroundColor: '#dc2626',
              color: '#ffffff',
              border: '2px solid #0a0a0a'
            }}
          >
            {cartItems.length}
          </div>
        )}
      </button>

      {/* Cart Sidebar Overlay */}
      {createPortal(
        <AnimatePresence>
          {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-end"
            style={{ zIndex: 999999 }}
            onClick={() => setIsCartOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="w-full max-w-md h-full border-l border-white/10 flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)]"
              style={{ backgroundColor: '#0a0a0a' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h3 className="text-lg font-bold uppercase tracking-widest text-white">Your Cart</h3>
                <button onClick={() => setIsCartOpen(false)} className="text-white/50 hover:text-white transition-colors text-xl">✕</button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                {cartItems.length === 0 ? (
                  <div className="text-white/50 text-center mt-10 uppercase tracking-widest text-sm font-medium">Your cart is empty</div>
                ) : (
                  cartItems.map((item, i) => (
                    <div key={i} className="flex gap-5 items-center">
                      <img src={item.image} className="w-20 h-24 object-cover rounded-md border border-white/10" alt={item.title} />
                      <div className="flex flex-col flex-1">
                        <span className="font-bold uppercase tracking-wide text-sm text-white mb-1">{item.title}</span>
                        <span className="text-white/50 text-xs uppercase tracking-widest mb-3">Size: {item.size}</span>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-white tracking-tight">₹ {item.price}</span>
                          <button 
                            onClick={() => setCartItems(prev => prev.filter((_, idx) => idx !== i))}
                            className="text-[10px] text-white/40 hover:text-red-500 uppercase tracking-widest transition-colors font-bold"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-[#050505]">
                  <div className="flex justify-between items-center mb-6 text-lg">
                    <span className="font-bold text-white/50 uppercase tracking-widest text-sm">Total</span>
                    <span className="font-bold text-white tracking-tight">₹ {cartItems.reduce((acc, curr) => acc + curr.price, 0)}</span>
                  </div>
                  <button 
                    onClick={() => {
                      alert('Redirecting to secure checkout...');
                      setCartItems([]);
                      setIsCartOpen(false);
                    }}
                    className="w-full bg-white text-black font-extrabold uppercase tracking-widest py-4 rounded-md hover:bg-neutral-200 transition-colors shadow-[0_4px_14px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Secure Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}

      {/* Wishlist Sidebar Overlay */}
      {createPortal(
        <AnimatePresence>
          {isWishlistOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-end"
            style={{ zIndex: 999999 }}
            onClick={() => setIsWishlistOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="w-full max-w-md h-full border-l border-white/10 flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)]"
              style={{ backgroundColor: '#0a0a0a' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h3 className="text-lg font-bold uppercase tracking-widest text-white">Wishlist</h3>
                <button onClick={() => setIsWishlistOpen(false)} className="text-white/50 hover:text-white transition-colors text-xl">✕</button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                {wishlistItems.length === 0 ? (
                  <div className="text-white/50 text-center mt-10 uppercase tracking-widest text-sm font-medium">Your wishlist is empty</div>
                ) : (
                  wishlistItems.map((item, i) => (
                    <div key={i} className="flex gap-5 items-center">
                      <img src={item.image} className="w-20 h-24 object-cover rounded-md border border-white/10" alt={item.title} />
                      <div className="flex flex-col flex-1">
                        <span className="font-bold uppercase tracking-wide text-sm text-white mb-1">{item.title}</span>
                        <span className="font-bold text-white tracking-tight mt-2">₹ {item.price}</span>
                      </div>
                      <button 
                        onClick={() => setWishlistItems(prev => prev.filter(w => w.id !== item.id))}
                        className="w-8 h-8 rounded-full bg-red-600/10 text-red-500 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                           <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}

      {/* Custom Size Alert Pop-up */}
      {createPortal(
        <AnimatePresence>
          {showSizeAlert && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%", scale: 0.3 }}
            animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
            exit={{ opacity: 0, x: "-50%", scale: 0.5, transition: { duration: 0.2 } }}
            style={{ 
              position: 'fixed',
              bottom: '2.5rem',
              left: '50%',
              zIndex: 110,
              backgroundColor: '#dc2626',
              color: '#ffffff',
              padding: '0.75rem 1.5rem',
              borderRadius: '9999px',
              fontWeight: 'bold',
              boxShadow: '0 10px 40px rgba(220,38,38,0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              border: '2px solid #0a0a0a',
              letterSpacing: '1px',
              fontSize: '12px'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            PLEASE SELECT A SIZE
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}

      {/* Fullscreen Image Lightbox */}
      {createPortal(
        <AnimatePresence>
          {isLightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center"
              style={{ zIndex: 9999999 }}
              onClick={() => setIsLightboxOpen(false)}
            >
              <button className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors z-50">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                   <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
              
              <button 
                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(prev => (prev - 1 + displayImages.length) % displayImages.length); }}
                className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/30 text-white transition-all z-50 border border-white/20"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <motion.img 
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={displayImages[currentImageIndex]} 
                className="max-w-full max-h-[90vh] object-contain select-none shadow-[0_0_100px_rgba(255,255,255,0.05)]"
                alt="Fullscreen"
                onClick={e => e.stopPropagation()}
              />

              <button 
                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(prev => (prev + 1) % displayImages.length); }}
                className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/30 text-white transition-all z-50 border border-white/20"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
              
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4">
                {displayImages.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(i); }}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currentImageIndex ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/60'}`} 
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

    </div>
  );
};
