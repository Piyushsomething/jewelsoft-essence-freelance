
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, ChevronLeft, ChevronRight, Star, Share2, ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ProductGrid from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { formatPrice } from "@/utils/format";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { getProductById, getRelatedProducts } from "@/data/products";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const product = id ? getProductById(id) : null;
  const relatedProducts = product ? getRelatedProducts(product.id, product.category) : [];
  
  if (!product) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <h1 className="font-playfair text-2xl mb-4">Product Not Found</h1>
          <p className="mb-6">The product you are looking for does not exist or has been removed.</p>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  const inWishlist = isInWishlist(product.id);
  
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };
  
  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  };
  
  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  
  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };
  
  return (
    <Layout>
      <div className="container-custom py-12">
        {/* Breadcrumb and Back Button */}
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 mr-auto"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
          
          <nav className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-foreground">Products</Link>
            <span className="mx-2">/</span>
            <Link 
              to={`/products?category=${product.category}`} 
              className="hover:text-foreground capitalize"
            >
              {product.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
        
        {/* Product Detail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="relative">
            <div className="aspect-square bg-light dark:bg-dark/80 rounded-md overflow-hidden">
              <img
                src={product.images[currentImageIndex]}
                alt={`${product.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Image Navigation */}
            {product.images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
                  onClick={handlePrevImage}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
                  onClick={handleNextImage}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
                
                {/* Thumbnail Indicators */}
                <div className="flex justify-center gap-2 mt-4">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentImageIndex
                          ? "bg-gold"
                          : "bg-muted hover:bg-muted-foreground"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            <div className="mb-6">
              <h1 className="font-playfair text-3xl font-bold mb-2">{product.name}</h1>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < (product.rating || 0)
                          ? "text-gold fill-gold"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                {product.reviewCount && (
                  <span className="text-sm text-muted-foreground">
                    ({product.reviewCount} reviews)
                  </span>
                )}
              </div>
              
              <div className="text-2xl font-semibold mb-4">
                {formatPrice(product.price)}
                {product.discountPrice && (
                  <span className="ml-2 line-through text-muted-foreground text-lg">
                    {formatPrice(product.discountPrice)}
                  </span>
                )}
              </div>
              
              <p className="text-muted-foreground mb-6">{product.description}</p>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Material</span>
                  <span className="text-sm">{product.material}</span>
                </div>
                
                {product.weight && (
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Weight</span>
                    <span className="text-sm">{product.weight}</span>
                  </div>
                )}
                
                {product.dimensions && (
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Dimensions</span>
                    <span className="text-sm">{product.dimensions}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Availability</span>
                  <span className={`text-sm ${product.inStock ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
              
              {/* Quantity Selector */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-sm font-medium">Quantity</span>
                <div className="flex items-center border border-border rounded-md">
                  <button
                    className="px-3 py-1 border-r border-border hover:bg-muted transition-colors"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{quantity}</span>
                  <button
                    className="px-3 py-1 border-l border-border hover:bg-muted transition-colors"
                    onClick={incrementQuantity}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="flex-1 bg-gold text-darkText hover:bg-gold/90"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className={`flex-1 ${
                    inWishlist 
                      ? "border-gold text-gold hover:bg-gold/10" 
                      : ""
                  }`}
                  onClick={handleWishlistToggle}
                >
                  <Heart 
                    className={`mr-2 h-5 w-5 ${inWishlist ? "fill-gold stroke-gold" : ""}`} 
                  />
                  {inWishlist ? "Wishlisted" : "Add to Wishlist"}
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleShare}
                  aria-label="Share product"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm font-medium">Tags:</span>
                  {product.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/products?search=${tag}`}
                      className="text-sm bg-muted hover:bg-muted/80 px-2 py-1 rounded"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description">
            <TabsList className="w-full border-b border-border rounded-none justify-start">
              <TabsTrigger value="description" className="font-medium">
                Description
              </TabsTrigger>
              <TabsTrigger value="specifications" className="font-medium">
                Specifications
              </TabsTrigger>
              <TabsTrigger value="shipping" className="font-medium">
                Shipping & Returns
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="pt-6">
              <div className="prose dark:prose-invert max-w-none">
                <p>{product.description}</p>
                <p>
                  Each piece of jewelry at JewelSoft is meticulously handcrafted by skilled artisans 
                  using traditional techniques passed down through generations. Every detail is 
                  carefully considered to create a piece that is not only beautiful but also durable 
                  and comfortable to wear.
                </p>
                <p>
                  Our commitment to quality ensures that each item meets our rigorous standards. We 
                  use only the finest materials, ethically sourced, to create pieces that will be 
                  cherished for years to come.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="specifications" className="pt-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-border rounded-md p-4">
                    <h3 className="font-medium mb-2">Materials</h3>
                    <p>{product.material}</p>
                  </div>
                  
                  <div className="border border-border rounded-md p-4">
                    <h3 className="font-medium mb-2">Dimensions</h3>
                    <p>{product.dimensions || "Varies by size"}</p>
                  </div>
                  
                  <div className="border border-border rounded-md p-4">
                    <h3 className="font-medium mb-2">Weight</h3>
                    <p>{product.weight || "Varies by size"}</p>
                  </div>
                  
                  <div className="border border-border rounded-md p-4">
                    <h3 className="font-medium mb-2">Care Instructions</h3>
                    <p>
                      Store in a cool, dry place. Clean with a soft, lint-free cloth.
                      Avoid contact with harsh chemicals and prolonged exposure to water.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="shipping" className="pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-2">Shipping Information</h3>
                  <p>
                    We offer free standard shipping on all orders within India. Orders are 
                    processed within 1-2 business days. Standard shipping typically takes 
                    3-5 business days to arrive, depending on your location.
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Standard Shipping (3-5 business days): Free</li>
                    <li>Express Shipping (1-2 business days): ₹499</li>
                    <li>International Shipping: Calculated at checkout</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Return Policy</h3>
                  <p>
                    We offer a 14-day return policy on all our products. If you're not 
                    completely satisfied with your purchase, you can return it within 14 
                    days of receipt for a full refund or exchange.
                  </p>
                  <p className="mt-2">
                    Items must be returned in their original packaging, unworn, and with 
                    all tags attached. Please note that custom-made items cannot be returned 
                    unless they arrive damaged or defective.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related Products */}
        <div className="mt-16">
          <h2 className="font-playfair text-2xl font-bold mb-6">You May Also Like</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
