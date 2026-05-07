"use client";

import { useState } from 'react';
import { 
  Megaphone, 
  Target, 
  Send, 
  Tag, 
  Plus, 
  BarChart2, 
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  Zap,
  Gift
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function SellerMarketing() {
  const [activeTab, setActiveTab] = useState('campaigns');

  const campaigns = [
    { title: 'Summer Collection Launch', status: 'Active', reach: '5.2k', conversion: '4.2%', roi: '3.8x', type: 'Email' },
    { title: 'Early Bird Electronics', status: 'Scheduled', reach: '2.8k', conversion: '-', roi: '-', type: 'Social' },
    { title: 'Customer Re-engagement', status: 'Draft', reach: '-', conversion: '-', roi: '-', type: 'SMS' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-2xl font-bold text-slate-900 mb-1">Marketing Suite</h1>
           <p className="text-sm font-medium text-slate-400">Launch and track promotional campaigns to boost sales</p>
        </div>
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#0052FF] text-white rounded-xl font-bold text-sm hover:bg-[#0041CC] transition-all shadow-lg shadow-[#0052FF]/20">
           <Plus className="w-4 h-4" /> Create Campaign
        </button>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-gradient-to-br from-[#0052FF] to-blue-700 p-8 rounded-3xl text-white shadow-xl shadow-blue-500/20 group relative overflow-hidden">
            <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
            <div className="relative z-10">
               <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                  <Zap className="w-6 h-6" />
               </div>
               <h3 className="text-lg font-bold mb-2">Smart Coupons</h3>
               <p className="text-xs text-white/70 mb-6 leading-relaxed">AI-powered discount generation based on customer behavior.</p>
               <button className="w-full py-3 bg-white text-[#0052FF] rounded-xl text-xs font-bold hover:bg-blue-50 transition-colors">Setup Now</button>
            </div>
         </div>

         <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:border-[#0052FF]/20 transition-all">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
               <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Audience Segments</h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">Target specific customer groups with personalized offers.</p>
            <button className="text-xs font-bold text-[#0052FF] hover:underline flex items-center gap-2">Manage Segments <ChevronRight className="w-3 h-3" /></button>
         </div>

         <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:border-[#0052FF]/20 transition-all">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
               <Gift className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Loyalty Programs</h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">Reward your repeat customers with points and perks.</p>
            <button className="text-xs font-bold text-[#0052FF] hover:underline flex items-center gap-2">Configure Program <ChevronRight className="w-3 h-3" /></button>
         </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
         <div className="flex gap-8">
            {['campaigns', 'automated emails', 'promotions'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 text-xs font-bold uppercase tracking-widest relative transition-colors ${activeTab === tab ? 'text-[#0052FF]' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {tab}
                {activeTab === tab && <motion.div layoutId="activeTab" className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-[#0052FF]" />}
              </button>
            ))}
         </div>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden min-h-[300px]">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-slate-50/50">
                     <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">Campaign Name</th>
                     <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">Type</th>
                     <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</th>
                     <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">Reach</th>
                     <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">Conv. Rate</th>
                     <th className="px-8 py-4 text-right"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {campaigns.map((c, i) => (
                    <tr key={i} className="group hover:bg-slate-50 transition-colors">
                       <td className="px-8 py-5 text-sm font-bold text-slate-900">{c.title}</td>
                       <td className="px-8 py-5">
                          <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[9px] font-bold uppercase tracking-widest rounded-lg">{c.type}</span>
                       </td>
                       <td className="px-8 py-5">
                          <div className="flex items-center gap-2">
                             <div className={`w-1.5 h-1.5 rounded-full ${c.status === 'Active' ? 'bg-emerald-500 animate-pulse' : c.status === 'Scheduled' ? 'bg-amber-500' : 'bg-slate-300'}`} />
                             <span className="text-xs font-medium text-slate-700">{c.status}</span>
                          </div>
                       </td>
                       <td className="px-8 py-5 text-sm font-medium text-slate-600">{c.reach}</td>
                       <td className="px-8 py-5 text-sm font-bold text-slate-900">{c.conversion}</td>
                       <td className="px-8 py-5 text-right">
                          <button className="p-2 text-slate-400 hover:text-[#0052FF] transition-colors"><ExternalLink className="w-4 h-4" /></button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </motion.div>
  );
}
