"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface SalesChartProps {
  data: any[];
}

export default function SalesChart({ data }: SalesChartProps) {
  // Enhanced dummy data if provided data is single-valued
  const chartData = data.length > 0 ? data.map(item => ({
    ...item,
    income: item.sales || Math.floor(Math.random() * 5000) + 5000,
    expenses: (item.sales * 0.6) || Math.floor(Math.random() * 3000) + 2000,
  })) : [
    { name: 'Jan', income: 4000, expenses: 2400 },
    { name: 'Feb', income: 3000, expenses: 1398 },
    { name: 'Mar', income: 2000, expenses: 9800 },
    { name: 'Apr', income: 2780, expenses: 3908 },
    { name: 'May', income: 1890, expenses: 4800 },
    { name: 'Jun', income: 2390, expenses: 3800 },
    { name: 'Jul', income: 3490, expenses: 4300 },
  ];

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-full flex flex-col">
        <div className="flex justify-between items-center mb-10">
           <div>
              <h2 className="text-lg font-bold text-slate-900">Revenue Overview</h2>
              <p className="text-slate-400 font-medium text-xs mt-1">$18,00,000 All Time</p>
           </div>
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-[#0052FF]" />
                 <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Income</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-[#FB923C]" />
                 <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Expenses</span>
              </div>
              <select className="bg-slate-50 border-none rounded-lg text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 outline-none cursor-pointer ml-4">
                 <option>This Year</option>
                 <option>Last Year</option>
              </select>
           </div>
        </div>

        <div className="flex-1 min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0052FF" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#0052FF" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FB923C" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#FB923C" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 600, fill: '#94A3B8' }}
                dy={10}
              />
              <YAxis 
                 axisLine={false} 
                 tickLine={false} 
                 tick={{ fontSize: 10, fontWeight: 600, fill: '#94A3B8' }}
                 tickFormatter={(val) => `${val/1000}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '16px', 
                  border: 'none', 
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                  fontWeight: '600',
                  fontSize: '12px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="income" 
                stroke="#0052FF" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorIncome)" 
              />
              <Area 
                type="monotone" 
                dataKey="expenses" 
                stroke="#FB923C" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorExpenses)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
    </div>
  );
}
