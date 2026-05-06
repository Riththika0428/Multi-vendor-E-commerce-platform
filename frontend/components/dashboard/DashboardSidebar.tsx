"use client";

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
  ChevronRight
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { motion } from 'framer-motion';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/customer/dashboard' },
  { icon: ShoppingBag, label: 'Browse Products', href: '/products' },
  { icon: ShoppingCart, label: 'My Cart', href: '/cart' },
  { icon: Package, label: 'Orders', href: '/customer/orders' },
  { icon: Heart, label: 'Wishlist', href: '/customer/wishlist' },
  { icon: Star, label: 'Reviews', href: '/customer/orders' }, 
  { icon: Settings, label: 'Profile Settings', href: '/customer/profile' },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuthStore();

  return (
    <aside className="w-80 hidden lg:flex flex-col h-[calc(100vh-120px)] sticky top-28">
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col h-full overflow-hidden">
        
        {/* User Profile Summary */}
        <div className="p-8 border-b border-slate-50 bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-indigo-100">
              {user?.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-black text-slate-900 leading-tight">{user?.name}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Elite Member</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item, i) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={i} 
                href={item.href}
                className={`group flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-slate-950 text-white shadow-2xl shadow-slate-200 translate-x-1' 
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
                {isActive && (
                  <motion.div 
                    layoutId="active-nav-indicator"
                    className="w-1.5 h-1.5 bg-indigo-400 rounded-full shadow-[0_0_10px_rgba(129,140,248,0.8)]"
                  />
                )}
                {!isActive && (
                  <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-indigo-300" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-6 border-t border-slate-50">
          <button 
            onClick={() => logout()}
            className="w-full flex items-center gap-4 p-4 rounded-2xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all duration-300"
          >
            <div className="p-2 rounded-xl bg-slate-100 text-slate-400 group-hover:bg-rose-100 group-hover:text-rose-500">
              <LogOut className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.15em]">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Decorative Gradient Shadow */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-20 bg-indigo-600/5 blur-[60px] pointer-events-none" />
    </aside>
  );
}
