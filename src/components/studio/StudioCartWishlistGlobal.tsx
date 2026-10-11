import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useStudioCartWishlist } from '../../context/StudioCartWishlistContext';

export const StudioCartWishlistGlobal: React.FC = () => {
  const {
    cartItems,
    setCartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    clearCart,

    wishlistItems,
    setIsWishlistOpen,
    isWishlistOpen,
    removeFromWishlist,
  } = useStudioCartWishlist();

  return (
    <>
      {/* Floating Wishlist Button */}
      <button 
        onClick={() => setIsWishlistOpen(true)}
        className="fixed z-50 bg-white text-black rounded-full transition-all duration-300 flex items-center justify-center group cursor-pointer"
        style={{ 
          bottom: '2rem', 
          left: '2rem', 
          width: '3.75rem', 
          height: '3.75rem',
          boxShadow: '0 10px 40px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,255,0.15)'
        }}
        aria-label="View Wishlist"
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
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
        className="fixed z-50 bg-white text-black rounded-full transition-all duration-300 flex items-center justify-center group cursor-pointer"
        style={{ 
          bottom: '2rem', 
          right: '2rem', 
          width: '3.75rem', 
          height: '3.75rem',
          boxShadow: '0 10px 40px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,255,0.15)'
        }}
        aria-label="View Cart"
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all">
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
              className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-end"
              style={{ zIndex: 999999 }}
              onClick={() => setIsCartOpen(false)}
            >
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="w-full max-w-md h-full border-l border-white/10 flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.9)]"
                style={{ backgroundColor: '#0a0a0a' }}
                onClick={e => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <h3 className="text-lg font-bold uppercase tracking-widest text-white">Your Cart</h3>
                  <button onClick={() => setIsCartOpen(false)} className="text-white/50 hover:text-white transition-colors text-xl cursor-pointer">✕</button>
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
                              onClick={() => removeFromCart(i)}
                              className="text-[10px] text-white/40 hover:text-red-500 uppercase tracking-widest transition-colors font-bold cursor-pointer"
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
                        clearCart();
                        setIsCartOpen(false);
                      }}
                      className="w-full bg-white text-black font-extrabold uppercase tracking-widest py-4 rounded-md hover:bg-neutral-200 transition-colors shadow-[0_4px_14px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
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
              className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-end"
              style={{ zIndex: 999999 }}
              onClick={() => setIsWishlistOpen(false)}
            >
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="w-full max-w-md h-full border-l border-white/10 flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.9)]"
                style={{ backgroundColor: '#0a0a0a' }}
                onClick={e => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <h3 className="text-lg font-bold uppercase tracking-widest text-white">Wishlist</h3>
                  <button onClick={() => setIsWishlistOpen(false)} className="text-white/50 hover:text-white transition-colors text-xl cursor-pointer">✕</button>
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
                          onClick={() => removeFromWishlist(item.id)}
                          className="w-8 h-8 rounded-full bg-red-600/10 text-red-500 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                          aria-label="Remove from wishlist"
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
    </>
  );
};
