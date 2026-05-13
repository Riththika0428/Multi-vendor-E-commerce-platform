"use client";

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { Heart, ShoppingBag, Trash2, ArrowRight, Star, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Link from 'next/link';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/wishlist', { withCredentials: true });
      setWishlist(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeFromWishlist = async (productId: string) => {
    try {
      await axios.post(`http://localhost:5000/api/wishlist/${productId}`, {}, { withCredentials: true });
      fetchWishlist();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-12 h-[2px] bg-indigo-600 rounded-full" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">Curated Collection</span>
          </motion.div>
          <h1 className="text-6xl font-black text-slate-900 tracking-tight">Saved Pieces</h1>
          <p className="text-slate-400 font-medium tracking-wide mt-2">Refining your personal aesthetic, one piece at a time.</p>
        </div>
        
        <div className="bg-white px-8 py-4 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/20 flex items-center gap-4">
           <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
           </div>
           <div>
              <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Total Savings</p>
              <p className="text-xl font-black text-slate-900">{wishlist?.products?.length || 0} Items</p>
           </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {loading ? (
           [1, 2, 3].map(i => <div key={i} className="aspect-[3/4] bg-white/60 animate-pulse rounded-[3rem]" />)
        ) : wishlist?.products && wishlist.products.length > 0 ? (
          wishlist.products.map((product: any, i: number) => (
            <motion.div 
              key={product._id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden hover:shadow-[0_40px_80px_-20px_rgba(79,70,229,0.15)] transition-all duration-500 relative"
            >
              <div className="aspect-[4/5] relative overflow-hidden bg-slate-50">
                <img 
                  src={product.images[0]?.url || product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Floating Tags */}
                <div className="absolute top-6 left-6">
                   <div className="px-4 py-1.5 bg-white/80 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-indigo-500" />
                      Elite Choice
                   </div>
                </div>

                <button 
                  onClick={() => removeFromWishlist(product._id)}
                  className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-lg rounded-2xl flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-white transition-all shadow-xl opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0 duration-300"
                >
                  <Trash2 className="w-5 h-5" />
                </button>

                <div className="absolute bottom-6 left-6">
                   <div className="px-5 py-2 bg-slate-950/90 backdrop-blur-md rounded-2xl text-white">
                      <p className="text-[9px] font-black uppercase tracking-widest text-indigo-300 mb-0.5">Value</p>
                      <p className="text-xl font-black tracking-tight">${product.price}</p>
                   </div>
                </div>
              </div>

              <div className="p-8">
                 <div className="flex justify-between items-start mb-6">
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 mb-1">{product.category}</p>
                       <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight group-hover:text-indigo-600 transition-colors">{product.name}</h3>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-100">
                       <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                       <span className="text-[11px] font-black text-slate-900">{product.averageRating}</span>
                    </div>
                 </div>

                 <div className="flex gap-3">
                    <Link 
                      href={`/products/${product._id}`}
                      className="flex-1 h-14 rounded-2xl bg-slate-950 text-white text-[11px] font-black uppercase tracking-widest flex items-center justify-center hover:bg-indigo-600 transition-all shadow-2xl active:scale-95 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-500"
                    >
                       Add to Cart
                    </Link>
                    <Link 
                      href={`/products/${product._id}`}
                      className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-white hover:text-slate-900 border border-transparent hover:border-slate-100 transition-all shadow-sm group-hover:shadow-lg"
                    >
                       <ArrowRight className="w-6 h-6" />
                    </Link>
                 </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-40 flex flex-col items-center justify-center text-center">
             <div className="w-32 h-32 bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 flex items-center justify-center mb-10 border border-slate-50 relative overflow-hidden group">
                <div className="absolute inset-0 bg-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <Heart className="w-14 h-14 text-slate-100 relative z-10 group-hover:scale-125 transition-transform duration-700" />
             </div>
             <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Your gallery is vacant</h3>
             <p className="text-slate-400 font-medium mb-12 max-w-sm mx-auto tracking-wide">Start curating your unique collection from the marketplace.</p>
             <Link href="/products" className="py-6 px-12 bg-indigo-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-indigo-100 hover:bg-slate-950 transition-all active:scale-95">Browse Selection</Link>
          </div>
        )}
      </div>
    </div>
  );
}
