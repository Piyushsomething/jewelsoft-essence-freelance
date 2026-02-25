import React, { useState, useRef } from 'react';
import { Upload, X, ImagePlus, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Product, DEFAULT_CATEGORIES } from '@/types/product';

interface AdminProductFormProps {
    product: Product | null;
    onSubmit: (
        product: Omit<Product, 'createdAt'>,
        newImages: File[],
        removedImages: string[]
    ) => Promise<void>;
    onCancel: () => void;
    existingCategories: string[];
}

const AdminProductForm = ({
    product,
    onSubmit,
    onCancel,
    existingCategories,
}: AdminProductFormProps) => {
    const [isSaving, setIsSaving] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Form state
    const [name, setName] = useState(product?.name || '');
    const [id, setId] = useState(product?.id || '');
    const [description, setDescription] = useState(product?.description || '');
    const [category, setCategory] = useState(product?.category || '');
    const [customCategory, setCustomCategory] = useState('');
    const [material, setMaterial] = useState(product?.material || '');
    const [weight, setWeight] = useState(product?.weight || '');
    const [dimensions, setDimensions] = useState(product?.dimensions || '');
    const [tagsInput, setTagsInput] = useState(product?.tags?.join(', ') || '');
    const [inStock, setInStock] = useState(product?.inStock ?? true);
    const [isNew, setIsNew] = useState(product?.isNew ?? false);
    const [isFeatured, setIsFeatured] = useState(product?.isFeatured ?? false);
    const [rating, setRating] = useState(product?.rating?.toString() || '');
    const [reviewCount, setReviewCount] = useState(product?.reviewCount?.toString() || '0');

    // Image state
    const [existingImages, setExistingImages] = useState<string[]>(product?.images || []);
    const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
    const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
    const [removedImages, setRemovedImages] = useState<string[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    // All available categories — merge defaults + existing from DB
    const allCategories = [
        ...new Set([
            ...Object.keys(DEFAULT_CATEGORIES),
            ...existingCategories,
        ])
    ].sort();

    const generateId = (productName: string) => {
        const slug = productName
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .substring(0, 30);
        return `${slug}-${Date.now().toString(36)}`;
    };

    const handleNameChange = (value: string) => {
        setName(value);
        if (!product) {
            setId(generateId(value));
        }
    };

    const handleImageFiles = (files: FileList | File[]) => {
        const fileArray = Array.from(files);
        const validFiles = fileArray.filter(f => f.type.startsWith('image/'));

        setNewImageFiles(prev => [...prev, ...validFiles]);

        validFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                setNewImagePreviews(prev => [...prev, e.target?.result as string]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleImageFiles(e.dataTransfer.files);
    };

    const handleRemoveExistingImage = (url: string) => {
        setExistingImages(prev => prev.filter(img => img !== url));
        setRemovedImages(prev => [...prev, url]);
    };

    const handleRemoveNewImage = (index: number) => {
        setNewImageFiles(prev => prev.filter((_, i) => i !== index));
        setNewImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !category || !material) return;

        setIsSaving(true);

        const finalCategory = category === '__custom__' ? customCategory.toLowerCase().replace(/\s+/g, '-') : category;

        const productData: Omit<Product, 'createdAt'> = {
            id: id || generateId(name),
            name,
            description,
            category: finalCategory,
            images: existingImages,
            material,
            inStock,
            isNew,
            isFeatured,
            weight: weight || undefined,
            dimensions: dimensions || undefined,
            tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean),
            rating: rating ? parseFloat(rating) : undefined,
            reviewCount: parseInt(reviewCount) || 0,
        };

        try {
            await onSubmit(productData, newImageFiles, removedImages);
        } catch (error) {
            console.error('Form submit failed:', error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="bg-gray-900 border-gray-800">
                        <CardContent className="pt-6 space-y-4">
                            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-4">Basic Information</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2">
                                    <Label htmlFor="name" className="text-gray-300">Product Name *</Label>
                                    <Input
                                        id="name"
                                        value={name}
                                        onChange={e => handleNameChange(e.target.value)}
                                        placeholder="e.g. Royal Elegance Ring"
                                        className="bg-gray-800 border-gray-700 text-white mt-1"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="id" className="text-gray-300">Product ID</Label>
                                    <Input
                                        id="id"
                                        value={id}
                                        onChange={e => setId(e.target.value)}
                                        placeholder="Auto-generated"
                                        className="bg-gray-800 border-gray-700 text-white mt-1"
                                        disabled={!!product}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="category" className="text-gray-300">Category *</Label>
                                    <Select value={category} onValueChange={setCategory}>
                                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-1">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-800 border-gray-700">
                                            {allCategories.map(cat => (
                                                <SelectItem key={cat} value={cat} className="text-white hover:bg-gray-700">
                                                    {DEFAULT_CATEGORIES[cat] || cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ')}
                                                </SelectItem>
                                            ))}
                                            <SelectItem value="__custom__" className="text-yellow-400 hover:bg-gray-700">
                                                + Add New Category
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {category === '__custom__' && (
                                        <Input
                                            value={customCategory}
                                            onChange={e => setCustomCategory(e.target.value)}
                                            placeholder="Enter new category name"
                                            className="bg-gray-800 border-gray-700 text-white mt-2"
                                            required
                                        />
                                    )}
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="description" className="text-gray-300">Description *</Label>
                                <Textarea
                                    id="description"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    placeholder="Product description..."
                                    className="bg-gray-800 border-gray-700 text-white mt-1 min-h-[100px]"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                <div>
                                    <Label htmlFor="material" className="text-gray-300">Material *</Label>
                                    <Input
                                        id="material"
                                        value={material}
                                        onChange={e => setMaterial(e.target.value)}
                                        placeholder="Sterling Silver"
                                        className="bg-gray-800 border-gray-700 text-white mt-1"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                <div>
                                    <Label htmlFor="weight" className="text-gray-300">Weight</Label>
                                    <Input
                                        id="weight"
                                        value={weight}
                                        onChange={e => setWeight(e.target.value)}
                                        placeholder="3.5g"
                                        className="bg-gray-800 border-gray-700 text-white mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="dimensions" className="text-gray-300">Dimensions</Label>
                                    <Input
                                        id="dimensions"
                                        value={dimensions}
                                        onChange={e => setDimensions(e.target.value)}
                                        placeholder="1.2cm x 1.2cm"
                                        className="bg-gray-800 border-gray-700 text-white mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="tags" className="text-gray-300">Tags (comma-separated)</Label>
                                    <Input
                                        id="tags"
                                        value={tagsInput}
                                        onChange={e => setTagsInput(e.target.value)}
                                        placeholder="silver, ring, gemstone"
                                        className="bg-gray-800 border-gray-700 text-white mt-1"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="rating" className="text-gray-300">Rating (0-5)</Label>
                                    <Input
                                        id="rating"
                                        type="number"
                                        value={rating}
                                        onChange={e => setRating(e.target.value)}
                                        placeholder="4.8"
                                        className="bg-gray-800 border-gray-700 text-white mt-1"
                                        min="0"
                                        max="5"
                                        step="0.1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="reviewCount" className="text-gray-300">Review Count</Label>
                                    <Input
                                        id="reviewCount"
                                        type="number"
                                        value={reviewCount}
                                        onChange={e => setReviewCount(e.target.value)}
                                        placeholder="0"
                                        className="bg-gray-800 border-gray-700 text-white mt-1"
                                        min="0"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Images */}
                    <Card className="bg-gray-900 border-gray-800">
                        <CardContent className="pt-6">
                            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-4">Product Images</h3>

                            {/* Drop Zone */}
                            <div
                                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${isDragging
                                    ? 'border-yellow-500 bg-yellow-500/5'
                                    : 'border-gray-700 hover:border-gray-600'
                                    }`}
                                onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Upload className="w-8 h-8 text-gray-500 mx-auto mb-3" />
                                <p className="text-gray-400 text-sm">
                                    Drag & drop images here, or <span className="text-yellow-500">browse</span>
                                </p>
                                <p className="text-gray-600 text-xs mt-1">PNG, JPG, JPEG, WebP</p>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                    onChange={e => e.target.files && handleImageFiles(e.target.files)}
                                />
                            </div>

                            {/* Image Previews */}
                            {(existingImages.length > 0 || newImagePreviews.length > 0) && (
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mt-4">
                                    {/* Existing images */}
                                    {existingImages.map((url, idx) => (
                                        <div key={`existing-${idx}`} className="relative group aspect-square rounded-lg overflow-hidden bg-gray-800">
                                            <img src={url} alt={`Product ${idx + 1}`} className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveExistingImage(url)}
                                                className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-[10px] text-gray-300 text-center py-0.5">
                                                Saved
                                            </div>
                                        </div>
                                    ))}

                                    {/* New images (not uploaded yet) */}
                                    {newImagePreviews.map((preview, idx) => (
                                        <div key={`new-${idx}`} className="relative group aspect-square rounded-lg overflow-hidden bg-gray-800">
                                            <img src={preview} alt={`New ${idx + 1}`} className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveNewImage(idx)}
                                                className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                            <div className="absolute bottom-0 left-0 right-0 bg-yellow-500/80 text-[10px] text-black text-center py-0.5 font-medium">
                                                New
                                            </div>
                                        </div>
                                    ))}

                                    {/* Add more */}
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="aspect-square rounded-lg border-2 border-dashed border-gray-700 hover:border-gray-600 flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-gray-400 transition-colors"
                                    >
                                        <ImagePlus className="w-5 h-5" />
                                        <span className="text-[10px]">Add More</span>
                                    </button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card className="bg-gray-900 border-gray-800">
                        <CardContent className="pt-6 space-y-4">
                            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-4">Status</h3>

                            <div className="flex items-center gap-3">
                                <Checkbox
                                    id="inStock"
                                    checked={inStock}
                                    onCheckedChange={(v) => setInStock(!!v)}
                                />
                                <Label htmlFor="inStock" className="text-gray-300 cursor-pointer">In Stock</Label>
                            </div>

                            <div className="flex items-center gap-3">
                                <Checkbox
                                    id="isNew"
                                    checked={isNew}
                                    onCheckedChange={(v) => setIsNew(!!v)}
                                />
                                <Label htmlFor="isNew" className="text-gray-300 cursor-pointer">New Arrival</Label>
                            </div>

                            <div className="flex items-center gap-3">
                                <Checkbox
                                    id="isFeatured"
                                    checked={isFeatured}
                                    onCheckedChange={(v) => setIsFeatured(!!v)}
                                />
                                <Label htmlFor="isFeatured" className="text-gray-300 cursor-pointer">Featured</Label>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <div className="space-y-3">
                        <Button
                            type="submit"
                            disabled={isSaving || !name || !category || !material}
                            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-medium h-12"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    {product ? 'Update Product' : 'Create Product'}
                                </>
                            )}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                            className="w-full border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                            disabled={isSaving}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AdminProductForm;
