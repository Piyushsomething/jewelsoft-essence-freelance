import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSupabase } from './lib/supabase';

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

function rowToProduct(row: ProductRow) {
    return {
        id: row.id,
        name: row.name,
        description: row.description,
        category: row.category,
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

function productToRow(product: Record<string, unknown>) {
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
    return row;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const supabase = getSupabase();
        // ─── GET: Read operations ───
        if (req.method === 'GET') {
            const action = req.query.action as string;

            if (action === 'all') {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) return res.status(500).json({ error: error.message });
                return res.status(200).json((data as ProductRow[]).map(rowToProduct));
            }

            if (action === 'byId') {
                const id = req.query.id as string;
                if (!id) return res.status(400).json({ error: 'Missing id parameter' });

                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) {
                    if (error.code === 'PGRST116') return res.status(404).json({ error: 'Product not found' });
                    return res.status(500).json({ error: error.message });
                }
                return res.status(200).json(rowToProduct(data as ProductRow));
            }

            if (action === 'byCategory') {
                const category = req.query.category as string;
                if (!category) return res.status(400).json({ error: 'Missing category parameter' });

                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('category', category)
                    .order('created_at', { ascending: false });

                if (error) return res.status(500).json({ error: error.message });
                return res.status(200).json((data as ProductRow[]).map(rowToProduct));
            }

            if (action === 'featured') {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('is_featured', true)
                    .order('created_at', { ascending: false });

                if (error) return res.status(500).json({ error: error.message });
                return res.status(200).json((data as ProductRow[]).map(rowToProduct));
            }

            if (action === 'new') {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('is_new', true)
                    .order('created_at', { ascending: false });

                if (error) return res.status(500).json({ error: error.message });
                return res.status(200).json((data as ProductRow[]).map(rowToProduct));
            }

            if (action === 'categories') {
                const { data, error } = await supabase
                    .from('products')
                    .select('category');

                if (error) return res.status(500).json({ error: error.message });
                const categories = [...new Set((data as { category: string }[]).map(r => r.category))].sort();
                return res.status(200).json(categories);
            }

            return res.status(400).json({ error: 'Invalid action parameter' });
        }

        // ─── POST: Create product ───
        if (req.method === 'POST') {
            const row = productToRow(req.body);
            const { data, error } = await supabase
                .from('products')
                .insert(row)
                .select()
                .single();

            if (error) return res.status(500).json({ error: error.message });
            return res.status(201).json(rowToProduct(data as ProductRow));
        }

        // ─── PUT: Update product ───
        if (req.method === 'PUT') {
            const id = req.query.id as string;
            if (!id) return res.status(400).json({ error: 'Missing id parameter' });

            const row = productToRow(req.body);
            const { data, error } = await supabase
                .from('products')
                .update(row)
                .eq('id', id)
                .select()
                .single();

            if (error) return res.status(500).json({ error: error.message });
            return res.status(200).json(rowToProduct(data as ProductRow));
        }

        // ─── DELETE: Delete product + images ───
        if (req.method === 'DELETE') {
            const id = req.query.id as string;
            if (!id) return res.status(400).json({ error: 'Missing id parameter' });

            // Get product to find images
            const { data: product } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single();

            // Delete associated images from storage
            if (product && product.images && product.images.length > 0) {
                const storagePaths = product.images
                    .filter((img: string) => img.includes('product-images'))
                    .map((img: string) => {
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

            if (error) return res.status(500).json({ error: error.message });
            return res.status(200).json({ success: true });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (err: unknown) {
        console.error('API error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
