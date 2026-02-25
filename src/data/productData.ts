import { Product, ProductCategory, getCategoryDisplayName } from "@/types/product";
import { products as localProducts } from "./productItems";


// Helper functions that work with a provided products array
// This allows them to work with both local and Supabase data

export function getProductById(id: string, productList?: Product[]): Product | undefined {
  const list = productList || localProducts;
  return list.find(product => product.id === id);
}

export function getRelatedProducts(productId: string, category: ProductCategory, limit = 4, productList?: Product[]): Product[] {
  const list = productList || localProducts;
  return list
    .filter(p => p.id !== productId && p.category === category)
    .slice(0, limit);
}

export function getFeaturedProducts(productList?: Product[]): Product[] {
  const list = productList || localProducts;
  return list.filter(product => product.isFeatured);
}

export function getNewProducts(productList?: Product[]): Product[] {
  const list = productList || localProducts;
  return list.filter(product => product.isNew);
}

export function getFilteredProducts(filters: {
  category?: string;
  categories?: ProductCategory[];
  materials?: string[];
  onlyInStock?: boolean;
  searchQuery?: string;
  sortBy?: "newest" | "popular";
}, productList?: Product[]): Product[] {
  let filtered = [...(productList || localProducts)];

  // Filter by category or categories
  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter(product =>
      filters.categories!.includes(product.category)
    );
  } else if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(product => product.category === filters.category);
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

export function getProductCategories(productList?: Product[]): ProductCategory[] {
  const list = productList || localProducts;
  return Array.from(new Set(list.map(product => product.category)));
}

export function getMaterials(productList?: Product[]): string[] {
  const list = productList || localProducts;
  return Array.from(new Set(list.map(product => product.material)));
}

// Re-export for convenience
export { getCategoryDisplayName };