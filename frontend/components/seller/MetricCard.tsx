"use client";

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color: string;
}

export default function MetricCard({ title, value, icon: Icon, trend, color }: MetricCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/20 group relative overflow-hidden"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 ${color} opacity-5 rounded-bl-[5rem] transition-transform group-hover:scale-110`} />
      
      <div className="relative z-10">
        <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-8 shadow-lg shadow-indigo-100`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{title}</p>
          <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{value}</h3>
          
          {trend && (
            <div className="flex items-center gap-2 mt-4">
              <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">+{trend}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Growth</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
