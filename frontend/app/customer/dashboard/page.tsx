"use client";

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { 
  Package, 
  ShoppingBag, 
  Star, 
  ArrowRight, 
  Bell, 
  Settings, 
  Search, 
  MessageCircle,
  Heart,
  ChevronRight,
  Flame,
  Clock,
  User,
  CreditCard,
  Truck,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data for new sections
const recentlyViewed = [
  { id: 1, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&h=200&fit=crop', name: 'Spring Style' },
  { id: 2, image: 'https://images.unsplash.com/photo-1539109132314-d49c02d82267?w=200&h=200&fit=crop', name: 'Luxe Wear' },
  { id: 3, image: 'https://images.unsplash.com/photo-1549062572-544a64fb0c56?w=200&h=200&fit=crop', name: 'Daily Casual' },
  { id: 4, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200&h=200&fit=crop', name: 'Modern Set' },
  { id: 5, image: 'https://images.unsplash.com/photo-1475184636916-d2bb99617acc?w=200&h=200&fit=crop', name: 'Urban Look' },
];

const stories = [
  { id: 1, image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop', title: 'Trend Alert', live: true },
  { id: 2, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop', title: 'Flash Sale', live: false },
  { id: 3, image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=600&fit=crop', title: 'New Drop', live: true },
  { id: 4, image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=400&h=600&fit=crop', title: 'Style Edit', live: false },
];

const categories = [
  { name: 'Dresses', icon: '👗' },
  { name: 'Pants', icon: '👖' },
  { name: 'Skirts', icon: '👗' },
  { name: 'Shorts', icon: '🩳' },
  { name: 'Jackets', icon: '🧥' },
  { name: 'Hoodies', icon: '🧥' },
];

export default function CustomerDashboard() {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('To Pay');

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/orders/my', { withCredentials: true });
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchMyOrders();
  }, []);

  const orderTabs = [
    { label: 'To Pay', icon: CreditCard, count: orders.filter((o: any) => !o.isPaid).length },
    { label: 'To Receive', icon: Truck, count: orders.filter((o: any) => o.isPaid && !o.isDelivered).length },
    { label: 'To Review', icon: Star, count: orders.filter((o: any) => o.isDelivered).length },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-600 flex items-center justify-center text-white text-2xl font-black shadow-2xl shadow-indigo-200">
              {user?.name.charAt(0)}
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-[#fafbfc]" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Hello, {user?.name.split(' ')[0]}!</h1>
              <Link href="/customer/profile" className="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all">
                <button className="text-[10px] font-black uppercase tracking-widest px-2">My Activity</button>
              </Link>
            </div>
            <p className="text-slate-400 font-bold text-[11px] uppercase tracking-[0.2em]">Premium Member since 2024</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100 hover:border-indigo-200 hover:text-indigo-600 transition-all shadow-sm">
            <Bell className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100 hover:border-indigo-200 hover:text-indigo-600 transition-all shadow-sm">
            <MessageCircle className="w-5 h-5" />
          </button>
          <Link href="/customer/profile">
            <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100 hover:border-indigo-200 hover:text-indigo-600 transition-all shadow-sm">
              <Settings className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>

      {/* Announcement/Promotion Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-48 rounded-[3rem] bg-indigo-600 text-white overflow-hidden shadow-2xl shadow-indigo-200 group"
      >
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/50 to-transparent pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-400 rounded-full blur-[80px] opacity-30" />
        <div className="relative z-10 p-10 flex flex-col justify-center h-full max-w-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest">Limited Offer</div>
            <div className="flex items-center gap-2 text-indigo-200">
              <Clock className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Ending Soon</span>
            </div>
          </div>
          <h2 className="text-4xl font-black mb-1">20% Flash Sale</h2>
          <p className="text-indigo-100 font-medium tracking-wide">On all summer collections reimagned for you.</p>
        </div>
        <div className="absolute right-12 bottom-0 top-0 flex items-center opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-xl cursor-pointer">
            <ArrowRight className="w-8 h-8" />
          </div>
        </div>
      </motion.div>

      {/* Recently Viewed */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-black text-slate-900 tracking-tight">Recently viewed</h3>
          <button className="text-indigo-600 text-[11px] font-black uppercase tracking-widest hover:underline transition-all">Clear All</button>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
          {recentlyViewed.map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex-shrink-0 group cursor-pointer"
            >
              <div className="w-20 h-20 rounded-[1.5rem] p-1 border-2 border-slate-100 group-hover:border-indigo-600 transition-all duration-500 overflow-hidden shadow-sm">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-[1.25rem] group-hover:scale-110 transition-transform duration-500" />
              </div>
              <p className="text-[10px] font-bold text-center text-slate-400 mt-2 truncate w-20">{item.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* My Orders Section */}
      <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/20">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-xl font-black text-slate-900 tracking-tight">My Orders</h3>
          <Link href="/customer/orders" className="flex items-center gap-2 group">
            <span className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] group-hover:translate-x-[-4px] transition-transform">See All History</span>
            <div className="w-8 h-8 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <ChevronRight className="w-4 h-4" />
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-10">
          {orderTabs.map((tab) => (
            <button 
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`p-6 rounded-3xl flex flex-col items-center gap-4 transition-all duration-300 relative overflow-hidden group ${
                activeTab === tab.label 
                  ? 'bg-slate-950 text-white shadow-2xl shadow-indigo-100 scale-105' 
                  : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-indigo-600'
              }`}
            >
              {tab.count > 0 && (
                <div className={`absolute top-4 right-4 w-6 h-6 flex items-center justify-center rounded-full text-[10px] font-black ${
                  activeTab === tab.label ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-600'
                }`}>
                  {tab.count}
                </div>
              )}
              <tab.icon className={`w-7 h-7 ${activeTab === tab.label ? 'text-indigo-400' : 'group-hover:text-indigo-600'}`} />
              <span className="text-[11px] font-black uppercase tracking-widest">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Orders List based on Tab */}
        <div className="space-y-4">
          {loading ? (
             <div className="h-24 bg-slate-50 animate-pulse rounded-3xl" />
          ) : orders.length > 0 ? (
            orders
              .filter((o: any) => {
                if (activeTab === 'To Pay') return !o.isPaid;
                if (activeTab === 'To Receive') return o.isPaid && !o.isDelivered;
                if (activeTab === 'To Review') return o.isDelivered;
                return true;
              })
              .slice(0, 2)
              .map((order: any) => (
                <div key={order._id} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] group hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-indigo-100">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-inner border border-white">
                      <img src={order.orderItems[0]?.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900">Order #{order._id.slice(-6).toUpperCase()}</p>
                      <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-lg font-black text-indigo-600">${order.totalPrice.toFixed(0)}</span>
                    <Link href={`/customer/orders/${order._id}`}>
                      <button className="px-5 py-2.5 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm group-hover:bg-slate-950 group-hover:text-white transition-all">Details</button>
                    </Link>
                  </div>
                </div>
              ))
          ) : (
            <div className="text-center py-10">
              <p className="text-slate-400 text-sm font-medium">No orders in this section.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stories / Featured Section */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-8 bg-indigo-600 rounded-full" />
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Stories</h3>
          </div>
          <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest px-4 py-2 bg-indigo-50 rounded-xl">View All</button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stories.map((story, i) => (
            <motion.div 
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-xl"
            >
              <img src={story.image} alt={story.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {story.live && (
                <div className="absolute top-6 right-6 px-3 py-1 bg-green-500 text-white rounded-full flex items-center gap-2 shadow-lg">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Live</span>
                </div>
              )}

              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-black text-xl leading-tight group-hover:translate-x-1 transition-transform">{story.title}</p>
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full mt-4 flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-all duration-300">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Filter by Style</h3>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Quick navigation</p>
          </div>
          <button className="text-indigo-600 text-[11px] font-black uppercase tracking-widest hover:underline transition-all">See All Categories</button>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
          {categories.map((cat, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="p-6 bg-white border border-slate-100 rounded-[2rem] flex flex-col items-center gap-4 cursor-pointer hover:shadow-2xl hover:shadow-indigo-100 transition-all border-none shadow-sm"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest">{cat.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Aesthetic CTA Banner */}
      <div className="bg-slate-950 p-16 rounded-[4rem] text-white relative overflow-hidden shadow-3xl">
        <div className="absolute top-[-100%] right-[-20%] w-[80%] h-[200%] bg-indigo-600 rounded-full blur-[160px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-[-50%] left-[0%] w-[50%] h-[100%] bg-violet-600 rounded-full blur-[140px] opacity-10 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-ping" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Personal Stylist</span>
            </div>
            <h2 className="text-5xl font-black mb-6 tracking-tight leading-[1.1]">Curated for your <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">aesthetic.</span></h2>
            <p className="text-slate-400 font-medium text-lg lg:pr-20">We identified 4 pieces that perfectly align with your acquisition profile.</p>
          </div>
          <Link href="/products" className="py-6 px-12 bg-white text-slate-950 rounded-[1.5rem] font-black text-[13px] uppercase tracking-widest hover:bg-indigo-400 transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95 group">
            Start Exploring <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
