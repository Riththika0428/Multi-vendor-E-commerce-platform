"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Star, 
  Store, 
  LogOut,
  ChevronRight,
  TrendingUp,
  CircleDollarSign
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { motion } from 'framer-motion';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/seller/dashboard' },
  { icon: Package, label: 'Products', href: '/seller/products' },
  { icon: ShoppingCart, label: 'Orders', href: '/seller/orders' },
  { icon: CircleDollarSign, label: 'Earnings', href: '/seller/earnings' },
  { icon: Star, label: 'Reviews', href: '/seller/reviews' },
  { icon: Store, label: 'Store Profile', href: '/seller/store' },
];

export default function SellerSidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuthStore();

  return (
    <aside className="w-[320px] bg-white border-r border-slate-100 flex flex-col h-screen shrink-0 overflow-hidden">
      {/* Brand */}
      <div className="h-32 flex items-center px-10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100 group-hover:rotate-6 transition-transform">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tighter">Merchant<span className="text-indigo-600">Hub</span></h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Enterprise v1.2</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-6 py-4 space-y-2 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`group flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? 'bg-slate-950 text-white shadow-xl shadow-slate-200' 
                  : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-white/10' : 'bg-transparent group-hover:bg-white'}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-black uppercase tracking-widest ${isActive ? 'translate-x-1' : ''} transition-transform`}>
                  {item.label}
                </span>
              </div>
              <ChevronRight className={`w-4 h-4 transition-all ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} />
            </Link>
          );
        })}
      </nav>

      {/* Footer / Account */}
      <div className="p-6">
        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
           <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                 <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-black">
                    {user?.storeName?.charAt(0) || 'S'}
                 </div>
              </div>
              <div className="min-w-0">
                 <p className="text-xs font-black text-slate-900 truncate">{user?.storeName || 'My Store'}</p>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pro Merchant</p>
              </div>
           </div>
           
           <button 
             onClick={() => logout()}
             className="w-full flex items-center justify-center gap-3 p-4 bg-white text-rose-500 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-slate-100 hover:bg-rose-50 hover:border-rose-100 transition-all active:scale-95 shadow-sm"
           >
             <LogOut className="w-4 h-4" /> Sign Out
           </button>
        </div>
      </div>
    </aside>
  );
}
