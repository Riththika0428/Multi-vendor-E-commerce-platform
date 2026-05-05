"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import { ArrowRight, ShoppingBag, Heart, Zap, Star } from 'lucide-react';
import { useRef } from 'react';

export default function Hero() {
  const { openAuthModal } = useAuthStore();
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, 150]);
  const rotate = useTransform(scrollY, [0, 500], [0, 45]);

  return (
    <section ref={containerRef} className="relative pt-44 pb-32 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-bold mb-10 shadow-sm"
          >
            <Star className="w-4 h-4 fill-indigo-600" />
            <span>Voted #1 Best Marketplace 2024</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-[6rem] font-black text-slate-900 tracking-tight leading-[0.9] mb-8"
          >
            Buy everything <br /> 
            from <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 animate-gradient">Everywhere.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-xl md:text-2xl text-slate-500 max-w-2xl leading-relaxed mb-12 font-medium"
          >
            Simple, beautiful, and secure. Join thousands of creators 
            and shoppers in the most elegant marketplace ever built.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-5"
          >
            <button 
              onClick={() => openAuthModal('customer', 'register')}
              className="px-10 py-5 bg-indigo-600 text-white text-lg font-bold rounded-2xl hover:bg-indigo-700 shadow-2xl shadow-indigo-200 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              Start Shopping <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => openAuthModal('seller', 'register')}
              className="px-10 py-5 bg-white border-2 border-slate-100 text-slate-700 text-lg font-bold rounded-2xl hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
            >
              Sell Your Products
            </button>
          </motion.div>
        </div>
      </div>

      {/* Floating Decorative Items (Parallax) */}
      <motion.div style={{ y: y1, rotate }} className="absolute top-[20%] left-[10%] hidden lg:block opacity-20 pointer-events-none">
        <div className="w-32 h-32 bg-indigo-100 rounded-[2rem] flex items-center justify-center rotate-12">
          <ShoppingBag className="w-16 h-16 text-indigo-600" />
        </div>
      </motion.div>

      <motion.div style={{ y: y2 }} className="absolute bottom-[20%] right-[10%] hidden lg:block opacity-20 pointer-events-none">
        <div className="w-40 h-40 bg-fuchsia-100 rounded-full flex items-center justify-center -rotate-12">
          <Heart className="w-20 h-20 text-fuchsia-600" />
        </div>
      </motion.div>

      <motion.div style={{ scale: 1.2, x: 50 }} className="absolute top-[30%] right-[15%] hidden lg:block opacity-20 pointer-events-none">
        <div className="w-24 h-24 bg-blue-100 rounded-[1.5rem] flex items-center justify-center rotate-45">
          <Zap className="w-12 h-12 text-blue-600" />
        </div>
      </motion.div>
    </section>
  );
}
