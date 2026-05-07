"use client";

import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  sales: number;
  image: string;
  percentage: number;
}

const defaultProducts: Product[] = [
  { id: '1', name: 'MacBook Pro 15"', sales: 120, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop', percentage: 65 },
  { id: '2', name: 'iMac Pro 2019', sales: 95, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=100&h=100&fit=crop', percentage: 45 },
  { id: '3', name: 'iPad Pro 11"', sales: 82, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&h=100&fit=crop', percentage: 35 },
  { id: '4', name: 'AirPods Pro', sales: 65, image: 'https://images.unsplash.com/photo-1588423770d14-830b838912e3?w=100&h=100&fit=crop', percentage: 25 },
  { id: '5', name: 'Apple Watch Series 5', sales: 50, image: 'https://images.unsplash.com/photo-1546868871-70ca2074a2f9?w=100&h=100&fit=crop', percentage: 20 },
];

export default function TopProducts({ products = defaultProducts }: { products?: Product[] }) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-bold text-slate-900">Top Selling Products</h3>
        <select className="bg-slate-50 border-none rounded-lg text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 outline-none cursor-pointer">
           <option>This Month</option>
           <option>Last Month</option>
        </select>
      </div>

      <div className="space-y-6 flex-1 overflow-y-auto custom-scrollbar pr-2">
        {products.map((product, i) => (
          <div key={product.id} className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden flex-shrink-0">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
             </div>
             <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-2">
                   <p className="text-xs font-bold text-slate-900 truncate">{product.name}</p>
                   <span className="text-[10px] font-bold text-slate-400">{product.percentage}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${product.percentage}%` }}
                     transition={{ duration: 1, delay: i * 0.1 }}
                     className="h-full bg-[#0052FF]"
                   />
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
