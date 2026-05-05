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
    // Real search logic would go here
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      {/* Background Decorative Gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -z-10 translate-x-1/4 skew-x-[-15deg]" />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col items-start text-left max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold mb-6"
            >
              <Star className="w-3.5 h-3.5 fill-indigo-600" />
              <span>Next-Gen Multi-Vendor Marketplace</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6"
            >
              The World's Finest <br />
              <span className="text-indigo-600">Boutique</span> Goods.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl text-slate-500 mb-10 leading-relaxed"
            >
              High-quality products from verified sellers worldwide. 
              Join the elite community of creators and conscious shoppers.
            </motion.p>

            {/* Search Bar - Primary Action */}
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSearch}
              className="w-full relative mb-10 group"
            >
              <input 
                type="text"
                placeholder="Search for premium products, brands, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-32 py-5 bg-white border-2 border-slate-100 rounded-2xl shadow-xl shadow-slate-100/50 text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-lg"
              />
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
              >
                Search
              </button>
            </motion.form>

            {/* Secondary CTA buttons */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-8 mb-12"
            >
              <button 
                onClick={() => openAuthModal('seller', 'register')}
                className="text-slate-900 font-bold flex items-center gap-2 hover:text-indigo-600 transition-colors group"
              >
                Become a Seller <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="h-4 w-[1px] bg-slate-200" />
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-slate-${2 + i}00`} />
                  ))}
                </div>
                <p className="text-sm font-medium text-slate-500">
                  <span className="text-slate-900 font-bold">12k+</span> Happy Customers
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative lg:block"
          >
            <div className="relative rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(79,70,229,0.15)] bg-slate-100 aspect-[4/5] lg:aspect-square">
              <img 
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop" 
                alt="Featured Product" 
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
              
              {/* Product Info Overlay Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-8 left-8 right-8 bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white/50 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-wider rounded-full">New Arrivals</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold text-slate-900">4.9 (1.2k)</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Minimalist Ceramic Watch</h3>
                <p className="text-slate-500 text-sm mb-4">Timeless design for the modern era.</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-indigo-600">$189.00</span>
                  <button className="p-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors">
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Floating Badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 hidden xl:flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Authentication</p>
                <p className="text-sm font-black text-slate-900">100% Verified</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-1/4 -left-12 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 hidden xl:flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Shipping</p>
                <p className="text-sm font-black text-slate-900">Express Delivery</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
