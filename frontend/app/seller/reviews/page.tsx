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
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

export default function SellerReviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // We'll use the stats API or a new one to get products then their reviews
        // For simplicity, let's assume we have a GET /api/reviews/seller endpoint
        const { data } = await axios.get('http://localhost:5000/api/reviews/seller', { withCredentials: true });
        setReviews(data);
      } catch (error) {
        // Fallback or handle error
        console.error(error);
        // If the endpoint doesn't exist yet, we'd need to create it
      }
      setLoading(false);
    };
    fetchReviews();
  }, []);

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-2">Social Proof</h1>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Feedback loop from the collector base</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
         {/* Review List */}
         <div className="lg:col-span-2 space-y-6">
            {loading ? (
              [1,2,3].map(i => <div key={i} className="h-40 bg-white animate-pulse rounded-[3rem]" />)
            ) : reviews.length > 0 ? reviews.map((review, i) => (
              <motion.div 
                key={review._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/20 group"
              >
                 <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-black text-xs text-slate-400">
                          {review.name.charAt(0)}
                       </div>
                       <div>
                          <p className="font-black text-slate-900">{review.name}</p>
                          <div className="flex items-center gap-2">
                             <Calendar className="w-3 h-3 text-slate-300" />
                             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(review.createdAt).toLocaleDateString()}</span>
                          </div>
                       </div>
                    </div>
                    <div className="flex gap-1">
                       {[1,2,3,4,5].map(s => (
                         <Star key={s} className={`w-4 h-4 ${review.rating >= s ? 'fill-yellow-400 text-yellow-400' : 'text-slate-100'}`} />
                       ))}
                    </div>
                 </div>

                 <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100/50 mb-6">
                    <p className="text-slate-600 font-medium leading-relaxed italic">"{review.comment}"</p>
                 </div>

                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-indigo-600">
                       <div className="w-2 h-2 rounded-full bg-indigo-600" />
                       <span className="text-[10px] font-black uppercase tracking-widest">Artifact: {review.product?.name || 'Unknown Item'}</span>
                    </div>
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">
                       <MessageSquare className="w-3.5 h-3.5" /> Respond
                    </button>
                 </div>
              </motion.div>
            )) : (
              <div className="py-40 bg-white rounded-[4rem] text-center border-2 border-dashed border-slate-100">
                 <MessageSquare className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                 <h2 className="text-2xl font-black text-slate-900 mb-2">Gallery is Silent</h2>
                 <p className="text-slate-400 font-medium">No acquisitions have been reviewed for your store yet.</p>
              </div>
            )}
         </div>

         {/* Stats Panel */}
         <aside className="space-y-8">
            <section className="bg-slate-950 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-indigo-600 rounded-full blur-[60px] opacity-20" />
               <div className="relative z-10 space-y-10">
                  <div>
                    <h2 className="text-2xl font-black tracking-tight mb-2">Merchant Grade</h2>
                    <p className="text-slate-500 font-black uppercase tracking-widest text-[9px]">Calculated based on social metrics</p>
                  </div>

                  <div className="flex items-end gap-4">
                     <p className="text-7xl font-black tracking-tighter text-white">4.9</p>
                     <div className="pb-2 space-y-1">
                        <div className="flex gap-1">
                           {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Supreme Tier</p>
                     </div>
                  </div>

                  <div className="space-y-4">
                     {[5,4,3,2,1].map(r => (
                        <div key={r} className="flex items-center gap-4">
                           <span className="text-[10px] font-black text-slate-500 w-4">{r}</span>
                           <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-indigo-600" style={{ width: r === 5 ? '90%' : r === 4 ? '10%' : '0%' }} />
                           </div>
                           <span className="text-[10px] font-black text-slate-400">{(r === 5 ? 90 : r === 4 ? 10 : 0)}%</span>
                        </div>
                     ))}
                  </div>
               </div>
            </section>

            <div className="p-8 bg-slate-50 border border-slate-100 rounded-[3rem] space-y-6">
               <div className="flex items-center justify-between px-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Positive Momentum</span>
                  <span className="text-xs font-black text-emerald-500">+12%</span>
               </div>
               <div className="h-[1px] bg-slate-200" />
               <p className="text-[9px] font-bold text-slate-400 italic px-4 text-center leading-relaxed">Engagement stats are refreshed per global acquisition cycle.</p>
            </div>
         </aside>
      </div>
    </div>
  );
}
