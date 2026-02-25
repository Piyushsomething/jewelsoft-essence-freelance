import React, { useState } from 'react';
import { Edit, Trash2, Star, Package, Search, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import { getCategoryDisplayName } from '@/types/product';


interface AdminProductListProps {
    products: Product[];
    isLoading: boolean;
    onEdit: (product: Product) => void;
    onDelete: (productId: string) => void;
    onToggleFeatured: (product: Product) => void;
    onToggleStock: (product: Product) => void;
}

const AdminProductList = ({
    products,
    isLoading,
    onEdit,
    onDelete,
    onToggleFeatured,
    onToggleStock,
}: AdminProductListProps) => {
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');

    const categories = ['all', ...new Set(products.map(p => p.category))];

    const filtered = products.filter(p => {
        const matchesSearch = !search ||
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.id.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full" />
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-20">
                <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-300 mb-2">No products yet</h3>
                <p className="text-gray-500">
                    Click "Add Product" to add your first product to the database.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                        placeholder="Search products..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="pl-10 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategoryFilter(cat)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${categoryFilter === cat
                                ? 'bg-yellow-500 text-black'
                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                                }`}
                        >
                            {cat === 'all' ? 'All' : getCategoryDisplayName(cat)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product count */}
            <p className="text-sm text-gray-500">
                Showing {filtered.length} of {products.length} products
            </p>

            {/* Product cards */}
            <div className="grid gap-3">
                {filtered.map(product => (
                    <div
                        key={product.id}
                        className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-4 hover:border-gray-700 transition-colors group"
                    >
                        {/* Thumbnail */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                            {product.images[0] ? (
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <ImageIcon className="w-6 h-6 text-gray-600" />
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <h3 className="font-medium text-white truncate">{product.name}</h3>
                                {product.isFeatured && (
                                    <Badge variant="outline" className="border-yellow-500/30 text-yellow-500 text-[10px]">
                                        Featured
                                    </Badge>
                                )}
                                {product.isNew && (
                                    <Badge variant="outline" className="border-blue-500/30 text-blue-400 text-[10px]">
                                        New
                                    </Badge>
                                )}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                                <span>{getCategoryDisplayName(product.category)}</span>
                                <span>•</span>
                                <span className={product.inStock ? 'text-emerald-400' : 'text-red-400'}>
                                    {product.inStock ? 'In stock' : 'Out of stock'}
                                </span>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">ID: {product.id}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onToggleFeatured(product)}
                                title={product.isFeatured ? 'Remove from featured' : 'Mark as featured'}
                                className={`h-8 w-8 ${product.isFeatured ? 'text-yellow-500' : 'text-gray-500 hover:text-yellow-500'}`}
                            >
                                <Star className="w-4 h-4" fill={product.isFeatured ? 'currentColor' : 'none'} />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onToggleStock(product)}
                                title={product.inStock ? 'Mark out of stock' : 'Mark in stock'}
                                className={`h-8 w-8 ${product.inStock ? 'text-emerald-500' : 'text-gray-500 hover:text-emerald-500'}`}
                            >
                                <Package className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onEdit(product)}
                                className="h-8 w-8 text-gray-400 hover:text-blue-400"
                            >
                                <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onDelete(product.id)}
                                className="h-8 w-8 text-gray-400 hover:text-red-400"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminProductList;
