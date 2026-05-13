"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  ShoppingCart, 
  Package, 
  Heart, 
  Star, 
  Settings, 
  LogOut,
  ChevronRight,
  Zap,
  TrendingUp,
  Clock
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useCartStore } from '@/store/useCartStore';
import { motion } from 'framer-motion';
import axios from 'axios';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/customer/dashboard' },
  { icon: ShoppingBag, label: 'Marketplace', href: '/products' },
  { icon: ShoppingCart, label: 'My Cart', href: '/cart' },
  { icon: Package, label: 'Orders', href: '/customer/orders' },
  { icon: Heart, label: 'Wishlist', href: '/customer/wishlist' },
  { icon: Star, label: 'Reviews', href: '/customer/orders' }, 
  { icon: Settings, label: 'Account', href: '/customer/profile' },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuthStore();
  const { cartItems } = useCartStore();
  const [stats, setStats] = useState({ orders: 0, wishlist: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [ordersRes, wishlistRes] = await Promise.all([
          axios.get('http://localhost:5000/api/orders/my', { withCredentials: true }),
          axios.get('http://localhost:5000/api/wishlist', { withCredentials: true })
        ]);
        setStats({
          orders: ordersRes.data.length,
          wishlist: wishlistRes.data.products?.length || 0
        });
      } catch (error) {
        console.error('Failed to fetch sidebar stats', error);
      }
    };
    if (user) fetchStats();
  }, [user]);

  return (
    <aside className="w-80 hidden lg:flex flex-col h-[calc(100vh-120px)] sticky top-28 space-y-6">
      
      {/* Primary Sidebar Container */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col h-full overflow-hidden">
        
        {/* User Profile Hub */}
        <div className="p-8 border-b border-slate-50 bg-slate-50/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-600/5 rounded-full -mr-12 -mt-12 blur-2xl" />
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-16 h-16 rounded-[1.25rem] bg-indigo-600 flex items-center justify-center text-white text-2xl font-black shadow-xl shadow-indigo-100">
              {user?.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-black text-slate-900 leading-tight">{user?.name}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Member</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-[1px] bg-slate-50 border-b border-slate-50">
          <div className="p-6 bg-white text-center">
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">Orders</p>
            <p className="text-xl font-black text-slate-900">{stats.orders}</p>
          </div>
          <div className="p-6 bg-white text-center border-l border-slate-50">
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">Saved</p>
            <p className="text-xl font-black text-slate-900">{stats.wishlist}</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto no-scrollbar">
          {navItems.map((item, i) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={i} 
                href={item.href}
                className={`group flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-slate-950 text-white shadow-2xl shadow-indigo-100 translate-x-1' 
                    : 'text-slate-400 hover:bg-slate-50 hover:text-indigo-600'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-xl transition-colors ${
                    isActive ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-100 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                  }`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-[0.15em]">{item.label}</span>
                </div>
                {isActive ? (
                  <motion.div 
                    layoutId="active-nav-indicator"
                    className="w-1.5 h-1.5 bg-indigo-400 rounded-full shadow-[0_0_10px_rgba(129,140,248,0.8)]"
                  />
                ) : (
                  <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-indigo-300" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout at Bottom */}
        <div className="p-6 border-t border-slate-50 mt-auto">
          <button 
            onClick={() => logout()}
            className="w-full flex items-center gap-4 p-4 rounded-2xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all duration-300 group"
          >
            <div className="p-2 rounded-xl bg-slate-100 text-slate-400 group-hover:bg-rose-100 group-hover:text-rose-500 transition-colors">
              <LogOut className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.15em]">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Secondary Sidebar Widget - Active Order Status */}
      <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-100 group cursor-pointer active:scale-95 transition-all">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
             <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                <Zap className="w-5 h-5 text-indigo-200" />
             </div>
             <span className="text-[9px] font-black uppercase tracking-widest text-indigo-200">Active Tracking</span>
          </div>
          <p className="text-xl font-black mb-1">Standard Delivery</p>
          <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest">Arriving in 2-4 days</p>
          <div className="mt-6 h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: '65%' }}
               transition={{ duration: 1, delay: 0.5 }}
               className="h-full bg-white rounded-full shadow-[0_0_10px_white]"
             />
          </div>
        </div>
      </div>
    </aside>
  );
}
