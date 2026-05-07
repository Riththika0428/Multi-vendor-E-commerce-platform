"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  ShoppingBag,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SellerCustomers() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Mock loading for now as this is a new feature
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const mockCustomers = [
    { id: 1, name: 'Alex Johnson', email: 'alex.j@example.com', orders: 12, spent: 1240.50, lastOrder: '2026-05-01' },
    { id: 2, name: 'Sarah Miller', email: 'sarah.m@example.com', orders: 8, spent: 850.00, lastOrder: '2026-04-28' },
    { id: 3, name: 'Michael Chen', email: 'm.chen@example.com', orders: 5, spent: 420.75, lastOrder: '2026-05-05' },
    { id: 4, name: 'Emma Wilson', email: 'emma.w@example.com', orders: 15, spent: 2100.20, lastOrder: '2026-05-07' },
    { id: 5, name: 'David Smith', email: 'd.smith@example.com', orders: 3, spent: 150.00, lastOrder: '2026-04-15' },
  ];

  const filteredCustomers = mockCustomers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Customer Insights</h1>
        <p className="text-sm font-medium text-slate-400">View and manage your customer relationships</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
         <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Total Customers</p>
            <h3 className="text-2xl font-bold text-slate-900">1,284</h3>
            <div className="mt-2 flex items-center gap-1 text-emerald-500">
               <span className="text-[10px] font-bold">↑ 14.5%</span>
               <span className="text-[10px] font-medium text-slate-400 opacity-60">vs last month</span>
            </div>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Active Profiles</p>
            <h3 className="text-2xl font-bold text-slate-900">856</h3>
            <div className="mt-2 flex items-center gap-1 text-emerald-500">
               <span className="text-[10px] font-bold">↑ 5.2%</span>
               <span className="text-[10px] font-medium text-slate-400 opacity-60">vs last month</span>
            </div>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Avg. Order Value</p>
            <h3 className="text-2xl font-bold text-slate-900">$142.50</h3>
            <div className="mt-2 flex items-center gap-1 text-emerald-500">
               <span className="text-[10px] font-bold">↑ 8.1%</span>
               <span className="text-[10px] font-medium text-slate-400 opacity-60">vs last month</span>
            </div>
         </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4">
         <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, email or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#0052FF]/10 focus:border-[#0052FF] outline-none font-medium text-slate-900 text-sm transition-all"
            />
         </div>
         <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-slate-600 flex items-center gap-2 font-bold text-sm hover:border-[#0052FF] hover:text-[#0052FF] transition-all">
            <Filter className="w-4 h-4" /> Advanced Filters
         </button>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                     <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Customer</th>
                     <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Orders</th>
                     <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Spent</th>
                     <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Last Active</th>
                     <th className="px-8 py-5 text-right"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  <AnimatePresence>
                    {loading ? (
                      [1,2,3,4,5].map(i => (
                        <tr key={i} className="animate-pulse">
                           <td className="px-8 py-6"><div className="h-10 bg-slate-100 rounded-xl w-3/4" /></td>
                           <td className="px-8 py-6"><div className="h-6 bg-slate-100 rounded-lg w-1/3" /></td>
                           <td className="px-8 py-6"><div className="h-6 bg-slate-100 rounded-lg w-1/4" /></td>
                           <td className="px-8 py-6"><div className="h-6 bg-slate-100 rounded-lg w-1/2" /></td>
                           <td className="px-8 py-6 text-right"><div className="h-8 w-8 bg-slate-100 rounded-full ml-auto" /></td>
                        </tr>
                      ))
                    ) : (
                      filteredCustomers.map((customer) => (
                        <motion.tr 
                          key={customer.id}
                          className="group hover:bg-slate-50/50 transition-colors"
                        >
                           <td className="px-8 py-6">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-full bg-[#0052FF]/5 flex items-center justify-center font-bold text-sm text-[#0052FF] border border-[#0052FF]/10">
                                    {customer.name.charAt(0)}
                                 </div>
                                 <div className="min-w-0">
                                    <p className="text-sm font-bold text-slate-900 truncate">{customer.name}</p>
                                    <p className="text-[10px] font-medium text-slate-400 truncate">{customer.email}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-8 py-6">
                              <span className="text-xs font-bold text-slate-700">{customer.orders} orders</span>
                           </td>
                           <td className="px-8 py-6">
                              <p className="text-sm font-bold text-slate-900">${customer.spent.toLocaleString()}</p>
                           </td>
                           <td className="px-8 py-6">
                              <span className="text-[10px] font-medium text-slate-400">{new Date(customer.lastOrder).toLocaleDateString()}</span>
                           </td>
                           <td className="px-8 py-6 text-right">
                              <button className="p-2 text-slate-400 hover:text-[#0052FF] transition-all">
                                 <ArrowUpRight className="w-4 h-4" />
                              </button>
                           </td>
                        </motion.tr>
                      ))
                    )}
                  </AnimatePresence>
               </tbody>
            </table>
         </div>
         
         {!loading && filteredCustomers.length === 0 && (
            <div className="py-20 text-center flex flex-col items-center justify-center">
               <Users className="w-12 h-12 text-slate-200 mb-4" />
               <h3 className="text-md font-bold text-slate-900">No customers found</h3>
               <p className="text-xs font-medium text-slate-400">Try adjusting your search query.</p>
            </div>
         )}
      </div>
    </motion.div>
  );
}
