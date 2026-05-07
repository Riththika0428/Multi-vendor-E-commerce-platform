"use client";

import { useEffect, useState } from 'react';
import { 
  LineChart as LineChartIcon, 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter,
  Calendar,
  Download
} from 'lucide-react';
import { motion } from 'framer-motion';
import SalesChart from '@/components/seller/SalesChart';
import DonutChart from '@/components/seller/DonutChart';

export default function SellerAnalytics() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { label: 'Conversion Rate', value: '3.24%', trend: '+0.8%', trendUp: true },
    { label: 'Avg. Session Duration', value: '4m 32s', trend: '-12s', trendUp: false },
    { label: 'Bounce Rate', value: '42.5%', trend: '-2.1%', trendUp: true },
    { label: 'Customer Lifetime Value', value: '$842.00', trend: '+$52', trendUp: true },
  ];

  if (loading) {
     return (
       <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
          <div className="w-10 h-10 border-4 border-[#0052FF] border-t-transparent rounded-full animate-spin" />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Processing Big Data...</p>
       </div>
     );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-2xl font-bold text-slate-900 mb-1">Advanced Analytics</h1>
           <p className="text-sm font-medium text-slate-400">Deep dive into your store performance and traffic</p>
        </div>
        <div className="flex gap-3">
           <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 flex items-center gap-2 hover:border-[#0052FF] transition-all">
              <Calendar className="w-3.5 h-3.5" /> This Quarter
           </button>
           <button className="px-4 py-2 bg-[#0052FF] text-white rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-[#0041CC] transition-all shadow-lg shadow-[#0052FF]/20">
              <Download className="w-3.5 h-3.5" /> Export PDF
           </button>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {stats.map((s, i) => (
           <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">{s.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{s.value}</h3>
              <div className={`flex items-center gap-1 text-[10px] font-bold ${s.trendUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                 {s.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                 {s.trend}
              </div>
           </div>
         ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-slate-900">Traffic Source Distribution</h3>
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                     <div className="w-2 h-2 rounded-full bg-[#0052FF]" /> Direct
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                     <div className="w-2 h-2 rounded-full bg-[#82ca9d]" /> Search
                  </div>
               </div>
            </div>
            <div className="h-[350px]">
               <SalesChart />
            </div>
         </div>

         <div className="lg:col-span-1 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
            <h3 className="text-lg font-bold text-slate-900 mb-8">Sales by Region</h3>
            <div className="flex-1 flex items-center justify-center">
               <DonutChart />
            </div>
            <div className="mt-8 space-y-4">
               {[
                 { region: 'North America', value: '45%', color: 'bg-[#0052FF]' },
                 { region: 'Europe', value: '32%', color: 'bg-[#82ca9d]' },
                 { region: 'Asia', value: '23%', color: 'bg-[#ffc658]' }
               ].map((r, i) => (
                 <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <div className={`w-1.5 h-1.5 rounded-full ${r.color}`} />
                       <span className="text-xs font-medium text-slate-600">{r.region}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-900">{r.value}</span>
                 </div>
               ))}
            </div>
         </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
         <div className="p-8 border-b border-slate-50">
            <h3 className="text-lg font-bold text-slate-900">Top Performing Categories</h3>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-slate-50/50">
                     <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">Category</th>
                     <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">Sales Volume</th>
                     <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">Revenue Contribution</th>
                     <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">Growth</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {[
                    { cat: 'Electronics', vol: '1.2k', rev: '45.2%', growth: '+12.5%' },
                    { cat: 'Fashion', vol: '850', rev: '22.8%', growth: '+8.3%' },
                    { cat: 'Home & Living', vol: '420', rev: '12.4%', growth: '-2.1%' },
                    { cat: 'Sports', vol: '120', rev: '5.2%', growth: '+15.2%' },
                  ].map((row, i) => (
                    <tr key={i} className="group hover:bg-slate-50 transition-colors">
                       <td className="px-8 py-5 text-sm font-bold text-slate-900">{row.cat}</td>
                       <td className="px-8 py-5 text-sm font-medium text-slate-600">{row.vol} items</td>
                       <td className="px-8 py-5 text-sm font-bold text-slate-900">{row.rev}</td>
                       <td className={`px-8 py-5 text-sm font-bold ${row.growth.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>{row.growth}</td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </motion.div>
  );
}
