import React from 'react';
import { ArrowRight, ShieldCheck, RefreshCw, Truck } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 my-6 shadow-xl">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2000&q=80"
          alt="Aura Studio Collection"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 py-16 sm:py-24 lg:py-28 flex flex-col items-start justify-center max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-amber-300 text-xs font-bold tracking-wider uppercase mb-5">
          <span>Autumn / Winter 2026 Collection</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
          Understated Luxury, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-indigo-200 italic font-normal">
            Bespoke Comfort.
          </span>
        </h1>

        <p className="text-slate-300 text-base sm:text-lg font-normal leading-relaxed mb-8 max-w-xl">
          Crafted from Grade-A organic materials and French Normandy linen. Experience seamless multi-dimension sizing, bespoke cuts, and timeless silhouettes.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={onExplore}
            className="px-7 py-3.5 rounded-full bg-white text-slate-950 hover:bg-amber-300 font-bold text-sm transition-all shadow-lg hover:shadow-xl cursor-pointer flex items-center gap-2 group"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={onExplore}
            className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-md transition-colors cursor-pointer"
          >
            Browse All Styles
          </button>
        </div>
      </div>

      {/* Value Proposition Strip */}
      <div className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10 py-4 px-6 text-xs text-slate-300">
        <div className="flex items-center justify-center gap-2.5 py-2">
          <Truck className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Complimentary Express Delivery &gt; ₹2,999</span>
        </div>
        <div className="flex items-center justify-center gap-2.5 py-2">
          <RefreshCw className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>30-Day Hassle-Free Returns &amp; Exchanges</span>
        </div>
        <div className="flex items-center justify-center gap-2.5 py-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>100% Certified Organic &amp; Sustainable</span>
        </div>
      </div>
    </section>
  );
};
