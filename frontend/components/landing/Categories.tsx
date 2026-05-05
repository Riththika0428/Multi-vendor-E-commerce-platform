"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';

const categories = [
  { name: 'Tech', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=400&h=400&auto=format&fit=crop' },
  { name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=400&h=400&auto=format&fit=crop' },
  { name: 'Home', image: 'https://images.unsplash.com/photo-1513519247341-33230a473138?q=80&w=400&h=400&auto=format&fit=crop' },
  { name: 'Beauty', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=400&h=400&auto=format&fit=crop' },
  { name: 'Sport', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&h=400&auto=format&fit=crop' },
  { name: 'Art', image: 'https://images.unsplash.com/photo-1580237072617-771c3ecc4a24?q=80&w=400&h=400&auto=format&fit=crop' },
];

export default function Categories() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="py-24 bg-transparent overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-20 tracking-tighter">
          Discover the <span className="text-indigo-600">Perfect Hub</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {categories.map((cat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="flex flex-col items-center gap-6"
            >
              <div 
                className={`relative w-40 h-40 rounded-full overflow-hidden transition-all duration-500 cursor-pointer p-1 ${
                  hovered === i ? 'scale-110 shadow-[0_0_50px_-10px_rgba(79,70,229,0.3)] ring-4 ring-indigo-600' : 
                  hovered !== null ? 'opacity-40 grayscale scale-95' : 'ring-4 ring-slate-50'
                }`}
              >
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className={`text-xl font-black transition-all duration-300 ${
                hovered === i ? 'text-indigo-600' : 'text-slate-900'
              }`}>
                {cat.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
