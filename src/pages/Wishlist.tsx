
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, X } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/format";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";

const Wishlist = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  
  const handleRemoveItem = (productId: string) => {
    removeFromWishlist(productId);
  };
  
  const handleAddToCart = (productId: string) => {
    const product = items.find(item => item.id === productId);
    if (product) {
      addToCart(product);
      removeFromWishlist(productId);
    }
  };
  
  if (items.length === 0) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <div className="max-w-md mx-auto">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="font-playfair text-2xl font-bold mb-4">Your Wishlist is Empty</h1>
            <p className="text-muted-foreground mb-8">
              You haven't added any jewelry to your wishlist yet. Browse our collection to find your favorite pieces.
            </p>
            <Button asChild className="bg-gold text-darkText hover:bg-gold/90">
              <Link to="/products">Explore Products</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container-custom py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="font-playfair text-3xl font-bold mb-4 md:mb-0">My Wishlist</h1>
          <Button
            variant="outline"
            onClick={clearWishlist}
          >
            Clear Wishlist
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map(product => (
            <div 
              key={product.id} 
              className="border border-border rounded-md overflow-hidden group relative"
            >
              {/* Remove Button */}
              <button
                onClick={() => handleRemoveItem(product.id)}
                className="absolute top-2 right-2 z-10 bg-background/80 backdrop-blur-sm p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={`Remove ${product.name} from wishlist`}
              >
                <X className="h-4 w-4" />
              </button>
              
              {/* Product Image */}
              <Link to={`/product/${product.id}`} className="block">
                <div className="aspect-square bg-muted relative overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>
              
              {/* Product Info */}
              <div className="p-4">
                <Link 
                  to={`/product/${product.id}`}
                  className="block font-medium hover:text-gold transition-colors mb-1"
                >
                  {product.name}
                </Link>
                
                <div className="text-sm text-muted-foreground mb-3 capitalize">
                  {product.category}
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="font-semibold">
                    {formatPrice(product.price)}
                  </div>
                  
                  {product.rating && (
                    <div className="flex items-center">
                      <span className="text-gold">★</span>
                      <span className="ml-1 text-sm">{product.rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>
                
                <Button
                  className="w-full bg-gold text-darkText hover:bg-gold/90"
                  onClick={() => handleAddToCart(product.id)}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Wishlist;
