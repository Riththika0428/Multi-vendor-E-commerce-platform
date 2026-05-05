"use client";

import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import { ArrowRight, Search, Star, ShoppingBag, ShieldCheck, Zap } from 'lucide-react';
import { useState } from 'react';

export default function Hero() {
  const { openAuthModal } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-56 lg:pb-32 overflow-hidden bg-white">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[80%] h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-indigo-100/50 via-violet-100/40 to-transparent rounded-full blur-[140px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] bg-gradient-to-tr from-fuchsia-50/40 via-indigo-50/30 to-transparent rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col items-start text-left max-w-2xl relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600/[0.03] border border-indigo-100/50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-8 backdrop-blur-sm"
            >
              <Star className="w-3.5 h-3.5 fill-indigo-600" />
              <span>Next-Gen Multi-Vendor Marketplace</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.95] mb-8"
            >
              The World's Finest <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600">Boutique</span> Goods.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl md:text-2xl text-slate-500 mb-12 leading-relaxed font-medium max-w-xl"
            >
              High-quality products from verified sellers worldwide. 
              Join the elite community of artisans and collectors.
            </motion.p>

            {/* Search Bar - Re-imagined */}
            <motion.form 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={handleSearch}
              className="w-full relative mb-12 group p-1.5 bg-slate-100 rounded-[2rem] border border-slate-200/50 focus-within:bg-white focus-within:shadow-[0_20px_50px_-10px_rgba(79,70,229,0.15)] focus-within:border-indigo-600/30 transition-all duration-500"
            >
              <input 
                type="text"
                placeholder="Search premium brands & goods..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-40 py-5 bg-transparent rounded-[1.8rem] text-slate-900 placeholder:text-slate-400 outline-none text-xl font-medium"
              />
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <button 
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-10 py-4 rounded-[1.5rem] font-bold hover:bg-indigo-600 transition-all shadow-lg active:scale-95"
              >
                Find Goods
              </button>
            </motion.form>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-10"
            >
              <button 
                onClick={() => openAuthModal('seller', 'register')}
                className="text-slate-900 font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:text-indigo-600 transition-all group"
              >
                Become a Seller <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all"><ArrowRight className="w-4 h-4" /></div>
              </button>
              <div className="flex items-center gap-4 bg-white/50 backdrop-blur-md px-6 py-3 rounded-2xl border border-slate-100">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`w-10 h-10 rounded-full border-4 border-white bg-slate-${i}00 overflow-hidden shadow-sm`}>
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900 leading-none mb-1">12k+ Global Users</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active this month</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Product Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* The Main Container with Glassmorphism Border */}
            <div className="relative p-4 rounded-[4rem] bg-gradient-to-b from-white/80 to-white/20 backdrop-blur-3xl border border-white/80 shadow-2xl overflow-hidden group">
              <div className="relative rounded-[3rem] overflow-hidden aspect-[4/5] lg:aspect-square bg-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop" 
                  alt="Featured Product" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Product Detail Card - Re-imagined */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute bottom-6 left-6 right-6 p-8 rounded-[2.5rem] bg-slate-950/80 backdrop-blur-2xl border border-white/10 shadow-3xl text-white"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-4 py-1.5 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full">Exclusive Drop</span>
                    <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-black">4.9</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-black mb-1">Minimalist Ceramic Watch</h3>
                  <p className="text-slate-400 text-sm mb-6 font-medium">Timeless design meets modern engineering.</p>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">$189.00</span>
                    <button className="flex-1 py-4 bg-white text-slate-950 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-xl shadow-white/10">
                      Add to Collection
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Glassmorphic Floating Badges */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 px-6 py-5 bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] hidden xl:flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 text-green-600" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Authenticity</p>
                <p className="text-base font-black text-slate-900">100% Verified</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-[20%] -left-10 px-6 py-5 bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] hidden xl:flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center">
                <Zap className="w-7 h-7 text-orange-600" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Global Trade</p>
                <p className="text-base font-black text-slate-900">Priority Hub</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
