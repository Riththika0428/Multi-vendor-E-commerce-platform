"use client";

import { useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CartPage() {
  const { cartItems, totalPrice, loading, fetchCart, addItem, removeItem } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-12">Your Collection</h1>

          {cartItems.length === 0 && !loading ? (
            <div className="bg-white p-20 rounded-[3rem] text-center border border-slate-100 shadow-xl shadow-slate-200/40">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
                <ShoppingBag className="w-10 h-10 text-slate-300" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-4">Your collection is empty</h2>
              <p className="text-slate-500 font-medium mb-10">Discover unique artifacts from our premium vendors.</p>
              <Link href="/products" className="inline-flex py-4 px-10 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl">
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Items List */}
              <div className="lg:col-span-2 space-y-6">
                {cartItems.map((item) => (
                  <motion.div 
                    key={item.product._id}
                    layout
                    className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/20 flex items-center gap-8 group"
                  >
                    <div className="w-32 h-32 rounded-3xl overflow-hidden flex-shrink-0 bg-slate-50">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-black text-slate-900 mb-1">{item.product.name}</h3>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Quantity: {item.qty}</p>
                      
                      <div className="flex items-center gap-6">
                        <div className="flex items-center bg-slate-50 rounded-xl p-1 px-3 gap-4 border border-slate-100">
                          <button 
                            onClick={() => addItem(item.product._id, Math.max(1, item.qty - 1))}
                            className="text-slate-400 hover:text-indigo-600"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-black text-slate-900 text-sm">{item.qty}</span>
                          <button 
                            onClick={() => addItem(item.product._id, item.qty + 1)}
                            className="text-slate-400 hover:text-indigo-600"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.product._id)}
                          className="text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-black text-slate-900 tracking-tight">
                        ${(item.product.price * item.qty).toFixed(2)}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                        ${item.product.price.toFixed(2)} / unit
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 sticky top-32">
                  <h2 className="text-2xl font-black text-slate-900 mb-8">Summary</h2>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-slate-500 font-bold">
                      <span>Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-500 font-bold">
                      <span>Shipping</span>
                      <span className="text-green-500">Free</span>
                    </div>
                    <div className="h-[1px] bg-slate-100 my-4" />
                    <div className="flex justify-between items-end">
                      <span className="text-slate-900 font-black">Total</span>
                      <span className="text-4xl font-black text-slate-900 tracking-tighter">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  <Link href="/checkout" className="w-full h-20 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-indigo-600 transition-all shadow-xl">
                    Proceed to Checkout <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
