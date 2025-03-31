
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";
import ProductSkeleton from "./ProductSkeleton";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  emptyMessage?: string;
}

const ProductGrid = ({ 
  products, 
  isLoading = false, 
  emptyMessage = "No products found. Try adjusting your filters." 
}: ProductGridProps) => {
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    if (!isLoading) {
      setDisplayProducts(products);
    }
  }, [products, isLoading]);
  
  if (isLoading) {
    return (
      <div className="product-grid">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }
  
  if (displayProducts.length === 0) {
    return (
      <div className="flex items-center justify-center h-60 border border-dashed rounded-md">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }
  
  return (
    <div className="product-grid">
      {displayProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
