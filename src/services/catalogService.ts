import { Product, ProductVariant } from '../types';
import { SAMPLE_PRODUCTS } from '../data/products';

const API_BASE_URL =
  (import.meta as any).env?.VITE_API_BASE_URL ||
  (import.meta as any).env?.VITE_API_URL ||
  'https://enterprise-backend-9ifg.onrender.com';

export interface PublicCatalogResponse {
  success: boolean;
  data: {
    products: any[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface PublicCategoriesResponse {
  success: boolean;
  data: {
    categories: any[];
    total: number;
  };
}

// Fallback high-resolution imagery for dynamic categories/products
const FALLBACK_CATEGORY_IMAGES: Record<string, string[]> = {
  fashion: [
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=80',
  ],
  men: [
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1200&q=80',
  ],
  women: [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
  ],
  accessories: [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80',
  ],
  electronics: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1200&q=80',
  ],
  home: [
    'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
  ],
  default: [
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=80',
  ],
};

// Standard color names to hex codes mapping
const COLOR_HEX_MAP: Record<string, string> = {
  black: '#0f172a',
  onyx: '#0f172a',
  white: '#ffffff',
  'optic white': '#ffffff',
  red: '#dc2626',
  crimson: '#e11d48',
  blue: '#2563eb',
  navy: '#1e293b',
  'navy slate': '#1e293b',
  green: '#16a34a',
  emerald: '#059669',
  slate: '#64748b',
  grey: '#64748b',
  gray: '#64748b',
  taupe: '#78716c',
  beige: '#d6d3d1',
  sand: '#f5f5f4',
  olive: '#57534e',
  brown: '#78350f',
  yellow: '#ca8a04',
  purple: '#9333ea',
  pink: '#ec4899',
  orange: '#ea580c',
};

function resolveColorHex(colorName: string): string {
  const normalized = colorName.toLowerCase().trim();
  for (const [key, hex] of Object.entries(COLOR_HEX_MAP)) {
    if (normalized.includes(key)) return hex;
  }
  // Generate deterministic pastel/sleek color if not in map
  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    hash = normalized.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 45%, 40%)`;
}

function resolveValidImageUrl(rawUrl?: string, categoryName = 'default', index = 0): string {
  if (
    rawUrl &&
    typeof rawUrl === 'string' &&
    (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) &&
    !rawUrl.startsWith('blob:')
  ) {
    return rawUrl;
  }
  const cat = categoryName.toLowerCase().trim();
  const pool = FALLBACK_CATEGORY_IMAGES[cat] || FALLBACK_CATEGORY_IMAGES.default;
  return pool[index % pool.length];
}

export function mapBackendProductToFrontend(raw: any, index = 0): Product {
  const categoryName = raw.category || 'Fashion';
  const categoryFormatted = (categoryName.charAt(0).toUpperCase() + categoryName.slice(1)) as any;

  // Resolve gallery images
  const galleryImages: string[] = [];
  if (Array.isArray(raw.gallery) && raw.gallery.length > 0) {
    raw.gallery.forEach((g: any, gIdx: number) => {
      const src = typeof g === 'string' ? g : g.src;
      const valid = resolveValidImageUrl(src, categoryName, gIdx);
      if (valid && !galleryImages.includes(valid)) {
        galleryImages.push(valid);
      }
    });
  }

  // Cover image
  const coverImage = resolveValidImageUrl(raw.image, categoryName, index);
  if (!galleryImages.includes(coverImage)) {
    galleryImages.unshift(coverImage);
  }

  // Parse raw variants
  const rawVariants = Array.isArray(raw.variants) ? raw.variants : [];
  
  // Extract distinct colors and sizes
  const extractedColors: { name: string; hex: string }[] = [];
  const extractedSizes: string[] = [];
  const mappedVariants: ProductVariant[] = [];

  if (rawVariants.length > 0) {
    rawVariants.forEach((v: any, vIdx: number) => {
      const opt = String(v.option || 'Option').trim();
      const val = String(v.value || `Variant ${vIdx + 1}`).trim();
      const title = String(v.title || val).trim();

      // Check if variant contains size/color
      let colorName = 'Standard';
      let sizeName = 'Standard';

      const optLower = opt.toLowerCase();
      const titleLower = title.toLowerCase();

      if (optLower.includes('color') || optLower.includes('colour') || optLower.includes('finish') || optLower.includes('colorway')) {
        colorName = val;
      } else if (optLower.includes('size') || optLower.includes('tier') || optLower.includes('capacity') || optLower.includes('dimension')) {
        sizeName = val;
      }

      // If title has combinations like "Red · 2 inch" or "Black / L"
      if (title.includes('·') || title.includes('/') || title.includes('-')) {
        const parts = title.split(/[·\/\-]/).map((s) => s.trim());
        if (parts.length >= 2) {
          colorName = parts[0];
          sizeName = parts[1];
        }
      }

      const hex = resolveColorHex(colorName);
      if (!extractedColors.some((c) => c.name.toLowerCase() === colorName.toLowerCase())) {
        extractedColors.push({ name: colorName, hex });
      }
      if (!extractedSizes.includes(sizeName)) {
        extractedSizes.push(sizeName);
      }

      const variantPrice = Number(v.price) || Number(raw.price) || 999;
      const variantStock = typeof v.stock === 'number' ? v.stock : Number(String(v.stock || '10').replace(/[^0-9]/g, '')) || 10;

      mappedVariants.push({
        id: `var-${raw.id || raw.sku}-${vIdx}`,
        sku: v.sku || `${raw.sku || 'PROD'}-${vIdx + 1}`,
        size: sizeName,
        color: colorName,
        colorHex: hex,
        price: variantPrice,
        stock: variantStock,
        image: galleryImages[vIdx % galleryImages.length] || coverImage,
      });
    });
  }

  // If no colors or sizes found, provide sensible defaults
  if (extractedColors.length === 0) {
    extractedColors.push({ name: 'Standard Edition', hex: '#0f172a' });
    extractedColors.push({ name: 'Matte Slate', hex: '#64748b' });
  }

  if (extractedSizes.length === 0) {
    extractedSizes.push('S', 'M', 'L', 'XL');
  }

  // If mappedVariants is empty, create defaults from colors x sizes
  if (mappedVariants.length === 0) {
    extractedColors.forEach((clr, cIdx) => {
      extractedSizes.forEach((sz, sIdx) => {
        mappedVariants.push({
          id: `var-${raw.id || raw.sku}-${cIdx}-${sIdx}`,
          sku: `${raw.sku || 'PROD'}-${sz}-${clr.name.substring(0, 3).toUpperCase()}`,
          size: sz,
          color: clr.name,
          colorHex: clr.hex,
          price: Number(raw.price) || 1299,
          stock: Number(raw.stock) || 25,
          image: galleryImages[cIdx % galleryImages.length] || coverImage,
        });
      });
    });
  }

  const basePrice = Number(raw.price) || (mappedVariants[0]?.price ?? 1299);
  const totalStock = typeof raw.stock === 'number' ? raw.stock : Number(String(raw.stock || '20').replace(/[^0-9]/g, '')) || 20;

  return {
    id: raw.id || raw.sku || `prod-${index}`,
    name: raw.name || 'OmniFlow Product Offering',
    category: categoryFormatted,
    subCategory: raw.shortName || raw.category || 'Catalog Collection',
    tagline: raw.description ? raw.description.split('.')[0] : 'Engineered with premium sustainable materials',
    description: raw.description || 'Crafted with meticulous attention to detail, high grade raw materials, and enterprise quality standards.',
    features: [
      '100% Quality Guaranteed & Verified Specs',
      'Engineered for long-lasting durability & performance',
      'Includes complimentary enterprise warranty support',
      'Rapid express dispatch with tracking',
    ],
    fabricCare: [
      'Standard enterprise storage & handling conditions',
      'Keep away from direct excessive moisture & heat',
      'Follow product manual for installation & care',
    ],
    basePrice,
    discountPercentage: raw.discount ? parseInt(raw.discount) || undefined : undefined,
    rating: raw.rating || 4.9,
    reviewCount: raw.reviewCount || 24,
    images: galleryImages,
    sizes: extractedSizes,
    colors: extractedColors,
    variants: mappedVariants,
    isNewArrival: true,
    isBestSeller: totalStock > 50,
  };
}

export const catalogService = {
  /**
   * Fetch live public products from backend
   */
  async getPublicProducts(query: {
    search?: string;
    categoryId?: string;
    categoryIds?: string[];
    priceMin?: number;
    priceMax?: number;
    status?: string;
    sortBy?: string;
    sortOrder?: string;
    page?: number;
    limit?: number;
  } = {}): Promise<{ products: Product[]; total: number; isLiveBackend: boolean }> {
    try {
      const response = await fetch(`${API_BASE_URL}/public/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(query),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch public catalog`);
      }

      const json: PublicCatalogResponse = await response.json();
      if (json.success && json.data && Array.isArray(json.data.products) && json.data.products.length > 0) {
        const mapped = json.data.products.map((p, idx) => mapBackendProductToFrontend(p, idx));
        return {
          products: mapped,
          total: json.data.total,
          isLiveBackend: true,
        };
      }

      // If backend returned empty list, merge with sample products
      return {
        products: SAMPLE_PRODUCTS,
        total: SAMPLE_PRODUCTS.length,
        isLiveBackend: true,
      };
    } catch (error) {
      console.warn('Backend public products API unavailable, falling back to local catalog:', error);
      return {
        products: SAMPLE_PRODUCTS,
        total: SAMPLE_PRODUCTS.length,
        isLiveBackend: false,
      };
    }
  },

  /**
   * Fetch live categories
   */
  async getPublicCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/public/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ limit: 50 }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const json: PublicCategoriesResponse = await response.json();
      if (json.success && json.data && Array.isArray(json.data.categories) && json.data.categories.length > 0) {
        const catNames = json.data.categories.map((c) => c.name).filter(Boolean);
        return ['All', ...catNames];
      }
      return ['All', 'Men', 'Women', 'Unisex', 'Accessories', 'Fashion', 'Electronics', 'Home'];
    } catch {
      return ['All', 'Men', 'Women', 'Unisex', 'Accessories', 'Fashion', 'Electronics', 'Home'];
    }
  },
};
