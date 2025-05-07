import { Product, ProductCategory } from "@/types/product";
import { products } from "./productItems";


// Helper functions to get product data
export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getRelatedProducts(productId: string, category: ProductCategory, limit = 4): Product[] {
  return products
    .filter(p => p.id !== productId && p.category === category)
    .slice(0, limit);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.isFeatured);
}

export function getNewProducts(): Product[] {
  return products.filter(product => product.isNew);
}

export function getFilteredProducts(filters: {
  category?: string;
  categories?: ProductCategory[];
  priceRange?: [number, number];
  materials?: string[];
  onlyInStock?: boolean;
  searchQuery?: string;
  sortBy?: "newest" | "price-low-high" | "price-high-low" | "popular";
}): Product[] {
  let filtered = [...products];
  
  // Filter by category or categories
  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter(product => 
      filters.categories!.includes(product.category)
    );
  } else if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(product => product.category === filters.category);
  }
  
  // Filter by price range
  if (filters.priceRange) {
    const [min, max] = filters.priceRange;
    filtered = filtered.filter(product => product.price >= min && product.price <= max);
  }
  
  // Filter by materials
  if (filters.materials && filters.materials.length > 0) {
    filtered = filtered.filter(product => 
      filters.materials!.some(material => 
        product.material.toLowerCase().includes(material.toLowerCase())
      )
    );
  }
  
  // Filter by in stock
  if (filters.onlyInStock) {
    filtered = filtered.filter(product => product.inStock);
  }
  
  // Filter by search query
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query) ||
      product.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }
  
  // Sort products
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price-low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
    }
  }
  
  return filtered;
}

export function getProductCategories(): ProductCategory[] {
  return Array.from(new Set(products.map(product => product.category)));
}

export function getMaterials(): string[] {
  return Array.from(new Set(products.map(product => product.material)));
}

export function getPriceRange(): [number, number] {
  const prices = products.map(product => product.price);
  return [Math.min(...prices), Math.max(...prices)];
}