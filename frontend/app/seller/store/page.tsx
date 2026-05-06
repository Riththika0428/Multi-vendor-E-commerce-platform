"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Store, 
  Image as ImageIcon, 
  MapPin, 
  Phone, 
  User, 
  Save, 
  ShieldCheck,
  Layout,
  Globe
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

export default function StoreSettings() {
  const { user, checkAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    storeName: user?.storeName || '',
    storeDescription: user?.storeDescription || '',
    logo: user?.logo || '',
    banner: user?.banner || '',
    phone: user?.phone || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put('http://localhost:5000/api/auth/profile', formData, { withCredentials: true });
      toast.success('Marketplace identity updated');
      await checkAuth();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Identity verification failed');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      <div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-2">Identity Hub</h1>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Merchant profile and store branding</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Branding Section */}
        <section className="bg-white rounded-[4rem] border border-slate-100 shadow-2xl shadow-slate-200/20 overflow-hidden">
           <div className="h-64 bg-slate-100 relative group overflow-hidden">
              <img src={formData.banner || 'https://via.placeholder.com/1200x400?text=Store+Banner'} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Store Banner" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                 <button type="button" className="p-4 bg-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95">Replace Banner Area</button>
              </div>
           </div>
           
           <div className="p-12 pt-0 -mt-16 flex flex-col md:flex-row items-end gap-10">
              <div className="relative group">
                 <div className="w-44 h-44 rounded-[2.5rem] bg-white p-3 border-8 border-[#fafbfc] overflow-hidden shadow-2xl relative z-10">
                    <img src={formData.logo || 'https://via.placeholder.com/200?text=Logo'} className="w-full h-full object-cover rounded-3xl" alt="Store Logo" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                       <button type="button" className="w-full py-2 bg-white rounded-lg text-[8px] font-black uppercase tracking-widest active:scale-95">Update</button>
                    </div>
                 </div>
              </div>
              <div className="flex-1 pb-4">
                 <h2 className="text-3xl font-black text-slate-900 tracking-tight">{formData.storeName || 'Merchant Name'}</h2>
                 <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">Verified Professional Stream</p>
              </div>
              <div className="flex items-center gap-2 pb-4">
                 <div className="flex -space-x-4">
                    {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-100 shadow-sm" />)}
                 </div>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">1.2k Followers</span>
              </div>
           </div>
        </section>

        {/* Global Settings */}
        <div className="grid lg:grid-cols-2 gap-12">
            <section className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-2xl shadow-slate-200/20 space-y-10">
                <div className="flex items-center gap-4 mb-2">
                   <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-100/50">
                      <Store className="w-6 h-6" />
                   </div>
                   <h2 className="text-2xl font-black text-slate-900 tracking-tight">Public Presence</h2>
                </div>

                <div className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2 group-focus-within:text-indigo-600 transition-colors">Merchant Alias</label>
                      <input 
                        type="text" 
                        value={formData.storeName}
                        onChange={(e) => setFormData({...formData, storeName: e.target.value})}
                        className="w-full p-5 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-indigo-50/50 transition-all outline-none"
                      />
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2 group-focus-within:text-indigo-600 transition-colors">Merchant Bio</label>
                      <textarea 
                        rows={5}
                        value={formData.storeDescription}
                        onChange={(e) => setFormData({...formData, storeDescription: e.target.value})}
                        className="w-full p-6 bg-slate-50 border-none rounded-[2rem] text-sm font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-indigo-50/50 transition-all outline-none resize-none"
                        placeholder="Define your merchant philosophy..."
                      />
                   </div>
                </div>
            </section>

            <div className="space-y-12">
               <section className="bg-slate-950 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-indigo-600 rounded-full blur-[80px] opacity-30" />
                  <div className="relative z-10 space-y-10">
                    <div className="flex items-center justify-between">
                       <h2 className="text-2xl font-black tracking-tight flex items-center gap-4">
                          <Globe className="w-6 h-6 text-indigo-400" /> Infrastructure
                       </h2>
                    </div>

                    <div className="space-y-6">
                       <div className="space-y-2 group">
                          <div className="flex items-center gap-2 mb-2">
                             <Phone className="w-3.5 h-3.5 text-slate-500" />
                             <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Secure Line</label>
                          </div>
                          <input 
                            type="text" 
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl text-sm font-black text-white focus:bg-white/10 outline-none transition-all placeholder:text-white/20"
                            placeholder="+1 234 567 890"
                          />
                       </div>

                       <div className="space-y-2 group">
                          <div className="flex items-center gap-2 mb-2">
                             <Layout className="w-3.5 h-3.5 text-slate-500" />
                             <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Banner Asset URI</label>
                          </div>
                          <input 
                            type="text" 
                            value={formData.banner}
                            onChange={(e) => setFormData({...formData, banner: e.target.value})}
                            className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl text-sm font-black text-white focus:bg-white/10 outline-none transition-all"
                            placeholder="https://..."
                          />
                       </div>

                       <div className="space-y-2 group">
                          <div className="flex items-center gap-2 mb-2">
                             <ImageIcon className="w-3.5 h-3.5 text-slate-500" />
                             <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Logo Asset URI</label>
                          </div>
                          <input 
                            type="text" 
                            value={formData.logo}
                            onChange={(e) => setFormData({...formData, logo: e.target.value})}
                            className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl text-sm font-black text-white focus:bg-white/10 outline-none transition-all"
                            placeholder="https://..."
                          />
                       </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={loading}
                      className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-white hover:text-indigo-600 transition-all shadow-xl shadow-indigo-900/40 active:scale-[0.98] disabled:opacity-50"
                    >
                       <Save className="w-5 h-5" /> {loading ? 'Transmitting...' : 'Authorize Updates'}
                    </button>
                  </div>
               </section>

               <div className="p-10 bg-slate-50 border border-slate-100 rounded-[3rem] text-center">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mx-auto mb-6">
                     <ShieldCheck className="w-6 h-6 text-emerald-500" />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 leading-relaxed">Merchant Protection Active</p>
                  <p className="text-[9px] font-bold text-slate-400 italic px-4">All identity updates are logged and encrypted within our core distributed ledger.</p>
               </div>
            </div>
        </div>
      </form>
    </div>
  );
}
