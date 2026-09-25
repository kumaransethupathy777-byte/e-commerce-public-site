export interface ProductVariant {
  id: string;
  sku: string;
  size: string;
  color: string;
  colorHex: string;
  price: number;
  originalPrice?: number;
  stock: number;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'Men' | 'Women' | 'Unisex' | 'Accessories' | 'Footwear';
  subCategory: string;
  tagline: string;
  description: string;
  features: string[];
  fabricCare: string[];
  basePrice: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  variants: ProductVariant[];
  isNewArrival?: boolean;
  isBestSeller?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  sku: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'agent';
  text: string;
  timestamp: string;
  suggestedProducts?: string[];
  isHumanHandoff?: boolean;
}
