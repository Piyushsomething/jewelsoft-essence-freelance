import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <motion.div
      className="product-card group transform transition-all duration-300 hover:-translate-y-2"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Product Image with Overlay */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
        <div className="aspect-square relative overflow-hidden bg-light dark:bg-dark/90">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Overlay with actions */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full h-10 w-10 bg-white text-dark hover:bg-gold hover:text-darkText transition-colors transform translate-y-4 group-hover:translate-y-0 transition-transform"
              onClick={handleWishlistToggle}
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`h-5 w-5 ${inWishlist ? "fill-gold stroke-gold" : ""}`} />
            </Button>

            <Button
              size="icon"
              variant="secondary"
              className="rounded-full h-10 w-10 bg-white text-dark hover:bg-gold hover:text-darkText transition-colors transform translate-y-4 group-hover:translate-y-0 transition-transform delay-100"
              onClick={handleAddToCart}
              aria-label="Add to cart"
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Status badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <Badge className="bg-gold text-darkText hover:bg-gold">New</Badge>
          )}

          {!product.inStock && (
            <Badge variant="destructive">Out of Stock</Badge>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <div className="font-medium text-muted-foreground text-sm mb-1">
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </div>

        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-playfair font-medium text-lg mb-2 hover:text-gold transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex justify-between items-center">
          {product.rating && (
            <div className="flex items-center">
              <span className="text-gold">★</span>
              <span className="ml-1 text-sm">{product.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
