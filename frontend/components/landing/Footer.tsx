import { ShoppingBag, Globe, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020617] pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-8 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">MarketHub</span>
            </div>
            <p className="text-slate-500 leading-relaxed mb-8">
              Empowering the next generation of commerce through innovation and trust.
            </p>
            <div className="flex items-center gap-4">
              {[Globe, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-slate-500 hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Resources</h4>
            <ul className="flex flex-col gap-4 text-slate-500 text-sm font-medium">
              {['Home', 'Products', 'Categories', 'Showcase', 'Updates'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Support</h4>
            <ul className="flex flex-col gap-4 text-slate-500 text-sm font-medium">
              {['Documentation', 'API Status', 'Security', 'Privacy', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Contact</h4>
            <ul className="flex flex-col gap-6 text-slate-500 text-sm font-medium text-slate-400">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0" />
                <span>123 Digital District, Market City</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                <span>hello@markethub.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em]">
          <p>© {currentYear} MarketHub Ecosystem. Built for the bold.</p>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Architecture</a>
            <a href="#" className="hover:text-white transition-colors">System Agreements</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
