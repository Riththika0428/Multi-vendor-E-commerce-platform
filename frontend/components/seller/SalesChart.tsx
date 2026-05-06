"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface SalesChartProps {
  data: any[];
}

export default function SalesChart({ data }: SalesChartProps) {
  return (
    <div className="h-[450px] w-full bg-white p-10 rounded-[4rem] border border-slate-100 shadow-2xl shadow-slate-200/20 relative overflow-hidden">
        <div className="flex justify-between items-end mb-12">
           <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Sales Performance</h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">Acquisition trends per day</p>
           </div>
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-indigo-600" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Revenue</span>
              </div>
           </div>
        </div>

        <ResponsiveContainer width="100%" height="80%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }}
              dy={10}
              tickFormatter={(str) => {
                 const date = new Date(str);
                 return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              }}
            />
            <YAxis 
               axisLine={false} 
               tickLine={false} 
               tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }}
               tickFormatter={(val) => `$${val}`}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '24px', 
                border: 'none', 
                boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
                fontWeight: '900',
                fontSize: '12px'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="sales" 
              stroke="#4f46e5" 
              strokeWidth={4}
              fillOpacity={1} 
              fill="url(#colorSales)" 
            />
          </AreaChart>
        </ResponsiveContainer>
    </div>
  );
}
