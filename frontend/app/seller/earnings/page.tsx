"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  CircleDollarSign, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  History,
  TrendingUp,
  Download,
  Calendar,
  Wallet
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

export default function SellerEarnings() {
  const [earnings, setEarnings] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [earningsRes, statsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/seller/earnings', { withCredentials: true }),
          axios.get('http://localhost:5000/api/seller/stats', { withCredentials: true })
        ]);
        setEarnings(earningsRes.data);
        setStats(statsRes.data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to synchronize financial data');
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-20 text-center text-slate-300 font-black uppercase text-xs tracking-widest">Aggregating Financial Ledger...</div>;

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-2">Revenue Node</h1>
           <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Financial trajectory and asset payout status</p>
        </div>
        <button className="py-5 px-10 bg-slate-950 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl flex items-center gap-3 hover:bg-emerald-600 transition-all active:scale-95 group">
           <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" /> Export Ledger
        </button>
      </div>

      {/* Hero Stats */}
      <div className="grid md:grid-cols-3 gap-8">
         <section className="bg-indigo-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10">
               <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-10 border border-white/20">
                  <Wallet className="w-7 h-7" />
               </div>
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-200 mb-2">Accumulated Earnings</p>
               <h2 className="text-5xl font-black tracking-tighter mb-4">${stats?.totalRevenue?.toLocaleString() || 0}</h2>
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-100">Synchronized State</span>
               </div>
            </div>
         </section>

         <section className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-xl shadow-slate-200/20 group">
            <div className="relative z-10">
               <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-10 border border-emerald-100/50 shadow-lg shadow-emerald-100/40">
                  <TrendingUp className="w-7 h-7" />
               </div>
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Merchant Margin (90%)</p>
               <h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-4">${(stats?.totalRevenue * 0.9 || 0).toLocaleString()}</h2>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Platform Commission: $10%</p>
            </div>
         </section>

         <section className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-xl shadow-slate-200/20 group">
            <div className="relative z-10">
               <div className="w-14 h-14 bg-violet-50 text-violet-600 rounded-2xl flex items-center justify-center mb-10 border border-violet-100/50 shadow-lg shadow-violet-100/40">
                  <Calendar className="w-7 h-7" />
               </div>
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Next Payout Cycle</p>
               <h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-4">May 15</h2>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Automatic Distribution Active</p>
            </div>
         </section>
      </div>

      {/* Transaction History */}
      <section className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-2xl shadow-slate-200/20 space-y-10">
         <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-900 flex items-center justify-center border border-slate-100 shadow-sm">
                  <History className="w-5 h-5" />
               </div>
               <h2 className="text-2xl font-black text-slate-900 tracking-tight">Financial Timeline</h2>
            </div>
         </div>

         <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left">
               <thead>
                  <tr className="border-b border-slate-50">
                     <th className="pb-10 text-[10px] font-black uppercase tracking-widest text-slate-400">Log Entry</th>
                     <th className="pb-10 text-[10px] font-black uppercase tracking-widest text-slate-400">Timestamp</th>
                     <th className="pb-10 text-[10px] font-black uppercase tracking-widest text-slate-400">Gross Value</th>
                     <th className="pb-10 text-[10px] font-black uppercase tracking-widest text-slate-400">Net Profit</th>
                     <th className="pb-10 text-[10px] font-black uppercase tracking-widest text-slate-400">State</th>
                     <th className="pb-10 text-right"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {earnings.length > 0 ? earnings.map((t, i) => (
                    <motion.tr 
                      key={t._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="group transition-colors"
                    >
                       <td className="py-10">
                          <p className="font-black text-slate-900">Order #{t.order?._id.slice(-8).toUpperCase() || 'EXTERNAL'}</p>
                       </td>
                       <td className="py-10">
                          <div className="flex items-center gap-2">
                             <Clock className="w-3.5 h-3.5 text-slate-300" />
                             <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{new Date(t.createdAt).toLocaleDateString()}</span>
                          </div>
                       </td>
                       <td className="py-10">
                          <p className="text-sm font-black text-slate-900">${t.amount?.toLocaleString()}</p>
                       </td>
                       <td className="py-10">
                          <p className="text-sm font-black text-emerald-600">+${t.sellerEarnings?.toLocaleString()}</p>
                       </td>
                       <td className="py-10">
                          <div className={`px-4 py-1.5 rounded-xl inline-flex items-center gap-2 ${t.status === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                             {t.status === 'paid' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                             <span className="text-[10px] font-black uppercase tracking-widest">{t.status}</span>
                          </div>
                       </td>
                       <td className="py-10 text-right">
                          <Link href={`/seller/orders/${t.order?._id}`} className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                             <ArrowUpRight className="w-4 h-4" />
                          </Link>
                       </td>
                    </motion.tr>
                  )) : (
                    <tr>
                       <td colSpan={6} className="py-32 text-center">
                          <p className="text-slate-300 font-black uppercase tracking-widest text-[10px]">No ledger entries detected.</p>
                       </td>
                    </tr>
                  )}
               </tbody>
            </table>
         </div>
      </section>
    </div>
  );
}
