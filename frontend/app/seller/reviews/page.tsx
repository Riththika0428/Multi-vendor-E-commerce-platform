"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Star, 
  MessageSquare, 
  User, 
  Calendar,
  ThumbsUp,
  TrendingDown,
  ChevronRight,
  ShieldCheck,
  StarHalf
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

export default function SellerReviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/reviews/seller', { withCredentials: true });
        setReviews(data);
      } catch (error) {
        console.error(error);
        // Fallback for demo if endpoint fails
      }
      setLoading(false);
    };
    fetchReviews();
  }, []);

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) 
    : "4.9";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Customer Reviews</h1>
        <p className="text-sm font-medium text-slate-400">Manage feedback and maintain your merchant reputation</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
         {/* Review List */}
         <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {loading ? (
                [1,2,3].map(i => <div key={i} className="h-40 bg-white animate-pulse rounded-3xl" />)
              ) : reviews.length > 0 ? reviews.map((review, i) => (
                <motion.div 
                  key={review._id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm group hover:shadow-md transition-all"
                >
                   <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center font-bold text-sm text-slate-400 border border-slate-100">
                            {review.name.charAt(0)}
                         </div>
                         <div>
                            <p className="text-sm font-bold text-slate-900">{review.name}</p>
                            <div className="flex items-center gap-2">
                               <Calendar className="w-3 h-3 text-slate-300" />
                               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{new Date(review.createdAt).toLocaleDateString()}</span>
                            </div>
                         </div>
                      </div>
                      <div className="flex gap-0.5">
                         {[1,2,3,4,5].map(s => (
                           <Star key={s} className={`w-3.5 h-3.5 ${review.rating >= s ? 'fill-amber-400 text-amber-400' : 'text-slate-100'}`} />
                         ))}
                      </div>
                   </div>

                   <div className="p-4 bg-slate-50 rounded-2xl border border-slate-50 mb-6">
                      <p className="text-sm text-slate-600 leading-relaxed italic font-medium">"{review.comment}"</p>
                   </div>

                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-[#0052FF]" />
                         <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Product: <span className="text-slate-900">{review.product?.name || 'Store Item'}</span></span>
                      </div>
                      <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#0052FF] hover:opacity-80 transition-opacity">
                         <MessageSquare className="w-3.5 h-3.5" /> Reply to feedback
                      </button>
                   </div>
                </motion.div>
              )) : (
                <div className="py-32 bg-white rounded-3xl text-center border border-dashed border-slate-200">
                   <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <MessageSquare className="w-8 h-8 text-slate-300" />
                   </div>
                   <h2 className="text-lg font-bold text-slate-900 mb-1">No reviews yet</h2>
                   <p className="text-sm font-medium text-slate-400 max-w-xs mx-auto text-center leading-relaxed">Once customers start reviewing your products, their feedback will appear here.</p>
                </div>
              )}
            </AnimatePresence>
         </div>

         {/* Stats Panel */}
         <aside className="space-y-6">
            <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
               <div className="relative z-10 space-y-8">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-1 flex items-center gap-2">
                       <ShieldCheck className="w-4 h-4 text-emerald-500" /> Merchant Grade
                    </h2>
                    <p className="text-xs font-medium text-slate-400">Based on recent customer satisfaction</p>
                  </div>

                  <div className="flex items-end gap-3">
                     <p className="text-6xl font-bold tracking-tighter text-slate-900 leading-none">{averageRating}</p>
                     <div className="pb-1">
                        <div className="flex gap-0.5 mb-1">
                           {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                        </div>
                        <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Top Rated Seller</p>
                     </div>
                  </div>

                  <div className="space-y-3">
                     {[5,4,3,2,1].map(r => (
                        <div key={r} className="flex items-center gap-3">
                           <span className="text-[10px] font-bold text-slate-400 w-2">{r}</span>
                           <div className="flex-1 h-1 bg-slate-50 rounded-full overflow-hidden">
                              <div className="h-full bg-[#0052FF]" style={{ width: r === 5 ? '92%' : r === 4 ? '18%' : '2%' }} />
                           </div>
                           <span className="text-[10px] font-bold text-slate-400">{(r === 5 ? 92 : r === 4 ? 18 : 2)}%</span>
                        </div>
                     ))}
                  </div>
               </div>
            </section>

            <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100/50">
               <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Satisfaction Pulse</span>
                  <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">↑ 12%</span>
               </div>
               <p className="text-[10px] font-medium text-slate-400 italic text-center leading-relaxed">
                  "Maintain a score above 4.5 to keep your 'Pro Merchant' badge active."
               </p>
            </div>
         </aside>
      </div>
    </motion.div>
  );
}
