"use client";

import { useAuthStore } from '@/store/useAuthStore';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { openAuthModal } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Products', href: '#' },
    { name: 'Categories', href: '#' },
    { name: 'Deals', href: '#' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled ? 'py-3' : 'py-6'
    }`}>
      <div className="container mx-auto px-4">
        <div className={`px-6 h-16 rounded-full flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'bg-white/80 backdrop-blur-xl shadow-xl shadow-slate-200/40 border border-slate-100' : 'bg-transparent'
        }`}>
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform shadow-lg shadow-indigo-200">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">MarketHub</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex items-center gap-8 text-sm font-semibold text-slate-500">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="hover:text-indigo-600 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            <div className="flex items-center gap-2 pl-6 border-l border-slate-100">
              <button 
                onClick={() => openAuthModal('customer', 'login')}
                className="text-sm font-bold text-slate-700 hover:text-indigo-600 transition-colors px-4 py-2"
              >
                Sign In
              </button>
              <button 
                onClick={() => openAuthModal('customer', 'register')}
                className="text-sm font-bold bg-slate-900 text-white px-6 py-2.5 rounded-full hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-95"
              >
                Join Now
              </button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="md:hidden absolute top-24 left-4 right-4"
          >
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-100 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-xl font-bold text-slate-900"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-6 border-t border-slate-50">
                <button 
                  onClick={() => { openAuthModal('customer', 'login'); setIsOpen(false); }}
                  className="w-full py-4 text-center font-bold text-slate-900 bg-slate-50 rounded-2xl"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => { openAuthModal('customer', 'register'); setIsOpen(false); }}
                  className="w-full py-4 text-center font-bold text-white bg-indigo-600 rounded-2xl"
                >
                  Join MarketHub
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
