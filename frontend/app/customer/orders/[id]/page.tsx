"use client";

import { useEffect, useState, use } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Package, MapPin, CreditCard, Star, Clock, CheckCircle, Truck, AlertCircle, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

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
      toast.success('Review submitted! Thank you.');
      setReviewForm(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to submit review');
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'bg-green-500 text-white shadow-lg shadow-green-100';
      case 'shipped': return 'bg-indigo-500 text-white shadow-lg shadow-indigo-100';
      case 'processing': return 'bg-amber-500 text-white shadow-lg shadow-amber-100';
      default: return 'bg-slate-400 text-white shadow-lg shadow-slate-100';
    }
  };

  return (
    <div className="space-y-12 pb-20">
      <Link href="/customer/orders" className="inline-flex items-center gap-4 text-slate-400 hover:text-indigo-600 font-black text-[10px] uppercase tracking-[0.2em] mb-4 transition-all group">
        <div className="w-10 h-10 bg-white rounded-xl border border-slate-100 flex items-center justify-center shadow-sm group-hover:border-indigo-100 group-hover:shadow-indigo-50">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        </div>
        Return to History
      </Link>

      {loading ? (
          <div className="animate-pulse space-y-12">
            <div className="h-24 bg-white/60 rounded-[2.5rem] w-3/4" />
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 h-96 bg-white/60 rounded-[3.5rem]" />
              <div className="h-96 bg-white/60 rounded-[3.5rem]" />
            </div>
          </div>
      ) : order ? (
        <div className="space-y-12">
          {/* Header Dashboard */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 mb-4"
                >
                  <span className="w-12 h-[2px] bg-indigo-600 rounded-full" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">Procurement Status</span>
                </motion.div>
                <h1 className="text-6xl font-black text-slate-900 tracking-tighter">Order Tracking</h1>
                <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[11px] mt-2">Ref: {order._id.toUpperCase()}</p>
              </div>
              <div className="flex items-center gap-4">
                 <div className={`px-8 py-4 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] flex items-center gap-3 shadow-2xl ${getStatusStyle(order.status)}`}>
                    <Package className="w-4 h-4" />
                    {order.status}
                 </div>
              </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-10">
                {/* Items Analytics */}
                <section className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full -mr-16 -mt-16 blur-2xl pointer-events-none" />
                    
                    <h2 className="text-2xl font-black text-slate-900 mb-10 flex items-center gap-4">
                      <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                        <Package className="w-6 h-6" />
                      </div>
                      Procured Artifacts
                    </h2>

                    <div className="space-y-10">
                      {order.orderItems.map((item: any, i: number) => (
                          <motion.div 
                            key={i} 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex flex-col sm:flex-row sm:items-center gap-8 group"
                          >
                            <div className="w-32 h-32 rounded-[2rem] overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0 shadow-inner">
                                <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-4">
                                   <div>
                                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-1">Authentic Selection</p>
                                      <h3 className="text-xl font-black text-slate-900 tracking-tight">{item.name}</h3>
                                   </div>
                                   <p className="text-2xl font-black text-slate-900 tracking-tighter">${(item.price * item.qty).toFixed(2)}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                   <div className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                      Units: {item.qty}
                                   </div>
                                   {order.status === 'delivered' && (
                                      <button 
                                        onClick={() => setReviewForm({ productId: item.product, rating: 5, comment: '' })}
                                        className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-white hover:bg-slate-950 px-4 py-1.5 rounded-full transition-all flex items-center gap-2 border border-indigo-100"
                                      >
                                        <MessageSquare className="w-3 h-3" /> Share Experience
                                      </button>
                                   )}
                                </div>
                            </div>
                          </motion.div>
                      ))}
                    </div>
                </section>

                {/* Shared Experience Hub (Review Form) */}
                <AnimatePresence>
                    {reviewForm && (
                      <motion.div 
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-slate-950 p-12 rounded-[3.5rem] text-white shadow-3xl relative overflow-hidden group"
                      >
                          <div className="absolute top-[-50%] right-[-10%] w-[60%] h-[200%] bg-indigo-600 rounded-full blur-[140px] opacity-20 pointer-events-none transition-opacity group-hover:opacity-30" />
                          
                          <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-10">
                               <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white backdrop-blur-md">
                                  <Sparkles className="w-6 h-6" />
                               </div>
                               <div>
                                  <h3 className="text-2xl font-black tracking-tight text-white">Curator's Insight</h3>
                                  <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest mt-1">Submit your feedback</p>
                               </div>
                            </div>

                            <form onSubmit={submitReview} className="space-y-10">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-slate-500">Quality Score</p>
                                    <div className="flex gap-4">
                                      {[1,2,3,4,5].map(star => (
                                          <button 
                                            key={star} 
                                            type="button"
                                            onClick={() => setReviewForm({...reviewForm, rating: star})}
                                            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${reviewForm.rating >= star ? 'bg-indigo-600 text-white shadow-[0_0_40px_rgba(79,70,229,0.4)] scale-110' : 'bg-white/5 text-slate-500 hover:bg-white/10'}`}
                                          >
                                              <Star className={`w-6 h-6 ${reviewForm.rating >= star ? 'fill-current' : ''}`} />
                                          </button>
                                      ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Commentary</p>
                                    <textarea 
                                      required 
                                      value={reviewForm.comment}
                                      onChange={e => setReviewForm({...reviewForm, comment: e.target.value})}
                                      className="w-full p-8 bg-white/5 border border-white/10 rounded-[2.5rem] outline-none focus:bg-white/10 focus:border-indigo-500/50 placeholder:text-slate-600 text-sm font-medium min-h-[160px] transition-all"
                                      placeholder="Express how this piece integrates with your collection..."
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row gap-6">
                                    <button type="submit" className="flex-1 py-6 bg-white text-slate-950 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-2xl active:scale-95 group">
                                      Broadcast Review <ArrowRight className="w-5 h-5 inline-block ml-3 group-hover:translate-x-2 transition-transform" />
                                    </button>
                                    <button type="button" onClick={() => setReviewForm(null)} className="px-10 py-6 bg-slate-900 text-slate-400 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:text-white transition-all">
                                      Discard
                                    </button>
                                </div>
                            </form>
                          </div>
                      </motion.div>
                    )}
                </AnimatePresence>
              </div>

              <aside className="lg:col-span-1 space-y-12">
                {/* Global Logistics Sidebar */}
                <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/20 space-y-12 sticky top-32">
                    <section>
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-6 flex items-center gap-3">
                          <MapPin className="w-4 h-4" /> Logistical Node
                      </h3>
                      <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                        <p className="font-black text-sm text-slate-900 leading-relaxed">
                            {order.shippingAddress.address}
                        </p>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-2 px-3 py-1 bg-white inline-block rounded-lg shadow-sm">
                            {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                        </p>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-6 flex items-center gap-3">
                          <CreditCard className="w-4 h-4" /> Financial Ledger
                      </h3>
                      <div className="space-y-4">
                          <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest">
                            <span className="text-slate-300 italic">Core Value</span>
                            <span className="text-slate-900">${order.itemsPrice.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest">
                            <span className="text-slate-300 italic">Logistics</span>
                            <span className="text-green-500">Exempt</span>
                          </div>
                          <div className="h-[1px] bg-slate-100 my-6" />
                          <div className="flex flex-col gap-2">
                             <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Total Valuation</span>
                             <div className="flex items-end justify-between">
                                <span className="text-5xl font-black tracking-tighter text-slate-900">${order.totalPrice.toFixed(0)}</span>
                                <div className="flex items-center gap-2 mb-2">
                                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                   <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Settled</span>
                                </div>
                             </div>
                          </div>
                      </div>
                    </section>

                    <div className="pt-4">
                       <Link href="/products" className="w-full py-5 border-2 border-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-900 hover:text-white transition-all duration-500 group">
                          Continue Curating <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                       </Link>
                    </div>
                </div>
              </aside>
          </div>
        </div>
      ) : (
        <div className="text-center py-40">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-200">
               <AlertCircle className="w-12 h-12" />
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Artifact Lost in Loop</h2>
            <Link href="/customer/orders" className="text-indigo-600 font-black text-xs uppercase tracking-widest hover:underline mt-8 block">Return to Collection Registry</Link>
        </div>
      )}
    </div>
  );
}
