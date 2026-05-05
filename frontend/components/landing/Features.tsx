"use client";

import { motion } from 'framer-motion';
import { Truck, ShieldCheck, ShoppingBag, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: "Eco Fast Delivery",
    desc: "100% carbon neutral shipping that arrives faster than your expectations.",
    gradient: "from-blue-500/10 to-indigo-500/5",
    iconColor: "text-blue-600"
  },
  {
    icon: ShieldCheck,
    title: "Buyer Promise",
    desc: "Not happy with your product? Get a full refund in 24 hours. No questions.",
    gradient: "from-emerald-500/10 to-teal-500/5",
    iconColor: "text-emerald-600"
  },
  {
    icon: ShoppingBag,
    title: "Artisan Hubs",
    desc: "Connect directly with creators for custom, one-of-a-kind masterpieces.",
    gradient: "from-indigo-500/10 to-violet-500/5",
    iconColor: "text-indigo-600"
  },
  {
    icon: TrendingUp,
    title: "Seller Tools Pro",
    desc: "Analytics, marketing, and logistics built-in. Scale without the headache.",
    gradient: "from-violet-500/10 to-fuchsia-500/5",
    iconColor: "text-violet-600"
  }
];

export default function Features() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-1/2 left-0 w-full h-[500px] bg-slate-50/50 -skew-y-3 -z-10" />

      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6"
          >
            Core Principles
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter"
          >
            Built for the <span className="text-indigo-600">Modern</span> Human.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              whileHover={{ y: -12 }}
              className="relative p-10 rounded-[3rem] bg-white border border-slate-100 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(79,70,229,0.1)] transition-all duration-500 group overflow-hidden"
            >
              {/* Subtle Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-white group-hover:shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <feature.icon className={`w-10 h-10 ${feature.iconColor}`} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium transition-colors group-hover:text-slate-600">
                  {feature.desc}
                </p>
              </div>

              {/* Decorative Corner Element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-slate-50 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700 -z-0" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
