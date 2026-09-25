import React from 'react';
import { Shield, Sparkles, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-serif font-bold text-lg">
                A
              </div>
              <span className="font-serif font-bold text-xl text-white tracking-tight">
                AURA ATELIER
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Pioneering slow fashion through multi-dimension tailored cuts, ethically sourced organic materials, and transparent omnichannel client engagement.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-emerald-400" /> GOTS Certified Organic</span>
              <span>·</span>
              <span>Zero Synthetic Microfibers</span>
            </div>
          </div>

          {/* Col 1 */}
          <div>
            <h4 className="font-bold text-xs text-white uppercase tracking-wider mb-4">
              Catalogue
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Men's Apparel</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Women's Collection</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Unisex Technical Outerwear</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Organic Heavyweight Tees</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Normandy Linen Series</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-bold text-xs text-white uppercase tracking-wider mb-4">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Omnichannel Inquiries</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Size Guide &amp; Fit Assistant</a></li>
              <li><a href="#" className="hover:text-white transition-colors">30-Day Hassle-Free Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Worldwide Express Shipping</a></li>
              <li><a href="#" className="hover:text-white transition-colors">WhatsApp Order Support</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-xs text-white uppercase tracking-wider mb-4">
              The Aura Journal
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Receive private drop alerts, archival previews, and fabric insights.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full h-9 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button className="px-3.5 h-9 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors cursor-pointer shrink-0">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 AURA Apparel Ltd. Powered by OmniFlow Multi-Tenant Commerce Architecture.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
            <a href="#" className="hover:text-slate-400">Ethical Sourcing</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
