import { supabase } from './supabase';
import { Product, ProductCategory } from '@/types/product';
import { products as localProducts } from '@/data/productItems';

// Database row type (snake_case from Supabase)
interface ProductRow {
    id: string;
    name: string;
    description: string;
    category: string;
    images: string[];
    material: string;
    in_stock: boolean;
    is_new: boolean;
    is_featured: boolean;
    weight: string | null;
    dimensions: string | null;
    tags: string[];
    rating: number | null;
    review_count: number;
    created_at: string;
}

// Convert database row to Product type
function rowToProduct(row: ProductRow): Product {
    return {
        id: row.id,
        name: row.name,
        description: row.description,
        category: row.category as ProductCategory,
        images: row.images || [],
        material: row.material,
        inStock: row.in_stock,
        isNew: row.is_new,
        isFeatured: row.is_featured,
        weight: row.weight ?? undefined,
        dimensions: row.dimensions ?? undefined,
        tags: row.tags || [],
        rating: row.rating ?? undefined,
        reviewCount: row.review_count,
        createdAt: row.created_at,
    };
}

// Convert Product type to database row format
function productToRow(product: Partial<Product>): Partial<ProductRow> {
    const row: Record<string, unknown> = {};
    if (product.id !== undefined) row.id = product.id;
    if (product.name !== undefined) row.name = product.name;
    if (product.description !== undefined) row.description = product.description;
    if (product.category !== undefined) row.category = product.category;
    if (product.images !== undefined) row.images = product.images;
    if (product.material !== undefined) row.material = product.material;
    if (product.inStock !== undefined) row.in_stock = product.inStock;
    if (product.isNew !== undefined) row.is_new = product.isNew;
    if (product.isFeatured !== undefined) row.is_featured = product.isFeatured;
    if (product.weight !== undefined) row.weight = product.weight || null;
    if (product.dimensions !== undefined) row.dimensions = product.dimensions || null;
    if (product.tags !== undefined) row.tags = product.tags;
    if (product.rating !== undefined) row.rating = product.rating || null;
    if (product.reviewCount !== undefined) row.review_count = product.reviewCount;
    return row as Partial<ProductRow>;
}

// ─── Fetch Operations ───

export async function fetchAllProducts(): Promise<Product[]> {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching products from Supabase:', error);
            return localProducts; // Fall back to local data on error
        }

        const supabaseProducts = (data as ProductRow[]).map(rowToProduct);

        // Merge: Supabase products take priority, then append local products
        // that don't exist in Supabase (by ID)
        const supabaseIds = new Set(supabaseProducts.map(p => p.id));
        const localOnly = localProducts.filter(p => !supabaseIds.has(p.id));

        return [...supabaseProducts, ...localOnly];
    } catch (err) {
        console.error('Failed to fetch from Supabase:', err);
        return localProducts; // Fall back to local data on exception
    }
}

export async function fetchProductById(id: string): Promise<Product | null> {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        if (error.code === 'PGRST116') return null; // Not found
        console.error('Error fetching product:', error);
        throw error;
    }

    return rowToProduct(data as ProductRow);
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching products by category:', error);
        throw error;
    }

    return (data as ProductRow[]).map(rowToProduct);
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_featured', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching featured products:', error);
        throw error;
    }

    return (data as ProductRow[]).map(rowToProduct);
}

export async function fetchNewProducts(): Promise<Product[]> {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_new', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching new products:', error);
        throw error;
    }

    return (data as ProductRow[]).map(rowToProduct);
}

export async function fetchCategories(): Promise<string[]> {
    const { data, error } = await supabase
        .from('products')
        .select('category');

    if (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }

    const categories = [...new Set((data as { category: string }[]).map(r => r.category))];
    return categories.sort();
}

// ─── Write Operations ───

export async function createProduct(product: Omit<Product, 'createdAt'>): Promise<Product> {
    const row = productToRow(product);

    const { data, error } = await supabase
        .from('products')
        .insert(row)
        .select()
        .single();

    if (error) {
        console.error('Error creating product:', error);
        throw error;
    }

    return rowToProduct(data as ProductRow);
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    const row = productToRow(updates);

    const { data, error } = await supabase
        .from('products')
        .update(row)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating product:', error);
        throw error;
    }

    return rowToProduct(data as ProductRow);
}

export async function deleteProduct(id: string): Promise<void> {
    // First, get the product to find its images
    const product = await fetchProductById(id);

    // Delete associated images from storage
    if (product && product.images.length > 0) {
        const storagePaths = product.images
            .filter(img => img.includes('product-images'))
            .map(img => {
                // Extract the storage path from the full URL
                const match = img.match(/product-images\/(.+)/);
                return match ? match[1] : null;
            })
            .filter(Boolean) as string[];

        if (storagePaths.length > 0) {
            await supabase.storage.from('product-images').remove(storagePaths);
        }
    }

    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
}

// ─── Image Operations ───

export async function uploadProductImage(file: File, productId: string): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${productId}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

    const { error } = await supabase.storage
        .from('product-images')
        .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false,
        });

    if (error) {
        console.error('Error uploading image:', error);
        throw error;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

    return urlData.publicUrl;
}

export async function deleteProductImage(imageUrl: string): Promise<void> {
    const match = imageUrl.match(/product-images\/(.+)/);
    if (!match) return;

    const { error } = await supabase.storage
        .from('product-images')
        .remove([match[1]]);

    if (error) {
        console.error('Error deleting image:', error);
        throw error;
    }
}

export function getImagePublicUrl(path: string): string {
    const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(path);

    return data.publicUrl;
}
