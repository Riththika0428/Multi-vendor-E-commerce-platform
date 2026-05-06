"use client";

import { useEffect, useState, use } from 'react';
import axios from 'axios';
import { 
  ArrowLeft, 
  Package, 
  MapPin, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  Truck,
  User,
  ShieldCheck,
  ChevronRight,
  TrendingDown
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

export default function SellerOrderDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchOrder = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/orders/${id}`, { withCredentials: true });
      setOrder(data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to retrieve entry');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const updateStatus = async (status: string) => {
    setUpdating(true);
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}/status`, { status }, { withCredentials: true });
      toast.success(`Lifecycle updated to: ${status}`);
      fetchOrder();
    } catch (error) {
       toast.error('Lifecycle transition failed');
    }
    setUpdating(false);
  };

  const statusSteps = ['pending', 'paid', 'confirmed', 'shipped', 'delivered'];

  if (loading) return <div className="p-20 text-center text-slate-300 font-black uppercase text-xs tracking-widest">Decoding Encrypted Entry...</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
           <Link href="/seller/orders" className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Return to Records
           </Link>
           <div className="flex items-center gap-4">
              <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Acquisition Detail</h1>
              <div className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                 {order.status}
              </div>
           </div>
           <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Reference: <span className="text-slate-900">{order._id.toUpperCase()}</span></p>
        </div>
      </div>

      {/* Status Wizard Card */}
      <section className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-2xl shadow-slate-200/20">
        <div className="flex items-center justify-between mb-12">
           <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-indigo-600" /> Lifecycle Matrix
           </h2>
           <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Est. Timestamp: {new Date(order.createdAt).toLocaleString()}</div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-8 relative">
           <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-50 -translate-y-1/2 hidden md:block" />
           {statusSteps.map((s, i) => {
              const currentIdx = statusSteps.indexOf(order.status);
              const isPast = i < currentIdx;
              const isCurrent = order.status === s;
              const isFuture = i > currentIdx;

              return (
                 <button 
                   key={s}
                   disabled={updating || isPast}
                   onClick={() => updateStatus(s)}
                   className={`relative z-10 flex flex-col items-center gap-4 group transition-all ${updating ? 'opacity-50' : 'opacity-100'}`}
                 >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-4 transition-all ${
                       isPast ? 'bg-emerald-500 border-emerald-100 text-white' : 
                       isCurrent ? 'bg-indigo-600 border-indigo-100 text-white shadow-xl shadow-indigo-100 scale-110' : 
                       'bg-white border-slate-50 text-slate-200 hover:border-indigo-600 hover:text-indigo-600'
                    }`}>
                       {isPast ? <CheckCircle2 className="w-6 h-6" /> : i + 1}
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isCurrent ? 'text-indigo-600' : 'text-slate-400'}`}>{s}</span>
                 </button>
              );
           })}
        </div>
      </section>

      <div className="grid lg:grid-cols-3 gap-12">
         {/* Items */}
         <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/20">
               <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                  <Package className="w-5 h-5 text-indigo-600" /> Acquisition Manifest
               </h2>
               <div className="space-y-8">
                  {order.orderItems.map((item: any, i: number) => (
                    <div key={i} className="flex flex-col md:flex-row md:items-center gap-8 group">
                       <div className="w-32 h-32 rounded-[2rem] overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0 relative">
                          <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute top-4 left-4 w-8 h-8 bg-white/90 backdrop-blur-md rounded-lg flex items-center justify-center text-[10px] font-black text-slate-900 shadow-sm border border-slate-100">
                             x{item.qty}
                          </div>
                       </div>
                       <div className="flex-1 space-y-2">
                          <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Verified Multi-vendor Artifact</p>
                          <h3 className="text-xl font-black text-slate-900 tracking-tight leading-none group-hover:text-indigo-600 transition-colors">{item.name}</h3>
                          <p className="text-xs font-medium text-slate-400 max-w-sm line-clamp-2 leading-relaxed">System-generated item trace from vendor vault. SKU-level verification complete.</p>
                       </div>
                       <div className="text-right">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Unit Value</p>
                          <p className="text-2xl font-black text-slate-900 tracking-tighter">${item.price.toLocaleString()}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </section>
         </div>

         {/* Customer & Billing Info */}
         <aside className="space-y-8">
            <section className="bg-slate-950 p-10 rounded-[3.5rem] text-white shadow-2xl space-y-10 relative overflow-hidden">
               <div className="absolute top-[-10%] right-[-10%] w-40 h-40 bg-indigo-600 rounded-full blur-[80px] opacity-30" />
               
               <div className="relative z-10 space-y-10">
                  <section>
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-3">
                       <User className="w-4 h-4" /> Acquisition Target
                    </h3>
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 shadow-sm mb-4">
                       <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-sm">
                          {order.user?.name?.charAt(0) || 'C'}
                       </div>
                       <div>
                          <p className="text-sm font-black text-white">{order.user?.name}</p>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest truncate max-w-[150px]">{order.user?.email}</p>
                       </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-3">
                       <MapPin className="w-4 h-4" /> Logistics Goal
                    </h3>
                    <p className="text-sm font-bold text-slate-200 leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/10">
                       {order.shippingAddress.address}<br />
                       {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
                       {order.shippingAddress.country}
                    </p>
                  </section>

                  <section>
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-3">
                       <CreditCard className="w-4 h-4" /> Commercial Point
                    </h3>
                    <div className="space-y-4">
                       <div className="flex justify-between items-center text-xs font-bold px-2">
                          <span className="text-slate-500">Gross Total</span>
                          <span className="text-slate-200">${order.totalPrice.toLocaleString()}</span>
                       </div>
                       <div className="flex justify-between items-center text-xs font-bold px-2">
                          <span className="text-slate-500">Logistics</span>
                          <span className="text-emerald-500 uppercase tracking-widest">Free Ops</span>
                       </div>
                       <div className="h-[1px] bg-white/10 w-full" />
                       <div className="flex justify-between items-end px-2 pt-2">
                          <span className="text-2xl font-black text-white tracking-tighter">${order.totalPrice.toLocaleString()}</span>
                          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Authenticated</span>
                       </div>
                    </div>
                  </section>
               </div>
            </section>

            <div className="p-8 bg-slate-50 rounded-[3rem] border border-slate-100 flex flex-col gap-4">
                <div className="flex items-center justify-between px-2">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Entry Lifecycle</span>
                   <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{order.isPaid ? 'Paid' : 'Awaiting Payment'}</span>
                </div>
                <div className="h-[1px] bg-slate-200" />
                <p className="text-[9px] font-bold text-slate-400 italic text-center px-4 leading-relaxed">Entry is locked under standard multi-vendor operational guidelines.</p>
            </div>
         </aside>
      </div>
    </div>
  );
}
