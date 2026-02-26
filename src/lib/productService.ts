import { Product, ProductCategory } from '@/types/product';
import { products as localProducts } from '@/data/productItems';

// API base — works with both Vite dev proxy and Vercel production
const API_BASE = '/api';

// ─── Fetch Operations ───

export async function fetchAllProducts(): Promise<Product[]> {
    try {
        const res = await fetch(`${API_BASE}/products?action=all`);
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const supabaseProducts: Product[] = await res.json();

        // Merge: API products take priority, then append local products
        // that don't exist in Supabase (by ID)
        const supabaseIds = new Set(supabaseProducts.map(p => p.id));
        const localOnly = localProducts.filter(p => !supabaseIds.has(p.id));

        return [...supabaseProducts, ...localOnly];
    } catch (err) {
        console.error('Failed to fetch products:', err);
        return localProducts; // Fall back to local data on exception
    }
}

export async function fetchProductById(id: string): Promise<Product | null> {
    const res = await fetch(`${API_BASE}/products?action=byId&id=${encodeURIComponent(id)}`);
    if (res.status === 404) return null;
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || `API error: ${res.status}`);
    }
    return res.json();
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
    const res = await fetch(`${API_BASE}/products?action=byCategory&category=${encodeURIComponent(category)}`);
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || `API error: ${res.status}`);
    }
    return res.json();
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
    const res = await fetch(`${API_BASE}/products?action=featured`);
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || `API error: ${res.status}`);
    }
    return res.json();
}

export async function fetchNewProducts(): Promise<Product[]> {
    const res = await fetch(`${API_BASE}/products?action=new`);
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || `API error: ${res.status}`);
    }
    return res.json();
}

export async function fetchCategories(): Promise<string[]> {
    const res = await fetch(`${API_BASE}/products?action=categories`);
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || `API error: ${res.status}`);
    }
    return res.json();
}

// ─── Write Operations ───

export async function createProduct(product: Omit<Product, 'createdAt'>): Promise<Product> {
    const res = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || `API error: ${res.status}`);
    }
    return res.json();
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    const res = await fetch(`${API_BASE}/products?id=${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || `API error: ${res.status}`);
    }
    return res.json();
}

export async function deleteProduct(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/products?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || `API error: ${res.status}`);
    }
}

// ─── Image Operations ───

export async function uploadProductImage(file: File, productId: string): Promise<string> {
    // Convert file to base64 for serverless transport
    const arrayBuffer = await file.arrayBuffer();
    const base64 = btoa(
        new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );

    const res = await fetch(`${API_BASE}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            productId,
            fileName: file.name,
            fileData: base64,
            contentType: file.type,
        }),
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || `Upload failed: ${res.status}`);
    }

    const data = await res.json();
    return data.publicUrl;
}

export async function deleteProductImage(imageUrl: string): Promise<void> {
    const res = await fetch(`${API_BASE}/images?url=${encodeURIComponent(imageUrl)}`, {
        method: 'DELETE',
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || `Delete failed: ${res.status}`);
    }
}

export function getImagePublicUrl(path: string): string {
    // For public URLs, we can construct them directly since Supabase storage URLs are public
    // This avoids needing an API call for a simple URL construction
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (supabaseUrl) {
        return `${supabaseUrl}/storage/v1/object/public/product-images/${path}`;
    }
    // Fallback: call the API
    return `${API_BASE}/images?path=${encodeURIComponent(path)}`;
}
