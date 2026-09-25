import { Product } from '../types';

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Aura Premium Heavyweight Organic Tee',
    category: 'Men',
    subCategory: 'T-Shirts',
    tagline: '280 GSM pure combed organic cotton with relaxed drop-shoulder silhouette.',
    description: 'Engineered for exceptional drape and everyday durability. Crafted from 100% sustainable Aegean organic cotton, pre-shrunk to retain structural elegance wash after wash.',
    features: [
      '280 GSM Heavyweight French Terry cotton',
      'Reinforced double-needle collar stitch',
      'Pre-shrunk anti-fade pigment dye',
      'Breathable all-weather thermo-regulation'
    ],
    fabricCare: [
      '100% GOTS Certified Organic Cotton',
      'Machine wash cold (30°C) with like colors',
      'Do not bleach or tumble dry',
      'Iron inside-out on medium heat'
    ],
    basePrice: 1499,
    discountPercentage: 15,
    rating: 4.9,
    reviewCount: 142,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Obsidian Black', hex: '#18181b' },
      { name: 'Optic White', hex: '#f8fafc' },
      { name: 'Sage Olive', hex: '#4d5b4a' },
      { name: 'Terracotta', hex: '#a8533b' }
    ],
    isBestSeller: true,
    isNewArrival: true,
    variants: [
      { id: 'v-1', sku: 'AUR-TEE-BLK-S', size: 'S', color: 'Obsidian Black', colorHex: '#18181b', price: 1274, originalPrice: 1499, stock: 18 },
      { id: 'v-2', sku: 'AUR-TEE-BLK-M', size: 'M', color: 'Obsidian Black', colorHex: '#18181b', price: 1274, originalPrice: 1499, stock: 24 },
      { id: 'v-3', sku: 'AUR-TEE-BLK-L', size: 'L', color: 'Obsidian Black', colorHex: '#18181b', price: 1274, originalPrice: 1499, stock: 12 },
      { id: 'v-4', sku: 'AUR-TEE-BLK-XL', size: 'XL', color: 'Obsidian Black', colorHex: '#18181b', price: 1274, originalPrice: 1499, stock: 6 },
      { id: 'v-5', sku: 'AUR-TEE-WHT-S', size: 'S', color: 'Optic White', colorHex: '#f8fafc', price: 1274, originalPrice: 1499, stock: 15 },
      { id: 'v-6', sku: 'AUR-TEE-WHT-M', size: 'M', color: 'Optic White', colorHex: '#f8fafc', price: 1274, originalPrice: 1499, stock: 30 },
      { id: 'v-7', sku: 'AUR-TEE-WHT-L', size: 'L', color: 'Optic White', colorHex: '#f8fafc', price: 1274, originalPrice: 1499, stock: 8 },
      { id: 'v-8', sku: 'AUR-TEE-WHT-XL', size: 'XL', color: 'Optic White', colorHex: '#f8fafc', price: 1274, originalPrice: 1499, stock: 4 },
      { id: 'v-9', sku: 'AUR-TEE-OLV-S', size: 'S', color: 'Sage Olive', colorHex: '#4d5b4a', price: 1274, originalPrice: 1499, stock: 9 },
      { id: 'v-10', sku: 'AUR-TEE-OLV-M', size: 'M', color: 'Sage Olive', colorHex: '#4d5b4a', price: 1274, originalPrice: 1499, stock: 16 },
      { id: 'v-11', sku: 'AUR-TEE-OLV-L', size: 'L', color: 'Sage Olive', colorHex: '#4d5b4a', price: 1274, originalPrice: 1499, stock: 7 },
      { id: 'v-12', sku: 'AUR-TEE-OLV-XL', size: 'XL', color: 'Sage Olive', colorHex: '#4d5b4a', price: 1274, originalPrice: 1499, stock: 2 }
    ]
  },
  {
    id: 'prod-2',
    name: 'Minimalist Relaxed Linen Overshirt',
    category: 'Men',
    subCategory: 'Shirts',
    tagline: '100% French Normandy Flax Linen with mother-of-pearl hardware.',
    description: 'A contemporary tailored overshirt woven from breathable Normandy linen. Features a refined camp collar, patch chest pocket, and relaxed drape suited for warm coastal climates and urban layering.',
    features: [
      '100% Normandy Flax Linen (180 GSM)',
      'Natural genuine mother-of-pearl buttons',
      'Dual chest pockets with hidden pen slot',
      'Garment washed for ultra-soft hand feel'
    ],
    fabricCare: [
      'Pure French Linen',
      'Hand wash or gentle cold cycle',
      'Hang dry in shade to preserve texture'
    ],
    basePrice: 2899,
    discountPercentage: 10,
    rating: 4.8,
    reviewCount: 88,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Oatmeal Natural', hex: '#d7cec7' },
      { name: 'Navy Slate', hex: '#1e293b' },
      { name: 'Olive Green', hex: '#3f4f3f' }
    ],
    isBestSeller: true,
    variants: [
      { id: 'v-13', sku: 'AUR-LIN-OAT-S', size: 'S', color: 'Oatmeal Natural', colorHex: '#d7cec7', price: 2609, originalPrice: 2899, stock: 10 },
      { id: 'v-14', sku: 'AUR-LIN-OAT-M', size: 'M', color: 'Oatmeal Natural', colorHex: '#d7cec7', price: 2609, originalPrice: 2899, stock: 15 },
      { id: 'v-15', sku: 'AUR-LIN-OAT-L', size: 'L', color: 'Oatmeal Natural', colorHex: '#d7cec7', price: 2609, originalPrice: 2899, stock: 8 },
      { id: 'v-16', sku: 'AUR-LIN-NAV-M', size: 'M', color: 'Navy Slate', colorHex: '#1e293b', price: 2609, originalPrice: 2899, stock: 12 },
      { id: 'v-17', sku: 'AUR-LIN-NAV-L', size: 'L', color: 'Navy Slate', colorHex: '#1e293b', price: 2609, originalPrice: 2899, stock: 6 }
    ]
  },
  {
    id: 'prod-3',
    name: 'Sculpted Luxe Cashmere Knit Sweater',
    category: 'Women',
    subCategory: 'Knitwear',
    tagline: 'Grade-A Mongolian Cashmere in timeless crewneck silhouette.',
    description: 'Sumptuously soft Grade-A cashmere spun with micro-gauge precision. Designed with ribbed cuffs, dropped shoulders, and a flattering relaxed profile.',
    features: [
      '100% Grade-A Mongolian Cashmere',
      'Ultra-fine 12-gauge 2-ply yarn',
      'Thermal insulation with featherweight feel',
      'Anti-pilling treatment'
    ],
    fabricCare: [
      'Dry clean recommended or gentle hand wash in wool shampoo',
      'Dry flat on towel away from direct heat'
    ],
    basePrice: 4999,
    discountPercentage: 20,
    rating: 5.0,
    reviewCount: 64,
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Camel Tan', hex: '#c19a6b' },
      { name: 'Ivory Cream', hex: '#fdfbf7' },
      { name: 'Charcoal Mist', hex: '#334155' }
    ],
    isNewArrival: true,
    variants: [
      { id: 'v-18', sku: 'AUR-KNT-CAM-S', size: 'S', color: 'Camel Tan', colorHex: '#c19a6b', price: 3999, originalPrice: 4999, stock: 7 },
      { id: 'v-19', sku: 'AUR-KNT-CAM-M', size: 'M', color: 'Camel Tan', colorHex: '#c19a6b', price: 3999, originalPrice: 4999, stock: 11 },
      { id: 'v-20', sku: 'AUR-KNT-IVO-S', size: 'S', color: 'Ivory Cream', colorHex: '#fdfbf7', price: 3999, originalPrice: 4999, stock: 9 },
      { id: 'v-21', sku: 'AUR-KNT-IVO-M', size: 'M', color: 'Ivory Cream', colorHex: '#fdfbf7', price: 3999, originalPrice: 4999, stock: 14 }
    ]
  },
  {
    id: 'prod-4',
    name: 'Pleated High-Waisted Tailored Trousers',
    category: 'Women',
    subCategory: 'Trousers',
    tagline: 'Structured Italian wool-blend trousers with front deep knife pleats.',
    description: 'Architectural tailoring meets effortless poise. Cut with a high-rise waist and generous wide-leg taper, equipped with slanted hip pockets and interior waist curtaining.',
    features: [
      'Italian Wool & Viscose stretch blend',
      'Deep front double knife pleats',
      'Clean blind-hem finish',
      'Internal bespoke waistband construction'
    ],
    fabricCare: [
      '60% Wool, 38% Viscose, 2% Elastane',
      'Specialist dry clean only'
    ],
    basePrice: 3499,
    rating: 4.7,
    reviewCount: 52,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Charcoal Slate', hex: '#1e293b' },
      { name: 'Espresso Brown', hex: '#451a03' },
      { name: 'Alabaster White', hex: '#f1f5f9' }
    ],
    variants: [
      { id: 'v-22', sku: 'AUR-TRS-CHR-S', size: 'S', color: 'Charcoal Slate', colorHex: '#1e293b', price: 3499, stock: 14 },
      { id: 'v-23', sku: 'AUR-TRS-CHR-M', size: 'M', color: 'Charcoal Slate', colorHex: '#1e293b', price: 3499, stock: 20 },
      { id: 'v-24', sku: 'AUR-TRS-ESP-M', size: 'M', color: 'Espresso Brown', colorHex: '#451a03', price: 3499, stock: 8 }
    ]
  },
  {
    id: 'prod-5',
    name: 'Heritage Full-Grain Leather Commuter Tote',
    category: 'Accessories',
    subCategory: 'Bags',
    tagline: 'Hand-burnished Italian vegetable-tanned leather with 16" laptop chamber.',
    description: 'A timeless heirloom everyday carry. Built to age gracefully with a rich natural patina, reinforced solid brass rivets, and dedicated padded tech compartment.',
    features: [
      'Top-grain Tuscan vegetable-tanned leather',
      'Padded shock-absorbent sleeve fits up to 16" MacBook Pro',
      'YKK Excella polished metal zippers',
      'Water-repellent Japanese canvas lining'
    ],
    fabricCare: [
      'Genuine Vegetable-Tanned Leather',
      'Treat periodically with organic beeswax conditioner',
      'Keep away from prolonged water saturation'
    ],
    basePrice: 5999,
    discountPercentage: 10,
    rating: 4.9,
    reviewCount: 96,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['One Size (22L)'],
    colors: [
      { name: 'Cognac Amber', hex: '#9a3412' },
      { name: 'Noir Black', hex: '#09090b' },
      { name: 'Saddle Tan', hex: '#78350f' }
    ],
    isBestSeller: true,
    variants: [
      { id: 'v-25', sku: 'AUR-BAG-COG-OS', size: 'One Size (22L)', color: 'Cognac Amber', colorHex: '#9a3412', price: 5399, originalPrice: 5999, stock: 12 },
      { id: 'v-26', sku: 'AUR-BAG-NOI-OS', size: 'One Size (22L)', color: 'Noir Black', colorHex: '#09090b', price: 5399, originalPrice: 5999, stock: 18 }
    ]
  },
  {
    id: 'prod-6',
    name: 'All-Weather Waterproof Technical Trench',
    category: 'Unisex',
    subCategory: 'Outerwear',
    tagline: '3-Layer recycled Gore-Tex membrane with sealed seam construction.',
    description: 'Minimalist alpine performance tailored for city downpours. Fully stormproof 20,000mm hydrostatic head rating with magnetic storm flap and articulated sleeves.',
    features: [
      '3-Layer 100% Recycled Technical Shell',
      'Fully taped waterproof seams',
      'Storm hood with peripheral adjusters',
      'Fleece-lined magnetic closure hand pockets'
    ],
    fabricCare: [
      '100% Recycled Nylon with DWR finish',
      'Wash at 30°C on tech apparel cycle'
    ],
    basePrice: 7499,
    discountPercentage: 25,
    rating: 4.9,
    reviewCount: 38,
    images: [
      'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Stealth Black', hex: '#0f172a' },
      { name: 'Fog Grey', hex: '#94a3b8' }
    ],
    isNewArrival: true,
    variants: [
      { id: 'v-27', sku: 'AUR-TRN-BLK-S', size: 'S', color: 'Stealth Black', colorHex: '#0f172a', price: 5624, originalPrice: 7499, stock: 5 },
      { id: 'v-28', sku: 'AUR-TRN-BLK-M', size: 'M', color: 'Stealth Black', colorHex: '#0f172a', price: 5624, originalPrice: 7499, stock: 12 },
      { id: 'v-29', sku: 'AUR-TRN-BLK-L', size: 'L', color: 'Stealth Black', colorHex: '#0f172a', price: 5624, originalPrice: 7499, stock: 8 },
      { id: 'v-30', sku: 'AUR-TRN-FOG-M', size: 'M', color: 'Fog Grey', colorHex: '#94a3b8', price: 5624, originalPrice: 7499, stock: 9 }
    ]
  }
];
