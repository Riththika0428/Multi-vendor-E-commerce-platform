"use client";

import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import axios from 'axios';
import { CreditCard, MapPin, Package, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
  const { cartItems, totalPrice, loading: cartLoading, fetchCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    address: '', city: '', postalCode: '', country: 'USA'
  });

  useEffect(() => {
    fetchCart();
  }, []);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const orderData = {
        orderItems: cartItems.map(item => ({
          name: item.product.name,
          qty: item.qty,
          image: item.product.images[0],
          price: item.product.price,
          product: item.product._id,
          vendor: (item.product as any).vendor // In reality, vendor ID is on product
        })),
        shippingAddress: address,
        itemsPrice: totalPrice,
        shippingPrice: 0,
        totalPrice: totalPrice,
      };

      const { data } = await axios.post('http://localhost:5000/api/orders', orderData, { withCredentials: true });
      
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      }
    } catch (error) {
      console.error(error);
      alert('Checkout failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-12">Final Step</h1>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <div className="space-y-10">
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Shipping Destination</h2>
                </div>

                <div className="space-y-4">
                  <input 
                    placeholder="Street Address"
                    value={address.address}
                    onChange={e => setAddress({...address, address: e.target.value})}
                    className="w-full p-5 bg-white border border-slate-200 rounded-2xl font-medium focus:border-indigo-600 outline-none"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      placeholder="City"
                      value={address.city}
                      onChange={e => setAddress({...address, city: e.target.value})}
                      className="w-full p-5 bg-white border border-slate-200 rounded-2xl font-medium focus:border-indigo-600 outline-none"
                    />
                    <input 
                      placeholder="Zip Code"
                      value={address.postalCode}
                      onChange={e => setAddress({...address, postalCode: e.target.value})}
                      className="w-full p-5 bg-white border border-slate-200 rounded-2xl font-medium focus:border-indigo-600 outline-none"
                    />
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Payment Method</h2>
                </div>
                <div className="p-6 bg-white border-2 border-indigo-600 rounded-[2rem] flex items-center justify-between">
                   <span className="font-black text-slate-900">Secure Stripe Checkout</span>
                   <div className="flex gap-2">
                      <div className="w-10 h-6 bg-slate-100 rounded" />
                      <div className="w-10 h-6 bg-slate-100 rounded" />
                   </div>
                </div>
              </section>
            </div>

            {/* Sticky Summary */}
            <div className="lg:sticky lg:top-32 h-fit">
              <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-600 rounded-full blur-[100px] opacity-20 pointer-events-none" />
                
                <h2 className="text-2xl font-black mb-8">Order Overview</h2>
                
                <div className="space-y-6 mb-10 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {cartItems.map(item => (
                    <div key={item.product._id} className="flex justify-between items-center gap-4">
                      <div className="flex items-center gap-3">
                         <div className="w-12 h-12 bg-white/10 rounded-xl overflow-hidden flex-shrink-0">
                           <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                         </div>
                         <div>
                            <p className="font-bold text-sm line-clamp-1">{item.product.name}</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Qty: {item.qty}</p>
                         </div>
                      </div>
                      <span className="font-black text-sm">${(item.product.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 mb-10 pt-6 border-t border-white/10">
                  <div className="flex justify-between font-bold text-slate-400">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-black text-white text-2xl pt-2">
                    <span>Total</span>
                    <span className="tracking-tighter">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  disabled={loading || !address.address || !address.city || !address.postalCode}
                  className="w-full h-20 bg-white text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-indigo-400 transition-all shadow-xl disabled:opacity-30"
                >
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Complete Secure Payment <ArrowRight className="w-5 h-5" /></>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
