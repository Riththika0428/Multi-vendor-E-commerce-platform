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
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import MetricCard from '@/components/seller/MetricCard';

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
        toast.error('Failed to load financial records');
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
           <div className="w-10 h-10 border-4 border-[#0052FF] border-t-transparent rounded-full animate-spin" />
           <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Financial Syncing...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-2xl font-bold text-slate-900 mb-1">Financial Overview</h1>
           <p className="text-sm font-medium text-slate-400">Manage your revenue and payout schedule</p>
        </div>
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:border-[#0052FF] hover:text-[#0052FF] transition-all group">
           <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" /> Export Statement
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard 
          title="Net Revenue" 
          value={`$${(stats?.totalRevenue * 0.9 || 0).toLocaleString()}`} 
          icon={Wallet} 
          color="bg-blue-600" 
        />
        <MetricCard 
          title="Platform Fee (10%)" 
          value={`$${(stats?.totalRevenue * 0.1 || 0).toLocaleString()}`} 
          icon={ArrowUpCircle} 
          color="bg-rose-500" 
        />
        <MetricCard 
          title="Pending Payout" 
          value={`$${(earnings.filter(e => e.status !== 'paid').reduce((acc, curr) => acc + curr.sellerEarnings, 0) || 0).toLocaleString()}`} 
          icon={Clock} 
          color="bg-amber-500" 
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Transaction History */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
             <h3 className="text-lg font-bold text-slate-900">Transaction History</h3>
             <Link href="#" className="text-xs font-bold text-[#0052FF] hover:underline uppercase tracking-wider">View Full History</Link>
          </div>
          
          <div className="overflow-x-auto">
             <table className="w-full text-left">
                <thead>
                   <tr className="border-b border-slate-50">
                      <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Order ID</th>
                      <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Date</th>
                      <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Amount</th>
                      <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</th>
                      <th className="px-8 py-5 text-right"></th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                   {earnings.length > 0 ? earnings.map((t) => (
                     <motion.tr 
                       key={t._id}
                       className="group hover:bg-slate-50/50 transition-colors"
                     >
                        <td className="px-8 py-5">
                           <p className="text-xs font-bold text-slate-600">#{t.order?._id.slice(-8).toUpperCase() || 'EXT-TRX'}</p>
                        </td>
                        <td className="px-8 py-5">
                           <span className="text-xs font-medium text-slate-500">{new Date(t.createdAt).toLocaleDateString()}</span>
                        </td>
                        <td className="px-8 py-5">
                           <div className="flex flex-col">
                              <span className="text-xs font-bold text-slate-950">${t.sellerEarnings?.toLocaleString()}</span>
                              <span className="text-[10px] font-medium text-slate-400 italic">Fee: ${(t.amount - t.sellerEarnings).toFixed(2)}</span>
                           </div>
                        </td>
                        <td className="px-8 py-5">
                           <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${t.status === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                              {t.status}
                           </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                           <Link href={`/seller/orders/${t.order?._id}`} className="p-2 text-slate-400 hover:text-[#0052FF] transition-colors inline-block">
                              <ArrowUpRight className="w-4 h-4" />
                           </Link>
                        </td>
                     </motion.tr>
                   )) : (
                     <tr>
                        <td colSpan={5} className="px-8 py-20 text-center">
                           <p className="text-sm font-medium text-slate-400">No financial transactions detected yet.</p>
                        </td>
                     </tr>
                   )}
                </tbody>
             </table>
          </div>
        </div>

        {/* Next Payout Section */}
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-[#0052FF] p-8 rounded-3xl text-white shadow-xl shadow-[#0052FF]/20 relative overflow-hidden group">
              <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10">
                 <h4 className="text-sm font-bold opacity-80 uppercase tracking-widest mb-2 font-mono">Next Payout</h4>
                 <p className="text-3xl font-bold mb-1">May 15, 2026</p>
                 <p className="text-xs font-medium opacity-60 mb-6">Scheduled automatic distribution</p>
                 
                 <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-xl text-xs font-bold border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    Automatic Transfer Active
                 </div>
              </div>
           </div>

           <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h4 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
                 <Wallet className="w-4 h-4 text-slate-400" /> Payout Method
              </h4>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-4">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-bold text-[#0052FF] text-xs">P</div>
                    <div>
                       <p className="text-xs font-bold text-slate-900">PayPal Express</p>
                       <p className="text-[10px] font-medium text-slate-400">ka****@gmail.com</p>
                    </div>
                 </div>
                 <button className="text-[10px] font-bold text-[#0052FF] hover:underline uppercase tracking-wider">Change</button>
              </div>
              <p className="text-[11px] font-medium text-slate-400 leading-relaxed text-center px-4">
                 Changes to payout methods will undergo a 24-hour verification period for security.
              </p>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
