"use client";

import { ShoppingBag, Globe, Mail, Phone, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';

interface FooterProps {
  showCTA?: boolean;
}

export default function Footer({ showCTA = false }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { openAuthModal } = useAuthStore();

  return (
    <footer className="bg-slate-950 text-white relative overflow-hidden">
      
      {/* Integrated CTA Section */}
      {showCTA && (
        <div className="relative border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-violet-900/20 pointer-events-none" />
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-xs font-bold mb-8 backdrop-blur-md"
              >
                <Sparkles className="w-4 h-4" />
                <span>Join 50k+ successful vendors</span>
              </motion.div>

              <h2 className="text-4xl md:text-6xl font-black leading-[1.1] mb-8 tracking-tight">
                Ready to scale <br />
                your <span className="text-indigo-500">Business?</span>
              </h2>
              
              <p className="text-slate-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
                Whether you're a shopper looking for excellence or a brand 
                ready to reach millions, our ecosystem is built for you.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <button 
                  onClick={() => openAuthModal('customer', 'register')}
                  className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 text-lg font-black rounded-2xl hover:bg-slate-100 transition-all shadow-xl active:scale-95"
                >
                  Start Shopping
                </button>
                <button 
                  onClick={() => openAuthModal('seller', 'register')}
                  className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 text-white text-lg font-bold rounded-2xl hover:bg-white/10 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Become a Vendor <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="absolute -inset-10 bg-indigo-600/30 blur-[120px] rounded-full animate-pulse" />
              <div className="relative bg-white/[0.03] border border-white/10 p-4 rounded-[3.5rem] backdrop-blur-3xl shadow-2xl overflow-hidden group">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=400&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=400&auto=format&fit=crop"
                  ].map((url, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ scale: 1.05 }}
                      className="aspect-square bg-slate-800 rounded-[2rem] overflow-hidden border border-white/5"
                    >
                      <img src={url} alt="Product" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </motion.div>
                  ))}
                </div>
                <motion.div 
                  initial={{ rotate: 6 }}
                  animate={{ rotate: [6, 12, 6] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -right-6 bg-white text-slate-950 p-6 rounded-[2.5rem] shadow-3xl flex items-center gap-4 border-8 border-slate-950"
                >
                  <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <ShoppingBag className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">Global Payouts</p>
                    <p className="text-lg font-black leading-none">$1.2M+</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        </div>
      )}

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-8 group cursor-pointer">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-all shadow-lg shadow-indigo-500/20">
                <ShoppingBag className="w-7 h-7 text-white" />
              </div>
              <span className="font-black text-2xl tracking-tighter text-white">MarketHub</span>
            </div>
            <p className="text-slate-500 leading-relaxed mb-8 font-medium">
              Empowering the next generation of boutique commerce through 
              innovation, trust, and beautiful design.
            </p>
            <div className="flex items-center gap-4">
              {[Globe, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:pl-8">
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Ecosystem</h4>
            <ul className="flex flex-col gap-4 text-slate-500 text-sm font-bold">
              {['Marketplace', 'Vendor Portal', 'Analytics', 'Mobile App', 'Security'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 opacity-0 group-hover:opacity-100 transition-all" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Support</h4>
            <ul className="flex flex-col gap-4 text-slate-500 text-sm font-bold">
              {['Help Center', 'API Docs', 'Selling Guide', 'Privacy Policy', 'Cookie Settings'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Contact</h4>
            <ul className="flex flex-col gap-6 text-slate-500 text-sm font-bold">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-indigo-500 shrink-0" />
                <span>77 Digital Way, Suite 400<br />Innovation District, London</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-indigo-500 shrink-0" />
                <span>hello@markethub.io</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">
          <p>© {currentYear} MarketHub Ecosystem. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Legal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
