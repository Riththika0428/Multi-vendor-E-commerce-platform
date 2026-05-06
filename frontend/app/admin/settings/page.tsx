'use client';

import React, { useEffect, useState } from 'react';
import { useAdminStore } from '@/store/adminStore';
import { Settings, Save, Percent, Globe, Mail, ShieldCheck, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PlatformSettings() {
  const { settings, fetchSettings, updateSettings, loading } = useAdminStore();
  const [formData, setFormData] = useState({
    commissionPercentage: 10,
    platformName: '',
    contactEmail: ''
  });

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  useEffect(() => {
    if (settings) {
      setFormData({
        commissionPercentage: settings.commissionPercentage || 10,
        platformName: settings.platformName || '',
        contactEmail: settings.contactEmail || ''
      });
    }
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings(formData);
    toast.success('Configuration saved successfully');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'commissionPercentage' ? Number(value) : value
    }));
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="w-6 h-6 text-neutral-600" />
          Platform Configuration
        </h1>
        <p className="text-neutral-500 text-sm mt-1">Manage global settings for the entire marketplace</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
           <h3 className="font-bold flex items-center gap-2 text-blue-600">
              <ShieldCheck className="w-5 h-5" />
              General Rules
           </h3>
           <p className="text-xs text-neutral-500 mt-2">
              These settings affect all sellers and customers across the platform instantly.
           </p>
           <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/20 rounded-xl flex gap-3 text-orange-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-[11px] font-medium leading-relaxed">
                 Changing commission rates will only apply to orders placed AFTER the change is saved.
              </p>
           </div>
        </div>

        <form onSubmit={handleSubmit} className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6">
            
            {/* Commission Percentage */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Percent className="w-4 h-4 text-neutral-400" />
                Default Commission Percentage
              </label>
              <div className="relative">
                <input 
                  type="number" 
                  name="commissionPercentage"
                  value={formData.commissionPercentage}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  className="w-full bg-neutral-50 dark:bg-neutral-800 border-none rounded-xl py-3 pl-4 pr-12 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-neutral-400">%</span>
              </div>
              <p className="text-[10px] text-neutral-400">Standard cut taken from every vendor sale.</p>
            </div>

            {/* Platform Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Globe className="w-4 h-4 text-neutral-400" />
                Marketplace Display Name
              </label>
              <input 
                type="text" 
                name="platformName"
                value={formData.platformName}
                onChange={handleChange}
                placeholder="MetaStore, BuyHub, etc."
                className="w-full bg-neutral-50 dark:bg-neutral-800 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>

            {/* Contact Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Mail className="w-4 h-4 text-neutral-400" />
                Support Contact Email
              </label>
              <input 
                type="email" 
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="support@yourplatform.com"
                className="w-full bg-neutral-50 dark:bg-neutral-800 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>

            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-end">
              <button 
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {loading ? 'Saving...' : 'Save Configuration'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
