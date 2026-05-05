"use client";

import { motion } from 'framer-motion';

const categories = [
  { name: 'Tech & Gadgets', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop', count: '1.2k+' },
  { name: 'Modern Fashion', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop', count: '850+' },
  { name: 'Home Interior', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=600&auto=format&fit=crop', count: '2.4k+' },
  { name: 'Beauty & Care', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop', count: '400+' },
  { name: 'Outdoor Gear', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&auto=format&fit=crop', count: '600+' },
  { name: 'Art & Jewelry', image: 'https://images.unsplash.com/photo-1513519247341-33230a473138?q=80&w=600&auto=format&fit=crop', count: '300+' },
];

export default function Categories() {
  return (
    <section className="py-32 bg-slate-50/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-[0.3em] mb-6 inline-block"
            >
              Curation
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter">
              Shop by <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">Category.</span>
            </h2>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-white border border-slate-200 rounded-[1.5rem] font-black text-xs uppercase tracking-widest text-slate-900 hover:border-indigo-600 transition-all shadow-sm"
          >
            View All Series
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group relative aspect-[4/3] rounded-[3rem] overflow-hidden cursor-pointer shadow-2xl shadow-slate-200/50"
            >
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-75 group-hover:rotate-1"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-700" />
              
              {/* Floating Content */}
              <div className="absolute bottom-10 left-10 right-10">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">{cat.count} Artifacts</p>
                    <h3 className="text-3xl font-black text-white tracking-tighter">{cat.name}</h3>
                  </div>
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 scale-90 group-hover:scale-100">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
