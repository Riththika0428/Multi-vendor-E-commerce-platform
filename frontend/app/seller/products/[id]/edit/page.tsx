"use client";

import { useEffect, useState, use } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Save, 
  Image as ImageIcon, 
  Plus, 
  Trash2,
  Box,
  CircleDollarSign,
  Layers,
  ChevronRight,
  Eye
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

export default function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    images: ['']
  });

  const categories = [
    'Tech & Gadgets', 'Modern Fashion', 'Home Interior', 
    'Beauty & Care', 'Outdoor Gear', 'Art & Jewelry'
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setFormData({
          name: data.name,
          description: data.description,
          price: data.price.toString(),
          stock: data.stock.toString(),
          category: data.category,
          images: data.images
        });
      } catch (error) {
        toast.error('Failed to load artifact details');
        router.push('/seller/products');
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id, router]);

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const removeImageField = (index: number) => {
    if (formData.images.length === 1) return;
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        images: formData.images.filter(img => img.trim() !== '')
      };

      await axios.put(`http://localhost:5000/api/products/${id}`, payload, { withCredentials: true });
      toast.success('Artifact successfully updated');
      router.push('/seller/products');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Update failed');
    }
    setSaving(false);
  };

  if (loading) return <div className="p-20 text-center text-slate-300 font-black uppercase text-xs tracking-widest">Opening Archive...</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
           <Link href="/seller/products" className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Return to Catalog
           </Link>
           <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Edit Artifact</h1>
        </div>
        <div className="flex items-center gap-4">
           <Link 
             href={`/products/${id}`} 
             target="_blank"
             className="px-8 py-4 bg-white border border-slate-100 rounded-2xl text-slate-400 flex items-center gap-3 font-black text-[10px] uppercase tracking-widest hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-md"
           >
              <Eye className="w-4 h-4" /> Live View
           </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
           <section className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-2xl shadow-slate-200/20 space-y-10">
              <div className="flex items-center gap-4 mb-2">
                 <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-100/50">
                    <Box className="w-6 h-6" />
                 </div>
                 <h2 className="text-2xl font-black text-slate-900">Modified Details</h2>
              </div>

              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Display Name</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full p-6 bg-slate-50 border-none rounded-[2rem] text-sm font-bold text-slate-900 focus:ring-4 focus:ring-indigo-50/50 focus:bg-white focus:border-indigo-600 transition-all outline-none"
                    />
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">The Narrative</label>
                    <textarea 
                      required 
                      rows={6}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full p-8 bg-slate-50 border-none rounded-[3rem] text-sm font-bold text-slate-900 focus:ring-4 focus:ring-indigo-50/50 focus:bg-white focus:border-indigo-600 transition-all outline-none resize-none"
                    />
                 </div>
              </div>
           </section>

           <section className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-2xl shadow-slate-200/20 space-y-10">
              <div className="flex items-center gap-4 mb-2">
                 <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center shadow-lg shadow-violet-100/50">
                    <ImageIcon className="w-6 h-6" />
                 </div>
                 <h2 className="text-2xl font-black text-slate-900">Visual Portfolio</h2>
              </div>

              <div className="space-y-6">
                 {formData.images.map((img, index) => (
                    <div key={index} className="flex gap-4">
                       <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                          {img && <img src={img} className="w-full h-full object-cover" alt="" />}
                       </div>
                       <input 
                         type="text" 
                         value={img}
                         onChange={(e) => handleImageChange(index, e.target.value)}
                         className="flex-1 p-5 bg-slate-50 border-none rounded-2xl text-xs font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-violet-50/50 transition-all outline-none"
                       />
                       <button 
                         type="button" 
                         onClick={() => removeImageField(index)}
                         className="w-14 h-14 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                       >
                          <Trash2 className="w-5 h-5" />
                       </button>
                    </div>
                 ))}
                 <button 
                   type="button" 
                   onClick={addImageField}
                   className="w-full py-5 border-2 border-dashed border-slate-100 rounded-[2rem] text-slate-400 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:border-violet-600 hover:text-violet-600 hover:bg-violet-50 transition-all"
                 >
                    <Plus className="w-5 h-5" /> Append Visual Slot
                 </button>
              </div>
           </section>
        </div>

        <div className="space-y-8">
           <section className="bg-slate-950 p-12 rounded-[4rem] text-white shadow-2xl space-y-10 relative overflow-hidden">
              <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-indigo-600 rounded-full blur-[80px] opacity-30" />
              <div className="relative z-10 space-y-10">
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <div className="flex items-center gap-2 mb-2">
                          <CircleDollarSign className="w-4 h-4 text-emerald-400" />
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Market Value ($)</label>
                       </div>
                       <input 
                         required 
                         type="number" 
                         value={formData.price}
                         onChange={(e) => setFormData({...formData, price: e.target.value})}
                         className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl text-xl font-black text-white focus:bg-white/10 outline-none transition-all"
                       />
                    </div>

                    <div className="space-y-2">
                       <div className="flex items-center gap-2 mb-2">
                          <Box className="w-4 h-4 text-indigo-400" />
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Inventory Units</label>
                       </div>
                       <input 
                         required 
                         type="number" 
                         value={formData.stock}
                         onChange={(e) => setFormData({...formData, stock: e.target.value})}
                         className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl text-xl font-black text-white focus:bg-white/10 outline-none transition-all"
                       />
                    </div>

                    <div className="space-y-2">
                       <div className="flex items-center gap-2 mb-2">
                          <Layers className="w-4 h-4 text-violet-400" />
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Classification</label>
                       </div>
                       <select 
                         value={formData.category}
                         onChange={(e) => setFormData({...formData, category: e.target.value})}
                         className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl text-sm font-black text-white focus:bg-white/10 outline-none transition-all appearance-none cursor-pointer"
                       >
                          {categories.map(cat => <option key={cat} value={cat} className="bg-slate-900">{cat}</option>)}
                       </select>
                    </div>
                 </div>

                 <button 
                   type="submit" 
                   disabled={saving}
                   className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-white hover:text-indigo-600 transition-all shadow-xl shadow-indigo-900/40 active:scale-[0.98] disabled:opacity-50"
                 >
                    <Save className="w-5 h-5" /> {saving ? 'Synthesizing...' : 'Update Archive'}
                 </button>
              </div>
           </section>

           <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 flex flex-col gap-6">
              <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-between">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Platform Fee</span>
                 <span className="text-xs font-black text-slate-900">10%</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-between">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Est. Earnings</span>
                 <span className="text-xs font-black text-emerald-600">${Number(formData.price || 0) * 0.9}</span>
              </div>
           </div>
        </div>
      </form>
    </div>
  );
}
