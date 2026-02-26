import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSupabase } from './lib/supabase';

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const supabase = getSupabase();
        // ─── GET: Get public URL for an image ───
        if (req.method === 'GET') {
            const path = req.query.path as string;
            if (!path) return res.status(400).json({ error: 'Missing path parameter' });

            const { data } = supabase.storage
                .from('product-images')
                .getPublicUrl(path);

            return res.status(200).json({ publicUrl: data.publicUrl });
        }

        // ─── POST: Upload image ───
        if (req.method === 'POST') {
            const { productId, fileName, fileData, contentType } = req.body;

            if (!productId || !fileName || !fileData) {
                return res.status(400).json({ error: 'Missing required fields: productId, fileName, fileData' });
            }

            // Decode base64 file data
            const buffer = Buffer.from(fileData, 'base64');
            const storagePath = `${productId}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}-${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('product-images')
                .upload(storagePath, buffer, {
                    cacheControl: '3600',
                    upsert: false,
                    contentType: contentType || 'image/jpeg',
                });

            if (uploadError) {
                return res.status(500).json({ error: uploadError.message });
            }

            // Get public URL
            const { data: urlData } = supabase.storage
                .from('product-images')
                .getPublicUrl(storagePath);

            return res.status(201).json({ publicUrl: urlData.publicUrl });
        }

        // ─── DELETE: Delete image ───
        if (req.method === 'DELETE') {
            const imageUrl = req.query.url as string;
            if (!imageUrl) return res.status(400).json({ error: 'Missing url parameter' });

            const match = imageUrl.match(/product-images\/(.+)/);
            if (!match) return res.status(400).json({ error: 'Invalid image URL' });

            const { error } = await supabase.storage
                .from('product-images')
                .remove([match[1]]);

            if (error) return res.status(500).json({ error: error.message });
            return res.status(200).json({ success: true });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (err: unknown) {
        console.error('Image API error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
