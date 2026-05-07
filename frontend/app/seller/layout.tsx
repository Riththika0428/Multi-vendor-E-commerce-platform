"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import SellerSidebar from '@/components/seller/SellerSidebar';
import { motion, AnimatePresence } from 'framer-motion';

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, checkAuth } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const initAuth = async () => {
      await checkAuth();
    };
    initAuth();
  }, []);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'seller')) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== 'seller') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Verifying credentials...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafbfc] flex">
      {/* Sidebar */}
      <SellerSidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden bg-[#F8FAFC]">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 shrink-0">
           <div className="flex flex-col">
              <h2 className="text-sm font-semibold text-slate-400">Welcome back,</h2>
              <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                {user.name.split(' ')[0]} 👋
              </h1>
           </div>

           {/* Search Bar */}
           <div className="hidden md:flex items-center relative max-w-md w-full mx-8">
              <div className="absolute left-4 text-slate-400">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-[#F3F4F6] border-none rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-[#0052FF]/20 transition-all"
              />
           </div>
           
           <div className="flex items-center gap-6">
              <button className="relative p-2 text-slate-400 hover:text-[#0052FF] transition-colors group">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                 <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">3</span>
              </button>
              
              <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
                 <img 
                   src={`https://ui-avatars.com/api/?name=${user.name}&background=0052FF&color=fff`} 
                   alt={user.name}
                   className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                 />
                 <div className="hidden sm:block">
                   <p className="text-sm font-bold text-slate-900 leading-none mb-1">{user.name}</p>
                   <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Merchant</p>
                 </div>
              </div>
           </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
           <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.div>
           </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
