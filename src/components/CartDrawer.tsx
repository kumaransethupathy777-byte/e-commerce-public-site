import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 2999;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 199;
  const discountAmount = Math.round(subtotal * (discountApplied / 100));
  const total = subtotal - discountAmount + shipping;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'OMNI20') {
      setDiscountApplied(20);
      setPromoError('');
    } else if (promoCode.trim().toUpperCase() === 'WELCOME10') {
      setDiscountApplied(10);
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code. Try OMNI20');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderSuccess(true);
      onClearCart();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-indigo-600" />
              <h2 className="font-serif font-bold text-lg text-slate-900">
                Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free shipping progress bar */}
          <div className="bg-slate-50 px-5 py-3 border-b border-slate-200/80">
            {subtotal >= freeShippingThreshold ? (
              <p className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                <span>🎉</span> You unlocked Free Worldwide Express Shipping!
              </p>
            ) : (
              <div className="space-y-1.5">
                <p className="text-xs text-slate-600">
                  Add <strong className="text-indigo-600 font-bold">₹{(freeShippingThreshold - subtotal).toLocaleString()}</strong> more for Free Shipping
                </p>
                <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {orderSuccess ? (
              <div className="py-12 text-center flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-2xl">
                  ✓
                </div>
                <h3 className="font-serif font-bold text-xl text-slate-900">
                  Order Placed Successfully!
                </h3>
                <p className="text-xs text-slate-500 max-w-xs">
                  A confirmation SMS &amp; WhatsApp message has been dispatched with tracking details.
                </p>
                <button
                  onClick={() => {
                    setOrderSuccess(false);
                    onClose();
                  }}
                  className="mt-4 px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold"
                >
                  Continue Shopping
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="py-16 text-center flex flex-col items-center justify-center gap-3 text-slate-400">
                <ShoppingBag className="w-12 h-12 stroke-[1.5]" />
                <p className="font-medium text-sm text-slate-600">Your bag is currently empty</p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2 rounded-full bg-slate-900 text-white text-xs font-bold"
                >
                  Browse Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-20 rounded-xl object-cover border border-slate-200 bg-white shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {item.color} · Size {item.size}
                    </p>
                    <p className="font-mono text-[10px] text-slate-400">{item.sku}</p>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-slate-300 rounded-lg bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-xs text-slate-600 hover:bg-slate-100 rounded-l"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-xs text-slate-600 hover:bg-slate-100 rounded-r"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-bold text-xs text-slate-900">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Order Summary */}
          {items.length > 0 && !orderSuccess && (
            <div className="p-5 border-t border-slate-200 bg-slate-50/70 space-y-4">
              {/* Promo Code Input */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Coupon (e.g. OMNI20)"
                    className="w-full h-9 pl-8 pr-3 rounded-xl bg-white border border-slate-300 text-xs uppercase font-semibold focus:outline-none focus:border-indigo-600"
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="px-3.5 h-9 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-indigo-600 transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {promoError && <p className="text-[11px] text-rose-600">{promoError}</p>}
              {discountApplied > 0 && (
                <p className="text-[11px] text-emerald-600 font-semibold">
                  ✓ {discountApplied}% coupon applied!
                </p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">₹{subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount ({discountApplied}%)</span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-slate-900">
                    {shipping === 0 ? <span className="text-emerald-600">FREE</span> : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span className="text-base text-indigo-600">₹{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-indigo-600 disabled:bg-slate-400 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isCheckingOut ? (
                  <span>Processing Order...</span>
                ) : (
                  <>
                    <span>Proceed to Secure Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>256-Bit Encrypted Secure Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
