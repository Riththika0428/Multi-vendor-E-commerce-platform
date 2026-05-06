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
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        {/* Header (Optional but good for notifications/search) */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-10 shrink-0">
           <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Section</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">/</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">
                {pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
              </span>
           </div>
           
           <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                 <p className="text-xs font-black text-slate-900">{user.name}</p>
                 <p className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest">Merchant Portal</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 font-black text-sm">
                 {user.name.charAt(0)}
              </div>
           </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
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
