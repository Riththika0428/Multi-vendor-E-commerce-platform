"use client";

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendType?: 'up' | 'down';
  color: string; // This will now control the icon and shadow color
}

export default function MetricCard({ title, value, icon: Icon, trend, trendType = 'up', color }: MetricCardProps) {
  // Extract background color for icon container from the tailwind class
  const iconBgColor = color.replace('bg-', 'bg-').replace('-600', '-50');
  const iconTextColor = color.replace('bg-', 'text-');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm group transition-all"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-slate-400 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
        </div>
        <div className={`w-12 h-12 rounded-2xl ${iconBgColor} flex items-center justify-center transition-transform group-hover:scale-110`}>
          <Icon className={`w-6 h-6 ${iconTextColor}`} />
        </div>
      </div>
      
      {trend && (
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-bold ${trendType === 'up' ? 'text-emerald-500' : 'text-rose-500'} flex items-center gap-1`}>
            {trendType === 'up' ? '↑' : '↓'} {trend}
          </span>
          <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">vs last week</span>
        </div>
      )}
    </motion.div>
  );
}
