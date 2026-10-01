import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { SAMPLE_PRODUCTS } from './data/products';
import { Product, CartItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { SlidersHorizontal, Sparkles, RefreshCw, Layers, CheckCircle2 } from 'lucide-react';
import { catalogService } from './services/catalogService';

export function App() {
  const [products, setProducts] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [categories, setCategories] = useState<string[]>(['All', 'Men', 'Women', 'Unisex', 'Accessories', 'Fashion', 'Electronics', 'Home']);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('All');
  const [selectedPriceSort, setSelectedPriceSort] = useState<'default' | 'low-to-high' | 'high-to-low'>('default');
  
  // Live Sync & API Loading state
  const [isLoading, setIsLoading] = useState(false);
  const [isLiveConnected, setIsLiveConnected] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Just now');
  const [newlyUploadedCount, setNewlyUploadedCount] = useState<number>(0);

  // Fetch live products from backend
  const loadLiveCatalog = useCallback(async (isSilent = false) => {
    if (!isSilent) setIsLoading(true);
    try {
      const [productRes, categoryList] = await Promise.all([
        catalogService.getPublicProducts({ limit: 50 }),
        catalogService.getPublicCategories(),
      ]);

      if (productRes.products && productRes.products.length > 0) {
        setProducts(productRes.products);
        setIsLiveConnected(productRes.isLiveBackend);
        setNewlyUploadedCount(productRes.total);
        setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      }

      if (categoryList && categoryList.length > 0) {
        setCategories(categoryList);
      }
    } catch (err) {
      console.warn('Could not load live catalog from backend:', err);
    } finally {
      if (!isSilent) setIsLoading(false);
    }
  }, []);

  // Initial load on mount
  useEffect(() => {
    loadLiveCatalog(false);

    // Auto-polling every 12 seconds so new products uploaded from Enterprise UI appear automatically
    const pollInterval = setInterval(() => {
      loadLiveCatalog(true);
    }, 12000);

    // Also reload when tab regains focus
    const handleFocus = () => loadLiveCatalog(true);
    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(pollInterval);
      window.removeEventListener('focus', handleFocus);
    };
  }, [loadLiveCatalog]);

  // Extract all available sizes dynamically across current products
  const availableSizes = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      p.sizes.forEach((s) => set.add(s));
    });
    const arr = Array.from(set);
    return ['All', ...arr.slice(0, 6)];
  }, [products]);

  // Filter & Search computation
  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategory !== 'All') {
      result = result.filter(
        (p) =>
          p.category?.toLowerCase() === selectedCategory.toLowerCase() ||
          p.subCategory?.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.subCategory.toLowerCase().includes(q) ||
          p.sizes.some((s) => s.toLowerCase().includes(q)) ||
          p.colors.some((c) => c.name.toLowerCase().includes(q)) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (selectedSizeFilter !== 'All') {
      result = result.filter((p) => p.sizes.includes(selectedSizeFilter));
    }

    if (selectedPriceSort === 'low-to-high') {
      result = [...result].sort((a, b) => a.basePrice - b.basePrice);
    } else if (selectedPriceSort === 'high-to-low') {
      result = [...result].sort((a, b) => b.basePrice - a.basePrice);
    }

    return result;
  }, [products, selectedCategory, searchQuery, selectedSizeFilter, selectedPriceSort]);

  // Cart operations
  const handleAddToCart = (product: Product, size: string, color: string, quantity = 1) => {
    const variant = product.variants.find((v) => v.color === color && v.size === size) || product.variants[0];
    const itemSku = variant ? variant.sku : `${product.id}-${size}-${color}`;
    const itemPrice = variant ? variant.price : product.basePrice;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.sku === itemSku);
      if (existing) {
        return prev.map((item) =>
          item.sku === itemSku ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}-${Math.random()}`,
          productId: product.id,
          name: product.name,
          image: product.images[0],
          size,
          color,
          price: itemPrice,
          quantity,
          sku: itemSku
        }
      ];
    });

    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf9] text-slate-900 selection:bg-indigo-600 selection:text-white">
      {/* Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categories={categories}
        isLiveSync={isLiveConnected}
      />

      {/* Live Sync Status Banner */}
      <div className="bg-slate-900 border-b border-slate-800 text-slate-300 px-4 sm:px-8 py-2 text-xs flex flex-wrap items-center justify-between gap-3 shadow-inner">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-white">Live Synchronized</span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-300">
            Enterprise Catalog ({products.length} live offerings from Admin UI)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] text-slate-400">Synced at {lastSyncTime}</span>
          <button
            onClick={() => loadLiveCatalog(false)}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold transition-all cursor-pointer border border-slate-700"
            title="Refresh to pull newest uploads from Enterprise Platform UI"
          >
            <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin text-indigo-400' : ''}`} />
            <span>{isLoading ? 'Syncing...' : 'Sync Catalog'}</span>
          </button>
        </div>
      </div>

      {/* Hero Showcase */}
      {selectedCategory === 'All' && !searchQuery && (
        <Hero
          onExplore={() => {
            const el = document.getElementById('collection-grid');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}

      {/* Main Content Area */}
      <main id="collection-grid" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Header & Filters bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-2">
              <span>{selectedCategory === 'All' ? 'Curated Collection' : `${selectedCategory} Collection`}</span>
              <span className="text-sm font-sans font-normal text-slate-400">
                ({filteredProducts.length} styles live)
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Live synchronized with OmniFlow / Perfox Enterprise Platform Catalog
            </p>
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Size filter */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs shadow-xs">
              <span className="text-slate-400 pl-2 pr-1 font-medium text-[11px]">Size / Option:</span>
              {availableSizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSizeFilter(sz)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    selectedSizeFilter === sz
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <select
              value={selectedPriceSort}
              onChange={(e) => setSelectedPriceSort(e.target.value as any)}
              className="h-9 px-3 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:border-indigo-600 shadow-xs cursor-pointer"
            >
              <option value="default">Featured Sort</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">No styles matched your criteria</h3>
            <p className="text-xs text-slate-500 max-w-sm">
              Try resetting your filter, search keywords, or selecting another category from the top bar.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setSelectedSizeFilter('All');
                setSelectedPriceSort('default');
              }}
              className="mt-2 px-5 py-2 rounded-full bg-slate-900 text-white text-xs font-bold cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-8">
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onQuickView={setSelectedProduct}
                onAddToCart={(p, sz, clr) => handleAddToCart(p, sz, clr, 1)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
