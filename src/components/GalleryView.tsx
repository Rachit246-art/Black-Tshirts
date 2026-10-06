import React from 'react';
import { motion } from 'framer-motion';

const galleryImages = [
  { id: 1, src: '/real image/gallery-1.jfif', title: 'Design One' },
  { id: 2, src: '/real image/gallery-2.jfif', title: 'Design Two' },
  { id: 3, src: '/real image/gallery-3.jfif', title: 'Design Three' },
  { id: 4, src: '/real image/gallery-4.jfif', title: 'Design Four' },
  { id: 5, src: '/real image/gallery-5.jfif', title: 'Design Five' },
  { id: 6, src: '/real image/gallery-6.jfif', title: 'Design Six' },
  { id: 7, src: '/real image/gallery-7.jfif', title: 'Design Seven' },
  { id: 8, src: '/real image/gallery-10.jfif', title: 'Design Eight' },
  { id: 9, src: '/real image/gallery-11.jfif', title: 'Design Nine' }
];

const GalleryItem = ({ image, index }: { image: any; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1, // Staggered entry
        ease: "easeOut"
      }}
      className="relative group overflow-hidden rounded-xl bg-[#ffffff] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] cursor-pointer"
      style={{ aspectRatio: '4/5' }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
      
      <motion.img
        src={image.src}
        alt={image.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
      />
      
      <div className="absolute bottom-0 left-0 p-6 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <p className="text-white font-display uppercase tracking-[0.2em] text-xs mb-1 opacity-70">Apparel</p>
        <h3 className="text-white font-display text-2xl font-bold">{image.title}</h3>
      </div>
    </motion.div>
  );
};

export const GalleryView = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#000000] py-32 px-6 md:px-12 z-40">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col items-center mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight text-white mb-4"
          >
            The Collection
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-[#ffffff]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {galleryImages.map((img, idx) => (
            <GalleryItem key={img.id} image={img} index={idx % 3} />
          ))}
        </div>
      </div>
    </section>
  );
};
