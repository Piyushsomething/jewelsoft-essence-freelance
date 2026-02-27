import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import type { Plugin } from 'vite';
import type { IncomingMessage, ServerResponse } from 'http';

// Load .env into process.env (Vite only exposes VITE_* vars, we need SUPABASE_*)
dotenv.config();

/**
 * Vite plugin that serves the /api routes locally during development.
 * In production, Vercel's serverless functions handle these routes.
 * This keeps Supabase credentials server-side only.
 */
export function apiDevPlugin(): Plugin {
    let supabase: ReturnType<typeof createClient>;

    function getSupabase() {
        if (!supabase) {
            const url = process.env.SUPABASE_URL;
            const key = process.env.SUPABASE_ANON_KEY;
            if (!url || !key) {
                throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY in .env');
            }
            supabase = createClient(url, key);
        }
        return supabase;
    }

    // ─── Product Row Helpers ───

    interface ProductRow {
        id: string; name: string; description: string; category: string;
        images: string[]; material: string; in_stock: boolean; is_new: boolean;
        is_featured: boolean; weight: string | null; dimensions: string | null;
        tags: string[]; rating: number | null; review_count: number; created_at: string;
    }

    function rowToProduct(row: ProductRow) {
        return {
            id: row.id, name: row.name, description: row.description,
            category: row.category, images: row.images || [], material: row.material,
            inStock: row.in_stock, isNew: row.is_new, isFeatured: row.is_featured,
            weight: row.weight ?? undefined, dimensions: row.dimensions ?? undefined,
            tags: row.tags || [], rating: row.rating ?? undefined,
            reviewCount: row.review_count, createdAt: row.created_at,
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

    // ─── Helpers ───

    function parseQuery(url: string): Record<string, string> {
        const q: Record<string, string> = {};
        const idx = url.indexOf('?');
        if (idx >= 0) {
            new URLSearchParams(url.slice(idx)).forEach((v, k) => { q[k] = v; });
        }
        return q;
    }

    function readBody(req: IncomingMessage): Promise<string> {
        return new Promise((resolve) => {
            let body = '';
            req.on('data', (chunk: Buffer) => { body += chunk.toString(); });
            req.on('end', () => resolve(body));
        });
    }

    function json(res: ServerResponse, status: number, data: unknown) {
        res.writeHead(status, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    }

    // ─── Route Handlers ───

    async function handleProducts(req: IncomingMessage, res: ServerResponse) {
        const query = parseQuery(req.url || '');
        const sb = getSupabase();

        if (req.method === 'GET') {
            const action = query.action;

            if (action === 'all') {
                const { data, error } = await sb.from('products').select('*').order('created_at', { ascending: false });
                if (error) return json(res, 500, { error: error.message });
                return json(res, 200, (data as ProductRow[]).map(rowToProduct));
            }
            if (action === 'byId') {
                const id = query.id;
                if (!id) return json(res, 400, { error: 'Missing id' });
                const { data, error } = await sb.from('products').select('*').eq('id', id).single();
                if (error) {
                    if (error.code === 'PGRST116') return json(res, 404, { error: 'Not found' });
                    return json(res, 500, { error: error.message });
                }
                return json(res, 200, rowToProduct(data as ProductRow));
            }
            if (action === 'byCategory') {
                const category = query.category;
                if (!category) return json(res, 400, { error: 'Missing category' });
                const { data, error } = await sb.from('products').select('*').eq('category', category).order('created_at', { ascending: false });
                if (error) return json(res, 500, { error: error.message });
                return json(res, 200, (data as ProductRow[]).map(rowToProduct));
            }
            if (action === 'featured') {
                const { data, error } = await sb.from('products').select('*').eq('is_featured', true).order('created_at', { ascending: false });
                if (error) return json(res, 500, { error: error.message });
                return json(res, 200, (data as ProductRow[]).map(rowToProduct));
            }
            if (action === 'new') {
                const { data, error } = await sb.from('products').select('*').eq('is_new', true).order('created_at', { ascending: false });
                if (error) return json(res, 500, { error: error.message });
                return json(res, 200, (data as ProductRow[]).map(rowToProduct));
            }
            if (action === 'categories') {
                const { data, error } = await sb.from('products').select('category');
                if (error) return json(res, 500, { error: error.message });
                const cats = [...new Set((data as { category: string }[]).map(r => r.category))].sort();
                return json(res, 200, cats);
            }
            return json(res, 400, { error: 'Invalid action' });
        }

        const body = JSON.parse(await readBody(req) || '{}');

        if (req.method === 'POST') {
            const row = productToRow(body);
            const { data, error } = await sb.from('products').insert(row).select().single();
            if (error) return json(res, 500, { error: error.message });
            return json(res, 201, rowToProduct(data as ProductRow));
        }
        if (req.method === 'PUT') {
            const id = query.id;
            if (!id) return json(res, 400, { error: 'Missing id' });
            const row = productToRow(body);
            const { data, error } = await sb.from('products').update(row).eq('id', id).select().single();
            if (error) return json(res, 500, { error: error.message });
            return json(res, 200, rowToProduct(data as ProductRow));
        }
        if (req.method === 'DELETE') {
            const id = query.id;
            if (!id) return json(res, 400, { error: 'Missing id' });
            const { data: product } = await sb.from('products').select('*').eq('id', id).single();
            if (product?.images?.length > 0) {
                const paths = product.images
                    .filter((img: string) => img.includes('product-images'))
                    .map((img: string) => img.match(/product-images\/(.+)/)?.[1])
                    .filter(Boolean) as string[];
                if (paths.length > 0) await sb.storage.from('product-images').remove(paths);
            }
            const { error } = await sb.from('products').delete().eq('id', id);
            if (error) return json(res, 500, { error: error.message });
            return json(res, 200, { success: true });
        }

        json(res, 405, { error: 'Method not allowed' });
    }

    async function handleImages(req: IncomingMessage, res: ServerResponse) {
        const query = parseQuery(req.url || '');
        const sb = getSupabase();

        if (req.method === 'GET') {
            const path = query.path;
            if (!path) return json(res, 400, { error: 'Missing path' });
            const { data } = sb.storage.from('product-images').getPublicUrl(path);
            return json(res, 200, { publicUrl: data.publicUrl });
        }
        if (req.method === 'POST') {
            const body = JSON.parse(await readBody(req) || '{}');
            const { productId, fileName, fileData, contentType } = body;
            if (!productId || !fileName || !fileData) return json(res, 400, { error: 'Missing fields' });
            const buffer = Buffer.from(fileData, 'base64');
            const storagePath = `${productId}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}-${fileName}`;
            const { error: uploadError } = await sb.storage.from('product-images').upload(storagePath, buffer, {
                cacheControl: '3600', upsert: false, contentType: contentType || 'image/jpeg',
            });
            if (uploadError) return json(res, 500, { error: uploadError.message });
            const { data: urlData } = sb.storage.from('product-images').getPublicUrl(storagePath);
            return json(res, 201, { publicUrl: urlData.publicUrl });
        }
        if (req.method === 'DELETE') {
            const imageUrl = query.url;
            if (!imageUrl) return json(res, 400, { error: 'Missing url' });
            const match = imageUrl.match(/product-images\/(.+)/);
            if (!match) return json(res, 400, { error: 'Invalid URL' });
            const { error } = await sb.storage.from('product-images').remove([match[1]]);
            if (error) return json(res, 500, { error: error.message });
            return json(res, 200, { success: true });
        }

        json(res, 405, { error: 'Method not allowed' });
    }

    return {
        name: 'api-dev-middleware',
        configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
                const url = req.url || '';
                try {
                    if (url.startsWith('/api/products')) {
                        await handleProducts(req, res);
                    } else if (url.startsWith('/api/images')) {
                        await handleImages(req, res);
                    } else {
                        next();
                    }
                } catch (err) {
                    console.error('API dev error:', err);
                    json(res, 500, { error: 'Internal server error' });
                }
            });
        },
    };
}
