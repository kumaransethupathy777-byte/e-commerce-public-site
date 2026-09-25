import React, { useState } from 'react';
import { Product } from '../types';
import { Star, Eye, ShoppingBag, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
}) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Find matching variant
  const currentVariant = product.variants.find(
    (v) => v.color === selectedColor && v.size === selectedSize
  ) || product.variants[0];

  const price = currentVariant ? currentVariant.price : product.basePrice;
  const originalPrice = currentVariant?.originalPrice || (product.discountPercentage ? Math.round(product.basePrice * (1 + product.discountPercentage / 100)) : undefined);
  const stock = currentVariant ? currentVariant.stock : 10;

  return (
    <div className="group relative bg-white rounded-3xl border border-slate-200/80 overflow-hidden hover:shadow-2xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between">
      {/* Top Image Container */}
      <div
        className="relative aspect-[4/5] bg-slate-100 overflow-hidden cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <img
          src={product.images[activeImageIndex] || product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Floating Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 z-10">
          {product.discountPercentage && (
            <span className="px-2.5 py-1 rounded-full bg-rose-600 text-white text-[10px] font-extrabold tracking-wider uppercase shadow-sm">
              {product.discountPercentage}% OFF
            </span>
          )}
          {product.isNewArrival && (
            <span className="px-2.5 py-1 rounded-full bg-slate-900 text-white text-[10px] font-bold tracking-wider uppercase shadow-sm">
              New
            </span>
          )}
        </div>

        {/* Quick View Button Hover Overlay */}
        <div className="absolute inset-x-4 bottom-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full py-3 rounded-2xl bg-white/95 hover:bg-white text-slate-900 text-xs font-bold shadow-lg backdrop-blur-md flex items-center justify-center gap-2 transition-all cursor-pointer border border-slate-200/60"
          >
            <Eye className="w-4 h-4 text-indigo-600" />
            <span>Quick View &amp; Sizing</span>
          </button>
        </div>
      </div>

      {/* Card Info & Selectors */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-[11px] uppercase tracking-wider text-indigo-600 font-sans">
              {product.category} · {product.subCategory}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-slate-900 font-bold">{product.rating}</span>
              <span className="text-slate-400 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-serif font-bold text-base sm:text-lg text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5 font-normal">
            {product.tagline}
          </p>
        </div>

        {/* Swatches & Variant Selectors */}
        <div className="space-y-3 pt-3 border-t border-slate-100">
          {/* Color Selector Row */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Color: <span className="text-slate-900 font-medium normal-case">{selectedColor}</span>
            </span>
            <div className="flex items-center gap-1.5">
              {product.colors.map((c, i) => (
                <button
                  key={c.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(c.name);
                    if (product.images[i]) setActiveImageIndex(i);
                  }}
                  className={`w-5 h-5 rounded-full border transition-all cursor-pointer relative flex items-center justify-center ${
                    selectedColor === c.name
                      ? 'ring-2 ring-indigo-600 ring-offset-1 scale-110 border-transparent shadow-xs'
                      : 'border-slate-300 hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                >
                  {selectedColor === c.name && (
                    <Check className={`w-2.5 h-2.5 ${c.hex === '#f8fafc' || c.hex === '#ffffff' ? 'text-slate-900' : 'text-white'}`} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Pills Row */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Size:
            </span>
            <div className="flex items-center gap-1">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSize(s);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                    selectedSize === s
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing & Add to Bag CTA */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-extrabold text-lg text-slate-900 font-sans">
                  ₹{price.toLocaleString()}
                </span>
                {originalPrice && originalPrice > price && (
                  <span className="text-xs text-slate-400 line-through">
                    ₹{originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-bold flex items-center gap-1 ${
                stock <= 0 ? 'text-rose-600' : stock < 5 ? 'text-amber-600' : 'text-emerald-600'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${stock <= 0 ? 'bg-rose-500' : stock < 5 ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                <span>{stock <= 0 ? 'Out of stock' : stock < 5 ? `Only ${stock} left` : 'In Stock'}</span>
              </span>
            </div>

            <button
              onClick={() => onAddToCart(product, selectedSize, selectedColor)}
              disabled={stock <= 0}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 disabled:bg-slate-200 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
