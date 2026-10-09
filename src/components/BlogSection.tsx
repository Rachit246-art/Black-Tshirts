import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Post {
  id: number;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
}

const posts: Post[] = [
  {
    id: 1,
    tag: 'CRAFT PHILOSOPHY',
    date: 'OCT 2026',
    title: 'Why 420 GSM Changes Everything',
    excerpt: 'Most brands use 180-220 GSM cotton. We refuse. Here is why the weight of a garment is the single most important measure of its character and what it means for how you wear it.',
    image: '/real image/product-4.jpeg',
    readTime: '4 MIN READ',
  },
  {
    id: 2,
    tag: 'DESIGN PROCESS',
    date: 'SEP 2026',
    title: 'Building the Small Body Big Energy Silhouette',
    excerpt: 'From first sketch to final stitch, our most technically demanding graphic took 11 revisions across 3 continents. A behind-the-scenes look at what goes into a single limited drop.',
    image: '/real image/product-2.jpeg',
    readTime: '6 MIN READ',
  },
  {
    id: 3,
    tag: 'CULTURE',
    date: 'AUG 2026',
    title: 'The Obsidian Aesthetic: Black as a Creative Language',
    excerpt: 'There are infinite shades of black: carbon matte, acid-washed charcoal, tonal midnight. Each finish tells a completely different story. We break down the palette behind our entire catalog.',
    image: '/real image/product-7.jpeg',
    readTime: '5 MIN READ',
  },
];

const BlogCard = ({ post, index }: { post: Post; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 20 : -20, index % 2 === 0 ? -20 : 20]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col cursor-pointer overflow-hidden"
      style={{
        background: '#111111',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <motion.img
          style={{ y }}
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, #111111 100%)' }} />
        {/* Tag pill */}
        <div className="absolute top-4 left-4">
          <span style={{
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(10px)',
            padding: '4px 12px',
            fontFamily: 'monospace',
            fontSize: '9px',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: '#fff',
            borderRadius: '4px',
            border: '1px solid rgba(255,255,255,0.15)',
          }}>
            {post.tag}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 22px 26px' }}>
        <div className="flex items-center gap-3 mb-3">
          <span style={{ fontFamily: 'monospace', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.35)' }}>{post.date}</span>
          <span style={{ width: '16px', height: '1px', background: 'rgba(255,255,255,0.12)' }} />
          <span style={{ fontFamily: 'monospace', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.35)' }}>{post.readTime}</span>
        </div>

        <h3
          className="group-hover:text-white/80 transition-colors"
          style={{ fontFamily: 'sans-serif', fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.01em', color: '#fff', lineHeight: 1.25, marginBottom: '10px' }}
        >
          {post.title}
        </h3>

        <p style={{ fontFamily: 'sans-serif', fontSize: '0.82rem', color: 'rgba(255,255,255,0.42)', lineHeight: 1.7, marginBottom: '18px' }}>
          {post.excerpt}
        </p>

        <div className="flex items-center gap-2">
          <span style={{ fontFamily: 'monospace', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.55)' }}>
            READ ARTICLE
          </span>
          <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px' }}>&rarr;</span>
        </div>
      </div>

      {/* Hover bottom glow line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)' }}
      />
    </motion.div>
  );
};

export const BlogSection: React.FC = () => {
  return (
    <section
      className="relative w-full bg-[#000000] overflow-hidden"
      style={{ padding: 'clamp(80px, 10vw, 130px) clamp(20px, 6vw, 80px)' }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              style={{ fontFamily: 'monospace', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.3)', marginBottom: '12px' }}
            >
              &mdash; EDITORIAL &mdash;
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, textTransform: 'uppercase', color: '#fff', lineHeight: 1, letterSpacing: '-0.03em' }}
            >
              From The Studio
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ fontFamily: 'monospace', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', marginTop: '10px' }}
            >
              Craft stories, design process and culture
            </motion.p>
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="shrink-0 flex items-center gap-3 px-6 py-3 hover:border-white/60 transition-colors"
            style={{
              fontFamily: 'monospace', fontSize: '10px', textTransform: 'uppercase',
              letterSpacing: '0.2em', color: 'rgba(255,255,255,0.65)',
              background: 'transparent', cursor: 'pointer',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '4px',
            }}
          >
            ALL ARTICLES &rarr;
          </motion.button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
