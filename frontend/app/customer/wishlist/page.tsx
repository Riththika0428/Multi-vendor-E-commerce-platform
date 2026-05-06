"use client";

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { Heart, ShoppingBag, Trash2, ArrowRight, Star } from 'lucide-react';
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

  if (loading) {
     return <div className="p-20 text-center text-slate-400">Loading your collection...</div>;
  }

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-2">Saved Pieces</h1>
          <p className="text-slate-400 font-medium tracking-wide">A curated selection of artifacts you've admired.</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
           <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
           <span className="text-lg font-black text-slate-900">{wishlist?.products?.length || 0}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {wishlist?.products && wishlist.products.length > 0 ? (
          wishlist.products.map((product: any, i: number) => (
            <motion.div 
              key={product._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden hover:shadow-2xl hover:shadow-indigo-100 transition-all"
            >
              <div className="aspect-square relative overflow-hidden bg-slate-50">
                <img 
                  src={product.images[0]?.url || product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <button 
                  onClick={() => removeFromWishlist(product._id)}
                  className="absolute top-6 right-6 w-12 h-12 bg-white/80 backdrop-blur-md rounded-2xl flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-white transition-all shadow-lg"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8">
                 <div className="flex justify-between items-start mb-4">
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-1">{product.category}</p>
                       <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight">{product.name}</h3>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 rounded-lg">
                       <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                       <span className="text-[10px] font-black text-amber-600">{product.averageRating}</span>
                    </div>
                 </div>

                 <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-50">
                    <p className="text-2xl font-black text-slate-900">${product.price}</p>
                    <div className="flex gap-2">
                       <Link 
                         href={`/products/${product._id}`}
                         className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all"
                       >
                          <ArrowRight className="w-5 h-5" />
                       </Link>
                       <Link 
                         href={`/products/${product._id}`}
                         className="px-6 h-12 rounded-xl bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest flex items-center justify-center hover:bg-slate-900 transition-all shadow-lg shadow-indigo-100"
                       >
                          Add to Cart
                       </Link>
                    </div>
                 </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-40 flex flex-col items-center justify-center text-center">
             <div className="w-24 h-24 bg-white rounded-[2rem] shadow-xl shadow-slate-100 flex items-center justify-center mb-8 border border-slate-50">
                <Heart className="w-10 h-10 text-slate-200" />
             </div>
             <h3 className="text-3xl font-black text-slate-900 mb-2">Collection is vacant</h3>
             <p className="text-slate-400 font-medium mb-10">Start curating your favorite pieces from the marketplace.</p>
             <Link href="/products" className="py-5 px-10 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-2xl">Browse Market</Link>
          </div>
        )}
      </div>
    </div>
  );
}
