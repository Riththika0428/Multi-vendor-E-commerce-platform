import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isUp: boolean;
  };
  color: 'blue' | 'green' | 'orange' | 'purple' | 'red';
}

const colorMap = {
  blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/10 dark:text-blue-400',
  green: 'bg-green-50 text-green-600 dark:bg-green-900/10 dark:text-green-400',
  orange: 'bg-orange-50 text-orange-600 dark:bg-orange-900/10 dark:text-orange-400',
  purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/10 dark:text-purple-400',
  red: 'bg-red-50 text-red-600 dark:bg-red-900/10 dark:text-red-400',
};

const iconBgMap = {
  blue: 'bg-blue-100 dark:bg-blue-900/20',
  green: 'bg-green-100 dark:bg-green-900/20',
  orange: 'bg-orange-100 dark:bg-orange-900/20',
  purple: 'bg-purple-100 dark:bg-purple-900/20',
  red: 'bg-red-100 dark:bg-red-900/20',
};

export default function StatCard({ title, value, icon: Icon, trend, color }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-xl ${iconBgMap[color]} ${colorMap[color].split(' ')[1]}`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <div className={`flex items-center text-xs font-medium ${trend.isUp ? 'text-green-600' : 'text-red-600'}`}>
            <span>{trend.isUp ? '+' : '-'}{trend.value}%</span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-neutral-500 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold mt-1 text-neutral-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}
