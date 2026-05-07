"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface DonutChartProps {
  data?: any[];
  title?: string;
}

const defaultData = [
  { name: 'Sent', value: 7000, color: '#0052FF' },
  { name: 'Opened', value: 2000, color: '#FB923C' },
  { name: 'Replied', value: 1000, color: '#A855F7' },
];

export default function DonutChart({ data = defaultData, title = "Distribution" }: DonutChartProps) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        <select className="bg-slate-50 border-none rounded-lg text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 outline-none cursor-pointer">
           <option>This Month</option>
           <option>Last Month</option>
        </select>
      </div>

      <div className="flex-1 min-h-[250px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Custom Legend at the right */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-4">
           {data.map((item, i) => (
             <div key={i} className="flex flex-col">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                   <span className="text-xs font-bold text-slate-900">{Math.round((item.value / data.reduce((a, b) => a + b.value, 0)) * 100)}% {item.name}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium ml-4">{item.value.toLocaleString()}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
