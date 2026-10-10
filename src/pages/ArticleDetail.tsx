import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { posts } from '../components/BlogSection';

export const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const article = posts.find(p => p.id.toString() === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white font-sans uppercase tracking-widest gap-6">
        <div>Article Not Found</div>
        <button onClick={() => navigate('/')} className="border border-white/20 px-6 py-2 hover:bg-white hover:text-black transition-colors">
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-20 overflow-x-hidden font-sans">
      <div className="max-w-4xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center text-xs tracking-wider text-white/50 font-medium mb-12">
          <button onClick={() => navigate('/')} className="hover:text-white transition-colors duration-300">HOME</button>
          <span className="mx-3 text-white/20">/</span>
          <span className="text-white">EDITORIAL</span>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <span style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '4px 12px',
              fontFamily: 'monospace',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#fff',
              borderRadius: '4px',
            }}>
              {article.tag}
            </span>
            <span style={{ fontFamily: 'monospace', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)' }}>
              {article.date} &bull; {article.readTime}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight text-white mb-8 leading-none">
            {article.title}
          </h1>

          <p className="text-xl text-white/60 leading-relaxed font-medium">
            {article.excerpt}
          </p>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full aspect-video rounded-2xl overflow-hidden border border-white/10 mb-16"
        >
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        </motion.div>

        {/* Content Body */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="prose prose-invert prose-lg max-w-none text-white/70 leading-loose"
        >
          <p className="mb-6">
            When we set out to create this collection, the objective was never to follow the path of least resistance. Every stitch, every choice of fabric, and every color treatment was debated until it met an impossible standard. The piece you see before you is the culmination of those obsessive details.
          </p>
          <p className="mb-6">
            We source our materials from the most rigorous mills and dye houses, ensuring that what reaches your hands isn't just an item of clothing—it's a testament to enduring quality. The silhouette is intentional, engineered to fall with a perfect drape while offering uncompromising comfort.
          </p>
          <h3 className="text-2xl font-bold uppercase tracking-widest text-white mt-12 mb-6">The Philosophy of Weight</h3>
          <p className="mb-6">
            Weight in a garment implies permanence. In a culture of fast fashion, building pieces that carry physical weight is an act of defiance. It forces the wearer to be present, to acknowledge the armor they've chosen for the day. That is why we refuse to compromise on GSM. 
          </p>
          <blockquote className="border-l-4 border-white/30 pl-6 my-10 italic text-2xl text-white/90">
            "We don't make clothes for a season. We make artifacts for an era."
          </blockquote>
          <p>
            The process is agonizing, but the result is indisputable. Thank you for joining us on this journey. We invite you to explore the rest of the collection in our Studio.
          </p>
        </motion.div>

        {/* Footer Navigation */}
        <div className="mt-24 pt-12 border-t border-white/10 flex justify-between items-center">
          <Link to="/" className="text-xs font-mono uppercase tracking-widest text-white/50 hover:text-white transition-colors">
            &larr; Back to Home
          </Link>
          <Link to="/studio" className="text-xs font-mono uppercase tracking-widest text-white/50 hover:text-white transition-colors">
            Visit the Studio &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};
