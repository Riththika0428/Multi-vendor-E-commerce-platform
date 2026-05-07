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
  Globe,
  Camera,
  Mail,
  Info
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { motion, AnimatePresence } from 'framer-motion';
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
      toast.success('Store profile updated successfully');
      await checkAuth();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
    setLoading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-8 pb-20"
    >
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Store Profile</h1>
        <p className="text-sm font-medium text-slate-400">Customize your store's public appearance and contact details</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Branding Preview Section */}
        <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
           {/* Banner */}
           <div className="h-48 bg-slate-100 relative group overflow-hidden">
              <img 
                src={formData.banner || 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1200'} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt="Store Banner" 
              />
              <div className="absolute inset-x-8 bottom-4 flex justify-end">
                 <button type="button" className="inline-flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md text-white border border-white/20 rounded-xl font-bold text-xs hover:bg-black/60 transition-all">
                    <Camera className="w-3.5 h-3.5" /> Edit Banner
                 </button>
              </div>
           </div>
           
           {/* Logo and Name Area */}
           <div className="px-8 pb-8 pt-0 -mt-10 flex flex-col md:flex-row items-end gap-6 relative z-10">
              <div className="relative group">
                 <div className="w-32 h-32 rounded-3xl bg-white p-2 border-4 border-white shadow-lg overflow-hidden">
                    <img 
                      src={formData.logo || 'https://images.unsplash.com/photo-1599305090748-36656ca89d7d?q=80&w=200'} 
                      className="w-full h-full object-cover rounded-2xl" 
                      alt="Store Logo" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-3xl">
                       <button type="button" className="p-2 bg-white rounded-lg text-[#0052FF] transition-all hover:scale-110">
                          <Camera className="w-4 h-4" />
                       </button>
                    </div>
                 </div>
              </div>
              <div className="flex-1 pb-2">
                 <h2 className="text-2xl font-bold text-slate-900">{formData.storeName || 'My Super Store'}</h2>
                 <p className="text-sm font-medium text-[#0052FF] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> Verified Merchant
                 </p>
              </div>
           </div>
        </section>

        {/* Form Fields Section */}
        <div className="grid lg:grid-cols-2 gap-8">
            {/* General Info */}
            <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                <h3 className="text-md font-bold text-slate-900 flex items-center gap-2 mb-4">
                   <Info className="w-4 h-4 text-slate-400" /> General Information
                </h3>

                <div className="space-y-5">
                   <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 ml-1">Store Name</label>
                      <input 
                        type="text" 
                        value={formData.storeName}
                        onChange={(e) => setFormData({...formData, storeName: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-[#0052FF]/10 focus:border-[#0052FF] transition-all outline-none"
                        placeholder="Enter your store name"
                      />
                   </div>

                   <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 ml-1">Store Description</label>
                      <textarea 
                        rows={4}
                        value={formData.storeDescription}
                        onChange={(e) => setFormData({...formData, storeDescription: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-slate-600 focus:bg-white focus:ring-4 focus:ring-[#0052FF]/10 focus:border-[#0052FF] transition-all outline-none resize-none leading-relaxed"
                        placeholder="Describe your store and products..."
                      />
                   </div>
                </div>
            </section>

            {/* Contact & Assets */}
            <div className="space-y-8">
               <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                  <h3 className="text-md font-bold text-slate-900 flex items-center gap-2 mb-4">
                     <Mail className="w-4 h-4 text-slate-400" /> Contact Details
                  </h3>

                  <div className="space-y-5">
                     <div className="space-y-1.5 group">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 ml-1">Public Phone Number</label>
                        <div className="relative">
                           <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                           <input 
                             type="text" 
                             value={formData.phone}
                             onChange={(e) => setFormData({...formData, phone: e.target.value})}
                             className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:ring-4 focus:ring-[#0052FF]/10 focus:border-[#0052FF] outline-none transition-all"
                             placeholder="+1 (234) 567-890"
                           />
                        </div>
                     </div>

                     <div className="space-y-1.5 group">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 ml-1">Banner Image URL</label>
                        <div className="relative">
                           <Layout className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                           <input 
                             type="text" 
                             value={formData.banner}
                             onChange={(e) => setFormData({...formData, banner: e.target.value})}
                             className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:ring-4 focus:ring-[#0052FF]/10 focus:border-[#0052FF] outline-none transition-all"
                             placeholder="https://images.unsplash.com/..."
                           />
                        </div>
                     </div>

                     <div className="space-y-1.5 group">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 ml-1">Logo Image URL</label>
                        <div className="relative">
                           <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                           <input 
                             type="text" 
                             value={formData.logo}
                             onChange={(e) => setFormData({...formData, logo: e.target.value})}
                             className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:ring-4 focus:ring-[#0052FF]/10 focus:border-[#0052FF] outline-none transition-all"
                             placeholder="https://images.unsplash.com/..."
                           />
                        </div>
                     </div>
                  </div>
               </section>

               <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3">
                     <ShieldCheck className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                     <p className="text-[10px] font-medium text-emerald-700 leading-tight">Your data is secure and will only be shown on your public profile.</p>
                  </div>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="px-8 py-4 bg-[#0052FF] text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#0041CC] transition-all shadow-lg shadow-[#0052FF]/20 active:scale-[0.98] disabled:opacity-50 min-w-[180px]"
                  >
                     {loading ? (
                        <>
                           <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                           Saving...
                        </>
                     ) : (
                        <>
                           <Save className="w-4 h-4" /> Save Changes
                        </>
                     )}
                  </button>
               </div>
            </div>
        </div>
      </form>
    </motion.div>
  );
}
