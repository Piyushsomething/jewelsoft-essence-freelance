import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Package, Tag, AlertTriangle, RefreshCw, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminProductList from '@/components/admin/AdminProductList';
import AdminProductForm from '@/components/admin/AdminProductForm';
import { Product } from '@/types/product';
import { fetchAllProducts, deleteProduct, createProduct, updateProduct, uploadProductImage, deleteProductImage } from '@/lib/productService';
import { useToast } from '@/hooks/use-toast';

const ADMIN_PASSWORD = 'parshav@admin';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const { toast } = useToast();

    const loadProducts = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await fetchAllProducts();
            setProducts(data);
        } catch (error) {
            console.error('Failed to load products:', error);
            toast({
                title: 'Error',
                description: 'Failed to load products from database. Make sure the products table exists in Supabase.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        if (isAuthenticated) {
            loadProducts();
        }
    }, [isAuthenticated, loadProducts]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            setPasswordError('');
        } else {
            setPasswordError('Incorrect password');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setPassword('');
    };

    const handleCreate = () => {
        setEditingProduct(null);
        setShowForm(true);
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleDelete = async (productId: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        try {
            await deleteProduct(productId);
            toast({ title: 'Deleted', description: 'Product deleted successfully.' });
            loadProducts();
        } catch (error) {
            console.error('Delete failed:', error);
            toast({ title: 'Error', description: 'Failed to delete product.', variant: 'destructive' });
        }
    };

    const handleToggleFeatured = async (product: Product) => {
        try {
            await updateProduct(product.id, { isFeatured: !product.isFeatured });
            loadProducts();
        } catch (error) {
            console.error('Toggle featured failed:', error);
        }
    };

    const handleToggleStock = async (product: Product) => {
        try {
            await updateProduct(product.id, { inStock: !product.inStock });
            loadProducts();
        } catch (error) {
            console.error('Toggle stock failed:', error);
        }
    };

    const handleFormSubmit = async (
        productData: Omit<Product, 'createdAt'>,
        newImageFiles: File[],
        removedImageUrls: string[]
    ) => {
        try {
            // Upload new images
            const uploadedUrls: string[] = [];
            for (const file of newImageFiles) {
                const url = await uploadProductImage(file, productData.id);
                uploadedUrls.push(url);
            }

            // Remove deleted images from storage
            for (const url of removedImageUrls) {
                await deleteProductImage(url);
            }

            // Combine existing images (minus removed) with newly uploaded
            const existingImages = productData.images.filter(img => !removedImageUrls.includes(img));
            const allImages = [...existingImages, ...uploadedUrls];

            if (editingProduct) {
                // Update
                await updateProduct(editingProduct.id, {
                    ...productData,
                    images: allImages,
                });
                toast({ title: 'Updated', description: 'Product updated successfully.' });
            } else {
                // Create
                await createProduct({
                    ...productData,
                    images: allImages,
                });
                toast({ title: 'Created', description: 'Product created successfully.' });
            }

            setShowForm(false);
            setEditingProduct(null);
            loadProducts();
        } catch (error) {
            console.error('Save failed:', error);
            toast({ title: 'Error', description: 'Failed to save product.', variant: 'destructive' });
        }
    };

    // Password gate
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
                <Card className="w-full max-w-md bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                    <CardHeader className="text-center">
                        <div className="mx-auto w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center mb-4">
                            <Package className="w-8 h-8 text-yellow-500" />
                        </div>
                        <CardTitle className="text-2xl font-serif text-white">Admin Panel</CardTitle>
                        <p className="text-gray-400 text-sm mt-2">Enter admin password to continue</p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <Input
                                    type="password"
                                    placeholder="Admin password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500"
                                    autoFocus
                                />
                                {passwordError && (
                                    <p className="text-red-400 text-sm mt-2">{passwordError}</p>
                                )}
                            </div>
                            <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-medium">
                                Access Admin Panel
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const totalProducts = products.length;
    const categoriesCount = new Set(products.map(p => p.category)).size;
    const outOfStock = products.filter(p => !p.inStock).length;

    return (
        <div className="min-h-screen bg-gray-950">
            {/* Header */}
            <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Package className="w-6 h-6 text-yellow-500" />
                        <h1 className="text-xl font-serif font-bold text-white">Product Manager</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={loadProducts}
                            disabled={isLoading}
                            className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                        >
                            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                            Refresh
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLogout}
                            className="text-gray-400 hover:text-white"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <Card className="bg-gray-900 border-gray-800">
                        <CardContent className="flex items-center gap-4 pt-6">
                            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                <Package className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Total Products</p>
                                <p className="text-2xl font-bold text-white">{totalProducts}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-gray-900 border-gray-800">
                        <CardContent className="flex items-center gap-4 pt-6">
                            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                <Tag className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Categories</p>
                                <p className="text-2xl font-bold text-white">{categoriesCount}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-gray-900 border-gray-800">
                        <CardContent className="flex items-center gap-4 pt-6">
                            <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                                <AlertTriangle className="w-6 h-6 text-amber-400" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Out of Stock</p>
                                <p className="text-2xl font-bold text-white">{outOfStock}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Action Bar */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-white">
                        {showForm ? (editingProduct ? 'Edit Product' : 'Add New Product') : 'All Products'}
                    </h2>
                    {!showForm ? (
                        <Button onClick={handleCreate} className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Product
                        </Button>
                    ) : (
                        <Button
                            variant="outline"
                            onClick={() => { setShowForm(false); setEditingProduct(null); }}
                            className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                        >
                            ← Back to List
                        </Button>
                    )}
                </div>

                {/* Content */}
                {showForm ? (
                    <AdminProductForm
                        product={editingProduct}
                        onSubmit={handleFormSubmit}
                        onCancel={() => { setShowForm(false); setEditingProduct(null); }}
                        existingCategories={[...new Set(products.map(p => p.category))]}
                    />
                ) : (
                    <AdminProductList
                        products={products}
                        isLoading={isLoading}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onToggleFeatured={handleToggleFeatured}
                        onToggleStock={handleToggleStock}
                    />
                )}
            </main>
        </div>
    );
};

export default Admin;
