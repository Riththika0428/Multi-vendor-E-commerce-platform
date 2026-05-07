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
  CircleDollarSign,
  Users,
  LineChart,
  Megaphone,
  Settings,
  ShoppingBag
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { motion } from 'framer-motion';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/seller/dashboard' },
  { icon: Package, label: 'Products', href: '/seller/products' },
  { icon: ShoppingCart, label: 'Orders', href: '/seller/orders' },
  { icon: CircleDollarSign, label: 'Earnings', href: '/seller/earnings' },
  { icon: Users, label: 'Customers', href: '/seller/customers' },
  { icon: Star, label: 'Reviews', href: '/seller/reviews' },
  { icon: LineChart, label: 'Analytics', href: '/seller/analytics' },
  { icon: Megaphone, label: 'Marketing', href: '/seller/marketing' },
  { icon: Store, label: 'Store Profile', href: '/seller/store' },
  { icon: Settings, label: 'Settings', href: '/seller/settings' },
];

export default function SellerSidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuthStore();

  return (
    <aside className="w-[280px] bg-[#0052FF] flex flex-col h-screen shrink-0 overflow-hidden relative">
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-20%] w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-20%] w-64 h-64 bg-white rounded-full blur-3xl" />
      </div>

      {/* Brand */}
      <div className="h-24 flex items-center px-8 relative z-10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">MerchantHub</h1>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar relative z-10">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-white/10 text-white shadow-lg border border-white/5' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`} />
              <span className={`text-sm font-medium ${isActive ? 'text-white' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile Area */}
      <div className="p-4 relative z-10">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#0052FF] font-bold text-sm shadow-inner">
               {user?.storeName?.charAt(0) || 'K'}
            </div>
            <div className="min-w-0">
               <p className="text-sm font-bold text-white truncate">{user?.storeName || 'Kavi Stores'}</p>
               <p className="text-[10px] font-medium text-white/50 uppercase tracking-wider">Pro Merchant</p>
            </div>
          </div>
          
          <button 
            onClick={() => logout()}
            className="w-full flex items-center gap-3 px-2 py-2 text-white/70 hover:text-white text-xs font-medium transition-all group"
          >
            <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}
