import React, { useState } from 'react';
import { Product } from '../types';
import { X, Star, Check, Sparkles, MessageCircle, Truck, RefreshCw, ShieldCheck } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
  onOpenSupportWithProduct: (productName: string, selectedVariantText: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenSupportWithProduct,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'features' | 'fabric' | 'shipping'>('features');

  // Match the active variant
  const currentVariant = product.variants.find(
    (v) => v.color === selectedColor && v.size === selectedSize
  ) || product.variants[0];

  const price = currentVariant ? currentVariant.price : product.basePrice;
  const originalPrice = currentVariant?.originalPrice || (product.discountPercentage ? Math.round(product.basePrice * (1 + product.discountPercentage / 100)) : undefined);
  const stock = currentVariant ? currentVariant.stock : 10;
  const currentSku = currentVariant ? currentVariant.sku : 'AUR-PROD-001';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto border border-slate-200 animate-in zoom-in-95 duration-200 flex flex-col md:flex-row overflow-hidden no-scrollbar">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-white/95 hover:bg-slate-100 text-slate-700 shadow-md flex items-center justify-center transition-all cursor-pointer border border-slate-200 hover:scale-105"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 bg-slate-50 flex flex-col justify-between gap-4 border-b md:border-b-0 md:border-r border-slate-200/80">
          <div>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm">
              <img
                src={product.images[activeImage] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-top"
              />
              {product.discountPercentage && (
                <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-black shadow-md">
                  {product.discountPercentage}% OFF
                </span>
              )}
            </div>

            {/* Thumbnails row */}
            <div className="flex items-center gap-2.5 mt-3.5 overflow-x-auto pb-1 no-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-18 h-22 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    activeImage === idx
                      ? 'border-indigo-600 ring-2 ring-indigo-500/20 scale-105 shadow-sm'
                      : 'border-slate-200 hover:border-slate-400 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-around text-xs text-slate-600 text-center">
            <div>
              <span className="font-bold text-slate-900 block">100% Organic</span>
              <span className="text-[10px] text-slate-400">GOTS Certified</span>
            </div>
            <div className="h-6 w-px bg-slate-200" />
            <div>
              <span className="font-bold text-slate-900 block">Pre-Shrunk</span>
              <span className="text-[10px] text-slate-400">Anti-Fade Dye</span>
            </div>
            <div className="h-6 w-px bg-slate-200" />
            <div>
              <span className="font-bold text-slate-900 block">Express Ship</span>
              <span className="text-[10px] text-slate-400">2-4 Business Days</span>
            </div>
          </div>
        </div>

        {/* Right Column: Details, Sizing & Actions */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-5">
            {/* Header info */}
            <div className="pr-12">
              <div className="flex items-center justify-between text-xs text-indigo-600 font-bold uppercase tracking-wider mb-1.5">
                <span>{product.category} · {product.subCategory}</span>
                <span className="text-slate-400 font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded-md">{currentSku}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                {product.name}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-slate-900">{product.rating}</span>
                </div>
                <span className="text-slate-400 text-xs">({product.reviewCount} customer reviews)</span>
                <span className="text-slate-300">|</span>
                <span className="text-emerald-600 text-xs font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Verified In Stock
                </span>
              </div>
            </div>

            {/* Price Banner */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2.5">
                  <span className="font-extrabold text-2xl sm:text-3xl text-slate-900 font-sans">
                    ₹{price.toLocaleString()}
                  </span>
                  {originalPrice && originalPrice > price && (
                    <span className="text-sm text-slate-400 line-through">
                      ₹{originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-500 font-medium">
                  Inclusive of all taxes &amp; duties
                </span>
              </div>

              <div className="text-right">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                  stock <= 0
                    ? 'bg-rose-100 text-rose-700'
                    : stock < 5
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {stock <= 0 ? 'Out of Stock' : stock < 5 ? `Only ${stock} left!` : 'In Stock · Ready to Dispatch'}
                </span>
              </div>
            </div>

            {/* Color Selector */}
            <div className="space-y-2">
              <span className="font-bold text-xs text-slate-700 block">
                Select Color: <span className="font-normal text-slate-900">{selectedColor}</span>
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {product.colors.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => {
                      setSelectedColor(c.name);
                      if (product.images[i]) setActiveImage(i);
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all cursor-pointer text-xs font-bold ${
                      selectedColor === c.name
                        ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/10"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">
                  Select Size: <span className="font-normal text-slate-900">{selectedSize}</span>
                </span>
                <span className="text-indigo-600 font-semibold cursor-pointer hover:underline">
                  Size Guide
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((s) => {
                  const varStock = product.variants.find(
                    (v) => v.color === selectedColor && v.size === s
                  )?.stock ?? 10;
                  const isAvailable = varStock > 0;

                  return (
                    <button
                      key={s}
                      disabled={!isAvailable}
                      onClick={() => setSelectedSize(s)}
                      className={`py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex flex-col items-center justify-center ${
                        selectedSize === s
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : isAvailable
                          ? 'bg-white text-slate-800 border-slate-200 hover:border-slate-400'
                          : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through'
                      }`}
                    >
                      <span>{s}</span>
                      <span className="text-[10px] font-normal opacity-70">
                        {isAvailable ? `${varStock} left` : 'Sold out'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector & Add to Bag */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-white hover:bg-slate-100 text-slate-800 font-bold flex items-center justify-center transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-sm text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                  className="w-8 h-8 rounded-lg bg-white hover:bg-slate-100 text-slate-800 font-bold flex items-center justify-center transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => {
                  onAddToCart(product, selectedSize, selectedColor, quantity);
                  onClose();
                }}
                disabled={stock <= 0}
                className="flex-1 py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-indigo-600 disabled:bg-slate-300 text-white font-bold text-sm transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Add to Bag</span>
                <span>·</span>
                <span>₹{(price * quantity).toLocaleString()}</span>
              </button>
            </div>

            {/* Omnichannel Assistance Trigger */}
            <div>
              <button
                onClick={() => {
                  onOpenSupportWithProduct(product.name, `${selectedColor}, Size ${selectedSize}`);
                  onClose();
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-indigo-600" />
                <span>Ask AI or Inquire on WhatsApp about this item</span>
              </button>
            </div>

            {/* Tabs for specs */}
            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-center gap-4 border-b border-slate-200 pb-2 text-xs font-bold">
                <button
                  onClick={() => setActiveTab('features')}
                  className={`pb-1 transition-colors cursor-pointer ${
                    activeTab === 'features' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Features
                </button>
                <button
                  onClick={() => setActiveTab('fabric')}
                  className={`pb-1 transition-colors cursor-pointer ${
                    activeTab === 'fabric' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Fabric &amp; Care
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-1 transition-colors cursor-pointer ${
                    activeTab === 'shipping' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Delivery &amp; Returns
                </button>
              </div>

              <div className="pt-3 text-xs text-slate-600 leading-relaxed min-h-[85px]">
                {activeTab === 'features' && (
                  <ul className="space-y-1.5 list-disc list-inside">
                    {product.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                )}
                {activeTab === 'fabric' && (
                  <ul className="space-y-1.5 list-disc list-inside">
                    {product.fabricCare.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                )}
                {activeTab === 'shipping' && (
                  <div className="space-y-1.5">
                    <p>• <strong>Free standard delivery:</strong> 2-4 business days on orders &gt; ₹2,999.</p>
                    <p>• <strong>30-Day Hassle-Free Returns:</strong> Instant pickup with reverse logistics.</p>
                    <p>• <strong>International Express:</strong> Tracked air courier across 50+ countries.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
