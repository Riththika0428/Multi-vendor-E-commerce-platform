"use client";

import { motion } from 'framer-motion';

const categories = [
  { name: 'Tech & Gadgets', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop', count: '1.2k+ Products' },
  { name: 'Modern Fashion', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop', count: '850+ Products' },
  { name: 'Home Interior', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=600&auto=format&fit=crop', count: '2.4k+ Products' },
  { name: 'Beauty & Care', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop', count: '400+ Products' },
  { name: 'Outdoor Gear', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&auto=format&fit=crop', count: '600+ Products' },
  { name: 'Art & Decor', image: 'https://images.unsplash.com/photo-1513519247341-33230a473138?q=80&w=600&auto=format&fit=crop', count: '300+ Products' },
];

export default function Categories() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              Shop by <span className="text-indigo-600">Category</span>
            </h2>
            <p className="text-slate-500 text-lg">
              Explore our curated selection of premium products across various departments.
            </p>
          </div>
          <button className="px-8 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-900 hover:bg-slate-50 transition-colors shadow-sm">
            View All Categories
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative aspect-[3/2] rounded-[2rem] overflow-hidden cursor-pointer shadow-xl shadow-slate-200/50"
            >
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <p className="text-indigo-400 text-xs font-black uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{cat.count}</p>
                <h3 className="text-2xl font-bold text-white tracking-tight">{cat.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
