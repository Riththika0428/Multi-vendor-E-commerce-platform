"use client";

import { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { User, Mail, Phone, MapPin, Lock, Save, Plus, Trash2, Shield, Settings, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function ProfilePage() {
  const { user, checkAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put('http://localhost:5000/api/auth/profile', formData, { withCredentials: true });
      toast.success('Profile updated successfully');
      await checkAuth();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
    setLoading(false);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return toast.error('Passwords do not match');
    }
    setLoading(true);
    try {
      await axios.put('http://localhost:5000/api/auth/password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }, { withCredentials: true });
      toast.success('Password updated successfully');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update password');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-12 h-[2px] bg-indigo-600 rounded-full" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">Account Core</span>
          </motion.div>
          <h1 className="text-6xl font-black text-slate-900 tracking-tight">Identity Settings</h1>
          <p className="text-slate-400 font-medium tracking-wide mt-2">Managing your presence in the elite marketplace.</p>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="px-6 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
              <Shield className="w-5 h-5 text-indigo-600" />
              <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Verified Account</span>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Personal Info */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/20"
        >
          <div className="flex items-center gap-4 mb-12">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div>
               <h2 className="text-2xl font-black text-slate-900 tracking-tight">Personal Details</h2>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Public & Private info</p>
            </div>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 ml-1">Full Identity Name</label>
              <div className="relative group">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 pl-14 text-sm font-black text-slate-900 focus:bg-white focus:border-indigo-100 focus:ring-0 transition-all outline-none"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 ml-1">Primary Email Portal</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input 
                  type="email" 
                  value={formData.email}
                  disabled
                  className="w-full bg-slate-50/50 border-2 border-transparent rounded-2xl p-5 pl-14 text-sm font-bold text-slate-400 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 ml-1">Communication Line</label>
              <div className="relative group">
                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <input 
                  type="text" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 pl-14 text-sm font-black text-slate-900 focus:bg-white focus:border-indigo-100 focus:ring-0 transition-all outline-none"
                  placeholder="+1 234 567 890"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-slate-950 text-white rounded-[1.5rem] p-6 font-black text-[13px] uppercase tracking-widest shadow-2xl shadow-indigo-100 hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 group"
            >
              <Save className="w-5 h-5 group-hover:scale-110 transition-transform" /> Sync Profile State
            </button>
          </form>
        </motion.section>

        {/* Security & Activity */}
        <div className="space-y-12">
          <motion.section 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/20"
          >
            <div className="flex items-center gap-4 mb-12">
              <div className="w-14 h-14 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                 <h2 className="text-2xl font-black text-slate-900 tracking-tight">Security Protocol</h2>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Encrypted Access</p>
              </div>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-6">
              <div className="space-y-2">
                <input 
                  type="password" 
                  placeholder="Current Password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                  className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 text-sm font-black text-slate-900 focus:bg-white focus:border-violet-100 focus:ring-0 transition-all outline-none shadow-inner"
                />
              </div>

              <div className="space-y-2">
                <input 
                  type="password" 
                  placeholder="New Security Key"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 text-sm font-black text-slate-900 focus:bg-white focus:border-violet-100 focus:ring-0 transition-all outline-none shadow-inner"
                />
              </div>

              <div className="space-y-2">
                <input 
                  type="password" 
                  placeholder="Confirm New Key"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                  className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 text-sm font-black text-slate-900 focus:bg-white focus:border-violet-100 focus:ring-0 transition-all outline-none shadow-inner"
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 text-white rounded-[1.5rem] p-6 font-black text-[13px] uppercase tracking-widest shadow-2xl hover:bg-violet-600 transition-all active:scale-95 disabled:opacity-50"
              >
                Update Access Key
              </button>
            </form>
          </motion.section>

          {/* Addresses Hub */}
          <section className="bg-slate-950 p-12 rounded-[3.5rem] text-white shadow-3xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-[120px] opacity-10 transition-opacity group-hover:opacity-20" />
             <div className="relative z-10">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 text-white flex items-center justify-center backdrop-blur-md">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                       <h2 className="text-2xl font-black tracking-tight">Hub Logistics</h2>
                       <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Saved Destinatons</p>
                    </div>
                  </div>
                  <button className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all shadow-xl active:scale-95 hover:rotate-90 duration-500">
                    <Plus className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  {user?.addresses && user.addresses.length > 0 ? (
                    user.addresses.map((addr: any, i: number) => (
                      <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-3xl flex justify-between items-center group/item hover:bg-white/10 transition-all border-none shadow-inner">
                        <div className="flex items-center gap-4">
                           <div className="w-2 h-2 bg-indigo-500 rounded-full group-hover/item:animate-ping" />
                           <div>
                             <p className="text-sm font-black tracking-wide">{addr.address}</p>
                             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{addr.city}, {addr.postalCode}</p>
                           </div>
                        </div>
                        <button className="w-10 h-10 bg-rose-500/10 text-rose-500 rounded-xl flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-all hover:bg-rose-500 hover:text-white">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="py-10 text-center border-2 border-dashed border-white/5 rounded-3xl">
                       <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">No Logistical Nodes Found</p>
                    </div>
                  )}
                </div>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
}
