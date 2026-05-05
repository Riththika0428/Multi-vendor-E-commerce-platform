"use client";

import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTA() {
  const { openAuthModal } = useAuthStore();

  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[4rem] p-12 md:p-24 text-center overflow-hidden shadow-[0_50px_100px_-20px_rgba(79,70,229,0.2)]"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 bg-slate-900" />
          <div className="absolute top-0 left-0 w-full h-full opacity-40">
            <div className="absolute -top-[50%] -left-[20%] w-[100%] h-[150%] bg-indigo-600 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute -bottom-[50%] -right-[20%] w-[100%] h-[150%] bg-violet-600 rounded-full blur-[120px]" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white text-sm font-bold mb-8 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Join the 1M+ active shoppers</span>
            </div>

            <h2 className="text-5xl md:text-8xl font-black text-white leading-[0.9] mb-10 tracking-tighter">
              The future of <br /> 
              commerce is <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-200 to-fuchsia-300">Beautiful.</span>
            </h2>

            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
              Experience MarketHub today. Build your brand or shop thousands of 
              verified products. The best time to start was yesterday.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => openAuthModal('customer', 'register')}
                className="w-full sm:w-auto px-12 py-6 bg-white text-slate-900 text-lg font-black rounded-3xl hover:scale-105 active:scale-95 transition-all shadow-2xl"
              >
                Get Started for Free
              </button>
              <button 
                onClick={() => openAuthModal('seller', 'register')}
                className="w-full sm:w-auto px-12 py-6 bg-white/5 border-2 border-white/10 text-white text-lg font-bold rounded-3xl hover:bg-white/10 transition-all"
              >
                Open Your Store <ArrowRight className="inline-block ml-2" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
