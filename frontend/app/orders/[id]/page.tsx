"use client";

import { useEffect, useState, use } from 'react';
import axios from 'axios';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import CustomerGuard from '@/components/auth/CustomerGuard';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, MapPin, CreditCard, ChevronRight, Star, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState<{productId: string, rating: number, comment: string} | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/orders/${id}`, { withCredentials: true });
        setOrder(data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchOrder();
  }, [id]);

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm) return;
    try {
      await axios.post('http://localhost:5000/api/reviews', {
        ...reviewForm,
        orderId: id
      }, { withCredentials: true });
      alert('Review submitted! Thank you.');
      setReviewForm(null);
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to submit review');
    }
  };

  return (
    <CustomerGuard>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-32 pb-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <Link href="/orders" className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold mb-8 transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to History
            </Link>

            {loading ? (
               <div className="animate-pulse space-y-10">
                  <div className="h-20 bg-white rounded-[2rem] w-3/4" />
                  <div className="h-64 bg-white rounded-[3rem]" />
               </div>
            ) : order ? (
              <div className="space-y-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                   <div>
                      <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-2">Order Tracking</h1>
                      <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Reference: {order._id.toUpperCase()}</p>
                   </div>
                   <div className={`px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest ${order.isPaid ? 'bg-green-500 text-white shadow-xl shadow-green-100' : 'bg-orange-500 text-white shadow-xl shadow-orange-100'}`}>
                      {order.status}
                   </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-10">
                   <div className="lg:col-span-2 space-y-8">
                      {/* Products List */}
                      <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/20">
                         <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                            <Package className="w-5 h-5 text-indigo-600" /> Items in this Order
                         </h2>
                         <div className="space-y-8">
                            {order.orderItems.map((item: any, i: number) => (
                               <div key={i} className="flex items-center gap-6 group">
                                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0">
                                     <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                  </div>
                                  <div className="flex-1">
                                     <h3 className="text-lg font-black text-slate-900 mb-1">{item.name}</h3>
                                     <p className="text-xs font-bold text-slate-400">Qty: {item.qty} × ${item.price.toFixed(2)}</p>
                                     
                                     {order.status === 'delivered' && (
                                       <button 
                                         onClick={() => setReviewForm({ productId: item.product, rating: 5, comment: '' })}
                                         className="mt-3 text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800 flex items-center gap-2"
                                       >
                                         <Star className="w-3 h-3" /> Review Product
                                       </button>
                                     )}
                                  </div>
                                  <div className="text-right">
                                     <p className="text-lg font-black text-slate-900">${(item.price * item.qty).toFixed(2)}</p>
                                  </div>
                               </div>
                            ))}
                         </div>
                      </section>

                      {/* Review Modal Placeholder */}
                      <AnimatePresence>
                         {reviewForm && (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="bg-indigo-600 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden"
                            >
                               <div className="relative z-10">
                                  <h3 className="text-2xl font-black mb-6">Rate this Artifact</h3>
                                  <form onSubmit={submitReview} className="space-y-6">
                                     <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">Score (1-5)</label>
                                        <div className="flex gap-2">
                                           {[1,2,3,4,5].map(star => (
                                              <button 
                                                key={star} 
                                                type="button"
                                                onClick={() => setReviewForm({...reviewForm, rating: star})}
                                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${reviewForm.rating >= star ? 'bg-white text-indigo-600' : 'bg-white/10 text-white'}`}
                                              >
                                                 <Star className={`w-5 h-5 ${reviewForm.rating >= star ? 'fill-current' : ''}`} />
                                              </button>
                                           ))}
                                        </div>
                                     </div>
                                     <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">Experience Details</label>
                                        <textarea 
                                          required 
                                          value={reviewForm.comment}
                                          onChange={e => setReviewForm({...reviewForm, comment: e.target.value})}
                                          className="w-full p-6 bg-white/10 border border-white/20 rounded-[2rem] outline-none focus:bg-white/20 placeholder:text-white/40"
                                          placeholder="How does it feel in your space?"
                                        />
                                     </div>
                                     <div className="flex gap-4">
                                        <button type="submit" className="flex-1 py-4 bg-white text-indigo-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all">
                                           Submit Review
                                        </button>
                                        <button type="button" onClick={() => setReviewForm(null)} className="px-6 py-4 border border-white/20 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10">
                                           Skip
                                        </button>
                                     </div>
                                  </form>
                               </div>
                            </motion.div>
                         )}
                      </AnimatePresence>
                   </div>

                   <aside className="lg:col-span-1 space-y-8">
                      <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl space-y-8">
                         <section>
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                               <MapPin className="w-3.5 h-3.5" /> Destination
                            </h3>
                            <p className="font-bold text-sm leading-relaxed">
                               {order.shippingAddress.address}<br />
                               {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
                               {order.shippingAddress.country}
                            </p>
                         </section>

                         <section>
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                               <CreditCard className="w-3.5 h-3.5" /> Financial
                            </h3>
                            <div className="space-y-2">
                               <div className="flex justify-between text-xs font-bold">
                                  <span className="text-slate-400">Subtotal</span>
                                  <span>${order.itemsPrice.toFixed(2)}</span>
                               </div>
                               <div className="flex justify-between text-xs font-bold">
                                  <span className="text-slate-400">Logistics</span>
                                  <span>Free</span>
                               </div>
                               <div className="flex justify-between items-end pt-4 border-t border-white/10">
                                  <span className="text-lg font-black tracking-tighter">${order.totalPrice.toFixed(2)}</span>
                                  <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Confirmed</span>
                               </div>
                            </div>
                         </section>
                      </div>
                   </aside>
                </div>
              </div>
            ) : (
              <div className="text-center py-40">
                 <h2 className="text-3xl font-black text-slate-900">Order Disappeared</h2>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </CustomerGuard>
  );
}
