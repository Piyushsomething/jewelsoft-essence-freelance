
export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  images: string[];
  material: string;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  weight?: string;
  dimensions?: string;
  tags: string[];
  rating?: number;
  reviewCount?: number;
  createdAt: string;
}

// Dynamic category type — supports any string value
export type ProductCategory = string;

// Default categories for display names and quick access
export const DEFAULT_CATEGORIES: Record<string, string> = {
  rings: 'Rings',
  necklaces: 'Necklaces',
  earrings: 'Earrings',
  bracelets: 'Bracelets',
  anklets: 'Anklets',
  pendants: 'Pendants',
  stones: 'Stones',
  chains: 'Chains',
  bangles: 'Bangles',
  mangalsutra: 'Mangalsutra',
  'toe-rings': 'Toe Rings',
  brooches: 'Brooches',
  'nose-pins': 'Nose Pins',
};

export function getCategoryDisplayName(category: string): string {
  return DEFAULT_CATEGORIES[category] || category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');
}

export interface ProductFilter {
  category?: ProductCategory | 'all';
  categories?: ProductCategory[];
  onlyInStock?: boolean;
  materials?: string[];
  sortBy?: 'newest' | 'popular';
  searchQuery?: string;
}
