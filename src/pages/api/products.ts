
import { Product, ProductFilter, ProductCategory } from '@/types/product';
import { products } from '@/data/productItems';
import { getFilteredProducts, getProductById } from '@/data/productData';

// This is a placeholder for a real API endpoint
// In a real application, this would be implemented with a server framework
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export function handleGetProducts(query: Record<string, string>): ApiResponse<Product[] | Product> {
  try {
    // Get a specific product by ID
    if (query.id) {
      const product = getProductById(query.id);

      if (!product) {
        return { success: false, message: 'Product not found' };
      }

      return { success: true, data: product };
    }

    // Get filtered products
    if (query.category || query.search) {
      const filters: Partial<ProductFilter> = {};

      if (query.category) {
        filters.category = query.category as ProductCategory | 'all';
      }

      if (query.search) {
        filters.searchQuery = query.search;
      }



      if (query.materials) {
        filters.materials = query.materials.split(',');
      }

      if (query.inStock === 'true') {
        filters.onlyInStock = true;
      }

      if (query.sortBy) {
        filters.sortBy = query.sortBy as 'newest' | 'popular';
      }

      if (query.categories) {
        filters.categories = query.categories.split(',') as ProductCategory[];
      }

      const filteredProducts = getFilteredProducts(filters as any);
      return { success: true, data: filteredProducts };
    }

    // Get all products
    return { success: true, data: products };
  } catch (error) {
    console.error('API error:', error);
    return { success: false, message: 'Internal server error' };
  }
}
