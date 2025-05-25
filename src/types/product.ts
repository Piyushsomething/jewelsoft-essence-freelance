
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
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

export type ProductCategory = 
  | 'rings' 
  | 'necklaces' 
  | 'earrings' 
  | 'bracelets'
  | 'anklets'
  | 'pendants'
  | 'stones';

export interface ProductFilter {
  category?: ProductCategory | 'all';
  categories?: ProductCategory[];
  priceRange?: [number, number];
  onlyInStock?: boolean;
  materials?: string[];
  sortBy?: 'newest' | 'price-low-high' | 'price-high-low' | 'popular';
  searchQuery?: string;
}
