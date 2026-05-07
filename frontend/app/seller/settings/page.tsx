"use client";

import { useState } from 'react';
import { 
  Settings, 
  Bell, 
  Lock, 
  CreditCard, 
  Globe, 
  Shield, 
  Smartphone,
  ChevronRight,
  Database,
  Mail,
  Moon,
  Sun
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function SellerGeneralSettings() {
  const [activeTab, setActiveTab] = useState('account');

  const settingsItems = [
    { id: 'account', icon: User, label: 'Account Information', description: 'Personal details and credentials' },
    { id: 'notifications', icon: Bell, label: 'Notification Preferences', description: 'Manage alerts and emails' },
    { id: 'security', icon: Shield, label: 'Security & Access', description: 'Password and 2FA settings' },
    { id: 'billing', icon: CreditCard, label: 'Billing & Payouts', description: 'Payment methods and history' },
    { id: 'integrations', icon: Database, label: 'API & Integrations', description: 'Connect third-party services' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">General Settings</h1>
        <p className="text-sm font-medium text-slate-400">Manage your account preferences and platform configuration</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
         {/* Navigation */}
         <div className="lg:col-span-1 space-y-2">
            {settingsItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left ${activeTab === item.id ? 'bg-white shadow-sm border border-slate-100 ring-2 ring-[#0052FF]/5' : 'hover:bg-white/50 text-slate-500'}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeTab === item.id ? 'bg-[#0052FF] text-white shadow-lg shadow-[#0052FF]/20' : 'bg-slate-100 text-slate-400'}`}>
                   <item.icon className="w-5 h-5" />
                </div>
                <div>
                   <p className={`text-sm font-bold ${activeTab === item.id ? 'text-slate-900' : 'text-slate-600'}`}>{item.label}</p>
                   <p className="text-[10px] font-medium text-slate-400">{item.description}</p>
                </div>
              </button>
            ))}
         </div>

         {/* Settings Content Area */}
         <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8">
               <div className="flex items-center justify-between pb-6 border-b border-slate-50">
                  <h3 className="text-lg font-bold text-slate-900 capitalize">{activeTab} Settings</h3>
                  <button className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors">Reset Defaults</button>
               </div>

               {/* Simulated Account Settings Content */}
               <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                     <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Preferred Language</label>
                        <select className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-[#0052FF]/10 transition-all">
                           <option>English (United States)</option>
                           <option>French (France)</option>
                           <option>Spanish (Mexico)</option>
                        </select>
                     </div>
                     <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Timezone</label>
                        <select className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-[#0052FF]/10 transition-all">
                           <option>(GMT-05:00) Eastern Time</option>
                           <option>(GMT+00:00) UTC Time</option>
                           <option>(GMT+05:30) India Standard</option>
                        </select>
                     </div>
                  </div>

                  <div className="h-[1px] bg-slate-50" />

                  <div className="space-y-4">
                     <div className="flex items-center justify-between">
                        <div>
                           <p className="text-sm font-bold text-slate-900">Email Notifications</p>
                           <p className="text-xs text-slate-400">Receive weekly performance summaries</p>
                        </div>
                        <div className="w-12 h-6 bg-[#0052FF] rounded-full relative cursor-pointer shadow-inner">
                           <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all" />
                        </div>
                     </div>
                     <div className="flex items-center justify-between">
                        <div>
                           <p className="text-sm font-bold text-slate-900">Two-Factor Authentication</p>
                           <p className="text-xs text-slate-400">Enhance your account security</p>
                        </div>
                        <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer shadow-inner">
                           <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all" />
                        </div>
                     </div>
                  </div>

                  <div className="pt-8">
                     <button className="px-8 py-3 bg-[#0052FF] text-white rounded-xl text-sm font-bold hover:bg-[#0041CC] transition-all shadow-lg shadow-[#0052FF]/20">
                        Update Configuration
                     </button>
                  </div>
               </div>
            </div>

            {/* Support Card */}
            <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden group">
               <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-[#0052FF] rounded-full blur-[60px] opacity-20" />
               <div className="relative z-10 flex items-center justify-between">
                  <div>
                     <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                        <Smartphone className="w-5 h-5 text-[#0052FF]" /> Need Assistance?
                     </h3>
                     <p className="text-xs text-slate-400 max-w-xs">Our 24/7 technical support is here to help with your dashboard configuration.</p>
                  </div>
                  <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all backdrop-blur-md border border-white/5">Contact Support</button>
               </div>
            </div>
         </div>
      </div>
    </motion.div>
  );
}
